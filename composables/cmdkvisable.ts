const state = ref(false)

const show = () => {
    state.value = !state.value
}

const useCmdkVisable = () => {
    return {
        state,
        show
    }
}

export { useCmdkVisable}
