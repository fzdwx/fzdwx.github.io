import {TimelineRoot} from "~/types/timeline";

const useTimeline = () => {
    const cursor = ref('')
    const data = ref<TimelineRoot>()
    const pageSize = ref(10)

    const next = async () => {
        data.value = await $fetch("/api/timeline", {
            params: {
                before: cursor.value,
                pageSize: pageSize.value,
            }
        })
        data.value?.repository.discussion.comments.edges.sort((a, b) => {
            return a.node.createdAt < b.node.createdAt ? 1 : -1
        })
        cursor.value = data.value?.repository.discussion.comments.pageInfo.startCursor || ''
    }

    const setPageSize = (size: number) => {
        pageSize.value = size
    }

    return {
        data,
        next,
        setPageSize,
    }
}

export default useTimeline
