import { browser } from '$app/environment';

export const fullScreen = {
  launch(element) {
    if (browser) {
      const requestMethod =
        element.requestFullScreen ||
        element.webkitRequestFullScreen ||
        element.mozRequestFullScreen ||
        element.msRequestFullScreen;

      if (requestMethod) {
        requestMethod.call(element);
      } else if (typeof window.ActiveXObject !== 'undefined') {
        // Older IE.
        const wscript = new ActiveXObject('WScript.Shell');
        if (wscript !== null) {
          wscript.SendKeys('{F11}');
        }
      }
    }
  },
  exit() {
    if (browser) {
      const exitMethod =
        document.exitFullscreen ||
        document.mozCancelFullScreen ||
        document.webkitExitFullscreen ||
        document.msExitFullscreen;

      if (exitMethod) {
        exitMethod.call(document);
      } else if (typeof window.ActiveXObject !== 'undefined') {
        // Older IE.
        const wscript = new ActiveXObject('WScript.Shell');
        if (wscript !== null) {
          wscript.SendKeys('{F11}');
        }
      }
    }
  },
  isFullScreen() {
    if (browser) {
      return !!(
        document.fullscreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen ||
        document.webkitFullScreen ||
        document.msFullScreen
      );
    }
    return false;
  },
  changeEvent: (() => {
    if (browser) {
      if ('onfullscreenchange' in document) {
        return 'fullscreenchange';
      } else if ('onmozfullscreenchange' in document) {
        return 'mozfullscreenchange';
      } else if ('onwebkitfullscreenchange' in document) {
        return 'webkitfullscreenchange';
      } else if ('onmsfullscreenchange' in document) {
        return 'MSFullscreenChange';
      }
    }
    return '';
  })(),
};

// format.js
export function displayAmount(amount, decimals) {
  if (isNaN(amount) || amount === 0) return '0';
  const realAmount = parseFloat(amount);
  return realAmount.toFixed(decimals);
}

export function fix(num, precision, autoFix) {
  if (isNaN(num)) return 0;
  if (num === 0) return 0;
  if (precision < 0) return num;

  let result = parseFloat(num).toFixed(precision);
  if (autoFix && result === '0.00') {
    precision = 8;
    result = parseFloat(num).toFixed(precision);
    const arr = result.split('.');
    if (arr[1]) {
      let index = arr[1].length;
      for (let i = arr[1].length - 1; i >= 0; i--) {
        if (arr[1][i] !== '0') {
          index = i + 1;
          break;
        }
      }
      precision = index;
      result = parseFloat(num).toFixed(precision);
    }
  }
  return result;
}

export function getSymbolPrecision(pair) {
  if (!pair) return { price: 3, quantity: 6 }
  return {
    price: pair.tradeLimit.priceScale,
    quantity: pair.tradeLimit.quantityScale
  }
}