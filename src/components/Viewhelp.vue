<script setup>
import { computed ,ref,reactive,onBeforeMount,watch} from 'vue'
import { mdiAccount, mdiEyeOff, mdiEmail, mdiPhone, mdiFinance, mdiBriefcaseVariant, mdiCalendarToday, mdiCameraSwitch, mdiPlusCircle, mdiBroadcast} from '@mdi/js'
import { mdiClose } from '@mdi/js'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import CardComponent from '@/components/CardComponent.vue'
import Level from '@/components/Level.vue'
import TextLink from '@/components/TextLink.vue'
import Overlay from '@/components/Overlay.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import { sessionStore } from "../stores/session";
import { useRouter } from "vue-router";
import { themeStore } from "../stores/theme"
import VueQrcode from 'vue-qrcode'
import ItemBox from '@/components/ItemBox.vue'
import dayjs from 'dayjs';
const theme = themeStore();
const router = useRouter();
const user = sessionStore();


const props = defineProps({
  title: {
    type: String,
    default: null
  },
  id: {
    type: Number,
    default: null
  },
  largeTitle: {
    type: String,
    default: null
  },
  button: {
    type: String,
    default: 'success'
  },
  buttonLabel: {
    type: String,
    default: 'submit'
  },
  shake: Boolean,
  hasCancel: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  }
})
const onDecode = ref(false)
const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const confirmCancel = mode => {
  value.value = false
  emit(mode)
}


var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
// var day = dateObj.getUTCDate();
// var year = dateObj.getUTCFullYear();
var newdate = dayjs(dateObj).format("YYYY-MM-DD")
// var newdate = year + "-" + month + "-" + day;
const values = ref(null)
values.value=props.id+"/"+newdate+"/"+"student"
const cancel = () => {
  value.value = false

}
const student_value = ref([])
const show_value = ref(false)
const hasError = ref(false)

const form = reactive({
  type_of_attendnace: ref(null),

})
const date = new Date()
const pageLoading = ref(false)

onBeforeMount(async () => {
  pageLoading.value=true

  pageLoading.value=false

})
const names = user.$state.scanned_data



// window.onpopstate = event => {
//             router.push("/");
//         }; 
const passShowHideClicked = ref(true)

</script>
<template>
<div v-if="pageLoading" wire:loading
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
    <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
    <p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
  </div>
  <overlay @overlay-click="cancel" v-show="value" >
   <!-- <div class="grid md:grid-cols-3 xl:grid-cols-5 sm:grid-cols-2 gap-1"> -->
      <!-- <div class="xl:flex xl:flex-col xl:col-span-3 mb-6 xl:mb-0">  -->
        <!-- <card-transaction-bar
          v-for="(transaction,index) in transactionBarItems"
          :key="index"
          :amount="transaction.amount"
          :date="transaction.date"
          :business="transaction.business"
          :type="transaction.type"
          :name="transaction.name"
          :account="transaction.account"
        /> -->
       <!-- </div>  -->
      <!-- <card-component
        title="Overview"
        :icon="mdiFinance"
        :header-icon="mdiCog"
        footer
      > -->
       <card-component  title="Help numbers for contact!!" class="shadow-lg max-w-modal max-h-modal  z-50  items1" :header-icon="mdiClose" modal @header-icon-click="cancel">


      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 p-6">

      <div class="text-center bg-gray-900 relative  border border-gray-600 shadow-md shadow-red-500"  >
        <item-box
          title="Contact below numbers if you are blocked "
          value="8951939012"
          value1="8951965476"
          bool_var="1"
          :icon="mdiBriefcaseVariant"
          icon-type="info"
          divider
        />
      </div>
       <div class="text-center bg-gray-900 relative  border border-gray-600 shadow-md shadow-orange-300"  >
              <item-box
          title="Contact below numbers for Technical issue Related Information"
          value="9972068008"
          value1="8951966085"
          bool_var="2"
          :icon="mdiCalendarToday"
          icon-type="warning"
          divider
        />
       </div>

       <div class="text-center bg-gray-900 relative  border border-gray-600 shadow-md shadow-blue-500"  >
              <item-box
          title="Contact below numbers for Course Related Information"
          value="8951965086"
          value1="8951965092"
           bool_var="3"
          value2="9900018030"
          :icon="mdiCameraSwitch"
          icon-type="danger"
        />
       </div>

       <div class="text-center bg-gray-900 relative  border border-gray-600 shadow-md shadow-green-500"  >
              <item-box
          title="Contact below numbers for HR related queries"
          value="8951965085"
          value1="9686959546"
          value2="8951938858"
          bool_var="4"
          value3="7338667464"
          :icon="mdiCameraSwitch"
          icon-type="danger"
        />
       </div>

      </div>
    <!-- </div> -->
      </card-component>
    <!-- </div> -->
  </overlay>
</template>

<style>
.qr-size{
  width: 250px !important;
    height: 250px !important;
    position: relative;
    z-index: 99;
    margin: 0 auto !important;
    
}
.items1 {
  overflow-y: auto !important;;
}
</style>


