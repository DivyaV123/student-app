<script setup>
import { computed, ref ,reactive,onBeforeMount,} from 'vue'
import { mdiCheckboxMarkedCircle,mdiMagnify,mdiCloseCircleOutline,mdiCashMultiple } from '@mdi/js'
import { useRouter,useRoute } from "vue-router";
import Multiselect from '@vueform/multiselect'
import { selectClasses } from '@/selectcss.js'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Field from '@/components/Field.vue'
import Level from '@/components/Level.vue'
import MethodModal from '@/components/MethodModal.vue'
import Repeatermodal from '@/components/Repeatermodal.vue'
// import TermsModal from '@/components/TermsModal.vue'
// import AddressModal from '@/components/AddressModal.vue'

import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import Icon from '@/components/Icon.vue'
import CardComponent from "@/components/CardComponent.vue";
import { themeStore } from "../stores/theme"
// import { useStorage } from "vue3-storage";
import { sessionStore } from "../stores/session";
import { studentStore } from "../stores/student"
import Control from '@/components/Control.vue'
const student = studentStore()
const route = useRoute();
const user = sessionStore();
const theme = themeStore();
// const ls = useStorage();

const perPage = 25;
const wrong = ref(false)
const isTableActive = ref(false)
const isrepeaterActive = ref(false)
const isTermsActive = ref(false)
const AddressModalActive = ref(false)
const repeatervalue = ref(null)
const pageLoading = ref(false)
const pmethod = Array({
  id: null,
  partial_balance: '',
});

const selectmethod = (data) =>{
  apm.value=data
  isTableActive.value = true
}

const selectmethod1 = (data) =>{
  repeatervalue.value=data
  isrepeaterActive.value = true
}

const termsdata = Array({
  id: null,
  terms: {},
});
const payments = computed(() => user.student_payments)
const online = computed(() =>  user.isonline);

