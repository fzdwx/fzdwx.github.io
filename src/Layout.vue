<script setup lang="ts">
import { useData } from "vitepress";
import VPFooter from "vitepress/dist/client/theme-default/components/VPFooter.vue";
import ContentDispatch from "./layout/ContentDispatch.vue";
import NotFound from "./NotFound.vue";
import Nav from "./components/Nav.vue";
import Incr from "./store/index"

const { page, frontmatter } = useData();


onMounted(async ()=>{
  const n =  await Incr()
  console.log(n);
})

</script>

<template>
  <div v-if="frontmatter.layout !== false" class="Layout">
    <Nav />

    <NotFound v-if="page.isNotFound" />
    <ContentDispatch v-else />
    <div class="my-[100px]"></div>
    <VPFooter class="" />
  </div>
</template>

<style scoped></style>
