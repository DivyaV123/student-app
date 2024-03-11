
<template>
<!-- <div class="pt-2">
  <div class="flex items-center justify-start flex-wrap -mb-3" style="justify-content: end; margin-right: 10px">
<jb-button
      class="ml-0 cursor-pointer whitespace-nowrap block focus:outline-none transition-colors duration-150 border text-white focus:ring rounded pt-0 pb-0 pr-1 pl-1 mb-0 mt-0 text-md" 
      label="Pay Directly" color="success"
      @click="addpay(pdata)" />
  </div>
</div> -->
<add-pay v-if="addpayModalActive == true" v-model="addpayModalActive" :apm="apm">
  </add-pay>
  <form-screen-section  bg="login" >
     <div v-if="page_loading" wire:loading
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
    <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
    <p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
  </div> 
    <card-component
    title="Please select any one of the options"
    class="mt-4 text-orange-500"
    
    >
    <div>
      <jb-buttons>
            <jb-button
              label="Join Batch"
              type="submit"
              class="w-full font-bold"
              color="info"
              @click="submitregcode()"
            />
            </jb-buttons>
            <div
            class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
          >
            <p class="text-center font-semibold mx-4 mb-0 text-white">OR</p>
          </div>
             <jb-buttons >
            <jb-button
              label="Pay" 
              color="success" 
              type="addpay"  
              class="w-full font-bold"
              @click="addpay()" />
          </jb-buttons>
    </div>
    </card-component>
  </form-screen-section> 

<Courselist v-if="show_course===true" :course_value="student_course" :regcode="form.regcode" /> 
</template>

<script setup>
import { reactive, ref, computed, onBeforeMount, watch } from 'vue'
import { mdiEmail,mdiPhone } from '@mdi/js'
import FormScreenSection from '@/components/FormScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import JbButton from '@/components/JbButton.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import TextLink from '@/components/TextLink.vue'
import { sessionStore } from "../stores/session";
import { useRouter } from "vue-router";
import { getdata } from "../stores/user";
// import { useStorage } from "vue3-storage";
import { themeStore } from "../stores/theme";
import AddPay from '@/components/AddPay.vue';
import Courselist from  '@/components/Courselist.vue';
// const ls = useStorage();
const router = useRouter();
const user = sessionStore();
const theme = themeStore();
const page_loading = ref(false);
const code = getdata();
const show_course = ref(false)
const student_course=ref([])
const form = reactive({
  regcode: '',
})
const addpayModalActive = ref(false)

const addpay = (data) =>{
  pageLoading.value = true
  addpayModalActive.value = true
  pageLoading.value=false
}
let selected = ref(null);
const hasError = ref(false)

const cardClassAddon = computed(() => hasError.value ? 'animate-shake' : '')
const online = computed(() =>  user.isonline);



const submitregcode = async () => {
pageLoading.value = true
router.push("/add_regcode")
pageLoading.value=false
};
const reg_code = computed(() => {
 return user.reg_code
})

const apm = reactive({
  partial_balance: null,
  oneshot_balance: null,
  id:null,
  branch: {
    branchid:null,
    branchname:null
  },
});
const pageLoading = ref(false)
onBeforeMount(async() => {
  pageLoading.value = true
  await user.checkonlines();
  await user.checkUser();
  if (user.$state.loggedIn===false) {
    router.push("/login");
  }
  else if(user.$state.loggedIn===true){
    if(online.value===true){
      await user.getvalidations();
    if(user.validation_status===200){
    await user.getstudentcoursess();
    theme.setPageTitle("Join Batch or Pay")
    if(user.validation.studentcourse===false){
      router.push("/pay_directly")
    }
    else if(user.validation.studentcourse===true&&user.validation.studentbatch===false){
      router.push("/add_regcode")
    }
    else if(user.validation.other===false){
      router.push("/profile")
    }
    else{
      router.push("/");
    }

    }
    else{
      await user.logout()
      router.go()
    }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
   
  }
  if(user.student_course&&user.student_course[0]){
 

    apm.partial_balance=user.student_course[0].partial_balance
    apm.oneshot_balance=user.student_course[0].oneshot_balance
    apm.id=user.student_course[0].id
    apm.branch.branchid=user.student_course[0].branch.branchid
    apm.branch.branchname=user.student_course[0].branch.branchname
  }
  pageLoading.value = false
});
</script>

<style >
.hello{
  width:100%
}
.modal-card-body{
 overflow-y: auto;
 -ms-overflow-style: none;
}

</style>