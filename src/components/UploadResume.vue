<script setup>
import { computed ,ref,reactive,onBeforeMount} from 'vue'
import { mdiAccount, mdiEyeOff, mdiEmail, mdiPhone,mdiEye} from '@mdi/js'
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
const theme = themeStore();
const router = useRouter();
const user = sessionStore();
const pageLoading = ref(false)
onBeforeMount(async () => {
  pageLoading.value=true
  await user.checkonlines();
  pageLoading.value=false

});
const props = defineProps({
  title: {
    type: String,
    default: null
  },
  attid: {
    type: String,
    default: null
  },
  largeTitle: {
    type: String,
    default: null
  },
  button: {
    type: String,
    default: 'info'
  },
  buttonLabel: {
    type: String,
    default: 'submit'
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

const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const cancel = () => {
  value.value = false
//   user.gettrackerbatches();
  // location.reload()
}
const online = computed(() =>  user.isonline);

const hasError = ref(false)
const hasError1 = ref(false)
const hasError2 = ref(false)

const form = reactive({
  comment: '',

})


const pass =(value) =>{ 
    
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()~])[A-Za-z\d@$!%*?&#^()~]{8,}$/.test(value))
        {
            return  form.new_password;
        } 
    }

const confirmchange = async () => {
  try{
    await user.checkonlines();
    if(online.value===true){
      if(form1.upload===null){
      theme.pushMessage("Upload your resume")
      hasError.value = true
    }

      else{
            pageLoading.value=true
            let data2 = new FormData();
            data2.append("upload", form1.upload);
            await user.uploadresume(data2)
            value.value = false
            
          if(user.upload_message){ 
            theme.pushMessage("Resume added successfully");
            form1.upload=null
            await user.getstudent();
            pageLoading.value=false
            // location.reload()
          }
          else{
            theme.pushMessage("Resume size should be less than 5mb");
            value.value = false
            pageLoading.value=false
          }
        }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
      pageLoading.value=false
    }

   
  }
    catch(err){
      theme.pushMessage("something went wrong");
      pageLoading.value=false
    }
    
  
}

 
const passShowHideClicked = ref(true)

const oldPassShowHideClicked = ref(true)
const newPassShowHideClicked = ref(true)
const conPassShowHideClicked = ref(true)

const oldToggleEye = () =>{
  return( oldPassShowHideClicked.value = !oldPassShowHideClicked.value);
}


const newToggleEye = () =>{
  return( newPassShowHideClicked.value = !newPassShowHideClicked.value);
}

const conToggleEye = () =>{
  return( conPassShowHideClicked.value = !conPassShowHideClicked.value);
}

const nanfunc1 = async () => {
  if(form.new_password){
    if(form.new_password.length===1){
      hasError1.value =false
    }
    else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()~])[A-Za-z\d@$!%*?&#^()~]{8,}$/.test(form.new_password)){
      hasError1.value ="Password should contain more than  8 characters with 1 uppercase,lowercase,numbers and special characters"
    }
    else{
      hasError1.value =false
    }

  }

};

const nanfunc2 = async () => {
  if(form.confirmed_password){
    if(form.confirmed_password.length===1){
      hasError2.value =false
    }
    else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()~])[A-Za-z\d@$!%*?&#^()~]{8,}$/.test(form.confirmed_password)){
      hasError2.value ="Confirm Password should contain more than  8 characters with 1 uppercase,lowercase,numbers and special characters"
    }
    else{
      hasError2.value =false
    }

  }

};
const form1 = reactive({
  upload:null
})

function  onFileChange1(e) {
      var files = e.target.files || e.dataTransfer.files;

      form1.upload=files[0]

    }

</script>
<template >
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
      title="Upload Resume"
      class="shadow-lg w-full max-h-modal md:w-3/5 lg:w-2/5 z-50"
      :class="{ 'animate-shake': shake }"
      :header-icon="mdiClose"
      @header-icon-click="cancel"
      modal
    >
   
  
        <field
          label="Upload Resume"
          help="Upload your resume here for placement purpose"
          :error="hasError"
          class="text-white text-sm  p-2 "
    
        >
        <div>
          <input
            class="
            bg-gray-800
            border-gray-700 border
            py-1 px-2
            w-full
            text-white
            "
            id="file"
            ref="file"
            type="file"
            name="file"
            accept=".doc,.docx,.pdf "
            v-on:change="onFileChange1"

          />
          
        </div>
        </field>
  

      <template #footer>
        <level mobile>
          <jb-buttons>
            <jb-button
              label="Submit"
              :color="button"
           @click="confirmchange"
            />
            
          </jb-buttons>
          <jb-buttons>
            <jb-button
              label="Cancel"
              color="white"
           @click="cancel"
            />
            
          </jb-buttons>

        </level>
      </template>
    </card-component>
  </overlay>
</template>


