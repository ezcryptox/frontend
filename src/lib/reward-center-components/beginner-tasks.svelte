<script>
	import { _ } from 'svelte-i18n';
    import TaskCard from './task-card.svelte';
    let now = new Date();
    const welcomeTasks = [
        {
            id: 294,
            seatsOffered: 9999,
            amount: 2,
            coupon: "Futures Trial Fund Coupon",
            reward: "KYC Verification Reward",
            description:
                "Level 2 KYC verification is required Complete KYC verification to upgrade your account to Level 2",
            button: "Verify Now",
            expiration: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 17, now.getHours() + 19, now.getMinutes() + 2, now.getSeconds() + 22),
        },
        {
            id: 265,
            seatsOffered: 9999,
            amount: 2,
            coupon: "Spot Coupon",
            reward: "Signup Reward",
            description: "Complete signup to get the reward",
            button: "Sign up",
            expiration: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 17, now.getHours() + 19, now.getMinutes() + 2, now.getSeconds() + 22),
        },
        {
            id: 263,
            seatsOffered: 9999,
            amount: 1,
            coupon: "Spot Coupon",
            reward: "First Deposit Reward",
            description:
                "Only for the first deposit Deposit amount should be ≥ 10 USDT All tokens included",
            button: "Verify Now",
            progress: 0,
            progressMax: 10,
            expiration: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 17, now.getHours() + 19, now.getMinutes() + 2, now.getSeconds() + 22),
        },
        {
            id: 262,
            seatsOffered: 9999,
            amount: 2,
            coupon: "Spot Coupon",
            reward: "First Spot Trading ≥ 1 USDT",
            description:
                "The user's single first currency transaction amount needs to meet the task requirements Excluding USDT_USDC,USDD_USDC,USDD_USDT,TUSD_USDC,TUSD_USDD,TUSD_USDT",
            button: "Verify Now",
            progress: 0,
            progressMax: 1,
            expiration: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 17, now.getHours() + 19, now.getMinutes() + 2, now.getSeconds() + 22),
        },
        {
            id: 261,
            seatsOffered: 9999,
            amount: 3,
            coupon: "Spot Coupon",
            reward: "First Spot Trading ≥ 500 USDT",
            description:
                "The user's single first currency transaction amount needs to meet the task requirements Excluding USDT_USDC,USDD_USDC,USDD_USDT,TUSD_USDC,TUSD_USDD,TUSD_USDT",
            button: "Verify Now",
            progress: 0,
            progressMax: 500,
            expiration: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 17, now.getHours() + 19, now.getMinutes() + 2, now.getSeconds() + 22),
        },
    ];

    let futuresTasks = [
        {
            id: 374,
            seatsOffered: 1000,
            amount: "$1",
            coupon: "Futures Trial Fund Coupon",
            reward: "First Futures Trading ≥ 500 USDT",
            description:
                "The user's first single futures trading amount meets the task requirements All pairs included",
                progress: 0,
            progressMax: 500,
            expiration: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 17, now.getHours() + 19, now.getMinutes() + 2, now.getSeconds() + 22),
            button: "Trade Now",
        },
        {
            id: 373,
            seatsOffered: 1000,
            amount: "$1",
            coupon: "Futures Trial Fund Coupon",
            reward: "First Futures Transfer Reward",
            description:
                "Apply only to the first single transfer to your Futures account USDT included",
                progress: 0,
            progressMax: 100,
            expiration: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 17, now.getHours() + 19, now.getMinutes() + 2, now.getSeconds() + 22),
            button: "Transfer Now",
        },
    ];

    const earnTasks = [
        {
            id: 396,
            seatsOffered: 344,
            amount: "5%",
            coupon: "Booster Coupon",
            reward: "First Deposit Reward",
            description:
                "Only for the first deposit Deposit amount should be ≥ 100 USDT BTC,ETH,USDT,TRX,XRP,USDC,DOGE,XMR,SOL,ETC,SHIB,LTC,BCH,ADA,ATOM,BNB,BTT,XLM,USDD,DOT,HTX included",
                progress: 0,
            progressMax: 100,
            expiration: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, now.getHours() + 19, now.getMinutes() + 2, now.getSeconds() + 22),
            button: "Deposit Now",
        },
    ];
     
