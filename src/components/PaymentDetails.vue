<script setup>
import { computed, ref ,reactive,onBeforeMount,} from 'vue'
import { mdiCheckboxMarkedCircle,mdiMagnify,mdiCloseCircleOutline } from '@mdi/js'
import { useRouter,useRoute } from "vue-router";
import Multiselect from '@vueform/multiselect'
import { selectClasses } from '@/selectcss.js'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Field from '@/components/Field.vue'
import Level from '@/components/Level.vue'
import Pill from '@/components/Pill.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import Icon from '@/components/Icon.vue'
import { themeStore } from "../stores/theme"
// import { useStorage } from "vue3-storage";
import { sessionStore } from "../stores/session";
import { studentStore } from "../stores/student"
import Control from '@/components/Control.vue'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs';
dayjs.extend(utc)
dayjs.extend(timezone)
const student = studentStore()
const route = useRoute();
const user = sessionStore();
const theme = themeStore();
const router = useRouter();
// const ls = useStorage();
const active = ref("Active")
const inactive = ref("Cancelled")
const transfered = ref("Fees Transfered")
const perPage = 25;
const wrong = ref(false)

// const payments = computed(() => user.student_payments)
// const get_lasttaxes = computed( () =>{
//   if(payments.value.length > 0){
//     var selectPayments = payments.value.filter(function (el) {
//       if(el.repeater){
//         return (el.course.id === parseInt(route.params.id)&&el.course.branch.branchid === parseInt(route.params.branchid)&&el.repeater.toString() === route.params.repeater)
//       }
//       else{
//         return (el.course.id === parseInt(route.params.id)&&el.course.branch.branchid === parseInt(route.params.branchid))
//       }
        
//       });
//       return selectPayments

//   }
// }

// )

const pageLoading = ref(false)

const clear = async() => {
    pageLoading.value = true
    searchdata.name = '';
    await user.getstudentpayments();
    pageLoading.value = false
    }
const isTauri = window.__TAURI__;
onBeforeMount(async () => {
  pageLoading.value = true
  theme.setPageTitle("Payment Details")
  await user.checkonlines();
  if(isTauri){
    document.addEventListener("contextmenu", (event) => event.preventDefault());
  }
  if(online.value===true){
    await user.getstudentpayments();
   }
  else{
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  } 
  pageLoading.value = false
});
const online = computed(() =>  user.isonline);
const redirectToUserView = async (receiptdata) => {    
  pageLoading.value = true
    await user.checkonlines();
  if(online.value===true){
    if(isTauri){
      router.push("/receipt/"+receiptdata)
    }
    else{
      window.open( `/receipt/${receiptdata}`, "_blank" );
    }
  }      
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
    pageLoading.value = false
};

const payid= ref(null)

const complain = (id) => {
  payid.value=id
  wrong.value=true

}

const lightBorderStyle = computed(() => theme.lightBorderStyle)

const lightBgStyle = computed(() => theme.lightBgStyle)

const tableTrStyle = computed(() => theme.tableTrStyle)

const tableTrOddStyle = computed(() => theme.tableTrOddStyle)

const darkMode = computed(() => theme.darkMode)

const currentPage = ref(1)
const searchdata = reactive({
      name: '',
    })
const searchByName = computed(() => searchdata.name.trim())
const course = computed(() => student.cdetails)
const itemsCount = computed(() => student.ccount)
const paymentdetails = computed(() => student.pdetails)
// const payments = computed(() => {
  
//   if(searchByName.value&&searchByName.value.length > 0){
//      user.checkonlines();
//     if(online.value===true){
//       return user.student_payments.filter(val =>
//           val.course.displayname.toLowerCase().includes(searchByName.value.toLowerCase())
//       );
//   }  
//     else{
//       theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
//     } 
//   } 

//   else {
//     if (user.student_payments) {
//     // console.log("user.student_payments",user.student_payments)
//     user.checkonlines();
//     console.log("online.value",online.value)
//     if(online.value===true){
//     return user.student_payments;
//     }
//      else{
//       theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
//     }
//   }
//   }
    
  

// })

const payments = computed(() => {
    if(searchByName.value.length > 0){
       user.checkonlines();
    if(online.value===true){
      return user.student_payments.filter(val => val.course.displayname.toLowerCase().includes(searchByName.value.toLowerCase()) )
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }        
      }
    else{
      if(user.student_payments){
         user.checkonlines();
    if(online.value===true){
      return user.student_payments
    }

        // console.log("user.student_course",user.student_course)
  }
  }
})
const numPages = computed(() => Math.ceil(itemsCount.value / perPage));

