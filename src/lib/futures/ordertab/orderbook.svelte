<script>
	import AskPrice from "./ask-price.svelte";
	import Price from "./price.svelte";


</script>

<div class="e4fc3f26 flex-space-between flex-1 h-0">
    <div class="cec2b3b6 e62681cd">
        <div class="f632e7cd flex-column">
            <div class="edcb3351 flex-space-between">
                <ul class="f72a9c3b">
                    <li class="fc6cde42">
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                    </li>
                    <li class="cf1eccfe">
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                    </li>
                    <li class="e603599a a2b4a58f">
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                    </li>
                </ul>
                <div class="ffe5a84f">
                    <div class="a736caf8" type="button">
                        <div class="el-dropdown">
                            <span class="c43dab78 el-tooltip__trigger el-tooltip__trigger" id="el-id-3671-12" role="button" tabindex="0" aria-controls="el-id-3671-13" aria-expanded="false" aria-haspopup="menu">
                                <span>0.00001</span>
                                <svg class="svgicon ae68dd92" width="12px" height="12px" x="0" y="0" viewBox="0 0 32 32" style="transform: rotate(0deg);"><g>
                                    <path d="M29.604 10.528 17.531 23.356a2.102 2.102 0 0 1-3.062 0L2.396 10.528c-.907-.964-.224-2.546 1.1-2.546h25.008c1.324 0 2.007 1.582 1.1 2.546z"></path>
                                </g></svg>
                            </span>
                            <!--v-if-->
                        </div>
                    </div>
                </div>
            </div>
            <div class="e96cc2c8 fbaac962">
                <div class="add4c847">Price <span>(USDT)</span></div>
                <div class="b946a8ff">Size <span>(Cont)</span></div>
                <div class="b893d92b">Total <span>(Cont)</span></div>
            </div>
            <div class="c213652d f642df92 flex-1 flex-column h-0">
                
                <AskPrice limit={20} ask={true}/>
                <Price />
                <AskPrice limit={20} ask={false}/>

            </div>
        </div>
    </div>
</div>