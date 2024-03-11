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
const online = computed(() =>  user.isonline);
const props = defineProps({
  title: {
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
}
const hasError = ref(false)
const hasError1 = ref(false)
const hasError2 = ref(false)

const form = reactive({
  old_password: '',
  new_password: '',
  confirmed_password:''
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
    if(form.old_password===""){
      theme.pushMessage("Add Old Password")
      hasError.value = true
    }
    if(form.new_password==="")
    {
      theme.pushMessage("Add New Password")
      hasError1.value = true
    }
    if(form.confirmed_password==="")
    {
      theme.pushMessage("Add Confirm Password")
      hasError2.value = true
    }
    else if(form.new_password !=pass(form.new_password))
    {
      theme.pushMessage("Password should contain more than  8 characters with 1 uppercase,lowercase,numbers and special characters")
    }
    else if(form.new_password!=form.confirmed_password)
      {
        theme.pushMessage("Both New Password and Confirm Password should be identical");
      }
      else{
          await user.changepassword({"oldpassword":form.old_password,"password":form.confirmed_password})
          value.value = false
          if(user.change_password.status===200){ 
            theme.pushMessage("Password has been changed successfully");
            form.old_password=""
            form.new_password=""
            form.confirmed_password=""
            value.value = false
            await user.logout()
            router.go()

          }
          else{
            theme.pushMessage(user.change_password_error);
            value.value = true
          }
        }
  }
  else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
  }
    catch(err){
      theme.pushMessage(user.change_password_error);
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




</script>

<template >
  <overlay
    v-show="value"
    @overlay-click="cancel"
  >
    <card-component
      v-show="value"
      :title="title"
      class="shadow-lg w-full max-h-modal md:w-3/5 lg:w-2/5 z-50"
      :class="{ 'animate-shake': shake }"
      :header-icon="mdiClose"
      modal
      @header-icon-click="cancel"
    >
   
  
       <field label="Old Password"  :error="hasError" >
        <control
          :icon-right="oldPassShowHideClicked? mdiEyeOff:mdiEye"
          v-model="form.old_password"
          :tip-right="passShowHideClicked ? null : 'Click to show/hide'"
          type="password"
          name="password"
          placeholder="Enter Old Password"
          @right-icon-click="oldToggleEye"
         
        />
      </field>
  
       <field label="New Password"  :error="hasError1" >
        <control

          :icon-right="newPassShowHideClicked? mdiEyeOff:mdiEye"
          v-model="form.new_password"
          :tip-right="passShowHideClicked ? null : 'Click to show/hide'"
          type="password"
          name="password"
          placeholder="Enter new Password"
          @right-icon-click="newToggleEye"
          :onchange="nanfunc1(form.new_password)"
        />
      </field>


      <field label="Confirm Password"  :error="hasError2" >
        <control

          :tip-right="passShowHideClicked ? null : 'Click to show/hide'"
          :icon-right="conPassShowHideClicked? mdiEyeOff:mdiEye"
          v-model="form.confirmed_password"
          type="password"
          name="password"
          placeholder="Enter confirm Password"
          @right-icon-click="conToggleEye"
          :onchange="nanfunc2(form.confirmed_password)"
        />
      </field>
      <template #footer>
        <level mobile>
          <jb-buttons>
            <jb-button
              label="Change Password"
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


