
<script setup>
import { reactive, ref, computed, onBeforeMount } from 'vue'
import { mdiEmail,mdiPhone,mdiEyeOff,mdiEye } from '@mdi/js'
import FormScreenSection from '@/components/FormScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import JbButton from '@/components/JbButton.vue'
import Level from '@/components/Level.vue'
import { getdata } from "../stores/user";
import JbButtons from '@/components/JbButtons.vue'
import VerifyOTP from '@/components/VerifyOTP.vue'
import ForgotPasswordemail from '@/components/ForgotPasswordemail.vue'
import TextLink from '@/components/TextLink.vue'
import { sessionStore } from "../stores/session";
import { themeStore } from "../stores/theme";
import { useRouter,useRoute } from "vue-router";
// import { useStorage } from "vue3-storage";
import Overlay from '@/components/Overlay.vue'
import Multiselect from '@vueform/multiselect'
import { selectClasses } from '@/selectcss.js'
import { firebaseStore } from "../stores/firebase";
import firebase from 'firebase/app'
// const ls = useStorage();
const fb = firebaseStore();
const auth = computed(() => firebase.auth);
const code = getdata();
const router = useRouter();
const route = useRoute();
const user = sessionStore();
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
  username: "",
  mail:"",
  number: '',
  confirmed_password: '',
  password: '',
})
const pageLoading=ref(false)
const appVerifier = ref('');
const conResult = ref('');
const hasError2 = ref(false)
const datassss1 = ref(null);
let selected = ref(null);
const hasError = ref(false)
const hasError3 = ref(false)
const isOpen = ref(false);
const interval = ref("");
const timeout = ref(null);
const captcha = ref(false)
const cardClassAddon = computed(() => hasError.value ? 'animate-shake' : '')
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
const isresendmobile = ref(false);
const isresendemail = ref(false);
const resendmobile = async () => {
  isresendmobile.value = true;
};
const resendemail = async () => {
  isresendemail.value = true;
};
const element = ref("")
const newToggleEye = () =>{
  return( newPassShowHideClicked.value = !newPassShowHideClicked.value);
}
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
const contact_value=ref(null)
const though_contact=ref(false)
const isnumber = ref(false);
const nanfunc = async () => {
  form.username=form.username.trim()
  isnumber.value = false;
  if (form.username && !isNaN(form.username) && !/\s/g.test(form.username)) {
    isnumber.value = true;
     if (isNaN(form.username)) {
      hasError.value = "Please enter valid Contact Number"
    }
    else {
      hasError.value = false
    }
  } else if (isNaN(form.username)) {
    form.username = form.username.trim()
    isnumber.value = false;
    if (form.username.length === 1) {
      hasError.value = false
    }
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.username)) {
      hasError.value = "Please enter valid Email ID"
    }
    else {
      hasError.value = false
    }
  }
};
const online = computed(() => user.isonline);
const email_field=ref(null)
const contact_field=ref(null)
const emailfield=ref([])
const otperror1=ref(false)
const through_email=ref(false)
const contactsingle = ref(false)
const sendotp = async () => {
  console.log("inside send")
  if (isnumber.value === false) {
    form.username = form.username.trim()
  }
  if (form.username === ""){
    hasError.value = "This field is required";
  }
  else if (isnumber.value === true && (form.username.length != 10||/\s/g.test(form.username))) {
    hasError.value = "Please add valid contact number";
  } 
  else if (isnumber.value === false && (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.username))) {
    hasError.value = "Please add valid Email ID";
  } 
 else {
    try {
      pageLoading.value=true
      await user.checkonlines();
      if (online.value === true) {
       
        if (isnumber.value === false) {
            await user.forgotpasswordnew({email:form.username});
        }
        if (user.send_mail&&user.send_mail.message&&user.send_mail.message==='The otp has been sent to your mail id , please do check spam if you dont find it in inbox')
        {
          theme.pushMessage("The otp has been sent to your mail id , please do check spam if you dont find it in inbox");
          if(isnumber.value === true){
            emailfield.value=user.send_mail.email
            through_email.value=true
          }
          else{
            emailfield.value=form.username
            through_email.value=true
          }
          console.log("inside email validation")
          isverify.value=true
          pageLoading.value=false
        }
        else if (user.send_mail&&user.send_mail.payments===false)
        {
          if(user.send_mail.number&&user.send_mail.number.length>1)
          {

            contact_value.value=user.send_mail.number
            though_contact.value=true
            if(isnumber.value === true){
              contact_field.value = form.username
              // send1()
              // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-up-button', {
              //   'size': 'invisible',
              //   'callback': (response) => {
              //   },
              // });
              // appVerifier.value = window.recaptchaVerifier
              // if(contact_value.value&&contact_value.value.length>=1)
              // {
              //   otpnumber.value = contact_value.value.filter(
              //     element => element.number===contact_field.value
              //   );
              // }
            //   clearTimeout(interval.value)
            //   clearTimeout(timeOut.value)
            //   pageLoading.value = false
            //   firebase.auth().signInWithPhoneNumber(otpnumber.value[0].code+""+otpnumber.value[0].number, window.recaptchaVerifier)
            // .then((confirmationResult) => {
            //   isverify.value=true
            //   isOpen.value = false
            //   countDown.value = 120
            //   interval.value = setTimeout(() => {
            //                     isOpen.value = true   
            //                     }, 120000)                
            //   countDownTimer(countDown.value)
            //   window.confirmationResult = confirmationResult;
            //   conResult.value = confirmationResult;
            //   theme.pushMessage("OTP sent successfully to your mobile number");
            // }).catch((error) => {
            //   clearTimeout(interval.value)
            //   clearTimeout(timeOut.value)
            //   window.recaptchaVerifier.render().then(function(widgetId){
            //     grecaptcha.reset(widgetId);
            //   });
            //   theme.pushMessage(error);
            //   value.value = false
            //  }) 
            }
            else{
              //   for (var i = 0; i < contact_value.value.length; i++) {
              //     contact_value.value[i].number=contact_value.value[i].code+""+contact_value.value[i].number
              // }
              contactsingle.value=false
              pageLoading.value=false
              
            }
            pageLoading.value=false
          }
          else if(user.send_mail.number&&user.send_mail.number.length===1)
          {
            // though_contact.value=true
            send1()
            contactsingle.value=true
            contact_value.value=user.send_mail.number
            contact_field.value = user.send_mail.number[0].number
            pageLoading.value=false
          }
        }
        else if (user.error_send_mail) 
        {
          theme.pushMessage(user.error_send_mail)
          pageLoading.value=false
        }
        // pageLoading.value=false
      }
      else {
        theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
        pageLoading.value=false
      }
    } catch (err) {
      // console.log("inside sendotp something")
      theme.pushMessage("Something went wrong");
      pageLoading.value=false
    }
  }
};
const sends = async () => {
  pageLoading.value = true
  first.value = ""
  second.value = ""
  third.value = ""
  four.value = ""
  five.value = ""
  six.value = ""
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("sign-up-button", {
    'size': 'invisible',
    'callback': (response) => {
    }
  });
  appVerifier.value = window.recaptchaVerifier
  try {
        clearTimeout(interval.value)
        clearTimeout(timeOut.value)
          firebase.auth().signInWithPhoneNumber(contact_field.value, window.recaptchaVerifier)
            .then((confirmationResult) => {
              isOpen.value = false
              countDown.value = 120
              interval.value = setTimeout(() => {
                isOpen.value = true
              }, 120000)
              countDownTimer(countDown.value)
            }).catch((error) => {
              clearTimeout(interval.value)
              clearTimeout(timeOut.value)
              window.recaptchaVerifier.render().then(function (widgetId) {
                grecaptcha.reset(widgetId);
              });
              theme.pushMessage("Some technical error occured so please wait for some time or contact help team");
              pageLoading.value = false
              // router.push("/login")
            });
  }
  catch (err) {
    theme.pushMessage("something went wrong in send otp");
    // router.push("/login")
  }
}
const otpnumber=ref([])
const send1 = async ()  => {
  console.log("fdjy")
  pageLoading.value = true
  first.value=""
  second.value=""
  third.value=""
  four.value=""
  five.value=""
  six.value=""
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-up-button', {
    'size': 'invisible',
    'callback': (response) => {
    },
  });
  appVerifier.value = window.recaptchaVerifier
  try{
    await user.checkonlines();
    pageLoading.value=true
    console.log("user.send_mail",user.send_mail.length)
    if((user.send_mail&&user.send_mail.length===0)||(isnumber.value===true)){
      console.log("inisde this")
      if (isnumber.value === true) 
        {
            await user.forgotpasswordnew({number:form.username});
        }

    if (user.send_mail&&user.send_mail.message&&user.send_mail.message==='The otp has been sent to your mail id , please do check spam if you dont find it in inbox')
    {
      theme.pushMessage("The otp has been sent to your mail id , please do check spam if you dont find it in inbox");
      if(isnumber.value === true){
        emailfield.value=user.send_mail.email
        through_email.value=true
      }
      else{
        emailfield.value=form.username
        through_email.value=true
      }
      contact_field.value = form.username
      isverify.value=true
      user.send_mail=[]
      though_contact.value=true
      // console.log("emailfield.value",emailfield.value)
    }
    else if (user.send_mail&&user.send_mail.payments===false)
    {
      if(user.send_mail.number&&user.send_mail.number.length>1)
      {
        console.log("insideeee")
        contact_value.value=user.send_mail.number
        // though_contact.value=true
        // if(isnumber.value === true){
          if(isnumber.value===true){
            contact_field.value = form.username
          }

          // send1()
          // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-up-button', {
          //   'size': 'invisible',
          //   'callback': (response) => {
          //   },
          // });
          // appVerifier.value = window.recaptchaVerifier
          // if(contact_value.value&&contact_value.value.length>=1)
          // {
          //   otpnumber.value = contact_value.value.filter(
          //     element => element.number===contact_field.value
          //   );
          // }
        //   clearTimeout(interval.value)
        //   clearTimeout(timeOut.value)
        //   pageLoading.value = false
        //   firebase.auth().signInWithPhoneNumber(otpnumber.value[0].code+""+otpnumber.value[0].number, window.recaptchaVerifier)
        // .then((confirmationResult) => {
        //   isverify.value=true
        //   isOpen.value = false
        //   countDown.value = 120
        //   interval.value = setTimeout(() => {
        //                     isOpen.value = true   
        //                     }, 120000)                
        //   countDownTimer(countDown.value)
        //   window.confirmationResult = confirmationResult;
        //   conResult.value = confirmationResult;
        //   theme.pushMessage("OTP sent successfully to your mobile number");
        // }).catch((error) => {
        //   clearTimeout(interval.value)
        //   clearTimeout(timeOut.value)
        //   window.recaptchaVerifier.render().then(function(widgetId){
        //     grecaptcha.reset(widgetId);
        //   });
        //   theme.pushMessage(error);
        //   value.value = false
        //  }) 
        // }
        // else{
          //   for (var i = 0; i < contact_value.value.length; i++) {
          //     contact_value.value[i].number=contact_value.value[i].code+""+contact_value.value[i].number
          // }
          contactsingle.value=false
          pageLoading.value=false
          if(contact_value.value&&contact_value.value.length>=1){
              otpnumber.value = contact_value.value.filter(
                element => element.number===contact_field.value
              );
            }
            clearTimeout(interval.value)
            clearTimeout(timeOut.value)
            pageLoading.value = false
            firebase.auth().signInWithPhoneNumber(otpnumber.value[0].code+""+otpnumber.value[0].number, window.recaptchaVerifier)
                .then((confirmationResult) =>{
                  isverify.value=true
                  isOpen.value = false
                  countDown.value = 120
                  interval.value = setTimeout(() => {
                                    isOpen.value = true   
                                    }, 120000)   
                  though_contact.value=true             
                  countDownTimer(countDown.value)
                  window.confirmationResult = confirmationResult;
                  conResult.value = confirmationResult;
                  theme.pushMessage("OTP sent successfully to your mobile number");
                  // pageLoading.value = false 
                }).catch((error) => {
                  clearTimeout(interval.value)
                  clearTimeout(timeOut.value)
                  window.recaptchaVerifier.render().then(function(widgetId){
                    grecaptcha.reset(widgetId);
                  });
                  theme.pushMessage(error);
                  value.value = false
                  })   
          
        // }
      }
      else if(user.send_mail.number&&user.send_mail.number.length===1)
      {
        contactsingle.value=true
        contact_value.value=user.send_mail.number
        contact_field.value = user.send_mail.number[0].number
        if(contact_value.value&&contact_value.value.length>=1){
              otpnumber.value = contact_value.value.filter(
                element => element.number===contact_field.value
              );
            }
            clearTimeout(interval.value)
            clearTimeout(timeOut.value)
            pageLoading.value = false
            firebase.auth().signInWithPhoneNumber(otpnumber.value[0].code+""+otpnumber.value[0].number, window.recaptchaVerifier)
                .then((confirmationResult) =>{
                  isverify.value=true
                  isOpen.value = false
                  countDown.value = 120
                  interval.value = setTimeout(() => {
                                    isOpen.value = true   
                                    }, 120000)   
                  though_contact.value=true             
                  countDownTimer(countDown.value)
                  window.confirmationResult = confirmationResult;
                  conResult.value = confirmationResult;
                  theme.pushMessage("OTP sent successfully to your mobile number");
                  // pageLoading.value = false 
                }).catch((error) => {
                  clearTimeout(interval.value)
                  clearTimeout(timeOut.value)
                  window.recaptchaVerifier.render().then(function(widgetId){
                    grecaptcha.reset(widgetId);
                  });
                  theme.pushMessage(error);
                  value.value = false
                  })   
        pageLoading.value=false
      }
      else if (user.error_send_mail) 
      {
        theme.pushMessage(user.error_send_mail)
        pageLoading.value=false
      }
      user.send_mail=[]
    }
    pageLoading.value=false

    }
    
else if((user.send_mail&&user.send_mail.number&&user.send_mail.number.length>0)||(isnumber.value===true)){
  console.log("inisde this 1")
  if(online.value===true){

if(contact_field.value===null&&contactsingle.value===false&&though_contact.value===true)
{
 otperror1.value=true
 theme.pushMessage("Select the Number to which the otp has to be verified!!")
 pageLoading.value = false
} 
else{
 ;
 if(contact_value.value&&contact_value.value.length>=1){
   otpnumber.value = contact_value.value.filter(
     element => element.number===contact_field.value
   );
 }
 clearTimeout(interval.value)
 clearTimeout(timeOut.value)
 pageLoading.value = false
 firebase.auth().signInWithPhoneNumber(otpnumber.value[0].code+""+otpnumber.value[0].number, window.recaptchaVerifier)
     .then((confirmationResult) =>{
       isverify.value=true
       isOpen.value = false
       countDown.value = 120
       interval.value = setTimeout(() => {
                         isOpen.value = true   
                         }, 120000)   
       though_contact.value=true             
       countDownTimer(countDown.value)
       window.confirmationResult = confirmationResult;
       conResult.value = confirmationResult;
       theme.pushMessage("OTP sent successfully to your mobile number");
       // pageLoading.value = false 
     }).catch((error) => {
       clearTimeout(interval.value)
       clearTimeout(timeOut.value)
       window.recaptchaVerifier.render().then(function(widgetId){
         grecaptcha.reset(widgetId);
       });
       theme.pushMessage(error);
       value.value = false
      })        
}
}
else{
pageLoading.value = false
theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
}

}

   }
    catch(err){
      theme.pushMessage("something went wrong");
      value.value = false
    }
}
onBeforeMount(async() => {
  await fb.initiateFirebase()
  await fb.initiateAuth()
  theme.formScreenToggle(true);
  await user.checkUser();
  if (user.loggedIn) {
    router.push("/");
  }
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
      countDown.value = 30
      interval.value = setTimeout(() => {
                        isOpen.value = true 
                        }, 30000)               
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
const otperror=ref(false)
const verifyotp = async ()  => {
  const data1=first.value+second.value+third.value+four.value+five.value+six.value
  if(first.value==""&&second.value==""&&third.value==""&&four.value==""&&five.value==""&&six.value=="")
    {
      theme.pushMessage("Enter the OTP!!")
    } 
    else if(email_field.value===null&&isnumber.value === true&&through_email.value===true)
    {
      otperror.value=true
      theme.pushMessage("Select the email to which the otp has to be verified!!")
    }
  else
  {
  try{  
    if(through_email.value===true){
      await user.verifyotp({"otp" : JSON.parse(data1),"email":email_field.value})
      console.log("user.verify_otp",user.verify_otp)
      if(user.verify_otp.message==="The otp is correct"){
        theme.pushMessage("Verified OTP Successfully") 
        isconfirm.value=true
      }
      else{
        theme.pushMessage("Entered OTP is wrong") 
      }
  }
  if(though_contact.value===true&&conResult.value!=""){
    console.log("inside though contact")
      window.confirmationResult.confirm(data1).then((result) => {
      // User signed in successfully.
      console.log("contact_field",contact_field)
      theme.pushMessage("OTP has been verified to the number" + "   "+ contact_field.value);
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
    }
  catch(err){
    console.log("inside something went wrong")
    theme.pushMessage("Something went wrong");
  }
}
    }

    const changepassword = async () => {
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
        else if(form.password !=pass(form.password))
        {
           hasError.value = true
           theme.pushMessage("Password should contain more than 8 characters  with 1 uppercase,lowercase,numbers and special characters")
        }
        else if(form.password!=form.confirmed_password)
        {
          hasError.value =true
          theme.pushMessage("Both Password and Confirm Password should be identical")
        }
        else
        {
          try{
            if(through_email.value===true){
              await user.changenew_password({ "mail":email_field.value, "newpassword": form.password })
              theme.pushMessage("Created New Password Successfully");
              location.reload()
            }
            if(though_contact.value===true){
              await code.resetconfirmotp({ "password": form.password,"contact":contact_field.value});
                if(code.otp_confirm.status===200){
                    theme.pushMessage("Password has been changed successfully");
                    location.reload()
                }
                else{
                  theme.pushMessage(code.error_otp_resend);
                }
            }
          }
          catch{
            theme.pushMessage("Something went wrong!");
          }
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
        class="shadow-lg w-full max-h-modal sm:w-4/5 md:w-4/5 lg:w-1/2 z-50"
      >
      <p v-if="isverify===false&&isconfirm===false&&though_contact===false" class="py-4  text-gray-300 font-bold"> OTP will be sent to the entered Email Id or Contact Number</p>

    
      <p v-if="isverify===false&&isconfirm===false&&contactsingle===false&&though_contact===true&&isnumber===false" class="py-4  text-gray-300 font-bold">Select any one contact number to which the otp has to be sent!!</p>
        <div v-if="isverify===false&&isconfirm===false&&contactsingle===false&&though_contact===true&&isnumber===false" class="flex">
            <div  class="flex-none w-full pr-2 "> 
              <div class="pl-5 space-y-6">
              <field   class="text-white text-sm" :error="otperror1">
              <span v-if="contact_value&&contact_value.length&&contact_value.length>1&&though_contact===true"> 
                    <span  v-for="(contdata, cont) in contact_value"
                    :key="cont">
                    <label class="cursor-pointer label pr-2" :for="contdata.number">
                      <input type="radio"
                          :id="contdata.number"
                          :name="contdata.number"
                          :value="contdata.number"
                          :native-value="contdata.number"
                          v-model="contact_field" class="w-5 h-5 align-middle radio radio-info radio-sm">
                    <span class="label-text font-medium text-white text-base pl-2">{{contdata.number}}</span> 
                    </label>
                  </span>
             </span> 
            </field>
            </div>
          </div>
        </div>

        <p v-if="isverify===false&&isconfirm===false&&contactsingle===true&&though_contact===true&&isnumber===false" class="py-4  text-gray-300 font-bold">OTP will be sent to this contact number!!</p>
        <div v-if="isverify===false&&isconfirm===false&&contactsingle===true&&though_contact===true&&isnumber===false" class="flex">
            <div  class="flex-none w-full pr-2 "> 
              <div class="pl-5 space-y-6">
                <span  class="font-bold text-white">{{contact_field}}</span> 
                    <!-- <field   class="text-white text-sm" :error="otperror1">
                <span v-if="contact_value&&contact_value.length&&though_contact===true"> 
                      <span  v-for="(contdata, cont) in contact_value"
                      :key="cont">
                      <label class="cursor-pointer label pr-2" :for="contdata.number">
                        <input type="radio"
                            :id="contdata.number"
                            :name="contdata.number"
                            :value="contdata.number"
                            :native-value="contdata.number"
                            v-model="contact_field" class="w-5 h-5 align-middle radio radio-info radio-sm">
                      <span class="label-text font-medium text-white text-base pl-2">{{contdata.code}}{{contdata.number}}</span> 
                    
                      </label>
                    </span>
                  </span> 
            </field> -->
            </div>
            </div>
        </div>

        <div v-if="isverify===false&&isconfirm===false&&though_contact===false" class="flex">
            <div  class="flex-none w-full pr-2 "> 
              <div class="pl-5 space-y-6">
              <field label="Enter Email or Number" :error="hasError" help="Enter Number or Email" class="w-[80%]">
                <control
                control v-model="form.username"  name="email" :icon-right="mdiAccount" class="text-xs"
                      autocomplete="username" placeholder="Enter your Email or Mobile number"
                      :onchange="nanfunc(form.username)" 
                />
              </field>
            </div>
            </div>
        </div>

        <!-- v-if="isverify===true&&isconfirm===false" -->
        <div  v-if="isverify===true&&isconfirm===false" class="max-w-sm mx-auto md:max-w-lg">
          <div class="w-full">
              <div  class="h-48 py-3 rounded text-center">
              <h1 class="text-2xl font-bold text-teal-500">OTP Verification</h1>
              <div v-if="isverify===true" class="flex flex-col mt-4 text-white flex-wrap"> <span>Enter the OTP you received at</span> 
              <field   class="text-white text-sm" :error="otperror">
                  <span v-if="isnumber===true&&through_email===true"> 
                        <span  v-for="(emaildata, emi) in emailfield"
                        :key="emi">
                        <label class="cursor-pointer label pr-2" :for="emaildata.email">
                          <input type="radio"
                              :id="emaildata.email"
                              :name="emaildata.email"
                              :value="emaildata.email"
                              :native-value="emaildata.email"
                              v-model="email_field" class="w-5 h-5 align-middle radio radio-info radio-sm">
                        <span class="label-text font-medium text-white text-base pl-2">{{emaildata.email}}</span> 
                        </label>
                      </span>
                    </span> 
              </field>
            <span v-if="isnumber===false&&through_email===true" class="font-bold text-white">{{emailfield}}</span>
            <!-- {{ contact_field }} -->
            <span v-if="though_contact===true" class="font-bold text-white">{{contact_field}}</span>  
              </div>
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
          <div v-if="isverify===true" class="mt-4 grid justify-items-center">
          <jb-button
                label="Verify OTP"
                color="info"
                @click="verifyotp"
              />
          </div>
      </div>
       <div v-if="isverify===true&&isconfirm===false&&though_contact===false" class="grid justify-items-center">
            <div  class="">
              <div class="mt-4">
                <button  @click="sendotp" >
                    <h2 class="text-right text-green-300 hover:underline">Resend OTP?</h2>
                </button>
              </div>
            </div>
      </div> 

      <div v-if="isverify===true&&isconfirm===false&&though_contact===true" class="grid justify-items-center">
            <div  class="">
              <div class="mt-4">
                <button  @click="send1" id="sign-up-button">
                    <h2 class="text-right text-green-300 hover:underline">Resend OTP?</h2>
                </button>
              </div>
            </div>
      </div> 

      <div v-if="isverify===true&&isconfirm===false&&though_contact===true&&conResult" class="grid justify-items-center">
            <div v-if="isOpen== true" class="">
              <div class="mt-4">
                <button  @click="send1" id="sign-up-button">
                    <h2 class="text-right text-green-300 hover:underline">Resend OTP?</h2>
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
  
      <!-- <field label="Email" v-if="isconfirm===true" class="mt-2 px-3 py-2 max-w-full focus:ring focus:outline-none dark:placeholder-gray-400 w-full border-0 border-gray-700 dark:bg-gray-800 rounded opacity-50 cursor-not-allowed text-white">{{form.mail}}</field> -->
      <field v-if="isconfirm===true" label="New Password" :error="form.password!==''? false : true" help="Please enter your new password" >
          <control
            v-model="form.password"
            :error="hasError"
            :icon-right="oldPassShowHideClicked? mdiEyeOff:mdiEye"
            type="password"
            name="password"
            class="text-xs"
             onpaste="return false"
            placeholder="Enter your new Password here"
            autocomplete="New-password"
            @right-icon-click="oldToggleEye"
          />
        </field>
  
        <field v-if="isconfirm===true" label="Confirm Password" :error="form.confirmed_password!==''? false : true" help="Please enter your confirm password">
          <control
            v-model="form.confirmed_password"
            :error="hasError"
            :icon-right="newPassShowHideClicked? mdiEyeOff:mdiEye"
            type="password"
            name="password"
            class="text-xs"
             onpaste="return false"
            placeholder="Confirm your new Password here"
            autocomplete="New-password"
            @right-icon-click="newToggleEye"
          />
        </field>

          <level mobile v-if="isconfirm===true">
            <jb-buttons >
              <jb-button
                label="Submit"
                color="info"
                @click="changepassword"
              />
            </jb-buttons>
          </level>


        <template #footer >
          <level mobile>
            <jb-buttons v-if="isverify===false&&isconfirm===false&&though_contact===false&&isnumber===false" >
              <jb-button
                label="Submit"
                color="info"
                id="sign-up-button"
                @click="sendotp"
              />
            </jb-buttons>
            <jb-buttons v-if="(isverify===false&&isconfirm===false&&though_contact===true)||(isverify===false&&isconfirm===false&&isnumber===true)" >
              <jb-button
                label="Send OTP"
                color="info"
                id="sign-up-button"
                @click="send1"
              />
            </jb-buttons>
          </level>
        </template>

      </card-component>
  </overlay>
  </template>
<style >
.hello{
  width:100%
}
.modal-card-body{
 overflow-y: auto;
 -ms-overflow-style: none;
}

</style>
