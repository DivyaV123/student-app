<script setup>
import { computed, ref, onBeforeMount, reactive } from 'vue'
import {
  mdiForwardburger,
  mdiBackburger,
  mdiClose,
  mdiDotsVertical,
  mdiMenu,
  mdiBookArrowRight,
  mdiBookEducationOutline,
  mdiAccountBox,
  mdiLockAlertOutline,
  mdiQrcode,
  mdiLogoutVariant,
  mdiPlaylistPlus,
  mdiAccountMultiplePlusOutline,
  mdiTable,
  mdiCashMultiple,
  mdiFileChart,
  mdiAccountCircle,
  mdiCurrencyUsd,
  mdiPhone,
  mdiEmail,
  mdiAccountQuestion,
  mdiSchool,
  mdiChat,
  mdiAccountGroup 
} from '@mdi/js'
import AddPay from '@/components/AddPay.vue';
// import { useStorage } from "vue3-storage";
import NavBarItem from '@/components/NavBarItem.vue'
import NavBarItemLabel from '@/components/NavBarItemLabel.vue'
import NavBarMenu from '@/components/NavBarMenu.vue'
import Divider from '@/components/Divider.vue'
// import UserAvatar from '@/components/UserAvatar.vue'
import Icon from '@/components/Icon.vue'
import NavBarSearch from '@/components/NavBarSearch.vue'
import { themeStore } from "../stores/theme"
import { sessionStore } from "../stores/session";
// import { notify } from "@kyvg/vue3-notification";
import { useRouter } from "vue-router";
import Logout from '@/components/Logout.vue'
import Changepass from '@/components/Changepass.vue'
import Viewhelp from '@/components/Viewhelp.vue'
import Addcontact from '@/components/Addcontact.vue'
import Emailadd from '@/components/Emailadd.vue'
import Qrcode from '@/components/Qrcode.vue'
import AsideRight from '@/components/AsideRight.vue'
import Tip from '@/components/Tip.vue';
import JbButton from "@/components/JbButton.vue";
import JbButtons from "@/components/JbButtons.vue";
const theme = themeStore();
const user = sessionStore();
const router = useRouter();
const fresher_exper = ref("");
// const ls = useStorage();
const other_value = ref(null)
const logout = ref(false);


const redirect = async () => {
  await user.checkonlines();
  if (online.value === true) {
    isMenuNavBarActive.value = !isMenuNavBarActive.value
    if (user.validation.studentcourse === false) {
      if (isTauri) {
        await router.push({ path: '/pay_directly' })
        router.go()
      }
      else {
        router.push("/pay_directly")
        // await router.push({ path: '/pay_directly' })
        // router.go()
      }
    }
    else if (user.validation.studentcourse === true && user.validation.studentbatch === false) {
      if (isTauri) {
        await router.push({ path: '/add_regcode' })
        router.go()
      }
      else {
        // await router.push({ path: '/add_regcode' })
        // router.go()
        router.push("/add_regcode")
      }

    }
    else {
      if (isTauri) {
        await router.push({ path: '/profile' })
        router.go()
      } else {
        router.push("/profile")
        // await router.push({ path: '/profile' })
        // router.go()
      }

    }
  }
  else {
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  }
}
const changepass = ref(false)
const enablecontact = ref(false)
const enableemail = ref(false)
const scanclass = ref(false)
const redirect1 = async () => {
  await user.checkonlines();
  if (online.value === true) {
    isMenuNavBarActive.value = !isMenuNavBarActive.value
    if (isTauri) {
      await router.push({ path: '/view_profile' })
      router.go()
    }
    else {
      router.push("/view_profile")
      // await router.push({ path: '/view_profile' })
      // router.go()
    }

  }
  else {
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  }
}

const redirect2 = async () => {
  await user.checkonlines();
  if (online.value === true) {
    changepass.value = true
  }
  else {
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  }
}

const redirect3 = () => {
  enablecontact.value = true
}

const redirect4 = () => {
  isMenuNavBarActive.value = !isMenuNavBarActive.value
  enableemail.value = true
}

