<template>
    <div class="m-center pt-10 pb-10">
        <div class="m-con text-xl">
            <content-doc/>
        </div>
    </div>
    <div class="m-center">
        <articles-list :showCd="false" path="/blog"/>
    </div>
</template>

<style scoped>

p {
    @apply my-4
}

</style>
