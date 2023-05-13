<script setup lang="ts">
let props = defineProps({
    name: {
        type: String,
        required: true,
    },
});

const githubUrl = 'https://github.com/' + props.name
</script>
<template>
    <a :href="githubUrl" target="_blank" :aria-label="name" :title="name"
       class="
       mb-1 font-bold
       "
    >
        <Icon class="mb-1" name="logos:github-icon"/>
    </a>
</template>
