<script setup>
import {ref} from "vue"
import { mdiCreditCard } from '@mdi/js'
import Level from '@/components/Level.vue'
import JbButton from '@/components/JbButton.vue'
// import Addcontact from '@/components/Addcontact.vue'

// import Emailadd from '@/components/Emailadd.vue'
import Changepass from '@/components/Changepass.vue'
defineProps({
  titleStack: {
    type: Array,
    default: () => []
  },
  values: {
    type: Boolean,
    default: false
  },
})
const changepass = ref(false)
const enableemail=ref(false)
const enablecontact = ref(false)
const wrongdata = ref(false)

    const popupTrigger=ref({
      buttonTrigger:false,
    
    })
    const TogglePop = (trigger) =>{
popupTrigger.value[trigger]=!popupTrigger.value[trigger]
    }


    const popupTrigger1=ref({
      buttonTrigger1:false,
    
    })
    const TogglePop1 = (trigger1) =>{
popupTrigger1.value[trigger1]=!popupTrigger1.value[trigger1]
    }

</script>

<template>
  <section class="p-1">
    <level>
     <ul class=" mr-[452px]">
        <li
          v-for="(title, index) in titleStack"
          :key="index"
          class="title-stack-item inline-block pr-3 text-xl text-yellow-400 last:pr-0 font-extrabold"
        >
        {{ title }}
        </li>
      </ul> 
      <!-- <button @click="enableemail=true" class="   border
           text-green-600
              border-green-600
              rounded-lg
              mt-[18px]
                   h-[29px]
                     mr-[10px]
        
              py-1
              px-3
                  pt-[1px]
              cursor-pointer
              transition_effect
              mb-5">
        Add Email
      </button> -->
      <br>
      <!-- <button @click="enablecontact=true" class="   border
        text-blue-600
              border-blue-600
              rounded-lg
              mt-[18px]
              h-[50px]
              mr-[10px]
              py-1
              px-3
              pt-[1px]
              cursor-pointer
              transition_effect
              mb-5">
        Add Contact
      </button> -->
      <br>
      <!-- <button v-if="values" @click="wrongdata=true" class="   border
              text-red-600
              border-red-600
              rounded-lg
              mt-[18px]
                   h-[29px]
                     mr-[10px]
              
              py-1
              px-3
                  pt-[1px]
              cursor-pointer
              transition_effect
           
              mb-5">
          Wrong Data
      </button> -->
 <!-- <button @click="changepass=true" class=  " border
              text-yellow-600
              border-yellow-600
              rounded-lg
              mt-[18px]
                   h-[29px]
                     mr-[10px]
              py-1
              px-3
                  pt-[1px]
              cursor-pointer
              transition_effect
              mb-5 ">
            Change Password
        </button> -->
 <!-- <section > 
   <Wrongdata v-model="wrongdata" :id="1" has-cancel/> 
</section>   -->
<!-- <section>    
    <Emailadd v-if="enableemail" has-cancel/> 
</section>
<section>    
    <Addcontact v-if="enablecontact" has-cancel/>
</section> -->
<section>
    <Changepass v-model="changepass"  has-cancel />
</section>
    </level>
  </section>
</template>

<style scoped>
li.title-stack-item:not(:last-child):after {
  content: '/';
  @apply inline-block pl-3;
}

#popup{
    position: absolute;
    top:50px;
    left:0;
    right:0;
    bottom: 0px;
    padding-top: 30px;
    
    /* margin-top: 10px; */
    /* margin-left: 100px; */
    /* margin-bottom: 576px; */
    z-index:99;
    background-color: rgba(0,0,0,0.2);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    
}
.popup-inner{
position: relative;
background-color: black;
color: white;
display: flex;
align-items: center;
justify-content: center;
 -webkit-animation: popup-inner 7s ease;
    }
@keyframes popup-inner
{
  0% {
    top: 0%;
  }
  20% {
    top: 20%;;
  }
}
</style>