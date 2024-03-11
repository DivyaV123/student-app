<script setup>
import { computed, reactive, ref, onBeforeMount } from "vue";
import { mdiClose, mdiPlusBox, mdiMinusBox, mdiPhone } from "@mdi/js";
import JbButton from "@/components/JbButton.vue";
import JbButtons from "@/components/JbButtons.vue";
import CardComponent from "@/components/CardComponent.vue";
import Level from "@/components/Level.vue";
import TextLink from "@/components/TextLink.vue";
import Overlay from "@/components/Overlay.vue";
import Field from "@/components/Field.vue";
import TitleSubBar from "@/components/TitleSubBar.vue";
import Multiselect from "@vueform/multiselect";
import { selectClasses } from "@/selectcss.js";

import Control from "@/components/Control.vue";
import { themeStore } from "../stores/theme";
import dayjs from "dayjs";
import { sessionStore } from "../stores/session";

const user = sessionStore();

const theme = themeStore();


const props = defineProps({
  title: {
    type: String,
    default: null,
  },
  sid: {
    type: Number,
    default: 0,
  },
  id: {
    type: Number,
  },

  number: {
    type: Number,
  },

  branch: {
    type: Array,
  },

  button: {
    type: String,
    default: "info",
  },
  buttonLabel: {
    type: String,
    default: "Add",
  },
  shake: Boolean,
  hasCancel: Boolean,
  textLinkLabel: {
    type: String,
    default: null,
  },
  textLinkIcon: {
    type: String,
    default: null,
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
});


const emit = defineEmits(["update:modelValue", "cancel", "confirm"]);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const confirmCancel = (mode) => {
  value.value = false;
  emit(mode);
};


const cancel = () => confirmCancel("cancel");
</script>

<template>
  <overlay v-show="value" @overlay-click="cancel">
    <card-component
      v-show="value"
      :title="title"
      class="shadow-lg w-full max-h-modal sm:w-4/5 xl:w-2/5 lg:w-2/3 z-50 md:w-4/5"
      :class="{ 'animate-shake': shake }"
      :header-icon="mdiClose"
      modal
      @header-icon-click="cancel"
    >
      <div class="pl-4 space-y-3 flex-1">
      <div class="overflow-y-auto h-48 pr-3">
      <div class="flex items-end">
        <div class="bg-white border-white px-6 mb-2 shadow-black shadow-lg rounded-2xl rounded-bl-none py-2">
          <h5 class=" text-black font-bold">Thanu</h5>
          <div class="">
          <h6 class="lg:text-base text-sm leading-5 font-medium mb-1 text-slate-900">
            Hi can you explainthis concept again
          </h6>

         <p class="text-gray-600 font-medium text-right">12-12-2022</p>
         </div>
        </div>    
        </div>

          <div class="flex items-end flex-row-reverse">
        <div class="bg-sky-400 border-sky-500 px-6 mb-2 shadow-black shadow-lg rounded-2xl rounded-bl-none py-2">
          <h5 class=" text-white font-bold">Thanu</h5>
          <div class="">
          <h6 class="lg:text-base text-sm leading-5 text-white font-medium mb-1">
            Hi can you explainthis concept again
          </h6>

         <p class="text-white font-medium text-right">12-12-2022</p>
         </div>
        </div>    
        </div>
        </div>

        <!-- Send Button -->

        <div class="flex border-t-2 border-gray-500 mt-10 sticky bottom-0 px-2 w-full bg-gray-900">
          <field class="w-full flex-1 mt-3">
                    <div>
                        <control type="textarea" class="w-full text-white rounded" placeholder="Type message"/>
                    </div>
                </field>

             <field label="Send" class="ml-6 h-6 w-1/6 mt-3">
          <Multiselect
   
            label="name"
            color="success"
            class="border text-base font-semibold text-white bg-emerald-500 border-emerald-600" 
            :min-chars="1"
            :resolve-on-load="true"
            :delay="0"
            track-by="name"
            :classes="selectClasses"
            @click="changing"
           
          />
        </field>

        </div>
      </div>
    </card-component>
  </overlay>
</template>

<style>
textarea{
  background-color: #fff !important;
  color: #000 !important;
  padding-top: 2px !important;
}
</style>
