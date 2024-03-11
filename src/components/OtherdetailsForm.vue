
<template>
  <main-section
  v-if="
      show_personal === false &&
      show_experience === false &&
      show_educational === false

    ">
    <div class="grid grid-cols-1 gap-6 mb-6 xl:grid-cols-4">
      <card-component :smallerPadding="true"  v-if="pageLoading" class="mb-6">
          <div wire:loading class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
          <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
          <p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
        </div>
        </card-component>
      <card-component v-else
        :icon="mdiBallot"
        class="mb-6 lg:mb-0 lg:col-span-2 xl:col-span-4 text-amber-400"
        :hasprofilepadding="true"
      >
        <div class="max-w-full mx-auto my-4 pb-0 mt-8">
          <div class="flex pt-0">
            <div class="flex-1"></div>

            <div class="flex-1">
              <div
                class="
                  w-10
                  h-10
                  bg-gray-900
                  mx-auto
                  text-lg text-white
                  flex
                  items-center
                "
              >
                <jb-button
                  class="text-center w-full h-full text-xs"
                  :color="user.personal_data&&user.personal_data.gender?'white':'info'"
                  :icon="user.personal_data&&user.personal_data.gender?mdiCheck:mdiAccountAlertOutline"
                ></jb-button>
              </div>
              <div class="flex text-xs content-center text-center items-center justify-center" :class="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'?' font-bold text-white':'font-bold text-white'">
			<label v-if="user.personal_data&&user.personal_data.gender" for="html">Personal Details
        </label>
        <label v-else for="html">Add Personal Details
        </label>
		</div>
            </div>

            <div
              class="
                w-1/6
                align-center
                items-center
                align-middle
                content-center
                flex
              "
            >
              <div
                :class="
                  user.personal_data&&user.personal_data.gender
                    ? 'w-full bg-blue-600  items-center align-middle align-center flex-1'
                    : 'w-full bg-grey-300  items-center align-middle align-center flex-1'
                "
              >
                <div
                  class="
                    text-xs
                    leading-none
                    py-1
                    text-center text-white
                    rounded
                  "
                  :style="
                    user.personal_data&&user.personal_data.gender
                      ? 'width: 100%'
                      : 'width: 0%'
                  "
                ></div>
              </div>
            </div>

            <div class="flex-1">
              <div
                class="
                  w-10
                  h-10
                  bg-gray-900
                  mx-auto
                  rounded-full
                  text-lg text-white
                  flex
                  items-center
                "
              >
                <jb-button
                  class="text-center w-full h-full"
                  :color="user.educational_data&&user.educational_data.highestdegree&&user.educational_data.highestdegree.name?'white':'info'"
                  :icon="user.educational_data&&user.educational_data.highestdegree&&user.educational_data.highestdegree.name?mdiCheck:mdiBookEducation"
                  v-on:click="
                    user.educational_data&&user.educational_data.highestdegree&&user.educational_data.highestdegree.name
                      ? null
                      : null
                  "
                ></jb-button>
              </div>
              <div class="flex text-xs content-center text-center items-center w-auto justify-center" :class="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'?'font-bold text-white':'font-bold text-white'">
			<label v-if="user.educational_data&&user.educational_data.highestdegree&&user.educational_data.highestdegree.name" for="html">Educational Details
    </label>
    <label v-else for="html">Add Educational details
    </label>
