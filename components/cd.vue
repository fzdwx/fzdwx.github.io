<script setup lang="ts">

const route = useRoute();

</script>
<template>
    <NuxtLink
            class="no-underline opacity-70"
            :to="route.path.split('/').slice(0, -1).join('/') || '/'"
    >
        cd
        ..
    </NuxtLink>
</template>


