<template>
  <card-component :smallerPadding="true" v-if="pageLoading" class="mb-6">
    <div wire:loading
      class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
      <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
      <p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
    </div>
  </card-component>
  <form-screen-section bg="login" promo>
    <card-component class="lg:w-2/4 xl:w-1/3 sm:w-4/5 w-full text-orange-500" :icon="mdiLogin" title="Login">
      <div class="flex ">
        <!-- <div  v-if="isnumber===true" class="flex-none w-32 pr-2"> 
             <field label="country code" :error="hasError2" help="Select country code" class="text-sm">
                <Multiselect
                  v-model="selected"
                  :searchable="true"
                  valueProp = "code"
                  label="code"
                  :classes="selectClasses"
                  :options="codes"
                  :object="true"
                />
            </field>  
          </div> -->
        <div class="shrink w-full h-max">
          <div>
            <field label="Email or Mobile number" :error="hasError2" class="text-sm">
              <control v-model="form.username" :error="hasError" name="email" :icon-right="mdiAccount" class="text-xs"
                autocomplete="username" placeholder="Enter your Email or Mobile number"
                :onchange="nanfunc(form.username)" />
            </field>
          </div>
          <div class="pt-8">
            <field :error="hasError1" label="Password" class="text-sm">
              <control v-model="form.password" :icon-right="oldPassShowHideClicked ? mdiEyeOff : mdiEye" type="password"
                name="password" class="text-xs" placeholder="Enter your password" @right-icon-click="oldToggleEye" />
            </field>
          </div>

        </div>


      </div>

      <template #footer>
        <div class="flex justify-between items-center mb-1">

        </div>
        <jb-buttons>
          <jb-button cl label="Login" type="submit" color="info" @click="login" class="font-medium text-base w-full" />
        </jb-buttons>
        <div
          class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
          <p class="text-center font-semibold mx-4 mb-0">OR</p>
        </div>
        <field help="Click here if you haven't registered">
          <jb-buttons>
            <jb-button label="Register" type="login" class="font-bold text-sm w-full" color="success" @click="submit" />
          </jb-buttons>
        </field>
        <!-- <field help="Contact 8951965476 if blocked" > -->
        <jb-buttons>

          <jb-button label="Forgot Password?" class="font-bold text-sm w-full" color="light" @click="resendmobile" />
        </jb-buttons>
        <div class="flex justify-end items-center pt-2">
            <jb-buttons>
            
          <jb-button label="Help" class="font-bold text-sm w-full" :icon="mdiAccountQuestion" color="help" @click="viewhelp()" />
            </jb-buttons>


        </div> 
         <!-- <jb-buttons> -->

        <!-- </field> -->
      </template>
      <!-- <jb-button
              label="Forgot Password?"
              class="font-bold text-sm w-full"
              color="light"
              @click="resendmobile"
            /> -->

    </card-component>

  </form-screen-section>
  <ForgotPassOptions v-if="isresendmobile === true" v-model="isresendmobile" />
  <Viewhelp v-if="helpviews===true" v-model="helpviews" has-cancel />
  <!-- <Courselist v-if="show_course===true" :course_value="student_course" :regcode="route.query.id" />  -->
</template>

<script setup>
import FormScreenSection from "@/components/FormScreenSection.vue";
import CardComponent from "@/components/CardComponent.vue";
import { reactive, ref, computed, onBeforeMount } from "vue";
import { mdiEmail, mdiPhone, mdiEyeOff, mdiEye, mdiAccountQuestion, mdiAccount, mdiLogin } from "@mdi/js";
import Field from "@/components/Field.vue";
import Control from "@/components/Control.vue";
import JbButton from "@/components/JbButton.vue";
import Level from "@/components/Level.vue";
import JbButtons from "@/components/JbButtons.vue";
import ForgotPassOptions from "@/components/ForgotPassOptions.vue";
import { sessionStore } from "../stores/session";
import { useRouter, useRoute } from "vue-router";
import { themeStore } from "../stores/theme";
// import VerifyOTP from "@/components/VerifyOTP.vue";
import Multiselect from "@vueform/multiselect";
import { selectClasses } from "@/selectcss.js";
import Viewhelp from '@/components/Viewhelp.vue'
import Courselist from '@/components/Courselist.vue';

const online = computed(() => user.isonline);

const router = useRouter();
const user = sessionStore();
const route = useRoute();
const theme = themeStore();
const pageLoading = ref(false)
const form = reactive({
  username: "",
  number: "",
  password: "",
  regcode: ""
});
const helpviews = ref(false)

