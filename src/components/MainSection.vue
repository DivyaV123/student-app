<script setup>
import { computed } from 'vue'
import { themeStore } from "../stores/theme"
const theme = themeStore();

const isFormScreen = computed(() => theme.isFormScreen)
</script>

<template>
  <section :class="{ '': !isFormScreen }" class="px-0">
    <slot />
  </section>
</template>
