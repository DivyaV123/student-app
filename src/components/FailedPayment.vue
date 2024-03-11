<template>
<div v-if="itemsCount!=0">
  <table class="">
        <thead class="sticky top-[55px] z-[9] bg-gray-900">
      <tr>
        <th>Course</th>
        <th>Amount</th>
        <th>Payment Method</th>
        <th>Error Code</th> 
        <th>Error Description</th>
        <th>Error Source</th> 
        <th>Error Step</th>
        <th>Error Reason</th> 
      </tr>
    </thead>
    <tbody>
    
    <tr
        v-for="(data, index) in itemsPaginated"
        :key="data.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']" 
    >
    
        <td data-label="Course">
          <small>
            <jb-button
                :label="data.course[0].name"
                color="info"
                small
                />  
          </small>
        </td>

        <td data-label="Amount">
          <small>
            <jb-button
                :label="data.amount"
                color="light"
                small
                /> 
          </small>
        </td>

        <td data-label="Payment Method">
          <small>
            {{data.method}}  
          </small>
        </td>

        <td data-label="Error Code">
          <small>
          {{ data.error_code }}
          </small>
        </td>

        <td data-label="Error Description">
          <small>
            <span class="text-red-500">{{data.error_description}} </span> 
          </small>
        </td>

        <td data-label="Error Source">
          <small>
          {{ data.error_source }}
          </small>
        </td>

        <td data-label="Error Step">
          <small>
            {{data.error_step}}  
          </small>
        </td>

        <td data-label="Error Reason">
          <small>
           {{ data.error_reason }}
          </small>
        </td>

      </tr>
    </tbody>
  </table>
  </div>

  <div v-else class="font-semibold text-red-500 text-xl text-center mt-5">
      No Failed Payments
  </div>

  <div
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
  </div>

</template>


<script setup>
import { computed, ref,onBeforeMount} from 'vue'
import { mdiPhone,mdiAccount } from '@mdi/js'
import { useRouter,useRoute } from "vue-router";
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import Icon from '@/components/Icon.vue'
import { themeStore } from "../stores/theme"
import { sessionStore } from "../stores/session";
import { getdata } from "../stores/user"
import { studentStore } from "../stores/student"

const code = getdata()
const stud = studentStore();

const route = useRoute();
const user = sessionStore();
const theme = themeStore();

const perPage = 25;

const itemsPaginated = computed(() => stud.failed)
const itemsCount = computed(() => stud.failedcount)

onBeforeMount(async () => {
  stud.getFailedpayment(currentPage.value);
});

const lightBorderStyle = computed(() => theme.lightBorderStyle)

const lightBgStyle = computed(() => theme.lightBgStyle)

const tableTrStyle = computed(() => theme.tableTrStyle)

const tableTrOddStyle = computed(() => theme.tableTrOddStyle)

const darkMode = computed(() => theme.darkMode)

const currentPage = ref(1)

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
  stud.getFailedpayment(page);   
}
</script>



