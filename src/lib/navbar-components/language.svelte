<script>
	import { _, locale } from 'svelte-i18n';
    import "../../styles/language.css";
    export let showLanguageModal = false
    $: selectedTab = 0;
    $: selectedTabItem = 0;

    export let onSelectedLang = (lang) => {};
    const language = [
        { name: "English", locale: "en" },
        { name: "中文（简体）", locale: "zh-CN" },
        { name: "中文（繁体）", locale: "zh-TW" },
        { name: "русский", locale: "ru" },
        { name: "Tiếng Việt", locale: "vi" },
        { name: "Türkçe", locale: "tr" },
        { name: "한국인", locale: "ko" },
        { name: "日本語", locale: "ja" },
        { name: "ภาษาไทย", locale: "th" },
        { name: "Español", locale: "es" },
        { name: "Português (Brasil)", locale: "pt-BR" },
        { name: "Bahasa Indonesia", locale: "id" },
        { name: "हिन्दी", locale: "hi" },
    ];
    $: tabList =
        selectedTab === 0
            ? language.map((lang) => lang.name)
            : [
                  "USD - $",
                  "CNY - ￥",
                  "RUB - ₽",
                  "EUR - €",
                  "JPY - ￥",
                  "KRW - ₩",
                  "INR - ₹",
              ];
  
    const onTabChanged = (index) => {
        selectedTab = index;
        selectedTabItem = 0;
    };
    const onTabItemSelected = (index) => {
        selectedTabItem = index;
        if (selectedTab === 0) {
            const newLocale = language[index].locale
            locale.set(newLocale);
        }
    };

   // @ts-ignore
     $: if ($locale) {
        const index = language.findIndex(lang => lang.locale === $locale);
        selectedTabItem = index !== -1 ? index : 0
        if (onSelectedLang) onSelectedLang(language[index]?.name || 'English')
    }
    
</script>
{#if showLanguageModal}
<div id="uniframe-dialog" data-v-app="">
    <div
        class="vfm vfm--fixed vfm--inset"
        role="dialog"
        aria-modal="true"
        style="z-index: 1000101;"
    >
        <div
            class="vfm__overlay vfm--overlay vfm--absolute vfm--inset vfm--prevent-none uniframe-root"
            aria-hidden="true"
        ></div>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <div
            class="vfm__content vfm--outline-none uniframe-root"
            tabindex={selectedTab}
        >
            <div class="cfb48486">
                <div class="a57f6789">
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <ul>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                        <li
                            class={selectedTab === 0 ? "a51c0809" : ""}
                            on:click={() => onTabChanged(0)}
                        >{$_('global-language')}</li>

                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- <li
                            class={selectedTab === 1 ? "a51c0809" : ""}
                            on:click={() => onTabChanged(1)}
                        >{$_('global-currency')}</li> -->
                    </ul>
                </div>
                <div class="b6cfa543">
                    <ul>
                        {#each tabList as value, index}
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                            <li
                                class={selectedTabItem === index
                                    ? "a51c0809"
                                    : ""}
                                on:click={() => onTabItemSelected(index)}
                            >
                                {value}
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
            <button class="icon-close" on:click
                ><svg fill="currentColor" style="width: 24px; height: 24px;"
                    ><use xlink:href="#uniframe-icon-cross"></use></svg
                ></button
            ><!---->
        </div>
    </div>
</div>
{/if}
