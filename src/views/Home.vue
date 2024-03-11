<script setup>
import { computed, ref, onBeforeMount, reactive } from "vue";
import { mdiPlusBox, mdiMicrophone, mdiAccountPlus, mdiAccountQuestion, mdiLifebuoy, mdiArrowLeftBoldCircle, mdiPhoneIncomingOutline  } from "@mdi/js";
import ModalBox from "@/components/ModalBox.vue";
import CheckboxCell from "@/components/CheckboxCell.vue";
import Level from "@/components/Level.vue";
import JbButtons from "@/components/JbButtons.vue";
import JbButton from "@/components/JbButton.vue";
import { themeStore } from "../stores/theme";
import { useRouter } from "vue-router";
import Tip from '@/components/Tip.vue';
import Icon from "@/components/Icon.vue";
import { sessionStore } from "../stores/session";
import Qrcode from "@/components/Qrcode.vue";
import TitleBar from "@/components/TitleBar.vue";
import Multiselect from "@vueform/multiselect";
import { selectClasses } from "@/selectcss.js";
import ModalAnnouncement from "@/components/ModalAnnouncement.vue";
import ModalChat from "@/components/ModalChat.vue";
import Field from "@/components/Field.vue";
import Control from '@/components/Control.vue'
import AddPay from '@/components/AddPay.vue'
import { studentStore } from "../stores/student"
import { batchStore } from "../stores/batch"
import { getdata } from "../stores/user";
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs';
import Viewhelp from '@/components/Viewhelp.vue'

dayjs.extend(utc)
dayjs.extend(timezone)

const batch = batchStore()
const theme = themeStore();
const user = sessionStore();
const router = useRouter();
const code = getdata();
const student = studentStore();

// Apis for the data
const subject_batch = computed(() => {
    return user.student_batchess
});



//  val.branch.name.includes(searchByName.value)    
const titleStack = ref(["My Batches"]);
const lightBorderStyle = computed(() => theme.lightBorderStyle);

const lightBgStyle = computed(() => theme.lightBgStyle);

const tableTrStyle = computed(() => theme.tableTrStyle);

const tableTrOddStyle = computed(() => theme.tableTrOddStyle);

const isTauri = window.__TAURI__;

const clickLink = (batch) => {
  // console.log("image_datas.value",image_datas)
  // console.log("dayscrossed.value",dayscrossed)
  // console.log("profilled.value",profilled)
 // if(isTauri){
  if ((!image_datas.value)&&((dayscrossed.value === true&&user.validation.other===true))) {
      theme.pushMessage(
      "You have not added your profile picture..please do add it"
    );
    router.push("/view_profile");
    }
  //   else if(user.validation&&user.validation.fresherexp&&user.validation.fresherexp.name==='experienced'&&user.validation.experience===false){
  //   theme.pushMessage("You have not added Experience form..please do add it for better Placements!!")
  //   ids.value = id;
  //   scanclass.value = true;
  // }
  else{
    router.push("/classroom/"+batch)
  }

  //}
 // else{
    //window.open( `/classroom/${batch}`, "_blank" );
 // }

}

const darkMode = computed(() => theme.darkMode);
const dayscrossed = computed(() => user.dayscrossed);
const profilled = computed(() => user.filled);
// console.log("profilled",profilled)
// console.log("dayscrossed",dayscrossed)
const isModalActive = ref(false);
const isModalDangerActive = ref(false);
const scanclass = ref(false);
// const joinclass = () => {
//  router.push("/student-classroom/"+)
// };
const ids = ref(null);
const modalOneActive = ref(false);
const trainer_selected = ref([]);
const subject_selected = ref([]);
const image_datas = computed(() => user.studentimages)
// const isAsideHiddenLayout = computed(async() => await isOnline());
const valueoni = ref(false)
const online = computed(() =>  user.isonline);
const itemsLength = computed(() => {
    return user.student_count_total
});
// console.log("online.value",online.value)
// valueoni.value=online.value
// console.log("valueoni.value",valueoni.value)
const scan = (id) => {
  // if (!image_datas.value) {
  //   theme.pushMessage(
  //     "You have not added your profile picture..please do add it"
  //   );
  //   router.push("/view_profile");
  // }
  if (user.validation.other === false) {
    router.push("/profile");
  } else {
    if (!image_datas.value) {
      theme.pushMessage(
      "You have not added your profile picture..please do add it"
    );
    router.push("/view_profile");
    }
    else if(user.validation&&user.validation.fresherexp&&user.validation.fresherexp.name==='experienced'&&user.validation.experience===false){
    theme.pushMessage("You have not added Experience form..please do add it for better Placements!!")
    ids.value = id;
    scanclass.value = true;
  }
  else{
    ids.value = id;
    scanclass.value = true;
  }
    
  }
 
};



