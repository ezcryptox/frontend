<script>
	import { _ } from 'svelte-i18n';
  import Orders from "./orders.svelte";

  let showOrders = false;
</script>
<div class="_actionGroup_piyeq_55">
  <div
    class="_item_piyeq_60 _orderItem_piyeq_94"
    on:mouseenter={() => (showOrders = true)}
    on:mouseleave={() => (showOrders = false)}
    role="button"
    tabindex={0}
  >
    <span class="_sp_piyeq_64"
      ><svg
        data-v-c936a896=""
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="svg-icon"
        ><path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.34174 4.11258V8.26354L6.52542 11.0799L5.31323 9.86768L7.62746 7.55346V4.11258H9.34174Z"
        ></path><path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.99578 1.90865C4.68207 1.90865 1.99578 4.59494 1.99578 7.90865C1.99578 10.9306 4.23068 13.432 7.13756 13.8478L7.98606 13.9692L7.74332 15.6662L6.89482 15.5449C3.15557 15.01 0.281494 11.7957 0.281494 7.90865C0.281494 3.64817 3.7353 0.194366 7.99578 0.194366C12.2563 0.194366 15.7101 3.64817 15.7101 7.90865C15.7101 8.28198 15.6835 8.6496 15.632 9.00961L15.5106 9.85812L13.8136 9.61538L13.935 8.76687C13.975 8.48701 13.9958 8.20051 13.9958 7.90865C13.9958 4.59494 11.3095 1.90865 7.99578 1.90865Z"
        ></path><path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.70825 10.9085H13.994V12.6228H9.70825V10.9085Z"
        ></path><path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.70825 13.9085H15.2797V15.6228H9.70825V13.9085Z"
        ></path></svg
      >{$_('orders')}</span
    ><em class="_msgCount_piyeq_94" style="display: none;">0</em>
    <em class="_msgCount_piyeq_94" style={showOrders ? "" : "display: none;"}
      >0</em
    >
    {#if showOrders}
      <Orders />
    {/if}
  </div>
  <div class="_item_piyeq_60">
    <div class="el-dropdown">
      <span
        class="_sp_piyeq_64 el-tooltip__trigger el-tooltip__trigger"
        id="el-id-345-0"
        role="button"
        tabindex="0"
        aria-controls="el-id-345-1"
        aria-expanded="false"
        aria-haspopup="menu"
        ><svg
          data-v-c936a896=""
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="svg-icon"
          ><path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.85577 8.40156L11.5 5.14286L17.1442 8.40156V14.919L11.5 18.1776L5.85577 14.919V8.40156ZM11.5 3L19 7.33013V15.9904L11.5 20.3205L4 15.9904V7.33013L11.5 3ZM10.2632 11.6603C10.2632 10.977 10.8171 10.4231 11.5004 10.4231C12.1837 10.4231 12.7376 10.977 12.7376 11.6603C12.7376 12.3435 12.1837 12.8974 11.5004 12.8974C10.8171 12.8974 10.2632 12.3435 10.2632 11.6603ZM11.5004 8.56731C9.79221 8.56731 8.40745 9.95207 8.40745 11.6603C8.40745 13.3684 9.79221 14.7532 11.5004 14.7532C13.2086 14.7532 14.5933 13.3684 14.5933 11.6603C14.5933 9.95207 13.2086 8.56731 11.5004 8.56731Z"
          ></path></svg
        >{$_('settings')}</span
      ><!--v-if-->
    </div>
  </div>
</div>