</div>
            </div>

            <div
              class="
                w-1/6
                align-center
                items-center
                align-middle
                content-center
                flex
              "
            >
              <div
                :class="
                  user.educational_data&&user.educational_data.highestdegree&&user.educational_data.highestdegree.name
                    ? 'w-full bg-blue-600  items-center align-middle align-center flex-1'
                    : 'w-full bg-grey-300  items-center align-middle align-center flex-1'
                "
              >
                <div
                  class="
                    text-xs
                    leading-none
                    py-1
                    text-center text-white
                    rounded
                  "
                  :style="
                    user.educational_data&&user.educational_data.highestdegree&&user.educational_data.highestdegree.name
                      ? 'width: 100%'
                      : 'width: 0%'
                  "
                ></div>
              </div>
            </div>

            <div
              class="flex-1"
              v-if="
                user.personal_data &&
                user.personal_data.fresherexp &&
                user.personal_data.fresherexp.Name == 'experienced'
              "
            >
              <div
                class="
                  w-10
                  h-10
                  bg-gray-900
                  mx-auto
                  text-lg text-white
                  flex
                  items-center
                "
              >
                <jb-button
                  class="text-center w-full h-full"
                  :color="user.experience_data && user.experience_data.experience!=null?'white':'info'"
                  :icon="user.experience_data && user.experience_data.experience!=null?mdiCheck:mdiAccountCogOutline"
                  v-on:click="
                    user.experience_data && user.experience_data.experience!=null
                      ? null
                      : null
                  "
                ></jb-button>
              </div>
              <div class="flex text-xs content-center text-center items-center justify-center font-bold text-white" v-if="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'">
			<label v-if="user.experience_data && user.experience_data.experience!=null" for="html">Experience Details
        </label>
        <label v-else for="html">Add Experience details
        </label>
		</div>
            </div>

            <div
              v-if="
                user.personal_data &&
                user.personal_data.fresherexp &&
                user.personal_data.fresherexp.Name == 'experienced'
              "
              class="
                w-1/6
                align-center
                items-center
                align-middle
                content-center
                flex
              "
            >
              <div
                :class="
                  user.experience_data && user.experience_data.experience!=null
                    ? 'w-full bg-blue-600  items-center align-middle align-center flex-1'
                    : 'w-full bg-grey-300  items-center align-middle align-center flex-1'
                "
              >
                <div
                  class="
                    text-xs
                    leading-none
                    py-1
                    text-center text-white
                    rounded
                  "
                  :style="
                    user.experience_data && user.experience_data.experience!=null
                      ? 'width: 100%'
                      : 'width: 0%'
                  "
                ></div>
              </div>
            </div>

            <div class="flex-1">
              <div
                class="
                  w-10
                  h-10
                  bg-gray-900
                  mx-auto
                  text-lg text-white
                  flex
                  items-center
                "
              >
                <jb-button
                  class="text-center w-full h-full"
                  :color="user.other_data?'white':'info'" 
                  :icon="user.other_data?mdiCheck:mdiExitRun"
                  v-on:click="
                    (user.personal_data &&
                      user.personal_data.fresherexp &&
                      user.personal_data.fresherexp.Name == 'experienced' &&
                      user.experience_data && user.experience_data.experience!=null) ||
                    (user.personal_data &&
                      user.personal_data.fresherexp &&
                      user.personal_data.fresherexp.Name == 'fresher' &&
                      user.educational_data&&user.educational_data.highestdegree&&user.educational_data.highestdegree.name)
                      ? null
                      : null
                  "
                ></jb-button>
              </div>

              <div class="flex text-xs content-center text-center items-center justify-center font-bold text-white" ::class="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'?'font-bold text-white':'font-bold text-white'">
			<label v-if="user.other_data" for="html">Other Details
        </label>
        <label v-else for="html">Add Other Details
        </label>
		</div>
            </div>

            <div class="flex-1"></div>
          </div>

          <div class="flex text-xs content-center text-center items-center">
		<!-- <div :class="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'?'w-1/4 font-bold text-white':'w-1/2 font-bold text-white xl:pl-20 md:pl-20 sm:pl-10'">
			<label v-if="user.personal_data&&user.personal_data.gender" for="html">Edit Personal
        </label>
        <label v-else for="html">Add Personal Details
        </label>
		</div>
		
		<div :class="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'?'w-1/4 font-bold text-white':'w-1/2 font-bold text-white'">
			<label v-if="user.educational_data&&user.educational_data.tenth&&user.educational_data.tenth.yop" for="html">Edit Educational Details
        </label>
        <label v-else for="html">Add Educational details
        </label>
		</div>
		
		<div class="w-1/4 font-bold text-white" v-if="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'">
			<label v-if="user.experience_data&&user.experience_data.company&&user.experience_data.company.name" for="html">Edit Experience Details
        </label>
        <label v-else for="html">Add Experience details
        </label>
		</div>
		
		<div :class="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'?'w-1/4 font-bold text-white':'w-1/2 font-bold text-white  xl:pr-20 md:pr-20 sm:pr-10'">
			<label v-if="user.other_data" for="html">Edit Other Details
        </label>
        <label v-else for="html">Add Other Details
        </label>
		</div>			 -->
	</div>
        </div>

        <div
          class="
          grid
            md:grid-cols-3
            sm:grid-cols-2
            lg:grid-cols-4
            xl:grid-cols-5
            gap-1
            mb-3
          "
        >
          <field
            label="Ready to relocate?"
            :error="form.relocation.ready_to_relocate !== null ? false : true"
            class="
              text-white text-sm
              box-border
              h-24
              w-50
              border-2 border-gray-700
              p-2
            "
          >
            <div>
              <label class="cursor-pointer label" for="yes">
                <span class="label-text font-medium pr-1 text-white text-sm"
                  >Yes</span
                >
                <input
                  type="radio"
                  id="yes"
                  name="ready_to_relocate"
                  :value="true"
                  :native-value="true"
                  @click="changingrelocate"
                  v-model="form.relocation.ready_to_relocate"
                  class="w-5 h-5 align-middle pl-1 radio radio-info radio-md"
                />
              </label>
              <label class="cursor-pointer label" for="no">
                <span class="label-text font-medium pl-4 pr-1 text-white text-sm"
                  >No</span
                >
                <input
                  type="radio"
                  id="no"
                  name="ready_to_relocate"
                  :value="false"
                  :native-value="false"
                  @click="changingrelocate"
                  v-model="form.relocation.ready_to_relocate"
                  class="w-5 h-5 align-middle pl-1 radio radio-info radio-md"
                />
              </label>
            </div>
          </field>

          <field
            v-if="form.relocation.ready_to_relocate === true"
            label="Relocation"
            :error="form.relocation.location&&form.relocation.location.length>0 ? false : true"
            help="Please search Location"
            class="
              text-white text-sm
             

            "
          >
            <Multiselect
              v-model="form.relocation.location"
              valueProp="id"
              label="name"
              class="
                border border-gray-700
                bg-gray-800
                text-sm text-white
                rounded
              "
              searchable
              placeholder="Search Location"
              track-by="name"
              :classes="selectClasses"
              :object="true"
              mode="tags"
              :options="relocations"

            />
          </field>
        </div>
          <div class="border border-white shadow-sm shadow-white mb-5">
            <div
              class="
              text-white text-center
                font-medium
                border-b border-white
                pl-1
                pr-1
                py-2
                bg-black
                 text-sm
              "
            >
              Parents/Guardian contact for Emergency
            </div>
            
              <div
                v-for="(datas, index1) in form.emergencycontact"
                :key="index1"
              >
              <div
              class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-2 m-4 mb-0"
            >
                <field
                  label="Name"
                  :error="
                          ((datas.name.replace(/\s+/g, '').length)&&(!/^[\.]+$/.test(datas.name))&&((/^[a-zA-Z\s\.]+$/.test(datas.name))))
                            ? false
                            : 'Add valid Emergency Name'"
                  class="
                    text-white text-sm
                    box-border
                    h-24
                    w-50
                    border-2 border-gray-700
                    p-1
                  "
                  help="Please enter name"
                >
                  <control
                    v-model="datas.name"
                    name="Name"
                    placeholder="Enter name"
                    autocomplete="username"
                  />
                </field>
                <div class="flex border-2 border-gray-700 p-1 pt-1 pb-6 sm:pb-1 md:h-24 h-[115px] sm:h-[112px]">
                  <div class="flex-none w-32 mr-2">
                    <field
                      label="country code"
                      :error="datas.code !== null ? false : true"
                      class="
                        text-white text-sm
                        box-border
                        w-50
                        pb-6
                      "
                    >
                      <Multiselect
                        v-model="datas.code"
                        :searchable="true"
                        valueProp="code"
                        label="code"
                        :classes="selectClasses"
                        :options="codes"
                        :object="true"
                        class="h-10"
                      />
                    </field>
                  </div>


                  <div class="shrink w-full h-max">
                    <field
                      label="Number"
                      class="
                        text-white text-sm
                        box-border
                        w-50
                        pb-6
                      "
                    >
                      <control v-if="datas.code&&datas.code['code']==='+91'"
                        v-model="datas.number"
                        name="number"
                        class="pb-0"
                        placeholder="Enter number"
                        :error="
                          datas.number.replace(/\s+/g, '').length === 10 &&
                          !isNaN(datas.number.replace(/\s+/g, ''))
                            ? false
                            : 'Mobile(Minimum 10 digits)'
                        "
                      />
                       <control v-else
                        v-model="datas.number"
                        name="number"
                        class="pb-0"
                        placeholder="Enter number"
                        :error="
                          !isNaN(datas.number.replace(/\s+/g, ''))
                            ? false
                            : 'Add valid contact number'
                        "
       
    
                      />
                    </field>
                  </div>
                </div>
                <field
                  label="Relation"
                  :error="
                          ((datas.relation.replace(/\s+/g, '').length)&&(!/^[\.]+$/.test(datas.relation))&&((/^[a-zA-Z\s\.]+$/.test(datas.relation))))
                            ? false
                            : 'Add valid Emergency Relation'"
                  class="
                    text-white text-sm
                    box-border
                    h-24
                    w-50
                    border-2 border-gray-700
                    p-1
                  "
                  help="Please enter relation"
                >
                  <control
                    v-model="datas.relation"
                    name="Relation"
                    placeholder="Enter Relation"
                    autocomplete="username"
                  />
                </field>
              </div>
            </div>
            <div class="flex flex-wrap gap-1">
              <div class="p-2">
                <jb-button
                  label="Add another Emergency"
                  @click="addemergency"
                  class="mt-2 sm:mt-0"
                  color="success"
                />
              </div>
              <div class="p-2" v-if="form.emergencycontact.length > 1">
                <jb-button
                  label="Remove"
                  @click="removeemergency"
                  color="danger"
                />
              </div>
            </div>
          </div>

          <div class="border border-white shadow-sm shadow-white mb-5">
            <div
              class="
              text-white text-center
                font-medium
                border-b border-white
                pl-1
                pr-1
                py-2
                bg-black
                text-sm
              "
            >
              Refer friend
            </div>
              <div v-for="(datas, index1) in form.referfriend" :key="index1">
                <div
              class="grid xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 gap-1 m-4 mb-0"
            >
                <field
                  label="Name"
                  :error="refername_error"
                  class="
                    text-white text-sm
                    box-border
                    h-24
                    w-50
                    border-2 border-gray-700
                    p-1
                  "
                  help="Please enter name"
                >
                  <control
                    v-model="datas.name"
                    name="Name"
                    placeholder="Enter name"
                    autocomplete="username"
                    class="text-white text-sm"
                  />
                </field>
                <div class="flex border-2 border-gray-700 p-1 pt-1 pb-6 sm:pb-1 md:h-24 h-[115px] sm:h-[112px]">
                  <div class="flex-none w-32 mr-2">
                    <field
                      label="country code"
                      :error="refercode_error"
                      class="
                        text-white text-sm
                        box-border
                        w-50
                        pb-6
                      "
                    >
                      <Multiselect
                        v-model="datas.code"
                        :searchable="true"
                        valueProp="code"
                        label="code"
                        :classes="selectClasses"
                        :options="codes"
                        :object="true"
                        class="h-10"
                      />
                    </field>
                  </div>
                  <div class="shrink w-full h-max">
                    <field
                      label="Number"
                      class="
                      text-white text-sm
                        box-border
                        h-[73px]
                        w-50  
                      "
                    >
                      <control v-if="datas.code&&datas.code['code']==='+91'"
                        v-model="datas.number"
                        name="number"
                        :error="
                          datas.number.replace(/\s+/g, '').length === 10 &&
                          !isNaN(datas.number.replace(/\s+/g, ''))
                            ? false
                            : 'Mobile(Minimum 10 digits)'
                        "
                        placeholder="Enter number"
                      />
                      <control v-else
                        v-model="datas.number"
                        name="number"
                        placeholder="Enter number"
                        :error="
                        !isNaN(datas.number.replace(/\s+/g, ''))
                          ? false
                          : 'Add valid contact number'
                      "
                      />
                    </field>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap gap-1">
              <div class="p-2">
                <jb-button
                  label="Add another Referral"
                  @click="addreferal"
                  color="success"
                />
              </div>
              <div class="p-2" v-if="form.referfriend&&form.referfriend.length > 1">
                <jb-button
                  label="Remove"
                  @click="removereferal"
                  color="danger"
                />
              </div>
          </div>
        </div>
        <template #footer>
          <level mobile>
            <jb-buttons>
              <jb-button
                label="Previous"
                type="submit1"
                color="info"
                @click="previous"
              />
              <jb-button
                label="Submit"
                type="submit"
                color="info"
                @click="submit"
              />
            </jb-buttons>
          </level>
        </template>
      </card-component>
    </div>
  </main-section>
  <personal-form v-if="show_personal === true" />
  <experience-form v-if="show_experience === true" />
  <education-form v-if="show_educational===true"/>
