<script>
	import { ServerURl } from '$lib/backendUrl';

	import Datatable from '$lib/components/ui/datatable/datatable.svelte';
	import { isLogin } from '$lib/store/profile';
	import { handleAuthToken } from '$lib/store/routes';
	import axios from 'axios';

	$: fetcher = async () => {
		if (!$isLogin) return Promise.resolve([]);
		return axios
			.get(`${ServerURl()}/api/assets/wallet-balance`, {
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${$handleAuthToken}`
				}
			})
			.then((d) => Object.keys( d.data.balances).map((k) => ({...d.data.balances[k], available: d.data.balances[k].balance, in_use: 0})));
	};
	
</script>

<div class="_67f779d2 _6d122bdf">
	
	<Datatable
		dataListFetcher={fetcher}
		hasContent={!$isLogin}
		dataListColumns={[
			{ accessor: 'symbol', header: 'Coin'},
			{ accessor: 'available', header: 'Available', cell: (value) => value.toFixed(8) },
			{ accessor: 'in_use', header: 'In Use', cell: (value) => value.toFixed(2) },
			{ accessor: 'balance', header: 'Balance', cell: (value) => value.toFixed(8) },
		]}
	>
		<div class="_9e7987dd">
			<a href="/login">Log In </a>or <a href="/signup">Sign Up </a> Now to trade
		</div>
	</Datatable>
</div>
