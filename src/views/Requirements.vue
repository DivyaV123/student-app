<script setup>
import { onBeforeMount, computed, onMounted, ref } from "vue";
import Addrequirement from "@/components/Addrequirement.vue";
import HeroBar from "@/components/HeroBar.vue";
import CardComponent from "@/components/CardComponent.vue";
import { themeStore } from "../stores/theme";
import { useRouter } from "vue-router";
import { sessionStore } from "../stores/session";

const user = sessionStore();
const theme = themeStore();
const router = useRouter();
const online = computed(() =>  user.isonline);

const pageLoading = ref(false)

const enqsCount = computed(() => {
  return user.branchesdata;
});
onMounted(async () => {
  if (!user.loggedIn) {
    router.push("login");
  }
});


onBeforeMount(async () => {
  await user.checkonlines();
  theme.setPageTitle("Requirements")
  pageLoading.value = true
  window.scrollTo(0, 0);
  await user.checkUser();
  if (user.$state.loggedIn === false) {
    router.push("/login");
  } 
  else{
    if(online.value===true){
      await user.getvalidations();
    if (user.validation_status===200){
    if(user.validation.studentcourse===false){
      router.push("/pay_directly")
    }
    else if(user.validation.studentcourse===true&&user.validation.studentbatch===false){
      router.push("/add_regcode")
    }
    await user.getrequirements(1,user.user.uid);
    
    // else if(user.validation.other===false){
    //   router.push("/profile")
    // }
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
 

  // await batch.getmybatches(currentPage.value-1, params);



  // window.onpopstate = (event) => {
  //   router.push("/");
  //   location.reload();
  // };
  pageLoading.value = false
});
</script>

<template>
 <card-component :smallerPadding="true"  v-if="pageLoading" class="mb-6">
  <div wire:loading class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
	<div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
	<h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
	<p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
</div>
 </card-component>
  <card-component  class="mb-4 bg-gray-100">
    <Addrequirement />
  </card-component>
  <!-- <card-component v-else >
    <h5  class="text-red-400 text-2xl font-bold">{{ "You have not assigned to any batches yet!!" }}</h5>
  </card-component> -->
</template>
