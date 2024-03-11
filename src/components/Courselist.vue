<script setup>
import { ref, computed, watch, onMounted, onBeforeMount} from 'vue'
import CardWidget from '@/components/CardWidget.vue'
import MainSection from '@/components/MainSection.vue'
import Overlay from '@/components/Overlay.vue'
import Field from '@/components/Field.vue'
import { useRouter } from "vue-router";
import { sessionStore } from "../stores/session";
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import CardComponent from '@/components/CardComponent.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import CardProductBar from '@/components/CardProductBar.vue'
import ItemBox from '@/components/ItemBox.vue'
import { getdata } from "../stores/user";
import { themeStore } from "../stores/theme";
import { mdiAccount, mdiEyeOff,mdiProgressCheck,mdiPlusBox,mdiMinusBox,mdiAccountAlertOutline,mdiBookEducation,mdiAccountCogOutline,mdiExitRun,mdiCheck } from '@mdi/js'
const select = ref(false)
const checkboxOptions = { false: 'Select course' }
const user = sessionStore();
const pageLoading = ref(false)
const theme = themeStore();
const code = getdata();
const router = useRouter();
const props = defineProps({
  course_value: {
    type: Object,
  },
  regcode:{
    type:String,
  }
});
const online = computed(() =>  user.isonline);
onBeforeMount(async() => {
 
 

  
});

const update_course = computed(() => {
 pageLoading.value = true
 return code.update_course
 pageLoading.value = false
})

const course_value = computed(() => {
 return code.enquiry_course
})


const coursesubmit = async (course) => {
  try{
    await user.checkonlines();
    if(online.value===true){
    props.regcode = props.regcode.trim()
    await user.updatecourse({ "course": course,"regcode":props.regcode.replaceAll("-",'')});
    if(user.update_course.status===200){
      theme.pushMessage("course updated successfully!");
      router.push("/")
    }
    else if(user.update_course_error){
      theme.pushMessage(user.update_course_error);
      user.update_course_error = ""
    }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }

    }
    catch(err){

      theme.pushMessage(code.$state.error_update_course);
      code.$state.error_update_course=""
    }

  
}
// console.log("props.course_value",props.course_value)
</script>

<template>
<overlay>
    <div v-if="pageLoading" wire:loading
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
    <div class="loader ease-linear rounded-full  h-12 w-12 mb-4"></div>
    <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
    <p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
  </div>  
  <card-component
      class="shadow-lg w-full h-full md:w-10/12 z-50 items1"
      :class="{ 'animate-shake': shake }"
    >

 <label class="text-white  text-base text-center flex justify-center pb-2 font-bold">Select your course in the courses shown below</label>


    <div class=" pb-2">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 p-1">

      <div class="text-center bg-gray-900 relative  border border-gray-600 shadow-sm shadow-orange-300"  v-for="(client, index) in props.course_value" :key="client.id" :class="{ 'bg-gray-900': index % 2}">


          <!-- <item-box
            :value="client.name"
            :title="client.branch.name"
            :title1="client.mode_of_class.name"
            :title2="client.class_timings.name"
            :one_shot="client.amount_one_shot"
            :partial_shot="client.installment_Amount1+client.installment_Amount2"
            trend-type="up"
            divider
          /> -->
         
        <!-- <table class="border-collapse  border-3 border-opacity-50 w-full table-auto mb-10 mt-0">
          <thead class="pt-0">
          <tr class="pt-0">
            <th class="pt-0 text-sm text-bold text-center text-orange-400">Subjects</th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="(client1) in client.subject" :key="client1.id"
          >
          <td data-label="Subjects" class="text-xs text-orange-400 text-center">
          
              <small class="text-gray-500 dark:text-gray-300 font-bold text-sm ">
                {{ client1.name }}
              </small>
          </td>
          </tr>
        </tbody>
        </table> -->
        <card-product-bar
          :key="client.id"
          :product="client"
        />
        <!-- <table class="border-collapse  border-3 border-opacity-50 w-full table-auto mb-10 mt-0">
          <thead class="pt-0">
          <tr class="pt-0" v-for="(client1) in client.subject" :key="client1.id">
            <th class="pt-0 text-sm text-bold text-center text-orange-400">{{client1.name}}</th>
          </tr>
          </thead> -->
          <!-- <tbody>
          <tr
            v-for="(client1) in client.subject" :key="client1.id"
          >
          <td data-label="Subjects" class="text-xs text-orange-400 text-center">
          
              <small class="text-gray-500 dark:text-gray-300 font-bold text-sm ">
                {{ client1.name }}
              </small>
          </td>
          </tr>
        </tbody> -->
        <!-- </table> -->
        <!-- <div class="flex justify-center  ">  -->
          <div class="flex justify-center">
           <jb-buttons class="w-full" >
            <jb-button
              label="Click to Select this Course"
              color="light"
              type="submit"
              class="w-full"

              @click="coursesubmit(client)"
            />
     
          </jb-buttons>
          </div>
        <!-- </div>  -->
        </div>
      </div>

    </div>


  </card-component>
</overlay>


</template>

<style >
.item + .item:after {
  content: ";";
}

.items1 {
  overflow-y: auto !important;;
}


</style>