</template>

<script setup>
import {
  mdiAccount,
  mdiEyeOff,
  mdiProgressCheck,
  mdiAccountAlertOutline,
  mdiBookEducation,
  mdiAccountCogOutline,
  mdiExitRun,
  mdiCheck
} from "@mdi/js";
import FormScreenSection from "@/components/FormScreenSection.vue";
import CardComponent from "@/components/CardComponent.vue";
import PersonalForm from "@/components/PersonalForm.vue";
import ExperienceForm from "@/components/ExperienceForm.vue";
import EducationForm  from '@/components/EducationForm.vue'
import CheckRadioPicker from "@/components/CheckRadioPicker.vue";
import TitleSubBar from "@/components/TitleSubBar.vue";
import Field from "@/components/Field.vue";
import Control from "@/components/Control.vue";
import JbButton from "@/components/JbButton.vue";
import Level from "@/components/Level.vue";
import JbButtons from "@/components/JbButtons.vue";
import TextLink from "@/components/TextLink.vue";
import { ref, computed, onBeforeMount, reactive } from "vue";
// import { useStorage } from "vue3-storage";
import { getdata } from "../stores/user";
import { sessionStore } from "../stores/session";
import { useRouter } from "vue-router";

import dayjs from "dayjs";
import { themeStore } from "../stores/theme";
import Multiselect from "@vueform/multiselect";
import { selectClasses } from "@/selectcss.js";
const code = getdata();
// changing
const changing = () => {
  reloError.value = false;
};
const pageLoading = ref(false)
const show_educational = ref(false);
const theme = themeStore();
// const ls = useStorage();
const router = useRouter();
const user = sessionStore();
const current_user = ref("");
const token_value = ref("");
const token = ref("");
const show = ref(true);
const online = computed(() =>  user.isonline);

