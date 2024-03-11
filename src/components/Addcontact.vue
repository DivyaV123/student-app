<script setup>
import { computed, reactive, ref ,onBeforeMount, onMounted} from 'vue'
import { mdiClose, mdiPlusBox, mdiMinusBox, mdiPhone } from '@mdi/js'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import CardComponent from '@/components/CardComponent.vue'
import Level from '@/components/Level.vue'
import TextLink from '@/components/TextLink.vue'
import Overlay from '@/components/Overlay.vue'
import Field from "@/components/Field.vue";
import TitleSubBar from "@/components/TitleSubBar.vue";
import PersonalForm from "@/components/PersonalForm.vue";
import Control from "@/components/Control.vue";
import { themeStore } from "../stores/theme"
import { sessionStore } from "../stores/session";
import { getdata } from "../stores/user";
import Multiselect from '@vueform/multiselect'
import { selectClasses } from '@/selectcss.js'
import { firebaseStore } from "../stores/firebase";
import firebase from 'firebase/app'
const theme = themeStore();
const user = sessionStore();
const code = getdata();
const fb = firebaseStore();
const interval = ref("");
const timeOut = ref("")
const online = computed(() =>  user.isonline);

const form = reactive({
numberss: [
        {
          number: "",
          code:""
        },
      ]
})

