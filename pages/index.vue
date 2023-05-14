<template>
    <div class="m-center pt-10 pb-10">
        <div class="m-con text-xl px-6">
            <content-doc/>
        </div>
    </div>
    <div class="m-center">
      <div class="m-con">
          <articles-list :showCd="false" :show-tag-list="false" path="/blog"/>
      </div>
    </div>
</template>

<style scoped>

p {
    @apply my-4
}

</style>
<script setup lang="ts">
</script>
