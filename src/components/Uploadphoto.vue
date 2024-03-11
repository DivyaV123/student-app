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
onBeforeMount(async () => {
  pageLoading.value = true
  await user.checkonlines();
  pageLoading.value = false

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
const pageLoading = ref(false)
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
  images:null

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
      let valid = true
      var fileUpload = document.getElementById("file");
    if(form.images===null){
      theme.pushMessage("Upload your photo")
      hasError.value = true
      valid = false
    }
    if (fileUpload.files&&fileUpload.files[0]) {
      if (!(fileUpload.files[0].type==="image/png"||fileUpload.files[0].type==="image/jpg"||fileUpload.files[0].type==="image/jpeg"||fileUpload.files[0].type==="image/jfif"||fileUpload.files[0].type==="image/PNG"||fileUpload.files[0].type==="image/JPG"||fileUpload.files[0].type==="image/JPEG"||fileUpload.files[0].type==="image/JFIF"))
      {
        theme.pushMessage("Image format should be any of these(jpg,JPG,jpeg,JPEG,png,PNG,jfif,JFIF)")
        document.getElementById('file').value = "";
        document.getElementById('img-show').src = "";
        hasError.value = true
        form.images=null
        valid = false
      }
    }
    if(valid&&form.images&&form.images.name){
      pageLoading.value = true
        let data2 = new FormData();
        data2.append("upload", form.images, form.images.name);

        await user.studentimage(data2)
        if(user.image_message.status===200){ 
        theme.pushMessage("Photo added successfully");
        form1.images=null
        value.value = false
        location.reload()
        }
        else{
        theme.pushMessage("Image size should be less than 5mb");
        pageLoading.value =false
        }
    }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
      pageLoading.value =false
    }
     
  }
    catch(err){
      theme.pushMessage("something went wrong");
      pageLoading.value =false
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

function  onFileChange(e) {
    var files = e.target.files || e.dataTransfer.files;
    for (const name in files) {
      if (files.hasOwnProperty(name)) {
        form.images = files[name];
        if (form.images.size >= 5242880) {
          alert("Image size should be less than 5MB");
          image_size.value=true
        }
        else {
          form.images = files[name];
        }
      }
    }

  }

</script>
<template >
  <overlay
   v-show="value"
   @overlay-click="cancel"
  >
    <card-component
      title="Passport size photo upload"
      class="shadow-lg w-full max-h-modal md:w-3/5 lg:w-2/5 z-50"
      :class="{ 'animate-shake': shake }"
      :header-icon="mdiClose"
      @header-icon-click="cancel"
      modal
    >
        <field
          label="Passport size photo upload"
          help="Upload your passport size photo here"
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
            accept="image/png, image/jpg, image/jpeg, image/jfif,image/PNG, image/JPG, image/JPEG, image/JFIF"
            v-on:change="onFileChange"
            onchange="document.getElementById('img-show').src = window.URL.createObjectURL(this.files[0]); document.getElementById('img-show').style.height = '6rem'"
          />
          
        </div>
        </field>
        <div class="text-white text-sm font-bold ml-2">
              {{"1"}}.<span class="text-red-400 font-normal">{{"Please upload only passport size photo"}}</span><br>
              {{"2"}}.<span class="text-red-400 font-normal">{{"Upload photo only with face"}}</span><br>
              {{"3"}}.<span class="text-red-400 font-normal">{{"Dont upload photo with full body"}}</span><br>
              {{"4"}}.<span class="text-red-400 font-normal">{{"Please avoid selfies"}}</span><br>
          </div>
         <img id="img-show"  class="ml-2 mt-4" />
  

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


