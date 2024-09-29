<script>
    import { futuresTradePairs} from "$lib/store/future.store";
    const handleMarkPrice = ((price)=>{
        if(!price){
            return "---"
        }
       return (parseFloat(price).toFixed(2)).replace(/\d(?=(\d{3})+\.)/g, '$&,');
     })

</script>

<div class="f8581459">
    <div class="a9537268 e295c28d">
        <span>{handleMarkPrice($futuresTradePairs[1]?.mPx)}</span>
        <svg class="svgicon a3334039" aria-hidden="true">
            <use xlink:href="#arrow-down-2"></use>
        </svg>
    </div>
    <div class="c5d35a84">
        <span class="el-only-child__content el-tooltip__trigger el-tooltip__trigger">Mark Price: {handleMarkPrice($futuresTradePairs[1]?.mPx)} </span>
    </div>
</div>