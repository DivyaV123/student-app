
<template>
<!-- <div class="pt-2">
  <div class="flex items-center justify-start flex-wrap -mb-3" style="justify-content: end; margin-right: 10px">
<jb-button
      class="ml-0 cursor-pointer whitespace-nowrap block focus:outline-none transition-colors duration-150 border text-white focus:ring rounded pt-0 pb-0 pr-1 pl-1 mb-0 mt-0 text-md" 
      label="Pay Directly" color="success"
      @click="addpay(pdata)" />
  </div>
</div> -->
<add-pay v-if="addpayModalActive == true" v-model="addpayModalActive" >
  </add-pay>
  <form-screen-section  bg="login">
     <div v-if="pageLoading" wire:loading
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
    <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
    <p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
  </div> 
    <card-component
    v-if="value===true"
    >
      <field label="Batch Code" :error="hasError" help="Please enter Batch code" class="text-orange-500">
        <control
          v-model="form.regcode"
          :error="hasError"
          name="name"
          autocomplete="username"
        />
      </field>
      <template #footer>
        <level mobile>
          <jb-buttons>
            <jb-button
              label="Add Batch code"
              type="submit"
              color="info"
              @click="submitregcode()"
            />
            </jb-buttons>
            <!-- <jb-buttons>
            <jb-button
              label="Cancel"
              color="white"
              @click="cancel"
                />
                
              </jb-buttons> -->
            <!-- <jb-buttons>
            <jb-button
              label="Pay Directly" color="success" type="addpay"
              @click="addpay()" />
          </jb-buttons> -->
        </level>
      </template>
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
const value = ref(true)
const addpay = (data) =>{
  addpayModalActive.value = true
}
let selected = ref(null);
const hasError = ref(false)

const cardClassAddon = computed(() => hasError.value ? 'animate-shake' : '')
const cancel = () => {
  value.value = false
}

const pageLoading = ref(false)
const submitregcode = async () => {
  if(form.regcode === ""||!form.regcode.replace(/\s/g, '').length)
  {
    hasError.value = true
    theme.pushMessage("Please add the registration code");
  }
  // else if(!form.regcode.replace(/\s/g, '').length){
  //   hasError.value = true
  //   theme.pushMessage("Please add the registration code");
  // }
  else{
    try{
      await user.checkonlines();
    if(online.value===true){
      form.regcode = form.regcode.trim()
      pageLoading.value = true 
      await user.regcode({ "regcode": form.regcode.replaceAll("-",'')});
      if(user.reg_code)
      {

        if(user.reg_code===null){
          theme.pushMessage("You have added invalid Reg code..please add valid Reg code");
          user.reg_code = ""
        }
        else if(user.reg_code==="Batch-code has been added."){
          theme.pushMessage("You have successfully added Reg Code");
          router.push("/");
        }
        else if(user.reg_code==="The Batch-code Does Not Exist."){
          theme.pushMessage("The Batch-code Does Not Exist.");
          router.push("/");
        }
        else if(user.reg_code==="Registration days are done Cant add Batch-Code now."){
          theme.pushMessage("Registration days are done Cant add Batch-Code now.");
          router.push("/");
        }
        else if(user.reg_code==="You Are Trying to Add Closed Batch-code."){
          theme.pushMessage("You Are Trying to Add Closed Batch-code.");
          router.push("/");
        }
        else if(user.reg_code==="Already registered to this Batch."){
          theme.pushMessage("Already registered to this Batch.");
          router.push("/");
        }
        else if(user.reg_code&&user.reg_code.length&&user.reg_code.length>0){

          
            show_course.value=true
            student_course.value=user.reg_code
            user.reg_code = ""
            theme.pushMessage("You have successfully added Reg Code please select the course");
        }
        else{
          router.push("/")
          theme.pushMessage(user.reg_code)
        }

  
      }
      else{
        theme.pushMessage(user.$state.error_regcode);
        user.$state.error_regcode=""
      }
       pageLoading.value = false 
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
      pageLoading.value = false 
    }
      // datas.number.replace(/\s+/g, '')
     
    }
    catch(err){

      theme.pushMessage(user.$state.error_regcode);
      user.$state.error_regcode=""
      pageLoading.value = false 
    }
  }
};
const reg_code = computed(() => {
 return user.reg_code
})

const online = computed(() =>  user.isonline);


onBeforeMount(async() => {
  pageLoading.value = true
  await user.checkUser();
  await user.checkonlines();
 
  if (user.$state.loggedIn===false) {
    router.push("/login");
  }
  else if(user.$state.loggedIn===true){
    if(online.value===true){
      await user.getvalidations();
    if (user.validation_status===200){
    if(user.validation.studentcourse===false){
      router.push("/pay_directly")
    }
    if(user.validation.studentbatch===false){
      router.push("/add_regcode")
    }
    else if(user.validation.other===false){
      router.push("/profile")
    }
    else{
      router.push("/")
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
