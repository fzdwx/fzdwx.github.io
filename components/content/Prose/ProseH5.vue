<template>
    <h5 :id="id">
        <slot/>
        <a class="header-anchor float-left" v-if="id && generate" :href="`#${id}`"/>
    </h5>
</template>

<script setup lang="ts">
import {useRuntimeConfig} from '#imports'

defineProps<{ id?: string }>()
const heading = 5
const {anchorLinks} = useRuntimeConfig().public.content
const generate = anchorLinks?.depth >= heading && !anchorLinks?.exclude.includes(heading)
</script>
