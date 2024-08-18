import pkg from 'lodash';
const { sum } = pkg;
const DEFAULT_OPTIONS = {
  isDark: false,
  bids: [],
  asks: [],
  symbol: '',
  shortNum: false,
  paddingTopRate: 0.25,
  hRuler: 30,
  wRuler: 60,
  mTipsDelay: 2000,
  lang: '',
  xAxisPx: 200,
  yAxisPx: 120,
  langMap: {
    'zh-cn': {
      price: '价格',
      sum: '累计',
    },
    'en-us': {
      price: 'Price',
      sum: 'Sum',
    },
  },
  defaultLang: {
    price: 'Price',
    sum: 'Sum',
  },
  formatPrice: (price) => price,
  formatAmount: (amount) => amount,
  colorMap: {},
}
export default function (
  el = '#chart',
  options = DEFAULT_OPTIONS
) {
  const getColorMap = () => {
    const colorMap = options.colorMap || {};
    const isDark = !!options.isDark;
    return {
      ...colorMap,
      bgColor: '#fff',
      axisColor: '#999',
      axisTextColor: '#999',
      tipsColor: '#fff',
      tipsBgColor: 'rgba(50,50,50,0.6)',
      tipsAxisColor: 'rgba(180,180,180, 0.5)',
      bids: {
        color: isDark ? '#119e5f' : '#1a8f5c',
        line: isDark ? '#119e5f' : '#1a8f5c',
        bgFrom: isDark ? 'rgba(17,158,95, 0.8)' : 'rgba(26,143,92, 0.8)',
        bgTo: isDark ? 'rgba(17,158,95, 0.1)' : 'rgba(26,143,92, 0.1)',
        ...(colorMap.bids || {}),
      },
      asks: {
        color: isDark ? '#d64d4f' : '#c44749',
        line: isDark ? '#d64d4f' : '#c44749',
        bgFrom: isDark ? 'rgba(214,77,79, 0.8)' : 'rgba(196,71,73, 0.8)',
        bgTo: isDark ? 'rgba(214,77,79, 0.1)' : 'rgba(196,71,73, 0.1)',
        ...(colorMap.asks || {}),
      },
    };
  };
  options = {...DEFAULT_OPTIONS, ...options}
  options.colorMap = getColorMap();

  const chart =
    typeof el === 'string'
      ? document.querySelector('#' + el.replace('#', ''))
      : el || document.querySelector('#chart');
  const canvas = document.createElement('canvas');
  const cover = document.createElement('canvas');
  canvas.style.position = cover.style.position = 'absolute';

  let ratio,
    isPhone,
    width,
    height,
    xAxisWidth,
    yAxisHeight,
    yAxisTop,
    yAxisBottom,
    xAxisStep,
    maxYAmount = 0,
    loading = true;
  const ctx = canvas.getContext('2d');
  const coverCtx = cover.getContext('2d');
  resize();

  let tipsTimer,
    currentTipsX = 0,
    showTips = true;

  function getPixelRatio() {
    return window.devicePixelRatio;
  }

  function isPhoneDevice() {
    return /iPhone|Android/i.test(navigator.userAgent);
  }

  function getYPosition(amount) {
    return yAxisBottom - (yAxisBottom * amount) / maxYAmount;
  }

  function getStep(count) {
    const halfWidth = xAxisWidth / 2;
    return halfWidth % count === 0 ? count : count + (count - (halfWidth % count));
  }

  function getStepWidth(count = 0) {
    count = isNaN(count) ? 0 : count;
    return (xAxisWidth / 2) / getStep(count);
  }

  function toInt(num) {
    return ~~(num - 0.5);
  }

  function formatData(data) {
    const { bids, asks } = data;
    const bidsResult = [];
    const asksResult = [];
    bids
      .sort((a, b) => b[0] - a[0])
      .reduce((total, item) => {
        const [price, amount] = item;
        bidsResult.push([price, total + (price * amount)]);
        return total + (price * amount);
      }, 0);
    options.bids = bidsResult;
    asks
      .sort((a, b) => a[0] - b[0])
      .reduce((total, item) => {
        const [price, amount] = item;
        asksResult.push([price, total + (price * amount)]);
        return total + (price * amount);
      }, 0);
    options.asks = asksResult;

    const maxAsk = options.asks.length ? options.asks[options.asks.length - 1] : [];
    const maxBid = options.bids.length ? options.bids[options.bids.length - 1] : [];
    maxYAmount = Math.max(maxBid[1] || 0, maxAsk[1] || 0);
  }

  function drawBids() {
    const { bids } = options;
    if (!bids.length) return false;

    const { bids: color } = options.colorMap;
    ctx.strokeStyle = color.line;
    ctx.lineWidth = toInt(2 * ratio);

    const gradient = ctx.createLinearGradient(
      0,
      getYPosition(bids[bids.length - 1][1]),
      0,
      yAxisBottom
    );
    gradient.addColorStop(0, color.bgFrom);
    gradient.addColorStop(1, color.bgTo);
    ctx.fillStyle = gradient;
    ctx.beginPath();

    const stepWidth = getStepWidth(bids.length);
    bids.forEach((item, index) => {
      const [, amount] = item;
      const x = toInt((xAxisWidth / 2) - (currentTipsX + stepWidth * index));
      const y = toInt(getYPosition(amount));
      ctx.lineTo(x, y);
      if (index === bids.length - 1) {
        ctx.lineTo(0, toInt(getYPosition(amount)));
      }
    });
    ctx.stroke();
    ctx.strokeStyle = 'rgba(0,0,0,0)';
    ctx.lineTo(toInt(0), toInt(yAxisBottom));
    ctx.lineTo(toInt(xAxisWidth / 2), toInt(getYPosition(0)));
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  function drawAsks() {
    const { asks } = options;
    if (!asks.length) return false;

    const { asks: color } = options.colorMap;
    ctx.strokeStyle = color?.line;
    ctx.lineWidth = toInt(2 * ratio);

    const gradient = ctx.createLinearGradient(
      0,
      getYPosition(asks[asks.length - 1][1]),
      0,
      yAxisBottom
    );
    gradient.addColorStop(0, color.bgFrom);
    gradient.addColorStop(1, color.bgTo);
    ctx.fillStyle = gradient;
    ctx.beginPath();

    const stepWidth = getStepWidth(asks.length);
    asks.forEach((item, index) => {
      const [, amount] = item;
      const x = toInt(xAxisWidth / 2 + currentTipsX + index * stepWidth);
      const y = toInt(getYPosition(amount));
      ctx.lineTo(x, y);
      if (index === asks.length - 1) {
        ctx.lineTo(xAxisWidth, toInt(getYPosition(amount)));
      }
    });
    ctx.stroke();
    ctx.strokeStyle = 'rgba(0,0,0,0)';
    ctx.lineTo(toInt(xAxisWidth), toInt(yAxisBottom));
    ctx.lineTo(toInt(xAxisWidth / 2), toInt(yAxisBottom));
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  function drawAxis() {
    const { colorMap } = options;
    ctx.strokeStyle = colorMap?.axisColor;
    ctx.lineWidth = 1 * ratio;
    drawXAxis();
    drawYAxis();
  }

  function drawXAxis() {
    const { colorMap, bids, asks } = options;
    const fontSize = 12 * ratio;
    ctx.font = fontSize + 'px Arial';
    ctx.textBaseline = 'top';
    ctx.fillStyle = colorMap?.axisTextColor;
    ctx.textAlign = 'center';
    ctx.beginPath();

    const bottom = toInt(yAxisBottom);
    const step = width / xAxisStep;
    const halfStep = xAxisStep / 2;
    for (let i = 0; i < halfStep; i++) {
      const x1 = toInt(xAxisWidth / 2 - step * i - currentTipsX);
      const x2 = toInt(xAxisWidth / 2 + step * i + 2 * currentTipsX);
      const y = toInt(bottom + 4 * ratio);
      if (i) {
        ctx.moveTo(x1, bottom);
        ctx.lineTo(x1, y);
        ctx.moveTo(x2, bottom);
        ctx.lineTo(x2, y);
      } else {
        ctx.moveTo(toInt(xAxisWidth / 2), bottom);
        ctx.lineTo(toInt(xAxisWidth / 2), y);
      }

      if (i) {
        if (bids.length) {
          const stepCount = getStep(bids.length) / halfStep;
          const item = bids[stepCount * i] || bids[bids.length - 1] || [''];
          const price = options.formatPrice(item[0], item) ?? item[0];
          item && ctx.fillText(price, x1, toInt(bottom + fontSize));
        }
        if (asks.length) {
          const stepCount = getStep(asks.length) / halfStep;
          const item = asks[stepCount * i] || asks[asks.length - 1] || [''];
          const price = options.formatPrice(item[0], item) ?? item[0];
          item && ctx.fillText(price, x2, toInt(bottom + fontSize));
        }
      } else {
        const item = bids[0] || asks[0] || [''];
        const price = options.formatPrice(item[0], item) ?? item[0];
        item && ctx.fillText(price, x1, toInt(bottom + fontSize));
      }
    }
    ctx.stroke();
    ctx.closePath();
  }

  function drawYAxis() {
    const { colorMap, bids, asks } = options;
    if (!bids.length && !asks.length) return false;

    const maxAmount = maxYAmount;
    const stepCount = Math.max(~~(yAxisTop / (options.yAxisPx * ratio)), 4);

    ctx.font = 12 * ratio + 'px Arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillStyle = colorMap?.axisTextColor;
    ctx.beginPath();

    const stepAmount = maxAmount / stepCount;
    const stepHeight = getYPosition(0) - getYPosition(stepAmount) + ratio;
    for (let i = 0; i < stepCount + 2; i++) {
      const y = yAxisBottom - stepHeight * i - ratio;
      const x = xAxisWidth + 4 * ratio;
      ctx.moveTo(xAxisWidth, y);
      ctx.lineTo(toInt(x), y);
      

      const amount = formatYAxisAmount(stepAmount * i);
      ctx.fillText(amount, toInt(x + 3 * ratio), toInt(y));
    }
    ctx.stroke();
    ctx.closePath();
  }

  function drawTips(x, y) {
    clearCover();
    if (x && showTips) {
      const halfWidth = xAxisWidth / 2;
      const data = x > halfWidth ? options.asks : options.bids;
      const stepWidth = getStepWidth(data.length);
      let result = [];
      let closestX = 0;
      let minDistance = Infinity;
      for (let i = 0; i < data.length; i++) {
        const currentX = x > halfWidth ? halfWidth + currentTipsX + i * stepWidth : halfWidth - currentTipsX - i * stepWidth;
        const distance = Math.abs(x - currentX);
        if (distance < minDistance) {
          minDistance = distance;
          closestX = currentX;
          result = data[i];
        }
      }
      result.length && (drawTipsXAxis(closestX, y), drawTipsPoint(closestX, result), drawTipsContent(closestX, y, result));
    }
  }

  function drawTipsPoint(x, data) {
    const halfWidth = xAxisWidth / 2;
    const type = x > halfWidth ? 'asks' : 'bids';
    const { colorMap } = options;
    const color = colorMap[type];
    coverCtx.beginPath();
    coverCtx.strokeStyle = color.color;
    coverCtx.lineWidth = 3 * ratio;
    coverCtx.fillStyle = colorMap.bgColor;

    const radius = 3 * ratio;
    coverCtx.arc(x, getYPosition(data[1]), radius, 0, 2 * Math.PI);
    coverCtx.stroke();
    coverCtx.fill();
    coverCtx.closePath();
  }

  function drawTipsXAxis(x, y) {
    const { colorMap } = options;
    coverCtx.beginPath();
    coverCtx.strokeStyle = colorMap.tipsAxisColor;
    coverCtx.setLineDash([5 * ratio, 3 * ratio]);
    coverCtx.lineWidth = toInt(2 * ratio);
    coverCtx.lineTo(x, 0);
    coverCtx.lineTo(x, yAxisBottom);
    coverCtx.stroke();
    coverCtx.setLineDash([]);
    coverCtx.closePath();
  }

  function drawTipsContent(x, y, data = []) {
    const { colorMap, langMap, defaultLang, symbol } = options;
    const lang = langMap[options.lang] || defaultLang;
    const { price, sum } = lang;
    const [base, quote] = symbol.split('_') || [];
    const priceValue = options.formatPrice(data[0], data) || data[0];
    const amountValue = options.formatAmount(data[1], data) || data[1];
    const content = [price + ': ' + priceValue + ' ' + quote, sum + ': ' + amountValue + ' ' + base];
    const maxLenContent = [...content].sort((a, b) => b.length - a.length)[0];

    const padding = 15 * ratio;
    const fontSize = 12 * ratio;
    const lineHeight = 14 * ratio;
    const lineSpacing = 1.5 * lineHeight;
    const contentWidth = Math.max(coverCtx.measureText(maxLenContent).width, fontSize * (maxLenContent.length / 2)) + 2 * padding;
    const contentHeight = fontSize + lineSpacing * (content.length - 1) + 2 * padding;

    const margin = fontSize;
    let left = x + contentWidth + margin;
    let right = x - contentWidth - margin;
    let top = Math.min(Math.max(y + contentHeight + margin > yAxisBottom ? y - contentHeight - margin : y + margin, margin), height - contentHeight - margin);

    if (left > width) {
      if (right <= 0) {
        left = 0;
      } else {
        left = x - contentWidth - margin;
      }
    }

    coverCtx.beginPath();
    coverCtx.shadowOffsetX = 2 * ratio;
    coverCtx.shadowOffsetY = 2 * ratio;
    coverCtx.shadowBlur = 4 * ratio;
    coverCtx.shadowColor = colorMap.tipsBgColor;
    coverCtx.fillStyle = colorMap.tipsBgColor;
    coverCtx.roundRect(left, top, contentWidth, contentHeight, 10);
    coverCtx.fill();
    coverCtx.closePath();
    coverCtx.shadowBlur = 0;
    coverCtx.shadowColor = 'rgba(0,0,0,0)';

    coverCtx.textBaseline = 'top';
    coverCtx.font = lineHeight + 'px Arial';
    coverCtx.fillStyle = colorMap.tipsColor;
    content.forEach((item, index) => {
      coverCtx.fillText(item, left + padding, top + padding + lineSpacing * index);
    });
    showTips = true;
  }

  function formatYAxisAmount(amount, fixed = 2) {
    if (isNaN(amount)) return '--';
    fixed = !fixed || fixed < 0 ? 0 : fixed;

    const unitSize = options.shortNum && options.lang === 'zh-cn' ? 4 : 3;
    const units = options.shortNum && options.lang === 'zh-cn' ? ['', '万', '亿', '兆'] : ['', 'K', 'M', 'B', 'T'];
    const s = amount.toPrecision(2).split('e');
    const unitIndex = s.length === 1 ? 0 : Math.floor(Math.min(s[1].slice(1), 14) / unitSize);
    let num = unitIndex < 1 ? amount.toFixed(0 + fixed) : (amount / Math.pow(10, unitIndex * unitSize)).toFixed(0 + fixed);
    num = num < 0 ? num : Math.abs(num);
    return num.toFixed(fixed) + units[unitIndex];
  }

  function clearCover() {
    coverCtx.clearRect(0, 0, width * ratio, height * ratio);
  }

  function renderChart(data = {}) {
    const { bids, asks, ...rest } = data;
    formatData({ bids: bids || [], asks: asks || [] });
    Object.keys(rest).forEach((key) => {
      options[key] = rest[key];
    });
    options.colorMap = getColorMap();
    update();
  }

  function update() {
    clearCanvas();
    drawBids();
    drawAsks();
    drawAxis();
  }

  function reload() {
    if (resize()) update();
  }

  function resize() {
    const pixelRatio = getPixelRatio(ctx);
    const clientWidth = chart.offsetWidth * pixelRatio;
    const clientHeight = chart.offsetHeight * pixelRatio;
    if (clientWidth !== width || clientHeight !== height) {
      ratio = pixelRatio;
      isPhone = isPhoneDevice();
      canvas.width = cover.width = width = clientWidth;
      canvas.height = cover.height = height = clientHeight;
      xAxisStep = Math.max(3, ~~(width / (options.xAxisPx * ratio)));
      yAxisTop = ~~(height * options.paddingTopRate);
      xAxisWidth = width - options.wRuler * ratio;
      yAxisBottom = height - options.hRuler * ratio;
      yAxisHeight = yAxisBottom - yAxisTop;
      
      canvas.style.width = cover.style.width = clientWidth / ratio + 'px';
      canvas.style.height = cover.style.height = clientHeight / ratio + 'px';
      return true;
    }
    return false
  }

  function getMousePosition(e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * ratio;
    const y = (e.clientY - rect.top) * ratio;
    return { x, y };
  }

  function onMouseMove(e) {
    const { x, y } = getMousePosition(e);
    drawTips(x, y);
  }

  function onTouchMove(e) {
    if (e?.touches?.length < 2) {
      e.preventDefault();
      const touches = e.touches || [];
      const [{ clientX, clientY }] = touches;
      const { x, y } = getMousePosition({ clientX, clientY });
      drawTips(x, y);
    }
  }

  function onMouseLeave() {
    if (tipsTimer) clearTimeout(tipsTimer);
    tipsTimer = setTimeout(() => clearCover(), isPhone ? options.mTipsDelay : 500);
    showTips = true;
  }

  function addEventListener(type, handler, capture) {
    cover.addEventListener(type, handler, capture);
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, width * ratio, height * ratio);
  }

  chart.style.position = 'relative';

  chart.innerHTML = '';
  chart.appendChild(canvas);
  chart.appendChild(cover);

  addEventListener('mousemove', onMouseMove);
  addEventListener('touchmove', onTouchMove);
  addEventListener('mouseout', onMouseLeave);
  addEventListener('touchend', onMouseLeave);

  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    const min = Math.min(w, h);
    if (r > min / 2) r = min / 2;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
  };

  return {
    renderChart,
    update,
    reload,
  };
}