<template>
  <div v-if="pageLoading" wire:loading
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
    <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
    <p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
  </div>
<div>
   <!-- <div class="grid md:grid-cols-6 gap-2">
      <field>
         <control
    placeholder="Search here"
    v-model="searchdata.name"
    class=" "
    />   
      </field>
        
    </div> -->
    <table class=" mt-4">
        <thead class="sticky top-[63px] z-[9] bg-gray-900">

      <tr>
        <th>Name</th>
        <th>Mobile Number</th> 
      </tr>
    </thead>
    <tbody>
    
    <tr
        v-for="(data, index) in itemsPaginated"
        :key="data.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']" 
    >
    
        <td data-label="Name">
          <small class="font-bold">
              <jb-button color="info" :icon="mdiAccount" small />
            {{data.name}}  
          </small>
        </td>

        <td data-label="Mobile Number">
          <small class="font-bold">
            <jb-button color="light" :icon="mdiPhone" small />
          {{ data.number }}
          </small>
        </td>

      </tr>
    </tbody>
  </table>
  </div>

</template>


<script setup>
import { computed, ref,onBeforeMount,reactive} from 'vue'
import { mdiPhone,mdiAccount } from '@mdi/js'
import { useRouter,useRoute } from "vue-router";
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import Icon from '@/components/Icon.vue'
import { themeStore } from "../stores/theme"
import { sessionStore } from "../stores/session";
import { getdata } from "../stores/user"
import { studentStore } from "../stores/student"
import Control from '@/components/Control.vue'

const code = getdata()
const stud = studentStore();
const online = computed(() =>  user.isonline);

const route = useRoute();
const user = sessionStore();
const theme = themeStore();
const pageLoading = ref(false)
const perPage = 25;

const itemsPaginated = computed(() => 
{
if(searchByName.value.length > 0){
   user.checkonlines();
    if(online.value===true){
          return user.refer_data.filter(val => val.name.includes(searchByName.value) ||  val.number.includes(searchByName.value) );
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }  
  }
    else{
        if(user.refer_data){
         user.checkonlines();
         if(online.value===true){
            return user.refer_data
         }
          else{
              theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
            }
          }
          }

})

onBeforeMount(async () => {

  pageLoading.value = true
  await user.checkonlines();
  if(online.value===true){
    theme.setPageTitle("Refered Friend List")
    await user.getstudent();
  }
  else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
    pageLoading.value = false
});
const searchByName = computed(() => searchdata.name)
const lightBorderStyle = computed(() => theme.lightBorderStyle)

const lightBgStyle = computed(() => theme.lightBgStyle)

const tableTrStyle = computed(() => theme.tableTrStyle)

const tableTrOddStyle = computed(() => theme.tableTrOddStyle)

const darkMode = computed(() => theme.darkMode)

const currentPage = ref(1)

const numPages = computed(() => Math.ceil(itemsCount.value / perPage));

const pagesList = computed(() => {
  const numShown = ref(10)
  for (let i = 1; i <= numPages.value; i++) {
    const num = Math.min(numShown.value,numPages.value);
    let first = currentPage.value - Math.floor(num / 2);
        first = Math.max(first, 1);
        first = Math.min(first, numPages.value - num + 1);
    return [...Array(num)].map((k,i) => i + first)     
  }
})

const pageChange =(page) => {
  currentPage.value = page;
}
const searchdata = reactive({
      name: '',
})
</script>



