<script setup>
import { computed, reactive, ref, onBeforeMount } from 'vue'
import { mdiClose, mdiPlusBox, mdiMinusBox, mdiPhone } from '@mdi/js'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import CardComponent from '@/components/CardComponent.vue'
import Level from '@/components/Level.vue'
import TextLink from '@/components/TextLink.vue'
import Overlay from '@/components/Overlay.vue'
import Field from "@/components/Field.vue";
import TitleSubBar from "@/components/TitleSubBar.vue";

import Control from "@/components/Control.vue";
import { themeStore } from "../stores/theme"
import dayjs from "dayjs";
import { sessionStore } from "../stores/session";

const user = sessionStore();

const theme = themeStore();


const props = defineProps({
  title: {
    type: String,
    default: null
  },
  sid: {
    type: Number,
    default: 0
  },
  id: {
    type: Number,
  },

   number:{
    type:Number,
  },

  branch: {
    type: Array,
  },
  

  button: {
    type: String,
    default: 'info'
  },
  buttonLabel: {
    type: String,
    default: 'Add'
  },
  shake: Boolean,
  hasCancel: Boolean,
  textLinkLabel: {
    type: String,
    default: null
  },
  textLinkIcon: {
    type: String,
    default: null
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  }
})


const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const confirmCancel = mode => {
  value.value = false
  emit(mode)
}



const cancel = () => confirmCancel("cancel");
</script>

<template>
  <overlay v-show="value" @overlay-click="cancel">
    <card-component v-show="value" :title="title" class="shadow-lg w-full max-h-modal lg:w-9/12 z-50 md:w-4/5 overflow-y-auto"
      :class="{ 'animate-shake': shake }" :header-icon="mdiClose" modal @header-icon-click="cancel">
      <div class="pl-4 space-y-3">

<div class="flex flex-wrap w-full px-2 mb-5 mt-2">

<div class="mr-2">
<jb-buttons>
    <jb-button
    class="ml-0 cursor-pointer whitespace-nowrap block focus:outline-none transition-colors duration-150 border text-white focus:ring rounded mx-auto pt-1 pb-1 mb-6 sm:mb-0"
      label="BCCM1"
      color="success"
     
    />
  </jb-buttons>
  </div>


<div class="mr-2">
  <jb-buttons>
    <jb-button
    class="ml-0 cursor-pointer whitespace-nowrap block focus:outline-none transition-colors duration-150 border text-white focus:ring rounded mx-auto pt-1 pb-1"
      label="Manual"
      color="blue"
     
    />
  </jb-buttons>
</div>

<jb-buttons>
    <jb-button
    class="ml-0 cursor-pointer whitespace-nowrap block focus:outline-none transition-colors duration-150 border text-white focus:ring rounded mx-auto pt-1 pb-1 mb-6"
      label="Suhas"
      color="info"
     
    />
  </jb-buttons>

</div>



<table class="w-full border-collapse border border-transparent border-3 ">
  <thead class="sticky top-[55px] z-[9] bg-gray-900">
      <tr class="border-b-2 border-gray-500">
        <th class="bg-gray-400 border-r-2 border-black text-center" colspan="2">Classes</th>
        <th class="bg-gray-400 border-r-2 border-black text-center" colspan="2">Assignment</th>
        <th class="bg-gray-400 border-r-2 border-black text-center" colspan="2">Coding</th>
        <th class="bg-gray-400 border-r-2 border-black text-center" colspan="2">Presentation</th>
        
      </tr>
      <tr>
      <th class="bg-gray-400 border-r-2 border-black">Total</th>
      <th class="bg-gray-400 border-r-2 border-black">Attended</th>
       <th class="bg-gray-400 border-r-2 border-black">Total</th>
       <th class="bg-gray-400 border-r-2 border-black">Submitted</th>
       <th class="bg-gray-400 border-r-2 border-black">Total</th>
       <th class="bg-gray-400 border-r-2 border-black">Attended</th>
       <th class="bg-gray-400 border-r-2 border-black">Total</th>
       <th class="bg-gray-400 border-r-2 border-black">Attended</th>
      </tr>
    </thead>

    <tbody>
    <tr>
    <h5 class="lg:hidden block underline">Classes</h5>
        <td data-label="Total">
         <small class="text-gray-500 dark:text-gray-300 font-semibold">
          20
          </small>
        </td>
        <td data-label="Attended">
         <small class="text-gray-500 dark:text-gray-300 font-semibold">
          15
          </small>
        </td>
  <h5 class="lg:hidden block underline">Assignment</h5>
        <td data-label="Total">
         <small class="text-gray-500 dark:text-gray-300 font-semibold">
          17
          </small>
        </td>
        <td data-label="Submitted">
         <small class="text-gray-500 dark:text-gray-300 font-semibold">
          12
          </small>
        </td>

        <td data-label="Total">
         <small class="text-gray-500 dark:text-gray-300 font-semibold">
          10
          </small>
        </td>
        <td data-label="Attended">
         <small class="text-gray-500 dark:text-gray-300 font-semibold">
          4
          </small>
        </td>

         <td data-label="Total">
         <small class="text-gray-500 dark:text-gray-300 font-semibold">
          10
          </small>
        </td>
        <td data-label="Attended">
         <small class="text-gray-500 dark:text-gray-300 font-semibold">
          4
          </small>
        </td>
        </tr>

    </tbody>
</table>
       
      </div>

      
    </card-component>
  </overlay>
</template>
