(self.webpackChunktradingview=self.webpackChunktradingview||[]).push([[9039],{59142:function(e,t){var o,n,r;n=[t],o=function(e){"use strict";function t(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}Object.defineProperty(e,"__esModule",{value:!0});var o=!1;if("undefined"!=typeof window){var n={get passive(){o=!0}};window.addEventListener("testPassive",null,n),window.removeEventListener("testPassive",null,n)}var r="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&/iP(ad|hone|od)/.test(window.navigator.platform),i=[],l=!1,s=-1,a=void 0,c=void 0,u=function(e){return i.some((function(t){return!(!t.options.allowTouchMove||!t.options.allowTouchMove(e))}))},d=function(e){var t=e||window.event;return!!u(t.target)||1<t.touches.length||(t.preventDefault&&t.preventDefault(),!1)},p=function(){setTimeout((function(){void 0!==c&&(document.body.style.paddingRight=c,c=void 0),void 0!==a&&(document.body.style.overflow=a,a=void 0)}))};e.disableBodyScroll=function(e,n){if(r){if(!e)return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");if(e&&!i.some((function(t){return t.targetElement===e}))){var p={targetElement:e,options:n||{}};i=[].concat(t(i),[p]),e.ontouchstart=function(e){1===e.targetTouches.length&&(s=e.targetTouches[0].clientY)},e.ontouchmove=function(t){var o,n,r,i;1===t.targetTouches.length&&(n=e,i=(o=t).targetTouches[0].clientY-s,!u(o.target)&&(n&&0===n.scrollTop&&0<i||(r=n)&&r.scrollHeight-r.scrollTop<=r.clientHeight&&i<0?d(o):o.stopPropagation()))},l||(document.addEventListener("touchmove",d,o?{passive:!1}:void 0),l=!0)}}else{h=n,setTimeout((function(){if(void 0===c){var e=!!h&&!0===h.reserveScrollBarGap,t=window.innerWidth-document.documentElement.clientWidth;e&&0<t&&(c=document.body.style.paddingRight,document.body.style.paddingRight=t+"px")}void 0===a&&(a=document.body.style.overflow,document.body.style.overflow="hidden")}));var m={targetElement:e,options:n||{}};i=[].concat(t(i),[m])}var h},e.clearAllBodyScrollLocks=function(){r?(i.forEach((function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null})),l&&(document.removeEventListener("touchmove",d,o?{passive:!1}:void 0),l=!1),i=[],s=-1):(p(),i=[])},e.enableBodyScroll=function(e){if(r){if(!e)return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");e.ontouchstart=null,e.ontouchmove=null,i=i.filter((function(t){return t.targetElement!==e})),l&&0===i.length&&(document.removeEventListener("touchmove",d,o?{passive:!1}:void 0),l=!1)}else 1===i.length&&i[0].targetElement===e?(p(),i=[]):i=i.filter((function(t){return t.targetElement!==e}))}},void 0===(r="function"==typeof o?o.apply(t,n):o)||(e.exports=r)},62978:e=>{e.exports={primary:"primary-PVWoXu5j",gray:"gray-PVWoXu5j",selected:"selected-PVWoXu5j",grouped:"grouped-PVWoXu5j",pills:"pills-PVWoXu5j",active:"active-PVWoXu5j",
disableActiveOnTouch:"disableActiveOnTouch-PVWoXu5j",disableActiveStateStyles:"disableActiveStateStyles-PVWoXu5j",withGrouped:"withGrouped-PVWoXu5j","quiet-primary":"quiet-primary-PVWoXu5j",green:"green-PVWoXu5j",red:"red-PVWoXu5j",secondary:"secondary-PVWoXu5j",ghost:"ghost-PVWoXu5j"}},29075:e=>{e.exports={lightButton:"lightButton-bYDQcOkp",link:"link-bYDQcOkp",ltr:"ltr-bYDQcOkp",rtl:"rtl-bYDQcOkp","typography-regular16px":"typography-regular16px-bYDQcOkp","typography-medium16px":"typography-medium16px-bYDQcOkp","typography-regular14px":"typography-regular14px-bYDQcOkp","typography-semibold14px":"typography-semibold14px-bYDQcOkp","typography-semibold16px":"typography-semibold16px-bYDQcOkp",content:"content-bYDQcOkp",visuallyHidden:"visuallyHidden-bYDQcOkp",nowrap:"nowrap-bYDQcOkp",ellipsisContainer:"ellipsisContainer-bYDQcOkp",textWrapContainer:"textWrapContainer-bYDQcOkp",textWrapWithEllipsis:"textWrapWithEllipsis-bYDQcOkp",slot:"slot-bYDQcOkp",caret:"caret-bYDQcOkp",activeCaret:"activeCaret-bYDQcOkp",xsmall:"xsmall-bYDQcOkp",withStartSlot:"withStartSlot-bYDQcOkp",withEndSlot:"withEndSlot-bYDQcOkp",noContent:"noContent-bYDQcOkp",wrap:"wrap-bYDQcOkp",small:"small-bYDQcOkp",medium:"medium-bYDQcOkp"}},69658:e=>{e.exports={"default-drawer-min-top-distance":"100px",wrap:"wrap-_HnK0UIN",positionBottom:"positionBottom-_HnK0UIN",backdrop:"backdrop-_HnK0UIN",drawer:"drawer-_HnK0UIN",positionLeft:"positionLeft-_HnK0UIN"}},27011:(e,t,o)=>{"use strict";function n(e,t){return t||null==e||("string"==typeof e||Array.isArray(e))&&0===e.length}o.d(t,{isIconOnly:()=>n})},9038:(e,t,o)=>{"use strict";o.d(t,{useLightButtonClasses:()=>c});var n=o(50959),r=o(97754),i=o(17946),l=o(27011),s=o(86332);const a=n.createContext({isInButtonGroup:!1,isGroupPrimary:!1}),c=(e,t,o)=>{const c=(0,n.useContext)(i.CustomBehaviourContext),{className:u,isSelected:d,children:p,showCaret:m,forceDirection:h,iconOnly:v,color:f="gray",variant:g="primary",size:y="medium",enableActiveStateStyles:w=c.enableActiveStateStyles,typography:b,isLink:x=!1,textWrap:C,isPills:E,isActive:S,startSlot:k,endSlot:T}=t,O=e[`typography-${((e,t,o)=>{if(o){const e=o.replace(/^\D+/g,"");return t?`semibold${e}`:o}switch(e){case"xsmall":return t?"semibold14px":"regular14px";case"small":case"medium":return t?"semibold16px":"regular16px";default:return""}})(y,d||E,b||void 0)}`],_=(0,n.useContext)(s.ControlGroupContext),{isInButtonGroup:B,isGroupPrimary:N}=(0,n.useContext)(a);return r(u,e.lightButton,x&&e.link,S&&e.active,d&&e.selected,(0,l.isIconOnly)(p,v)&&e.noContent,!!k&&e.withStartSlot,(m||!!T)&&e.withEndSlot,o&&e.withGrouped,h&&e[h],e[N?"primary":g],e[N?"gray":f],e[y],O,!w&&e.disableActiveStateStyles,_.isGrouped&&e.grouped,C&&e.wrap,B&&e.disableActiveOnTouch,E&&e.pills)}},66860:(e,t,o)=>{"use strict";o.d(t,{LightButtonContent:()=>d});var n=o(50959),r=o(97754),i=o(34094),l=o(27011),s=o(9745),a=o(2948),c=o(29075),u=o.n(c);function d(e){const{showCaret:t,iconOnly:o,ellipsis:c=!0,textWrap:d,tooltipText:p,children:m,endSlot:h,startSlot:v,isActiveCaret:f}=e;[h,t].filter((e=>!!e))
;return n.createElement(n.Fragment,null,v&&n.createElement("span",{className:r(u().slot,u().startSlot)},v),!(0,l.isIconOnly)(m,o)&&n.createElement("span",{className:r(u().content,!d&&u().nowrap,"apply-overflow-tooltip","apply-overflow-tooltip--check-children-recursively","apply-overflow-tooltip--allow-text"),"data-overflow-tooltip-text":null!=p?p:(0,i.getTextForTooltip)(m)},d||c?n.createElement(n.Fragment,null,n.createElement("span",{className:r(!d&&c&&u().ellipsisContainer,d&&u().textWrapContainer,d&&c&&u().textWrapWithEllipsis)},m),n.createElement("span",{className:u().visuallyHidden,"aria-hidden":!0},m)):n.createElement(n.Fragment,null,m,n.createElement("span",{className:u().visuallyHidden,"aria-hidden":!0},m))),h&&n.createElement("span",{className:r(u().slot,u().endSlot)},h),t&&(e=>n.createElement(s.Icon,{className:r(u().caret,e&&u().activeCaret),icon:a}))(f))}},15893:(e,t,o)=>{"use strict";o.d(t,{LightButton:()=>d});var n=o(50959),r=o(86332),i=o(9038),l=o(66860),s=o(29075),a=o.n(s),c=o(62978),u=o.n(c);function d(e){const{isGrouped:t}=n.useContext(r.ControlGroupContext),{reference:o,className:s,isSelected:c,children:d,iconOnly:p,ellipsis:m,showCaret:h,forceDirection:v,endSlot:f,startSlot:g,color:y,variant:w,size:b,enableActiveStateStyles:x,typography:C,textWrap:E=!1,maxLines:S,style:k={},isPills:T,isActive:O,tooltipText:_,role:B,...N}=e,W=E?null!=S?S:2:1,D=W>0?{...k,"--ui-lib-light-button-content-max-lines":W}:k;return n.createElement("button",{...N,className:(0,i.useLightButtonClasses)({...u(),...a()},{className:s,isSelected:c,children:d,iconOnly:p,showCaret:h,forceDirection:v,endSlot:f,startSlot:g,color:y,variant:w,size:b,enableActiveStateStyles:x,typography:C,textWrap:E,isPills:T,isActive:O},t),ref:o,style:D,role:B},n.createElement(l.LightButtonContent,{showCaret:h,isActiveCaret:h&&(T||O||c),iconOnly:p,ellipsis:m,textWrap:E,tooltipText:_,endSlot:f,startSlot:g},d))}},86332:(e,t,o)=>{"use strict";o.d(t,{ControlGroupContext:()=>n});const n=o(50959).createContext({isGrouped:!1,cellState:{isTop:!0,isRight:!0,isBottom:!0,isLeft:!0}})},17946:(e,t,o)=>{"use strict";o.d(t,{CustomBehaviourContext:()=>n});const n=(0,o(50959).createContext)({enableActiveStateStyles:!0});n.displayName="CustomBehaviourContext"},43010:(e,t,o)=>{"use strict";o.d(t,{useIsomorphicLayoutEffect:()=>r});var n=o(50959);function r(e,t){("undefined"==typeof window?n.useEffect:n.useLayoutEffect)(e,t)}},27267:(e,t,o)=>{"use strict";function n(e,t,o,n,r){function i(r){if(e>r.timeStamp)return;const i=r.target;void 0!==o&&null!==t&&null!==i&&i.ownerDocument===n&&(t.contains(i)||o(r))}return r.click&&n.addEventListener("click",i,!1),r.mouseDown&&n.addEventListener("mousedown",i,!1),r.touchEnd&&n.addEventListener("touchend",i,!1),r.touchStart&&n.addEventListener("touchstart",i,!1),()=>{n.removeEventListener("click",i,!1),n.removeEventListener("mousedown",i,!1),n.removeEventListener("touchend",i,!1),n.removeEventListener("touchstart",i,!1)}}o.d(t,{addOutsideEventListener:()=>n})},36383:(e,t,o)=>{"use strict";o.d(t,{useOutsideEvent:()=>l})
;var n=o(50959),r=o(43010),i=o(27267);function l(e){const{click:t,mouseDown:o,touchEnd:l,touchStart:s,handler:a,reference:c}=e,u=(0,n.useRef)(null),d=(0,n.useRef)("undefined"==typeof window?0:new window.CustomEvent("timestamp").timeStamp);return(0,r.useIsomorphicLayoutEffect)((()=>{const e={click:t,mouseDown:o,touchEnd:l,touchStart:s},n=c?c.current:u.current;return(0,i.addOutsideEventListener)(d.current,n,a,document,e)}),[t,o,l,s,a]),c||u}},9745:(e,t,o)=>{"use strict";o.d(t,{Icon:()=>r});var n=o(50959);const r=n.forwardRef(((e,t)=>{const{icon:o="",title:r,ariaLabel:i,ariaLabelledby:l,ariaHidden:s,...a}=e,c=!!(r||i||l);return n.createElement("span",{...a,ref:t,role:"img","aria-label":i,"aria-labelledby":l,"aria-hidden":s||!c,title:r,dangerouslySetInnerHTML:{__html:o}})}))},99663:(e,t,o)=>{"use strict";o.d(t,{Slot:()=>r,SlotContext:()=>i});var n=o(50959);class r extends n.Component{shouldComponentUpdate(){return!1}render(){return n.createElement("div",{style:{position:"fixed",zIndex:150,left:0,top:0},ref:this.props.reference})}}const i=n.createContext(null)},34094:(e,t,o)=>{"use strict";o.d(t,{getTextForTooltip:()=>l});var n=o(50959);const r=e=>(0,n.isValidElement)(e)&&Boolean(e.props.children),i=e=>null==e||"boolean"==typeof e||"{}"===JSON.stringify(e)?"":e.toString()+" ",l=e=>Array.isArray(e)||(0,n.isValidElement)(e)?n.Children.toArray(e).reduce(((e,t)=>{let o="";return o=(0,n.isValidElement)(t)&&r(t)?l(t.props.children):(0,n.isValidElement)(t)&&!r(t)?"":i(t),e.concat(o)}),"").trim():i(e)},67961:(e,t,o)=>{"use strict";o.d(t,{OverlapManager:()=>i,getRootOverlapManager:()=>s});var n=o(50151);class r{constructor(){this._storage=[]}add(e){this._storage.push(e)}remove(e){this._storage=this._storage.filter((t=>e!==t))}has(e){return this._storage.includes(e)}getItems(){return this._storage}}class i{constructor(e=document){this._storage=new r,this._windows=new Map,this._index=0,this._document=e,this._container=e.createDocumentFragment()}setContainer(e){const t=this._container,o=null===e?this._document.createDocumentFragment():e;!function(e,t){Array.from(e.childNodes).forEach((e=>{e.nodeType===Node.ELEMENT_NODE&&t.appendChild(e)}))}(t,o),this._container=o}registerWindow(e){this._storage.has(e)||this._storage.add(e)}ensureWindow(e,t={position:"fixed",direction:"normal"}){const o=this._windows.get(e);if(void 0!==o)return o;this.registerWindow(e);const n=this._document.createElement("div");if(n.style.position=t.position,n.style.zIndex=this._index.toString(),n.dataset.id=e,void 0!==t.index){const e=this._container.childNodes.length;if(t.index>=e)this._container.appendChild(n);else if(t.index<=0)this._container.insertBefore(n,this._container.firstChild);else{const e=this._container.childNodes[t.index];this._container.insertBefore(n,e)}}else"reverse"===t.direction?this._container.insertBefore(n,this._container.firstChild):this._container.appendChild(n);return this._windows.set(e,n),++this._index,n}unregisterWindow(e){this._storage.remove(e);const t=this._windows.get(e)
;void 0!==t&&(null!==t.parentElement&&t.parentElement.removeChild(t),this._windows.delete(e))}getZindex(e){const t=this.ensureWindow(e);return parseInt(t.style.zIndex||"0")}moveToTop(e){if(this.getZindex(e)!==this._index){const t=this.ensureWindow(e);this._windows.forEach(((e,o)=>{e.hasAttribute("data-focus-trap")&&e.setAttribute("data-focus-trap",e===t?"true":"false")})),t.style.zIndex=(++this._index).toString()}}removeWindow(e){this.unregisterWindow(e)}}const l=new WeakMap;function s(e=document){const t=e.getElementById("overlap-manager-root");if(null!==t)return(0,n.ensureDefined)(l.get(t));{const t=new i(e),o=function(e){const t=e.createElement("div");return t.style.position="absolute",t.style.zIndex=150..toString(),t.style.top="0px",t.style.left="0px",t.id="overlap-manager-root",t}(e);return l.set(o,t),t.setContainer(o),e.body.appendChild(o),t}}var a;!function(e){e[e.BaseZindex=150]="BaseZindex"}(a||(a={}))},99054:(e,t,o)=>{"use strict";o.d(t,{setFixedBodyState:()=>c});const n=(()=>{let e;return()=>{var t;if(void 0===e){const o=document.createElement("div"),n=o.style;n.visibility="hidden",n.width="100px",n.msOverflowStyle="scrollbar",document.body.appendChild(o);const r=o.offsetWidth;o.style.overflow="scroll";const i=document.createElement("div");i.style.width="100%",o.appendChild(i);const l=i.offsetWidth;null===(t=o.parentNode)||void 0===t||t.removeChild(o),e=r-l}return e}})();function r(e,t,o){null!==e&&e.style.setProperty(t,o)}function i(e,t){return getComputedStyle(e,null).getPropertyValue(t)}function l(e,t){return parseInt(i(e,t))}let s=0,a=!1;function c(e){const{body:t}=document,o=t.querySelector(".widgetbar-wrap");if(e&&1==++s){const e=i(t,"overflow"),s=l(t,"padding-right");"hidden"!==e.toLowerCase()&&t.scrollHeight>t.offsetHeight&&(r(o,"right",`${n()}px`),t.style.paddingRight=`${s+n()}px`,a=!0),t.classList.add("i-no-scroll")}else if(!e&&s>0&&0==--s&&(t.classList.remove("i-no-scroll"),a)){r(o,"right","0px");let e=0;0,t.scrollHeight<=t.clientHeight&&(e-=n()),t.style.paddingRight=(e<0?0:e)+"px",a=!1}}},37558:(e,t,o)=>{"use strict";o.d(t,{DrawerContext:()=>l,DrawerManager:()=>i});var n=o(50959),r=o(99054);class i extends n.PureComponent{constructor(e){super(e),this._isBodyFixed=!1,this._addDrawer=e=>{this.setState((t=>({stack:[...t.stack,e]})))},this._removeDrawer=e=>{this.setState((t=>({stack:t.stack.filter((t=>t!==e))})))},this.state={stack:[]}}componentDidUpdate(e,t){!t.stack.length&&this.state.stack.length&&((0,r.setFixedBodyState)(!0),this._isBodyFixed=!0),t.stack.length&&!this.state.stack.length&&this._isBodyFixed&&((0,r.setFixedBodyState)(!1),this._isBodyFixed=!1)}componentWillUnmount(){this.state.stack.length&&this._isBodyFixed&&(0,r.setFixedBodyState)(!1)}render(){return n.createElement(l.Provider,{value:{addDrawer:this._addDrawer,removeDrawer:this._removeDrawer,currentDrawer:this.state.stack.length?this.state.stack[this.state.stack.length-1]:null}},this.props.children)}}const l=n.createContext(null)},41590:(e,t,o)=>{"use strict";o.d(t,{Drawer:()=>m})
;var n=o(50959),r=o(50151),i=o(97754),l=o(92184),s=o(42842),a=o(37558),c=o(29197),u=o(86656),d=o(69658);var p;function m(e){const{position:t="Bottom",onClose:o,children:u,reference:p,className:m,theme:v=d}=e,f=(0,r.ensureNotNull)((0,n.useContext)(a.DrawerContext)),[g]=(0,n.useState)((()=>(0,l.randomHash)())),y=(0,n.useRef)(null),w=(0,n.useContext)(c.CloseDelegateContext);return(0,n.useLayoutEffect)((()=>((0,r.ensureNotNull)(y.current).focus({preventScroll:!0}),w.subscribe(f,o),f.addDrawer(g),()=>{f.removeDrawer(g),w.unsubscribe(f,o)})),[]),n.createElement(s.Portal,null,n.createElement("div",{ref:p,className:i(d.wrap,d[`position${t}`])},g===f.currentDrawer&&n.createElement("div",{className:d.backdrop,onClick:o}),n.createElement(h,{className:i(v.drawer,d[`position${t}`],m),ref:y,"data-name":e["data-name"]},u)))}!function(e){e.Left="Left",e.Bottom="Bottom"}(p||(p={}));const h=(0,n.forwardRef)(((e,t)=>{const{className:o,...r}=e;return n.createElement(u.TouchScrollContainer,{className:i(d.drawer,o),tabIndex:-1,ref:t,...r})}))},42842:(e,t,o)=>{"use strict";o.d(t,{Portal:()=>a,PortalContext:()=>c});var n=o(50959),r=o(32227),i=o(25931),l=o(67961),s=o(99663);class a extends n.PureComponent{constructor(){super(...arguments),this._uuid=(0,i.nanoid)()}componentWillUnmount(){this._manager().removeWindow(this._uuid)}render(){const e=this._manager().ensureWindow(this._uuid,this.props.layerOptions);e.style.top=this.props.top||"",e.style.bottom=this.props.bottom||"",e.style.left=this.props.left||"",e.style.right=this.props.right||"",e.style.pointerEvents=this.props.pointerEvents||"";const t=this.props.className;return t&&("string"==typeof t?e.classList.add(t):e.classList.add(...t)),this.props.shouldTrapFocus&&!e.hasAttribute("data-focus-trap")&&e.setAttribute("data-focus-trap","true"),this.props["aria-hidden"]&&e.setAttribute("aria-hidden","true"),r.createPortal(n.createElement(c.Provider,{value:this},this.props.children),e)}moveToTop(){this._manager().moveToTop(this._uuid)}_manager(){return null===this.context?(0,l.getRootOverlapManager)():this.context}}a.contextType=s.SlotContext;const c=n.createContext(null)},86656:(e,t,o)=>{"use strict";o.d(t,{TouchScrollContainer:()=>c});var n=o(50959),r=o(59142),i=o(50151),l=o(49483);const s=CSS.supports("overscroll-behavior","none");let a=0;const c=(0,n.forwardRef)(((e,t)=>{const{children:o,...i}=e,c=(0,n.useRef)(null);return(0,n.useImperativeHandle)(t,(()=>c.current)),(0,n.useLayoutEffect)((()=>{if(l.CheckMobile.iOS())return a++,null!==c.current&&(s?1===a&&(document.body.style.overscrollBehavior="none"):(0,r.disableBodyScroll)(c.current,{allowTouchMove:u(c)})),()=>{a--,null!==c.current&&(s?0===a&&(document.body.style.overscrollBehavior=""):(0,r.enableBodyScroll)(c.current))}}),[]),n.createElement("div",{ref:c,...i},o)}));function u(e){return t=>{const o=(0,i.ensureNotNull)(e.current),n=document.activeElement;return!o.contains(t)||null!==n&&o.contains(n)&&n.contains(t)}}},40173:(e,t,o)=>{"use strict";function n(e,t,o={}){return Object.assign({},e,function(e,t,o={}){const n=Object.assign({},t)
;for(const r of Object.keys(t)){const i=o[r]||r;i in e&&(n[r]=[e[i],t[r]].join(" "))}return n}(e,t,o))}o.d(t,{mergeThemes:()=>n})},58101:e=>{e.exports={drawer:"drawer-xBKhVqal",drawerItem:"drawerItem-xBKhVqal",menuWrap:"menuWrap-xBKhVqal",scrollWrap:"scrollWrap-xBKhVqal",menuBox:"menuBox-xBKhVqal",card:"card-xBKhVqal",cardRow:"cardRow-xBKhVqal",mini:"mini-xBKhVqal",fadeTop:"fadeTop-xBKhVqal",fadeBottom:"fadeBottom-xBKhVqal"}},9532:e=>{e.exports={lollipopTooltipTitle:"lollipopTooltipTitle-hkWvPxQc",lollipopTooltipTitle_minimal:"lollipopTooltipTitle_minimal-hkWvPxQc",lollipopTooltipTitle__title:"lollipopTooltipTitle__title-hkWvPxQc",lollipopTooltipTitle_mobile:"lollipopTooltipTitle_mobile-hkWvPxQc",lollipopTooltipTitle__icon:"lollipopTooltipTitle__icon-hkWvPxQc"}},58527:e=>{e.exports={wrap:"wrap-tm3FiOQl",content:"content-tm3FiOQl",contentWithTab:"contentWithTab-tm3FiOQl",group:"group-tm3FiOQl",subtitle:"subtitle-tm3FiOQl",text:"text-tm3FiOQl",tabsWrapper:"tabsWrapper-tm3FiOQl",tabsContentWrapper:"tabsContentWrapper-tm3FiOQl",groupIcon:"groupIcon-tm3FiOQl",beforeMarketOpen:"beforeMarketOpen-tm3FiOQl",afterMarketClose:"afterMarketClose-tm3FiOQl",groupTitle:"groupTitle-tm3FiOQl",groupRow:"groupRow-tm3FiOQl",groupCell:"groupCell-tm3FiOQl",mob:"mob-tm3FiOQl",mini:"mini-tm3FiOQl",generalContent:"generalContent-tm3FiOQl"}},184:(e,t,o)=>{"use strict";o.r(t),o.d(t,{showLollipopTooltip:()=>P});var n=o(50959),r=o(32227),i=o(50151),l=o(97754),s=o.n(l);function a(e,t,o){(0,n.useEffect)((()=>{const n=new IntersectionObserver((e=>{e[e.length-1].intersectionRatio<.25?o():t()}),{threshold:[0,.25,.5,.75,1],root:null,rootMargin:"0px"});return e.current&&n.observe(e.current),()=>n.disconnect()}),[])}var c=o(90692),u=o(41590),d=o(37558),p=o(20520),m=o(59064),h=o(68335),v=o(37265);const f=(0,n.forwardRef)(((e,t)=>{const{onClose:o,onForceClose:r,onClickOutside:i,className:l,...s}=e,a=(0,n.useRef)(null);(0,n.useEffect)((()=>(m.globalCloseDelegate.subscribe(null,r),()=>{m.globalCloseDelegate.unsubscribe(null,r)})),[r]);const c=(0,n.useCallback)((t=>{var o;null===(o=e.onKeyDown)||void 0===o||o.call(e,t),27===(0,h.hashFromEvent)(t)&&(t.preventDefault(),r())}),[r]),u=(0,n.useCallback)((()=>{a.current&&a.current.focus({preventScroll:!0})}),[]);return n.createElement(p.PopupMenu,{className:l,isOpened:!0,tabIndex:-1,reference:e=>{"function"==typeof t?t(e):(0,v.isObject)(t)&&(t.current=e),a.current=e},onClose:o,onClickOutside:i,onKeyDown:c,onOpen:u,...s},e.children)}));function g(e){(0,n.useEffect)((()=>{return e=y,window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e);var e}),[]),(0,n.useEffect)((()=>{if(e.length)return function(e,t){for(const o of e)o.subscribe(null,t);return()=>{for(const o of e)o.unsubscribe(null,t)}}(e,y)}),e)}function y(){(0,m.globalCloseMenu)()}f.displayName="TooltipPopup";var w=o(40173),b=o(27317),x=o(9745),C=o(9532);function E(e){const{title:t,icon:o,iconStyle:r,className:i,cardType:l,informationButtonProps:a}=e;return n.createElement("div",{
className:s()(C.lollipopTooltipTitle,["mob"===l&&C.lollipopTooltipTitle_mobile,"mini"===l&&C.lollipopTooltipTitle_minimal],i)},o&&n.createElement(x.Icon,{icon:o,className:C.lollipopTooltipTitle__icon,style:r}),n.createElement("span",{className:C.lollipopTooltipTitle__title},t),!1)}var S=o(15893);function k(e){const{text:t,onClick:o}=e;return n.createElement(S.LightButton,{onClick:o,size:"xsmall"}," ",t," ")}var T,O,_=o(58527);function B(e){const{name:t,value:o,style:r,valueStyle:i,onValueClick:l,valueRightIcon:a,className:c}=e;return n.createElement("div",{className:s()(_.groupRow,c),style:r},t&&n.createElement("div",{className:_.groupCell},n.createElement("span",{className:_.text},t)),n.createElement("div",{className:_.groupCell},n.createElement("span",{className:_.text,style:i,onClick:l},o),a&&n.createElement(x.Icon,{icon:a.iconContent,className:s()(_.groupIcon,a.iconClass,"apply-common-tooltip"),title:a.tooltipText})))}function N(e){const{content:t=[],subTitle:o,cardRowClass:r}=e,i=t.map(((e,t)=>{const{title:o,content:r}=e;return n.createElement("div",{key:`group${t}`,className:_.group},o&&n.createElement("span",{className:_.groupTitle},o),r.map(((e,t)=>n.createElement(B,{key:`contentRow${t}`,...e}))))})),l="string"==typeof o?o:o.map(((e,t)=>n.createElement(B,{key:`subTitle${t}`,...e})));return n.createElement("div",{className:r},n.createElement("span",{className:_.subtitle},l),i.length>0&&n.createElement("div",null,i))}!function(e){e[e.BeforeMarketOpen=_.beforeMarketOpen]="BeforeMarketOpen",e[e.AfterMarketClose=_.afterMarketClose]="AfterMarketClose"}(T||(T={})),function(e){e.Mobile="mob",e.Minimal="mini"}(O||(O={}));function W(e){var t,o;const{cardType:r,anchor:i,title:l,tooltipIcon:a,tooltipInformationButtonProps:c,className:u,...d}=e,p=r?s()(_.content,_[r]):_.content,m=(0,n.useMemo)((()=>{var t;return l&&a?{color:null===(t=e.style)||void 0===t?void 0:t.color}:void 0}),[!!l,!!a,null===(t=e.style)||void 0===t?void 0:t.color]);return n.createElement("div",{className:s()(_.wrap,u),style:{borderColor:null===(o=d.style)||void 0===o?void 0:o.color}},n.createElement("div",{className:p},l&&n.createElement(E,{title:l,icon:a,informationButtonProps:c,iconStyle:m,cardType:r}),"common"===d.type&&n.createElement(N,{...d}),i&&("mob"!==r||!i.hideInMobileMode)&&n.createElement("div",{className:_.group},n.createElement(k,{...i}))))}var D=o(58101);const L=(0,w.mergeThemes)(b.DEFAULT_MENU_THEME,{menuWrap:D.menuWrap,menuBox:D.menuBox});function Q(e){const{tooltips:t,onClose:o,onForceClose:r,onClickOutside:i,position:l,customCloseSubscriptions:p=[],showScrollFades:m,cardType:h,doNotCloseOn:v}=e,y=(0,n.useRef)(null),w=(0,n.useRef)(null),b=(0,n.useRef)(null),x=(0,n.useRef)(null),[C,E]=(0,n.useState)("100%"),S=e=>{null!==e&&E(`${e.clientWidth}px`)},[k,T]=(0,n.useState)(!1);a(b,(()=>T(!1)),(()=>T(!0)));const O={display:k?"block":"none",width:C},[_,B]=(0,n.useState)(!1);a(x,(()=>B(!1)),(()=>B(!0)));const N={display:_?"block":"none",width:C};g(p);const Q=h?s()(D.card,D[h]):D.card
;return n.createElement(d.DrawerManager,null,n.createElement(c.MatchMedia,{rule:"screen and (max-width: 419px)"},(e=>e?n.createElement(u.Drawer,{className:D.drawer,onClose:r||o,position:"Bottom"},t.map(((e,t)=>n.createElement(W,{key:`${t}`,className:D.drawerItem,cardType:"mob",...e})))):n.createElement(f,{position:l,theme:L,onClose:o,onForceClose:r||o,onClickOutside:i,doNotCloseOn:v},m&&n.createElement(n.Fragment,null,n.createElement("div",{ref:y,className:D.fadeTop,style:O}),n.createElement("div",{ref:b})),n.createElement("div",{ref:S},t.map(((e,t)=>n.createElement(W,{className:Q,key:`${t}`,cardType:h,...e})))),m&&n.createElement(n.Fragment,null,n.createElement("div",{ref:x}),n.createElement("div",{ref:w,className:D.fadeBottom,style:N}))))))}let F=null;function P(e){if(!e.items.length)return()=>{};const t={tooltips:e.items,onClose:I,onForceClose:()=>{I(),"function"==typeof e.onCustomClose&&e.onCustomClose()},onClickOutside:e.onClickOutside,doNotCloseOn:e.doNotCloseOn,position:M.bind(null,e.position),customCloseSubscriptions:e.customCloseSubscriptions,showScrollFades:e.showScrollFades,cardType:e.cardType};return null===F&&(F=document.createElement("div"),document.body.appendChild(F)),r.render(n.createElement(Q,{...t}),F),I}function I(){null!==F&&(r.unmountComponentAtNode(F),F.remove(),F=null)}function M(e,t){const{contentWidth:o,contentHeight:n}=t,r=e.target,l=r.getBoundingClientRect(),s=l.width-e.targetSize.width,a=l.height-e.targetSize.height,c=(0,i.ensureNotNull)(r.closest(".chart-container")),u=c.getBoundingClientRect(),d=(0,i.ensureNotNull)(c.parentElement).getBoundingClientRect(),p=l.left+e.point.x+s,m=Math.round(p-o/2),h=Math.min(m+o,u.right,d.right);let v,f,g=Math.max(h-o,u.left,d.left);g+o>=d.right&&(g=d.right-o);const y=u.bottom-(l.top+e.point.y+a),w=u.height-y-e.marginTop;return w<n?(f=e.marginTop+u.top,v=Math.max(w,0)):f=u.height+u.top-y-n,{x:g,y:f,overrideHeight:v}}},2948:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path fill="currentColor" d="M3.92 7.83 9 12.29l5.08-4.46-1-1.13L9 10.29l-4.09-3.6-.99 1.14Z"/></svg>'},25931:(e,t,o)=>{"use strict";o.d(t,{nanoid:()=>n});let n=(e=21)=>crypto.getRandomValues(new Uint8Array(e)).reduce(((e,t)=>e+=(t&=63)<36?t.toString(36):t<62?(t-26).toString(36).toUpperCase():t>62?"-":"_"),"")}}]);