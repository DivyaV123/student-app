<template>

  <!-- <div v-if="checkedRows.length" class="bg-opacity-50 p-3 dark:bg-gray-800" :class="lightBgStyle">
    <span v-for="checkedRow in checkedRows" :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm dark:bg-gray-700" :class="lightBgStyle">
      {{ checkedRow.name }}
    </span>
  </div> -->
  <div v-if="pageLoading" wire:loading
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
    <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
    <p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
  </div>
  <!-- <div class="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
      <field>
         <control
        placeholder="Search here"
        v-model="searchdata.name"
        class=" "
        />   
      </field>
        
    </div> -->
    <div class="flex justify-start w-full bg-[#151D2B] sticky top-[48px] z-[9] py-2 gap-2 ">
    <!-- <jb-button
    @click = "isModalActive =! isModalActive"
    label="Search"
    type="submit"
    class="pt-1 pb-1 pr-2 pl-2"
    color="info"
    /> -->
        <h4 class="text-white text-xl font-bold text-center">{{"Total:"}}{{itemsCount}}</h4>
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
          <p class="flex items-center py-2 grow font-bold ">

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
             <input type=text v-model="batch_name"   class="border border-gray-500 bg-gray-800 w-full h-[35px] pl-2" placeholder="Enter batch name here" required />
             </field>
          <div class="grid grid-cols-1 last:mb-0 mt-2">
            <div class="grid grid-cols-1 gap-3 md:grid-cols-2 ml-[5px]">
                <jb-button
                  label="Search"
                  type="submit2"
                  color="success"
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

    <div v-if="itemsCount>0" class="grid xl:grid-cols-5 sm:grid-cols-2 gap-0 m-2 md:grid-cols-2 lg:grid-cols-3 ">
    <!-- {{ itemsPaginated[0].name }} -->
    <div v-for="client in itemsPaginated"
      :key="client.id" class="card shadow-lg bg-gray-900 m-3 p-4 rounded-md mb-0 border border-4 border-gray-300">


     <div class="border-b border-gray-600 pb-1 mb-1">
      <h4  class="text-sm pb-1 mb-1 text-white font-bold"><b>Name : </b>{{ client.name }}</h4>
      <!-- <h4 v-if="client.company_details_name" class="text-base text-white font-medium"><b>Company Name : </b>{{ client.company_details_name }}</h4>
     <div v-else></div> -->
     </div>
      <h5  v-if="client.designation&&client.designation[0]&&client.designation[0].name" class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Designation : </b><span v-for="(client1, index) in client.designation"
      :key="client1.id" :class="index % 2 === 0 ? 'text-green-300 pr-2' : 'text-gray-200 pr-2'">{{ client1.name }}</span></h5>
      <h5 v-else class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Designation : </b><span class="text-red-500">{{ "Not given" }}</span></h5>
      <!-- <h5  class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Qualification Type :</b> {{ client.qualification_type.name }}</h5> -->
      <h5  v-if="client.rounds&&client.rounds[0]&&client.rounds[0].name" class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Rounds : </b><span  v-for="(client3, index) in client.rounds"
      :key="client3.id" :class="index % 2 === 0 ? 'text-green-300 pr-2' : 'text-gray-200 pr-2'">{{ client3.name }}</span></h5>
      <h5 v-else class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Rounds : </b><span class="text-red-500">{{ "Not given" }}</span></h5>
        

      <!-- <h5  class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Status : </b>{{ client.status }}</h5> -->
      <!-- <h5 v-if="client.close_date" class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Close Date : </b>{{client.close_date}}</h5> -->
      <h5 v-if="client.interview_location&&client.interview_location[0]&&client.interview_location[0].id" class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Interview location : </b><span  v-for="(client4, index) in client.interview_location"
      :key="client4.id" :class="index % 2 === 0 ? 'text-green-300 pr-2' : 'text-gray-200 pr-2'">{{ client4.name }}</span></h5>
      <h5 v-else class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Interview location : </b><span class="text-red-500">{{ "Not given" }}</span></h5>
      <h5 v-if="client.shift&&client.shift[0]&&client.shift[0].id" class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Shift : </b><span  v-for="(client5, index) in client.shift"
      :key="client5.id" :class="index % 2 === 0 ? 'text-green-300 pr-2' : 'text-gray-200 pr-2'">{{ client5.name }}</span></h5>
      <h5 v-else class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Shift : </b><span class="text-red-500">{{ "Not given" }}</span></h5>
      <h5  v-if="client.interview&&client.interview.name" class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Mode of Interview : </b>{{ client.interview.name}}</h5>
      <h5 v-else class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Mode of Interview : </b><span class="text-red-500">{{ "Not given" }}</span></h5>
      <!-- <h5  class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>CTC : </b>{{ client.ctc }}</h5> -->
      <h5  v-if="client.bond===false" class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Bond? : </b>{{ "No"}}</h5>
      <h5  v-if="client.bond===true" class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Bond? : </b>{{ "Yes"}}</h5>
      <h5 v-if="client.bond===true" class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Bond years : </b>{{ client.years }}</h5>
      <h5  v-if="client.deposite===false" class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Deposit? : </b>{{ "No"}}</h5>
      <h5  v-if="client.deposite===true" class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Deposit? : </b>{{ "Yes"}}</h5>
      <h5 v-if="client.deposite===true" class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Amount : </b>{{ client.amount }}</h5>
      <h5 v-if="client.contact_person!=null&&client.contact_person!=''" class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Contact Person : </b>{{ client.contact_person }}</h5>
      <h5 v-else class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Contact Person : </b><span class="text-red-500">{{ "Not given" }}</span></h5>
      <h5 v-if="client.contact_number!=null&&client.contact_number!=''" class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Contact Number : </b><a class="" :href="'tel:' + client.contact_number">
      {{ client.contact_number }}
        </a></h5>
      <h5 v-else class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Contact Number : </b><span class="text-red-500">{{ "Not given" }}</span></h5>
      <!-- <h5  v-if="client.position!=null&&client.position!=''"  class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Position : </b>{{ client.position }}</h5>
      <h5 v-else class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Position : </b><span class="text-red-500">{{ "Not given" }}</span></h5> -->
      <h5  v-if="client.certification_sub===false" class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Certification submission? : </b>{{ "No"}}</h5>
      <h5  v-if="client.certification_sub===true" class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Certification submission? : </b>{{ "Yes"}}</h5>
      <!-- <h5  v-if="client.meeting_url!=''&&client.meeting_url!=null"  class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Meeting URL : </b>{{ client.meeting_url }}</h5>
      <h5 v-else class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Meeting URL : </b><span class="text-red-500">{{ "Not given" }}</span></h5> -->
      <h5  v-if="client.info_student!=''&&client.info_student!=null"  class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Information : </b>{{ client.info_student }}</h5>
      <h5 v-else class="text-sm border-b border-gray-600 pb-1 mb-1 text-gray-300"><b>Information : </b><span class="text-red-500">{{ "Not given" }}</span></h5>

    </div>
    

  
  </div>
 
 
 
  <div v-else class="grid grid-cols-2 last:mb-0 mb-2 pl-6 mt-3  pb-5 md:pb-5">
    <h5  class="text-red-500 text-2xl font-bold">{{ "No requirements have been added to you!!" }}</h5>
  </div>

  <!-- <div
        :class="lightBorderStyle"
        class="p-3 lg:px-6 border-t dark:border-gray-800"
      >

        <level mobile>
          <JbButtons >

            <JbButton
              v-for="page in pagesList"
              :class="currentPage === page ? 'bg-blue-600' : ''"
              :key="page"
              :active-soft="page === currentPage"
              :label="page"
              addon
              :outline="darkMode"
              small
              no-focus-ring
              @click="currentPage != page ? pageChange(page) : ''"
            />
          </JbButtons>
          <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
          
        </level>
      </div> -->
      <div v-if="itemsLength"
        :class="lightBorderStyle"
        class="p-3 lg:px-6 border-t dark:border-gray-800 sticky z-[9] bottom-0 bg-gray-800"

      
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
            </div>
 

      <Viewloginlogout v-if="show_login===true" v-model="show_login" :login="logindata" :logout="logoutdata" :batchname="logindata1"/>
 