const fetchcity = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      let courses = await user.getrelocation(query);
  return courses;
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }

};

const studentlocation = computed(() => {
  return user.location
})
const form = reactive({
  relocation: {
    location: [],
    ready_to_relocate: null,
  },
  name: "",
  emergencycontact: [
    {
      name: "",
      number: "",
      code: "",
      relation: "",
    },
  ],
  referfriend: [
    {
      name: "",
      number: "",
      code: "",
    },
  ],
});

const codes = [
  { code: "+91" },
  { code: "+97" },
  { code: "+968" },
  { code: "+1" },
  { code: "+355" },
  { code: "+356" },
  { code: "+352" },
  { code: "+370" },
  { code: "+372" },
  { code: "+371" },
  { code: "+39" },
  { code: "+61" },
  { code: "+93" },
  { code: "+376" },
  { code: "+1684" },
  { code: "+244" },
  { code: "+1264" },
  { code: "+1268" },
  { code: "+54" },
  { code: "+374" },
  { code: "+297" },
  { code: "+43" },
  { code: "+994" },
  { code: "+421" },
  { code: "+420" },
  { code: "+30" },
  { code: "+40" },
  { code: "+33" },
  { code: "+1242" },
  { code: "+973" },
  { code: "+880" },
  { code: "+1246" },
  { code: "+375" },
  { code: "+32" },
  { code: "+501" },
  { code: "+229" },
  { code: "+1441" },
  { code: "+975" },
  { code: "+591" },
  { code: "+387" },
  { code: "+385" },
  { code: "+386" },
  { code: "+65" },
  { code: "+267" },
  { code: "+55" },
  { code: "+246" },
  { code: "+46" },
  { code: "+673" },
  { code: "+1284" },
  { code: "+226" },
  { code: "+257" },
  { code: "+855" },
  { code: "+237" },
  { code: "+238" },
  { code: "+599" },
  { code: "+1345" },
  { code: "+359" },
  { code: "+45" },
  { code: "+34" },
  { code: "+236" },
  { code: "+358" },
  { code: "+357" },
  { code: "+36" },
  { code: "+235" },
  { code: "+353" },
  { code: "+351" },
  { code: "+48" },
  { code: "+31" },
  { code: "+56" },
  { code: "+86" },
  { code: "+61" },
  { code: "+57" },
  { code: "+269" },
  { code: "+977" },
  { code: "+0046" },
  { code: "+256" },
  { code: "+64" },
  { code: "+44" },
  { code: "+47" },
  { code: "+49" },
];

