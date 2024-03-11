<script setup>
import { computed, onBeforeMount, ref, reactive } from "vue";
import { mdiClose, mdiCity } from "@mdi/js";
import JbButton from "@/components/JbButton.vue";
import JbButtons from "@/components/JbButtons.vue";
import Multiselect from "@vueform/multiselect";
import { selectClasses } from "@/selectcss.js";
import Field from "@/components/Field.vue";
import Control from "@/components/Control.vue";
import CardComponent from "@/components/CardComponent.vue";
// import Termsandconditions from "@/components/Termsandconditions.vue";
import Level from "@/components/Level.vue";
import TextLink from "@/components/TextLink.vue";
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import MethodModal from "@/components/MethodModal.vue";
import Overlay from "@/components/Overlay.vue";
import Divider from "@/components/Divider.vue";
import { sessionStore } from "../stores/session";
import { themeStore } from "../stores/theme";
import { useRouter } from "vue-router";
import dayjs from 'dayjs';
const router = useRouter();
const theme = themeStore();
import { studentStore } from "../stores/student";
const student = studentStore();
const user = sessionStore();
const props = defineProps({
  addpagevalue: String,
  apm: Object,
  title: {
    type: String,
    default: null,
  },
  largeTitle: {
    type: String,
    default: null,
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

const online = computed(() =>  user.isonline);


onBeforeMount(async () => {
  await user.checkonlines();
  if(online.value===true){
  user.getstudentcoursess();
  user.getModeofclass();
  user.getvalidations();
  user.getstudentbranchcity()
  await user.getcourses1(22,2,user.validation.fresherexp.id);
  }
  else{
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  }
  if(user.student_course&&user.student_course[0]){
    partial_balance.value=user.student_course[0].partial_balance
    oneshot_balance.value=user.student_course[0].oneshot_balance
    ids.value=user.student_course[0].id
    branchids.value=user.student_course[0].branch.branchid
    branchname.value=user.student_course[0].branch.branchname
  }
  // await user.getcourses1(19,1,2);

});
const pageLoading = ref(false)
const gateway = computed(() => student.gateway);
const partial_balance=ref(0)
const oneshot_balance=ref(0)
const agree = ref(false)
const show_terms=ref(false)
const addresspay = computed(() => props.apm);
const showpaygateway = ref(false);
const itemsPaginated = computed(() => student.course);
const itemsCount = computed(() => student.coursecount);
const ids=ref(null)
const branchids=ref(null)
const branchname=ref(null)
if(props.apm&&props.apm.partial_balance){
  partial_balance.value=props.apm.partial_balance
}
if(props.apm&&props.apm.oneshot_balance){
  oneshot_balance.value=props.apm.oneshot_balance
}
if(props.apm&&props.apm.id){
  ids.value=props.apm.id
}
if(props.apm&&props.apm.branch.branchid){
  branchids.value = props.apm.branch.branchid
}
if(props.apm&&props.apm.branch.branchname){
  branchname.value = props.apm.branch.branchname
}

const cities = ref([ 
    {
        "id": 6,
        "name": "hyderabad"
    },
    {
        "id": 2,
        "name": "bangalore"
    },
    {
        "id": 1,
        "name": "hassan"
    }])

const fetchcities = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      if(query){
    cities.value = await user.getrelocation(query);
  }
  else{
    cities.value=[ 
    {
        "id": 6,
        "name": "hyderabad"
    },
    {
        "id": 2,
        "name": "bangalore"
    },
    {
        "id": 1,
        "name": "hassan"
    }]
  }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
   



  
};        
const fetchmodeofclass = computed(() => {
  return user.mode_of_class.filter(word => 
    word.name.toLowerCase() !='both');
  // await user.checkonlines();
  //   if(online.value===true){
  //     return user.mode_of_class.filter(word => 
  //   word.name.toLowerCase() !='both');
  //   }
  //   else{
  //     theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  //   }
   
 
});
const fetchcity = computed(() => user.branch_city);
// const fetchmodeofclass = async () => {
//   let selectstates = await user.getModeofclass();
//   return selectstates
// };
// const fetchcourses = async (query, query1) => {
//   let selectdistrict = await user.getcourses(query, query1);
//   return selectdistrict
// };


const fetchbranches = async (query) => {
  // console.log("inside fetch branches")
  await user.checkonlines();
    if(online.value===true){
      form.branch=null
      // console.log("user.query.id",query)
  if(query&&query.id){
    
    await user.getstudentbranch(query.id);
  }
  
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
   
  
};

const changemodeofclass = async() =>{
  form.city=null
  form.branch=null
  form.course=null
}

const fetchcourses = async (branch,modeofclass,fresher_exp) => {
  await user.checkonlines();
    if(online.value===true){
      form.course=null
  if(branch&&branch.id){
    await user.getcourses(branch.id,modeofclass.id,fresher_exp);
  }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
   
 

};

const studentbranches = computed(() => {
  return user.branch
}) 

const studentcourses = computed(() => {
  return user.pay_courses
})

const studentcourses1 = computed(() => {
  return user.pay_coursess
})




const amount = ref("")

const form = reactive({
  mode_of_class: null,
  branch: null,
  course: null,
  city:null
});

const addresserror = ref(false);
const districterror = ref(false);
const countryerror = ref(false);
const stateerror = ref(false);

const cardClassAddon = computed(() =>
  addresserror.value ||
  districterror.value ||
  stateerror.value ||
  countryerror.value
    ? "animate-shake"
    : ""
);

const option = ref("");
const partial = ref("");
const same_as_above = ref(false)
const checkboxOptions = { true: "Yes I have read all the terms and conditions and accepted it" };
const haserror = ref(false);
const haserror1 = ref(false);

const selectmethod = async () => {
  let valid = true;
  if (form.mode_of_class === null) {
    stateerror.value = "This field is required";
    theme.pushMessage("Mode of class is required");
    valid = false;
  }

  if (form.branch === null&&form.mode_of_class.name.toLowerCase()==='offline') {
    districterror.value = "This field is required";
    theme.pushMessage("Branch is required");
    valid = false;
  }
  if (form.course === null) {
    addresserror.value = "This field is required";
    theme.pushMessage("Course is required");
    valid = false;
  }
  if (valid === true) {
    try {
      pageLoading.value = true
      await user.checkonlines();
    if(online.value===true){
      await user.paycourse(form.course);
      if (user.pay_course.status===200) {
        theme.pushMessage("course updated successfully!");
        user.pay_course_error=""
        showpaygateway.value = true;
      } else if(user.pay_course_error) {
        theme.pushMessage(user.pay_course_error);
        user.pay_course_error = ""
      }
      await user.getstudentcoursess()
      if(user.student_course&&user.student_course[0]){
              partial_balance.value=user.student_course[0].partial_balance
              oneshot_balance.value=user.student_course[0].oneshot_balance
              ids.value=user.student_course[0].id
              branchids.value = user.student_course[0].branch.branchid
              branchname.value = user.student_course[0].branch.branchname

      }
      pageLoading.value = false

    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
      pageLoading.value = false
    }
   
     
    } catch(err) {
      await user.checkonlines();
    if(online.value===true){
      theme.pushMessage("Something went wrong,Try again!!!");
      cancel();
      await user.getstudentcoursess();
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
    pageLoading.value = false
     
    }
  }
};

const createOrder = async () => {
  pageLoading.value = true
  let razorpayScript = document.createElement("script");
  razorpayScript.setAttribute(
    "src",
    "https://checkout.razorpay.com/v1/checkout.js"
  );
  document.head.appendChild(razorpayScript);
  try {
    // if(partial.value===true){
    //   await student.getOrders({
    //   "amount":partial_balance.value,
    //   "currency":"INR",
    //   "name":user.studentname,
    //   "number":user.studentcontact,
    //   "email":user.studentemail
    // });
    // }
    // else{
      await user.checkonlines();
    if(online.value===true){
      await student.getOrders({
      "amount":parseInt(amount.value),
      "currency":"INR",
      "name":user.validation.name,
      "number":user.studentcontact,
      "email":user.studentemail,
      "course":ids.value,
      "student_id":user.validation.id
    });
    // }
   

    if (student.$state.update) {
      let orders = student.update;
      var options = {
        key: orders.data.merchant_key,
        amount: orders.data.amount,
        currency: orders.data.currency,
        name: branchname.value,
        order_id: orders.data.order_id,
        theme: {
          color: "#333333",
          hide_topbar: false,
        },
        modal: {
          confirm_close: true,
          escape: false,
          handleback: true,
        },
        prefill: {
          name: orders.data.name,
          email: orders.data.email,
          contact: orders.data.number,
        },
        readonly: {
          email: true,
          contact: true,
        },
        send_sms_hash: true,
        handler: async function (response) {

      
    
            student.paymentVerification(JSON.stringify({
                "opid":orders.data.opid,
                "cid":ids.value, 
                "sid":user.user.uid,
                "response": {
                          "razorpay_payment_id": response.razorpay_payment_id,
                          "razorpay_order_id": response.razorpay_order_id,
                          "razorpay_signature": response.razorpay_signature
                      },
                "amount": parseInt(amount.value),
                "type": "online",
                "branch": branchids.value,
                "location":"same_location", 
                "date": dayjs(new Date()).format("YYYY-MM-DD h:mm:ss")
              }));
              theme.pushMessage("Payment Successful");
              if(student.validate){
                await user.getvalidations();
                await user.getstudentcoursess();
                await user.getstudentpayments();

              }
              
              // user.getstudent();
              // location.reload()

          router.push("/paymentcourselist");

        },
      };
      var rzp1 = new Razorpay(options);
      rzp1.open();
      rzp1.on("payment.failed", function (response) {

        student.failurepaymentVerification(JSON.stringify({
          "opid":orders.data.opid,
          "response": {
                      "code": response.error.code,
                      "description": response.error.description,
                      "source": response.error.source,
                      "step": response.error.step,
                      "reason": response.error.reason,
                      "order_id": response.error.metadata.order_id,
                      "payment_id": response.error.metadata.payment_id,
                  },
        }));
        theme.pushMessage("Payment Failed");
      });
    } else {
      theme.pushMessage(student.$state.error);
      await student.removeError();
    }
    pageLoading.value = false
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
      pageLoading.value = false
    }
   
   
  } catch (error) {
    pageLoading.value = false

  }
};

const submit = async () => {

  let valid = true;
  pageLoading.value = true
  await user.checkonlines();
  if(online.value===true){
    if(amount.value === ""|| parseInt(amount.value)<=0||!amount.value.replace(/\s/g, '').length||isNaN(amount.value)){
        haserror1.value = "This field is required"
        theme.pushMessage("Please enter the amount that you want to pay")
      }
      else if(amount.value.length>=7){
        // haserror1.value = "This field is required"
        theme.pushMessage("Please enter the valid amount!!")
      }
    // else if( parseInt(amount.value)<=0){
    //   haserror1.value = "This field is required"
    //   theme.pushMessage("Please enter the amount that you want to pay")
    // }
    // else if(!amount.value.replace(/\s/g, '').length){
    //   haserror1.value = "This field is required"
    //   theme.pushMessage("Please enter the amount that you want to pay")
    // }
    // else if(isNaN(amount.value)){
    //   haserror1.value = "This field is required"
    //   theme.pushMessage("Please enter the amount that you want to pay")
    // } 
    else {
    cancel();
   createOrder();
  }
  pageLoading.value = false
  }
  else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
      pageLoading.value = false
    }
};


const nanfunc = async () => {
form.branch=null
form.course=null
  
};

const lightBorderStyle = computed(() => theme.lightBorderStyle);

const lightBgStyle = computed(() => theme.lightBgStyle);

const tableTrStyle = computed(() => theme.tableTrStyle);

const tableTrOddStyle = computed(() => theme.tableTrOddStyle);

const darkMode = computed(() => theme.darkMode);

const addpage = computed(() => props.addpagevalue);

const terms = async (datas) => {
  if(datas===true){
    show_terms.value=true   
  }
  else{
    show_terms.value=false 
  }
                   
   
};
const emit = defineEmits(["update:modelValue", "cancel", "confirm"]);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const confirmCancel = async(mode) => {
  await user.checkonlines();
    if(online.value===true){
      user.getvalidations();
  if(user.validation.studentcourse===false){
    value.value=false
  }
  else{
    router.push("/add_regcode")
  }
  emit(mode);
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }

};

const confirm = () => confirmCancel("confirm");

const cancel = () => confirmCancel("cancel");
</script>

<template>
  <overlay @overlay-click="cancel">
    <div v-if="pageLoading" wire:loading
      class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
      <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
      <p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
    </div>
    <card-component
      :title="title"
      class="shadow-lg w-full max-h-modal md:w-5/6 lg:w-3/5 z-50 xl:w-1/2 height-modal h-[440px] xl:h-auto items1"
      :class="{ 'animate-shake': shake }"
      :header-icon="mdiClose"
      modal
      @header-icon-click="cancel"
    >
      <div class="space-y-3">
        <h1 v-if="largeTitle" class="text-2xl">
          {{ largeTitle }}
        </h1>
        <!-- <slot /> -->
      </div>
   <!-- v-if="user.student_course===null&& showpaygateway===false&&show_terms===false" -->
      <div
      v-if="user.student_course&&user.student_course.length===0&& showpaygateway===false&&show_terms===false" 

      > 
      <!-- <div> -->
        <!-- <card-component> -->
          <div class="grid md:grid-cols-2 sm:grid-cols-2 gap-5 mt-4 mb-4">

             <small>
              <field
                label="Mode of class"
                :error="stateerror"
                help="Select the Mode of class"
                class="text-sm"
              >
                <Multiselect
                  v-model="form.mode_of_class"
                  placeholder="Select Mode of class"
                  searchable
                  valueProp="name"
                  label="name"
                  :object="true"
                  :classes="selectClasses"
                  :options="fetchmodeofclass"
                  @select="changemodeofclass()"
                  
                />
              </field>
            </small>

            <small v-if="form.mode_of_class&&form.mode_of_class.name.toLowerCase()==='offline'">
              <field
                label="City where Branch is located"
                :error="stateerror"
                help="Select the city"
                class="text-sm"
              >
                <Multiselect
                  v-model="form.city"
                  placeholder="Select city"
                  searchable
                  valueProp="name"
                  label="name"
                  :object="true"
                  :classes="selectClasses"
                  :options="fetchcity"
                  @select="fetchbranches(form.city)"
                  
                />
              </field>
            </small>

            <small v-if="form.mode_of_class&&form.mode_of_class.name.toLowerCase()==='offline'">
              <field v-if="form.city"
                label="Branch"
                :error="districterror"
                help="Select the Branch"
                class="text-sm"
              >
                <Multiselect
                  v-model="form.branch"
                  placeholder="Select Branch"
                  valueProp="name"
                  searchable
                  label="name"
                  :object="true"
                  :classes="selectClasses"
                  :options="studentbranches"
                  @select="fetchcourses(form.branch,form.mode_of_class,user.validation.fresherexp.id)"
                />
              </field>
            </small>

            <field v-if="form.branch"
                label="Course"
                :error="addresserror"
                help="Select the Course"
                class="text-sm"
              >
                <Multiselect
                  v-model="form.course"
                  placeholder="Select Course"
                  searchable
                  valueProp="displayname"
                  label="displayname"
                  :object="true"
                  :classes="selectClasses"
                  :options="studentcourses"
                  
                />
              </field>

              <field v-if="form.mode_of_class&&form.mode_of_class.name.toLowerCase()==='online'"
                label="Course"
                :error="addresserror"
                help="Select the Course"
                class="text-sm"
              >
                <Multiselect
                  v-model="form.course"
                  placeholder="Select Course"
                  searchable
                  valueProp="displayname"
                  label="displayname"
                  :object="true"
                  :classes="selectClasses"
                  :options="studentcourses1"
                  
                />
              </field>

           
          </div>
        <!-- </card-component> -->

        <divider />
        <jb-buttons>
          <jb-button         
            label="Submit"
            color="info"
            type="submit"
            @click="
              selectmethod(
 

              )
            "
          />
        </jb-buttons>

      </div>
      <!-- v-if="(user.student_course || showpaygateway == true) -->
      <div v-if="((user.student_course&&user.student_course.length!=0) || (showpaygateway == true))" >

        <div>
      <field class="mt-2 text-green-300"  >        
         <div>
              <span class="label-text pr-1 text-white font-bold">If Partial Payment then amount is <span class="label-text pr-1 text-orange-500 font-bold">{{partial_balance}}</span></span> 
         </div>
         <div>
              <span class="label-text pr-1 text-white font-bold">If OneShot Payment then amount is <span class="label-text pr-1 text-orange-500 font-bold"> {{oneshot_balance}}</span></span>
         </div> 
      </field>

      <field label="Amount" class="text-white text-sm " :error="haserror1">
            <control
            v-model="amount"
            :icon-right="mdiAccount"
            name="URL"
            placeholder="Enter the amount here"
            autocomplete="username"
            />
        </field>
        <div class="space-y-3">
        <h1
          class="text-2xl text-red-700 font-semibold"
        >
          {{ "Terms and conditions" }}
        </h1>
        <slot />
      </div>

      <div class="text-white  text-sm">
              {{"1"}}.{{"Payment will be confirmed once bank approves the transaction"}}<br>
              {{"2"}}.{{"By accepting this receipt I accept all terms and conditions"}}<br>
              {{"3"}}.{{"Payment is valid for 6 months"}}<br>
              {{"4"}}.{{"Please keep the receipt safe till completion of the course"}}<br>
              {{"5"}}.{{"The receipt is not transferable"}}<br>
              {{"6"}}.{{"Complete Fees is charged only for training not for placement activities"}}<br>
              {{"7"}}.{{"Fees paid will not be refundable if student quits the course before completion"}}<br>
              {{"8"}}.{{"Fees is not for interview we provide"}}<br>
          </div>


        
        </div>
        <divider />
        <template v-if="((showpaygateway === true) || (user.student_course&&user.student_course.length!=0))">

        <field 
          class="
            text-white text-sm
          "
        >
          <check-radio-picker
            v-model="same_as_above"
            name="checkbox2"
            id="myCheckbox"
            class="font-bold "
            :options="checkboxOptions"
            column
            :onchange="terms(same_as_above)"
          />
        </field>

            <jb-buttons v-if="show_terms===true">
              <jb-button
                label="Pay"
                color="info"
                type="submit"
                class="w-full font-bold"
                @click="submit"
              />
            </jb-buttons>

          <jb-buttons v-if="show_terms===false">
            
            <jb-button
              label="Pay"

              type="submit1"
              class="w-full font-bold dark:bg-gray-800 text-white hover:bg-gray-800"
            />
          </jb-buttons>


            
   
  
        </template>
      </div>
    </card-component>
  </overlay>
</template>

<style>
.height-modal{
  max-height: calc(100vh - 30px) !important;
}
.items1 {
  overflow-y: auto !important;;
}
</style>
