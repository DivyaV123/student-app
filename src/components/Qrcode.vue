<script setup>
import { computed ,ref,reactive,onBeforeMount,watch} from 'vue'
import { mdiAccount, mdiEyeOff, mdiEmail, mdiPhone} from '@mdi/js'
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
  pageLoading.value = true
  await user.checkUser()
  pageLoading.value = false

})
const names = user.$state.scanned_data



// window.onpopstate = event => {
//             router.push("/");
//         }; 
const passShowHideClicked = ref(true)


</script>
<template>
  <overlay @overlay-click="cancel" v-show="value" >
   <card-component  title="QRCode" class="shadow-lg w-full max-h-modal lg:w-5/12 z-50 md:w-5/12 xl:w-1/4 "
      :class="{ 'animate-shake': shake }" :header-icon="mdiClose" modal @header-icon-click="cancel">
  <div class="grid justify-items-center">
          <vue-qrcode
          :value="values"
          :quality="10"
          :scale="8"
        />
  </div>
  
   </card-component>
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
</style>


