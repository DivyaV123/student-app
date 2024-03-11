
<template>
  <form-screen-section >
     <div v-if="pageLoading" wire:loading
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
    <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
    <p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
  </div> 
    <card-component
      title="Join New Class"
      class="mt-8 text-orange-500"
    >
      <field label="Batch Code" :error="hasError" help="Please enter Batch code" class="text-white">
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
              @click="submit"
            />
     
          </jb-buttons>
           <jb-buttons class="pl-4">
            <jb-button
              label="Cancel"
              type="submit1"
              color="danger"
              @click="cancel"
            />
     
          </jb-buttons>
        </level>
        <!-- <level mobile>
         
        </level> -->
      </template>
    </card-component>
  </form-screen-section>
  <Courselist v-if="show_course===true" :course_value="student_course" :regcode="route.query.regcode" />  
</template>

<script setup>
import { reactive, ref, computed, onBeforeMount } from 'vue'
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
import { useRouter,useRoute} from "vue-router";
import { getdata } from "../stores/user";
// import { useStorage } from "vue3-storage";
import { themeStore } from "../stores/theme";
import Courselist from  '@/components/Courselist.vue';
// const ls = useStorage();
const router = useRouter();
const route = useRoute();
const user = sessionStore();
const show_course = ref(false)
const theme = themeStore();
const code = getdata();
const student_course=ref([])
const form = reactive({
  regcode: '',
})
const pageLoading = ref(false)
let selected = ref(null);
const hasError = ref(false)

const cardClassAddon = computed(() => hasError.value ? 'animate-shake' : '')

const submit = async () => {
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
      pageLoading.value = true
      await user.checkonlines();
    if(online.value===true){
      user.$state.reg_code=""
    form.regcode = form.regcode.trim()
     
      await user.regcode({ "regcode": form.regcode.replaceAll("-",'')});
      if(user.reg_code)
      {
        if(user.reg_code===null){
          theme.pushMessage("You have added invalid Reg code..please add valid Reg code");
          user.reg_code = ""
          pageLoading.value = false
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
        else if(user.reg_code)
        {
          theme.pushMessage(user.reg_code);
          user.reg_code = ""
          pageLoading.value = false 
        }

      }
      else{

        theme.pushMessage(user.$state.error_regcode);
        user.$state.error_regcode=""
        pageLoading.value = false 
      }
       
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
      pageLoading.value = false 
    }
    }
    catch(err){

      theme.pushMessage(user.$state.error_regcode);
      user.$state.error_regcode=""
      pageLoading.value = false 
    }
  }
};
const online = computed(() =>  user.isonline);

const cancel = async () => {
  router.push("/")
}
onBeforeMount(async() => {
  pageLoading.value = true
  await user.checkonlines();
  theme.setPageTitle("Join New Class")
  await user.checkUser();
  // await user.getstudent();
  if (user.loggedIn===false) {
    if(route.query&&route.query.regcode){
      router.push({ name: "login", query: route.query});
    }
    else{
      router.push("/login");
    }
    
  }
  else if(user.loggedIn===true){
    if(online.value===true){
      await user.getvalidations();
    if (user.validation_status===200){
    if(user.validation.studentcourse===false){
      router.push("/pay_directly")
    }
    if(route.query&&route.query.regcode){
      await user.regcode({ "regcode": route.query.regcode.replaceAll("-",'')});
      if(user.reg_code)
        {
        if(user.reg_code===null){
          theme.pushMessage("You have added invalid Reg code..please add valid Reg code");
          user.reg_code = ""
          router.push("/");
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
        else if(user.reg_code&&user.reg_code.length&&user.reg_code.length>1){

        //   if(user.student_course){
        //     router.push("/profile")
        //     theme.pushMessage("You have successfully added Reg Code")
        //   }
        // else{
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
        router.push("/");
      }

    }
    else{
        if(user.validation.student_course===false){
            router.push("/pay_directly")
          }
          else if(user.validation.student_course===true&&user.validation.studentbatch===false){
            router.push("/add_regcode")
          }
          else{
            router.push("/add_batch")
          }

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
  pageLoading.value=false


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
