<template>
    <ContentRenderer
            class="doc prose prose-xl
                        max-w-none
                        prose-pre:bg-codebg prose-pre:text-codetext prose-code:text-sm
                        prose-pre:my-0
                        prose-hr:my-5 prose-hr:invisible
                        prose-a:no-underline prose-a:text-just hover:prose-a:text-just-dark
                        prose-blockquote:border-l-[3px] prose-blockquote:border-l-just-lighter
                        "
            :value="doc"/>
</template>
<script setup lang="ts">
defineProps({
    doc: {
        type: Object,
        required: true
    }
})
</script>
