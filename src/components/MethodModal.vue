<script setup>
import { computed ,onBeforeMount,ref,reactive} from 'vue'
import { mdiClose } from '@mdi/js'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import CardComponent from '@/components/CardComponent.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import TextLink from '@/components/TextLink.vue'
import Overlay from '@/components/Overlay.vue'
import Field from '@/components/Field.vue'
import Multiselect from '@vueform/multiselect'
import { selectClasses } from '@/selectcss.js'
import { themeStore } from "../stores/theme"
import { sessionStore } from "../stores/session";
import { studentStore } from "../stores/student"
import dayjs from 'dayjs';
import Control from "@/components/Control.vue";
const student = studentStore()

const theme = themeStore();
const online = computed(() =>  user.isonline);
const user = sessionStore();
const pageLoading = ref(false)
onBeforeMount(async () => { 
  pageLoading.value = true
  await user.checkonlines();
  if(online.value===true){


  user.getstudentcoursess();
  user.getvalidations();
  }
  else{
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  }
  pageLoading.value = false
  // user.getstudent()

});

const gateway = computed(() => student.gateway)

const props = defineProps({
    pmethod: Object,
  title: {
    type: String,
    default: null
  },
  largeTitle: {
    type: String,
    default: null
  },
  shake: Boolean,
  hasCancel: Boolean,
  textLinkLabel: {
    type: String,
    default: null
  },
  textLinkIcon: {
    type: String,
    default: null
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  }
})
const same_as_above = ref(false)

const checkboxOptions = { true: "Yes I have read all the terms and conditions and accepted it" };
const lightBorderStyle = computed(() => theme.lightBorderStyle)

const lightBgStyle = computed(() => theme.lightBgStyle)

const tableTrStyle = computed(() => theme.tableTrStyle)

const tableTrOddStyle = computed(() => theme.tableTrOddStyle)

const darkMode = computed(() => theme.darkMode)

const paymentmethod = computed(() => props.pmethod)


const option = ref("")
const amount = ref("")

const haserror = ref(false)
const haserror1 = ref(false)
const show_terms=ref(false)
const cardClassAddon = computed(() => haserror.value ? 'animate-shake' : '')

const createOrder = async () => {
  // console.log("inisde create order")
  pageLoading.value = true
  let razorpayScript = document.createElement("script");
  // console.log("razorpayScript",razorpayScript)
  razorpayScript.setAttribute(
    "src",
    "https://checkout.razorpay.com/v1/checkout.js"
  );
  document.head.appendChild(razorpayScript);
  // console.log("document.head.appendChild(razorpayScript);",document.head.appendChild(razorpayScript))


  try {
    await user.checkonlines();
    if(online.value===true){
      await student.getOrders({
      "amount":parseInt(amount.value),
      "currency":"INR",
      "name":user.validation.name,
      "number":user.studentcontact,
      "email":user.studentemail,
      "course":props.pmethod.id,
      "student_id":user.validation.id
      
    });

    if (student.$state.update) {
      let orders = student.update;
      var options = {
        key: orders.data.merchant_key,
        amount: orders.data.amount,
        currency: orders.data.currency,
        name: props.pmethod.branch.branchname,
        order_id: orders.data.order_id,
        theme: {
          color: "#333333",
          hide_topbar: false,
        },
        modal: {
          confirm_close: true,
          escape: false,
          handleback: true,
        },
        prefill: {
          name: orders.data.name,
          email: orders.data.email,
          contact: orders.data.number,
        },
        readonly: {
          email: true,
          contact: true,
        },
        send_sms_hash: true,
        handler: async function (response) {
        student.paymentVerification(JSON.stringify({
        "opid":orders.data.opid,
        "cid":props.pmethod.id, 
        "sid":user.user.uid,
        "response": {
                  "razorpay_payment_id": response.razorpay_payment_id,
                  "razorpay_order_id": response.razorpay_order_id,
                  "razorpay_signature": response.razorpay_signature
              },
        "amount": parseInt(amount.value),
        "type": "online",
        "branch": props.pmethod.branch.branchid,
        "location":"same_location", 
        "date": dayjs(new Date()).format("YYYY-MM-DD h:mm:ss")
      }));

        if(student.validate){
            await user.getvalidations();
            await user.getstudentcoursess();
            await user.getstudentpayments();

          }
      theme.pushMessage("Payment Successful");
          
        },
      };
      var rzp1 = new Razorpay(options);
      rzp1.open();
      rzp1.on("payment.failed", function (response) {
        student.failurepaymentVerification(JSON.stringify({
          "opid":orders.data.opid,
          "response": {
                      "code": response.error.code,
                      "description": response.error.description,
                      "source": response.error.source,
                      "step": response.error.step,
                      "reason": response.error.reason,
                      "order_id": response.error.metadata.order_id,
                      "payment_id": response.error.metadata.payment_id,
                  },
        }));
        theme.pushMessage("Payment Failed");
      });
    } else {
      theme.pushMessage(student.$state.error);
      await student.removeError();
    }
    pageLoading.value = false
  }
    
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
      pageLoading.value = false
    }
    // if(partial.value===true){
      
    // }
    // else{
    //   await student.getOrders({
    //   "amount":props.pmethod.oneshot_balance,
    //   "currency":"INR",
    //   "name":user.studentname,
    //   "number":user.studentcontact,
    //   "email":user.studentemail
    // });
      
    // }
    
   
  } catch (error) {
    pageLoading.value = false

  }
};