const viewhelp = async(data) =>{
  helpviews.value=true

}
const courseshow = ref(false);
const captcha = ref(false);
const fresher = ref(null);
const reg_code = ref("");
const datassss1 = ref(null);
const hasError = ref(false);
const hasError1 = ref(false);
const hasError2 = ref(false);
const showForgot = ref(false);
const isnumber = ref(false);
const islogin = ref(false);
const isresendmobile = ref(false);
const isresendemail = ref(false);
const sendemail = ref(false);
const loginsubmit = ref(false);
const reg = ref(false);
const counts = ref(0);
const countss = ref(0);
const cardClassAddon = computed(() => (hasError.value ? "animate-shake" : ""));
const oldPassShowHideClicked = ref(true)
const show_course = ref(false)
// const student_course=ref([])

const oldToggleEye = () => {
  return (oldPassShowHideClicked.value = !oldPassShowHideClicked.value);
}
const submit = async () => {
  if (route.query && route.query.id) {
    router.push({ name: "Registration", query: route.query });
  }
  else {
    router.push("/registration");
  }

};



const login = async () => {
  if (isnumber.value === false) {
    form.username = form.username.trim()
  }
  if (form.username === "") {
    hasError.value = "This field is required";
  }
  else if (isnumber.value === true && (form.username.length != 10||/\s/g.test(form.username))) {
    hasError.value = "Please add valid contact number";
  } 
  // else if (isnumber.value === true && /\s/g.test(form.username)) {
  //   hasError.value = "Please add valid contact number";
  // }
  else if (form.password === "") {
    hasError1.value = "Please enter your password to login";
    theme.pushMessage("Please enter your password to login")
  } else {
    try {
      pageLoading.value=true
      await user.checkonlines();
      if (online.value === true) {
        if (isnumber.value === true) {
          if (route.query && route.query.id) {
            await user.login({ contact: form.username, password: form.password, regcode: route.query.id.replaceAll("-", '') });
          }
          else {
            await user.login({ contact: form.username, password: form.password, regcode: form.regcode.replaceAll("-", '') });
          }
        } else if (isnumber.value === false) {
          if (route.query && route.query.id) {
            await user.login({ email: form.username, password: form.password, regcode: route.query.id.replaceAll("-", '') });
          }
          else {
            await user.login({ email: form.username, password: form.password, regcode: form.regcode.replaceAll("-", '') });
          }
        }
        if (user.loggedIn === true) {
          theme.pushMessage("You have logged in successfully");
          await user.getvalidations();
          if (user.validation.studentcourse === false) {
            router.push("/pay_directly");
          }
          else if (user.validation.studentcourse === true && user.validation.studentbatch === false) {
            router.push("/add_regcode");
          }
          // else if(user.validation.studentcourse===true&&user.validation.studentbatch===true&&user.validation.other===false){
          //   router.push("/profile");
          // }
          else {
            router.push("/");
          }
          pageLoading.value=false
        }
        else if (user.loginError) {
          theme.pushMessage(user.loginError)
          pageLoading.value=false
        }
      }
      else {
        theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
        pageLoading.value=false
      }

    } catch (err) {
      theme.pushMessage("Something went wrong");
      pageLoading.value=false
    }
  }
};

const resendmobile = async () => {
  isresendmobile.value = true;
};





const nanfunc = async () => {

  
  form.username=form.username.trim()
  isnumber.value = false;
  if (form.username && !isNaN(form.username) && !/\s/g.test(form.username)) {
    isnumber.value = true;
    if (form.username.length === 1) {
      hasError.value = false
    }
    else if ( isNaN(form.username)) {
      hasError.value = "Please enter valid Contact Number"
    }
    else {
      hasError.value = false
    }
  } else if (isNaN(form.username)) {
   
    
    form.username = form.username.trim()
    isnumber.value = false;
    if (form.username.length === 1) {
      hasError.value = false
    }
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.username)) {
      hasError.value = "Please enter valid Email ID"
    }
    else {
      hasError.value = false
    }
  }

};
onBeforeMount(async () => {
  pageLoading.value = true
  await user.checkonlines();
  theme.formScreenToggle(true);
  if (user.loggedIn === false) {
    if (route.query && route.query.id) {
      router.push({ name: "login", query: route.query });
    }
    else {
      router.push("/login");
    }

  }
  else {
    router.push("/");
  }
  pageLoading.value = false


});
</script>

<style>
.hello {
  width: 100%;
}

.modal-card-body {
  overflow-y: auto;
  -ms-overflow-style: none;
}

.form-screen body {
  padding: 0 !important;
}
</style>
