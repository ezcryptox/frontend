<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import * as Table from '$lib/components/ui/table';
	import { writable } from 'svelte/store';

	export let embeded = true;
	export let hasContent = false;
	export let dataListColumns: { accessor: string; header: string; cell?: (value: any) => any }[] =
		[];
	export let dataListFetcher = () => Promise.resolve([]);

	$: loading = true;
	const dataList = writable<{ [k: string]: any }[]>([]);
	// @ts-ignore
	let table = createTable(dataList);

	const columns = table.createColumns(
		dataListColumns.map(({ accessor, header, cell }) =>
			table.column({
				accessor,
				header,
				cell: ({ value }) => (cell ? cell(value) : value)
			})
		)
	);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);

	$: {
		loading = true;
		dataListFetcher()
			.then((data) => dataList.set(data || []))
			.finally(() => {
				loading = false;
			});
	}
</script>

<div class="{!embeded ? 'rounded-md border' : ''}">
	<Table.Root {...$tableAttrs} class="min-h-[350px]">
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs}>
									<Render of={cell.render()} />
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs} class="min-h-56">
			{#if hasContent}
				<tr>
					<td colspan={dataListColumns.length}>
						<div class="el-table__empty-block" style="height: 100%; width: 100%;">
								<span class="el-table__empty-text">
									<slot></slot>
								</span>
							</div>
					</td>
				</tr>
			{:else}
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs} style="height: 54px!important" class="h-[54px]">
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
				{#if loading}
					<tr>
						<td colspan={dataListColumns.length}>
							<div class="el-table__empty-block" style="height: 100%; width: 100%;">
								<span class="el-table__empty-text">
									<div class="e0263add">
										<i class="e369efc5"></i>
									</div>
								</span>
							</div>
						</td>
					</tr>
				{/if}
				{#if !loading && !$dataList.length}
					<tr>
						<td colspan={dataListColumns.length}>
							<div class="qqWi0">
								<div class="YSmmf dark:text-white">
									<div>{$_('g-nodata')}</div>
									<!---->
								</div>
							</div>
						</td>
					</tr>
				{/if}
			{/if}
		</Table.Body>
	</Table.Root>
</div>

<style>
	.el-table__empty-block {
		min-height: 60px;
		text-align: center;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.el-table__empty-text {
		line-height: 60px;
		width: 50%;
		color: #909399;
	}
	.e0263add {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.e369efc5 {
		width: 20px;
		height: 20px;
		border-width: 3px;
		position: relative;
		border-radius: 50%;
		border-style: solid;
		display: inline-block;
		vertical-align: middle;
		-webkit-animation: f14dfab4 1s linear infinite;
		animation: f14dfab4 1s linear infinite;
		border-left-color: #131316;
		border-right-color: #131316;
		border-top-color: transparent;
		border-bottom-color: transparent;
	}
	body.dark-theme .e369efc5 {
		border-left-color: #fff;
		border-right-color: #fff;
	}
	@keyframes f14dfab4 {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(1turn);
		}
	}
	.qqWi0 {
		padding: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	html[data-theme='light'] .qqWi0 .YSmmf {
		background-image: url(data:image/png;base64,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);
	}
	html[data-theme='dark'] .qqWi0 .YSmmf {
		background-image: url(data:image/png;base64,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);
	}
	.qqWi0 .YSmmf,
	.qqWi0 .w5hSZ {
		background-repeat: no-repeat;
		background-position: center top;
		background-size: 80px;
		padding-top: 88px;
		line-height: 20px;
		color: #878787;
		pointer-events: auto;
		min-width: 80px;
	}
</style>
