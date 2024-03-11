<template>
<div class="scroll">
   <personal-form v-if="showPersonal===true"/>
   <education-form v-if="showEducation===true"/>
   <experience-form v-if="showExperience===true"/>
   <otherdetails-form v-if="showOthers===true"/>
   <Imageupload  v-if="showImage===true"/>
  </div>

</template>

<script setup>
import { computed, ref, onBeforeMount } from 'vue'
import {
  mdiForwardburger,
  mdiBackburger,
  mdiClose,
  mdiDotsVertical,
  mdiMenu,
  mdiClockOutline,
  mdiCloud,
  mdiCrop,
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiHelpCircleOutline,
  mdiBell,
  mdiThemeLightDark,
  mdiBookEducationOutline,
  
} from '@mdi/js'
// import { useStorage } from "vue3-storage";
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import NavBarItem from '@/components/NavBarItem.vue'
import NavBarItemLabel from '@/components/NavBarItemLabel.vue'
import PersonalForm from '@/components/PersonalForm.vue'
import OtherdetailsForm from '@/components/OtherdetailsForm.vue'
import NavBarMenu from '@/components/NavBarMenu.vue'
import Divider from '@/components/Divider.vue'
import EducationForm  from '@/components/EducationForm.vue'
import ExperienceForm  from '@/components/ExperienceForm.vue'
import Imageupload  from '@/components/Imageupload.vue'
// import UserAvatar from '@/components/UserAvatar.vue'
import Icon from '@/components/Icon.vue'
import NavBarSearch from '@/components/NavBarSearch.vue'
import { themeStore } from "../stores/theme"
import { sessionStore } from "../stores/session";
// import { notify } from "@kyvg/vue3-notification";
import { useRouter } from "vue-router";
import Logout from '@/components/Logout.vue'
const theme = themeStore();
const user = sessionStore();
const router = useRouter();
const showPersonal = ref(false)
const showEducation = ref(false)
const showOthers = ref(false)
const showImage = ref(false)
const showExperience = ref(false)
const fresher_exper = ref("");
// const ls = useStorage();
const other_value = ref(null)
const logout=ref(false);

const redirect = ()=>{
  if(user.validation.personal===false&&user.validation.image===false){
        showImage.value=true
    }
    else if(user.validation.personal===false&&user.validation.image===true){
      showPersonal.value=true
    }
    else if(user.validation.education===false&&user.validation.personal===true&&user.validation.fresherexp.name=='fresher'){

      showEducation.value=true
    }
    else if(user.validation.personal===true&&user.validation.fresherexp&&user.validation.fresherexp.name=='experienced'&&user.validation.experience===false&&user.validation.education===false){
      // console.log("inside education")

      showEducation.value=true
    }
    else if(user.validation.personal===true&&user.validation.fresherexp&&user.validation.fresherexp.name=='experienced'&&user.validation.experience===false&&user.validation.education===true){

      showExperience.value=true
    }
    else if(user.validation.personal===true&&user.validation.fresherexp&&user.validation.fresherexp.name=='experienced'&&user.validation.experience===true){
      showOthers.value=true
    }
    else if(user.validation.personal===true&&user.validation.fresherexp&&user.validation.fresherexp.name=='fresher'&&user.validation.education===true){
      showOthers.value=true
    }


 
}
const isAsideRightActive = computed(() => theme.isAsideRightActive)

const isNavBarVisible = computed(() => !theme.isFormScreen)

const isAsideMobileExpanded = computed(() => theme.isAsideMobileExpanded)

const isAsideCompact = computed(() => theme.isAsideCompact)

const isAsideHiddenLayout = computed(() => theme.isAsideHiddenLayout)

const online = computed(() =>  user.isonline);


onBeforeMount(async () => {
  await user.checkonlines();
  theme.setPageTitle("Add Placement Form")
  await user.checkUser();
  if (user.$state.loggedIn===false) {
    router.push("/login");
  }
  else{
    if(online.value===true){
      await user.getvalidations();
      // console.log("user.validation_status",user.validation_status)
      if (user.validation_status===200){
      if(user.validation.studentcourse===false){
      router.push("/pay_directly")
    }
      if(user.validation.personal===false&&user.validation.image===false){
        showImage.value=true
      }
      else if(user.validation.personal===false&&user.validation.image===true){

        showPersonal.value=true
      }
      else if(user.validation.education===false&&user.validation.personal===true&&user.validation.fresherexp&&user.validation.fresherexp.name=='fresher'){

        showEducation.value=true
      }
      else if(user.validation.personal===true&&user.validation.fresherexp&&user.validation.fresherexp.name=='experienced'&&user.validation.experience===false&&user.validation.education===false){
        // console.log("inisde education")

        showEducation.value=true
      }
      else if(user.validation.personal===true&&user.validation.fresherexp&&user.validation.fresherexp.name=='experienced'&&user.validation.experience===false&&user.validation.education===true){

        showExperience.value=true
      }
      else if(user.validation.personal===true&&user.validation.fresherexp&&user.validation.fresherexp.name=='experienced'&&user.validation.experience===true){
        showOthers.value=true
      }
      else if(user.validation.personal===true&&user.validation.fresherexp&&user.validation.fresherexp.name=='fresher'&&user.validation.education===true){
        showOthers.value=true
      }
      else if(user.validation.other===true){
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
  

 
});
</script>
