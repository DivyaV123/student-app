<script setup>
import Icon from '@/components/Icon.vue'

defineProps({
  icon: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  desktopIconOnly: Boolean,
  updateMark: {
    type: String,
    default: null
  }
})
</script>

<template>
<div class="pb-0">
  <icon
    :path="icon"
    class="transition-colors"
    :update-mark="updateMark"
  />
</div>
</template>
