<script>
	import { _ } from 'svelte-i18n';
</script>
<div class="_quickOrder_ttr9n_9">
    <div class="_head_ttr9n_32">{$_('orders-in-progress')}</div>
    <div class="_content_ttr9n_47">
      <div class="_noData_ttr9n_52">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          fill="none"
          ><path
            fill="#e3e3e3"
            d="M64 55.26 50 69H17.818A1.818 1.818 0 0 1 16 67.182V17.818c0-1.004.814-1.818 1.818-1.818h44.364c1.004 0 1.818.814 1.818 1.818z"
          ></path><path
            fill="#b8b8b8"
            d="M50 55.91a.91.91 0 0 1 .91-.91H64l-7 7-7 7z"
          ></path><rect
            width="26"
            height="3.636"
            fill="#fafafa"
            rx=".909"
            transform="matrix(1 0 0 -1 28 46.547)"
          ></rect><rect
            width="22"
            height="3.636"
            fill="#fafafa"
            rx=".909"
            transform="matrix(1 0 0 -1 28 35.637)"
          ></rect><circle
            cx="20.909"
            cy="19.909"
            r="10.909"
            fill="#2b2b2e"
          ></circle><g fill="#fafafa"
            ><path
              d="M21.581 23.07h-1.806a.775.775 0 0 0-.775.775v1.806c0 .429.347.776.775.776h1.806a.775.775 0 0 0 .776-.776v-1.806a.775.775 0 0 0-.776-.775zM21.581 13h-1.806a.775.775 0 0 0-.775.775v6.841c0 .429.347.776.775.776h1.806a.775.775 0 0 0 .776-.775v-6.842A.775.775 0 0 0 21.58 13z"
            ></path></g
          ></svg
        >
        <p>{$_('no-orders')}</p>
      </div>
    </div>
    <div class="_foot_ttr9n_221">
      <a href="/p2p/orders/" class="">{$_('view-all-orders')}</a>
    </div>
  </div>
