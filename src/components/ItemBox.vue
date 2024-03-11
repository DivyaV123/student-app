<script setup>
import Divider from '@/components/Divider.vue'
import TrendPill from '@/components/TrendPill.vue'
import IconRounded from '@/components/IconRounded.vue'
import { mdiClose, mdiPlusBox, mdiMinusBox, mdiPhone } from '@mdi/js'
import JbButton from "@/components/JbButton.vue";
defineProps({
  title: {
    type: String,
    required: true
  },
  bool_var: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  value1: {
    type: String,
    required: true
  },
  value2: {
    type: String,
    required: true
  },
  value3: {
    type: String,
    required: true
  },
  title1: {
    type: String,
    required: true
  },
  title2: {
    type: String,
    required: true
  },
  one_shot: {
    type: Number,
    required: true
  },
  partial_shot: {
    type: Number,
    required: true
  },
  divider: Boolean,
  trend: {
    type: String,
    default: null
  },
  trendType: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: null
  },
  iconType: {
    type: String,
    default: null
  }
})

</script>

<template>
  <div class="mb-3">
    <trend-pill
      v-if="trend"
      :trend="trend"
      :trend-type="trendType"
      small
    />
  </div>
  <div
    v-bind="$attrs"
    :class="{'flex justify-center items-center':icon}"
  >
    <div >
      <h4 v-if="bool_var==='1'" class="text-red-500 dark:text-red-500 font-bold p-1">
        {{ title }} 
      </h4>
      <h4 v-if="bool_var==='2'" class="text-orange-300 dark:text-orange-300 font-bold p-2">
        {{ title }}
      </h4>
      <h4 v-if="bool_var==='3'" class="text-blue-500 dark:text-blue-500 font-bold p-1">
        {{ title }}
      </h4>
      <h4 v-if="bool_var==='4'" class="text-green-500 dark:text-green-500 font-bold p-1">
        {{ title }}
      </h4>
        <!-- <icon-rounded
        v-if="icon"
        :icon="icon"
        :type="iconType"
        bg
      /> -->
      <h2 class=" text-orange-500 py-3 font-bold text-md">
          <jb-button v-if="value"
        :label="value" :href="'tel:' + value"  :icon="mdiPhone" type="submit" color="help"  class="font-medium text-sm py-1" small/>
        <jb-button v-if="value1"
        :label="value1" :href="'tel:' + value1" :icon="mdiPhone" type="submit" color="help"  class="font-medium text-sm py-1" small />
         <jb-button v-if="value2"
        :label="value2" :href="'tel:' + value2" :icon="mdiPhone" type="submit" color="help"  class="font-medium text-sm py-1" small />
        <jb-button v-if="value3"
        :label="value3" :href="'tel:' + value3" :icon="mdiPhone" type="submit" color="help"  class="font-medium text-sm py-1" small />
      </h2>
      <!-- <h2 class="text-orange-500 py-3 font-bold text-md">
         
      </h2> -->
      <!-- <h2 class="text-orange-500 py-3 font-bold text-md">
         <a :href="'tel:' + value2">
                {{value2}}
                </a>
      </h2> -->
      <!-- <h2 class="text-orange-500 py-3 font-bold text-md">
         <a :href="'tel:' + value3">
                {{value3}}
                </a>
      </h2> -->
      <!-- <h4 class="text-orange-100 dark:text-gray-400 font-bold">
        <b>Mode of class:</b>  {{ title1 }}
      </h4>
      <h5 class="text-orange-100 dark:text-gray-400 font-bold text-sm">
        <b>Class Timings:</b>  {{ title2 }}
      </h5>
      <h6 class="text-indigo-200 dark:text-indigo-200 font-bold text-xs">
        <b>One shot Amount:</b>  {{ one_shot }}
      </h6>
      <h6 class="text-indigo-200 dark:text-indigo-200 font-bold text-xs">
        <b>Partial shot Amount:</b>  {{ partial_shot }}
      </h6> -->
    </div>
    
  </div>
  <divider v-if="divider" />
</template>
