<template>
<div v-if="pageLoading" wire:loading
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
    <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
    <p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
  </div>
<div>
  <form-screen-section >
    <card-component
      title="Refer Friend"

      class="mt-8 md:mt-0 text-orange-500"
    >

        <div v-for="(refdata, index1) in form.referfriend" :key="index1">
          <field label="Name" class="text-white">
            <control
              v-model="refdata.name"
              :icon-right="mdiAccount"
              name="Name"
              placeholder="Enter the name"
              autocomplete="username"
              :error="refername_error"

            />
          
          <div class="flex ">
            <div class="flex-none w-32 pr-2"> 
                <field :error="refercode_error" label="Country code" class="text-white">

                   <Multiselect
                    v-model="refdata.code"
                    :searchable="true"
                    valueProp = "code"
                    label="code"
                    :classes="selectClasses"
                    :options="codes"
                    :object="true"
                    class="h-9"
                  />
                </field>
                </div>
                  <div class="shrink w-full h-max mb-4">
                     <field label="Number" class="text-white">
                        <!-- <control
                          v-model="refdata.number"
                          :icon-right="mdiPhone"
                          name="number"
                          placeholder="Enter the Number"
                          :error="
                                 refdata.number.replace(/\s+/g, '').length == 10 && !isNaN(refdata.number.replace(/\s+/g, ''))
                                ? false
                                : 'Mobile(Minimum 10 digits)'
                              "
                          /> -->

                          <control v-if="refdata.code&&refdata.code['code']==='+91'"
                            v-model="refdata.number"
                            name="number"
                            class="pb-0"
                            placeholder="Enter number"
                            :error="
                              refdata.number.replace(/\s+/g, '').length === 10 &&
                              !isNaN(refdata.number.replace(/\s+/g, ''))
                                ? false
                                : 'Mobile(Minimum 10 digits)'
                            "
                          />
                          <control v-else
                            v-model="refdata.number"
                            name="number"
                            class="pb-0"
                            placeholder="Enter number"
                            :error="
                              !isNaN(refdata.number.replace(/\s+/g, ''))
                                ? false
                                : 'Add valid contact number'
                            "
          
        
                          />
                      </field>
                  </div>
                </div>
                </field>
          </div>

          <div class="flex flex-wrap gap-2 m-3">
            <div>
              <jb-button
                  label="Add another Referral"
                  @click="addreferal"
                  color="success"
              />
            </div>
            <div v-if="form.referfriend.length > 1">
              <jb-button 
                  label="Remove"
                  @click="removereferal"
                  color="danger"
              />
            </div> 
        </div>

      <template #footer>
        <level mobile>
          <jb-buttons>
            <jb-button
              label="Submit"
              type="submit"
              color="info"
              @click="submit"
            /> 
          </jb-buttons>
          <jb-buttons>
            <jb-button
              label="Cancel"
              type="submit1"
              color="danger"
              @click="cancel"
            />
     
          </jb-buttons>
        </level>
      </template>
    </card-component>
  </form-screen-section> 
</div>

</template>

<script setup>
import { reactive, ref, computed, onBeforeMount, watch } from 'vue'
import { mdiAccount,mdiPhone,mdiPlusBox,mdiMinusBox } from '@mdi/js'
import FormScreenSection from '@/components/FormScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import JbButton from '@/components/JbButton.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import Multiselect from '@vueform/multiselect'
import { selectClasses } from '@/selectcss.js'
import { sessionStore } from "../stores/session";
import { getdata } from "../stores/user";
import { useRouter,useRoute } from "vue-router";
import { themeStore } from "../stores/theme";
import { studentStore } from "../stores/student"
const stud = studentStore()
const theme = themeStore();
const router = useRouter();
const user = sessionStore();
const code = getdata()
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
const refername_error = ref(false)
const refercode_error = ref(false)
const refernum_error = ref(false)
const online = computed(() =>  user.isonline);

const form = reactive({
   referfriend:[
        {
            name:"",
            number:"",
            code:""
        },
   ],
   referfriend1:[
        {
            name:"",
            number:"",
            code:""
        },
   ],
})

const addreferal = () => {
  form.referfriend.push({
    name:"",
    number:"",
    code:""
  });
  for (var i = 0; i < form.referfriend.length; i++) {
    if(form.referfriend[i].code===""){
      form.referfriend[i].code = codes[0];
    }
      }
      // refername_error.value=false
      // refercode_error.value=false
      // refernum_error.value=false

};

