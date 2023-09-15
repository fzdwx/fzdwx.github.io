<script setup lang="ts">
import {Command} from 'vue-command-palette'
import {useMagicKeys} from "@vueuse/core";

interface Props {
  placeholder: string
}

defineProps<Props>()

const keys = useMagicKeys()
const MetaK = keys['Meta+K']
const CmdK = keys['CTRL+K']
const escape = keys['Escape']
const visible = ref(false)

onMounted(() => {
  document.addEventListener("keydown", function (event) {
    // 按下 Ctrl+K
    if (event.ctrlKey && event.keyCode === 75) {
      event.preventDefault();
    }
  });

  //@ts-ignore
  window.closeCmkd = () => {
    visible.value = false
  }
})

const changeVisible = () => {
  visible.value = !visible.value
}


watch(escape, v => {
  if (v && visible.value) {
    visible.value = false
  }
})

watch(CmdK, (v) => {
  if (v) {
    changeVisible()
  }
})
watch(MetaK, (v) => {
  if (v) {
    changeVisible()
  }
})

let config = useAppConfig();
</script>

<template>
  <Command.Dialog :visible="visible" theme="raycast" autofocus>
    <template #header>
      <Command.Input :placeholder="placeholder"/>
    </template>
    <template #body>
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group heading="Tabs">
          <Command.Item v-for="link in config.links" :data-value="link.title" @select="()=>{
            $router.push(link.url)
            changeVisible()
          }">
            <Icon
                v-if="link.icon"
                :name="link.icon"
                class="hidden sm:inline-block md:mr-2 mb-1 transition opacity-75 group-hover:opacity-100"
            />
            {{ link.title }}
          </Command.Item>
        </Command.Group>
        <slot/>
      </Command.List>
    </template>
  </Command.Dialog>
</template>

<style scoped>

</style>