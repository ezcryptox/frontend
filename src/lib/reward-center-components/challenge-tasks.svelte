<script>
	import { _ } from 'svelte-i18n';
  import TaskCard from "./task-card.svelte";
  import { onMount } from "svelte";
  const futuresTasks = [
    {
      id: 377,
      seatsOffered: 1000,
      amount: 5,
      coupon: "Futures Trial Fund Coupon",
      progressMax: 50000,
      progress: 0,
      button: "Trade Now",
      reward: "Cumulative Futures Trading ≥ 50000 USDT",
      description:
        "Users can receive rewards when their futures trading volume meets the task requirements All pairs included",
    },
    {
      id: 376,
      seatsOffered: 1000,
      amount: 2,
      coupon: "Futures Trial Fund Coupon",
      progressMax: 20000,
      progress: 0,
      button: "Trade Now",
      reward: "Cumulative Futures Trading ≥ 20000 USDT",
      description:
        "Users can receive rewards when their futures trading volume meets the task requirements All pairs included",
    },
    {
      id: 375,
      seatsOffered: 2000,
      amount: 1,
      coupon: "Futures Trial Fund Coupon",
      progress:0,
      progressMax: 10000,
      progress: 0,
      button: "Trade Now",
      reward: "Cumulative Futures Trading ≥ 10000 USDT",
      description:
        "Users can receive rewards when their futures trading volume meets the task requirements All pairs included",
    },
  ];

  let spotTasks = [
    {
      id: 268,
      amount: 1,
      coupon: "Spot Coupon",
      progress: 0,
      progressMax: 100,
      button: "Verify Now",
      reward: "Cumulative Spot Trading ≥ 100 USDT",
      description:
        "Rewards can be claimed when the spot trading volume meets the task requirements. Excluding USDT_USDC,USDD_USDC,USDD_USDT,TUSD_USDC,TUSD_USDD,TUSD_USDT",
    },
    {
      id: 267,
      amount: 2,
      coupon: "Spot Coupon",
      progress: 0,
      progressMax: 2000,
      button: "Verify Now",
      reward: "Cumulative Spot Trading ≥ 2000 USDT",
      description:
        "Rewards can be claimed when the spot trading volume meets the task requirements. Excluding USDT_USDC,USDD_USDC,USDD_USDT,TUSD_USDC,TUSD_USDD,TUSD_USDT",
    },
    {
      id: 266,
      amount: 5,
      coupon: "Spot Coupon",
      progress: 0,
      progressMax: 20000,
      button: "Verify Now",
      reward: "Cumulative Spot Trading ≥ 20000 USDT",
      description:
        "Rewards can be claimed when the spot trading volume meets the task requirements. Excluding USDT_USDC,USDD_USDC,USDD_USDT,TUSD_USDC,TUSD_USDD,TUSD_USDT",
    },
  ];
  let now = new Date();

  //Change this to realtime
  let reset = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, now.getHours(), now.getMinutes(), now.getSeconds());
    
  $: getHoursLeft = (now) => {
        const timeLeft = reset - now;
        if (timeLeft <= 0) return 0;
        const hours = Math.floor(
            (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        return hours;
    };

    $: getMinutesLeft = (now) => {
        const timeLeft = reset - now;
        if (timeLeft <= 0) return 0;
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        return minutes;
    };

    $: getSecondsLeft = (now) => {
        const timeLeft = reset - now;
        if (timeLeft <= 0) return 0;
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        return seconds;
    };

    onMount(() => {
        const interval = setInterval(() => {
            now = new Date();
        }, 1000);

        return () => clearInterval(interval);
    });
</script>
<div class="e8007a63">
  <section>
    <div class="text-strong _9abe9889">
      <img
        width="24"
        src="data:image/png;base64,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"
      />{$_('futures-trade')}<!---->
    </div>
    <div class="_899eb437">
      {#each futuresTasks as task}
        <TaskCard {...task} />
      {/each}
    </div>
  </section>
  <section>
    <div class="text-strong _9abe9889">
      <img
        width="24"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMAUExURUxpcfKpUPnSW/XMWad4K79bNvG7Ur9aN9eKP8JeNNaHRPLDU71ZOPadV/CkUM55N+yeTc9rMdePN79bN75bN79bN/PGV/TIWP+kXfimWOy5TuyVTfugWsVgMdqEPM1oNOWnQ/bOWIpPPPrdX79cNcFdOfugWPmgWLZfNuOsTPbVWe+7TOmoQZhUPuGXPtNpKtl6MeWITeSdR/WaWMxrQNFwQ2pELvrdXd+TOGY+J2Y8I8yfM7mGLb+RL92INqpZNNh7PKdmMsZgNffSXPScUbxbN8BbOOuaPu2cPr1ZN8ZjOclmOu+pPu6ePsRfOfCrPe6kPtd3PM9tO+OIPe+mP81rOtNyO+CGPdR0O9p8POqXPvCuPcVhOemVPsxpOvrSVNh5PPObUNJxO++jROOLPvzYXsJeOPzWXN2APfO4R/fHSfGxPe6hPspnOvGdS+WNPeiTPn1QUYxZWO6STvabVPvSWN6BPfbERpBdWodWVvrRUNBvO9t+POePPu6cReiRPvXASfO8R4RTU/CgR/jLTvfIUN+DPe2gQ++oRcFdOPygWvrPVvvVWPnOUvnOTfjLSvCtRuaKP5RfXMhkOfieV/CZS/bBTvKzR+yWRfTES31MTHBCRfrTXffNWvKWUuSGSfXFUfW8S/fGTfCwRvTARHhMTmY4O/jKVOqRROeKRNt9PfO7QWg+JdlwMuedPptmX/XGV/+jXPnQWvzaYOqeQ/KwQtV4POuuPeq4Rbd8VumMTPLAVdZ2Q/K7UNyDPfCzTPK2PfK0POSAPOupPN6QPpljXu2mPXVHSfbLV+CBR9x8ReWZQ+yZRG5BK21FMXNLPXdGN+GfOteWPqxwOb10O++3UeqvTO2sSuKUQuyzQt6KP7BaMOWoO4RKN65fNcmES4xYTJxiPcuKPJlZOeqoSeqkRvC4QemiPXpLP3dRRtx5M+KhR41POqNuX9KSTK11XW87OOWSP6BoT6JXPLl/N209PqRnV7JrR8iTVNWgTaJmOMR7QMp2RbZfO894PdBsOE6+jJsAAACSdFJOUwAgIDD+70BgECD8v78waGCfvyCF30Df798wj7/vcLXfz4B12jCgz49Q93Df5+9/79ff3t/P39/vcM9QUK+Q32/++vzw/P3////////////////////////////////////////////////////////////////////////////////////////////////////+0J8wBwAABz1JREFUeNrt12lUU3caBnAcBwXUto7LtLWOWttO9+ns+4yfyhoNhJAFCEuiBjCGRIHEEITIWsBioiAEapRFwREoYhCshBq2Vm1lUQuDZdHCjBvi0mXamTPPe5POnNMTEIIf+xwOh3zgd573vf8L97p8n0cSt3k/eCTOY6ac4y8/AmdOX3Jh7m9n12nuXMz1alRKSmHYWjd8dFZ73VK3ds0rpQVRUSmFOWvXLAjb6OSEb0xkWiyZmXmlBQVRyWlphYWmV5yDFl/feS6pPkNMVmkUevU94Rzk/rMz2v37zyVliMWZeehV+uqPnFzSymNnKo8cObI/KYlqZVb/zkkHwx07s6eyEtS5c/X1wp/M4kyvOnYG4ezZo9XK/2IbzNk1HWNy/fr1N+DMIn/9O+VT5MVZOc/evPIP5J/Ix8/OBnrtygXkY8pHv5kddB75iHL+97Ma7cr5v32bP8zCcXv8Tz/8Nn/+o7OXbc7rq7u6ugYGGhr6+k4yWf30nJkz81bgMI+NjVkb+kZHU8qSCykm04J5M2MWrdi3Dzf+mNXaEDM6erSsrDD6UGpqatphUDP58/bTCDhJGex2a0NwzNGjZQkJ0W/v3r07Nze3s7Ozds20l/NCRMS+rbjjA63BwTEtgOC8vXvHjh1hYdnZdSWdy6dXatEz2yMitm7dJWb7bQiOeb8FgzGFyAmLi6urKylZPncazlPP7CVo1y5xoB8cO4RGBOXk5GwuLq4r+fHcaThvAUIhOCgU09LSMnrUtiM7tHljcfHDpTlPvrV3LxVioBhqNNB460t7JTu0cSOkh+zpyXdRiCAxTRYMKeZ+kbLmEqRUVIrLyYFz/Dik5W5TXnc4/59sA0ENPeVq1UsJ0ZBycyFt3gzoeHFJ7dNTDfYuU8gOYUeQBnoUatVXZZBSGSmOJKyp89S8hw4GJ4MuPqDggZEhnVo1/lVZNJ3t3GybRPuuXTD5cwc523EY6TSyabYN3XfVOp1arappPJkQfSgNnbLj4oqZI1A7eaUXaEHv2G6PLQT5dQ8pkKIinbJtPCWhkKRsSHDqOmtPTVZpEeO8s88Osf38uobLwQwP36woUtV8mZx8CNJhUHU43oAuTlLpib3b4Wzbhn/TXiw0Cmwf6ShXDHVbrV33H6j1t04yUtrhw9lIZy2gSS7cL4mBA8jTawuksR5juWKQVt51tUhfcyMlOTk5nyhK7anTF19yPBkYCv5DCz29WJCq/2UsV3fTxbPeNyrbbkelHISUbzKlpZlMJkCXnnJ4zchpasJTQ2yo0PN/0G1cO2z9jlF3gx65Ug7mE2XKzz990XLpMYcr2taEVFZWarWxtkrVvRXluvF2PxxN60jPSPCJE1GgDhIF57Tl0jWHD0wrmpoOHDhQWSmRyGNDPb0gjY1cMCqU493VsNrb/TZAKiiAdRAh5/K11Y6gn4NBeByOfGcoVWJtOdtT0aFQ62tuNd5mejEULMRisVy+duMXjqADH1DS43k8iZa25MlisVqHK4xFOrVSXzNeHRgYCOvEidJSWBZL6eVrn9046wj64ENKVWI8T2KrhOm8WnsvVBg76GRDYrMJy8zDc2BeHpz6s584gj58D/EPF0jTORItSbQnlmfr1z1Xr+BktzWyKcAymXxGTqsjCExQUBA/HJU4cpuEL7KqW3vv6PS3qrfYwmaLxeKMenL6HUG/1gQgkf6ohOFoTaEed2sGvViwPqGTfRsIi+KVQQw5Ho6gX4lkvjKuhu8viGeGi42VDHco2phlefYCGoRBPyNCYejEhKS/2eHz6fM+IT4GUQCGq5LyOBJM13/VWK70YH6xV6dvGySFEhoaOyGX9POaEx1CK7Oy1vv4cjVB/usSbZLkU5zsxlChUNh/V6Vv8xAyAbNTK5HwmpsTzY87gty839wUYpAFYDgsPB2U5D8VRoWq0cNj8HOVXv95LAwoYOTkJArMfHcXR1noTZVEJK2rkkLiNF/FyVaq9CqlSqX8eicyoZXL5RIOB846M3+xi8PMRyVGiuTTcUIpnvkmJJxspVL3hUROBspweLx0KTkaTOZwtqV2CXuCVCWVpseb7915oFAr1UO9HAkIVIFCTLg5SLPKscNUwpqY6YL4RCVK46sib5arlV8koh5CiFSaKECdSA13kkK0Jbsk4wZEEhUuEFSZ73WoVd9I7QEiEISb+UGRAdzFU7x6uHq/mYXpDDIRUbD8/fn3jDrVNwJ71oWHm6mNhita5e4yeZZ5U6f1KEWURgMrKOTOgyG+GaQZBB9dIjUBXNwFy6ZwaE2gsiAZfGUyLjcAWEDIv2WR9mjwEYrI19cwf0oHkiskUHZLJBKBIxHfEHyWQTG4PszBnpZ6M/PRgD4+BoMvAlHmC4Bi8PEJCVn63HTeG5ZAolawUCwEnj0gkPXrNy1xm+Z74/MMBSsLGjh7QGzKynJd4j6DV9D5C10Z7LtxXbgSbWaW55bN/25edHf5Ps7nv+UbRnQlBE58AAAAAElFTkSuQmCC"
      />{$_('spot-trade')}<div class="_35ce6377">{$_('until-reset')}<div class="_87392ef1">
          <span>{getHoursLeft(now)} </span>:<span>{getMinutesLeft(now)}</span>:<span>{getSecondsLeft(now)}</span>
        </div>
      </div>
    </div>
    <div class="_899eb437">
      {#each spotTasks as task}
        <TaskCard {...task} />
      {/each}
    </div>
  </section>
  <!---->
</div>