</template>


<script setup>
import { computed, reactive, ref,onBeforeMount } from "vue";
import {
  mdiMinusBox
} from "@mdi/js";
import ModalBox from "@/components/ModalBox.vue";
import CheckboxCell from "@/components/CheckboxCell.vue";
import Level from "@/components/Level.vue";
import JbButtons from "@/components/JbButtons.vue";
import JbButton from "@/components/JbButton.vue";
import { themeStore } from "../stores/theme";
import { useRouter,useRoute } from "vue-router";
import { sessionStore } from "../stores/session";
import Icon from "@/components/Icon.vue";
import Control from '@/components/Control.vue'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import Multiselect from '@vueform/multiselect'
import { selectClasses } from '@/selectcss.js'
import Field from '@/components/Field.vue'
dayjs.extend(utc)
dayjs.extend(timezone)
const theme = themeStore();
// const session = sessionStore();
const user = sessionStore()
const route = useRoute();
const router = useRouter();
const branch_value = ref('');
const lightBorderStyle = computed(() => theme.lightBorderStyle);
const online = computed(() =>  user.isonline);
const itemsLength = computed(() => {
    return user.requirements_data_total
});
const lightBgStyle = computed(() => theme.lightBgStyle);

const tableTrStyle = computed(() => theme.tableTrStyle);

const tableTrOddStyle = computed(() => theme.tableTrOddStyle);

const darkMode = computed(() => theme.darkMode);

const items = computed(() => props.enqs);

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const currentPage = ref(1);

const checkedRows = ref([]);

const perPage = 25;
const checkable = ref(false);
const pageLoading = ref(false)
const batch_name = ref("")

