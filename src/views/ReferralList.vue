<script setup>
import { ref,onBeforeMount, computed } from 'vue'
import { useRouter,useRoute } from "vue-router";
import ReferredList from '@/components/ReferredList.vue'
import CardComponent from '@/components/CardComponent.vue'
import { sessionStore } from "../stores/session";
import { getdata } from "../stores/user"
import { themeStore } from "../stores/theme"
const code = getdata()
const user = sessionStore();
const route = useRoute();
const router = useRouter();
const theme = themeStore();
const online = computed(() =>  user.isonline);

onBeforeMount(async () => {
  theme.setPageTitle("Refered Friend List")
  await user.checkUser();
  await user.checkonlines();
 
  if (user.$state.loggedIn===false) {
    router.push("/login");
  }
  else{
   
  
    // if(online.value===true){
      await user.getvalidations();
    if (user.validation_status===200){
    await user.getstudent()
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
      router.push("/referrallist");
    }
    }
    else{
      await user.logout()
      router.go()

    }
    // }
    // else{
    //   theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    // }
   
  }

});


</script>
<template>
      <card-component v-if="user.refer_data"
      class="mb-6"
      has-table
    >
      <referred-list />  
    </card-component>
    <card-component v-else>
    <h5  class="text-red-500 text-2xl font-bold">{{ "You have not referred anyone yet!!" }}</h5>
  </card-component>
   
</template>
