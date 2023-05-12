<template>
    <ContentDoc v-slot="{doc}">
        <div class="m-center">
            <div class="max-w-[90%] sm:w-[560px] lg:w-[780px]">
                <cd/>
                <header class="m-center">
                    <h1 class="text-2xl ">{{ doc.title }}</h1>
                </header>
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
            </div>
        </div>
    </ContentDoc>
</template>