const redirect5 = async () => {
  await user.checkonlines();
  if (online.value === true) {
    await user.getstudent();
    if (user.validation.studentcourse === false) {
      if (isTauri) {
        await router.push({ path: '/pay_directly' })
        router.go()
      }
      else {
        router.push("/pay_directly")
        // await router.push({ path: '/pay_directly' })
        // router.go()
      }

      isMenuNavBarActive.value = !isMenuNavBarActive.value
    }
    else if (user.validation.studentcourse === true && user.validation.studentbatch === false) {
      if (isTauri) {
        await router.push({ path: '/add_regcode' })
        router.go()
      }
      else {
        router.push("/add_regcode")
        // await router.push({ path: '/add_regcode' })
        // router.go()
      }
      // router.push("/add_regcode")
      isMenuNavBarActive.value = !isMenuNavBarActive.value
    }
    else if (other_datas.value === null) {
      // router.push("/profile")
      if (isTauri) {
        await router.push({ path: '/profile' })
        router.go()
      }
      else {
        router.push("/profile")
        // await router.push({ path: '/profile' })
        // router.go()
      }
      isMenuNavBarActive.value = !isMenuNavBarActive.value
    }
    else if (!image_datas.value) {
      theme.pushMessage("You have not added your profile picture..please do add it")
      if (isTauri) {
        await router.push({ path: '/view_profile' })
        router.go()
      }
      else {
        router.push("/view_profile")
        // await router.push({ path: '/view_profile' })
        // router.go()
      }
      // router.push("/view_profile")
      isMenuNavBarActive.value = !isMenuNavBarActive.value
    }
    else if (user.validation && user.validation.fresherexp && user.validation.fresherexp.name === 'experienced' && user.validation.experience === false) {
      theme.pushMessage("You have not added Experience form..please do add it for better Placements!!")
      scanclass.value = true
    }
    else {
      scanclass.value = true
    }
  }
  else {
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  }
}
const redirect6 = () => {
  isMenuNavBarActive.value = !isMenuNavBarActive.value
  if (user.validation.studentcourse === false) {
    router.push("/pay_directly")
  }
  else if (user.validation.studentcourse === true && user.validation.studentbatch === false) {
    router.push("/add_regcode")
  }
  else if (other_datas.value === null) {
    router.push("/profile")
  }
  else {
    router.push("/")
  }
}

const redirect7 = async () => {
  await user.checkonlines();
  if (online.value === true) {
    isMenuNavBarActive.value = !isMenuNavBarActive.value
    if (user.validation.studentcourse === false) {
      if (isTauri) {
        await router.push({ path: '/pay_directly' })
        router.go()
      }
      else {
        router.push("/pay_directly")
        // await router.push({ path: '/pay_directly' })
        // router.go()
      }

    }
    else if (user.validation.studentcourse === true && user.validation.studentbatch === false) {
      if (isTauri) {
        await router.push({ path: '/add_regcode' })
        router.go()
      }
      else {
        router.push("/add_regcode")
        // await router.push({ path: '/add_regcode' })
        // router.go()
      }

    }
    else {
      if (isTauri) {
        await router.push({ path: '/add_batch' })
        router.go()
      }
      else {
        router.push("/add_batch")
        // await router.push({ path: '/add_batch' })
        // router.go()
      }

    }
  }
  else {
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  }
}


const addrequirements = async () => {
  await user.checkonlines();
  if (online.value === true) {
    isMenuNavBarActive.value = !isMenuNavBarActive.value
    if (user.validation.studentcourse === false) {
      if (isTauri) {
        await router.push({ path: '/pay_directly' })
        router.go()
        // router.push("/paymentcourselist")
      }
      else {
        router.push("/pay_directly")
        // await router.push({ path: '/pay_directly' })
        // router.go()
      }

    }
    else if (user.validation.studentcourse === true && user.validation.studentbatch === false) {
      if (isTauri) {
        await router.push({ path: '/add_regcode' })
        router.go()
        // router.push("/paymentcourselist")
      }
      else {
        router.push("/add_regcode")
        // await router.push({ path: '/add_regcode' })
        // router.go()
      }
      // router.push("/add_regcode")
    }
    else {
      if (isTauri) {
        await router.push({ path: '/requirements' })
        router.go()
        // router.push("/paymentcourselist")
      }
      else {
        router.push("/requirements")
        // await router.push({ path: '/requirements' })
        // router.go()
      }
      // router.push("/requirements")
    }
  }
  else {
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  }
}

const redirect8 = async () => {
  await user.checkonlines();
  if (online.value === true) {
    user.getstudent();
    isMenuNavBarActive.value = !isMenuNavBarActive.value
    if (user.validation.studentcourse === false) {
      if (isTauri) {
        await router.push({ path: '/pay_directly' })
        router.go()
        // router.push("/paymentcourselist")
      }
      else {
        router.push("/pay_directly")
        // await router.push({ path: '/pay_directly' })
        // router.go()
      }
      // router.push("/pay_directly")
    }
    else if (user.validation.studentcourse === true && user.validation.studentbatch === false) {
      // router.push("/add_regcode")
      if (isTauri) {
        await router.push({ path: '/add_regcode' })
        router.go()
        // router.push("/paymentcourselist")
      }
      else {
        router.push("/add_regcode")
        // await router.push({ path: '/add_regcode' })
        // router.go()
      }
    }
    else if (other_datas.value === null) {
      // router.push("/profile")
      if (isTauri) {
        await router.push({ path: '/profile' })
        router.go()
        // router.push("/paymentcourselist")
      }
      else {
        router.push("/profile")
        // await router.push({ path: '/profile' })
        // router.go()
      }
    }
    else {
      // router.push("/referfriend")
      if (isTauri) {
        await router.push({ path: '/referfriend' })
        router.go()
        // router.push("/paymentcourselist")
      }
      else {
        router.push("/referfriend")
        // await router.push({ path: '/referfriend' })
        // router.go()
      }
    }
  }
  else {
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  }
}

