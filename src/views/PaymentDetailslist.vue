<script setup>
import { ref,onBeforeMount, computed } from 'vue'
import { useRouter,useRoute } from "vue-router";
import PaymentDetails from '@/components/PaymentDetails.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import { sessionStore } from "../stores/session";
import { getdata } from "../stores/user"
const code = getdata()
const user = sessionStore();
const route = useRoute();
const router = useRouter();
const online = computed(() =>  user.isonline);
onBeforeMount(async () => {
  await user.checkUser();
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

const titleStack = ref(['Payment Details List'])

</script>

<template>

<!-- <title-bar :title-stack="titleStack" /> -->

      <card-component
      class="mb-6"
      has-table
    >
   
      <payment-details  />  
    </card-component>
   
</template>



