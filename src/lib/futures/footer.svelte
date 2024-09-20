<script>
	import Positions from "./trade-displays/positions.svelte";


</script>
<div class="bcf9dc03 e62681cd flex-1 h-0">
    <div class="flex-column h-1">
        <div class="e142a74a">
            <div class="c9dcf876">
                <ul id="js-driver-myorder-nav" class="ee412c01">
                    <!---->
                    <li class="b7bf1d08"><span>Positions <!----></span></li>
                    <li class=""><span>Open Orders <!----></span></li>
                    <li class=""><span>Order History</span></li>
                    <li class=""><span>Trade History</span></li>
                    <li class=""><span>Closed Positions PNL</span></li>
                    <li class=""><span>Transaction Record</span></li>
                    <li class=""><span>Position History</span></li>
                </ul>
            </div>
            <div class="a7d6a910">
                <label class="el-checkbox is-disabled">
                    <span class="el-checkbox__input is-disabled">
                        <input class="el-checkbox__original" type="checkbox" aria-hidden="false" disabled="" value="false">
                        <span class="el-checkbox__inner"></span>
                    </span>
                    <span class="el-checkbox__label">Hide Other Symbol<!--v-if--></span>
                </label>
            </div>
        </div>
        <Positions />
    </div>
</div>