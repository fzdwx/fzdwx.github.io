<template>
  <ContentRenderer
      class="doc prose
                        max-w-none
                        text-black/90 text-[20px] leading-[30px]
                        prose-code:text-[14px] prose-code:leading-[24px]
                        prose-pre:bg-zinc-300/25 prose-pre:text-codetext
                        prose-pre:my-5
                        prose-hr:my-5 prose-hr:border-t-just-light
                        prose-p:my-2
                        prose-li:my-2 prose-ul:my-2
                        prose-a:no-underline prose-a:text-just hover:prose-a:text-just-dark
                        prose-blockquote:border-l-[3px] prose-blockquote:border-l-just-lighter
                        prose-code:after:content-none prose-code:before:content-none
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

<style>

</style>
