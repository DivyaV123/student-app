<script setup>
//import { useStore } from 'vuex'
import { ref, reactive, computed } from 'vue'
import { buttonMenuOptions } from '@/button-menu-sample-options.js'
import { mdiDotsVertical } from '@mdi/js'
import CardComponent from '@/components/CardComponent.vue'
import Level from '@/components/Level.vue'
import Pill from '@/components/Pill.vue'
// import UserAvatar from '@/components/UserAvatar.vue'
import ButtonMenu from '@/components/ButtonMenu.vue'
import { themeStore } from "../stores/theme"
const theme = themeStore();

const props = defineProps({
  product: {
    type: Object,
    required: true,
    // validate: value => (value.name && value.date && value.adjective && value.material && value.price)
  }
})
// console.log("product",props.product)
const previous_company_name = reactive([]);
const previous_company_name_data = ref("");
if (props.product.subject) {
        for (var i = 0; i < props.product.subject.length; i++) {
          previous_company_name.push(props.product.subject[i].name)
          previous_company_name_data.value = JSON.stringify(previous_company_name).replace(/[\[\]']+/g, '').replaceAll("\"", "")
        }
      }

const darkMode = computed(() => theme.darkMode)
</script>

<template>
  <card-component class="mb-2 last:mb-0" hoverable>
    <level>
      <level type="justify-start">
        <!-- <user-avatar class="w-12 h-12 md:mr-6" api="api/bottts" bg :username="product.name" /> -->
        <div class="text-center md:text-left">
          <h4 class="text-md font-bold uppercase">{{ props.product.displayname }}</h4><hr>
          <h4 class="text-green-300 capitalize font-normal pt-2">
            <pill type="gray" :text="props.product.branch.name" small />
                 <pill type="success" :text="props.product.mode_of_class.name" small />
          <pill type="light" :text="props.product.class_timings.name" small />
          </h4>
         
          <div class="flex items-center flex-wrap pr-2 ">
             <h4 class="pt-1 font-bold pr-2 text-green-300">{{"Subjects"}}</h4>
          <small v-for="client in props.product.subject" class=" text-gray-500 dark:text-gray-300 font-normal text-sm capitalize box-border p-1 border-2 border-gray-700 ">
           {{client.displayname}}
          </small>
          </div>
           <div >
         <pill type="help" :text="'Fees One Shot:'+props.product.amount_one_shot" small />
          <pill type="help" :text="'Fees Partial:'+(props.product.installment_Amount1+props.product.installment_Amount2)" small />
        </div>
          
        
        
        </div>
      </level>

      <level type="justify-end">
        <div >
         
        </div>
        <!-- <h4 class="text-xl md:mr-6">${{ product.installment_Amount1+product.installment_Amount2 }}</h4> -->
        <!-- <button-menu
          :options="buttonMenuOptions"
          :icon="mdiDotsVertical"
          :outline="darkMode"
          small
        /> -->
      </level>
    </level>
  </card-component>
</template>
