<script>
  	import {
		currentSelectedPair,
		exchangeChartType
	} from '$lib/store/marketdata';
	import { onMount } from 'svelte';
	import '../../styles/trade/chart.css';
	import { _ } from 'svelte-i18n';
	import { mode } from 'mode-watcher';
	import Datafeed from '$lib/datafeeds/datafeed';
	import { browser } from '$app/environment';
	let activeInterval = '1min';
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
	const addFavInterval = (interval) => {
		if (intervalFavList.includes(interval)) return;
		if (intervalFavList.length >= MAX_FEATURE_LEN) return;
		intervalFavList = [...intervalFavList, interval].sort();
		localStorage.setItem('x-fav-intervals', JSON.stringify(intervalFavList));
	};
	const removeFavInterval = (interval) => {
		if (!intervalFavList.includes(interval)) return;
		if (intervalFavList.length === 1 && interval === intervalFavList[0]) return;
		const temp = [...intervalFavList];
		temp.splice(temp.indexOf(interval), 1);
		intervalFavList = [...temp].sort();
		localStorage.setItem('x-fav-intervals', JSON.stringify(intervalFavList));
	};
	const handleFavIntervalToggle = (interval) => (ev) => {
		if (intervalFavList.includes(interval)) return removeFavInterval(interval);
		addFavInterval(interval);
		intervalFavMap = Object.assign({}, ...intervalFavList.map((int) => ({ [int]: true })));
		ev.stopPropagation();
		ev.preventDefault();
	};
	const handleShowIndicator = () => {
		if (!tvWidget) return;
		tvWidget.chart().executeActionById('insertIndicator');
	};
	const handleShowSetting = () => {
		if (!tvWidget) return;
		tvWidget.chart().executeActionById('chartProperties');
	};

	let currChartType = 'candle';
	const handleChartType = (type) => (ev) => {
		if (tvWidget) {
			currChartType = type;
			const isTimeChart = type === 'time';
			const activeChart = tvWidget.activeChart();
			activeChart.setChartType(isTimeChart ? 3 : 1);
			if (isTimeChart && activeInterval !== '1min') {
				activeInterval = '1min';
				tvWidget.activeChart().setResolution(resolutionMap['1min']);
			}
			activeChart.getAllStudies().forEach((e) => {
				'Moving Average' === e.name && activeChart.getStudyById(e.id).setVisible(!isTimeChart);
			});
		}
	};
	const handleIntervalChange = (interval) => (ev) => {
		if (tvWidget) {
			if (currChartType === 'time') {
				handleChartType('candle')();
			}
			if (activeInterval === interval) return;
			showMoreIntervals = false;
			activeInterval = interval;
			tvWidget.activeChart().setResolution(resolutionMap[interval]);
			localStorage.setItem('x-interval', interval);
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

	
	function appendScript(onload) {
    if (typeof TradingView !== 'undefined') {
      onload()
      return;
    }
		if (document.getElementById(SCRIPT_ID) === null) {
			const script = document.createElement('script');
			script.id = SCRIPT_ID;
			script.type = 'text/javascript';
			script.async = true;
			script.src = '/charting_library/charting_library.js';
			script.onload = onload;
			document.getElementsByTagName('head')[0].appendChild(script);
		} else {
			const script = document.getElementById(SCRIPT_ID);
			// @ts-ignore
			const oldOnload = script.onload;
			// @ts-ignore
			return (script.onload = () => {
				// @ts-ignore
				oldOnload();
				onload();
			});
		}
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
  
	onMount(() => {
		activeInterval = browser ? localStorage.getItem('x-interval') || '1min' : '1min';
		loadIntervalList();
		const unsubMode = mode.subscribe((theme) => {
		if (tvWidget) {
			tvWidget.changeTheme(theme);
		}
	});
	let prevSelected = $currentSelectedPair?.symbol;
	 const unsubPair = 	currentSelectedPair.subscribe(async (asset) => {
			if (asset && (asset.symbol !== prevSelected || !tvWidget)) {
				if (tvWidget) {
					tvWidget.activeChart().setSymbol(asset.displayName);
				} else {
					appendScript(() => {
						initWidget({
							debug: false, // uncomment this line to see Library errors and warnings in the console
							fullscreen: false,
							symbol: asset.displayName,
							// @ts-ignore
							interval: resolutionMap[activeInterval],
							container: 'tv_chart_container',
							custom_css_url: 'tv.css',
							overrides: {
								'mainSeriesProperties.showCountdown': false
							},
							datafeed: Datafeed,
							library_path: '/charting_library/',
							// @ts-ignore
							locale: 'en',
							symbolSearch: {
								enabled: false
							},
							symbol_search_request: false,
							symbol_search_control: {
								enabled: false
							},
							disabled_features: [
								'header_widget',
								'timeframes_toolbar',
								'volume_force_overlay',
								'symbol_info'
							],
							enabled_features: [
								'move_logo_to_main_pane',
								'side_toolbar_in_fullscreen_mode',
								'study_templates'
							],
							loading_screen: {
								backgroundColor: 'transparent'
							},
							// charts_storage_url: 'https://saveload.tradingview.com',
							// charts_storage_api_version: '1.1',
							client_id: 'ezcryptox',
							user_id: '1',
							// @ts-ignore
							theme: $mode,
							autosize: true
						});
					});
				}
			}
			prevSelected = asset?.symbol;
		});

		return () => {
			unsubMode()
			unsubPair();
		}
	});
</script>
<section class="_7f9800af">
				<div class="f2ad5021 _8eddb339">
					<div class="ea55d85f">
						<div class="_9d1f25a8 flex items-center justify-center">
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								><path
									d="M4.4603 5.59847L3.66802 6.39076L1.87204 4.53064L1.87205 4.53063L1.87081 4.52939C1.64319 4.30177 1.64319 3.96509 1.87081 3.73748L3.73748 1.87081C3.96509 1.64319 4.30177 1.64319 4.52939 1.87081L6.32534 3.66676L5.53343 4.45868L4.20414 3.12939L4.13343 3.05868L4.06272 3.12939L3.12939 4.06272L3.0603 4.13181L3.12776 4.20248L4.4603 5.59847ZM12.8334 11.8001V11.7587L12.8041 11.7294L11.344 10.2692L12.1977 9.47246L13.9668 11.2415V13.9668H11.2415L9.47246 12.1977L10.2692 11.344L11.7294 12.8041L11.7587 12.8334H11.8001H12.7334H12.8334V12.7334V11.8001ZM10.4039 1.87109L10.4041 1.87081C10.6318 1.64319 10.9684 1.64319 11.1961 1.87081L13.9961 4.67081C14.2237 4.89842 14.2237 5.30177 13.9961 5.52939L5.52939 13.9961C5.30177 14.2237 4.96509 14.2237 4.73748 13.9961L1.87081 11.1294C1.64323 10.9018 1.64319 10.5652 1.87069 10.3376C1.87073 10.3376 1.87077 10.3375 1.87081 10.3375L10.4039 1.87109ZM5.06272 12.7375L5.13343 12.8082L5.20414 12.7375L12.7375 5.20414L12.8082 5.13343L12.7375 5.06272L10.8041 3.12939L10.7334 3.05868L10.6627 3.12939L9.26272 4.52939L9.19441 4.5977L9.26033 4.66833L10.1277 5.5977L9.33343 6.39201L8.47081 5.52939L8.4001 5.45868L8.32939 5.52939L7.39605 6.46272L7.32534 6.53343L7.39605 6.60414L8.25868 7.46676L7.46676 8.25868L6.60414 7.39605L6.53343 7.32534L6.46272 7.39605L5.52939 8.32939L5.45868 8.4001L5.52939 8.47081L6.39201 9.33343L5.6001 10.1253L4.73748 9.26272L4.6651 9.19035L4.59443 9.26438L3.19443 10.7311L3.12697 10.8017L3.19605 10.8708L5.06272 12.7375Z"
									fill="#2B2B2E"
									stroke="white"
									stroke-width="0.2"
								></path></svg
							>
						</div>
						<div class="_5daf8810">
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<span
								on:click={handleChartType('time')}
								class="_9391ea7a{currChartType === 'time' ? ' d6ac01f2' : ''}">{$_('g-date')}</span
							>
							{#each intervalFavList as interval}
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<span
									on:click={handleIntervalChange(interval)}
									class="_9391ea7a{interval === activeInterval && currChartType === 'candle'
										? ' d6ac01f2'
										: ''}">{interval}</span
								>
							{/each}
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<span
								on:mouseenter={() => (showMoreIntervals = true)}
								on:mouseleave={() => (showMoreIntervals = false)}
								class="_40989834{showMoreIntervals ? ' _870ec573' : ' _8ac44990'}"
							>
								<span
									class="_432cfdda{!intervalFavList.includes(activeInterval) ? ' d6ac01f2' : ''}"
									>{!intervalFavList.includes(activeInterval) && currChartType === 'candle'
										? activeInterval
										: $_('g-more')}</span
								>
								<div class="_41c42367">
									{#each supportedIntervals as interval}
										<!-- svelte-ignore a11y-no-static-element-interactions -->
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<span on:click={handleIntervalChange(interval)} class="_3b5033be">
											{#if intervalFavMap[interval]}
												<svg
													aria-hidden="true"
													class="svgicon _3c0880e0"
													style="width: 14px; height: 14px; min-width: 14px;"
													><use xlink:href="#star"></use></svg
												>
											{/if}

											<span
												class="a53c3f73{interval === activeInterval && currChartType === 'candle'
													? ' d6ac01f2'
													: ''}">{interval}</span
											><span>
												<!-- svelte-ignore a11y-no-static-element-interactions -->
												<!-- svelte-ignore a11y-click-events-have-key-events -->
												<span
													on:click={handleFavIntervalToggle(interval)}
													class="_53b7858e{intervalFavMap[interval] ? ' _689984b3' : ' _829577c6'}"
												></span></span
											></span
										>
									{/each}
								</div>
							</span><span class="_087a05bb"></span>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<span on:click={handleShowIndicator} class="fe19bcf9"
								><svg
									width="15"
									height="8"
									fill="currentColor"
									viewBox="0 0 15 8"
									xmlns="http://www.w3.org/2000/svg"
									><path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M14.6818 0.813949L12.0933 5.34375C11.1553 6.98535 8.80477 7.03172 7.8027 5.4284L6.34845 3.1016C5.7472 2.13961 4.33692 2.16743 3.77409 3.15239L1.18563 7.68219L0.317383 7.18605L2.90584 2.65625C3.8439 1.01466 6.19437 0.968282 7.19645 2.5716L8.6507 4.8984C9.25194 5.86039 10.6622 5.83257 11.2251 4.84761L13.8135 0.31781L14.6818 0.813949Z"
									></path></svg
								></span
							><span class="_087a05bb"></span>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<span on:click={handleShowSetting} class="b0a0fc30"
								><svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
									><g clip-path="url(#clip0_15422_14214)"
										><path
											d="M9.19943 2L9.38693 3.3L9.46193 3.8375L9.94943 4.0625C10.1494 4.1625 10.3619 4.275 10.5494 4.4L10.9869 4.6875L11.4744 4.5L12.7494 4L13.9369 5.9875L12.8869 6.7875L12.4494 7.125L12.4994 7.675C12.5119 7.7875 12.5119 7.9 12.5119 8C12.5119 8.1 12.5119 8.2125 12.4994 8.325L12.4494 8.875L12.8869 9.2125L13.9369 10.0125L12.7619 12L11.4744 11.5L10.9869 11.3125L10.5494 11.6C10.3494 11.7375 10.1494 11.85 9.94943 11.9375L9.46193 12.1625L9.38693 12.6875L9.19943 14H6.79943L6.61193 12.7L6.53693 12.1625L6.04943 11.9375C5.84943 11.8375 5.63693 11.725 5.44943 11.6L5.01193 11.3125L4.52443 11.5L3.24943 12L2.06193 10.0125L3.11193 9.2125L3.54943 8.875L3.49943 8.325C3.48693 8.2125 3.48693 8.1 3.48693 8C3.48693 7.9 3.48693 7.7875 3.49943 7.675L3.54943 7.125L3.11193 6.7875L2.06193 5.9875L3.23693 4L4.52443 4.5L5.01193 4.6875L5.44943 4.4C5.64943 4.2625 5.84943 4.15 6.04943 4.0625L6.53693 3.8375L6.61193 3.3125L6.79943 2H9.19943ZM9.33693 1H6.66193C6.23693 1 5.88693 1.3 5.82443 1.7L5.62443 3.15C5.37443 3.2625 5.13693 3.4 4.88693 3.5625L3.47443 3.0125C3.37443 2.975 3.27443 2.9625 3.17443 2.9625C2.87443 2.9625 2.58693 3.1125 2.44943 3.375L1.11193 5.625C0.899427 5.975 0.986927 6.4375 1.31193 6.6875L2.49943 7.5875C2.48693 7.7375 2.47443 7.875 2.47443 8C2.47443 8.125 2.47443 8.2625 2.49943 8.4125L1.31193 9.3125C0.986927 9.5625 0.899427 10 1.11193 10.375L2.43693 12.6125C2.58693 12.875 2.87443 13.0375 3.17443 13.0375C3.27443 13.0375 3.36193 13.025 3.46193 12.9875L4.87443 12.4375C5.11193 12.6 5.36193 12.7375 5.61193 12.85L5.82443 14.2875C5.87443 14.6875 6.23693 15 6.66193 15H9.33693C9.76193 15 10.1119 14.7 10.1744 14.3L10.3869 12.85C10.6369 12.7375 10.8744 12.6 11.1244 12.4375L12.5369 12.9875C12.6369 13.025 12.7369 13.0375 12.8369 13.0375C13.1369 13.0375 13.4244 12.8875 13.5619 12.625L14.8994 10.3625C15.0994 10 15.0119 9.5625 14.6869 9.3125L13.4994 8.4125C13.5119 8.2875 13.5244 8.15 13.5244 8C13.5244 7.85 13.5119 7.7125 13.4994 7.5875L14.6869 6.6875C15.0119 6.4375 15.0994 6 14.8869 5.625L13.5619 3.3875C13.4119 3.125 13.1244 2.9625 12.8244 2.9625C12.7244 2.9625 12.6369 2.975 12.5369 3.0125L11.1244 3.5625C10.8869 3.4 10.6369 3.2625 10.3869 3.15L10.1744 1.7125C10.1119 1.3 9.76193 1 9.33693 1ZM7.99943 6C9.09943 6 9.99943 6.9 9.99943 8C9.99943 9.1 9.09943 10 7.99943 10C6.89943 10 5.99943 9.1 5.99943 8C5.99943 6.9 6.89943 6 7.99943 6ZM7.99943 5C6.34943 5 4.99943 6.35 4.99943 8C4.99943 9.65 6.34943 11 7.99943 11C9.64943 11 10.9994 9.65 10.9994 8C10.9994 6.35 9.64943 5 7.99943 5Z"
										></path><path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M5.77514 1.69229C5.84155 1.26726 6.21311 0.950012 6.66204 0.950012H9.33704C9.78639 0.950012 10.1577 1.26772 10.224 1.70502L10.4325 3.11573C10.669 3.22372 10.9053 3.35392 11.1309 3.50638L12.5189 2.96592C12.6254 2.92599 12.7195 2.91251 12.8245 2.91251C13.1419 2.91251 13.4461 3.08413 13.6053 3.36238C13.6053 3.36249 13.6052 3.36227 13.6053 3.36238L14.9301 5.59954C15.1544 5.99541 15.063 6.4614 14.7175 6.72714L13.5521 7.61045C13.5636 7.7284 13.5745 7.8586 13.5745 8.00001C13.5745 8.14142 13.5636 8.27163 13.5521 8.38958L14.7172 9.27266C15.0623 9.53807 15.155 10.003 14.9433 10.3867L14.9426 10.388L13.6057 12.6494C13.4581 12.9301 13.1522 13.0875 12.837 13.0875C12.7328 13.0875 12.6265 13.0745 12.5195 13.0343L11.1303 12.4934C10.895 12.6454 10.6693 12.7758 10.4326 12.8843L10.224 14.3073C10.1576 14.7323 9.78597 15.05 9.33704 15.05H6.66204C6.21348 15.05 5.82857 14.7204 5.775 14.2943C5.77497 14.2941 5.77502 14.2945 5.775 14.2943L5.56657 12.8843C5.33005 12.7763 5.0938 12.6461 4.86818 12.4936L3.48018 13.0341C3.3737 13.074 3.27954 13.0875 3.17454 13.0875C2.85715 13.0875 2.55299 12.9159 2.39383 12.6377C2.39376 12.6376 2.3939 12.6378 2.39383 12.6377L1.06902 10.4005C0.844691 10.0046 0.936083 9.53863 1.28156 9.27288L2.44551 8.39072C2.42454 8.24831 2.42454 8.11757 2.42454 8.0013V8.00001C2.42454 7.88329 2.43521 7.75617 2.44654 7.62124C2.44683 7.61775 2.44713 7.61425 2.44742 7.61075L1.28184 6.72736C0.936812 6.46195 0.843531 5.97115 1.06918 5.59926C1.06922 5.59919 1.06914 5.59932 1.06918 5.59926L2.40589 3.3506C2.55356 3.06991 2.85937 2.91251 3.17454 2.91251C3.27877 2.91251 3.38504 2.92555 3.4921 2.9657L4.88133 3.50663C5.11647 3.35472 5.34214 3.22429 5.57878 3.11588L5.77514 1.69229ZM5.87401 1.70731L5.67029 3.18425L5.64506 3.19561C5.39817 3.30671 5.163 3.44277 4.91429 3.60443L4.89279 3.61841L3.45669 3.05922C3.36384 3.02445 3.27021 3.01251 3.17454 3.01251C2.89017 3.01251 2.62141 3.15467 2.49383 3.39821L2.49258 3.4006L1.15502 5.65056C0.955849 5.97861 1.0376 6.41323 1.34242 6.6478C1.34245 6.64782 1.34238 6.64777 1.34242 6.6478L2.55165 7.56427L2.54937 7.59166C2.54833 7.60414 2.54729 7.6165 2.54626 7.62875C2.53485 7.76483 2.52454 7.88772 2.52454 8.00001C2.52454 8.1253 2.52463 8.25891 2.54886 8.40429L2.55383 8.43411L1.34253 9.35214C1.34248 9.35218 1.34258 9.3521 1.34253 9.35214C1.03825 9.58632 0.95497 9.99597 1.1553 10.3499C1.15538 10.3501 1.15522 10.3498 1.1553 10.3499L2.48006 12.587C2.62095 12.8336 2.89207 12.9875 3.17454 12.9875C3.26945 12.9875 3.3508 12.9758 3.44421 12.9408C3.4443 12.9408 3.44411 12.9408 3.44421 12.9408L4.88099 12.3813L4.90278 12.3962C5.13766 12.557 5.38505 12.693 5.63256 12.8044L5.6575 12.8156L5.87417 14.2813C5.92086 14.6549 6.26079 14.95 6.66204 14.95H9.33704C9.73801 14.95 10.0664 14.6674 10.1251 14.2926C10.1251 14.2925 10.1251 14.2927 10.1251 14.2926L10.3415 12.8157L10.3665 12.8044C10.6134 12.6933 10.8486 12.5573 11.0973 12.3956L11.1188 12.3816L12.5546 12.9407C12.5547 12.9407 12.5545 12.9407 12.5546 12.9407C12.6475 12.9755 12.7414 12.9875 12.837 12.9875C13.1214 12.9875 13.3902 12.8454 13.5177 12.6018L13.5189 12.5995L14.8561 10.3377C15.044 9.99654 14.9614 9.58675 14.6567 9.35228C14.6567 9.35223 14.6568 9.35233 14.6567 9.35228L13.447 8.43543L13.4498 8.40754C13.4623 8.28276 13.4745 8.14736 13.4745 8.00001C13.4745 7.85267 13.4623 7.71727 13.4498 7.59249L13.447 7.5646L14.6566 6.64788C14.6566 6.64785 14.6565 6.64792 14.6566 6.64788C14.9609 6.4137 15.0441 6.00405 14.8438 5.65007C14.8437 5.64994 14.8439 5.65021 14.8438 5.65007L13.519 3.41299C13.3781 3.16643 13.107 3.01251 12.8245 3.01251C12.7296 3.01251 12.6483 3.02424 12.5549 3.05922C12.5548 3.05926 12.555 3.05919 12.5549 3.05922L11.1181 3.61868L11.0963 3.60378C10.8614 3.44307 10.614 3.30699 10.3665 3.19561L10.3416 3.18438L10.1251 1.72C10.1251 1.71997 10.1251 1.72003 10.1251 1.72C10.0663 1.33235 9.73766 1.05001 9.33704 1.05001H6.66204C6.26112 1.05001 5.93278 1.33255 5.87401 1.70731ZM6.75618 1.95001H9.24285L9.43653 3.29287L9.50779 3.80356L9.97191 4.01777C10.1723 4.11797 10.387 4.23157 10.5771 4.3583C10.5772 4.35834 10.5771 4.35827 10.5771 4.3583L10.993 4.63163L11.4563 4.45346L12.7707 3.93799L14.0029 6.00021L12.9176 6.8271L12.5018 7.14783L12.5492 7.66949C12.5493 7.66965 12.5492 7.66933 12.5492 7.66949C12.562 7.78458 12.562 7.89968 12.562 7.99891V8.00111C12.562 8.10035 12.562 8.21496 12.5493 8.33005C12.5493 8.33021 12.5493 8.32989 12.5493 8.33005L12.5018 8.85219L12.9173 9.17274L14.0027 9.99969L12.7835 12.062L11.4566 11.5467L10.993 11.3684L10.5779 11.6412C10.5777 11.6413 10.578 11.6411 10.5779 11.6412C10.3758 11.7801 10.1729 11.8943 9.97005 11.9831C9.96989 11.9832 9.9702 11.983 9.97005 11.9831L9.50769 12.1965L9.24291 14.05H6.75624L6.56255 12.7071L6.4913 12.1965L6.02717 11.9823C5.82677 11.8821 5.6121 11.7685 5.42198 11.6417C5.42192 11.6417 5.42204 11.6418 5.42198 11.6417L5.00603 11.3684L4.5428 11.5466L3.22835 12.062L1.99621 9.99981L3.0815 9.17292L3.49726 8.85219L3.44979 8.33004C3.43704 8.21495 3.43704 8.10034 3.43704 8.00111V7.99892C3.43704 7.89968 3.43704 7.78508 3.44979 7.66998L3.49726 7.14783L3.08174 6.82728L1.99637 6.00034L3.21559 3.93804L4.54249 4.45334L5.00603 4.63163L5.42164 4.35852C5.62367 4.21966 5.82614 4.10571 6.02904 4.0169L6.49139 3.80351L6.75618 1.95001ZM6.84291 2.05001L6.58269 3.87151L6.07049 4.10791C5.8737 4.19401 5.67554 4.30531 5.47787 4.44121L5.47701 4.44181L5.01805 4.74339L4.50659 4.54668L3.25849 4.06198L2.12771 5.97469L3.14234 6.74774L3.60182 7.10219L3.54925 7.68054C3.5371 7.78986 3.53704 7.89964 3.53704 8.00001C3.53704 8.10039 3.53709 8.21017 3.54924 8.31949L3.54935 8.32048L3.60182 8.89783L3.14258 9.2521L2.12787 10.0252L3.27073 11.938L4.50629 11.4535L5.01805 11.2566L5.477 11.5582C5.66163 11.6813 5.87188 11.7928 6.07121 11.8924L6.58279 12.1286L6.66153 12.6929L6.84285 13.95H9.15618L9.41639 12.1285L9.9295 11.8917C10.1263 11.8056 10.3235 11.6947 10.5212 11.5588L10.5221 11.5582L10.981 11.2566L11.4925 11.4533L12.7406 11.938L13.8714 10.0253L12.8567 9.25228L12.3973 8.89783L12.4497 8.32049L12.4498 8.31949C12.462 8.21017 12.462 8.10039 12.462 8.00001C12.462 7.89964 12.462 7.78985 12.4498 7.68053L12.4497 7.67954L12.3973 7.10219L12.8565 6.74792L13.8712 5.97481L12.7284 4.06203L11.4928 4.54656L10.981 4.74339L10.5221 4.4418C10.3375 4.31871 10.1272 4.20726 9.92788 4.10758L9.41629 3.87147L9.33755 3.30715L9.15623 2.05001H6.84291ZM4.94954 8.00001C4.94954 6.3224 6.32193 4.95001 7.99954 4.95001C9.67716 4.95001 11.0495 6.3224 11.0495 8.00001C11.0495 9.67763 9.67716 11.05 7.99954 11.05C6.32193 11.05 4.94954 9.67763 4.94954 8.00001ZM7.99954 5.05001C6.37716 5.05001 5.04954 6.37763 5.04954 8.00001C5.04954 9.6224 6.37716 10.95 7.99954 10.95C9.62193 10.95 10.9495 9.6224 10.9495 8.00001C10.9495 6.37763 9.62193 5.05001 7.99954 5.05001ZM7.99954 6.05001C6.92716 6.05001 6.04954 6.92763 6.04954 8.00001C6.04954 9.0724 6.92716 9.95001 7.99954 9.95001C9.07193 9.95001 9.94954 9.0724 9.94954 8.00001C9.94954 6.92763 9.07193 6.05001 7.99954 6.05001ZM5.94954 8.00001C5.94954 6.8724 6.87193 5.95001 7.99954 5.95001C9.12716 5.95001 10.0495 6.8724 10.0495 8.00001C10.0495 9.12763 9.12716 10.05 7.99954 10.05C6.87193 10.05 5.94954 9.12763 5.94954 8.00001Z"
										></path></g
									><defs
										><clipPath id="clip0_15422_14214"><rect width="16" height="16"></rect></clipPath
										></defs
									></svg
								></span
							>
						</div>
					</div>
					<div class="d66c85b6">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<span class="_63bc7ce4">{$_('tradingview')}</span>
						<span class="_0fc78741"></span>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<span on:click={() => exchangeChartType.set('depth')}>{$_('depth')}</span><span
							class="_0fc78741"
						></span>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<span on:click={handleFullScreenMode} class="a09788c4"
							><svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								><path
									d="M9.34443 8L12.0575 5.28738L14 7.22995L14 2.00031L8.77058 2.00031L10.7131 3.94288L8 6.65551L9.34443 8Z"
									fill="#616161"
								></path><path
									d="M6.65557 8L3.9425 10.7126L2.00001 8.77005L2.00001 13.9997H7.22942L5.28693 12.0571L8 9.34449L6.65557 8Z"
									fill="#616161"
								></path></svg
							></span
						>
					</div>
				</div>
				<div id="tv_chart_container" style="flex: 1 1 0%;" />
			</section>