<script>
	import { ServerURl } from '$lib/backendUrl';

	import Datatable from '$lib/components/ui/datatable/datatable.svelte';
	import { isLogin } from '$lib/store/profile';
	import { handleAuthToken } from '$lib/store/routes';
	import axios from 'axios';

	$: fetcher = async () => {
		if (!$isLogin) return Promise.resolve([]);
		return axios
			.get(`${ServerURl()}/api/spot/trade-history`, {
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${$handleAuthToken}`
				}
			})
			.then((d) => d.data);
	};
</script>

<div class="_67f779d2 _6d122bdf">
	<Datatable
		hasContent={!$isLogin}
		dataListColumns={[
			{ accessor: 'time', header: 'Time', cell: (value) => new Date(value).toLocaleString() },
			{ accessor: 'pair', header: 'Pair' },
			{ accessor: 'side', header: 'Side', cell: (value) => value.toUpperCase() },
			{ accessor: 'price', header: 'price', cell: (value) => value.toFixed(2) },
			{ accessor: 'amount', header: 'Amount', cell: (value) => value.toFixed(2) },
			{ accessor: 'total', header: 'Total', cell: (value) => value.toFixed(2) },
			{ accessor: 'fees', header: 'Fees' }
		]}
		dataListFetcher={fetcher}
	>
		<div class="_9e7987dd">
			<a href="/login">Log In </a>or <a href="/signup">Sign Up </a> Now to trade
		</div>
	</Datatable>
	<div class="_787d513b">
		*Only shows data in 7 days. Click <a href="/activity/spot/trades/">All Orders</a> to view more.
	</div>
</div>
