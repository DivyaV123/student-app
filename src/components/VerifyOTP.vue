
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
      class="shadow-lg w-full max-h-modal sm:w-4/5 md:w-4/5 lg:w-1/2 z-50"
    >
    <p v-if="isverify===false&&isconfirm===false" class="py-4  text-gray-300 font-bold"> OTP will be sent to the entered number</p>


      <div v-if="isverify===false&&isconfirm===false " class="flex">
          <div  class="flex-none w-32 pr-2 "> 
            <field label="country code" :error="hasError2" help="Select country code" class="text-sm">
   
  
                <Multiselect
                  v-model="selected"
                  :searchable="true"
                  valueProp = "code"
                  label="code"
                  :classes="selectClasses"
                  :options="codes"
                  :object="true"
                  class="h-10"
                />
            </field> 
          </div>
          <div class="shrink w-full h-max">
          <field label="Contact Number" class="text-sm" help="Please enter your contact number">
            <control
              v-model="form.number"
              :error="hasError3" 
              name="email"
              :onchange="nanfunc(form.number)"
            />
          </field>
            </div>
      </div>

      <div v-if="isverify===true&&isconfirm===false"  class="max-w-sm mx-auto md:max-w-lg">
        <div class="w-full">
            <div  class="h-48 py-3 rounded text-center">
            <h1 class="text-2xl font-bold text-teal-500">OTP Verification</h1>
            <div v-if="isverify===true" class="flex flex-col mt-4 text-white"> <span>Enter the OTP you received at</span> <span class="font-bold text-white">{{selected["code"]+""+form.number}}</span> </div>
            <div id="otp" class="flex flex-row justify-center text-center px-2 mt-5"> 
              <input :onchange="ValidatePassKey('first')" v-model="first" class="m-1 border h-8 w-8 text-center form-control rounded text-black" type="first" id="first" name="first" maxlength="1"/>
                <input :onchange="ValidatePassKey('second')" v-model="second" class="m-1 border h-8 w-8 text-center form-control rounded text-black" type="second" id="second" name="second" maxlength="1"/> 
                <input :onchange="ValidatePassKey('third')" v-model="third" class="m-1 border h-8 w-8 text-center form-control rounded text-black" type="third" id="third" name="third" maxlength="1"/> 
                <input :onchange="ValidatePassKey('four')" v-model="four" class="m-1 border h-8 w-8 text-center form-control rounded text-black" type="four" id="four" name="four" maxlength="1"/>
                <input :onchange="ValidatePassKey('five')" v-model="five" class="m-1 border h-8 w-8 text-center form-control rounded text-black" type="five" id="five" name="five" maxlength="1"/> 
                <input :onchange="ValidatePassKey('six')" v-model="six" class="m-1 border h-8 w-8 text-center form-control rounded text-black" type="six" id="six" name="six" maxlength="1"/>
            </div>
            <div class="flex justify-center text-center mt-5"> <a class="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><i class='bx bx-caret-right ml-1'></i></a> </div>
            </div>
        </div>
        <div v-if="isverify===true" class="mb-0 grid justify-items-center">
        <jb-button
              label="Verify OTP"
              type="verify"
              color="info"
              @click="verifyotp"
            />
        </div>
    </div>


    <div v-if="isverify===true&&isconfirm===false" class="grid justify-items-center">
          <div v-if="isOpen== true" class="">
            <div class="mt-4">
              <button  @click="send" id="sign-in-button">
                  <h2 class="text-right text-white hover:underline ">Resend OTP?</h2>
              </button>
            </div>
          </div>
          <div v-else>
            <div class="mt-4 ">
              <button class="" >
                <h2 class="text-white  hover:underline ">Resend OTP button will be enabled in {{countDown}} seconds</h2>
              </button>
            </div>
          </div>
    </div>
    <field v-if="isconfirm===true" label="New Password" help="Please enter your new password" >
        <control
          v-model="form.password"
          :error="hasError"
          :icon-right="oldPassShowHideClicked? mdiEyeOff:mdiEye"
          type="password"
          name="password"
          class="text-xs"
          placeholder="Enter your new Password here"
          @right-icon-click="oldToggleEye"
        />
      </field>

      <field v-if="isconfirm===true" label="Confirm Password"  help="Please enter your confirm password">
        <control
          v-model="form.confirmed_password"
          :error="hasError"
          :icon-right="newPassShowHideClicked? mdiEyeOff:mdiEye"
          type="password"
          name="password"
          class="text-xs"
          placeholder="Confirm your new Password here"
          @right-icon-click="newToggleEye"
        />
      </field>

        <level mobile>
          <jb-buttons v-if="isconfirm===true">
            <jb-button
              label="Submit"
              type="changepassword"
              color="info"
              @click="changepassword"
            />
     
          </jb-buttons>

        </level>


      <template #footer >
        <level mobile>
          <jb-buttons v-if="isverify===false " >
            <jb-button
              label="Send OTP"
              type="submit1"
              color="info"
              id="sign-in-button"
              @click="send"
            />
     
          </jb-buttons>

     
        </level>
      </template>
    </card-component>
