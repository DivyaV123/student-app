<script setup>
import { computed } from 'vue'
import { themeStore } from "../stores/theme"
const theme = themeStore();

const props = defineProps({
  navBar: Boolean
})



const lightBorderStyle = computed(() => theme.lightBorderStyle)
</script>

<template>
  <hr
    :class="[lightBorderStyle, props.navBar ? 'hidden lg:block lg:my-0.5 dark:border-gray-700' : 'my-3 dark:border-gray-800 w-full']"
    class="border-t"
  />
</template>
