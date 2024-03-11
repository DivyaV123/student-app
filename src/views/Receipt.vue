<template>
  <div>
      <div id="add_to_me"  >
        <div>
        <div class="bg-white px-2 pb-1">
            <div class="border-t-2 border-black overflow-x-auto">
                <h6 class="text-black text-center text-xs font-bold">Tax Invoice</h6>


                <form class="flex items-center justify-between pb-0 pt-3 sm:pt-0">
                    <label class="cursor-pointer flex items-center" for="original for recipient">

                        <input type="checkbox" id="recipient" name="checkbox" native-value="true"
                            class="pl-4 h-3 w-3 align-middle" value="true">
                        <span class="text-black font-normal font-size pl-1">Original for recipient</span>
                    </label>

                    <label class="cursor-pointer flex items-center" for="Duplicate for supplier">

                        <input type="checkbox" id="supplier" name="checkbox" native-value="false"
                            class="pl-4 h-3 w-3 align-middle" value="false">
                        <span class="text-black font-normal font-size pl-1">Duplicate for supplier</span>
                    </label>
                </form>

                <div>
                    <h5 class="capitalize text-sm font-bold text-gray-700 text-center leading-3" v-if="receipt&&receipt.branch&&receipt.branch.details">{{receipt.branch.details.invoice_heading}}</h5>
                    <h5 class="capitalize font-size font-bold text-gray-700 text-center" v-if="receipt&&receipt.branch&&receipt.branch.details">{{receipt.branch.details.unit}}</h5>
                    <p class="font-size font-medium text-gray-700 text-center leading-3" v-if="receipt&&receipt.branch"><b>Billing Address:</b>{{receipt.branch.details.billing_address}}</p>
                </div>

                 <div class="flex justify-around mt-0 pb-0 gap-2">
                    <div>
                        <p class="font-size font-medium text-gray-700" v-if="receipt&&receipt.branch"><b>Range:</b>{{receipt.branch.details.range}}</p>
                    </div>

                    <div>
                        <p class="font-size font-medium text-gray-700" v-if="receipt&&receipt.branch"><b>Division:</b>{{receipt.branch.details.division}}</p>
                    </div>

                    <div>
                        <p class="font-size font-medium text-gray-700" v-if="receipt&&receipt.branch"><b>Commissionerate:</b>{{receipt.branch.details.commission_rate}}</p>
                    </div>
                </div>

                <div class="border-b-2 border-dotted border-black border-t-2 pb-0">
                    <div class=" justify-between gap-6 leading-3 pb-2 flex pt-1 overflow-x-auto">
                        <div class="sm:w-auto" v-if="receipt&&receipt.branch">
                            <p class="font-size font-medium text-gray-700" ><b>GSTIN:</b><br>{{receipt.branch.details.gstin}}</p>
                        </div>

                        <div class=" sm:w-auto " v-if="receipt">
                            <p class="font-size font-medium text-gray-700 text-justify" ><b>Invoice No:</b></p>
                            <p class="font-size text-gray-700 text-justify">{{receipt.invoiceno}}</p> 
                            <p class="font-size font-medium text-gray-700 text-justify" v-if="receipt.payment&&receipt.payment.cninvoice&&receipt.payment.cninvoice.cninvoice"><b>Credit Note No:</b></p>
                            <p class="font-size text-gray-700 text-justify" v-if="receipt.payment&&receipt.payment.cninvoice&&receipt.payment.cninvoice.cninvoice">{{receipt.payment.cninvoice.cninvoice}}</p>  
                        </div>

                        

                         <div class=" sm:w-auto " v-if="receipt&&receipt.payment&&receipt.payment.date">
                            <p class="font-size font-medium text-gray-700" ><b>Date & Time:</b></p>
                                 <!-- <p class="font-size text-gray-700 text-justify">{{dayjs(receipt.payment.date).format("YYYY-MM-DD h:mm:ss")}}</p> -->
                                 <p class="font-size text-gray-700 text-justify">{{dayjs(receipt.payment.date).format("DD-MMM-YY hh:mm A")}}</p>
                                 

                            
                        </div>

                        <div class=" sm:w-auto " v-if="receipt&&receipt.branch">
                            <p class="font-size font-medium text-gray-700"><b>Place of supply:</b></p>
                            <p class="font-size text-gray-700 text-justify">{{receipt.branch.details.place_of_supply}}</p>
                            
                        </div>

                        <div class=" sm:w-auto "  v-if="receipt&&receipt.branch&&receipt.branch.details&&receipt.branch.details.state&&receipt.branch.details.state.details">
                            <p class="font-size font-medium text-gray-700"><b>State Code:</b></p><p class="font-size text-gray-700 text-justify">{{receipt.branch.details.state.details.state_code}}</p>
                        </div>

                        <div class="w-auto" v-if="receipt&&receipt.branch">
                            <p class="font-size font-medium text-gray-700"><b>State:</b></p><p class="font-size text-gray-700 text-justify">{{receipt.branch.details.state.name}}</p>
                        </div>

                    </div>


                     <div class="justify-between gap-6 leading-3 pb-2 flex overflow-x-auto">
                        <div class=" sm:w-auto " v-if="receipt&&receipt.branch">
                            <p class="font-size font-medium text-gray-700 text-justify"><b>Description of</b></p>
                            <p class="font-size text-gray-700 text-justify"><b>Service:</b> {{receipt.branch.details.description_of_service}}</p>
                            
                        </div>

                        <div class=" sm:w-auto " v-if="receipt&&receipt.branch">
                            <p class="font-size font-medium text-gray-700"><b>SAC:</b></p> <p class="font-size text-gray-700 text-justify">{{receipt.branch.details.sac}}</p>
                        </div>

                         <div class=" sm:w-auto " v-if="receipt&&receipt.payment">
                            <p class="font-size font-medium text-gray-700 text-justify"><b>Fees Amount:</b></p>
                            <p class="font-size text-gray-700 text-justify">{{receipt.payment.actualamount}}</p>
                            
                        </div>

                       <div class=" sm:w-auto " v-if="receipt&&receipt.payment">
                            <!-- <p class="font-size font-medium text-gray-700">{{receipt.payment.gst[0].name}}{{"@"}}{{receipt.payment.gst[0].value}}{{"%"}}{{"="}}{{receipt.payment.gst[0].amount}}{{receipt.payment.gst[1].name}}{{"@"}}{{receipt.payment.gst[1].value}}{{"%"}}{{"="}}{{receipt.payment.gst[1].amount}}</p> -->                           
                            <p v-for="gst in receipt.payment.gst" :key="gst.id" class="font-size font-medium text-gray-700">
                                {{gst.name}}
                                {{"@"}}
                                {{gst.value}}
                                {{"%"}}{{"="}}
                                {{gst.amount}}
                            </p>
                        </div> 


                        <div class=" sm:w-auto " v-if="receipt&&receipt.payment">
                            <p class="font-size font-medium text-gray-700 text-justify"><b>Total Amount:</b></p>
                            <p class="font-size text-gray-700 text-justify">{{receipt.payment.amount}}</p>
                            
                        </div>

                        <div class="sm:w-auto" v-if="receipt&&receipt.branch">
                        <p class="font-size font-medium text-gray-700"><b>Reverse charge -</b> </p><p class="font-size text-gray-700 text-justify">{{receipt.branch.details.reverse_charge}}</p>
                    </div>

                         <!-- <div class="w-auto" v-if="receipt&&receipt.branch">
                            <p class="font-size font-medium text-gray-700 text-justify"><b>Location of training:</b></p>
                            <p class="font-size text-gray-700 text-justify">{{receipt.branch.details.location_of_training}}</p>
                            
                    </div> -->
                    </div> 

                <div class="flex justify-between leading-3">
                    <div class="w-auto " v-if="receipt&&receipt.course">
                            <p class="font-size font-medium text-gray-700 text-justify"><b>Course Name:</b></p>
                            <p v-if="receipt.course.displayname" class="font-size text-gray-700 text-justify">{{receipt.course.displayname}}</p>
                            <p v-else class="font-size text-gray-700 text-justify">{{receipt.course.name}}</p>
                        </div>

                    <!-- <div class="" v-if="receipt&&receipt.branch">
                        <p class="font-size font-medium text-gray-700"><b>Reverse charge -</b> </p><p class="font-size text-gray-700 text-justify">{{receipt.branch.details.reverse_charge}}</p>
                    </div> -->

                   
                    <div class="" v-if="receipt&&receipt.branch">
                        <p class="font-size font-medium text-gray-700"><b>Location of training -</b> </p><p class="font-size text-gray-700 text-justify">{{receipt.branch.details.location_of_training}}</p>
                    </div>

                    <div class="" v-if="receipt&&receipt.branch">
                    </div>

                    <div class="" v-if="receipt&&receipt.branch">
                    </div>

                    <div class="" v-if="receipt&&receipt.branch">
                    </div>

                    <div class="" v-if="receipt&&receipt.branch">
                        <!-- <p class="font-size font-medium text-gray-700"><b>Reverse charge -</b> </p><p class="font-size text-gray-700 text-justify">{{receipt.branch.details.reverse_charge}}</p> -->
                    </div>
                    <!-- <div class="" v-if="receipt&&receipt.course">
                        <p class="font-size font-medium text-gray-700"><b>Course-</b> </p><p class="font-size text-gray-700 text-justify">{{receipt.course.name}}</p>
                    </div> -->
                </div>

                    <div class="" v-if="receipt&&receipt.student">
                        <p class="font-size font-medium text-gray-700">Received as <span class="font-bold">{{receipt.payment.type}}</span> From Mr./Ms.<b>
                                {{receipt.student.name}}</b></p>   <!--Cash/Card/Cheque/Online-->
                    </div>


                    <div class="flex justify-between pb-1">
                        <!-- <div v-if="receipt&&receipt.branch" class="w-1/2">
                            <p class="font-size font-medium text-gray-700 text-justify leading-4">
                                <b>Address:</b> 
                            </p>
                            <p class="font-size text-gray-700 text-justify leading-3">
                                {{receipt.branch.details.address}}{{","}}{{receipt.branch.details.state.name}}{{","}}{{receipt.branch.details.district.name}}{{","}}{{receipt.branch.details.city.name}}
                            </p>                            
                        </div>  -->

                       <div v-if="receipt&&receipt.student" class="sm:ml-12 ml-0 sm:pt-0">
                            <!-- <p class="font-size font-medium text-gray-700"><b>Contact Number:</b></p><p class="font-size text-gray-700 text-justify">{{user.user.contact[0].contact}}</p> -->
                            <p class="font-size font-medium text-gray-700 leading-3"><b>Contact Number:</b></p><p class="font-size text-gray-700 text-justify">{{receipt.student.contact[0].number}}</p>

                        </div> 

                    </div> 

                </div>

                <div class="flex pt-1 border-b-2 border-solid border-black pb-1 justify-between">
                    <div>
                        <h5 class="text-black font-size leading-3"><b>Instructions:</b></h5>
                        <ul class="list-disc pl-5">
                            <li class=" text-gray-700 font-size leading-[10px]">This receipt is valid for 6 months</li>
                            <li class="font-size  text-gray-700 leading-[10px]">Please keep the receipt safe till completion of the course</li>
                            <li class="font-size  text-gray-700 leading-[10px]">In case of cheque bounce,extra bounce charges RS.365/- will be charged</li>
                            <li class="font-size  text-gray-700 leading-[10px]">The receipt is not transferable</li>
                            <li class="font-size  text-gray-700 leading-[10px]">Fees is charged only for training not for placement activities</li>
                            <li class="font-size  text-gray-700 leading-[10px]">Fees paid will not be refundable if student quits the course before completion</li>
                            <li class="font-size  text-gray-700 leading-[10px]">By accepting the receipt you accept all the terms & conditions</li>
                        </ul>
                        <!-- <h5 class="text-black font-size pt-1" v-if="receipt&&receipt.branch"><b>Head Office:</b>{{receipt.branch.details.head_office}}</h5> -->

                    </div>

                    <div class="pt-3 sm:pt-8">
                        <h2 class="text-black font-size pb-3" v-if="receipt&&receipt.branch"><b> {{receipt.branch.details.paying_for}}</b></h2>
                        <h5 class="text-black font-size leading-3"><b>This is a computer-generated Invoice. No signature is <h5>
                                    required. </h5></b></h5>
                    </div>
                </div>

            </div>
        </div>
    </div>
      </div>              

       <jb-buttons>
        <jb-button
          label="Print"
          color="warning"
          onafterprint="printed()"
          @click="printReceipt('add_to_me')"
        />          
      </jb-buttons>

  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { useRouter,useRoute } from "vue-router";
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import { themeStore } from "../stores/theme"
import { sessionStore } from "../stores/session";
import { studentStore } from "../stores/student";
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs';
dayjs.extend(utc)
dayjs.extend(timezone)
const theme = themeStore();
const route = useRoute();
const router = useRouter();
const user = sessionStore();
const student = studentStore()

const pageLoading = ref(false)
const receipt = computed(() => student.receipt_data.invoice)

onBeforeMount(async () => {
  pageLoading.value = true
  await user.checkUser();
  if (!user.loggedIn) {
    router.push("/login");
  }
  else{
    await user.getvalidations();
    if (user.validation_status===200){
        if(user.validation.studentcourse===false){
        router.push("/pay_directly")
        }
        await student.getReceiptdata(route.params.paymentid)
    }
    else{
        await user.logout()
        router.go()

    }
  }
  pageLoading.value = false
});

const printed = async() =>{

  window.close()
}


const printReceipt = async() =>{
    
  const prtHtml = document.getElementById('add_to_me').innerHTML;

let stylesHtml = '';
for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
  stylesHtml += node.outerHTML;
}
  const WinPrint = window.open("");
  
    WinPrint.document.write(`<!DOCTYPE html>
    <html>
      <head>
        ${stylesHtml}
      </head>
      <body>
        ${prtHtml}
      </body>
    </html>`);

    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print(); 
    WinPrint.onafterprint = window.close;
    WinPrint.close();
  
}

</script>

<style scoped>
  /* @import "@/css/_print.css" */
  .font-size{
      font-size: 10px;
  }
</style>



