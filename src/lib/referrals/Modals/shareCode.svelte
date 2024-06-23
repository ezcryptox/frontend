<script>
  import { onMount } from "svelte";
  import { user } from "$lib/store/profile";

  $: refCode = "";

  onMount(() => {
    const storedData = sessionStorage.getItem("user");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      refCode = parsedData?.user?.refCode;
    }
  });
</script>

<div>
  <div class="fef54d3a">
    <div class="flex justify-between _893633d3">
      Share your referral code <span class="_438ff511"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          ><path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.0007 7.9974C14.0007 11.3129 11.3129 14.0007 7.9974 14.0007C4.68189 14.0007 1.99414 11.3129 1.99414 7.9974C1.99414 4.68189 4.68189 1.99414 7.9974 1.99414C11.3129 1.99414 14.0007 4.68189 14.0007 7.9974ZM7.9966 11.598C7.55807 11.598 7.12725 11.5197 6.74297 11.4126C6.114 11.2372 5.79952 11.1495 5.61216 10.7034C5.42481 10.2574 5.58775 9.96164 5.91362 9.37019C6.24493 8.76889 6.69434 8.18153 7.22476 8.06153C7.61068 7.97421 8.38253 7.97421 8.76845 8.06153C9.29887 8.18153 9.74828 8.76889 10.0796 9.37019C10.4055 9.96164 10.5684 10.2574 10.381 10.7034C10.1937 11.1495 9.87921 11.2372 9.25024 11.4126C8.86595 11.5197 8.43514 11.598 7.9966 11.598ZM7.99691 7.39616C8.82578 7.39616 9.49772 6.72422 9.49772 5.89535C9.49772 5.06647 8.82578 4.39453 7.99691 4.39453C7.16803 4.39453 6.49609 5.06647 6.49609 5.89535C6.49609 6.72422 7.16803 7.39616 7.99691 7.39616Z"
            fill="#B8B8B8"
          ></path></svg
        ><a href="javascript:;">Referral Center&gt;</a></span
      >
    </div>
    <div class="_288b3943">
      <!---->
      <div class="a5fa35fa">
        <div class="b003f225">
          <span>Commission Rate</span><strong>20%</strong>
        </div>
        <div class="b003f225">
          <span>Total Earnings</span><strong>0.00 USDT</strong>
        </div>
      </div>
    </div>
    <div class="_5370c68a">
      <div class="_830a66f5">
        <label class="_27004f09">Referral code</label>
        <div class="a7a784a5"><span>{refCode}</span></div>
      </div>
      <div class="bb8d5c1d">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          ><path d="M6 1.75H14.25V10H12.75V3.25H6V1.75Z" fill="currentColor"
          ></path><path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.75 4.75V14.25H11.25V4.75H1.75ZM9.75 6.25H3.25V12.75H9.75V6.25Z"
            fill="currentColor"
          ></path></svg
        >
      </div>
    </div>
    <div class="_5370c68a">
      <div class="_830a66f5">
        <label class="_27004f09">Referral link&ZeroWidthSpace;</label>
        <div class="a7a784a5 _21bf3f75">
          <span>{`https://poloniex.com/signup?c=${refCode}`}</span><span>{refCode}</span>
        </div>
      </div>
      <div class="bb8d5c1d">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          ><path d="M6 1.75H14.25V10H12.75V3.25H6V1.75Z" fill="currentColor"
          ></path><path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.75 4.75V14.25H11.25V4.75H1.75ZM9.75 6.25H3.25V12.75H9.75V6.25Z"
            fill="currentColor"
          ></path></svg
        >
      </div>
    </div>
    <div class="flex justify-between e8611f99">
      <button class="_1a0f7f35"> Invite Friends Now </button>
      <div class="_99bda4e8 qrcode-button flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          ><path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.86914 12.1875V2.86914H12.1875V12.1875H2.86914ZM5.30664 5.30664H9.75V9.75H5.30664V5.30664Z"
            fill="currentColor"
          ></path><path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.86914 23.1562V13.8379H12.1875V23.1562H2.86914ZM5.30664 16.2754H9.75V20.7188H5.30664V16.2754Z"
            fill="currentColor"
          ></path><path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.8379 2.86914V12.1875H23.1562V2.86914H13.8379ZM20.7188 5.30664H16.2754V9.75H20.7188V5.30664Z"
            fill="currentColor"
          ></path><path
            d="M16.8594 19.9062H13.8379V23.1562H17.0879V19.9062H19.9062V23.1562H23.1562V19.9062H20.1094V18.7129H23.1562V13.8379H19.9062V16.6562H17.0879V13.8379H13.8379V18.7129H16.8594V19.9062Z"
            fill="currentColor"
          ></path></svg
        >
      </div>
    </div>
    <!----><!---->
  </div>
</div>