const removereferal = () => {
  form.referfriend.pop();
};
const cancel = async () => {
  router.push("/")
}

const nanfunc = async (name) => {
  if(name){
    if(!/^[a-zA-Z\s\.]+$/.test(name)){
      refername_error.value ="Name field should not contain any number or special character!!"
    }
    else{
      refername_error.value =false
    }
  }
};


const submit = async () => {
  let valid = true
  for (var i = 0; i < form.referfriend.length; i++) {
    if(form.referfriend[i].name === ""||!form.referfriend[i].name.replace(/\s/g, '').length){
      refername_error.value="Please add a Referral"
        theme.pushMessage("Please add a Referral")
        valid=false
    }
    // if(!(/^[a-zA-Z\s\.]+$/.test(form.referfriend[i].name)))
    // {
    //   refername_error.value = "Add valid Name"
    //   theme.pushMessage("Add valid Name")
    //   valid=false
    // }
    if(form.referfriend[i].number === ""){
      refernum_error.value="Please add valid contact number"
        theme.pushMessage("Please add valid contact number")
        valid=false
    }
    // if(form.referfriend[i].code === null){
    //   refercode_error.value="This field is required"
    //     theme.pushMessage("Country code is required")
    //     valid=false
    // }
  //  if(!form.referfriend[i].name.replace(/\s/g, '').length){
  //       refername_error.value="Please add a Referral"
  //       theme.pushMessage("Please add a Referral Name")
  //       valid=false

  //     }
    if(form.referfriend[i].number!="")
    {
      if((form.referfriend[i].number.length!=10&&form.referfriend[i].code['code']==='+91')||/\s/g.test(form.referfriend[i].number))
      {
        refernum_error.value="Please add valid contact number"
        theme.pushMessage("Please add valid contact number")
        valid=false
      }
      // else if((/\s/g.test(form.referfriend[i].number)))
      // {
      //   refernum_error.value="Please add valid contact number"
      //   theme.pushMessage("Please add valid contact number")
      //   valid=false
      // }
      else if(form.referfriend[i].code===""||form.referfriend[i].code === null)
      {
        refercode_error.value="This field is required"
        theme.pushMessage("Country code is required")
        valid=false
      }

    }
        }
    
    if(valid===true){
       pageLoading.value=true
      try{
        await user.checkonlines();
    if(online.value===true){
      for (var i = 0; i < form.referfriend.length; i++) {
        form.referfriend[i].number = form.referfriend[i].number;
        form.referfriend[i].name = form.referfriend[i].name;
        form.referfriend[i].code = form.referfriend[i].code.code;
        }

        if(user.refer_data!=null){
          for (var i = 0; i < user.refer_data.length; i++) {
            form.referfriend.push({"code":user.refer_data[i].code,"name":user.refer_data[i].name,"number":user.refer_data[i].number})
        }
        }
        let data1 = new FormData();
        await user.addreferal({
          "referfriend":form.referfriend});
        if(user.refer_message.status===200){
          theme.pushMessage("You have successfully Refered your friend");
          router.push("/referrallist");
        }
        else{
        theme.pushMessage(user.error_refer_data);
        user.error_refer_data=""
        pageLoading.value=false
        }
    
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
      pageLoading.value=false
    }
    
       
    }
    catch(err){
      theme.pushMessage("Something went wrong");
      pageLoading.value=false
    }
    }
    
  }
const pageLoading = ref(false)
onBeforeMount(async () => {
  pageLoading.value = true
  await user.checkonlines();

  theme.setPageTitle("Refer Friend")
  window.scrollTo(0, 0);
  await user.checkUser();
  if (user.$state.loggedIn===false) {
    router.push("/login");
  }
  else{
    if(online.value===true){
      await user.getvalidations();
    if (user.validation_status===200){
    await user.getstudent();
     if(user.validation.studentcourse===false){
      router.push("/pay_directly")
    }
    else if(user.validation.studentcourse===true&&user.validation.studentbatch===false){
      router.push("/add_regcode")
    }
    else if(user.validation.other===false){
      router.push("/profile")
    }
    else{
      router.push("/referfriend");
    }
    }
    else{
      await user.logout()
      router.go()

    }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }

    
  }
  
  

// window.onpopstate = event => {
//             router.push("/");
//         };
for (var i = 0; i < form.referfriend.length; i++) {
  form.referfriend[i].code = codes[0];
}
pageLoading.value = false

})

</script>