const redirect9 = async () => {
  await user.checkonlines();
  if (online.value === true) {
    user.getstudent();
    isMenuNavBarActive.value = !isMenuNavBarActive.value
    if (user.validation.studentcourse === false) {
      if (isTauri) {
        await router.push({ path: '/pay_directly' })
        router.go()
        // router.push("/paymentcourselist")
      }
      else {
        router.push("/pay_directly")
        // await router.push({ path: '/pay_directly' })
        // router.go()
      }
      // router.push("/pay_directly")
    }
    else if (user.validation.studentcourse === true && user.validation.studentbatch === false) {
      // router.push("/add_regcode")
      if (isTauri) {
        await router.push({ path: '/add_regcode' })
        router.go()
        // router.push("/paymentcourselist")
      }
      else {
        router.push("/add_regcode")
        // await router.push({ path: '/add_regcode' })
        // router.go()
      }
    }
    else if (other_datas.value === null) {
      // router.push("/profile")
      if (isTauri) {
        await router.push({ path: '/profile' })
        router.go()
        // router.push("/paymentcourselist")
      }
      else {
        router.push("/profile")
        // await router.push({ path: '/profile' })
        // router.go()
      }
    }
    else {
      // router.push("/referrallist")
      if (isTauri) {
        await router.push({ path: '/referrallist' })
        router.go()
        // router.push("/paymentcourselist")
      }
      else {
        router.push("/referrallist")
        // await router.push({ path: '/referrallist' })
        // router.go()
      }
    }
  }
  else {
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  }
}
const isTauri = window.__TAURI__;
const redirect99 = async () => {

  user.getstudent();
  isMenuNavBarActive.value = !isMenuNavBarActive.value
  if (user.validation.studentcourse === false) {
    // router.push("/pay_directly")
    if (isTauri) {
      await router.push({ path: '/pay_directly' })
      router.go()
      // router.push("/paymentcourselist")
    }
    else {
      router.push("/pay_directly")
      // await router.push({ path: '/pay_directly' })
      // router.go()
    }

  }
  else if (user.validation.studentcourse === true && user.validation.studentbatch === false) {
    // router.push("/add_regcode")
    if (isTauri) {
      await router.push({ path: '/add_regcode' })
      router.go()
      // router.push("/paymentcourselist")
    }
    else {
      router.push("/add_regcode")
      // await router.push({ path: '/add_regcode' })
      // router.go()
    }
  }
  else if (other_datas.value === null) {
    // router.push("/profile")
    if (isTauri) {
      await router.push({ path: '/profile' })
      router.go()
      // router.push("/paymentcourselist")
    }
    else {
      router.push("/profile")
      // await router.push({ path: '/profile' })
      // router.go()
    }
  }
  else {
    // router.push("/closed_batch")
    if (isTauri) {
      await router.push({ path: '/closed_batch' })
      router.go()
      // router.push("/paymentcourselist")
    }
    else {
      router.push("/closed_batch")
      // await router.push({ path: '/closed_batch' })
      // router.go()
    }
  }

}

const redirect10 = async () => {
  await user.checkonlines();
  if (online.value === true) {
    isMenuNavBarActive.value = !isMenuNavBarActive.value
    if (user.validation.studentcourse === false) {
      // router.push("/pay_directly")
      if (isTauri) {
        await router.push({ path: '/pay_directly' })
        router.go()
        // router.push("/paymentcourselist")
      }
      else {
        router.push("/pay_directly")
        // await router.push({ path: '/pay_directly' })
        // router.go()
      }
    }
    else {
      if (isTauri) {
        await router.push({ path: '/paymentcourselist' })
        router.go()
        // router.push("/paymentcourselist")
      }
      else {
        router.push("/paymentcourselist")
        // await router.push({ path: '/paymentcourselist' })
        // router.go()
      }
      // router.push("/paymentcourselist")
    }
  }
  else {
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  }

}

const redirect11 = async () => {
  await user.checkonlines();
  if (online.value === true) {
    isMenuNavBarActive.value = !isMenuNavBarActive.value
    // router.push("/paymentcourselist")
    if (isTauri) {
      await router.push({ path: '/paymentcourselist' })
      router.go()
      // router.push("/paymentcourselist")
    }
    else {
      router.push("/paymentcourselist")
      // await router.push({ path: '/paymentcourselist' })
      // router.go()
    }
  }
  else {
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  }
}