const pagesList = computed(() => {
  const numShown = ref(10)
  for (let i = 1; i <= numPages.value; i++) {
    const num = Math.min(numShown.value,numPages.value);
    let first = currentPage.value - Math.floor(num / 2);
        first = Math.max(first, 1);
        first = Math.min(first, numPages.value - num + 1);
    return [...Array(num)].map((k,i) => i + first)     
  }
})

const pageChange =(page) => {
  currentPage.value = page;

  student.getCourseDetails(currentPage.value,"cid="+ route.params.id);
}


</script>

<template>
<div v-if="pageLoading" wire:loading
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
    <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
    <p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
  </div>

 <div class="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 mt-4">
      <field>
         <control
        placeholder="Search here"
        v-model="searchdata.name"
        class=" "
        />   
      </field>
        
    </div>

  <table v-if="payments&&payments.length" class="">
        <thead class="sticky top-[57px] z-[9] bg-gray-900">
      <tr>
        <th>Course Name</th>
        <th>Amount Paid</th>
        <th>Date</th>
        <th>Mode of Payment</th>
         <th>Taxes</th>
        <th>Receipt</th>
        <th>Invoice No</th>
     
        <!-- <th>Complain</th> -->
      </tr>

    </thead>
    <tbody>
      
    
      <tr v-for="(client, index) in payments"
        :key="client.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >  
      <td data-label="Name">
          <small v-if="client.course.displayname" class="text-sm font-bold">
          {{client.course.displayname}}
          </small>
          <small v-else class="text-sm font-bold">
          {{client.course.name}}
          </small>
        </td>
    


        <td data-label="Amount Paid">
          <small class="text-sm font-bold">
          {{client.amount}}
          </small>
        </td>
   

        <td data-label="Date" class="text-sm font-bold text-orange-400">
          <small>
          {{dayjs(client.payment_details.date).format("DD-MMM-YY hh:mm A")}}
          </small>
        </td>
         <td data-label="Mode of Payment" >
          <small class="text-sm font-bold">
          {{client.payment_details.type}}
          </small>
        </td>
          <td v-if="client.payment_details.gst&&client.booleans&&client.booleans.gst===false" data-label="Taxes">
          <small class="text-sm font-bold">
            <span v-for="tax in client.payment_details.gst"
              :key="tax"><span class="text-orange-500">{{tax.name}}</span> {{tax.amount}} </span>
          </small>
        </td>

        <td v-else-if="client.booleans&&client.booleans.gst===true" data-label="Taxes">
          <small class="text-red-500 font-bold">
          {{"Tax deducation will not be shown"}}</small><br>
          <small class="text-white font-bold">
          {{"Please contact"}} 
          <small class="text-white text-sm">
        <a :href="'tel:' + 9686700600">
                9686700600
                </a>
          </small>
          </small>
          
        </td>

        <td v-if="client.booleans&&client.booleans.gst===false&&!client.booleans.transferee" data-label="Receipt">
            <small>
              <!-- <pill v-if="client.booleans&&client.booleans.cancelled===true"
              type="danger"
              :text="inactive"
              small
            />
            <pill v-else
              type="success"
              :text="active"
              small
            /> -->
            <span v-if="client.booleans&&client.booleans.cancelled===true" class="text-red-500 font-bold text-md">{{ "Inactive"}}</span>
            <span v-else class="text-green-500 font-bold text-md">{{ "Active"}}</span>
          <jb-button
              label="Show Receipt"
              type="submit"
              color="info"
              class="font-bold"
              small
              @click="redirectToUserView(client.payment_details.invoiceno)"
            />
            </small>
        </td>
        <td v-else-if="client.booleans&&client.booleans.gst===true&&!client.booleans.transferee" data-label="Receipt">
          <small class="text-red-500 font-bold">
          {{"Receipt will not be shown"}}</small><br>
          <small class="text-white font-bold">
          {{"Please contact"}} 
          <small class="text-white text-sm">
        <a :href="'tel:' + 9686700600">
                9686700600
                </a>
          </small>
          </small>
          
        </td>
        <td v-else-if="client.booleans&&client.booleans.transferee===true&&client.booleans.cancelled===true" data-label="Receipt">
          <pill 
              type="danger"
              :text="transfered"
              small
            />
        </td>
        <td v-else-if="client.booleans&&client.booleans.transferee===true&&client.booleans.cancelled===false" data-label="Receipt">
          <small>
            <!-- <pill
              type="success"
              :text="active"
              small
            /> -->
            <span class="text-green-500 font-bold text-md">{{ "Active"}}</span>
            <jb-button
              label="Show Receipt"
              type="submit"
              color="info"
              class="font-bold"
              small
              @click="redirectToUserView(client.payment_details.invoiceno)"
            />

          </small>
          <!-- <pill 
              type="danger"
              :text="transfered"
              small
            /> -->
        </td>
        <td v-if="client.booleans&&client.booleans.gst===false&&!client.booleans.transferee" data-label="Invoice Number">
          <small v-if="client.cninvoice&&client.cninvoice[0]" class="text-white dark:text-white font-bold text-sm">
            <small v-for="client1 in client.cninvoice"
               :key="client1.id">
             <span v-if="client.booleans&&client.booleans.cancelled===true" class="text-red-500">{{ "Cancelled"}}</span> {{  client.payment_details.invoiceno }}<br>
            </small>
          </small>
            <small v-else class="text-white dark:text-white font-bold text-sm">
            {{ client.payment_details.invoiceno }}
          </small>
        </td>
        <td v-else-if="client.booleans&&client.booleans.gst===true&&!client.booleans.transferee" data-label="Invoice Number">
          <small class="text-red-500 font-bold">
            {{"Invoice Number will not be shown"}}</small><br>
          <small class="text-white font-bold">
          {{"Please contact"}} 
          <small class="text-white text-sm">
        <a :href="'tel:' + 9686700600">
                9686700600
                </a>
          </small>
          </small>
        </td>
        <td v-else-if="client.booleans&&client.booleans.transferee===true&&client.booleans.cancelled===true" data-label="Invoice Number">
          <!-- <pill 
              type="danger"
              :text="transfered"
              small
            /> -->
            <span  class="text-red-500 font-bold text-sm">{{ "Fees Transfered"}}</span> {{  client.payment_details.invoiceno }}<br>
        </td>
        <td v-else-if="client.booleans&&client.booleans.transferee===true&&client.booleans.cancelled===false" data-label="Invoice Number">
          <!-- <small v-if="client.cninvoice&&client.cninvoice[0]" class="text-white dark:text-white font-bold text-sm">
            <small v-for="client1 in client.cninvoice"
               :key="client1.id">
             <span v-if="client.booleans&&client.booleans.cancelled===true" class="text-red-500">{{ "Cancelled"}}</span> {{  client.payment_details.invoiceno }}<br>
            </small>
          </small> -->
            <small class="text-white dark:text-white font-bold text-sm">
            {{ client.payment_details.invoiceno }}
          </small>
        </td>
        <!-- <td v-else-if="client.booleans&&client.booleans.transferee===true" data-label="Invoice Number">
          <pill 
              type="danger"
              :text="inactive"
              small
            />
        </td> -->
        <!-- <td data-label="Complain">
          <small>
             <jb-button
                label="Complain"
                color="danger"
                small
                @click="complain(client.id)"
                />
          </small>
        </td> -->
       

      </tr>
    </tbody>
  </table>
  <table v-else>
    <h5 class="text-red-500 text-2xl font-bold">{{ "No data found!!" }}</h5>
    <jb-button 
                  label="Clear"
                  type="submit2"
                  color="danger"
                  @click="clear()"
                  small
                  class ="pt-0 pb-0 font-normal pl-1 pr-1 text-base"
                  />
  </table>


  <!-- <div
    :class="lightBorderStyle"
    class="p-3 lg:px-6 border-t dark:border-gray-800"
  >
    <level mobile>
      <jb-buttons glue>
        <jb-button
          v-for="page in pagesList"
          :key="page"
          :active-soft="page === currentPage"
          :label="page"
          addon
          :outline="darkMode"
          small
          no-focus-ring
          @click="pageChange(page)"
        />
      </jb-buttons>
      <small>Page {{ currentPage }} of {{ numPages }}</small>
    </level>
  </div> -->
  
  <!-- <Wrongdata v-model="wrong" :id="2" :payid="payid" has-cancel/>  -->

</template>