</overlay>
<Recaptcha v-if="captcha===true" /> 
</template>

<script setup>
import { reactive, ref, computed, onBeforeMount } from 'vue'
import { mdiEmail,mdiPhone,mdiEyeOff,mdiEye } from '@mdi/js'
import FormScreenSection from '@/components/FormScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import Field from '@/components/Field.vue'
import dayjs from 'dayjs';
import Control from '@/components/Control.vue'
import JbButton from '@/components/JbButton.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import TextLink from '@/components/TextLink.vue'
import { sessionStore } from "../stores/session";
import { themeStore } from "../stores/theme";
import { useRouter,useRoute } from "vue-router";
import { getdata } from "../stores/user";
// import { useStorage } from "vue3-storage";
import Overlay from '@/components/Overlay.vue'
import Multiselect from '@vueform/multiselect'
import { selectClasses } from '@/selectcss.js'
import { firebaseStore } from "../stores/firebase";
import firebase from 'firebase/app'
// const ls = useStorage();
const fb = firebaseStore();
const auth = computed(() => firebase.auth);
const router = useRouter();
const route = useRoute();
const user = sessionStore();
const code = getdata();
const theme = themeStore()
const isverify = ref(false)
const isconfirm = ref(false)
const countDown = ref(120);
const timeOut = ref('')
const first = ref("");
const second = ref("");
const third = ref("");
const four = ref("");
const five = ref("");
const six = ref("");
const datassss = ref(null);
const counts = ref(0);
const verify_number = ref("");
const form = reactive({
  number: '',
  confirmed_password: '',
  password: '',
})
const appVerifier = ref('');
const conResult = ref('');
const hasError2 = ref(false)
const datassss1 = ref(null);
let selected = ref(null);
const hasError = ref(false)
const hasError3 = ref(false)
const isOpen = ref(false);
const interval = ref("");
const pageLoading = ref(false);
const timeout = ref(null);
// const counts = ref(0);
const captcha = ref(false)
const cardClassAddon = computed(() => hasError.value ? 'animate-shake' : '')
const online = computed(() =>  user.isonline);