// onMounted(async () => {

 
// });
onBeforeMount(async () => {
  pageLoading.value = true
  await user.checkonlines();
    fb.initiateFirebase()
    fb.initiateAuth()
  
    contact.value[0].code=codes[0]
    // for (var i = 0; i < user.contactarray.length; i++) 
    // {
    //   form.numberss[i] = user.contactarray[i]
    // }
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
  location.reload()
}

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
const timeout = ref(null);
const countDown = ref(30);
const verifyotp2 = ref(false)
const verifyotp1 = ref(false)

const isOpen = ref(false);
const first = ref("");
const second = ref("");
const third = ref("");
const four = ref("");
const counts = ref(0);
const five = ref("");
const six = ref("");
const showsubmit = ref(false)
const removeContact = () => {
    contact.value.pop();
 };

// const formState= reactive({
//   id:props.id,
//   contact: contact

// })

// const confirm = async() => {
//   formState.contact = contact
//   let valid = true
//   let formValues = JSON.parse(JSON.stringify(formState))
//   for (const key in formValues) {
//     if(key === 'contact'){
//      formValues[key].forEach(element => {
//        if(element.number < 10 || isNaN(element.number)){
//          valid= false
//          theme.pushMessage("Contact number with valid number is required!")
//        }
//      });
//    } 
//    }
//    if(valid){
//    let response = await counselor.submitContact(formValues)
//    confirmCancel('confirm')
//    }
//    else{
//   theme.pushMessage("Form Error, please fill out mandatory fields")   
//    }

// }
// const hasCancel = ref(true)
const contact = ref([{ number: "",code:"" }]);
const appVerifier = ref('');
const emails = ref([])
const addContact = () => {
  contact.value.push({ number: "" });
  for (var i = 0; i < contact.value.length; i++) {
        contact.value[i].code = code.$state.code[0].code;
      }
};

// const confirm = async() => {
//   try{
//     console.log("contact",contact.value)
//     for (var i = 0; i < contact.value.length; i++) {
//         contact.value[i].number = contact.value[i].code+""+contact.value[i].number;
//       }
//     await user.addcontact({"numbers":contact.value,"emails":emails.value})
//     theme.pushMessage("Contact number added successfully")
//     showsubmit.value=false
//     contact.value.pop()
//     console.log("sadsadfdaf",user.$state.contact_data)
    
//   }
//   catch(err){
//     console.log(err)
//     console.log("coming here in error")
//     theme.pushMessage("something went wrong");
//   }
// }

function ValidatePassKey(currentid) {
              let currentval = document.getElementById(currentid)
              if (currentval) {
                currentval.onkeyup = function(e) {
                  var target = e.srcElement || e.target;
                  var maxLength = parseInt(target.attributes["maxlength"].value, 10);
                  var myLength = target.value.length;
                  if (myLength >= maxLength) {
                    var next = target;
                    while (next = next.nextElementSibling) {
                      if (next == null)
                        break;
                      if (next.tagName.toLowerCase() === "input") {
                        next.focus();
                        break;
                      }
                    }
                  }
                  else if (myLength === 0) {
                    var previous = target;
                    while (previous = previous.previousElementSibling) {
                      if (previous == null)
                        break;
                      if (previous.tagName.toLowerCase() === "input") {
                        previous.focus();
                        break;
                      }
                    }
                  }
                }
              }
            } 
function  countDownTimer(count){

     if(count > 0 ) {
 
            timeOut.value = setTimeout(() => {
                count -= 1
                countDown.value = count
                countDownTimer(count)
            }, 1000)

        }
    } 
    const nanfunc = async (number,code) => {
      // console.log("numbers",number)
      // console.log("code",code["code"])
    if(number){
        if(number.length===1){
        hasError3.value =false
        }
        else if((number.length!=10&&code["code"]==="+91") || isNaN(number) || /\s/g.test(number)){
        hasError3.value ="Contact Number not valid"
        }
        else{

        hasError3.value =false
        }

    }

    };
const show_personal=ref(false)    
const show_submitbutton=ref(false)
const conResult = ref('');
const hasError3 = ref(false)
const confirm = async ()  => {
    first.value=""
    second.value=""
    third.value=""
    four.value=""
    five.value=""
    six.value=""

    if(window.recaptchaVerifier ){
        window.recaptchaVerifier.render().then(function(widgetId) {
                    grecaptcha.reset(widgetId);
                });
    }

     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        
          // submit();
 
        }
  
});
appVerifier.value = window.recaptchaVerifier


  try{
    pageLoading.value = true
    await user.checkonlines();
    if(online.value===true){
      contact.value[0].number = contact.value[0].number.trim()
      if(contact.value[0].number===""||contact.value[0].code===null||(contact.value[0].number.length!=10&&contact.value[0].code["code"]==="+91")||isNaN(contact.value[0].number)||/\s/g.test(contact.value[0].number))
    {
      theme.pushMessage("Add contact details!")
    }
    // else if(contact.value[0].code===null)
    // {
    //   theme.pushMessage("Add country code!")
    // }
    // else if(contact.value[0].number.length!=10&&contact.value[0].code["code"]==="+91")
    // {
    //   theme.pushMessage("Add Valid number!")
    // }
    //  else if(isNaN(contact.value[0].number))
    // {
    //   theme.pushMessage("Add Valid number!")
    // }
    // else if(/\s/g.test(contact.value[0].number)){
    //   theme.pushMessage("Add Valid number!")
    // }
    else
    {

          clearTimeout(interval.value)
          clearTimeout(timeOut.value)
    

          await user.getstudentnumbercheck(contact.value[0].number)
       
    
          if(user.check_number===false){
          firebase.auth().signInWithPhoneNumber(contact.value[0].code.code+""+contact.value[0].number, window.recaptchaVerifier)
            .then((confirmationResult) => {
         
      
              isOpen.value = false
              countDown.value = 30
              interval.value = setTimeout(() => {
                                isOpen.value = true 
                                }, 30000)                
              countDownTimer(countDown.value)
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
              conResult.value = confirmationResult;
              theme.pushMessage("OTP sent successfully to your mobile number");
              verifyotp1.value = true
              verifyotp2.value = true
              
              // ...
            }).catch((error) => {
              clearTimeout(interval.value)
              clearTimeout(timeOut.value)
              verifyotp2.value=true
              verifyotp1.value=false
              window.recaptchaVerifier.render().then(function(widgetId) {
                grecaptcha.reset(widgetId);
              });
              theme.pushMessage("Some technical error occured so please wait for some time");
              value.value = false
              location.reload()
              // Error; SMS not sent
              // ...
            });
             }
            else {
              theme.pushMessage("Number has been already registered");
              value.value=false
              location.reload()
            }
          
          // if(code.otp.message==="contact does not exists."){
          //   theme.pushMessage("OTP sent successfully to your mobile number");
          //   code.otp.message=""
          //   verifyotp1.value = true
          //   verifyotp2.value = true
          // }
          // else if(code.error_otp_send){
          //     if(code.error_otp_send.error==="otp limit exceeded try again tomorrow."){
          //       theme.pushMessage("OTP has been sent to you for 10 times Today...Please try again Tomorrow");
          //       code.error_otp_send = ""
          //       clearTimeout(interval.value)
          //       clearTimeout(timeOut.value)
          //       verifyotp.value=true
          //       verifyotp2.value=true
          //       verifyotp1.value=false
          //       addfirst.value=true
          //       router.push("/login")
          //     }
          //     else if(code.error_otp_send.error==="number already registered please log in."){
          //       theme.pushMessage("This number has been already registered...PLease try with another number");
          //       code.error_otp_send = ""
          //       clearTimeout(interval.value)
          //       clearTimeout(timeOut.value)
          //       verifyotp.value=true
          //       verifyotp2.value=true
          //       verifyotp1.value=false
          //       addfirst.value=true
          //     }
          // }
  

    }
    pageLoading.value = false

    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
      pageLoading.value = false
    }
    
    }

    catch(err){
      theme.pushMessage("something went wrong");
      pageLoading.value = false
      clearTimeout(interval.value)
      clearTimeout(timeOut.value)
      code.error_otp_send = ""
      location.reload()
    }
}

