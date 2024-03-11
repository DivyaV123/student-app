<script setup>
import { controlTextColor } from '@/colors.js'
import { computed, useSlots } from 'vue'
import FieldHelp from '@/components/FieldHelp.vue'

const props = defineProps({
  label: {
    type: String,
    default: null
  },
  help: {
    type: String,
    default: null
  },
  horizontal: Boolean,
  addons: Boolean,
  grouped: Boolean,
  multiline: Boolean,
  error: {
    type: [Boolean, String],
    default: null
  },
  success: {
    type: [Boolean, String],
    default: null
  },
  disabled: {
    type:Boolean,
    default:false
  }
})

const slots = useSlots()

const upperWrapperClass = computed(() => {
  const base = [props.multiline ? '-mb-3' : 'mb-3']

  if (props.horizontal) {
    base.push('lg:gap-6 lg:grid-cols-5')
  }

  return base
})

const wrapperClass = computed(() => {
  const base = []
  const slotsLength = slots.default().length

  if (props.horizontal) {
    base.push('lg:col-span-4')

    if (!props.label) {
      base.push('lg:col-start-2')
    }
  }

  if (props.addons || props.grouped || props.multiline) {
    base.push('flex justify-start')
  } else {
    if (slotsLength > 1) {
      base.push('grid grid-cols-1 gap-3')
    }

    if (slotsLength === 2) {
      base.push('md:grid-cols-1')
    }

    if (slotsLength >= 3) {
      base.push('md:grid-cols-3')
    }

    if (slotsLength >= 4) {
      base.push('md:grid-cols-4')
    }
  }

  if (props.grouped) {
    base.push('space-x-3')
  }

  if (props.multiline) {
    base.push('flex-wrap')
  }

  return base
})

const labelClass = computed(() => {
  const base = []

  if (props.horizontal) {
    base.push('lg:mb-0')
  }

  const textColor = controlTextColor(props.error, props.success)

  if (textColor) {
    base.push(textColor)
  }

  return base
})
</script>

<template>
  <div
    class="grid grid-cols-1 last:mb-0"
    :class="upperWrapperClass"
  >
    <label
      v-if="label"
      class="block font-bold mb-1"
      :class="labelClass"
    >{{ label }}</label>
    <div :class="wrapperClass">
      <slot />
    </div>
    <field-help
      class="mt-1"
      :class="{horizontal}"
      :help="help"
      :error="error"
      :success="success"
    />
  </div>
</template>
