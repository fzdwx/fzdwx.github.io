<!-- copy from https://github.com/yzh990918/evan-yang -->
<script lang="ts" setup>
const config = useAppConfig()
</script>

<template>
    <header class="backdrop-blur">
        <div class="flex justify-between items-center max-w-7xl max-h-24 mx-auto sm:px-8 px-4">
            <nuxt-link to="/" class="flex items-center py-4" title="Go Home">
                <img
                        v-if="config.header.icon"
                        :src="config.header.icon"
                        width="80"
                        height="80"
                        :alt="config.header.title"
                        style="width: 40px; height: 40px;"
                        class="rounded-lg h-10 w-10 mr-3"
                >
                <div aria-label="title" class="hidden sm:block sm:w-[100px] text-transparent bg-clip-text bg-gradient-to-r from-just-light to-just-dark mt-2">
                    <span class="logo-title font-bold text-2xl">
                        {{ config.header.title }}
                    </span>
                </div>
            </nuxt-link>
            <div class="flex items-center">
                <nav aria-label="Main Menu" class="opacity-75">
                    <ul class="flex lg:space-x-7 lg:mr-14 sm:space-x-2 space-x-1 md:mr-7 items-center">
                        <li v-for="(link, key) in config.links" :key="key">
                            <NuxtLink v-slot="{ isActive }" :to="link.url"
                                      class="!inline-flex items-center group font-semibold"
                                      :title="`Visit ${link.title} Page`">
                                <div :class="isActive ? ['bg-just-light/20', 'text-just-dark'] : []"
                                     class="md:px-3 md:py-2 px-1 py-1 rounded">
                                    <Icon
                                            v-if="link.icon"
                                            :name="link.icon"
                                            class="hidden sm:inline-block mr-2 mb-1 transition opacity-75 group-hover:opacity-100"
                                            :class="isActive ? 'opacity-100' : 'opacity-75'"
                                    />
                                    {{ link.title }}
                                </div>
                                <Link :key="key" rel="prefetch" :href="link.path"/>
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>
                <div class="md:space-x-2 space-x-1 flex items-center">
<!--                    12313-->
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
header {
    border-style: none;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 50;
}

.logo-title {
    font-family: f1Font-Bold, serif;
}
</style>