const verify = async ()  => {
  
  const data1=first.value+second.value+third.value+four.value+five.value+six.value
  if(first.value==""&&second.value==""&&third.value==""&&four.value==""&&five.value==""&&six.value=="")
    {
      theme.pushMessage("Enter the OTP!!")
    } 
  else
  {
  try{ 
    pageLoading.value = true
    await user.checkonlines(); 
    if(online.value===true){ 
    window.confirmationResult.confirm(data1).then((result) => {
        const user = result.user;
        theme.pushMessage("OTP has been verified to the number"+ "   "+ contact.value[0].number);
        verifyotp1.value=false
        clearTimeout(interval.value)
        clearTimeout(timeOut.value)
        // user.updatecontact({"number":contact.value[0].number,"code":contact.value[0].code.code})
        show_submitbutton.value=true
        // value.value=false
      }).catch((error) => {
        theme.pushMessage("You have entered wrong OTP...Please enter valid OTP");
        // User couldn't sign in (bad verification code?)
        // ...
      });  
      pageLoading.value = false
    }
    else{
      // pageLoading.value = false
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
      pageLoading.value = false
    }
          
    }
    catch(err){
      theme.pushMessage("Something went wrong");
      pageLoading.value = false
    }
}

    }

  const submitbutton = async ()  => {
    try{
      pageLoading.value = true
      await user.checkonlines();
    if(online.value===true){
      user.updatecontact({"number":contact.value[0].number,"code":contact.value[0].code.code})
      theme.pushMessage("Contact added successfully");
      location.reload()
      value.value=false
      pageLoading.value = false
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
      pageLoading.value = false
    }
     
    }
    catch(err){
      theme.pushMessage(user.update_contact_error)
      pageLoading.value = false
      location.reload()
      value.value=false
    }
  }