// const paycourse = computed(() => user.student_course)

const addpayModalActive = ref(false)
const apm = ref(null);
const addpay = (data) => {
  apm.value = data
  addpayModalActive.value = true
}

const helpviews = ref(false)

const viewhelp = async(data) =>{
  helpviews.value=true

}

const pagesList = computed(() => {
    const pagesList = [];
    let startPage;
    let endPage;
    if (currentPage.value < 1) {
        currentPage.value = 1;
    } else if (currentPage.value > numPages.value) {
        currentPage.value = numPages.value;
    }
    if (numPages.value <= maxPages.value) {
        startPage = 1;
        endPage = numPages.value;
    } else {
        let maxPagesBeforeCurrentPage = Math.floor(maxPages.value / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages.value / 2) - 1;
        if (currentPage.value <= maxPagesBeforeCurrentPage) {
        // current page near the start
        startPage = 1;
        endPage = maxPages.value;
        } else if (currentPage.value + maxPagesAfterCurrentPage >= numPages.value) {
        // current page near the end
        startPage = numPages.value - maxPages.value + 1;
        endPage = numPages.value;
        } else {
        // current page somewhere in the middle
        startPage = currentPage.value - maxPagesBeforeCurrentPage;
        endPage = currentPage.value + maxPagesAfterCurrentPage;
        }
    }
    return Array.from(Array(endPage + 1 - startPage).keys()).map(
        (i) => startPage + i
    );
    });

const paid = () => {
  theme.pushMessage("You have Already Paid the Target Amount")
}
onBeforeMount(async () => {
  theme.setPageTitle("Batches List")
  pageLoading.value = true
  window.scrollTo(0, 0);
  if(isTauri){
    document.addEventListener("contextmenu", (event) => event.preventDefault());
  }
  await user.checkonlines();
  await user.checkUser();
  if (user.$state.loggedIn === false) {
    router.push("/login");
  }
  else {
    if(online.value===true){
    await user.getvalidations();
    if (user.validation_status === 200) {
      await user.getstudent()
      await user.getstudentcoursess()
      if (user.validation.studentcourse === false) {
        router.push("/pay_directly")
      }
      else if (user.validation.studentcourse === true && user.validation.studentbatch === false) {
        router.push("/add_regcode")
      }
      // else if(user.validation.other===false){
      //   router.push("/profile")
      // }
      await user.getstudentbatches(false,0)
    }
    else {
      await user.logout()
      router.go()

    }
    }
    else{
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  }

  }


  // await batch.getmybatches(currentPage.value-1, params);



  // window.onpopstate = (event) => {
  //   router.push("/");
  //   location.reload();
  // };
  pageLoading.value = false
});

let params = ref("");
const emit = defineEmits(["search"]);


let search = reactive({
  subject: ref(''),
  trainer: ref(''),
});

const convertMultiple = (key, value) => {
  let conCat = "";
  for (let i = 0; i < value.length; i++) {
    conCat = conCat + `&${key}=` + value[i];
  }
  return conCat;
};
const batch_name = ref("")

// const searchParams = async () => {
//   let valid = true;

//   let search = ""

//   if (subject_selected.value.length > 0) {
//     search += convertMultiple("subject", subject_selected.value);
//   }
//   if (trainer_selected.value.length > 0) {
//     search += convertMultiple("trainer", trainer_selected.value);
//   }

//   if (search.length > 0) {
//     currentPage.value = 1
//     await batch.getmybatches(currentPage.value, search);
//   }
//   else {
//     theme.pushMessage("Please select either Subject or Trainer to search.");
//   }

// }

const searchParams = async() => {
  // console.log("inside searchparams")
  pageLoading.value = true
     let searchdata=""
      if(batch_name.value ){ 
     if (batch_name.value ) {
        searchdata+="&batch=" +batch_name.value
    ;}     
   params = new URLSearchParams(searchdata).toString();
   await  user.getstudentbatches(false,0,params);
    pageLoading.value = false

}
else{
  pageLoading.value = false
}
}
const ids_value = ref("")