</script>
<div class="_4502231f">
        <section>
            <div class="d6c82c64">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    ><g filter="url(#filter0_i_6668_3181)"
                        ><path
                            d="M14.0147 18.6415C14.3441 18.4979 14.4811 18.2877 14.5801 18.164C15.4691 17.0536 13.5723 13.7577 10.8643 11.8506C7.99421 9.35149 4.83407 8.49989 3.94507 9.6103C3.79249 9.80087 3.67292 10.0605 3.62311 10.3534L1.93561 20.0624C1.87701 21.246 2.32939 21.6958 2.55577 21.9155C2.966 22.3137 3.76373 22.6523 4.59577 22.3593C7.8067 21.123 10.8148 20.0366 14.0147 18.6415Z"
                            fill="url(#paint0_linear_6668_3181)"
                        ></path></g
                    ><path
                        d="M14.0147 18.6415C14.3441 18.4979 14.4811 18.2877 14.5801 18.164C15.4691 17.0536 13.5723 13.7577 10.8643 11.8506C7.99421 9.35149 4.83407 8.49989 3.94507 9.6103C3.79249 9.80087 3.67292 10.0605 3.62311 10.3534L1.93561 20.0624C1.87701 21.246 2.32939 21.6958 2.55577 21.9155C2.966 22.3137 3.76373 22.6523 4.59577 22.3593C7.8067 21.123 10.8148 20.0366 14.0147 18.6415Z"
                        fill="url(#paint1_linear_6668_3181)"
                    ></path><path
                        d="M14.0147 18.6415C14.3441 18.4979 14.4811 18.2877 14.5801 18.164C15.4691 17.0536 13.5723 13.7577 10.8643 11.8506C7.99421 9.35149 4.83407 8.49989 3.94507 9.6103C3.79249 9.80087 3.67292 10.0605 3.62311 10.3534L1.93561 20.0624C1.87701 21.246 2.32939 21.6958 2.55577 21.9155C2.966 22.3137 3.76373 22.6523 4.59577 22.3593C7.8067 21.123 10.8148 20.0366 14.0147 18.6415Z"
                        fill="url(#paint2_linear_6668_3181)"
                    ></path><path
                        d="M14.0147 18.6415C14.3441 18.4979 14.4811 18.2877 14.5801 18.164C15.4691 17.0536 13.5723 13.7577 10.8643 11.8506C7.99421 9.35149 4.83407 8.49989 3.94507 9.6103C3.79249 9.80087 3.67292 10.0605 3.62311 10.3534L1.93561 20.0624C1.87701 21.246 2.32939 21.6958 2.55577 21.9155C2.966 22.3137 3.76373 22.6523 4.59577 22.3593C7.8067 21.123 10.8148 20.0366 14.0147 18.6415Z"
                        fill="url(#paint3_linear_6668_3181)"
                    ></path><g filter="url(#filter1_f_6668_3181)"
                        ><ellipse
                            cx="9.2235"
                            cy="13.9678"
                            rx="6.57932"
                            ry="2.59816"
                            transform="rotate(39.7456 9.2235 13.9678)"
                            fill="url(#paint4_linear_6668_3181)"
                        ></ellipse></g
                    ><g filter="url(#filter2_f_6668_3181)"
                        ><ellipse
                            cx="9.41592"
                            cy="13.6402"
                            rx="6.09767"
                            ry="2.18652"
                            transform="rotate(39.7456 9.41592 13.6402)"
                            fill="url(#paint5_linear_6668_3181)"
                        ></ellipse><ellipse
                            cx="9.41592"
                            cy="13.6402"
                            rx="6.09767"
                            ry="2.18652"
                            transform="rotate(39.7456 9.41592 13.6402)"
                            fill="url(#paint6_radial_6668_3181)"
                        ></ellipse><ellipse
                            cx="9.41592"
                            cy="13.6402"
                            rx="6.09767"
                            ry="2.18652"
                            transform="rotate(39.7456 9.41592 13.6402)"
                            fill="url(#paint7_radial_6668_3181)"
                        ></ellipse></g
                    ><circle
                        cx="11.217"
                        cy="12"
                        r="0.902344"
                        fill="url(#paint8_radial_6668_3181)"
                    ></circle><circle
                        cx="11.217"
                        cy="12"
                        r="0.902344"
                        fill="url(#paint9_radial_6668_3181)"
                    ></circle><ellipse
                        cx="18.6233"
                        cy="17.1797"
                        rx="0.902344"
                        ry="0.902344"
                        fill="url(#paint10_radial_6668_3181)"
                    ></ellipse><ellipse
                        cx="18.6233"
                        cy="17.1797"
                        rx="0.902344"
                        ry="0.902344"
                        fill="url(#paint11_radial_6668_3181)"
                    ></ellipse><ellipse
                        cx="18.6233"
                        cy="17.1797"
                        rx="0.902344"
                        ry="0.902344"
                        fill="url(#paint12_radial_6668_3181)"
                    ></ellipse><ellipse
                        cx="17.8674"
                        cy="5.26172"
                        rx="0.902344"
                        ry="0.902344"
                        fill="url(#paint13_radial_6668_3181)"
                    ></ellipse><ellipse
                        cx="17.8674"
                        cy="5.26172"
                        rx="0.902344"
                        ry="0.902344"
                        fill="url(#paint14_radial_6668_3181)"
                    ></ellipse><ellipse
                        cx="7.49316"
                        cy="2.52539"
                        rx="0.902344"
                        ry="0.902344"
                        fill="url(#paint15_radial_6668_3181)"
                    ></ellipse><ellipse
                        cx="7.49316"
                        cy="2.52539"
                        rx="0.902344"
                        ry="0.902344"
                        fill="url(#paint16_radial_6668_3181)"
                    ></ellipse><ellipse
                        cx="7.49316"
                        cy="2.52539"
                        rx="0.902344"
                        ry="0.902344"
                        fill="url(#paint17_radial_6668_3181)"
                    ></ellipse><ellipse
                        cx="3.69629"
                        cy="6.08203"
                        rx="0.902344"
                        ry="0.902344"
                        fill="url(#paint18_radial_6668_3181)"
                    ></ellipse><ellipse
                        cx="3.69629"
                        cy="6.08203"
                        rx="0.902344"
                        ry="0.902344"
                        fill="url(#paint19_radial_6668_3181)"
                    ></ellipse><path
                        d="M11.9642 19.507C10.0098 19.3712 8.63892 18.7863 6.41797 16.9513C4.5074 15.3728 3.55886 13.9724 3.24227 12.5444L2.87549 14.6547C3.02539 15.4806 3.66992 16.6349 4.94726 17.7892C6.61789 19.2989 8.28125 20.3673 9.92619 20.3205C10.6032 20.0561 11.2812 19.7866 11.9642 19.507Z"
                        fill="url(#paint20_radial_6668_3181)"
                    ></path><path
                        d="M7.84277 21.1222C6.90341 21.1745 5.63305 20.4082 4.3147 19.3125C3.1897 18.3398 2.63477 17.2831 2.51798 16.7129L2.14551 18.8559C2.23764 19.2182 2.51822 19.7106 3.33032 20.543C4.23841 21.4738 5.15161 21.836 5.69392 21.939C6.07872 21.7923 6.4612 21.6471 6.84207 21.5025C7.17673 21.3754 7.51013 21.2488 7.84277 21.1222Z"
                        fill="url(#paint21_radial_6668_3181)"
                    ></path><g filter="url(#filter3_i_6668_3181)"
                        ><path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20.9273 9.8316C18.2289 9.30445 16.6344 10.5407 16.129 11.0951C15.836 11.4165 15.3379 11.4395 15.0165 11.1465C14.6951 10.8535 14.672 10.3554 14.9651 10.034C15.7487 9.17439 17.8691 7.62939 21.2293 8.28582C21.6561 8.3692 21.9346 8.78284 21.8512 9.20969C21.7678 9.63655 21.3541 9.91498 20.9273 9.8316Z"
                            fill="url(#paint22_radial_6668_3181)"
                        ></path><path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20.9273 9.8316C18.2289 9.30445 16.6344 10.5407 16.129 11.0951C15.836 11.4165 15.3379 11.4395 15.0165 11.1465C14.6951 10.8535 14.672 10.3554 14.9651 10.034C15.7487 9.17439 17.8691 7.62939 21.2293 8.28582C21.6561 8.3692 21.9346 8.78284 21.8512 9.20969C21.7678 9.63655 21.3541 9.91498 20.9273 9.8316Z"
                            fill="url(#paint23_radial_6668_3181)"
                        ></path></g
                    ><path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14.328 1.56183C14.7211 1.58021 15.0248 1.91375 15.0065 2.30683C14.9812 2.84802 14.8827 3.74957 14.6476 4.71257C14.4511 5.51751 14.1485 6.41031 13.6827 7.17573C13.7953 7.77288 13.7983 8.4775 13.6747 9.27871C13.6147 9.66761 13.2507 9.93422 12.8618 9.8742C12.4729 9.81417 12.2063 9.45025 12.2664 9.06135C12.294 8.88208 12.3136 8.71422 12.3263 8.5571C12.188 8.62921 12.0463 8.68574 11.9017 8.72614C11.3369 8.88397 10.7952 8.77458 10.3714 8.4923C9.56636 7.956 9.19515 6.78241 9.8183 5.82296C10.4111 4.91023 11.6466 4.66208 12.5861 5.31146C12.6944 5.38634 12.7962 5.4707 12.8909 5.56432C13.0408 5.18525 13.1641 4.78077 13.2632 4.37462C13.4741 3.51078 13.5615 2.70104 13.583 2.24027C13.6014 1.8472 13.9349 1.54345 14.328 1.56183ZM12.1177 6.91719C12.0095 6.69196 11.881 6.55639 11.7758 6.48369C11.4819 6.28053 11.1588 6.37515 11.0134 6.59914C10.8574 6.83932 10.9399 7.15874 11.1615 7.30635C11.251 7.36601 11.3658 7.3963 11.5183 7.35371C11.6562 7.31517 11.8673 7.20326 12.1177 6.91719Z"
                        fill="url(#paint24_linear_6668_3181)"
                    ></path><path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14.328 1.56183C14.7211 1.58021 15.0248 1.91375 15.0065 2.30683C14.9812 2.84802 14.8827 3.74957 14.6476 4.71257C14.4511 5.51751 14.1485 6.41031 13.6827 7.17573C13.7953 7.77288 13.7983 8.4775 13.6747 9.27871C13.6147 9.66761 13.2507 9.93422 12.8618 9.8742C12.4729 9.81417 12.2063 9.45025 12.2664 9.06135C12.294 8.88208 12.3136 8.71422 12.3263 8.5571C12.188 8.62921 12.0463 8.68574 11.9017 8.72614C11.3369 8.88397 10.7952 8.77458 10.3714 8.4923C9.56636 7.956 9.19515 6.78241 9.8183 5.82296C10.4111 4.91023 11.6466 4.66208 12.5861 5.31146C12.6944 5.38634 12.7962 5.4707 12.8909 5.56432C13.0408 5.18525 13.1641 4.78077 13.2632 4.37462C13.4741 3.51078 13.5615 2.70104 13.583 2.24027C13.6014 1.8472 13.9349 1.54345 14.328 1.56183ZM12.1177 6.91719C12.0095 6.69196 11.881 6.55639 11.7758 6.48369C11.4819 6.28053 11.1588 6.37515 11.0134 6.59914C10.8574 6.83932 10.9399 7.15874 11.1615 7.30635C11.251 7.36601 11.3658 7.3963 11.5183 7.35371C11.6562 7.31517 11.8673 7.20326 12.1177 6.91719Z"
                        fill="url(#paint25_radial_6668_3181)"
                    ></path><path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14.328 1.56183C14.7211 1.58021 15.0248 1.91375 15.0065 2.30683C14.9812 2.84802 14.8827 3.74957 14.6476 4.71257C14.4511 5.51751 14.1485 6.41031 13.6827 7.17573C13.7953 7.77288 13.7983 8.4775 13.6747 9.27871C13.6147 9.66761 13.2507 9.93422 12.8618 9.8742C12.4729 9.81417 12.2063 9.45025 12.2664 9.06135C12.294 8.88208 12.3136 8.71422 12.3263 8.5571C12.188 8.62921 12.0463 8.68574 11.9017 8.72614C11.3369 8.88397 10.7952 8.77458 10.3714 8.4923C9.56636 7.956 9.19515 6.78241 9.8183 5.82296C10.4111 4.91023 11.6466 4.66208 12.5861 5.31146C12.6944 5.38634 12.7962 5.4707 12.8909 5.56432C13.0408 5.18525 13.1641 4.78077 13.2632 4.37462C13.4741 3.51078 13.5615 2.70104 13.583 2.24027C13.6014 1.8472 13.9349 1.54345 14.328 1.56183ZM12.1177 6.91719C12.0095 6.69196 11.881 6.55639 11.7758 6.48369C11.4819 6.28053 11.1588 6.37515 11.0134 6.59914C10.8574 6.83932 10.9399 7.15874 11.1615 7.30635C11.251 7.36601 11.3658 7.3963 11.5183 7.35371C11.6562 7.31517 11.8673 7.20326 12.1177 6.91719Z"
                        fill="url(#paint26_radial_6668_3181)"
                    ></path><path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14.328 1.56183C14.7211 1.58021 15.0248 1.91375 15.0065 2.30683C14.9812 2.84802 14.8827 3.74957 14.6476 4.71257C14.4511 5.51751 14.1485 6.41031 13.6827 7.17573C13.7953 7.77288 13.7983 8.4775 13.6747 9.27871C13.6147 9.66761 13.2507 9.93422 12.8618 9.8742C12.4729 9.81417 12.2063 9.45025 12.2664 9.06135C12.294 8.88208 12.3136 8.71422 12.3263 8.5571C12.188 8.62921 12.0463 8.68574 11.9017 8.72614C11.3369 8.88397 10.7952 8.77458 10.3714 8.4923C9.56636 7.956 9.19515 6.78241 9.8183 5.82296C10.4111 4.91023 11.6466 4.66208 12.5861 5.31146C12.6944 5.38634 12.7962 5.4707 12.8909 5.56432C13.0408 5.18525 13.1641 4.78077 13.2632 4.37462C13.4741 3.51078 13.5615 2.70104 13.583 2.24027C13.6014 1.8472 13.9349 1.54345 14.328 1.56183ZM12.1177 6.91719C12.0095 6.69196 11.881 6.55639 11.7758 6.48369C11.4819 6.28053 11.1588 6.37515 11.0134 6.59914C10.8574 6.83932 10.9399 7.15874 11.1615 7.30635C11.251 7.36601 11.3658 7.3963 11.5183 7.35371C11.6562 7.31517 11.8673 7.20326 12.1177 6.91719Z"
                        fill="url(#paint27_radial_6668_3181)"
                    ></path><path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.381 16.9546C9.86783 16.6709 9.33294 16.3272 8.79492 15.9305C9.60969 14.9206 11.0651 13.596 12.9628 12.6395C16.0808 11.0678 19.5188 11.9208 20.9197 12.4762C21.401 12.667 21.6365 13.2119 21.4457 13.6932C21.2549 14.1745 20.71 14.41 20.2287 14.2192C19.028 13.7432 16.2203 13.0972 13.8067 14.3138C12.2149 15.1162 11.0313 16.195 10.381 16.9546Z"
                        fill="url(#paint28_linear_6668_3181)"
                    ></path><path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.381 16.9546C9.86783 16.6709 9.33294 16.3272 8.79492 15.9305C9.60969 14.9206 11.0651 13.596 12.9628 12.6395C16.0808 11.0678 19.5188 11.9208 20.9197 12.4762C21.401 12.667 21.6365 13.2119 21.4457 13.6932C21.2549 14.1745 20.71 14.41 20.2287 14.2192C19.028 13.7432 16.2203 13.0972 13.8067 14.3138C12.2149 15.1162 11.0313 16.195 10.381 16.9546Z"
                        fill="url(#paint29_radial_6668_3181)"
                    ></path><path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.381 16.9546C9.86783 16.6709 9.33294 16.3272 8.79492 15.9305C9.60969 14.9206 11.0651 13.596 12.9628 12.6395C16.0808 11.0678 19.5188 11.9208 20.9197 12.4762C21.401 12.667 21.6365 13.2119 21.4457 13.6932C21.2549 14.1745 20.71 14.41 20.2287 14.2192C19.028 13.7432 16.2203 13.0972 13.8067 14.3138C12.2149 15.1162 11.0313 16.195 10.381 16.9546Z"
                        fill="url(#paint30_radial_6668_3181)"
                    ></path><path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.381 16.9546C9.86783 16.6709 9.33294 16.3272 8.79492 15.9305C9.60969 14.9206 11.0651 13.596 12.9628 12.6395C16.0808 11.0678 19.5188 11.9208 20.9197 12.4762C21.401 12.667 21.6365 13.2119 21.4457 13.6932C21.2549 14.1745 20.71 14.41 20.2287 14.2192C19.028 13.7432 16.2203 13.0972 13.8067 14.3138C12.2149 15.1162 11.0313 16.195 10.381 16.9546Z"
                        fill="url(#paint31_radial_6668_3181)"
                    ></path><g filter="url(#filter4_i_6668_3181)"
                        ><path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.64388 4.99012C7.39212 4.53768 6.82126 4.375 6.36882 4.62676C5.91638 4.87852 5.7537 5.44938 6.00546 5.90182C6.38564 6.58504 6.85374 7.54953 6.91365 8.79144C6.96586 9.87376 6.711 11.2465 5.6748 12.8931C6.03333 13.3676 6.46628 13.8593 6.96152 14.3476C8.42245 12.2225 8.86453 10.3191 8.78647 8.70109C8.70576 7.02796 8.0723 5.76003 7.64388 4.99012Z"
                            fill="url(#paint32_radial_6668_3181)"
                        ></path><path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.64388 4.99012C7.39212 4.53768 6.82126 4.375 6.36882 4.62676C5.91638 4.87852 5.7537 5.44938 6.00546 5.90182C6.38564 6.58504 6.85374 7.54953 6.91365 8.79144C6.96586 9.87376 6.711 11.2465 5.6748 12.8931C6.03333 13.3676 6.46628 13.8593 6.96152 14.3476C8.42245 12.2225 8.86453 10.3191 8.78647 8.70109C8.70576 7.02796 8.0723 5.76003 7.64388 4.99012Z"
                            fill="url(#paint33_radial_6668_3181)"
                        ></path></g
                    ><path
                        d="M9.64136 6.15879C9.68742 6.04493 9.7456 5.93258 9.81676 5.82303C10.4096 4.91031 11.6451 4.66215 12.5846 5.31153C12.6929 5.38641 12.7946 5.47077 12.8894 5.56439C12.92 5.48694 12.9495 5.40842 12.978 5.32905C12.9794 5.33385 12.9808 5.33863 12.9821 5.34338C12.7891 5.95129 12.3561 6.60205 12.1155 6.916C12.0075 6.69152 11.8793 6.55633 11.7743 6.48376C11.4804 6.2806 11.1573 6.37522 11.0118 6.59921C11.0062 6.60793 11.0008 6.61675 10.9958 6.62566L9.64136 6.15879Z"
                        fill="url(#paint34_radial_6668_3181)"
                    ></path><path
                        d="M9.64136 6.15879C9.68742 6.04493 9.7456 5.93258 9.81676 5.82303C10.4096 4.91031 11.6451 4.66215 12.5846 5.31153C12.6929 5.38641 12.7946 5.47077 12.8894 5.56439C12.92 5.48694 12.9495 5.40842 12.978 5.32905C12.9794 5.33385 12.9808 5.33863 12.9821 5.34338C12.7891 5.95129 12.3561 6.60205 12.1155 6.916C12.0075 6.69152 11.8793 6.55633 11.7743 6.48376C11.4804 6.2806 11.1573 6.37522 11.0118 6.59921C11.0062 6.60793 11.0008 6.61675 10.9958 6.62566L9.64136 6.15879Z"
                        fill="url(#paint35_radial_6668_3181)"
                    ></path><g filter="url(#filter5_i_6668_3181)"
                        ><path
                            d="M13.6812 7.17627C13.7938 7.77328 13.7967 8.47768 13.6731 9.2786C13.6131 9.6675 13.2492 9.93411 12.8603 9.87408C12.4714 9.81406 12.2048 9.45014 12.2648 9.06124C12.2924 8.8823 12.312 8.71473 12.3246 8.55786C13.0611 8.09547 13.5473 7.48023 13.6812 7.17627Z"
                            fill="#44B6FF"
                        ></path></g
                    ><path
                        d="M13.6812 7.17627C13.7938 7.77328 13.7967 8.47768 13.6731 9.2786C13.6131 9.6675 13.2492 9.93411 12.8603 9.87408C12.4714 9.81406 12.2048 9.45014 12.2648 9.06124C12.2924 8.8823 12.312 8.71473 12.3246 8.55786C13.0611 8.09547 13.5473 7.48023 13.6812 7.17627Z"
                        fill="url(#paint36_radial_6668_3181)"
                    ></path><g filter="url(#filter6_f_6668_3181)"
                        ><path
                            d="M12.4123 6.12891C12.2131 5.85939 11.5744 5.37891 10.7716 5.87694C10.5024 6.04401 10.3439 6.67383 10.467 7.10156"
                            stroke="url(#paint37_linear_6668_3181)"
                            stroke-width="0.292969"
                            stroke-linecap="round"
                        ></path></g
                    ><g filter="url(#filter7_f_6668_3181)"
                        ><path
                            d="M14.6038 2.26172C14.5413 3.39453 14.0506 6.06797 12.5881 7.69922"
                            stroke="url(#paint38_linear_6668_3181)"
                            stroke-width="0.292969"
                            stroke-linecap="round"
                        ></path></g
                    ><defs
                        ><filter
                            id="filter0_i_6668_3181"
                            x="1.93042"
                            y="8.64331"
                            width="12.8713"
                            height="13.8264"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                            ><feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                            ></feFlood><feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            ></feBlend><feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            ></feColorMatrix><feOffset dy="-0.488281"
                            ></feOffset><feGaussianBlur stdDeviation="0.488281"
                            ></feGaussianBlur><feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            ></feComposite><feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.92549 0 0 0 0 0.34902 0 0 0 0 0.384314 0 0 0 1 0"
                            ></feColorMatrix><feBlend
                                mode="normal"
                                in2="shape"
                                result="effect1_innerShadow_6668_3181"
                            ></feBlend></filter
                        ><filter
                            id="filter1_f_6668_3181"
                            x="3.40918"
                            y="8.82153"
                            width="11.6287"
                            height="10.2925"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                            ><feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                            ></feFlood><feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            ></feBlend><feGaussianBlur
                                stdDeviation="0.244141"
                                result="effect1_foregroundBlur_6668_3181"
                            ></feGaussianBlur></filter
                        ><filter
                            id="filter2_f_6668_3181"
                            x="4.3269"
                            y="9.198"
                            width="10.178"
                            height="8.88428"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                            ><feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                            ></feFlood><feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            ></feBlend><feGaussianBlur
                                stdDeviation="0.0976562"
                                result="effect1_foregroundBlur_6668_3181"
                            ></feGaussianBlur></filter
                        ><filter
                            id="filter3_i_6668_3181"
                            x="14.7595"
                            y="7.88354"
                            width="7.35059"
                            height="3.46851"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                            ><feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                            ></feFlood><feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            ></feBlend><feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            ></feColorMatrix><feOffset
                                dx="0.244141"
                                dy="-0.244141"
                            ></feOffset><feGaussianBlur stdDeviation="0.244141"
                            ></feGaussianBlur><feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            ></feComposite><feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.721569 0 0 0 0 0.270588 0 0 0 0 0.470588 0 0 0 1 0"
                            ></feColorMatrix><feBlend
                                mode="normal"
                                in2="shape"
                                result="effect1_innerShadow_6668_3181"
                            ></feBlend></filter
                        ><filter
                            id="filter4_i_6668_3181"
                            x="5.6748"
                            y="4.5083"
                            width="3.26685"
                            height="10.0835"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                            ><feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                            ></feFlood><feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            ></feBlend><feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            ></feColorMatrix><feOffset
                                dx="0.146484"
                                dy="0.244141"
                            ></feOffset><feGaussianBlur stdDeviation="0.488281"
                            ></feGaussianBlur><feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            ></feComposite><feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.721569 0 0 0 0 0.184314 0 0 0 0 0.447059 0 0 0 1 0"
                            ></feColorMatrix><feBlend
                                mode="normal"
                                in2="shape"
                                result="effect1_innerShadow_6668_3181"
                            ></feBlend></filter
                        ><filter
                            id="filter5_i_6668_3181"
                            x="12.2563"
                            y="6.93213"
                            width="1.99756"
                            height="2.95044"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                            ><feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                            ></feFlood><feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            ></feBlend><feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            ></feColorMatrix><feOffset
                                dx="0.488281"
                                dy="-0.244141"
                            ></feOffset><feGaussianBlur stdDeviation="0.317383"
                            ></feGaussianBlur><feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            ></feComposite><feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.239216 0 0 0 0 0.439216 0 0 0 0 0.768627 0 0 0 1 0"
                            ></feColorMatrix><feBlend
                                mode="normal"
                                in2="shape"
                                result="effect1_innerShadow_6668_3181"
                            ></feBlend></filter
                        ><filter
                            id="filter6_f_6668_3181"
                            x="9.98511"
                            y="5.22095"
                            width="2.8667"
                            height="2.32007"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                            ><feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                            ></feFlood><feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            ></feBlend><feGaussianBlur
                                stdDeviation="0.146484"
                                result="effect1_foregroundBlur_6668_3181"
                            ></feGaussianBlur></filter
                        ><filter
                            id="filter7_f_6668_3181"
                            x="12.0022"
                            y="1.67578"
                            width="3.1875"
                            height="6.60938"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                            ><feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                            ></feFlood><feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            ></feBlend><feGaussianBlur
                                stdDeviation="0.219727"
                                result="effect1_foregroundBlur_6668_3181"
                            ></feGaussianBlur></filter
                        ><linearGradient
                            id="paint0_linear_6668_3181"
                            x1="3.16608"
                            y1="14.9882"
                            x2="9.21295"
                            y2="20.2382"
                            gradientUnits="userSpaceOnUse"
                            ><stop stop-color="#B3843C"></stop><stop
                                offset="1"
                                stop-color="#F17A61"
                            ></stop></linearGradient
                        ><linearGradient
                            id="paint1_linear_6668_3181"
                            x1="2.49789"
                            y1="15.8007"
                            x2="4.26764"
                            y2="16.1601"
                            gradientUnits="userSpaceOnUse"
                            ><stop stop-color="#B1853B"></stop><stop
                                offset="1"
                                stop-color="#B1853B"
                                stop-opacity="0"
                            ></stop></linearGradient
                        ><linearGradient
                            id="paint2_linear_6668_3181"
                            x1="14.8017"
                            y1="17.871"
                            x2="11.8145"
                            y2="18.3632"
                            gradientUnits="userSpaceOnUse"
                            ><stop stop-color="#F9C26C"></stop><stop
                                offset="1"
                                stop-color="#F9C26C"
                                stop-opacity="0"
                            ></stop></linearGradient
                        ><linearGradient
                            id="paint3_linear_6668_3181"
                            x1="8.36606"
                            y1="9.2929"
                            x2="6.44733"
                            y2="12.5507"
                            gradientUnits="userSpaceOnUse"
                            ><stop stop-color="#E6BF69"></stop><stop
                                offset="1"
                                stop-color="#E6BF69"
                                stop-opacity="0"
                            ></stop></linearGradient
                        ><linearGradient
                            id="paint4_linear_6668_3181"
                            x1="9.24222"
                            y1="16.3528"
                            x2="10.014"
                            y2="11.1924"
                            gradientUnits="userSpaceOnUse"
                            ><stop stop-color="#FCCB57"></stop><stop
                                offset="1"
                                stop-color="#F5BD55"
                            ></stop></linearGradient
                        ><linearGradient
                            id="paint5_linear_6668_3181"
                            x1="3.86058"
                            y1="13.3986"
                            x2="16.2205"
                            y2="14.0027"
                            gradientUnits="userSpaceOnUse"
                            ><stop stop-color="#F3AB2C"></stop><stop
                                offset="1"
                                stop-color="#B57F1E"
                            ></stop></linearGradient
                        ><radialGradient
                            id="paint6_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(6.34021 15.3907) rotate(-109.125) scale(4.85813 1.3607)"
                            ><stop offset="0.423414" stop-color="#CA851E"
                            ></stop><stop
                                offset="1"
                                stop-color="#CA851E"
                                stop-opacity="0"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint7_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(11.4266 15.4591) rotate(-73.0972) scale(4.88215 2.85904)"
                            ><stop stop-color="#BC7F28"></stop><stop
                                offset="1"
                                stop-color="#BC7F28"
                                stop-opacity="0"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint8_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(11.6155 11.7539) rotate(138.668) scale(1.29533)"
                            ><stop stop-color="#5AC0FF"></stop><stop
                                offset="1"
                                stop-color="#3279B6"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint9_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(11.3946 11.8757) rotate(160.051) scale(1.30079 1.42583)"
                            ><stop
                                offset="0.534713"
                                stop-color="#3A619E"
                                stop-opacity="0"
                            ></stop><stop offset="1" stop-color="#3A619E"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint10_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(19.1461 16.7984) rotate(134.569) scale(1.48315)"
                            ><stop stop-color="#FDD46C"></stop><stop
                                offset="1"
                                stop-color="#F09C53"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint11_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(18.7913 16.7195) rotate(100.827) scale(1.46912 1.46912)"
                            ><stop
                                offset="0.792052"
                                stop-color="#E76260"
                                stop-opacity="0"
                            ></stop><stop offset="0.964251" stop-color="#E76260"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint12_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(19.0538 17.3286) rotate(-147.558) scale(1.48779 1.75207)"
                            ><stop
                                offset="0.482355"
                                stop-color="#AA885A"
                                stop-opacity="0"
                            ></stop><stop offset="0.90682" stop-color="#AA885A"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint13_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(18.5136 4.9106) rotate(132.387) scale(1.54509)"
                            ><stop stop-color="#FF46AA"></stop><stop
                                offset="1"
                                stop-color="#E3189D"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint14_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(18.2483 5.42578) rotate(-173.29) scale(1.40415 1.87919)"
                            ><stop
                                offset="0.522105"
                                stop-color="#B63173"
                                stop-opacity="0"
                            ></stop><stop offset="1" stop-color="#B63173"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint15_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(8.08442 2.1642) rotate(139.574) scale(1.38089)"
                            ><stop stop-color="#FFF46F"></stop><stop
                                offset="1"
                                stop-color="#EFB93C"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint16_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(7.8869 2.37927) rotate(-178.519) scale(1.43598 1.36723)"
                            ><stop
                                offset="0.558644"
                                stop-color="#AA904B"
                                stop-opacity="0"
                            ></stop><stop offset="0.943632" stop-color="#AA904B"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint17_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(7.72482 2.01563) rotate(102.339) scale(1.53547)"
                            ><stop
                                offset="0.771901"
                                stop-color="#C47072"
                                stop-opacity="0"
                            ></stop><stop offset="1" stop-color="#C47072"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint18_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(4.34247 5.73091) rotate(132.387) scale(1.54509)"
                            ><stop stop-color="#FF46AA"></stop><stop
                                offset="1"
                                stop-color="#E3189D"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint19_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(4.07715 6.24609) rotate(-173.29) scale(1.40415 1.87919)"
                            ><stop
                                offset="0.522105"
                                stop-color="#B63173"
                                stop-opacity="0"
                            ></stop><stop offset="1" stop-color="#B63173"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint20_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(8.41601 18.8087) rotate(133.21) scale(3.18353 6.97013)"
                            ><stop stop-color="#3365FF"></stop><stop
                                offset="1"
                                stop-color="#356DB9"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint21_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(5.55688 21.0117) rotate(131.598) scale(1.96513 4.97095)"
                            ><stop stop-color="#3365FF"></stop><stop
                                offset="1"
                                stop-color="#356DB9"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint22_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(20.6505 8.91808) rotate(168.283) scale(3.2314 1.20556)"
                            ><stop stop-color="#FF3BA9"></stop><stop
                                offset="1"
                                stop-color="#F422A7"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint23_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(18.3127 11.4962) rotate(-127.355) scale(3.3318 5.93796)"
                            ><stop
                                offset="0.752144"
                                stop-color="#B8306F"
                                stop-opacity="0"
                            ></stop><stop offset="1" stop-color="#B8306F"
                            ></stop></radialGradient
                        ><linearGradient
                            id="paint24_linear_6668_3181"
                            x1="14.2967"
                            y1="1.56104"
                            x2="10.9353"
                            y2="9.61728"
                            gradientUnits="userSpaceOnUse"
                            ><stop stop-color="#20B2EE"></stop><stop
                                offset="1"
                                stop-color="#2689DA"
                            ></stop></linearGradient
                        ><radialGradient
                            id="paint25_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(13.5589 4.17809) rotate(128.217) scale(5.82048 3.56025)"
                            ><stop
                                offset="0.80204"
                                stop-color="#4274D2"
                                stop-opacity="0"
                            ></stop><stop offset="0.950917" stop-color="#4274D2"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint26_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(13.2677 3.50401) rotate(12.0948) scale(0.838935 2.81637)"
                            ><stop stop-color="#4D8EC0"></stop><stop
                                offset="1"
                                stop-color="#4D8EC0"
                                stop-opacity="0"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint27_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(14.9318 1.68761) rotate(141.953) scale(1.02678 0.923144)"
                            ><stop stop-color="#5ADEFF"></stop><stop
                                offset="1"
                                stop-color="#5ADEFF"
                                stop-opacity="0"
                            ></stop></radialGradient
                        ><linearGradient
                            id="paint28_linear_6668_3181"
                            x1="10.8376"
                            y1="16.2712"
                            x2="20.8944"
                            y2="13.6356"
                            gradientUnits="userSpaceOnUse"
                            ><stop stop-color="#3797E2"></stop><stop
                                offset="1"
                                stop-color="#37AEFF"
                            ></stop></linearGradient
                        ><radialGradient
                            id="paint29_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(14.5576 17.9157) rotate(-129.838) scale(5.98501 15.0027)"
                            ><stop
                                offset="0.622552"
                                stop-color="#526579"
                                stop-opacity="0"
                            ></stop><stop offset="0.962126" stop-color="#526579"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint30_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(17.919 14.6856) rotate(94.3987) scale(2.0544 4.13039)"
                            ><stop offset="0.396078" stop-color="#6972FF"
                            ></stop><stop
                                offset="1"
                                stop-color="#6972FF"
                                stop-opacity="0"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint31_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(20.9652 12.9589) rotate(-68.8186) scale(0.563272 0.444206)"
                            ><stop stop-color="#55BFFF"></stop><stop
                                offset="1"
                                stop-color="#55BFFF"
                                stop-opacity="0"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint32_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(8.13275 4.8273) rotate(99.4229) scale(5.48388 2.05448)"
                            ><stop stop-color="#FF3AAA"></stop><stop
                                offset="1"
                                stop-color="#FD2F89"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint33_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(5.26958 10.4822) rotate(31.1757) scale(3.60634 11.3177)"
                            ><stop
                                offset="0.803698"
                                stop-color="#DB2C6E"
                                stop-opacity="0"
                            ></stop><stop offset="1" stop-color="#DB2C6E"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint34_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(12.3146 7.13988) rotate(-119.23) scale(2.05375 1.5352)"
                            ><stop stop-color="#336BAF"></stop><stop
                                offset="1"
                                stop-color="#336BAF"
                                stop-opacity="0"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint35_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(12.9821 5.58994) rotate(-127.657) scale(1.39133 0.563706)"
                            ><stop stop-color="#49A4D4"></stop><stop
                                offset="1"
                                stop-color="#49A4D4"
                                stop-opacity="0"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint36_radial_6668_3181"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(13.6076 7.11328) rotate(94.8498) scale(1.94054 1.08)"
                            ><stop stop-color="#4AB5F8"></stop><stop
                                offset="1"
                                stop-color="#4AB5F8"
                                stop-opacity="0"
                            ></stop></radialGradient
                        ><linearGradient
                            id="paint37_linear_6668_3181"
                            x1="10.1974"
                            y1="6.14199"
                            x2="12.2834"
                            y2="5.63083"
                            gradientUnits="userSpaceOnUse"
                            ><stop stop-color="#4EAFF2"></stop><stop
                                offset="1"
                                stop-color="#4EAFF2"
                                stop-opacity="0"
                            ></stop></linearGradient
                        ><linearGradient
                            id="paint38_linear_6668_3181"
                            x1="14.4397"
                            y1="1.46484"
                            x2="11.51"
                            y2="8.21484"
                            gradientUnits="userSpaceOnUse"
                            ><stop stop-color="#5BDDFF"></stop><stop
                                offset="1"
                                stop-color="#5BDDFF"
                                stop-opacity="0"
                            ></stop></linearGradient
                        ></defs
                    ></svg
                >
                <div>
                    <div class="text-strong text-large font-bold">{$_('welcome-bonus-1')}</div>
                </div>
            </div>

            <div class="_829ba225">
                {#each welcomeTasks as task}
                    <TaskCard {...task} />
                {/each}
            </div>
        </section>
        <section>
            <div class="text-strong d6c82c64">
                <img
                    width="24"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMAUExURUxpcbWyu8/Pz8nD0NLR0tPT07OsxqmKxq6rsuvp79za3piVnKiSvqeJwunn6rq6upd1tc0+StfX2bGgxObm66+qs+jm6/Px89HR0q2Vw62Uxr29vayLyayms9Y5Z9szZuJBiOcyg+Xk5ePb6rq6uuE2b9jQ4NjQ39nS4NrU4drU4NfK5tjO39bI5NTL3NLJ29fJ5NjN3tXM3dPE49DH2dbO39va3cK6y/Lu9dXG5N/T593Y4djM5fDq9svC09fI4sOt2c7F1sG4yNzQ5ruzw9XK2djK47uxwtvW4b61xt7a4t/c4b6wyODW6d7S5tfH4NLD0MzE1NHA4tzO5NfL29PH1+Tb7d/N49fF3drO5sCuxuzl87Suus++4dnL486+yr21xNTF39XI193R6OA0TbuuyMq33rulr8y537Ktt9fB2uHW7Me0wN3b4LSZzrab0NrK2cjA0bmvv9/T6uLZ7Ojf7r+pw88tbtgvPd/Q5NnT3tjM3t/K4NLG1d4pf+Eug+IxbN82Sc81P+Le5Ong8se+z8C7xLmpxsPAxsrB0Obg59XG1d3C2t4uSt8ygeEveu3m9dXQ2sW9zMCp1te917m0v+bd8LmsufFOa7xsdOExc9XF4sC1yrSjwMm0z9vG07xiguTX6My82cez2cy61dp2pbKirNgpT9TC3NGzzdW6056Tn87AztrBzNcpeL9ietLP1c/K1uLT5t7H3tNnfse3xeI5YdosZ9AtY6iYpdjX2urm69K71cqvyMu7y8KyvsZbdK2RrbaotK+cw9HA2q6mtLOYtdlzndosXrBScruozfDr8Mu8xMGvuNkrcL+jvdIvWp9+oMvJzrCVyqiQv/f096eeq92AqNa6xKeIqdkqdZyHkbegzcKu0ezi8Jt+tdO40uLV3+V7j84kWsVrjL2psc5rmI1pkJZ2mec9WK6Xs8YnUMyvuNRylptIb8Sco8aFj7JeZohchsxie+KLp795mro3XcglSs4kTLN6ndFwn8OMq9the9JJV6k4WreYwludoWEAAAAmdFJOUwA3aBtqaghqampnajJVN2pqcEzkaOqB5V5+1+ZqgzldbnLl039v+KZSUAAAB65JREFUeNrt2HtcU+cdx/GKjnadl06tva7dur24Bw01IhdBEIgoDBCs4aYBxE5cHEYNK5jV1hJAO7kMxdEmVGCQKmyiQ0vLrdyqIjIrolSt3bTeatW5tuuur31/z5OccxKS7uX//bxi8iQhb3/nOcSAD3zb/eQ6YfrjLi6TJk36Dv64TJuGBYW7uNAdXE+b5kJruuvy+PSpro6Ynzz14YF3efPmzTtgKJ7nIIMBT1IajWbptm3PzZpo70x4qhiO+FWANJKWapZSmuLid3GDoGzb/t57g49NtXPWwiknaLEmiAIUJKRZollCaYKKi/NpIUJn5ttIEx/dVfxhS3l5fr7XYh4gyyoIlyBck+hlMADiMWlw/pnHpEf3gzQDh7wsLW4xFMO0D1A5wxEoQINnzsySbPSjuwzFJS0HaCJLLepwD89xeRiiyz0XexIJDBIbyVWyQ7sMFSUJLeXu+R6WCELs1RbRy9PTXa0u9xIKWrKdpLPPjINmK9ytUJg63M1DCBgLkK+HOysf/RltP3vyWQF6iENhc30V7qDc3DzcCMKtkAgxRi6XJyXl5tbUxH+eV/pDW2gDoNm+CoW7GxUWEY4Ft0RPoY4A5MOYyMwd8at+fiXvo5d/5AjyUygUeLl7QgQmEiKEREVEhK+Pj8C0DsHZaQ+VMIhJOEBhIjHwgCJ9wFjG+fRK3u93vvwrm0MLrwgJmzt3NkaChBIiohX2DIfEw3rxLeZ88d37g3yQn1K5nM2jF52z822hQgsEyRFEDIf87JxUpxAkDtkzCjlBvrbO5sH/D4kSECSX+yq1ehvnd3s/XuAYIolKUAKSBkbu56vV6m2cFbbQ90b705TR4f4VFRWFaAPyV6pDbCtBhVpteGtrV08bd67uyy04uG37TBHav3+0v39tWlqalqekIoSUPC2qquppaDt/jDtdrZ1N+sjyhyXQKBgtXqpWR7PCo5UR4fZFR6urCNrPnX92dMJJyg8CJOxRBNsjvttsl0KwR9L9KSjwS/KN1Ff1tAr78/qWFQf3brbd7DQBYo4IWc47nAL2fdjTMATnI4vzkgPIvzCBzpod5CNC5CxvamhrsDqHtrx00DkESYDkVgcMd+I7286/lXeSO2ygvZtTx0EhHIJEESSXc0hwVnXhfJ0s3WlxAL3gBILEoaQQrbpAzirgTiR7vx9752RpqdUJ/GaISyVadRIkMMI8cP4gOgQFOoXIiWRxiDvivz/klFqdnwYGxjqdSICatF25ubmcIYfPc6SaO1vIcQJtAISWo8zMzB2rqgBR9s4HbB4OxTo5tDDu6PX6+PgTnw7V1HAqU+pc3Yd54HAo1gm0nCJm1Yk7d+80N4OCs0N0qq8O59BAiXC+CdJDYczd/7yy+saeL5prkMX505Hq6uoPhnU5W1YkJiYuWgTHGZQQpien6cTQb1/95eobN/bs+QsN1SxxKnU6FXOQU6gEEBh8WpGzurGRpHPNzc3nyDm6lZzXdSmqRIKcTxReWBKSAOaE1fn668bDJJ07d0t0VClSKNYhVFES0gSn60U4r6xu/Or2f//OpFu37pCzdSucQ1IokE202w5SAipp6my1Ot2n7t07xqR/3+0WnENxEigLjkOos7OzdYg7v+4eGLt+7dSxz0g6fJScz8lZCSgOTjKDMNEmghZIoLVaNX06DDVYnOHhgVPXxyBdPozI2ZejUsXFqVJizFErkWWq2E27XysbBCR+irSNjrbtP/9X7ryPxk5dv3bv9meXjx5BV4aHdboUKoZ6k+fvj5+F8CPswzZQm8QZGLh5k0nXbn91+fI7eV+CERxkdfwL7aCH+tfSxwx3/tjRYTKZdDdv6owD74+N/ePLf3W0V+aYzWZVhsocE9MXFxcXWhClUOD46Ng2p6bOFCE4Vdgf5rz9STt6c8BoMqXQIKb2HOzOSrY1UTExGYnJycmLUFbgRmz2a3TWpFCPxKms7OszGY31rD4zmFAwIoTgOIZEZ18lOw6TsagPmc0ZYEKjJFCwLVRmc/r7JU4OOeZ6YxEQUhAgfmRR2Qzi0saN6+jsYyIJZOOoVKqM+qJsMBzhgYkKpYmCgyWQ3URSBwxODCBi5iCrRFB2NiAmOYS+b91nOMQwKAYMd+whxKDY8RBzOj7BQHBYtYCYI2DeeL0MUJRFysqKXfeCPQTnbx00kJmcUFSbHSODJMkb0UQAycJI1olmihAcXcfb7RiIM7JQTCSTyebIpNIcbxlBCMvg5Cy2R6llC8S3yLON3bqUDlN7nznjDRQKAlCAzDZYbwBiOO56Q9q0e3dqWdl0AXqm24i3gqmeICogIKC2KDtASIYLFUAQV/HInOAs2qTUj6dKfhU1FqVcNNXXpi9b9jyCBQiLALueLypKty5BQcJMP3aV/HJsLDp+8WJdbW16Oiyqrug4TPuWAZLclXljn9bNAiCMNIOkurq6NT+jwNUZi3ANFhfYLKyNxjXp1vBwgHdycthEAEKTe3svHP/NwoWwoKGLvb10A1Xamt5ePEvxJ2HVTpA6kGb0XgBlbeGFkZGFDhoZwd8mbQYc2yY+8eTp06fXWxu5dGn9L8a1/tIlfInQ6SefcPj/NZOnTHlQ6JFHhOXTT49/FE2ZMtn1gW+7j/4HxxLmCZwaiHwAAAAASUVORK5CYII="
                />{$_('futures-trade')}</div>
            <div class="_829ba225">
                {#each futuresTasks as task}
                <TaskCard {...task} />
                {/each}
            </div>
        </section>
        <!---->
        <section>
            <div class="text-strong d6c82c64">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    ><g filter="url(#filter0_i_6668_3196)"
                        ><path
                            d="M6.8111 8.08115V6.74561L2.91162 6.74561C2.80807 6.74561 2.72412 6.82955 2.72412 6.93311L2.72412 6.95615C2.72412 7.57747 3.2278 8.08115 3.84912 8.08115H6.8111Z"
                            fill="#CBC8C7"
                        ></path></g
                    ><g filter="url(#filter1_i_6668_3196)"
                        ><path
                            d="M6.81098 9.40174V8.0813L3.9458 8.0813C3.84225 8.0813 3.7583 8.1643 3.7583 8.26668L3.7583 8.28947C3.7583 8.90376 4.26198 9.40174 4.8833 9.40174H6.81098Z"
                            fill="#BDBFBD"
                        ></path></g
                    ><g filter="url(#filter2_i_6668_3196)"
                        ><path
                            d="M1.9375 5.42529C1.83395 5.42529 1.75 5.50925 1.75 5.61279V5.63584C1.75 6.25716 2.25368 6.76084 2.875 6.76084H5.91932C6.18442 6.76084 6.39932 6.97574 6.39932 7.24084V9.02682C6.39932 9.23393 6.56723 9.40182 6.77432 9.40182H8.3374C9.43544 9.40182 10.3257 8.51165 10.3257 7.41357C10.3257 6.31548 9.43549 5.42532 8.3374 5.42532L1.9375 5.42529Z"
                            fill="#D6D2D1"
                        ></path><path
                            d="M1.9375 5.42529C1.83395 5.42529 1.75 5.50925 1.75 5.61279V5.63584C1.75 6.25716 2.25368 6.76084 2.875 6.76084H5.91932C6.18442 6.76084 6.39932 6.97574 6.39932 7.24084V9.02682C6.39932 9.23393 6.56723 9.40182 6.77432 9.40182H8.3374C9.43544 9.40182 10.3257 8.51165 10.3257 7.41357C10.3257 6.31548 9.43549 5.42532 8.3374 5.42532L1.9375 5.42529Z"
                            fill="url(#paint0_radial_6668_3196)"
                        ></path></g
                    ><rect
                        x="3.55029"
                        y="13.9553"
                        width="16.1026"
                        height="10.5724"
                        rx="2.64"
                        transform="rotate(-45 3.55029 13.9553)"
                        fill="url(#paint1_linear_6668_3196)"
                    ></rect><rect
                        x="3.55029"
                        y="13.9553"
                        width="16.1026"
                        height="10.5724"
                        rx="2.64"
                        transform="rotate(-45 3.55029 13.9553)"
                        fill="url(#paint2_linear_6668_3196)"
                    ></rect><rect
                        x="3.55029"
                        y="13.9553"
                        width="16.1026"
                        height="10.5724"
                        rx="2.64"
                        transform="rotate(-45 3.55029 13.9553)"
                        fill="url(#paint3_linear_6668_3196)"
                    ></rect><rect
                        x="3.55029"
                        y="13.9553"
                        width="16.1026"
                        height="10.5724"
                        rx="2.64"
                        transform="rotate(-45 3.55029 13.9553)"
                        fill="url(#paint4_radial_6668_3196)"
                    ></rect><rect
                        x="3.55029"
                        y="13.9553"
                        width="16.1026"
                        height="10.5724"
                        rx="2.64"
                        transform="rotate(-45 3.55029 13.9553)"
                        fill="url(#paint5_radial_6668_3196)"
                    ></rect><rect
                        x="2.08057"
                        y="12.4854"
                        width="16.1026"
                        height="10.5724"
                        rx="2.64"
                        transform="rotate(-45 2.08057 12.4854)"
                        fill="url(#paint6_radial_6668_3196)"
                    ></rect><g filter="url(#filter3_iii_6668_3196)"
                        ><path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13.1668 3.13755L4.11908 12.1852C3.94969 12.3546 3.94969 12.6293 4.11908 12.7986L9.24354 17.9231C9.41293 18.0925 9.68756 18.0925 9.85695 17.9231L18.9046 8.87542C19.074 8.70604 19.074 8.43141 18.9046 8.26202L13.7802 3.13755C13.6108 2.96817 13.3362 2.96817 13.1668 3.13755ZM3.81238 11.8785C3.4736 12.2173 3.4736 12.7666 3.81238 13.1053L8.93684 18.2298C9.27561 18.5686 9.82487 18.5686 10.1636 18.2298L19.2113 9.18212C19.5501 8.84335 19.5501 8.29409 19.2113 7.95532L14.0869 2.83085C13.7481 2.49208 13.1988 2.49208 12.8601 2.83085L3.81238 11.8785Z"
                            fill="url(#paint7_linear_6668_3196)"
                        ></path></g
                    ><ellipse
                        cx="13.4926"
                        cy="8.54957"
                        rx="2.67474"
                        ry="2.4669"
                        transform="rotate(-45 13.4926 8.54957)"
                        fill="#289D5B"
                    ></ellipse><ellipse
                        cx="13.4926"
                        cy="8.54957"
                        rx="2.67474"
                        ry="2.4669"
                        transform="rotate(-45 13.4926 8.54957)"
                        fill="url(#paint8_linear_6668_3196)"
                    ></ellipse><ellipse
                        cx="13.4926"
                        cy="8.54957"
                        rx="2.67474"
                        ry="2.4669"
                        transform="rotate(-45 13.4926 8.54957)"
                        fill="url(#paint9_radial_6668_3196)"
                    ></ellipse><g filter="url(#filter4_f_6668_3196)"
                        ><path
                            d="M7.53631 7.39826L9.23594 5.69863L16.5276 12.9902L14.764 14.7538L7.53631 7.39826Z"
                            fill="#127531"
                        ></path></g
                    ><g filter="url(#filter5_f_6668_3196)"
                        ><path
                            d="M16.2273 16.0767L17.9205 14.3834L16.5276 12.9905L14.764 14.754L16.2273 16.0767Z"
                            fill="#0B3F2E"
                        ></path></g
                    ><rect
                        x="7.39038"
                        y="7.17603"
                        width="2.53016"
                        height="12.6508"
                        transform="rotate(-45 7.39038 7.17603)"
                        fill="url(#paint10_linear_6668_3196)"
                    ></rect><rect
                        x="7.39038"
                        y="7.17603"
                        width="2.53016"
                        height="12.6508"
                        transform="rotate(-45 7.39038 7.17603)"
                        fill="url(#paint11_linear_6668_3196)"
                    ></rect><g filter="url(#filter6_dii_6668_3196)"
                        ><path
                            d="M7.18111 11.8927C7.0426 11.7542 7.0426 11.5297 7.18111 11.3912C7.31962 11.2526 7.54419 11.2526 7.68269 11.3912L7.95883 11.6673C8.46838 11.3578 8.98775 11.4837 9.28649 11.7266C9.45669 11.865 9.47694 12.054 9.35605 12.2027C9.23515 12.3514 9.0166 12.3739 8.86791 12.253C8.77059 12.1739 8.46702 11.9646 8.09004 12.3416C7.55011 12.8815 8.24977 13.6068 8.87596 12.9806C9.14432 12.7122 9.58355 12.5839 9.8903 12.6339C10.2096 12.686 10.4574 12.8464 10.6334 13.0802C10.8992 13.5029 10.8637 13.9467 10.6228 14.3313L10.8887 14.5971C11.0272 14.7357 11.0272 14.9602 10.8887 15.0987C10.7502 15.2372 10.5256 15.2372 10.3871 15.0987L10.1271 14.8388C9.70226 15.1137 9.20238 15.1118 8.77532 14.7745C8.62494 14.6557 8.58712 14.4493 8.70592 14.299C8.82471 14.1486 9.04292 14.123 9.19329 14.2418C9.26794 14.3008 9.38946 14.3685 9.52018 14.3827C9.63193 14.3948 9.77195 14.3657 9.94302 14.1946C10.1562 13.9814 10.1912 13.7905 10.1571 13.6483C10.0836 13.2425 9.59214 13.1398 9.30247 13.4294C8.89848 13.8015 8.60973 13.8935 8.28668 13.8797C8.02418 13.8686 7.75895 13.7581 7.56929 13.5684C7.44773 13.4469 7.28632 13.2143 7.25736 12.9187C7.23403 12.6806 7.28378 12.4174 7.44954 12.1612L7.18111 11.8927Z"
                            fill="url(#paint12_linear_6668_3196)"
                        ></path></g
                    ><g filter="url(#filter7_ii_6668_3196)"
                        ><path
                            d="M15.8672 17.417H17.2027V21.3132C17.2027 21.4186 17.1173 21.504 17.0119 21.504C16.3797 21.504 15.8672 20.9914 15.8672 20.3592V17.417Z"
                            fill="#C8C2C3"
                        ></path></g
                    ><g filter="url(#filter8_ii_6668_3196)"
                        ><path
                            d="M14.5317 17.417H15.8673V20.2789C15.8673 20.3843 15.7819 20.4697 15.6765 20.4697C15.0443 20.4697 14.5317 19.9572 14.5317 19.3249V17.417Z"
                            fill="#C8C2C3"
                        ></path></g
                    ><g filter="url(#filter9_ii_6668_3196)"
                        ><path
                            d="M16.5275 13.9026C15.4253 13.9026 14.5317 14.7928 14.5317 15.8908V17.4539C14.5317 17.661 14.7003 17.8289 14.9082 17.8289H16.8816C17.0479 17.8289 17.1827 17.9632 17.1827 18.1289V21.3532C17.1827 21.9745 17.6883 22.4782 18.312 22.4782H18.3352C18.4391 22.4782 18.5234 22.3943 18.5234 22.2907L18.5233 15.8908C18.5233 14.7928 17.6298 13.9026 16.5275 13.9026Z"
                            fill="#DBD7D7"
                        ></path></g
                    ><defs
                        ><filter
                            id="filter0_i_6668_3196"
                            x="1.82412"
                            y="6.44561"
                            width="4.98691"
                            height="1.63545"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                            ><feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                            ></feFlood><feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            ></feBlend><feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            ></feColorMatrix><feOffset dx="-0.9" dy="-0.3"
                            ></feOffset><feGaussianBlur stdDeviation="0.6"
                            ></feGaussianBlur><feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            ></feComposite><feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.647059 0 0 0 0 0.623529 0 0 0 0 0.623529 0 0 0 1 0"
                            ></feColorMatrix><feBlend
                                mode="normal"
                                in2="shape"
                                result="effect1_innerShadow_6668_3196"
                            ></feBlend></filter
                        ><filter
                            id="filter1_i_6668_3196"
                            x="2.8583"
                            y="7.7813"
                            width="3.95273"
                            height="1.62056"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                            ><feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                            ></feFlood><feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            ></feBlend><feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            ></feColorMatrix><feOffset dx="-0.9" dy="-0.3"
                            ></feOffset><feGaussianBlur stdDeviation="0.45"
                            ></feGaussianBlur><feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            ></feComposite><feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.580392 0 0 0 0 0.611765 0 0 0 0 0.584314 0 0 0 1 0"
                            ></feColorMatrix><feBlend
                                mode="normal"
                                in2="shape"
                                result="effect1_innerShadow_6668_3196"
                            ></feBlend></filter
                        ><filter
                            id="filter2_i_6668_3196"
                            x="1.75"
                            y="5.12529"
                            width="8.57568"
                            height="4.27656"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                            ><feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                            ></feFlood><feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            ></feBlend><feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            ></feColorMatrix><feOffset dy="-0.3"
                            ></feOffset><feGaussianBlur stdDeviation="0.45"
                            ></feGaussianBlur><feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            ></feComposite><feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.658824 0 0 0 0 0.623529 0 0 0 0 0.627451 0 0 0 1 0"
                            ></feColorMatrix><feBlend
                                mode="normal"
                                in2="shape"
                                result="effect1_innerShadow_6668_3196"
                            ></feBlend></filter
                        ><filter
                            id="filter3_iii_6668_3196"
                            x="3.31835"
                            y="2.57666"
                            width="16.387"
                            height="16.1472"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                            ><feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                            ></feFlood><feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            ></feBlend><feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            ></feColorMatrix><feOffset dy="0.24"
                            ></feOffset><feGaussianBlur stdDeviation="0.15"
                            ></feGaussianBlur><feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            ></feComposite><feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.0941176 0 0 0 0 0.509804 0 0 0 0 0.254902 0 0 0 1 0"
                            ></feColorMatrix><feBlend
                                mode="normal"
                                in2="shape"
                                result="effect1_innerShadow_6668_3196"
                            ></feBlend><feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            ></feColorMatrix><feOffset dx="-0.24"
                            ></feOffset><feGaussianBlur stdDeviation="0.15"
                            ></feGaussianBlur><feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            ></feComposite><feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.0941176 0 0 0 0 0.509804 0 0 0 0 0.254902 0 0 0 1 0"
                            ></feColorMatrix><feBlend
                                mode="normal"
                                in2="effect1_innerShadow_6668_3196"
                                result="effect2_innerShadow_6668_3196"
                            ></feBlend><feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            ></feColorMatrix><feOffset dx="0.24"
                            ></feOffset><feGaussianBlur stdDeviation="0.15"
                            ></feGaussianBlur><feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            ></feComposite><feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.172549 0 0 0 0 0.709804 0 0 0 0 0.4 0 0 0 1 0"
                            ></feColorMatrix><feBlend
                                mode="normal"
                                in2="effect2_innerShadow_6668_3196"
                                result="effect3_innerShadow_6668_3196"
                            ></feBlend></filter
                        ><filter
                            id="filter4_f_6668_3196"
                            x="7.05638"
                            y="5.21873"
                            width="9.95121"
                            height="10.0149"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                            ><feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                            ></feFlood><feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            ></feBlend><feGaussianBlur
                                stdDeviation="0.24"
                                result="effect1_foregroundBlur_6668_3196"
                            ></feGaussianBlur></filter
                        ><filter
                            id="filter5_f_6668_3196"
                            x="14.4642"
                            y="12.6905"
                            width="3.75625"
                            height="3.68618"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                            ><feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                            ></feFlood><feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            ></feBlend><feGaussianBlur
                                stdDeviation="0.15"
                                result="effect1_foregroundBlur_6668_3196"
                            ></feGaussianBlur></filter
                        ><filter
                            id="filter6_dii_6668_3196"
                            x="6.77715"
                            y="11.1674"
                            width="4.33553"
                            height="4.33528"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                            ><feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                            ></feFlood><feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            ></feColorMatrix><feOffset dx="-0.12" dy="0.12"
                            ></feOffset><feGaussianBlur stdDeviation="0.09"
                            ></feGaussianBlur><feComposite
                                in2="hardAlpha"
                                operator="out"
                            ></feComposite><feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.0901961 0 0 0 0 0.521569 0 0 0 0 0.223529 0 0 0 1 0"
                            ></feColorMatrix><feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_6668_3196"
                            ></feBlend><feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_6668_3196"
                                result="shape"
                            ></feBlend><feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            ></feColorMatrix><feOffset dx="0.12" dy="-0.12"
                            ></feOffset><feGaussianBlur stdDeviation="0.06"
                            ></feGaussianBlur><feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            ></feComposite><feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.784314 0 0 0 0 0.760784 0 0 0 0 0.752941 0 0 0 1 0"
                            ></feColorMatrix><feBlend
                                mode="normal"
                                in2="shape"
                                result="effect2_innerShadow_6668_3196"
                            ></feBlend><feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            ></feColorMatrix><feOffset dx="-0.12" dy="0.12"
                            ></feOffset><feGaussianBlur stdDeviation="0.06"
                            ></feGaussianBlur><feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            ></feComposite><feColorMatrix
                                type="matrix"
                                values="0 0 0 0 1 0 0 0 0 0.996078 0 0 0 0 0.992157 0 0 0 1 0"
                            ></feColorMatrix><feBlend
                                mode="normal"
                                in2="effect2_innerShadow_6668_3196"
                                result="effect3_innerShadow_6668_3196"
                            ></feBlend></filter
                        ><filter
                            id="filter7_ii_6668_3196"
                            x="15.5072"
                            y="17.057"
                            width="2.05545"
                            height="4.44691"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                            ><feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                            ></feFlood><feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            ></feBlend><feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            ></feColorMatrix><feOffset dx="0.36" dy="-0.36"
                            ></feOffset><feGaussianBlur stdDeviation="0.45"
                            ></feGaussianBlur><feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            ></feComposite><feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.658824 0 0 0 0 0.631373 0 0 0 0 0.635294 0 0 0 1 0"
                            ></feColorMatrix><feBlend
                                mode="normal"
                                in2="shape"
                                result="effect1_innerShadow_6668_3196"
                            ></feBlend><feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            ></feColorMatrix><feOffset dx="-0.36" dy="-0.36"
                            ></feOffset><feGaussianBlur stdDeviation="0.45"
                            ></feGaussianBlur><feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            ></feComposite><feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.721569 0 0 0 0 0.682353 0 0 0 0 0.690196 0 0 0 1 0"
                            ></feColorMatrix><feBlend
                                mode="normal"
                                in2="effect1_innerShadow_6668_3196"
                                result="effect2_innerShadow_6668_3196"
                            ></feBlend></filter
                        ><filter
                            id="filter8_ii_6668_3196"
                            x="14.1717"
                            y="17.057"
                            width="2.05545"
                            height="3.41273"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                            ><feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                            ></feFlood><feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            ></feBlend><feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            ></feColorMatrix><feOffset dx="0.36" dy="-0.36"
                            ></feOffset><feGaussianBlur stdDeviation="0.45"
                            ></feGaussianBlur><feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            ></feComposite><feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.611765 0 0 0 0 0.603922 0 0 0 0 0.596078 0 0 0 1 0"
                            ></feColorMatrix><feBlend
                                mode="normal"
                                in2="shape"
                                result="effect1_innerShadow_6668_3196"
                            ></feBlend><feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            ></feColorMatrix><feOffset dx="-0.36" dy="-0.36"
                            ></feOffset><feGaussianBlur stdDeviation="0.45"
                            ></feGaussianBlur><feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            ></feComposite><feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.635294 0 0 0 0 0.611765 0 0 0 0 0.607843 0 0 0 1 0"
                            ></feColorMatrix><feBlend
                                mode="normal"
                                in2="effect1_innerShadow_6668_3196"
                                result="effect2_innerShadow_6668_3196"
                            ></feBlend></filter
                        ><filter
                            id="filter9_ii_6668_3196"
                            x="13.9317"
                            y="13.7226"
                            width="4.7717"
                            height="8.75568"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                            ><feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                            ></feFlood><feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            ></feBlend><feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            ></feColorMatrix><feOffset dx="0.18" dy="-0.18"
                            ></feOffset><feGaussianBlur stdDeviation="0.3"
                            ></feGaussianBlur><feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            ></feComposite><feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.729412 0 0 0 0 0.678431 0 0 0 0 0.686275 0 0 0 1 0"
                            ></feColorMatrix><feBlend
                                mode="normal"
                                in2="shape"
                                result="effect1_innerShadow_6668_3196"
                            ></feBlend><feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            ></feColorMatrix><feOffset dx="-0.6"
                            ></feOffset><feGaussianBlur stdDeviation="0.45"
                            ></feGaussianBlur><feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                            ></feComposite><feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.964706 0 0 0 0 0.964706 0 0 0 0 0.956863 0 0 0 1 0"
                            ></feColorMatrix><feBlend
                                mode="normal"
                                in2="effect1_innerShadow_6668_3196"
                                result="effect2_innerShadow_6668_3196"
                            ></feBlend></filter
                        ><radialGradient
                            id="paint0_radial_6668_3196"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(2.9747 5.57807) scale(5.84428 1.03399)"
                            ><stop stop-color="#E3E1E1"></stop><stop
                                offset="1"
                                stop-color="#E3E1E1"
                                stop-opacity="0"
                            ></stop></radialGradient
                        ><linearGradient
                            id="paint1_linear_6668_3196"
                            x1="18.6047"
                            y1="23.8229"
                            x2="4.11054"
                            y2="23.8229"
                            gradientUnits="userSpaceOnUse"
                            ><stop stop-color="#12724A"></stop><stop
                                offset="1"
                                stop-color="#116245"
                            ></stop></linearGradient
                        ><linearGradient
                            id="paint2_linear_6668_3196"
                            x1="19.6529"
                            y1="23.3169"
                            x2="18.1168"
                            y2="23.3169"
                            gradientUnits="userSpaceOnUse"
                            ><stop stop-color="#1C8F60"></stop><stop
                                offset="1"
                                stop-color="#1C8F60"
                                stop-opacity="0"
                            ></stop></linearGradient
                        ><linearGradient
                            id="paint3_linear_6668_3196"
                            x1="3.55029"
                            y1="23.2446"
                            x2="5.14068"
                            y2="23.2446"
                            gradientUnits="userSpaceOnUse"
                            ><stop offset="0.556818" stop-color="#195840"
                            ></stop><stop
                                offset="1"
                                stop-color="#195840"
                                stop-opacity="0"
                            ></stop></linearGradient
                        ><radialGradient
                            id="paint4_radial_6668_3196"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(11.0318 23.176) rotate(159.806) scale(3.07255 2.91529)"
                            ><stop offset="0.306788" stop-color="#0E593C"
                            ></stop><stop
                                offset="1"
                                stop-color="#0E593C"
                                stop-opacity="0"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint5_radial_6668_3196"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(10.3357 23.8058) rotate(-176.751) scale(3.80128 0.806065)"
                            ><stop offset="0.396008" stop-color="#0F4F35"
                            ></stop><stop
                                offset="1"
                                stop-color="#0F4F35"
                                stop-opacity="0"
                            ></stop></radialGradient
                        ><radialGradient
                            id="paint6_radial_6668_3196"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(2.43298 12.901) rotate(48.2593) scale(11.2383 14.7375)"
                            ><stop stop-color="#31DE74"></stop><stop
                                offset="1"
                                stop-color="#20CF5E"
                            ></stop></radialGradient
                        ><linearGradient
                            id="paint7_linear_6668_3196"
                            x1="12.4128"
                            y1="3.55927"
                            x2="11.1604"
                            y2="16.8241"
                            gradientUnits="userSpaceOnUse"
                            ><stop stop-color="#24A35B"></stop><stop
                                offset="1"
                                stop-color="#27A05A"
                            ></stop></linearGradient
                        ><linearGradient
                            id="paint8_linear_6668_3196"
                            x1="12.6071"
                            y1="8.84777"
                            x2="13.6372"
                            y2="8.84777"
                            gradientUnits="userSpaceOnUse"
                            ><stop offset="0.22807" stop-color="#269553"
                            ></stop><stop
                                offset="1"
                                stop-color="#269553"
                                stop-opacity="0"
                            ></stop></linearGradient
                        ><radialGradient
                            id="paint9_radial_6668_3196"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(13.4926 8.93813) rotate(-40.8023) scale(2.79336 2.74561)"
                            ><stop
                                offset="0.587108"
                                stop-color="#249755"
                                stop-opacity="0"
                            ></stop><stop offset="0.986856" stop-color="#16793D"
                            ></stop></radialGradient
                        ><linearGradient
                            id="paint10_linear_6668_3196"
                            x1="8.65546"
                            y1="8.13387"
                            x2="8.65546"
                            y2="18.1461"
                            gradientUnits="userSpaceOnUse"
                            ><stop stop-color="#FFD425"></stop><stop
                                offset="1"
                                stop-color="#FFAD24"
                            ></stop></linearGradient
                        ><linearGradient
                            id="paint11_linear_6668_3196"
                            x1="9.26993"
                            y1="19.8268"
                            x2="9.26993"
                            y2="17.6039"
                            gradientUnits="userSpaceOnUse"
                            ><stop offset="0.893939" stop-color="#CC8139"
                            ></stop><stop
                                offset="1"
                                stop-color="#CC8139"
                                stop-opacity="0"
                            ></stop></linearGradient
                        ><linearGradient
                            id="paint12_linear_6668_3196"
                            x1="7.17794"
                            y1="11.3943"
                            x2="10.8855"
                            y2="15.1019"
                            gradientUnits="userSpaceOnUse"
                            ><stop stop-color="#EFEAEA"></stop><stop
                                offset="1"
                                stop-color="#EAE3E3"
                            ></stop></linearGradient
                        ></defs
                    ></svg
                >{$_('g-earn')}</div>
            <div class="_829ba225">
                {#each earnTasks as task}
                <TaskCard {...task} />
                {/each}
            </div>
        </section>
    </div>
