<script>
	import { onMount } from 'svelte';
	// import Datafeed from '$lib/datafeeds/datafeed';
	import * as Datafeeds from '$lib/datafeeds/udf/lib/udf-compatible-datafeed';
	import { ServerURl } from '$lib/backendUrl';
	import { mode } from 'mode-watcher';
	export let pair = 'ETH_USDT';
	const options = {
		debug: false, // uncomment this line to see Library errors and warnings in the console
		fullscreen: false,
		symbol: pair,
		// @ts-ignore
		interval: '1D',
		container: 'tv_chart_container',
		custom_css_url: 'tv.css',
		overrides: {
			'mainSeriesProperties.showCountdown': false
		},
		//	BEWARE: no trailing slash is expected in feed URL
		datafeed: new Datafeeds.UDFCompatibleDatafeed(`${ServerURl()}/api/market`, 5, {
			maxResponseLength: 1000,
			expectedOrder: 'latestFirst'
		}),
		library_path: '/charting_library/',
		// @ts-ignore
		locale: 'en',
		disabled_features: ['header_widget', 'timeframes_toolbar', 'volume_force_overlay'],
		enabled_features: [
			'move_logo_to_main_pane',
			'side_toolbar_in_fullscreen_mode',
			'study_templates'
		],
		loading_screen: {
			backgroundColor: 'transparent'
		},
		charts_storage_url: 'https://saveload.tradingview.com',
		charts_storage_api_version: '1.1',
		client_id: 'tradingview.com',
		user_id: 'public_user_id',
		// @ts-ignore
		theme: $mode,
		autosize: true
	};
	const SCRIPT_ID = 'tradingview-widget-script';

	onMount(() => {
		appendScript(initWidget);
	});
	let tvWidget; // Store the TradingView widget instance
	function initWidget() {
		if (typeof TradingView !== 'undefined') {
			// @ts-ignore
			tvWidget = new window.TradingView.widget(options);
			console.log('Widget => ', tvWidget);
		}
	}

	mode.subscribe((theme) => {
		if (tvWidget) {
			// Remove the old iframe
			const chartContainer = document.getElementById('tv_chart_container');
			chartContainer.innerHTML = '';
			// @ts-ignore
			tvWidget = new window.TradingView.widget({ ...options, theme });
		}
		// if (mounted) {
		//   // @ts-ignore
		//   new window.TradingView.widget({...options, theme});
		//   // const iframe = document.getElementById('tv_chart_container')?.firstChild;
		//   // if (iframe) {
		//   //   // @ts-ignore
		//   //   const iframeDocument = iframe.contentDocument;
		//   //   if (iframeDocument) {
		//   //     const htmlElement = iframeDocument.querySelector('html');
		//   //     if (htmlElement) {
		//   //       if (theme === 'dark') {
		//   //         htmlElement.classList.add('theme-dark');
		//   //         htmlElement.classList.remove('theme-light');
		//   //       } else {
		//   //         htmlElement.classList.remove('theme-dark');
		//   //         htmlElement.classList.add('theme-light');
		//   //       }
		//   //     }
		//   //   }
		//   // }
		// }
	});
	function appendScript(onload) {
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
</script>

<div id="tv_chart_container" style="flex: 1 1 0%;" />
