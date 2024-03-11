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
      class="shadow-lg w-full max-h-modal sm:w-4/5 xl:w-1/3 lg:w-2/3 z-50 md:w-4/5"
      :class="{ 'animate-shake': shake }"
      :header-icon="mdiClose"
      modal
      @header-icon-click="cancel"
    >
      <div class="pl-4 space-y-3 flex-1">
      <div class="overflow-y-auto pr-3">
      <div class="flex items-end">
        <div class="bg-white border-white p-6 mb-5 shadow-black shadow-lg rounded-2xl rounded-bl-none pt-2 pb-5">
          <h5 class="text-blue-500 font-bold">Thanu</h5>
          <h6 class="text-slate-900 font-medium mb-3">
            Hi can you explainthis concept again
          </h6>

          <div class="flex flex-wrap w-full px-2 mt-2">
            <div class="mr-2">
              <jb-buttons>
                <jb-button
                  class="ml-0 cursor-pointer whitespace-nowrap block focus:outline-none transition-colors duration-150 border text-white focus:ring rounded mx-auto pt-1 pb-1 mb-6 sm:mb-0"
                  label="Mark as Read"
                  color="info"
                />
              </jb-buttons>
            </div>

            <div class="mr-2">
              <jb-buttons>
                <jb-button
                  class="ml-0 cursor-pointer whitespace-nowrap block focus:outline-none transition-colors duration-150 border text-white focus:ring rounded mx-auto pt-1 pb-1 mb-6 sm:mb-0"
                  label="Show more"
                  color="success"
                />
              </jb-buttons>
            </div>

            <div>
              <h6 class="text-black font-semibold">12-12-2022</h6>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </card-component>
  </overlay>
</template>
