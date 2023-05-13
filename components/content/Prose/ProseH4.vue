<template>
    <h4 :id="id">
        <slot/>
        <a class="header-anchor float-left" v-if="id && generate" :href="`#${id}`"/>
    </h4>
</template>

<script setup lang="ts">
import {useRuntimeConfig} from '#imports'

defineProps<{ id?: string }>()
const heading = 4
const {anchorLinks} = useRuntimeConfig().public.content
const generate = anchorLinks?.depth >= heading && !anchorLinks?.exclude.includes(heading)
</script>
