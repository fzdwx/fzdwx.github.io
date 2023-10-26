<script lang="ts" setup>

import timeline from "~/public/timeline.json";

const props = defineProps<{
  id: number
  height: any
}>();

const getTimeline = (id: number) => {
  return timeline.comments.nodes.filter(item => {
    return item.databaseId == id
  })[0]
}
</script>

<template>
  <div :style="height">
    <timeline-comment :item="getTimeline(props.id)" :change-tag="()=>{}"/>
  </div>
</template>
