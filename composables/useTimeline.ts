import {TimelineRoot} from "~/types";

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
        data.value?.repository.discussion.comments.edges.reverse()
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