const relocate_error = ref(false);
const reloError = ref(false);
const refercode_error = ref(false);
const refername_error = ref(false);
const refernum_error = ref(false);
const emer_name = ref(false);
const emer_number = ref(false);
const emercode_error = ref(false);
const emer_rela = ref(false);
const selected = ref(null);
const show_personal = ref(false);
const previous = async () => {
  if(user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name==="experienced"){
    show_experience.value = true;
  }
  else{
    show_educational.value=true
  }
  
};
const educational = async () => {
  show_educational.value=true
}
const personal = async () => {
  show_personal.value=true
}
const show_experience = ref(false);
const show_other = ref(false);
const experience = async () => {
  show_experience.value = true;
};
const other = async () => {
  show_other.value = true;
};

const relocations = computed(() => {
   if(user.personal_data&&user.personal_data.district_id&&user.personal_data.tempaddress.district_id.name){
        return user.location.filter(({name}, index) => 
        !user.personal_data.tempaddress.district_id.name.includes(name)
        )

   }else{
     return user.location
   }

  
})


const fetchrelocations = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      if(query){
    relocations.value = await user.getrelocation(query.replace("'","''"));
  }
  else{
    relocations.value=[ 
  
    {
            "id": 2,
            "name": "mysore"
        },
        {
            "id": 3,
            "name": "mangalore"
        },
        {
            "id": 4,
            "name": "sakleshpur"
        },
        {
            "id": 5,
            "name": "chikmangalore"
        },
        {
            "id": 6,
            "name": "hyderabad"
        },
        {
            "id": 7,
            "name": "bhubaneswar"
        },
        {
            "id": 8,
            "name": "chandigarh"
        },
        {
            "id": 9,
            "name": "chennai"
        }]
  }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }

  
};
onBeforeMount(async () => {
  await user.checkonlines();

  pageLoading.value = true 
  window.scrollTo(0, 0);
  await user.checkUser();
  if (user.$state.loggedIn === false) {
    router.push("/login");
  }
    else if(user.$state.loggedIn === true && user.other_data!=null){
    router.push("/");
  }

  else{
    router.push("/profile");
  }
  if(online.value===true){
  await user.getstudent();
  await user.getrelocation();

  // window.onpopstate = (event) => {
  //   router.push("/");
  // };
  for (var i = 0; i < form.referfriend.length; i++) {
    form.referfriend[i].code = codes[0];
  }
  for (var i = 0; i < form.emergencycontact.length; i++) {
    form.emergencycontact[i].code = codes[0];
  }
  // if(user.other_data&&user.other_data.emergencycontact&&user.other_data.emergencycontact[0]){
  //   form.relocation.ready_to_relocate=user.other_data.relocation.ready_to_relocate
  //   form.relocation.location=user.other_data.relocation.location
  //   form.emergencycontact=user.other_data.emergencycontact
  //   form.emergencycontact=user.other_data.emergencycontact
  // }

  // if(user.refer_data){
  //   form.referfriend=user.refer_data
  // }
  }
  else{
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  }
  pageLoading.value = false

});