const submit = async () => {
  let valid = true
  pageLoading.value = true
  await user.checkonlines();

  // console.log("amount.value.length",amount.value.length)
  if(online.value===true){
      if(amount.value === ""||parseInt(amount.value)<=0||!amount.value.replace(/\s/g, '').length||isNaN(amount.value)){
          haserror1.value = "This field is required"
          theme.pushMessage("Please enter the amount that you want to pay")
        }
      // else if(parseInt(amount.value)<=0){
      //   haserror1.value = "This field is required"
      //   theme.pushMessage("Please enter the amount that you want to pay")
      // }
      else if(amount.value.length>=7){
        // haserror1.value = "This field is required"
        theme.pushMessage("Please enter the valid amount!!")
      }
      // else if(!amount.value.replace(/\s/g, '').length){
      //   haserror1.value = "This field is required"
      //   theme.pushMessage("Please enter the amount that you want to pay")
      // }
      // else if(isNaN(amount.value)){
      //   haserror1.value = "This field is required"
      //   theme.pushMessage("Please enter the amount that you want to pay")
      // }
      else{

        cancel();
        createOrder();
          
      }
      pageLoading.value = false
  }
  else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
      pageLoading.value = false
    }
    
  
}


const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const confirmCancel = mode => {
  value.value = false
  emit(mode)
}

const terms = async (datas) => { 

  if(datas===true){
    show_terms.value=true   
  }
  else{
    show_terms.value=false 
  }
         
   
};
const confirm = () => confirmCancel('confirm')

const cancel = () => confirmCancel('cancel')
</script>

<template>
  <overlay
    v-show="value"
    @overlay-click="cancel"
  >
  <div v-if="pageLoading" wire:loading
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
    <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
    <p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
  </div>
  <card-component
      :title="title"
      class="shadow-lg w-full max-h-modal sm:w-3/5 md:w-1/2 xl:w-1/2 z-50 height-modal xl:h-auto items1 h-[440px]"
      :class="{ 'animate-shake': shake }"
      :header-icon="mdiClose"
      modal
      @header-icon-click="cancel"
    >
    <div 

    >
      <div class="space-y-3">
        <h1
          v-if="largeTitle"
          class="text-2xl"
        >
          {{ largeTitle }}
        </h1>
        <slot />
      </div>


       <div>
       <field class="mt-2 text-green-300"  >    
         <div>
              <span class="label-text pr-1 text-white font-bold">If Partial Payment then amount is <span class="label-text pr-1 text-orange-500 font-bold">{{props.pmethod.partial_balance}}</span></span> 
         </div>
         <div v-if="props.pmethod.booleans.disable_one_shot_pay===false">
              <span class="label-text pr-1 text-white font-bold">If OneShot Payment then amount is <span class="label-text pr-1 text-orange-500 font-bold"> {{props.pmethod.oneshot_balance}}</span></span>
         </div> 
      </field>

      <field label="Amount" class="text-white text-sm " :error="haserror1">
            <control
            v-model="amount"
            :icon-right="mdiAccount"
            name="URL"
            placeholder="Enter the amount here"
            autocomplete="username"
            />
        </field>

           <div class="space-y-3">
            <h1
              class="text-2xl text-red-700 font-semibold"
            >
              {{ "Terms and conditions" }}
            </h1>
            <slot />
          </div>
          <div class="text-white  text-sm">
              {{"1"}}.{{"Payment will be confirmed once bank approves the transaction"}}<br>
              {{"2"}}.{{"By accepting this receipt I accept all terms and conditions"}}<br>
              {{"3"}}.{{"Payment is valid for 6 months"}}<br>
              {{"4"}}.{{"Please keep the receipt safe till completion of the course"}}<br>
              {{"5"}}.{{"The receipt is not transferable"}}<br>
              {{"6"}}.{{"Complete Fees is charged only for training not for placement activities"}}<br>
              {{"7"}}.{{"Fees paid will not be refundable if student quits the course before completion"}}<br>
              {{"8"}}.{{"Fees is not for interview we provide"}}<br>

          </div>
      </div>
          <div class="pt-4">
        

          

          <!-- <jb-buttons v-if="show_terms===false">
            
            <jb-button
              label="Yes I have read all the terms and conditions and accepted it"
              color="info"
              type="terms"
              @click="terms"
            />
          </jb-buttons> -->

          <field 
          class="
            text-white text-sm
          "
        >
          <check-radio-picker
            v-model="same_as_above"
            name="checkbox2"
            id="myCheckbox"
            class="font-bold "
            :options="checkboxOptions"
            column
            :onchange="terms(same_as_above)"
          />
        </field>

          <jb-buttons v-if="show_terms===true">
            
            <jb-button
              label="Pay"
              color="info"
              type="submit1"
              class="w-full font-bold"
              @click="submit"
            />
          </jb-buttons>

          <jb-buttons v-if="show_terms===false">
            
            <jb-button
              label="Pay"

              type="submit1"
              class="w-full font-bold dark:bg-gray-800 text-white hover:bg-gray-800"
            />
          </jb-buttons>
          </div>

          


  
    </div>

     <card-component v-if="show_terms===true"
      :class="{ 'animate-shake': shake }"
    
    >
   



        <template #footer>
        <level mobile>
          

          
        </level>
      </template>

  
    </card-component>
  </card-component>
  </overlay>
</template>

<style>
.height-modal{
  max-height: calc(100vh - 30px) !important;
}
.items1 {
  overflow-y: auto !important;;
}
</style>
