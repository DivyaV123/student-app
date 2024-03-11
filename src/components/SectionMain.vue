<script setup>
import { computed } from 'vue'
import { useMainStore } from '@/stores/main'

const mainStore = useMainStore()

const isFullScreen = computed(() => mainStore.isFullScreen)
</script>

<template>
  <section
    :class="{'py-6':!isFullScreen}"
    class="px-0 md:px-6"
  >
    <slot />
  </section>
</template>
