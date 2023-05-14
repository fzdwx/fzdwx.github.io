<template>
    <div class="m-center">
        <div class="m-con">
            <content-doc v-slot="{doc}">
                <div class="pb-5">
                    <cd/>
                </div>
                <header class="pb-5">
                    <h1 class="text-3xl">{{ doc.title }}</h1>
                </header>

                <span :key="tag" :id="idx"
                      class="mx-1 text-lg rounded py-[0.2rem] px-[0.3rem] cursor-pointer whitespace-nowrap"
                      :class="{
                        'bg-just-light/20 text-just-dark': tag === state.currentName,
                      }"
                      @click="collectItemInfo(tag)"
                      v-if="state.names" v-for="(tag,idx) in state.names">
                        {{ tag }}
                </span>

                <div class="pt-5 text-lg" v-for="(year) in state.years">
                    <header class="pb-2">
                        <h1 class="text-2xl">{{ year }}年</h1>
                    </header>
                    <div class="pl-10 flex flex-row" v-for="item in state.itemsByYear[year]">
                    <span class="basis-1/4" :aria-label="item.time">
                        {{ formatDate(item.time) }}
                    </span>
                        <a class="basis-1/2" :href="item.url" target="_blank">
                        <span class="hover:bg-just-light/20 hover:text-just-dark text-ellipsis">
                             {{ item.title }}
                        </span>
                        </a>
                        <span class="basis-1/4">
                        {{ item.name }}
                    </span>
                    </div>
                </div>
            </content-doc>
        </div>
    </div>
</template>
<script setup lang="ts">
import {FeedsInfo, FeedsItem, SubFeedsInfo} from "~/types";
import dayjs from "dayjs";

const {data, pending, error, refresh} = await useFetch<SubFeedsInfo>('/links.json')
refresh().then(() => {
    initGroup()
    collectItemInfo()
})

const state = reactive({
    currentName: "",
    itemsGroup: {} as { [key: string]: FeedsItem[] },
    names: [] as string[],
    currItems: [] as FeedsItem[],
    itemsByYear: {} as { [key: string]: FeedsItem[] },
    years: [] as string[],
});

const formatDate = (date: string) => {
    return dayjs(date).format('M月D日')
}

function initGroup() {
    if (data.value) {
        data.value.items.forEach((v) => {
            state.itemsGroup[v.name] = v.info
            state.names.push(v.name)
        })
    }
}

function collectItemInfo(name?: string) {
    if (data.value) {
        if (!name || name === state.currentName) {
            state.currItems = data.value.items.flatMap((v) => {
                return v.info
            })
            state.currentName= ""
        } else {
            state.currentName = name
            state.currItems = state.itemsGroup[name]
        }
    }

    if (state.currItems) {
        state.itemsByYear = {}
        state.years = []
        state.currItems.forEach((v) => {
            const year = dayjs(v.time).format('YYYY')
            state.years.find((v) => v === year) || state.years.push(year)
            if (!state.itemsByYear[year]) {
                state.itemsByYear[year] = []
            }
            state.itemsByYear[year].push(v)
        })
    }
    if (state.itemsByYear) {
        Object.keys(state.itemsByYear).forEach((v) => {
            state.itemsByYear[v].sort((a, b) => {
                return dayjs(b.time).valueOf() - dayjs(a.time).valueOf()
            })
        })
    }

    if (state.years) {
        state.years.sort((a, b) => {
            return parseInt(b) - parseInt(a)
        })
    }

}
</script>