const props = defineProps({
  value: {
    type: Boolean,
    default: null
  },
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

const oldPassShowHideClicked = ref(true)
const newPassShowHideClicked = ref(true)


const oldToggleEye = () =>{
  return( oldPassShowHideClicked.value = !oldPassShowHideClicked.value);
}


const newToggleEye = () =>{
  return( newPassShowHideClicked.value = !newPassShowHideClicked.value);
}
const code_value = computed(() => {
    return code.$state.code
})


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
const items = computed(() => props.value);
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

const nanfunc = async () => {
  if(form.number){
    if(form.number.length===1){
      hasError3.value =false
    }
    else if((form.number.length!=10&&selected.value['code']==="+91") || isNaN(form.number) || /\s/g.test(form.number)){
      hasError3.value ="Contact Number not valid"
    }
    else{
      hasError3.value =false
    }

  }

};
const send = async ()  => {
  // pageLoading.value = true
  first.value=""
  second.value=""
  third.value=""
  four.value=""
  five.value=""
  six.value=""
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': (response) => {

    }
    
  });
  appVerifier.value = window.recaptchaVerifier
    
  try{
    await user.checkonlines();
    if(online.value===true){
      if(selected.value===null){
        hasError2.value="country code is required"
        theme.pushMessage("country code is required")
        pageLoading.value = false
      }
      // else if(form.number===""){
      //   hasError3.value="Contact Number is required"
      //   theme.pushMessage("Contact Number is required")
      //   pageLoading.value = false
      // }
      else if((selected.value["code"]==="+91"&&form.number.length!=10)||isNaN(form.number)||!form.number.replace(/\s/g, '').length||/^[\.]+$/.test(form.number)||form.number===""){
        hasError3.value="Please add valid contact number"
        theme.pushMessage("Please add valid contact number")
        pageLoading.value = false
      }
      // else if(isNaN(form.number)){
      //   hasError3.value="Please add valid contact number"
      //   theme.pushMessage("Please add valid contact number")
      //   pageLoading.value = false
      // }
      // else if(!form.number.replace(/\s/g, '').length){
 
      // hasError3.value = "Please add valid contact number"
      // theme.pushMessage("Please add valid contact number")
      // pageLoading.value = false
      // }
      // else if((/^[\.]+$/.test(form.number))){
      //   hasError3.value = true
      //   theme.pushMessage("Please add valid contact number")
      //   theme.pushMessage("Please add valid contact number")
      //   pageLoading.value = false
      // }
      else{
        var countt = JSON.parse(localStorage.getItem("number_count"))
        if (countt)
        {
          if(countt.date===dayjs(new Date).format("YYYY-MM-DD")&&countt.number===selected.value['code']+""+form.number){
            counts.value = countt.countz
          }
          else{
            counts.value=0
          }
          
        }
        var couunt = counts.value
        couunt++;
        counts.value = couunt
        clearTimeout(interval.value)
        clearTimeout(timeOut.value)
        await user.getstudentnumbercheck(form.number)
      if(user.check_number===true){
      if(counts.value<=3){
        localStorage.setItem("number_count", JSON.stringify({countz:counts.value,number:selected.value['code']+""+form.number,date:dayjs(new Date).format("YYYY-MM-DD")}));
        firebase.auth().signInWithPhoneNumber(selected.value['code']+""+form.number, window.recaptchaVerifier)
            .then((confirmationResult) => {
              isOpen.value = false
              countDown.value = 120
              interval.value = setTimeout(() => {
                                isOpen.value = true   
                                }, 120000)                
              countDownTimer(countDown.value)
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
              conResult.value = confirmationResult;
              isverify.value=true 
              
              theme.pushMessage("OTP sent successfully to your mobile number");
              // pageLoading.value = false 
              
              // ...
            }).catch((error) => {

              clearTimeout(interval.value)
              clearTimeout(timeOut.value)
              window.recaptchaVerifier.render().then(function(widgetId) {
                grecaptcha.reset(widgetId);
              });
              theme.pushMessage("Some technical error occured so please wait for some time");
              value.value = false
              pageLoading.value = false
              // Error; SMS not sent
              // ...
            });
             }
             else{
        theme.pushMessage("You have exceeded the limit so try again next day or ty with another email ID")
        pageLoading.value = false 
        value.value = false
      }
        
          // await code.forgotpassword_otp(selected.value['code']+""+form.number); 
          // isOpen.value = false
          // countDown.value = 30
          // interval.value = setTimeout(() => {
          //                   isOpen.value = true 
          //                   }, 120000)   
                     
          // countDownTimer(countDown.value)
          // if(code.forgototp.status===200){
          //   isverify.value=true   
          //   theme.pushMessage("OTP sent successfully to your mobile number");
          //   code.forgototp.status=0
          // }
          // else if(code.error_forgototp_send){
          //   if(code.error_forgototp_send.error==="otp limit exceeded try again tomorrow."){
          //     theme.pushMessage("OTP has been sent to you for 10 times Today...Please try again Tomorrow");
          //     code.error_forgototp_send = ""
          //     clearTimeout(interval.value)
          //     clearTimeout(timeOut.value)
          //     router.push("/login")
          //   }
          //   else if(code.error_forgototp_send.error==="Not a valid number please try again."){
          //     theme.pushMessage("This number has not been registered...PLease try with registered number");
          //     code.error_forgototp_send = ""
          //     clearTimeout(interval.value)
          //     clearTimeout(timeOut.value)
          //   }
          // }
  }
  else {
            if(user.check_number===false){
                theme.pushMessage("Number has not been registered...so kindly add registered number");
                value.value = false
            }
           value.value = false
            // location.reload()
           
            // location.reload()
          }
}
   
    }
    else{
      pageLoading.value = false
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }

   }
  
    catch(err){
      theme.pushMessage("something went wrong");
      value.value = false
    }
}




