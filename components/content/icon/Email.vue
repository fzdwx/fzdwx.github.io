<script setup lang="ts">
let props = defineProps({
    email: {
        type: String,
        required: true,
    },
});

const emailHref = 'mailto:' + props.email
</script>
<template>
    <a :href="emailHref" :aria-label="email" :title="email"
       class="
       mb-1
<!--       hover:after:content-[attr(title)]-->
<!--       hover:after:pl-2-->
       "
    >
        <Icon class="mb-1" name="logos:google-gmail"/>
    </a>
</template>
