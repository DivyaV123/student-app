<script setup>
import { ref,onBeforeMount, computed } from 'vue'
import { useRouter,useRoute } from "vue-router";
import PaymentCourse from '@/components/PaymentCourse.vue'
import CardComponent from '@/components/CardComponent.vue'
import { sessionStore } from "../stores/session";
import { themeStore } from "../stores/theme"
import { getdata } from "../stores/user"
const code = getdata()
const user = sessionStore();
const route = useRoute();
const router = useRouter();
const pageLoading = ref(false)
const theme = themeStore();
const online = computed(() =>  user.isonline);
onBeforeMount(async () => {
  pageLoading.value = true
  await user.checkUser();
  theme.setPageTitle("Course Details")
  if (user.$state.loggedIn===false) {
    router.push("/login");
  }
  else{
    await user.checkonlines();
    if(online.value===true){
    await user.getvalidations();
    if (user.validation_status===200){
    if(user.validation.studentcourse===false){
      router.push("/pay_directly")
    }
    else{
      router.push("/paymentcourselist");
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

<template>
<section class="p-3">
      <card-component
      has-table
    >
   
      <payment-course  />  
    </card-component>
</section>
   
</template>