const terms_condtions = (id,terms) =>{
  termsdata.id = id,
  termsdata.terms = terms,

  isTermsActive.value = true
}
const router = useRouter();
const isTauri = window.__TAURI__;
const clickLink = (data1,data2) => {
  if(isTauri){
  router.push("/paymentdetailslist/"+data1+"/"+data2+"/"+false)
  }
  else{
    window.open( `/paymentdetailslist/${data1}/${data2}/${false}`, "_blank" );
  }
}
const itemsPaginated = computed(() => {
    if(searchByName.value.length > 0){
       user.checkonlines();
    if(online.value===true){
      return user.student_course.filter(val => val.name.includes(searchByName.value) )
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }        
      }
    else{
      if(user.student_course){
         user.checkonlines();
    if(online.value===true){
      return user.student_course
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
        // console.log("user.student_course",user.student_course)
  }
  }
})

// console.log("itemsPaginated",itemsPaginated)

const repeater = computed(() => {
  if(user.repeater_data){
      return user.repeater_data.filter(val => val.fees != 0)
  }
  
})

const get_lasttaxes = (cid, index,bid,datas) =>{
  if(payments.value&&payments.value.length > 0){
    var selectPayments = payments.value.filter(function (el) {
      if(datas&&datas.transferred===true){
        if(datas.from&&datas.from.id){
          return (el.course.id === datas.from.id)
        }
      }
      else{
        return (el.course.id === cid&&el.course.branch.branchid===bid)
      }
        
      });
      itemsPaginated.value[index]["payments"] = selectPayments[selectPayments.length - 1]
  }
}

const get_paid = (cid, payments) =>{
  termsdata.id = id, 
  termsdata.terms = terms,
  isTermsActive.value = true
}

onBeforeMount(async () => {
  pageLoading.value = true
  if(isTauri){
    document.addEventListener("contextmenu", (event) => event.preventDefault());
  }
  await user.checkonlines();
  if(online.value===true){
  await user.getstudentcoursess();
  await user.getstudentpayments();
  }
  else{
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  }
  theme.setPageTitle("Course Details")
  pageLoading.value = false


});


const searchByName = computed(() => searchdata.name)
const lightBorderStyle = computed(() => theme.lightBorderStyle)

const lightBgStyle = computed(() => theme.lightBgStyle)

const tableTrStyle = computed(() => theme.tableTrStyle)

const tableTrOddStyle = computed(() => theme.tableTrOddStyle)

const darkMode = computed(() => theme.darkMode)

const currentPage = ref(1)




const address = computed(() => student.address)

const terms = computed(() => student.terms)
const itemsCount = computed(() => student.coursecount)

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

const apm = ref(null);

const pageChange =(page) => {
  currentPage.value = page;
  user.getstudent()

}
const searchdata = reactive({
      name: '',
})
</script>

<template>

<method-modal :pmethod="apm" v-if="isTableActive == true" v-model="isTableActive" >
</method-modal>
<Repeatermodal :pmethod="repeatervalue" v-if="isrepeaterActive == true" v-model="isrepeaterActive" >
</Repeatermodal>
<!-- <terms-modal :termsdata="termsdata" v-if="isTermsActive == true" v-model="isTermsActive" title="Terms & Conditions" >
</terms-modal> -->

<!-- <address-modal v-if="AddressModalActive == true" v-model="AddressModalActive" title="Add Student Address" >
</address-modal> -->
<!-- <div class="grid md:grid-cols-6 gap-2">
      <field>
         <control
    placeholder="Search here"
    v-model="searchdata.name"
    class=" "
    />   
      </field>
        
    </div> -->
    <div v-if="pageLoading" wire:loading
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
    <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
    <p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
  </div>
<h6  class="text-red-600  font-bold bg-gray-900  pb-2">Note:If payment has not reflected then wait for a day!!</h6> 
<card-component  class="mb-4" has-table>
      <h6  class="text-teal-600 underline font-bold text-center bg-gray-900  pb-2">Course Payment</h6>
      <table class="">
        <thead class="sticky top-[57px] z-[9] bg-gray-900">
      <tr>
        <th>Course</th>
        <th>Subjects</th>
        <th>Branch</th>
        <th>Total Target to Pay</th>
        <th>Total Amount Paid</th> 
        <!-- <th>Last Paid Amount</th>
        <th>Last Paid GST</th>
        <th>Last Paid Date</th> -->
         
        <!-- <th>Repeater Fees</th> -->
        <th>Show My Payments</th>
      </tr>
    </thead>
    <tbody>
      <!-- {{itemsPaginated}} -->
    
      <tr v-for="(client, index) in itemsPaginated"
        :key="client.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >  
        {{get_lasttaxes(client.id, index,client.branch.branchid,client)}}

        <td v-if="client.name || client.displayname" data-label="Course">
          <small v-if="client.displayname" class="font-bold text-orange-500">
              {{client.displayname}}
          </small>
          <small v-else class="font-bold text-orange-500">
              {{client.name}}
          </small>
        </td>

         <td  v-else data-label="Course" >
          <small class="text-red-500 font-semibold">
            {{"Course not found"}}
          </small>
        </td>
         <td v-if="client.subjects" data-label="Subjects" class="flex-wrap"> 
          <small  v-for="(bat,index2) in client.subjects" :key="index2+'G'" class="font-bold text-orange-500">
              <span v-if="bat.displayname" class="text-gray-500 dark:text-gray-300 font-semibold text-xs">{{bat.displayname}}</span><br>
          </small> 
        </td>

        <td  v-else data-label="Subjects" class="flex-wrap">
          <small class="text-red-500 font-semibold">
            {{"Subject not found"}}
          </small>
        </td>

        <td v-if="client.branch&&client.branch.branchname" data-label="Branch">
          <small class="font-bold text-orange-500">
              {{client.branch.branchname}}
          </small>
        </td>

         <td  v-else data-label="Branch" >
          <small class="text-red-500 font-semibold">
            {{"Branch not found"}}
          </small>
        </td>

        <td v-if="client.booleans&&client.booleans.disable_one_shot_pay===false" data-label="Total Target to Pay">
          <small class="font-bold">
          If Paying 
                <span class="text-orange-500 font-bold"> OneShot Amount </span>
                , then Target is <span class="text-orange-500 font-bold"> {{client.oneshot}}  </span>
                , Balance is <span class="text-orange-500 font-bold"> {{client.oneshot_balance}} </span>
                 <br/>
                If Paying 
                <span class="text-orange-500 font-bold"> in Installment </span>
                , then Target is <span class="text-orange-500 font-bold"> {{client.partial}}  </span>
                , Balance is <span class="text-orange-500 font-bold"> {{client.partial_balance}} </span>
          </small>
        </td>

         <td v-else data-label="Total Target to Pay">
          <small class="font-bold">
                If Paying 
                <span class="text-orange-500 font-bold"> in Installment </span>
                , then Target is <span class="text-orange-500 font-bold"> {{client.partial}}  </span>
                , Balance is <span class="text-orange-500 font-bold"> {{client.partial_balance}} </span>
          </small>
        </td>


        <td v-if="client.paid"  
        data-label="Total Amount Paid">
        <div >
          <small class="font-bold text-sm">
            {{client.paid}}
          </small>
        </div>
        </td>

        <td  v-else data-label="Total Amount Paid" >
          <small class="text-red-500 font-semibold">
            {{"No payment done"}}
          </small>
        </td>

        <!-- <td v-if="client.payments&&client.payments.amount&&client.course_active===true"  
        data-label="Last Paid amount">
        <div >
          <small>
            <span class="text-white font-bold text-sm"> {{client.payments.amount}}</span>
          </small>
        </div>
        </td>

        <td  v-else data-label="Last Paid Amount">
          <small class="text-red-500 font-semibold">
            {{"No payment done"}}
          </small>
        </td>
        <td v-if="client.payments&&client.payments.gst!=null&&client.course_active===true"  
        data-label="Last Paid GST">
        <div v-for="(client1) in client.payments.gst"  :key="client1.id">
          <small class="font-bold text-sm">
            <span class="text-white font-bold"> {{client1.name}}</span>@<span class="text-white font-bold">{{client1.value}}%</span>={{client1.amount}}
          </small>
        </div>
        </td>

        <td  v-else data-label="Last Paid GST">
          <small class="text-red-500 font-semibold">
            {{"No payment done"}}
          </small>
        </td>
   

         <td v-if="client.payments&&client.payments.amount&&client.course_active===true"  
        data-label="Last Paid Date">
        <div >
          <small>
            <span class="text-white font-bold text-sm"> {{client.payments.date}}</span>
          </small>
        </div>
        </td>

        <td  v-else data-label="Last Paid Date">
          <small class="text-red-500 font-semibold">
            {{"No payment done"}}
          </small>
        </td> -->






        <td  data-label="Show My Payments">
          <small>
            <div class="flex flex-wrap  space-x-2">
   

              <!-- <router-link v-if="payments&&payments.length" :to="`/paymentdetailslist/${client.id}/${client.branch.branchid}/${false}`"> -->
                <div  >
                  <jb-button
                  @click="clickLink(client.id,client.branch.branchid)"
                    label="Show"
                    type="submit"
                    color="info"
                    small
                    class="font-bold"
                  />
                </div>
              <!-- </router-link> -->

        <jb-buttons>
            <!-- <div v-if="user.personal_data&&!user.personal_data.permanentaddress">
                <jb-button
                label="Add Address"
                type="submit"
                color="warning"
                small
                @click="AddressModalActive = true"
                />
            </div> -->
<!-- 
            <div v-else> -->
              <!-- <div v-if="client.partial_balance==0 || client.one_shot_balance==0">
                <jb-button
                    color="teal"
                    label="Paid"
                    small
                />
            </div>   -->
            <div >
                <jb-button v-if="client.branch.disable_payment===false"
                    color="success"
                    label="Pay"
                    class="font-bold"
                    small
                    @click="selectmethod(client)"
                />
                <jb-button v-else
                    color="light"
                    label="Pay"
                    class="font-bold"
                    small
                />
            </div>  
        </jb-buttons>

     </div>
            <!-- <span v-if="client.partial_balance != 0 && client.one_shot_balance != 0">
           <span v-if="address != 0" class="cursor-pointer" @click="terms_condtions(client.id,terms)">By clicking on <span class="text-teal-500">Pay </span>, you agree to all the <span class="text-teal-500">Terms & Conditions</span></span></span> -->
          
          </small>
        </td>




      </tr>
    </tbody>
  </table>
</card-component>
<!-- <card-component  class="mb-2" has-table>

  <h6 v-if="repeater&&repeater.length" class="text-teal-600 underline font-bold text-center bg-gray-900  pb-2">Repeater Payment</h6>
   <table class="" v-if="repeater&&repeater.length">
    <thead class="bg-gray-800">
      <tr>
        <th>Batch</th>
        <th>Fees</th>
        <th>Total Amount Paid</th> 
        <th>Branch</th>
        <th>Subject</th>
        <th>Trainer</th> 
        <th>Show My Payments</th> 
      </tr>
    </thead>
     <tbody>
    
      <tr v-for="(client, index) in repeater"
        :key="client.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >     
         <td  data-label="Batch">
           <div v-for="(client1) in client.batch"  :key="client1.id">
          <small class="font-bold text-orange-500">
              {{client1.name}}
          </small>
           </div>
        </td>

         <td  data-label="Fees">
          <small class="font-bold">
              {{client.fees}}
          </small>
        </td>

         <td  data-label="Total Amount Paid">
          <small class="font-bold">
              {{client.fees_paid}}
          </small>
        </td>



        <td  data-label="Branch">
          <small class="font-bold">
              {{client.branch.name}}
          </small>
        </td>
       

        <td  data-label="Subject">
          <small class="font-bold">
              {{client.subject.name}}
          </small>
        </td>

         <td  data-label="Trainer">
          <small class="font-bold">
              {{client.trainer.name}}
          </small>
        </td>





        <td  data-label="Show My Payments">
          <small>
            <div class="flex flex-wrap  space-x-2">
              <router-link :to="`/paymentdetailslist/${client.subject.id}/${client.branch.id}/${true}`">
                <div v-if="client.fees_paid != 0" >
                  <jb-button
                    label="Show"
                    type="submit"
                    color="info"
                    small
                    class="font-bold"
                  />
                </div>
              </router-link>

        <jb-buttons>
            <div>
                <jb-button
                    color="success"
                    label="Pay"
                    small
                    class="font-bold"
                    @click="selectmethod1(client)"
                />

            </div>  
        </jb-buttons>

     </div>

          </small>
        </td>

    



      </tr>
    </tbody>
   </table>
</card-component> -->
<!-- </div> -->

  
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

</template>
