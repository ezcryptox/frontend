<script>
    export let style = ''
    export let className = ''
    export let label = ''
    export let tooltip = ''
    export let checked = false
    export let onCheckedChanged = (checked)=> {}
</script>
<div class="a8d68229 ${className?className:''}" style={style ? style : ''}>
    <label  class="_24fd45b5 _5c2e6257" >
        <input  type="checkbox" on:change={(e)=> {
            if(e===null || e.target===null) return;
            onCheckedChanged(e.target.checked)
        }} bind:checked={checked} /><i>
            <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={checked ? '' : 'display: none;'}
                ><path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 0H0V12H12V0ZM5.53217 9.093L10.0606 3.9985L8.9395 3.00195L5.46794 6.90745L3.53039 4.9699L2.46973 6.03056L5.53217 9.093Z"
                    fill="#131316"
                ></path></svg
            ></i>
            <span data-tip={tooltip}  class="{tooltip?'el-tooltip tips-text focusing tooltip tooltip-overlay':'_24fd45b5 _5c2e6257'}">{label}</span></label
    >
</div>