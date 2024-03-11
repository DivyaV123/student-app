<script setup>
import { ref,onBeforeMount, computed } from 'vue'
import { useRouter,useRoute } from "vue-router";
import FailedPayment from '@/components/FailedPayment.vue'
import CardComponent from '@/components/CardComponent.vue'
import { sessionStore } from "../stores/session";
import { getdata } from "../stores/user"
const code = getdata()
const user = sessionStore();
const route = useRoute();
const router = useRouter();

onBeforeMount(async () => {
  await user.checkUser();
  if (user.$state.loggedIn===false) {
    router.push("/login");
  }
  
});

const titleStack = ref(['Failed Payments'])

</script>

<template>


      <card-component
      class="mb-6"
      has-table
    >
    
      <failed-payment/>  
    </card-component>
   
</template>