onBeforeMount(async() => {
  pageLoading.value = true
  await user.checkonlines();
  fb.initiateFirebase()
  fb.initiateAuth()
  theme.formScreenToggle(true);
  await user.checkUser();
  selected.value = codes[0]
  if (user.loggedIn) {
    router.push("/");
  }
  pageLoading.value = false
  

  
  //   window.onpopstate = event => {
  //     router.push("/login");
  //     location.reload()
  // };


});

function  countDownTimer(count){
     if(count > 0) {
            timeOut.value = setTimeout(() => {
              count -= 1
                countDown.value = count

                countDownTimer(count)
            }, 1000)

        }
    }



    const delay = async () => {
        clearTimeout(interval.value)
        clearTimeout(timeOut.value)
        await code.forgotpassword_otp(selected.value['code']+""+form.number); 
          isOpen.value = false
          countDown.value = 120
          interval.value = setTimeout(() => {
                            isOpen.value = true 
                            }, 120000)               
          countDownTimer(countDown.value)
          if(code.forgototp.status===200){

            theme.pushMessage("OTP sent successfully to your mobile number");
            code.forgototp.status=0
            
          }
          else if(code.error_forgototp_send){
            if(code.error_forgototp_send.error==="otp limit exceeded try again tomorrow."){
              theme.pushMessage("OTP has been sent to you for 10 times Today...Please try again Tomorrow");
              code.error_forgototp_send = ""
              clearTimeout(interval.value)
              clearTimeout(timeOut.value)
              router.push("/login")
            }
          }

}

const verifyotp = async ()  => {
  
     
  const data1=first.value+second.value+third.value+four.value+five.value+six.value
  if(first.value==""&&second.value==""&&third.value==""&&four.value==""&&five.value==""&&six.value=="")
    {
      theme.pushMessage("Enter the OTP!!")
    } 
  else
  {
  try{     
     await user.checkonlines();

      // if(data1===code.forgototp.data.otp){
      //   theme.pushMessage("OTP has been verified to the number" + "   "+ form.number + "   "+ "Please do register");
      //   isconfirm.value=true
      //   clearTimeout(interval.value)
      //   clearTimeout(timeOut.value)
      // }
      // else{
      //   theme.pushMessage("You have entered wrong OTP...Please enter valid OTP");
      // }
      if(online.value===true){
      window.confirmationResult.confirm(data1).then((result) => {
        // User signed in successfully.
        const user = result.user;

        theme.pushMessage("OTP has been verified to the number" + "   "+ form.number + "   "+ "Please do register");
        isconfirm.value=true
        clearTimeout(interval.value)
        clearTimeout(timeOut.value)
        // ...
      }).catch((error) => {

        theme.pushMessage("You have entered wrong OTP...Please enter valid OTP");
        // User couldn't sign in (bad verification code?)
        // ...
      });
       }
    else{
      pageLoading.value = false
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
          
    }
    catch(err){
      theme.pushMessage("Something went wrong");
    }
}
    }

    const changepassword = async () => {
      await user.checkonlines();
    if(online.value===true){
      const pass =(value) =>{ 
          if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()~])[A-Za-z\d@$!%*?&#^()~]{8,}$/.test(value))
            {
                return  form.password;
            } 
          }
        if(form.password === "")
        {
          hasError.value = true
        }
        else if(form.password !=pass(form.password)){
          return hasError.value = "Password should contain more than  8 characters with 1 uppercase,lowercase,numbers and special characters"
        }
        else if(form.password!=form.confirmed_password){
          theme.pushMessage("Both Password and Confirm Password should be identical")
        }
        else{

          await code.resetconfirmotp({ "password": form.confirmed_password,"contact":form.number});
          if(code.otp_confirm.status===200){
              theme.pushMessage("Password has been changed successfully");
              location.reload()
          }
          else{
            theme.pushMessage(code.error_otp_resend);
          }

        }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
   
  
};


// window.onpopstate = event => {
//             router.push("/login");
//         };
</script>

<style >
.hello{
  width:100%
}
.modal-card-body{
 overflow-y: auto;
 -ms-overflow-style: none;
}

</style>