const rejecthover = ref(false)
// const mousehover = (id) => {
//   subject_batch.value.forEach((item) => {


//     if (item.id === id) {


//       rejecthover.value = true
//       ids_value.value = id
//       return rejecthover
//     }
//   });
// }

// const leavedata = async (id) => {
//   subject_batch.value.forEach((item) => {
//     if (item.id == id) {
//       return rejecthover.value = false
//     }
//   });
// }
const clear = async() => {
    pageLoading.value = true
    params ='';
    batch_name.value = '';
    currentPage.value=0;
    await  user.getstudentbatches(false,0);
    pageLoading.value = false

    }

const add_profile = async () => {
  router.push("/profile")
};


let copysearchString = "";

const hasError = ref(false)

// const pageChange = async (page) => {
//     pageLoading.value = true
//     currentPage.value = page+1;

//       await user.getstudentbatches(false,page,params);

//     pageLoading.value = false
//     window.scroll({
//         top: 0,
//         left: 0,
//         behavior: 'smooth'
//     })
// };

const pageChange = async (page) => {
    // let page = currentPage.value-1
    pageLoading.value = true
    currentPage.value = page+1;
    if (params) {
    await user.getstudentbatches(false,page,params);
    }
    else{
      await user.getstudentbatches(false,page);
    }
    // }
    pageLoading.value = false
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
};

const subject = computed(() => {
  return batch.subject;
});


const trainer = computed(() => {
  return batch.trainer;
});

const needhelp =ref(false)

const isModalAnnouncementActive = ref(false);
const openShowAnnouncementModal = () => {
  isModalAnnouncementActive.value = true;
};


const isModalChatActive = ref(false);
const openShowChatModal = () => {
  isModalChatActive.value = true;
};



const perPage = 10;
const itemsPerPage = 10
const itemsShown = ref(10)
const checkable = ref(false);
const pageLoading = ref(false)
const searchQuery = ref("");
const itemsPaginated = computed(() => batch.student_batches_view);
const itemsCount = computed(() => user.student_count_total);

const confirmRefresh = async () => {
  pageLoading.value = true
  await batch.getmybatches();
  pageLoading.value = false
};
const currentPage = ref(1);
const maxPages = ref(10);
const numPages = computed(() =>{ 
  // console.log("itemsCount.value",itemsCount.value)
  if(itemsCount.value!=0){
    return Math.ceil(itemsCount.value / perPage)
  }
  });

  
const currentPageHuman = computed(() => currentPage.value );

// search
const searchdata = reactive({
  name: '',
})
const searchByName = computed(() => searchdata.name)
const userprofile = computed(() => user.add_profile)
// console.log("userprofile",userprofile)


// sidebar toggle help button

function openNav() {
  //  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("main").style.marginRight = "280px"; 
 
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("main").style.marginRight= "0";
}

</script>

