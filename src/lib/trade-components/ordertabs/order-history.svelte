<script>
	import { isLogin } from "$lib/store/profile";

    let tabs = [
		`Limit | Market`,
        `TP|SL`,
        `Trailing Stop`
	];
	let selectedTab = 0;
	
</script>

<div class="_9ae73dc4 _6d122bdf" >
	<div class="_321f1327">
		{#each tabs as tab, index}
			<button class={selectedTab === index ? "_2f8d100e" : ""} on:click={() => selectedTab = index}>{tab}</button>
		{/each}
	</div>
	<div
		class="el-table order-table el-table--fit el-table--scrollable-x el-table--enable-row-hover el-table--small d9f59dac"
		style="height: 100%;"
	>
		<div class="hidden-columns">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div dangerouslyusehtmlstring="true"></div>
			<div></div>
			<div></div>
			<div dangerouslyusehtmlstring="true"></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
		<div class="el-table__header-wrapper">
			<table
				cellspacing="0"
				cellpadding="0"
				border="0"
				class="el-table__header"
			>
				<colgroup
					><col name="el-table_10_column_88"  /><col
						name="el-table_10_column_89"
					/><col name="el-table_10_column_90"/><col
						name="el-table_10_column_91"
					/><col name="el-table_10_column_92" /><col
						name="el-table_10_column_93" 
					/><col name="el-table_10_column_94" /><col
						name="el-table_10_column_95"
					/><col name="el-table_10_column_96" /><col
						name="el-table_10_column_97"
					/><col name="el-table_10_column_98" /><col name="gutter" width="0" /></colgroup
				>
                <thead class="has-gutter" 
					><tr class="" 
						><th
							colspan="1"
							rowspan="1"
							class="el-table_10_column_88 _75bc2a42 is-leaf el-table__cell"
							><div class="cell">Time</div></th
						><th colspan="1" rowspan="1" class="el-table_10_column_89 is-leaf el-table__cell"
							><div class="cell">Pair</div></th
						><th colspan="1" rowspan="1" class="el-table_10_column_90 is-leaf el-table__cell"
							><div class="cell">Type</div></th
						><th colspan="1" rowspan="1" class="el-table_10_column_91 is-leaf el-table__cell"
							><div class="cell">Side</div></th
						><th colspan="1" rowspan="1" class="el-table_10_column_92 is-leaf el-table__cell"
							><div class="cell">Price</div></th
						><th colspan="1" rowspan="1" class="el-table_10_column_93 is-leaf el-table__cell"
							><div class="cell">Amount</div></th
						><th colspan="1" rowspan="1" class="el-table_10_column_94 is-leaf el-table__cell"
							><div class="cell">Filled</div></th
						><th colspan="1" rowspan="1" class="el-table_10_column_95 is-leaf el-table__cell"
							><div class="cell">Avg.Price</div></th
						><th colspan="1" rowspan="1" class="el-table_10_column_96 is-leaf el-table__cell"
							><div class="cell">Total</div></th
						><th
							colspan="1"
							rowspan="1"
							class="el-table_10_column_97 _11597ecc is-leaf el-table__cell"
							><div class="cell">Status</div></th
						><th
							colspan="1"
							rowspan="1"
							class="el-table_10_column_98 is-right is-leaf el-table__cell"
							><div class="cell">Action</div></th
						><th class="el-table__cell gutter" style="width: 0px; display: none;"></th></tr
					></thead
				>
			</table>
		</div>
		<div class="el-table__body-wrapper is-scrolling-left" style="height: 186px;">
			<table
				cellspacing="0"
				cellpadding="0"
				border="0"
				class="el-table__body"
			>
				<colgroup
					><col name="el-table_10_column_88"/><col
						name="el-table_10_column_89"
					/><col name="el-table_10_column_90" /><col
						name="el-table_10_column_91"
					/><col name="el-table_10_column_92"/><col
						name="el-table_10_column_93"
					/><col name="el-table_10_column_94" /><col
						name="el-table_10_column_95"
					/><col name="el-table_10_column_96" /><col
						name="el-table_10_column_97"
					/><col name="el-table_10_column_98"/></colgroup
				><tbody><!----></tbody>
			</table>
			<div class="el-table__empty-block" style="height: 100%; ">
				<span class="el-table__empty-text"
					>
					<div class="e0263add">
						{#if $isLogin}
						<div class="_4309a313">
							<svg
								width="60"
								height="60"
								viewBox="0 0 60 60"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M10.1816 13.6357C9.07707 13.6357 8.18164 14.5312 8.18164 15.6357V32.7267H27.2726V27.2721H25.5459C24.9936 27.2721 24.5459 26.8244 24.5459 26.2721V20.0903C24.5459 19.538 24.9936 19.0903 25.5459 19.0903H27.2726V13.6357H10.1816Z"
									fill="#E3E3E3"
								></path><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M46.3643 32.7266H27.2734V51.8175H44.3643C45.4689 51.8175 46.3643 50.922 46.3643 49.8175V32.7266ZM39.9102 35.4538C40.4624 35.4538 40.9102 35.0061 40.9102 34.4538V32.7266L32.7283 32.7266V34.4538C32.7283 35.0061 33.1761 35.4538 33.7283 35.4538L39.9102 35.4538Z"
									fill="#E3E3E3"
								></path><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M13.6367 31C13.6367 30.4477 14.0844 30 14.6367 30H20.8185C21.3708 30 21.8185 30.4477 21.8185 31V32.7273H27.2726V51.8182H10.1816C9.07707 51.8182 8.18164 50.9228 8.18164 49.8182V32.7273H13.6367V31ZM30 39.1818C30 38.6295 29.5523 38.1818 29 38.1818H27.2727L27.2727 46.3636H29C29.5523 46.3636 30 45.9159 30 45.3636V39.1818Z"
									fill="#F2F2F2"
								></path><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M36.7734 29.5887C37.1639 29.9793 37.7971 29.9792 38.1876 29.5887L39.2971 28.4793L42.96 32.1422L55.0451 20.0571C55.8261 19.2761 55.8261 18.0097 55.0451 17.2287L42.96 5.14358L39.2152 8.88841L38.1879 7.86112C37.7973 7.4706 37.1642 7.47059 36.7736 7.86112L32.4024 12.2323C32.0119 12.6228 32.0119 13.256 32.4024 13.6465L33.4297 14.6738L29.4607 18.6429L33.5116 22.6939L32.4022 23.8033C32.0117 24.1938 32.0117 24.827 32.4022 25.2175L36.7734 29.5887ZM46.1593 14.9888L46.4325 15.262C46.823 15.6525 46.823 16.2857 46.4325 16.6762L43.6282 19.4805C43.2376 19.871 42.6045 19.871 42.2139 19.4805L41.9407 19.2073C41.5502 18.8168 41.5502 18.1836 41.9407 17.7931L44.7451 14.9888C45.1356 14.5983 45.7688 14.5983 46.1593 14.9888ZM41.097 20.051L41.3702 20.3242C41.7608 20.7147 41.7608 21.3479 41.3702 21.7384L41.097 22.0116C40.7065 22.4022 40.0733 22.4022 39.6828 22.0116L39.4096 21.7384C39.0191 21.3479 39.0191 20.7147 39.4096 20.3242L39.6828 20.051C40.0733 19.6605 40.7065 19.6605 41.097 20.051Z"
									fill="#B8B8B8"
								></path><rect
									x="11.5908"
									y="38.1816"
									width="12.2727"
									height="2.04545"
									rx="0.5"
									fill="#E3E3E3"
								></rect><rect
									x="11.5908"
									y="44.3184"
									width="12.2727"
									height="2.04545"
									rx="0.5"
									fill="#E3E3E3"
								></rect></svg
							>
							<p>No Data</p>
						</div>
							{:else}
							<div class="_9e7987dd"><a href="/login">Log In </a>or <a href="/signup">Sign Up </a> Now to trade </div>
						{/if}
						
					</div></span
				>
			</div>
			<!---->
		</div>
		<!----><!----><!----><!---->
		<div class="el-table__column-resize-proxy" style="display: none;"></div>
	</div>
	<div class="_787d513b">
		*Only shows data in 7 days. Click <a href="/activity/spot/order-history/">All Orders</a> to view
		more.
	</div>
</div>
