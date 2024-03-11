<script setup>
import { computed,onBeforeMount,watch,ref} from 'vue'
import { mdiInformation } from '@mdi/js'
import Icon from '@/components/Icon.vue'
import { themeStore } from "../stores/theme"
import { sessionStore } from "../stores/session";
import JbButtons from "@/components/JbButtons.vue";
import JbButton from "@/components/JbButton.vue";
import { useRouter } from "vue-router";

import dayjs from 'dayjs';
const theme = themeStore();
const wrong = ref(false)
const isAsideRightActive = computed(() => theme.isAsideRightActive)



const notification_datas = computed(() => {

});

const router = useRouter();
const user = sessionStore();
const props = defineProps({
  studentvalue: {
    type: String,
    default: null
  },
})
const markid= ref(null)
const read = (async (nid) => {
  await web.mark(nid);
})

const complain = (async (nid) => {

  markid.value=nid
  wrong.value=true
  

})

const readall = (async () => {

  await web.markall();

})

onBeforeMount(async () => {

  await user.checkUser();
  // if (user.$state.loggedIn === false) {
  //   router.push("/login");
  // }
  // else{

  // }
  
})

watch(notification_datas, (currentValue, oldValue) => {

})
</script>

<template>
  <aside
    id="aside-right"
    class="w-60 pr-1.5 fixed z-40 h-screen lg:h-screen-menu top-0 lg:top-14 bg-white border-l border-gray-100 overflow-y-scroll
    transition-position dark:bg-gray-900 dark:border-gray-700
    dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800"
    :class="{'right-0':isAsideRightActive, '-right-60':!isAsideRightActive}"
  >
   <div class="flex justify-end pt-4 pb-4" >
      <jb-buttons>
            <jb-button
              label="Mark all as Read"
              type="login"
              color="rose"
              @click="readall()"
              class="pt-0 pb-0 pr-1 pl-1 mt-0 md:mb-2 xl:mb-0"
            />
          </jb-buttons>
      </div>
    <div>
      <div
        v-for="item in notification_datas"
        :key="item.id"
        class="p-6 border border-white last:border-b-0 dark:border-gray-700"
      >
      <h1 class="font-bold text-md text-yellow-200 ">{{ item.title }}</h1>
  
        <p class="mb-2 mt-2">
          {{ item.description }}
        </p>
        <h1 class="text-md text-yellow-200 ">{{ dayjs(item.created).format("YYYY-MM-DD")}}{{"@"}}{{ dayjs(item.created).format("h:mm:ss a")}}</h1>
        <div class="flex justify-start">
          <jb-buttons>
            <jb-button
              label="Mark as Read"
              type="login"
              color="teal"
              @click="read(item.id)"
              class="pt-0 pb-0 pr-1 pl-1 mt-0 md:mb-2 xl:mb-0"
            />
          </jb-buttons>
            
          <jb-buttons class="pl-1" v-if="item.type.name!='Attendance'">
            <jb-button
              label="Complain"
              type="login"
              color="gray"
              @click="complain(item.id)"
              class="pt-0 pb-0 pr-1 pl-1 mt-0 md:mb-2 xl:mb-0"
            />
          </jb-buttons>
        </div>
      </div>

    </div>
  </aside>
<!-- <Wrongdata v-model="wrong" :id="2" :markid="markid" has-cancel/>  -->
</template>