<template>
  <add-pay :apm="apm" v-if="addpayModalActive == true" v-model="addpayModalActive">
  </add-pay>

  <ModalAnnouncement v-if="isModalAnnouncementActive" v-model="isModalAnnouncementActive" :title="'Show Announcement '"
    @confirm="confirmRefresh" has-cancel>
  </ModalAnnouncement>

  <ModalChat v-if="isModalChatActive" v-model="isModalChatActive" :title="'Show Chat'" @confirm="confirmRefresh"
    has-cancel>
  </ModalChat>
  <div v-if="subject_batch" class="flex justify-between w-full bg-gray-800 sticky top-[48px] z-[9] ">
    <div class="flex  py-2 gap-2">
      <jb-button
    @click = "isModalActive =! isModalActive"
    label="Search"
    type="submit"
    class=" pr-2 pl-2"
    color="info"
    />
    <h4 class="text-white text-xl font-bold text-left pr-2">{{"Total:"}}<span class="text-red-500 text-xl font-bold text-left pl-2" >{{itemsCount}}</span></h4>
    <!-- </div> -->
    <!-- <div class="flex  items-center gap-2 mr-1"> -->
    <h4 class="text-white text-xl font-bold text-left pr-2">{{"Page:"}}<span class="text-red-500 text-xl font-bold text-left pl-2" >{{currentPage}}</span></h4>
    </div>
  </div>
  

  <aside
    id="aside-right"
    class="
      w-60
      pr-1.5
      fixed
      z-40
      h-screen
      lg:h-screen-menu
      top-0
      lg:top-14
      bg-white
      border-l border-gray-100
      overflow-y-scroll
      transition-position
      dark:bg-gray-900
      dark:border-gray-700
      dark:scrollbar-thumb-gray-600
      dark:scrollbar-track-gray-800
      right-0
    "
    v-if="isModalActive"
  >
    <div>
      <div class="
          md:rounded
          dark:bg-gray-900/70
          block
          bg-white
          border border-gray-100
          dark:border-gray-900
          mb-4
        "
      >
        <header
          class="
            flex
            items-stretch
            border-b border-gray-100
            dark:border-gray-700
          "
        >
           <p class="flex items-center py-2 grow font-bold text-blue-300">
            {{'Search here'}}
          </p>
          <a @click="isModalActive = false" class="flex items-center py-3 px-4 justify-center cursor-pointer">
            <span class="inline-flex justify-center items-center w-6 h-6"  @click="cancelling()">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                class="inline-block"
              >
                <path
                  fill="currentColor"
                  d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                ></path></svg>
              </span
            ></a>
        </header>
        

            <field label="Batch Name" class="ml-[3px] text-white mb-4">  
             <input type=text v-model="batch_name"   class="border border-gray-500 bg-gray-800 w-full h-[35px] pl-2 rounded" placeholder="Enter batch name here" required />
             </field>
          <div class="grid grid-cols-1 last:mb-0 mt-2">
            <div class="grid grid-cols-1 gap-3 md:grid-cols-2 ml-[5px]">
                <jb-button
                  label="Search"
                  type="submit2"
                  color="light"
                  @click="searchParams()"
                  class = "pt-0 pb-0 font-normal pl-1 pr-1 text-base"
                  />
              <jb-button
                  label="Clear"
                  type="submit2"
                  color="danger"
                  @click="clear()"
                  class = "pt-0 pb-0 font-normal pl-1 pr-1 text-base"
                  />
            </div>
          </div>
        </div>
      </div>
   
  </aside> 

 <div v-if="pageLoading" wire:loading
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
    <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
    <p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
  </div>



  <div v-if="subject_batch" class="grid xl:grid-cols-5 sm:grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">

    <div v-for="client in subject_batch" :key="client.id" class="card shadow-lg bg-gray-900  p-4 rounded-md mb-0">

      <div class="border-b border-gray-600 pb-1 mb-1">

        <h4 v-if="client.batchplan && client.batchplan.name" class="text-base text-white font-medium"><span
            v-if="client.demo === true" class="text-red-600 font-bold text-md pr-2">D</span><span
            v-if="client.repeater === true" class="text-yellow-400 font-bold text-md pr-1">R</span><b>Batch Code : </b>{{
              client.batchplan.name }}</h4>
        <!-- <h5 class="text-base text-red-600" v-if="client.repeater==true"><b>R</b></h5> -->
        <div v-else></div>
      </div>
      <h5 v-if="client.subject && client.subject.name" class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300">
        <b>Subject : </b>{{ client.subject.displayname }}
      </h5>
      <h5 v-if="client.branch && client.branch.name" class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300">
        <b>Branch : </b>{{ client.branch.name }}
      </h5>
      <h5 v-if="client.started_at && client.started_at.charAt(0) != '0'"
        class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Started at : </b>{{
          dayjs(client.started_at).format("DD-MMM-YY") }}</h5>
      <h5 v-else class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Started at : </b>{{
        dayjs(client.tentative_start).utc().format("DD-MMM-YY") }}</h5>
      <h5 class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300">
        <b>Class Timings : </b
        >{{ dayjs(client.tentative_start).utc().format("hh:mm A") }}
      </h5>

      <!-- <h5 v-else class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Class Timings : </b>{{
        dayjs(client.tentative_start).utc().format("hh:mm A") }}</h5> -->

      <h5 v-if="client.trainer && client.trainer.name"
        class="text-sm border-b border-gray-600 pb-1 mb-1 overflow-x-auto text-gray-300"><b>Trainer :
        </b>{{ client.trainer.name }}</h5>
      <h5 v-if="client.batchplan && client.batchplan.start_date"
        class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Start Date :
        </b>{{ dayjs(client.tentative_start).format('DD-MMM-YY hh:mm A') }} </h5>
      <h5 class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b><span
            class="text-orange-500 font-bold text-sm pl-1">Regular:</span> classes attended:
        </b>{{ client.regular_attended }} </h5>
      <h5 class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b><span
            class="text-orange-500 font-bold text-sm pl-1">Regular:</span> Total classes taken :
        </b>{{ client.regular_taken }} </h5>
        <h5 class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b><span
            class="text-orange-500 font-bold text-sm pl-1">Presentation:</span> classes attended:
        </b>{{ client.presentation_attended }} </h5>
      <h5 class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b><span
            class="text-orange-500 font-bold text-sm pl-1">Presentation:</span> Total classes taken :
        </b>{{ client.presentation_taken }} </h5>
      <!-- <h5 class="text-sm border-b border-gray-600 pb-2 mb-2 text-gray-300"><b><span class="text-blue-400 font-bold text-sm pl-1">Coding:</span>  Total classes attended/Total classes taken :</b>{{client.coding_attended}}/{{client.coding_taken}}  </h5>
        <h5 class="text-sm border-b border-gray-600 pb-2 mb-2 text-gray-300"><b><span class="text-blue-400 font-bold text-sm pl-1">Presentation:</span> Total classes attended/Total classes taken : </b>{{client.presentation_attended}}/{{client.presentation_taken}}  </h5> -->

      <div class="flex flex-wrap pb-1   mt-3">
        <jb-button
          v-if="client.mode_of_class && client.mode_of_class.name.toLowerCase() === 'online' && client.blocked === false && dayscrossed === true && user.validation.other===false"
          label="Add Placement Form" type="submit" @click ="add_profile" color="success"
          class="font-medium text-sm py-1" />

        
        <jb-button
          @click="clickLink(client.batchplan.name)"
          :target="isTauri?'_tauri':'_blank'"
          v-if="client.mode_of_class && client.mode_of_class.name.toLowerCase() === 'online' && client.blocked === false && ((dayscrossed === false) || (dayscrossed === true&&user.validation.other===true)) "
          label="Join classroom" type="submit" color="success"
          class="font-medium text-sm py-1" />
          <!-- <jb-button
          v-if="client.mode_of_class && client.mode_of_class.name.toLowerCase() === 'online' && client.blocked === false&&userprofile===false"
          label="Add Profile" type="submit" @click ="add_profile" color="success"
          class="font-medium text-sm py-1" /> -->
        <jb-button
          v-if="client.mode_of_class && client.mode_of_class.name.toLowerCase() === 'online' && client.regular_taken <= 3"
          label="Classes" type="submit" href="https://qspiders.com/classes" :target="isTauri?'_tauri':'_blank'" color="info"
          class="font-medium text-sm py-1" />

        <jb-button
          v-if="client.mode_of_class && client.mode_of_class.name.toLowerCase() === 'online' && client.blocked === true"
          label="Blocked" type="submit" color="danger" class="font-medium text-sm py-1" />

        <jb-button v-if="client.mode_of_class && client.mode_of_class.name.toLowerCase() === 'offline'"
          label="Open QRCode" type="submit" color="info" @click="scan(user.user.uid)" class="font-medium text-sm py-1" />
          <jb-button 
        
          label="Help" type="submit" :icon="mdiAccountQuestion" color="help" @click="viewhelp()" class="font-medium text-sm py-1" />
      </div>

      <!-- <div class="flex flex-wrap border-gray-600 pb-2 mb-2 border-b">
 
            <jb-button label = "Trainer Message (2)" type="submit" color="blue" @click="openShowChatModal" 
              class="text-sm ml-0 cursor-pointer whitespace-nowrap block focus:outline-none 
              transition-colors duration-150 border text-blue-600 focus:ring rounded pt-0 pb-0 pr-1 pl-1 mt-0" />
        
        </div> -->

      <!-- <div class="flex flex-wrap border-gray-600 pb-2 mb-2 border-b">

     
            <jb-button label="Trainer Announced (2)" type="submit" color="green" @click="openShowAnnouncementModal"
              class="text-sm ml-0 cursor-pointer whitespace-nowrap block focus:outline-none transition-colors duration-150 border text-teal-400 focus:ring rounded pt-0 pb-0 pr-1 pl-1 mt-0 border-teal-700" />
          </div> -->

      <!-- <div class><router-link :to="`/batchcalendar/` + `${client.batch_id}`">go to calendar</router-link></div> -->

    </div>

  </div>
  <div v-if="!subject_batch" >
    <h5 class="text-red-500 text-2xl font-bold">{{ "No Batches found!!" }}</h5>
    <jb-button 
                  label="Clear"
                  type="submit2"
                  color="danger"
                  @click="clear()"
                  small
                  class ="pt-0 pb-0 font-normal pl-1 pr-1 text-base"
                  />
  </div>


  <!-- <div v-else class="grid grid-cols-2 last:mb-0 mb-2 pl-6 mt-3 border-b-2 border-white pb-5 md:pb-5"> -->

    <!-- <h5 v-if="subject_batch" class="text-yellow-400 text-2xl font-bold">{{ "My Batches" }}</h5> -->
    <!-- <h5 class="text-red-500 text-2xl font-bold">{{ "You have not assigned to any batches yet!!" }}</h5> -->
    <!-- <div class="pt-2">
        <div class="flex items-center justify-start flex-wrap -mb-3" style="justify-content: end; margin-right: 10px">
          <div>
            <jb-buttons>
                 <div v-if="paycourse&&paycourse.length >1">
                  <router-link :to="`/paymentcourselist`">
                    <jb-button
                      class="ml-0 cursor-pointer whitespace-nowrap block focus:outline-none transition-colors duration-150 border text-white focus:ring rounded pt-0 pb-0 pr-1 pl-1 mb-0 mt-0"
                      label="Pay" color="success" />
                  </router-link>
                </div>

                <div v-else>
                  <div v-for="pdata in paycourse"
                    :key="pdata.id">
                    <span v-if="pdata.partial_balance != 0 && pdata.oneshot_balance != 0">
                      <jb-button
                        class="ml-0 cursor-pointer whitespace-nowrap block focus:outline-none transition-colors duration-150 border text-white focus:ring rounded pt-0 pb-0 pr-1 pl-1 mb-0 mt-0"
                        label="Pay" color="success"
                        @click="addpay(pdata)" />
                    </span>

                    <span v-else>
                      <jb-button
                      class="ml-0 cursor-pointer whitespace-nowrap block focus:outline-none transition-colors duration-150 border text-white focus:ring rounded pt-0 pb-0 pr-1 pl-1 mb-0 mt-0"
                      label="Pay" color="success"
                      @click="paid()" />
                    </span>
                  
                  </div>
                </div>
            </jb-buttons>
          </div>

        </div>
      </div> -->
  <!-- </div> -->
  <div
        :class="lightBorderStyle"
        class="p-3 lg:px-6 border-t dark:border-gray-800 sticky z-[9] bottom-0 bg-gray-800"
        v-if="subject_batch"
      >
        <level mobile>
          <jb-buttons glue>
            <jb-button
              v-for="page in pagesList"
              :class="currentPage === page ? 'bg-blue-600' : ''"
              :key="page"
              :active-soft="page === currentPage"
              :label="page"
              addon
              :outline="darkMode"
              small
              no-focus-ring
              @click="currentPage != page ? pageChange(page - 1) : ''"
            />
          </jb-buttons>
          <small class="font-bold">Page {{ currentPageHuman }} of {{ numPages }}</small>
        </level>
      </div> 
      <!-- <div
        :class="lightBorderStyle"
        class="p-3 lg:px-6 border-t dark:border-gray-800 sticky z-[9] bottom-0 bg-gray-800"
        v-if="subject_batch"
      >
      <level mobile>
  <vue-awesome-paginate
    :total-items="itemsLength"
    :items-per-page="itemsPerPage"
    :max-pages-shown="itemsShown"
    v-model="currentPage"
    :on-click="pageChange"
    class="sticky bottom-0 z-[1] w-full py-2"
  />
  <small class="font-bold">Page {{ currentPageHuman }} of {{ numPages }}</small>
</level>
      </div> -->
  <Qrcode v-if="scanclass === true" :id="ids" v-model="scanclass" has-cancel />
<Viewhelp v-if="helpviews===true" v-model="helpviews" has-cancel />

  <!--  -->
</template>

<style>
#main {
    transition: margin-left .5s;
    transition-duration: 150s;
}

</style>

