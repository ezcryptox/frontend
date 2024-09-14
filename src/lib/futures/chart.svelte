<script >
  import { widget } from "$lib/charting_library";
  import { _ } from 'svelte-i18n';
  import { getContext } from "svelte";
	import { mode } from 'mode-watcher';
  import {	currentSelectedPair, exchangeChartType } from '$lib/store/marketdata';
  import { UDFCompatibleDatafeed } from "$lib/datafeeds/udf/src/udf-compatible-datafeed";
  import { onMount } from "svelte";
  import Datafeed from "$lib/datafeeds/datafeed";
  import { browser } from '$app/environment';

	let activeInterval = '1hour';
	let showMoreIntervals = false;
	const supportedIntervals = [
		'1min',
		'5min',
		'10min',
		'15min',
		'30min',
		'1hour',
		'2hour',
		'4hour',
		'6hour',
		'12hour',
		'1day',
		'3day',
		'1week',
		'1month'
	];
	const resolutionMap = {
		'1min': '1',
		'5min': '5',
		'10min': '15',
		'15min': '15',
		'30min': '30',
		'1hour': '60',
		'2hour': '120',
		'4hour': '240',
		'6hour': '360',
		'12hour': '720',
		'1day': '1D',
		'3day': '3D',
		'1week': '1W',
		'1month': '1M'
	};

  const MAX_FEATURE_LEN = 6;
	const saveChartConfig = {
		key: 'trade:tradingview-onAutoSaveNeeded',
		save(content) {
			localStorage.setItem(this.key, JSON.stringify(content));
		},
		load(options) {
			let content;
			const contentStr = localStorage.getItem(this.key);
			if (contentStr) {
				const { symbol, display_name, interval } = options;
				const shortName = display_name || symbol;
				try {
					content = JSON.parse(contentStr);
					content.charts[0].panes[0].sources[0].state.symbol = symbol;
					content.charts[0].panes[0].sources[0].state.shortName = shortName;
					content.charts[0].panes[0].sources[0].state.interval = interval;
				} catch (e) {
					localStorage.removeItem(this.key);
				}
			}
			return content;
		}
	};

  const getOverrides = (isDark) => {
		return {
			theme: isDark ? 'Dark' : 'Light',
			overrides: {
				'mainSeriesProperties.showCountdown': false,
				volumePaneSize: 'small',
				'paneProperties.background': isDark ? '#131316' : '#ffffff',
				'paneProperties.backgroundType': 'solid',
				'paneProperties.legendProperties.showSeriesTitle': false,
				'scalesProperties.fontSize': 12,
				'scalesProperties.lineColor': isDark ? '#616161' : '#b8b8b8',
				'scalesProperties.textColor': '#878787',
				'mainSeriesProperties.candleStyle.upColor': isDark ? '#119e5f' : '#1a8f5c',
				'mainSeriesProperties.candleStyle.downColor': isDark ? '#d64d4f' : '#c44749',
				'mainSeriesProperties.candleStyle.drawWick': true,
				'mainSeriesProperties.candleStyle.drawBorder': false,
				'mainSeriesProperties.candleStyle.wickUpColor': isDark ? '#119e5f' : '#1a8f5c',
				'mainSeriesProperties.candleStyle.wickDownColor': isDark ? '#d64d4f' : '#c44749',
				'mainSeriesProperties.candleStyle.barColorsOnPrevClose': false,
				'mainSeriesProperties.barStyle.upColor': isDark ? '#119e5f' : '#1a8f5c',
				'mainSeriesProperties.barStyle.downColor': isDark ? '#d64d4f' : '#c44749',
				'mainSeriesProperties.hollowCandleStyle.upColor': isDark ? '#119e5f' : '#1a8f5c',
				'mainSeriesProperties.hollowCandleStyle.downColor': isDark ? '#d64d4f' : '#c44749',
				'mainSeriesProperties.hollowCandleStyle.drawWick': true,
				'mainSeriesProperties.hollowCandleStyle.drawBorder': true,
				'mainSeriesProperties.hollowCandleStyle.borderUpColor': isDark ? '#119e5f' : '#1a8f5c',
				'mainSeriesProperties.hollowCandleStyle.borderDownColor': isDark ? '#d64d4f' : '#c44749',
				'mainSeriesProperties.hollowCandleStyle.wickColor': isDark ? '#119e5f' : '#1a8f5c',
				'mainSeriesProperties.areaStyle.color1': 'rgba(0,0,0,0)',
				'mainSeriesProperties.areaStyle.color2': 'rgba(0,0,0,0)',
				'mainSeriesProperties.areaStyle.linecolor': isDark ? '#119e5f' : '#1a8f5c',
				'mainSeriesProperties.areaStyle.linestyle': 0,
				'mainSeriesProperties.areaStyle.linewidth': 1
			}
		};
	};

  const SCRIPT_ID = 'tradingview-widget-script';
	let intervalFavList = ['1min'];
	$: intervalFavMap = { '1min': true };
	function loadIntervalList() {
		if (browser) {
			const fav = localStorage.getItem('x-fav-intervals');
			if (fav) intervalFavList = JSON.parse(fav);
			intervalFavMap = Object.assign({}, ...intervalFavList.map((int) => ({ [int]: true })));
		}
	}
  const setOverrides = async (widget, isDark) => {
		if (widget) {
			const { overrides, theme } = getOverrides(isDark);
			try {
        // await widget.changeTheme(theme).catch();
				widget.applyOverrides(overrides);
				widget.save((content) => {
					return saveChartConfig.save(content);
				});
			} catch (err) {
      }
		}
	};

  let tvWidget;
	function initWidget(options) {
		if (typeof TradingView !== 'undefined') {
			// @ts-ignore
			tvWidget = new window.TradingView.widget(options);
			if (tvWidget) {
				setOverrides(tvWidget, $mode === 'dark');
				tvWidget.onChartReady(() => {
					tvWidget.activeChart().executeActionById('chartReset');
					setDefaultMA(tvWidget.activeChart());

					tvWidget.subscribe('onAutoSaveNeeded', () => {
						tvWidget.save((c) => {
							return saveChartConfig.save(c);
						});
					});
				});
			}
		} else console.log('Trading View is null')
	}

  const setDefaultMA = (chart) => {
		if (chart && chart.getAllStudies) {
			const maList = chart.getAllStudies().filter((item) => item.name === 'Moving Average');
			const maLen = [5, 10, 30];
			if (!maList.length) {
				for (const len of maLen) {
					chart.createStudy(
						'Moving Average',
						true,
						false,
						{
							source: 'close',
							length: len
						},
						{
							showLabelsOnPriceScale: false
						}
					);
				}
			}
		}
	};

  const handleFullScreenMode = () => {
		if (tvWidget) {
			tvWidget.startFullscreen();
		}
	};

 
  function getLanguageFromURL() {
    const regex = new RegExp("[\\?&]lang=([^&#]*)");
    const results = regex.exec(window.location.search);
    return results === null
      ? null
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

	// const fume = getContext("futures-last-symbol")
	// console.log(fume)

  onMount(() => {
    const widgetOptions = {
      symbol: "BTC/USDT",
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: Datafeed,
      interval: resolutionMap[activeInterval],
      container: "tv-chart-container",
      library_path: "/charting_library/",
      locale: getLanguageFromURL() || "en",
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      charts_storage_url: "https://saveload.tradingview.com",
      charts_storage_api_version: "1.1",
      client_id: "ezcrytox.com",
	  symbolSearch: {
		enabled: false
	},
	symbol_search_request: false,
	  custom_font_family: "'Inconsolata', monospace",
      user_id: "1",
      fullscreen: false,
      theme: $mode,
      autosize: true,
      debug: false,
	  loading_screen: { backgroundColor: $mode === "dark" ? "#000000" : "#fff" }
    };

    const tvWidget = new widget(widgetOptions);
  });

</script>

<div class="d09e8c81 flex-column">
    <div class="c1ffc6e0">
        <div class="bfd5c32f" style="height: 520px;" id="tv-chart-container"></div>
    </div>
</div>

<style>
    #tv-chart-container {
      height: calc(100vh - 41px);
    }
  </style>