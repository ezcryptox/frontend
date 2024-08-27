<script>
	import PageComponent from "../page-component.svelte";
  export let data;
</script>
<PageComponent defaultSelectedCurrency={data.currency}/>