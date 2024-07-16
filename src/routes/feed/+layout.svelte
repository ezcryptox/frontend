<script>
     import "../../styles/feed/news.css"; 
     import "../../styles/feed/in-depth.css";
    import "../../styles/feed/flash.css";
    import Footer from "$lib/footer.svelte";
    import { browser } from '$app/environment'
    import { page } from "$app/stores";

    import { onMount } from "svelte";
    if (browser) {
        document.documentElement.setAttribute("data-entry", "feed");
    }
    onMount(() => {
        const targetElement = document.querySelector(".C7jTF");
        const handleScroll = () => {
            const scrollPercentage =
                (window.scrollY /
                    (document.documentElement.scrollHeight -
                        window.innerHeight)) *
                100;
            if (scrollPercentage > 20) {
                targetElement.classList.add("kk8JU");
            } else {
                targetElement.classList.remove("kk8JU");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });
    let tabItem = [
        { href: "/feed/news/1", text: "News" },
        { href: "/feed/news/2", text: "Articles" },
    ];
    let newsType = [
        { href: "/feed/news/1/-1", text: "7*24" },
        { href: "/feed/news/1/33", text: "Hot topic" },
        { href: "/feed/news/1/-2", text: "Market" },
        { href: "/feed/news/1/27", text: "Activities" },
    ];
</script>

<div id="root" data-v-app="">
    <div class="qylDb">
        {#if !$page.url.pathname.includes("/feed/article")}
            <div class="OFn6O">
                {#each tabItem as link, index}
                    <a
                        href={link.href}
                        class="tngut {$page.url.pathname === link.href ||
                        (newsType.some(
                            (news) => news.href === $page.url.pathname,
                        ) &&
                            index === 0)
                            ? 'hy-hw'
                            : ''}">{link.text}</a
                    >
                {/each}
            </div>
            {#if $page.url.pathname !== "/feed/news/2"}
                <div class="JIDcs">
                    {#each newsType as link}
                        <a
                            href={link.href}
                            class="aDkxg {$page.url.pathname === link.href
                                ? 'zkjmH'
                                : ''}">{link.text}</a
                        >
                    {/each}
                </div>
            {/if}
        {/if}

        <div class="JIDcs" style="display: none;"></div>
        <slot></slot>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            class="C7jTF"
            style="--4f5bece2: 40px; --16fc4118: 142px;"
            on:click={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
            <svg
                fill="currentColor"
                class="ZLp3c"
                style="width: 24px; height: 24px;"
                ><use xlink:href="#web-core-icon-back2"></use></svg
            >
        </div>
    </div>
    <!---->
</div>
<Footer />
