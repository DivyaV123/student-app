<script setup>
import { computed, reactive, ref ,onBeforeMount } from 'vue'
import { mdiClose, mdiPlusBox, mdiMinusBox, mdiPhone } from '@mdi/js'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import CardComponent from '@/components/CardComponent.vue'
import Level from '@/components/Level.vue'
import TextLink from '@/components/TextLink.vue'
import Overlay from '@/components/Overlay.vue'
import Field from "@/components/Field.vue";
import TitleSubBar from "@/components/TitleSubBar.vue";
import Control from "@/components/Control.vue";
import { themeStore } from "../stores/theme"
import { sessionStore } from "../stores/session";
const theme = themeStore();
const user = sessionStore();
const online = computed(() =>  user.isonline);
const pageLoading = ref(false);
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
  id: {
    type: Number,
  },
  button: {
    type: String,
    default: 'info'
  },
  buttonLabel: {
    type: String,
    default: 'Add'
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

const confirmCancel = mode => {
  value.value = false
  emit(mode)
}

const removeEmail = () => {
    emails.value.pop();
 };
const email = ref("")

const emails = ref([{ email: "" }]);
const emails1 = ref([{ email: "" }]);
const emails2 = ref([{ email: "" }]);
const numbers = ref([])
const hasError4 = ref(false)
const addEmail = () => {
  emails.value.push({ email: "" });
};

const nanfunc = async (email) => {
  if(email){
    if(email.length===1){
      return false
    }
    else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      return "Email Id not valid"
    }
    else{
      return false
    }

  }

};

const confirm = async() => {
  try{
    pageLoading.value = true
    await user.checkonlines();
    email.value = email.value.trim()
    if(online.value===true){
      if(email.value==""){
    theme.pushMessage("Add Email details!")
  }
  else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)))
  {
    theme.pushMessage("Add valid email!")
  }
  else{
  
  await user.addemaildata({"email":email.value.toLowerCase()})

  if(user.contact_data.message){
      theme.pushMessage("Email added successfully")
      value.value = false
  }
  else{
      if(user.contact_data.data){
          theme.pushMessage("Email is already registered!!");
      }
    
  }

  }
  pageLoading.value = false
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
      pageLoading.value = false
    }


  }
  catch(err){
    theme.pushMessage(user.error_contact_data);
    pageLoading.value = false
  }
}

const cancel = () => {
  confirmCancel('cancel')
  value.value = false

  }
</script>

<template>
  <overlay
  v-show="value"
  @overlay-click="cancel"
  >
  <div
    v-if="pageLoading"
    wire:loading
    class="
      fixed
      top-0
      left-0
      right-0
      bottom-0
      w-full
      h-screen
      z-50
      overflow-hidden
      bg-gray-700
      opacity-75
      flex flex-col
      items-center
      justify-center
    "
  >
    <div
      class="
        loader
        ease-linear
        rounded-full
        border-4 border-t-4 border-gray-200
        h-12
        w-12
        mb-4
      "
    ></div>
    <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
    <p  class="w-1/3 text-center text-white">
      This may take a few seconds, please wait.
    </p>

  </div>
    <card-component
      class="shadow-lg w-full max-h-modal md:w-3/5 z-50"
      :class="{ 'animate-shake': shake }"
      :header-icon="mdiClose"
      title="Add Email ID"
      @header-icon-click="cancel"
    >
      <div class="pl-4 space-y-3">
        <card-component>
        <field label="Email" >
        <control
          v-model="email"
          help="Email"
          placeholder="Email"
          :error="email_error"
        />

      </field>
        </card-component>
      </div>

      <template #footer>
        <level mobile>
          <jb-buttons>
            <jb-button
              label="Confirm"
              color="info"
              @click="confirm"
            />
            <jb-button
              label="Cancel"
              color="white"
              outline
              @click="cancel"
            />
          </jb-buttons>

          <text-link

          />
        </level>
      </template>
    </card-component>
  </overlay>
</template>