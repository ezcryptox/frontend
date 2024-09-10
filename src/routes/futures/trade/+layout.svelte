<script>
   import Header from "$lib/futures/header.svelte";
    import "../../../styles/futures/header.css"
</script>

<div id="root" class="vue3-app" data-v-app>
    <div class="d31bb42e flex-column">
        <Header />
        <slot></slot>
    </div>
</div>