<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  sectionBgLogin,
  sectionBgLoginDark,
  sectionBgError,
  sectionBgErrorDark,
  sectionBgSignup,
  sectionBgSignupDark,
  sectionBgRemind,
  sectionBgRemindDark
} from '@/colors'
import MainSection from '@/components/MainSection.vue'
import JbLogo from '@/components/JbLogo.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import { themeStore } from "../stores/theme"

const theme = themeStore();
const props = defineProps({
  bg: {
    type: String,
    required: true,
    validator: value => ['login'].includes(value)
  },
  promo: Boolean
})

const darkMode = computed(() => theme.darkMode)

const colorClass = computed(() => {
  switch (props.bg) {
    case 'login':
      return darkMode.value ? sectionBgLoginDark : sectionBgLogin
    case 'error':
      return darkMode.value ? sectionBgErrorDark : sectionBgError
    case 'signup':
      return darkMode.value ? sectionBgSignupDark : sectionBgSignup
    case 'remind':
      return darkMode.value ? sectionBgRemindDark : sectionBgRemind
  }

  return ''
})

const route = useRoute()

const currentRouteName = route.name

const routes = {
  login: 'Login',
 

}
</script>

<template>
  <main-section
    class="flex flex-col items-center md:flex-row md:justify-around min-h-screen transition-background-image duration-1000"
    :class="colorClass"
  >
    <div v-if="promo" class="space-y-6 px-4">
      <!-- <div class="hidden lg:block">
        <jb-buttons type="justify-center" glue>
          <jb-button
            v-for="(routeLabel, index) in routes"
            :key="index"
            rounded-full
            :to="{ name: index }"
            :active-soft="index === currentRouteName"
            :label="routeLabel"
            :outline="darkMode"
            no-focus-ring
            addon
          />
        </jb-buttons>
      </div> -->

      <div class="text-center md:text-left text-orange-500 py-12 md:py-0 pb-0">
        <h1 class="text-3xl lg:text-4xl font-black">QSpiders JSpiders  PySpiders</h1>
        <!-- <h2 class="text-2xl">managed from one place</h2> -->
      </div>
      <div
        class="hidden md:block py-12 md:py-0 text-center text-white text-opacity-50 dark:text-opacity-80"
      >
      </div>
      <div class="hidden md:block text-white">
          <h2 class="text-xl font-black italic">You are at a place where businesses find talent and dreams take flight</h2>
      </div>

      <!-- <div class="mt-1">
      <div class="flex md:justify-start flex-wrap justify-center">
      <h5 class="font-bold text-yellow-300 text-md mt-0 pt-0 text-center italic">HR related queries? Call -
    </h5>
     <a href="tel:7338667464" class="font-bold text-yellow-300 italic text-md mt-0 pt-0 text-center ">
    7338667464
    </a>
    /
    <a href="tel:8951938858" class="font-bold text-yellow-300 italic text-md mt-0 pt-0 text-center ">
    8951938858
    </a>
    /
    <a href="tel:9686959546" class="font-bold text-yellow-300 italic text-md mt-0 pt-0 text-center ">
    9686959546
    </a>
    /
    <a href="tel:8951965085" class="font-bold text-yellow-300 italic text-md mt-0 pt-0 text-center ">
    8951965085
    </a>
    </div>
     <div class="flex md:justify-start flex-wrap justify-center">
    <h5 class="font-bold text-red-500 text-md mt-0 pt-0 text-center italic">Blocked from class? Call -
    </h5>
     <a href="tel:8951939012" class="font-bold text-red-500 italic text-md mt-0 pt-0 text-center ">
    8951939012
    </a>
    /
    <a href="tel:8951965476" class="font-bold text-red-500 italic text-md mt-0 pt-0 text-center ">
    8951965476
    </a>
    </div> 
    <div class="flex md:justify-start flex-wrap justify-center">
    <h5 class="font-bold text-green-400 text-md mt-0 pt-0 text-center italic">Facing Technical issue? Call - 
    </h5>
     <a href="tel:9972068008" class="font-bold text-green-400 italic text-md mt-0 pt-0 text-center ">
    9972068008
    </a>
    /
    <a href="tel:8951966085" class="font-bold text-green-400 italic text-md mt-0 pt-0 text-center ">
    8951966085
    </a>
    </div> 
    <div class="flex md:justify-start flex-wrap justify-center mb-3 md:mb-0">
    <h5 class="font-bold text-blue-400  text-md mt-0 pt-0 text-center italic">Looking for course or other subjects to attend? Call -
    </h5> 
    <a href="tel:8951965086" class="font-bold text-blue-400 text-md mt-0 pt-0 text-center italic">
    8951965086
    </a>
    /
    <a href="tel:8951965092" class="font-bold text-blue-400  text-md mt-0 pt-0 text-center italic">
    8951965092
    </a>
    /
    <a href="tel:9900018030" class="font-bold text-blue-400 text-md mt-0 pt-0 text-center italic">
    9900018030
    </a>
    </div>
     </div> -->
    </div>

    <slot card-class="w-11/12 md:w-7/12 lg:w-3/5 xl:w-1/2 shadow-2xl" card-rounded="rounded-lg" />

    <!-- <div v-if="promo" class="md:hidden space-y-12 py-12">
      <div class="text-white text-opacity-50">
      </div>
      <div class="text-white">
          <h2 class="text-2xl">QSpiders / JSpiders / PySpiders</h2>
      </div>
    </div> -->
  </main-section>
</template>
