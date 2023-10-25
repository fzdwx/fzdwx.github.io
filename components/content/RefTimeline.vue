<script lang="ts" setup>

import timeline from "~/public/timeline.json";

const props = defineProps<{
  id: number
}>();

const getTimeline = (id: number) => {
  return timeline.comments.nodes.filter(item => {
    return item.databaseId == id
  })[0]
}
</script>

<template>
  <div>
    <timeline-comment :item="getTimeline(props.id)" :change-tag="()=>{}"/>
  </div>
</template>