const delay = async ()  => {
  isOpen.value = false
  //   countDown.value = 60
   interval.value = setTimeout(() => {
                isOpen.value = true
                }, 30000)
  //   var count = countss.value;
  //   count ++;
  //   countss.value = count
  //   const qqss = ls.setStorage({
  //               key: 'counts',
  //               data: JSON.stringify(countss.value),               
  //           }) 
  //   console.log("qqss",qqss)
  //   if(countss.value>=4){
  //           // router.push("/resend_corporate");
  //       }
  //   try{
  //     await code.send_otp({ number: contact.value[0].code+""+contact.value[0].number});
  //     theme.pushMessage("OTP sent successfully");
  //     countDownTimer(60);
  //   }
  //   catch(err){
  //     theme.pushMessage("Something went wrong");
  //   }
 
}
const cancel = () => {
  clearTimeout(interval.value)
  clearTimeout(timeOut.value)
  location.reload()
  value.value = false
}
const pageLoading = ref(false);
const fetchCode = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      let courses = await code.getcountrycode(query);
  return courses
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
 
};
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
      title="Add Contact Number"
      :header-icon="mdiClose"
      @header-icon-click="cancel"
    >
        <div class="flex"  v-for="(con, i) in contact"
        :key="i" >
          <div v-if="verifyotp1===false&&show_submitbutton===false" class="flex-none w-32 pr-2"> 
              <field label="country code" >

        <Multiselect
                  v-model="con.code"
                  :searchable="true"
                  valueProp = "code"
                  label="code"
                  class="text-white"
                  :classes="selectClasses"
                  :options="codes"
                  :object="true"
                />
              </field>
            </div>
          <div class="shrink w-full h-max pt-0" v-if="verifyotp1===false&&show_submitbutton===false"> 
        <field label="Contact Number" grouped>
        <control
            :onchange="nanfunc(con.number,con.code)"
            v-model="con.number"
            :icon-left="mdiPhone"
            :id = "`${con.number}`" 
            class="text-xs"
            help="Please add contact number"
            placeholder="Enter additional contact number"
            :error="hasError3"
              />
        <!-- <jb-button color="info" :icon="mdiPlusBox" @click="addContact"  small />
        <jb-button
        v-if="contact.length > 1"
          color="danger"
          :icon="mdiMinusBox"
          @click="removeContact"
          small
        /> -->
      </field>
          </div>
        </div>

        <div v-if="show_submitbutton===true">
          <div v-if="contact&&contact[0]">
        
         <field label="Contact Number" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700">  <h1 class="px-3 py-2 max-w-full focus:ring focus:outline-none dark:placeholder-gray-400 h-12 border-0 border-gray-700 dark:bg-gray-800 rounded pr-10 opacity-50 cursor-not-allowed text-white font-bold">{{contact[0].code.code+""+contact[0].number}}</h1>  
       </field>
          </div>
        </div> 


      <h1 class="text-l font-bold text-white mt-4 ml-3" v-if="verifyotp1==true&&show_submitbutton===false">OTP Verification</h1>
        <div class=" " v-if="verifyotp1==true&&show_submitbutton===false">
            <div id="otp" class="flex w-[336px] justify-center text-center  mt-[7px]"> 
              <input :onchange="ValidatePassKey('first')" v-model="first" class="m-2 border h-10 w-10 text-center form-control rounded text-black" type="first" id="first" name="first" maxlength="1"/>
              <input  :onchange="ValidatePassKey('second')" v-model="second" class="m-2 border h-10 w-10 text-center form-control rounded text-black" type="second" id="second" name="second" maxlength="1"/> 
              <input  :onchange="ValidatePassKey('third')" v-model="third" class="m-2 border h-10 w-10 text-center form-control rounded text-black" type="third" id="third" name="third" maxlength="1"/> 
              <input  :onchange="ValidatePassKey('four')" v-model="four" class="m-2 border h-10 w-10 text-center form-control rounded text-black" type="four" id="four" name="four" maxlength="1"/>
              <input  :onchange="ValidatePassKey('five')" v-model="five" class="m-2 border h-10 w-10 text-center form-control rounded text-black" type="five" id="five" name="five" maxlength="1"/> 
              <input  :onchange="ValidatePassKey('six')" v-model="six" class="m-2 border h-10 w-10 text-center form-control rounded text-black" type="six" id="six" name="six" maxlength="1"/> 
            </div>
        
            <div class=" justify-items-start mt-[4px] pb-[5px] ml-[10px]">
                <jb-buttons v-if="isOpen== true">
                    <jb-button
                      label="Resend OTP?"
                      color="info"
                      @click="confirm"
                      id="sign-in-button"
                    />
                </jb-buttons>
                <jb-buttons v-else>
                  <h2 class="text-success  hover:underline">Resend OTP in {{countDown}} seconds</h2>
                </jb-buttons>
              </div>
        </div>

        <jb-buttons v-if="verifyotp2==false&&show_submitbutton===false">
            <jb-button
              label="Send OTP"
              color="info"
                id="sign-in-button"
              @click="confirm"
            />
      </jb-buttons>

      <jb-buttons v-if="verifyotp1==true&&show_submitbutton===false">
            <jb-button
              label="Verify OTP"
              color="info"
              @click="verify"
            />
      </jb-buttons>

      <template #footer>
        <level mobile>
          <jb-buttons >
            <jb-button v-if="show_submitbutton==true"
              label="Submit Contact"
              color="info"
              @click="submitbutton"
            
            />
            <!-- <jb-button
              label="Cancel"
              color="white"
              outline
              @click="cancel"
            /> -->
          </jb-buttons>

          <text-link

          />
        </level>
      </template>
      <!-- {{form.numberss}} -->
      <PersonalForm v-if="show_personal===true" v-model="show_personal" :numbers_value="form.numberss" has-cancel/>
    </card-component>
  </overlay>
</template>