function addemergency() {
  form.emergencycontact.push({
    name: "",
    number: "",
    relation: "",
    code: "",
  });
  for (var i = 0; i < form.emergencycontact.length; i++) {

    if(form.emergencycontact[i].code===""){
      form.emergencycontact[i].code = codes[0];
    }
    // form.emergencycontact[i].code = codes[0];
  }
}

const changingrelocate = async () => {
 form.relocation.location=[]
};

function removeemergency() {
  form.emergencycontact.pop({
    name: "",
    number: "",
    relation: "",
  });
}

function addreferal() {
  form.referfriend.push({
    name: "",
    number: "",
    code: "",
  });
  for (var i = 0; i < form.referfriend.length; i++) {
    if(form.referfriend[i].code===""){
      form.referfriend[i].code = codes[0];
    }
  }
}
function removereferal() {
  form.referfriend.pop({
    name: "",
    number: "",
  });
}

const submit = async () => {
  let valid = true;
  if (form.relocation.ready_to_relocate === null) {
    valid = false;
    relocate_error.value = "This field is required";
    theme.pushMessage("Choose the options!");
  }

  if (
    form.relocation.location &&
    form.relocation.location.length === 0 &&
    form.relocation.ready_to_relocate === true
  ) {
    valid = false;
    reloError.value = "This field is required";
    theme.pushMessage("Please select relocation value");
  }

  for (var i = 0; i < form.referfriend.length; i++) {
     form.referfriend[i].number = form.referfriend[i].number.trim()
    if (form.referfriend[i].number != "") {
      if ((form.referfriend[i].number.length != 10&&form.referfriend[i].code['code']==='+91')||/\s/g.test(form.referfriend[i].number)||isNaN(form.referfriend[i].number)) {
        refernum_error.value = "Please add valid contact number";
        theme.pushMessage("Please add valid referral contact number");
        valid = false;
      } 
      // else if (/\s/g.test(form.referfriend[i].number)) {
      //   refernum_error.value = "Please add valid contact number";
      //   theme.pushMessage("Please add valid referral contact number");
      //   valid = false;
      // }
      // else if (isNaN(form.referfriend[i].number)) {
      //   refernum_error.value = "Please add valid contact number";
      //   theme.pushMessage("Please add valid referral contact number");
      //   valid = false;
      // }
      else if (form.referfriend[i].code === null) {
        refercode_error.value = "This field is required";
        theme.pushMessage("Country code is required in referral information");
        valid = false;
      }
      else if((form.referfriend[i].name == "")||(!form.referfriend[i].name.replace(/\s/g, '').length)){
          refername_error.value = "Please add referral Name";
          theme.pushMessage("Please add referral Name");
          valid = false;
      }
    } else if (
      form.referfriend[i].number == "" &&
      form.referfriend[i].name != ""
    ) {
      refernum_error.value = "Please add referral contact number";
      theme.pushMessage("Please add referral contact number");
      valid = false;
    }
    
    // else if (
    //   form.referfriend[i].number != "" &&
    //   form.referfriend[i].name == ""
    // ) {
    //   console.log("insidee1")
    //   refername_error.value = "Please add referal Name";
    //   theme.pushMessage("Please add referal Name");
    //   valid = false;
    // }
  }
  for (var i = 0; i < form.emergencycontact.length; i++) {
    form.emergencycontact[i].number = form.emergencycontact[i].number.trim()
    // console.log("form.emergencycontact[i].code['code']",form.emergencycontact[i].code['code'])
    if (form.emergencycontact[i].name === ""||!form.emergencycontact[i].name.replace(/\s/g, '').length) {
      emer_name.value = "Please enter emergency name information";
      theme.pushMessage("Please enter emergency name information");
      valid = false;
    }
    // if (!form.emergencycontact[i].name.replace(/\s/g, '').length) {
    //   emer_name.value = "Please enter emergency name information";
    //   theme.pushMessage("Please enter emergency name information");
    //   valid = false;
    // }
    if (form.emergencycontact[i].relation === ""||!form.emergencycontact[i].relation.replace(/\s/g, '').length) {
      emer_rela.value = "Please enter emergency relation information";
      theme.pushMessage("Please enter emergency relation information");
      valid = false;
    }
    //  if (!form.emergencycontact[i].relation.replace(/\s/g, '').length) {
    //   emer_rela.value = "Please enter emergency relation information";
    //   theme.pushMessage("Please enter emergency relation information");
    //   valid = false;
    // }
    if (form.emergencycontact[i].number === ""||(form.emergencycontact[i].number.length!=10&&form.emergencycontact[i].code['code']==='+91')||/\s/g.test(form.emergencycontact[i].number)||isNaN(form.emergencycontact[i].number)) {
      emer_number.value = "Please enter valid emergency contact information";
      theme.pushMessage("Please enter valid emergency contact information");
      valid = false;
    } 
    // else if (form.emergencycontact[i].number.length != 10&&form.emergencycontact[i].code['code']==='+91') {
    //   emer_number.value = "Please add valid emergency contact number";
    //   theme.pushMessage("Please add valid emergency contact number");
    //   valid = false;
    // } 
    // else if (/\s/g.test(form.emergencycontact[i].number)) {
    //   emer_number.value = "Please add valid emergency contact number";
    //   theme.pushMessage("Please add valid emergency contact number");
    //   valid = false;
    // }else if (isNaN(form.emergencycontact[i].number)) {
    //   emer_number.value = "Please add valid emergency contact number";
    //   theme.pushMessage("Please add valid emergency contact number");
    //   valid = false;
    // }
    if (form.emergencycontact[i].code === null) {
      emercode_error.value = "This field is required";
      theme.pushMessage("Country code is required in emergency information");
      valid = false;
    }
  }
  if (valid === true) {
    try {
      pageLoading.value = true
      await user.checkonlines();
    if(online.value===true){

  
      if (form.referfriend != null && form.referfriend[0].name != "") {
        for (var i = 0; i < form.referfriend.length; i++) {
          form.referfriend[i].number = form.referfriend[i].number;
          form.referfriend[i].code = form.referfriend[i].code.code;

        }
      }

      if (form.emergencycontact != null && form.emergencycontact[0].name != ""){
          for (var i = 0; i < form.emergencycontact.length; i++) {
          form.emergencycontact[i].number = form.emergencycontact[i].number;
          form.emergencycontact[i].code = form.emergencycontact[i].code.code;
        }
        
      }
      
      let data1 = new FormData();
      data1.append(
        "otherdetails",
        JSON.stringify({
          emergencycontact: form.emergencycontact,
          relocation: {
            location: form.relocation.location,
            ready_to_relocate: form.relocation.ready_to_relocate,
          },
        })
      );
      if(form.referfriend&&form.referfriend[0].number){
        // data1.append("referfriend", JSON.stringify(form.referfriend));
        form.referfriend=form.referfriend
      }
      else{
        form.referfriend=null
        // data1.append("referfriend", null);
      }
      
      await user.other({"otherdetails":{
          "emergencycontact": form.emergencycontact,
          "relocation": {
            "location": form.relocation.location,
            "ready_to_relocate": form.relocation.ready_to_relocate,
          }},
          "referfriend":form.referfriend});
          
      if (user.other_message.status === 200) {
        theme.pushMessage(
          "You have successfully added Other Details Information"
        );
        // pageLoading.value = false
        router.push("/");
      } else {
        theme.pushMessage(user.error_other_data);
        user.error_other_data = "";
        pageLoading.value = false
      }
    }
    else{
      // pageLoading.value = true
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
      pageLoading.value = false
      // pageLoading.value = false
    }
      
    } catch (err) {
      theme.pushMessage("Something went wrong");
      pageLoading.value = false
    }
  }
};
</script>

<style >
.hello {
  width: 100%;
}
.modal-card-body {
  overflow-y: auto;
  -ms-overflow-style: none;
}
input.largerCheckbox {
  width: 20px;
  height: 20px;
}
</style>