const itemsPaginated = computed(() => {
  return user.requirements_data
});
// const itemsPaginated = computed(async() => {
//     console.log('session.batches_datas')
    // await user.checkonlines();
    // if(online.value===true){
      // console.log("inisde onlone",user.requirements_data)
      // return user.requirements_data
    // }
    // else{
    //   theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    // }
   
// });
 
  const otherDays = (value) => {
    var today = dayjs(new Date()).format('DD/MM/YYYY') 
    var otherDays = value.filter(function (el) {
          return (dayjs(el.created).format('DD/MM/YYYY')  !== today)
      });
    var len = otherDays.length
    if(len < 6){
      for(var i = otherDays.length; i < 6; i++){
      otherDays[i] = 0
    }
    }
    return otherDays
  }
  const logindata = ref(null)
  const logindata1 = ref(null)
  const show_login = ref(false)
  const loginlogout = async (data,data1) => {

  logindata.value=data
  logindata1.value=data1
  show_login.value=true


};

  const checkToday = (value) => {
    var to = dayjs(value).format('DD/MM/YYYY') 
    var today = dayjs(new Date()).format('DD/MM/YYYY') 
    var found = 0
    for(var i = 0 ; i < value.length; i++){
      if(dayjs(value[i].created).format('DD/MM/YYYY') === today&&value[i].attended===true&&value[i].cancel===false&&value[i].status==="1"){
        found = 1
        return "1"
      }
      else if(dayjs(value[i].created).format('DD/MM/YYYY') === today&&value[i].attended===true&&(value[i].cancel===true||value[i].status==="2")){
        found = 2
        return "2"
    }
    else if(dayjs(value[i].created).format('DD/MM/YYYY') === today&&value[i].attended===false){
        found = 3
        return "3"
    }
    else{
      found = 4
      return "4"
    }
  
  }
  }

const itemsCount = computed(() => user.requirements_data_total);
const itemsPerPage = 25
const itemsShown = ref(10)
const scanclass = ref(false);
const ids = ref(null);
const subjects = ref(null);
const trainers = ref(null)
const attendance_type = ref([])
const searchdata = reactive({
      name: '',
    })
const searchByName = computed(() => searchdata.name) 
     
const confirmRefresh = async () => {
  pageLoading.value = true
  await user.checkonlines();
    if(online.value===true){
      await counselor.getReminders();
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }

  pageLoading.value = false
};
const addcomments = ref(false)
const viewcomments = ref(false)
const verifyclasses = ref(false)
const idsss = ref([])
const batchdats = ref([])
const viewdats = ref([])
const commentid=ref(null)
const cancelclasses=ref(false)
const showbatches=ref(false)
const commentname=ref(null)
const addcomment = async (data,data1) => {

  addcomments.value=true
  commentid.value = data
  commentname.value = data1


};
const Notpaidattending = (data,data1,data2)=>{
  const routeData = router.resolve({name: 'studentlist',query: { id: data, batchid: data1, subjectid: data2 }});
  window.open(routeData.href, '_blank');   
}

const viewcomment = async (data) => {

  viewcomments.value=true
  viewdats.value = data


};
const cancelclass = async (data) => {

  cancelclasses.value=true
  idsss.value = data


};

const batchview = async (data) => {

  showbatches.value=true
  batchdats.value = data


};
const verifyclass = async (data) => {

  verifyclasses.value=true
  // idsss.value = data


};

const searchParams = async() => {
  // console.log("inside searchparams")
  pageLoading.value = true
     let searchdata=""
      if(batch_name.value ){ 
     if (batch_name.value ) {
        searchdata+="&name=" +batch_name.value
    ;}     
   params = new URLSearchParams(searchdata).toString();
   await  user.getrequirements(currentPage.value,route.query.id,params);
    pageLoading.value = false

}
}

const clear = async() => {
    pageLoading.value = true
    params ='';
    batch_name.value = '';
    currentPage.value=0;
    await  user.getbatchesdata(currentPage.value,route.query.id);
    pageLoading.value = false

    }


onBeforeMount(async () => {
  await user.checkonlines();
  theme.setPageTitle("Requirements");
}

)
let params=ref("")

const maxPages = ref(10);
const numPages = computed(() =>{ 
  // console.log("itemsCount.value",itemsCount.value)
  if(itemsCount.value!=0){
    return Math.ceil(itemsCount.value / perPage)
  }
  });


const currentPageHuman = computed(() => currentPage.value );

const pageChange = async (page) => {
  // console.log("inside page change")
    // let page = currentPage.value-1
    pageLoading.value = true
    currentPage.value = page;
    if (params) {
    await user.getrequirements(page,user.user.uid);
    }
    else{
      await user.getrequirements(page,user.user.uid);
    }
    // }
    pageLoading.value = false
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
};

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
const take = (data,data1,data2,data3)=>{
  ids.value = data,
  attendance_type.value=data1,
  subjects.value=data2,
  trainers.value=data3
  scanclass.value=true
}
const remove = (arr, cb) => {
  const newArr = [];

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });

  return newArr;
};
</script>


<style>
tbody tr:nth-child(even){
  background-color: #151D2B !important;
}

</style>