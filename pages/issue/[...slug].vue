<script setup lang="ts">
// @ts-expect-error avoid lint error
import markdownParser from "@nuxt/content/transformers/markdown";

const state = ref({
    list: [] as any[],
    body: ""
})


$fetch("/api/listissues").then(async (res) => {
    state.value.list = res
}).catch((err) => {
    console.log(err)
})

</script>

<template>
    <div class="m-center">
        <div class="m-con">
            <div v-for="issue in state.list">
                <h1>
                    {{ issue.title }}
                </h1>

                <div>
                    {{issue.body}}
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