const clickLink = async (data1, data2) => {
  // router.push({path: "/",
  //     reload: true})
  if (isTauri) {
    await router.push({ path: '/' })
    router.go()
  }
  else {
    router.push("/")
    // await router.push({ path: '/' })
    // router.go()
  }
  // location.reload()
  // window.open( `/` );
}

const testfreshers = async (data1, data2) => {
  window.open("https://testquiz.qspiders.com/?application=qenquiry", "_blank");

}
// https://testfreshers.qspiders.com
const qtalk = async (data1, data2) => {
  window.open("https://chat.qspiders.com/?application=qenquiry", "_blank");

}

const hr = async (data1, data2) => {
  window.open("https://testhrtrainer.qspiders.com/grooming-list/?application=qenquiry", "_blank");

}





const redirect12 = async () => {
  await user.checkonlines();
  if (online.value === true) {
    // isMenuNavBarActive.value = !isMenuNavBarActive.value
    enablecontact.value = true
  }
  else {
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  }
}

const redirect13 = async () => {
  await user.checkonlines();
  if (online.value === true) {
    // isMenuNavBarActive.value = !isMenuNavBarActive.value
    enableemail.value = true
  }
  else {
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  }
}


const profileTipOn = ref(false)
const viewprofileTipOn = ref(false)
const passwordTip = ref(false)
const mobileTip = ref(false)
const emailTip = ref(false)
const notifyTip = ref(false)
const scanTip = ref(false)
const online = computed(() => user.isonline);

const isAsideRightActive = computed(() => theme.isAsideRightActive)

const isNavBarVisible = computed(() => !theme.isFormScreen)

const isAsideMobileExpanded = computed(() => theme.isAsideMobileExpanded)

const isAsideCompact = computed(() => theme.isAsideCompact)

const isAsideHiddenLayout = computed(() => theme.isAsideHiddenLayout)
const studentbatches = computed(() => user.student_batches)
const other_datas = computed(() => user.other_data)
const image_datas = computed(() => user.studentimages)
const userName = computed(() => {
  if (user.studentname) {
    return user.studentname
  }

})


const paycourse = computed(() => user.validation)
const paycourse1 = computed(() => user.studentcoursebool)
const menuToggleMobileIcon = computed(() => isAsideMobileExpanded.value ? mdiBackburger : mdiForwardburger)

const menuToggleMobile = () => theme.asideMobileToggle()

const menuToggleIcon = computed(() => {
  if (isAsideHiddenLayout.value) {
    return mdiMenu
  }

  return isAsideCompact.value ? mdiForwardburger : mdiBackburger
})

const menuToggle = () => {
  if (isAsideHiddenLayout.value) {
    theme.asideVisibilityToggle()
  }
  else {
    theme.asideCompactToggle()
  }
}

const asideRightToggle = () => {
  asideactive.value = true
  theme.asideRightToggle()
}
const pageTitle = computed(() => theme.pageTitle)

const isMenuNavBarActive = ref(false)

const menuNavBarToggleIcon = computed(() => isMenuNavBarActive.value ? mdiClose : mdiDotsVertical)

const menuNavBarToggle = () => {
  isMenuNavBarActive.value = !isMenuNavBarActive.value

}

const updatesClicked = ref(false)
const asideactive = ref(false)

const updatesUpdateMark = computed(() => !updatesClicked.value && theme.updatesStatus ? 'warning' : null)

const toggleLightDark = () => {
  theme.darkModeTrigger()
}
const addpayModalActive = ref(false)

const addpay = async (data) => {
  await user.checkonlines();
  if (online.value === true) {
    addpayModalActive.value = true
  }
  else {
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  }
}
const helpviews = ref(false)

const viewhelp = async (data) => {
  helpviews.value = true

}

const addpay1 = async (data) => {
  isMenuNavBarActive.value = !isMenuNavBarActive.value
  await user.checkonlines();
  if (online.value === true) {
    if (isTauri) {
      await router.push({ path: '/paymentcourselist' })
      router.go()
      // router.push("/paymentcourselist")
    }
    else {
      router.push("/paymentcourselist")
      // await router.push({ path: '/paymentcourselist' })
      // router.go()
    }
  }
  else {
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  }
}

const apm = reactive({
  partial_balance: null,
  oneshot_balance: null,
  id: null,
  branch: {
    branchid: null,
    branchname: null
  },
});

