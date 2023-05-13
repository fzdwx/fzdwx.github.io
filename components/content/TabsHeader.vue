<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
    tabs: {
        type: Array as PropType<{ label: string }[]>,
        required: true
    },
    activeTabIndex: {
        type: Number,
        required: true
    }
})

const emit = defineEmits(['update:activeTabIndex'])

const tabsRef = ref()

const highlightUnderline = ref()

const updateHighlightUnderlinePosition = (activeTab: any) => {
    if (!activeTab) {
        return
    }

    highlightUnderline.value.style.insetInlineStart = `${activeTab.offsetLeft}px`
    highlightUnderline.value.style.width = `${activeTab.clientWidth}px`
}

const updateTabs = ($event: any, i: any) => {
    emit('update:activeTabIndex', i)
    nextTick(() => updateHighlightUnderlinePosition($event.target))
}

watch(
    tabsRef,
    (newVal) => {
        if (!newVal) {
            return
        }

        setTimeout(() => {
            updateHighlightUnderlinePosition(tabsRef.value.children[props.activeTabIndex])
        }, 50)
    },
    {
        immediate: true
    }
)
</script>

<template>
    <div class="tabs-header">
        <div v-if="tabs" ref="tabsRef" class="tabs">
            <button
                    v-for="({ label }, i) in tabs"
                    :key="`${i}${label}`"
                    :class="[activeTabIndex === i ? 'active' : 'not-active']"
                    @click="updateTabs($event, i)"
            >
                {{ label }}
            </button>
            <span
                    ref="highlightUnderline"
                    class="highlight-underline"
            >
        <span class="tab" />
      </span>
        </div>

        <slot name="footer" />
    </div>
</template>

<style>
 .tabs-header {
    @apply relative bg-[#ECEBE8] text-[#701704]
}

.tabs-header .tabs {
    @apply relative z-0 px-2 overflow-x-auto
}

.tabs button {
    transition: color 100ms, background 100ms;
    @apply py-[0.625rem] px-4 relative select-none rounded
}

.active {
    @apply text-[#97948F] bg-codebg;
}

.not-active {
    @apply text-[#36332E] hover:text-[#201E1B] hover:bg-[#DBD9D3]
}

</style>
