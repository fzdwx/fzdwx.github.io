<template>
    <ContentRenderer
            class="doc prose prose-xl
                        max-w-none
                        prose-pre:bg-codebg prose-pre:text-codetext prose-code:text-sm
                        prose-pre:my-0
                        prose-hr:my-5 prose-hr:border-t-just-light
                        prose-p:my-2 prose-li:my-2 prose-ul:my-2
                        prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-base
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
code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  white-space: break-spaces;
  background-color: rgba(175, 184, 193, 0.2);
  border-radius: 6px;
}

</style>