onBeforeMount(async () => {
  await user.checkUser();
  if (isTauri) {
    document.addEventListener("contextmenu", (event) => event.preventDefault());
  }
  if (user.$state.loggedIn == true) {
    await user.checkonlines();
    if (online.value === true) {
      await user.getstudent();
      await user.getvalidations();
    }
    else {
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
  }
  else {
    "Nothing"
  }
  // console.log("user.validation in devstudent")

  if (user.student_course && user.student_course[0]) {

    apm.partial_balance = user.student_course[0].partial_balance
    apm.oneshot_balance = user.student_course[0].oneshot_balance
    apm.id = user.student_course[0].id
    apm.branch.branchid = user.student_course[0].branch.branchid
    apm.branch.branchname = user.student_course[0].branch.branchname
  }

});
</script>

<template>
  <nav v-show="isNavBarVisible" id="nav"
    class="top-0 left-0 right-0 fixed flex lg:h-[54px] xl:h-[58px] h-[53px] border-b border-gray-100 z-30 w-screen transition-position lg:transition-none lg:w-auto lg:items-stretch dark:bg-gray-900 dark:border-gray-800 bg-gray-900">
    <add-pay v-if="addpayModalActive == true" v-model="addpayModalActive" :apm="apm">
    </add-pay>
    <logout v-model="logout" large-title="Logout" button="danger" has-cancel />
    <!-- <div class="flex-1 items-stretch flex h-14">
      <nav-bar-item type="flex lg:hidden" p-x="pl-3 pr-0" @click.prevent="menuToggleMobile">
        <icon :path="menuToggleMobileIcon" size="24" />
      </nav-bar-item>
      <nav-bar-item type="hidden lg:flex" p-x="pl-3 pr-0" @click.prevent="menuToggle">
        <icon :path="menuToggleIcon" size="24" />
      </nav-bar-item>
    
    </div> -->
    <div class="flex-none items-stretch flex h-14 lg:hidden">

      <!-- <nav-bar-item :active="isAsideRightActive" @click="asideRightToggle">
        <icon :path="mdiBell" :update-mark="updatesUpdateMark" size="20" />
      </nav-bar-item> -->
      <nav-bar-item @click.prevent="menuNavBarToggle">
        <icon :path="menuNavBarToggleIcon" size="20" />
      </nav-bar-item>

    </div>

    <div class="flex-none items-stretch flex h-auto w-50 p-2 border border-gray-800">
      <nav-bar-item type="flex lg:flex" @click="clickLink">
        <span class="font-bold text-xl text-orange-500">Student</span>
        <label for="label" class="text-xs font-bold"></label>
      </nav-bar-item>
    </div>
    <nav-bar-item type="flex" class="pl-2 font-semibold">
      <icon :path="mdiBookArrowRight" size="20" class="text-gray-200" />&nbsp;<span class="text-gray-200">{{ pageTitle
      }}</span>
    </nav-bar-item>
    <AsideRight v-if="asideactive === true" />
    <div
      class="absolute w-screen top-14 left-0 bg-black shadow lg:w-auto lg:items-stretch lg:flex lg:grow lg:static lg:border-b-0 lg:overflow-visible lg:shadow-none dark:bg-gray-900"
      :class="{ 'hidden': !isMenuNavBarActive, 'block': isMenuNavBarActive }">
      <div class="max-h-screen-menu lg:overflow-visible lg:flex lg:items-stretch lg:justify-end lg:ml-auto bg-gray-900">


        <div
          class="relative flex lg:flex-col items-center group border border-gray-800 lg:justify-center sm:justify-start z-40 box-border p-1 lg:p-1 w-50 ">
          <nav-bar-item desktop-icon-only @click="addpay1()" v-if="paycourse1 === true">
            <nav-bar-item-label :icon="mdiFileChart" desktop-icon-only />
          </nav-bar-item>
          <nav-bar-item desktop-icon-only v-else @click="addpay()">
            <nav-bar-item-label :icon="mdiFileChart" desktop-icon-only />
          </nav-bar-item>
          <label v-if="paycourse1 === true" for="label" class="text-xs font-bold" @click="redirect11">{{ "Pay" }}</label>

          <label v-else for="label" class="text-xs font-bold" @click="addpay()">{{ "Pay" }}</label>
          <!-- <jb-buttons v-if="paycourse&&paycourse.length >=1">
            <jb-button
              label="Pay"
              type="addpay1"
              class="font-bold text-xs  lg:w-full sm:w-full bg-orange-500 border border-orange-500 text-white hover:bg-orange-500"
              small
              :icon="mdiCurrencyUsd" 
              @click="addpay1"
            />
          </jb-buttons>
          <jb-buttons v-else>
            <jb-button
              label="Pay"
              type="addpay"
              class="font-bold text-xs  lg:w-full sm:w-full bg-orange-500 border border-orange-500 text-white hover:bg-orange-500"
              small
              :icon="mdiCurrencyUsd" 
              @click="addpay"
            />
          </jb-buttons> -->
        </div>


        <div
          v-if="((user.validation && user.validation.fresherexp && user.validation.fresherexp.name === 'fresher' && user.other_data === null) || (user.validation && user.validation.fresherexp && user.validation.fresherexp.name === 'experienced' && (user.other_data === null || user.validation.experience === false)))"
          class="relative flex lg:flex-col items-center group lg:justify-center sm:justify-start z-40 box-border p-1 lg:p-1 w-50 border border-gray-800">
          <nav-bar-item desktop-icon-only @click="redirect" @mouseover="profileTipOn = !profileTipOn.value"
            @mouseleave="profileTipOn = false">
            <nav-bar-item-label :icon="mdiBookEducationOutline" desktop-icon-only />
          </nav-bar-item>
          <label for="label" class="text-xs font-bold" @click="redirect">{{ "Add Placement Form" }}</label>
          <!-- <jb-buttons>
            <jb-button
              label="Add Profile"
              type="redirect"
              class="font-bold text-xs  lg:w-full sm:w-full bg-orange-500 border border-orange-500 text-white hover:bg-orange-500"
              small
              :icon="mdiBookEducationOutline" 
              @click="redirect"
            />
          </jb-buttons> -->
        </div>

        <div
          v-if="((user.validation && user.validation.fresherexp && user.validation.fresherexp.name === 'fresher' && user.other_data != null) || (user.validation && user.validation.fresherexp && user.validation.fresherexp.name === 'experienced' && user.other_data != null && user.validation.experience === true))"
          class="relative flex lg:flex-col items-center group lg:justify-center sm:justify-start z-40 box-border p-1 lg:p-1 w-50 border border-gray-800">
          <nav-bar-item desktop-icon-only @click="redirect1" @mouseover="viewprofileTipOn = !viewprofileTipOn.value"
            @mouseleave="viewprofileTipOn = false">
            <nav-bar-item-label :icon="mdiAccountBox" desktop-icon-only />
          </nav-bar-item>
          <label for="label" class="text-xs font-bold" @click="redirect1">{{ "View Placement Form" }}</label>
          <!-- <jb-buttons>
            <jb-button
              label="View Profile"
              type="redirect1"
              class="font-bold text-xs  lg:w-full sm:w-full bg-orange-500 border border-orange-500 text-white hover:bg-orange-500"
              small
              :icon="mdiAccountBox" 
              @click="redirect1"
            />
          </jb-buttons> -->
        </div>

        <!-- <div  class="relative flex lg:flex-col items-center group lg:justify-center sm:justify-start z-40 box-border p-1 lg:p-1 w-50 border border-gray-800">
          <nav-bar-item  desktop-icon-only @click.prevent="redirect99" >
            <nav-bar-item-label :icon="mdiAccountBox"  desktop-icon-only />
          </nav-bar-item>
          <label for="label" class="text-xs font-bold" @click="redirect99">{{"Closed Batches"}}</label>

        </div>  -->

        <!-- <div class="relative flex flex-col items-center group justify-center z-40">
          <nav-bar-item  has-divider desktop-icon-only @click.prevent="redirect2" @mouseover="passwordTip = !passwordTip.value" @mouseleave="passwordTip = false">
            <nav-bar-item-label :icon="mdiLockAlertOutline"  desktop-icon-only />
          </nav-bar-item>
           <label for="label" class="text-xs ">{{"Change Password"}}</label>

        </div> -->

        <div
          class="relative flex lg:flex-col items-center group lg:justify-center sm:justify-start z-40 box-border p-1 lg:p-1 w-50 border border-gray-800">
          <nav-bar-item desktop-icon-only @click="redirect7">
            <nav-bar-item-label :icon="mdiPlaylistPlus" desktop-icon-only />
          </nav-bar-item>
          <label for="label" class="text-xs font-bold lg:text-center" @click="redirect7">{{ "Join New Class" }}</label>
          <!-- <jb-buttons>
            <jb-button
              label="Join New Class"
              type="redirect7"
              class="font-bold text-xs  lg:w-full sm:w-full bg-orange-500 border border-orange-500 text-white hover:bg-orange-500"
              small
              :icon="mdiPlaylistPlus" 
              @click="redirect7"
            />
          </jb-buttons> -->

        </div>

        <div
          class="relative flex lg:flex-col items-center group lg:justify-center sm:justify-start z-40 box-border p-1 lg:p-1 w-50 border border-gray-800">
          <nav-bar-item desktop-icon-only @click="addrequirements">
            <nav-bar-item-label :icon="mdiPlaylistPlus" desktop-icon-only />
          </nav-bar-item>
          <label for="label" class="text-xs font-bold lg:text-center" @click="addrequirements">{{ "Requirements"
          }}</label>
          <!-- <jb-buttons>
            <jb-button
              label="Join New Class"
              type="redirect7"
              class="font-bold text-xs  lg:w-full sm:w-full bg-orange-500 border border-orange-500 text-white hover:bg-orange-500"
              small
              :icon="mdiPlaylistPlus" 
              @click="redirect7"
            />
          </jb-buttons> -->

        </div>

        <div
          class="relative flex lg:flex-col items-center group lg:justify-center sm:justify-start z-40 box-border p-1 lg:p-1 w-50 border border-gray-800">
          <nav-bar-item desktop-icon-only @click="viewhelp">
            <nav-bar-item-label :icon="mdiAccountQuestion" desktop-icon-only />
          </nav-bar-item>
          <label for="label" class="text-xs font-bold lg:text-center" @click="viewhelp">{{ "Help" }}</label>
          <!-- <jb-buttons>
            <jb-button
              label="Join New Class"
              type="redirect7"
              class="font-bold text-xs  lg:w-full sm:w-full bg-orange-500 border border-orange-500 text-white hover:bg-orange-500"
              small
              :icon="mdiPlaylistPlus" 
              @click="redirect7"
            />
          </jb-buttons> -->

        </div>
        <!-- <div class="relative flex lg:flex-col items-center group lg:justify-center sm:justify-start  z-40 box-border p-1 lg:p-1 w-50 border border-gray-800"> -->
        <!-- <nav-bar-item  desktop-icon-only  @click.prevent="redirect8">
            <nav-bar-item-label :icon="mdiAccountMultiplePlusOutline"  desktop-icon-only />
          </nav-bar-item>
           <label for="label" class="text-xs font-normal lg:text-center" @click="redirect8">{{"Refer Friend"}}</label> -->
        <!-- <jb-buttons>
            <jb-button
              label="Refer Friend"
              type="redirect8"
              class="font-bold text-xs"
              color="light"
              small
              :icon="mdiAccountMultiplePlusOutline" 
              @click="redirect8"
            />
          </jb-buttons>

        </div> -->

        <!-- <div class="relative flex lg:flex-col items-center group lg:justify-center sm:justify-start z-40 box-border p-1 lg:p-1 w-50 border border-gray-800"> -->
        <!-- <nav-bar-item  desktop-icon-only @click.prevent="redirect9">
            <nav-bar-item-label :icon="mdiTable"  desktop-icon-only />
          </nav-bar-item>
           <label for="label" class="text-xs font-normal lg:text-center" @click="redirect9">{{"Refered Friend List"}}</label> -->
        <!-- <jb-buttons>
            <jb-button
              label="Refered Friend List"
              type="redirect9"
              class="font-bold text-xs"
              color="light"
              small
              :icon="mdiTable" 
              @click="redirect9"
            />
          </jb-buttons>

        </div> -->

        <!-- <div class="relative flex lg:flex-col items-center group lg:justify-center sm:justify-start z-40 box-border p-1 lg:p-1 w-50 border border-gray-800"> -->
        <!-- <nav-bar-item  desktop-icon-only @click.prevent="redirect10">
            <nav-bar-item-label :icon="mdiCashMultiple"  desktop-icon-only />
          </nav-bar-item>
           <label v-bind:style="{cursor: pointer}" for="label" class="text-xs font-normal lg:text-center" @click="redirect10">Payment Details</label> -->
        <!-- <jb-buttons>
            <jb-button
              label="Payment Details"
              type="redirect10"
              class="font-bold text-xs"
              color="success"
              small
              :icon="mdiCashMultiple" 
              @click="redirect10"
            />
          </jb-buttons>

        </div> -->
        <!-- 
        <div class="relative flex flex-col items-center group justify-center z-40">
          <nav-bar-item  has-divider desktop-icon-only @click.prevent="redirect3" @mouseover="mobileTip = !mobileTip.value" @mouseleave="mobileTip = false">
            <nav-bar-item-label :icon="mdiPhonePlusOutline" label="Edit contact" desktop-icon-only />
            <Tip :bottom="true" tip="Edit contact" v-if="mobileTip"  />
          </nav-bar-item>
        </div>

        <div class="relative flex flex-col items-center group justify-center z-40">
          <nav-bar-item  has-divider desktop-icon-only @click.prevent="redirect4" @mouseover="emailTip = !emailTip.value" @mouseleave="emailTip = false">
            <nav-bar-item-label :icon="mdiEmailPlusOutline" label="Edit email" desktop-icon-only />
            <Tip :bottom="true" tip="Edit email" v-if="emailTip"  />
          </nav-bar-item>
        </div> -->
        <div
          class="relative flex lg:flex-col items-center group lg:justify-center sm:justify-start z-40 box-border p-1 lg:p-1 w-50 border border-gray-800">
          <nav-bar-item desktop-icon-only @click="redirect5">
            <nav-bar-item-label :icon="mdiQrcode" desktop-icon-only />
          </nav-bar-item>
          <label for="label" class="text-xs font-bold lg:text-center" @click="redirect5">{{ "Open QR code" }}</label>
          <!-- <jb-buttons>
            <jb-button
              label="Scan QR code"
              type="redirect5"
              class="font-bold text-xs  lg:w-full sm:w-full bg-orange-500 border border-orange-500 text-white hover:bg-orange-500"
              small
              :icon="mdiQrcode" 
              @click="redirect5"
            />
          </jb-buttons> -->
        </div>

        <div class="relative flex lg:flex-col items-center group lg:justify-center sm:justify-start z-40 box-border p-1 lg:p-1 w-50 border border-gray-800">
          <nav-bar-item  desktop-icon-only @click="testfreshers()" >
            <nav-bar-item-label :icon="mdiSchool "  desktop-icon-only />
          </nav-bar-item>
          <label for="label" class="text-xs font-bold lg:text-center" @click="testfreshers">{{"Testfreshers"}}</label>

        
        </div> 

         <div class="relative flex lg:flex-col items-center group lg:justify-center sm:justify-start z-40 box-border p-1 lg:p-1 w-50 border border-gray-800">
          <nav-bar-item  desktop-icon-only @click="qtalk()" >
            <nav-bar-item-label :icon="mdiChat"  desktop-icon-only />
          </nav-bar-item>
          <label for="label" class="text-xs font-bold lg:text-center" @click="qtalk">{{"QTalk"}}</label>

        
        </div> 


        
        <div class="relative flex lg:flex-col items-center group lg:justify-center sm:justify-start z-40 box-border p-1 lg:p-1 w-50 border border-gray-800">
          <nav-bar-item  desktop-icon-only @click="hr()" >
            <nav-bar-item-label :icon="mdiAccountGroup "  desktop-icon-only />
          </nav-bar-item>
          <label for="label" class="text-xs font-bold lg:text-center" @click="hr">{{"HR"}}</label>

        
        </div> 

        <nav-bar-menu>

          <span class="font-bold">{{ userName }}</span>

          <template #dropdown>

            <nav-bar-item @click="redirect10" class="mb-2 mt-1">
              <nav-bar-item-label :icon="mdiCashMultiple" />
              <label for="label" class="text-xs font-bold">Course Details</label>
            </nav-bar-item>

            <nav-bar-item @click="redirect12" class="mb-2 mt-1">
              <nav-bar-item-label :icon="mdiPhone" />
              <label for="label" class="text-xs font-bold">Add Contact Number</label>
            </nav-bar-item>


            <nav-bar-item @click="redirect13" class="mb-2 mt-1">
              <nav-bar-item-label :icon="mdiEmail" />
              <label for="label" class="text-xs font-bold">Add Email ID</label>
            </nav-bar-item>

            <nav-bar-item @click="redirect8" class="mb-2 mt-1">
              <nav-bar-item-label :icon="mdiAccountMultiplePlusOutline" />
              <label for="label" class="text-xs font-bold">Refer Friend</label>
            </nav-bar-item>
            <nav-bar-item @click="redirect9" class="mb-2 mt-1">
              <nav-bar-item-label :icon="mdiTable" />
              <label for="label" class="text-xs font-bold">Refered Friend List</label>
            </nav-bar-item>
            <nav-bar-item @click="redirect99" class="mb-2 mt-1">
              <nav-bar-item-label :icon="mdiTable" />
              <label for="label" class="text-xs font-bold">Closed Batch List</label>
            </nav-bar-item>
            <nav-bar-item @click="redirect2" class="mb-2 mt-1">
              <nav-bar-item-label :icon="mdiLockAlertOutline" />
              <label for="label" class="text-xs font-bold">Change Password</label>
            </nav-bar-item>


            <nav-bar-item @click="logout = true">
              <nav-bar-item-label :icon="mdiLogoutVariant" />
              <label for="label" class="text-xs font-bold">Logout</label>
            </nav-bar-item>

          </template>
        </nav-bar-menu>

        <!-- <div class="relative flex flex-col items-center group justify-center z-40">
          <nav-bar-item  has-divider desktop-icon-only @click.prevent="redirect5" @mouseover="scanTip = !scanTip.value" @mouseleave="scanTip = false">
            <nav-bar-item-label :icon="mdiQrcode" label="Pay directly" desktop-icon-only />
            <Tip :bottom="true" tip="Pay Directly" v-if="scanTip"  />
          </nav-bar-item>
        </div> -->


        <div class="relative flex flex-col items-center group justify-center z-40">
          <!-- <nav-bar-item desktop-icon-only>
          <div>
         <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <button @click="logout=true">
            <h2 class="
                text-center 
                text-white
                text-sm
                m-2 
                "
                >Logout?</h2>
        </button>

      </div>
          </div>
        </nav-bar-item> -->
          <Changepass v-model="changepass" />
          <Addcontact v-if="enablecontact === true" v-model="enablecontact" has-cancel />
          <Emailadd v-if="enableemail === true" v-model="enableemail" has-cancel />
          <Qrcode v-if="scanclass === true" :id="user.user.uid" v-model="scanclass" has-cancel />
          <Viewhelp v-if="helpviews === true" v-model="helpviews" has-cancel />
        </div>
      </div>
    </div>
  </nav>
</template>

