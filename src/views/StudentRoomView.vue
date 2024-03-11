<script setup>
import {
  mdiBroadcast,
  mdiWeb,
  mdiWebrtc,
  mdiMonitor,
  mdiMicrophoneSettings,
  mdiWebcam,
  mdiDevices,
  mdiAccountGroup,
  mdiMessageText,
  mdiMicrophone,
  mdiMonitorShare,
  mdiExitToApp,
  mdiRecordCircle,
  mdiPlayPause,
  mdiEye,
  mdiTrashCan,
  mdiClose,
  mdiMessageArrowRight,
  mdiCheckboxBlankCircle            
} from '@mdi/js'
import dayjs from 'dayjs';
import { onBeforeMount, onMounted, computed, watch, ref, reactive} from "vue";
import { useMainStore } from '@/stores/main'
import { webrtcStore } from "../stores/webRTC";
import { useGeneralStore } from '@/stores/general'
import { useRoute,useRouter } from "vue-router";
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import ButtonTextLink from '@/components/ButtonTextLink.vue'
import DividerHorizontal from '@/components/DividerHorizontal.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import { sessionStore } from "../stores/session";
const webrtc = webrtcStore();
const mainStore = useMainStore()
const roomStore = useGeneralStore()
const route = useRoute();
const user = sessionStore();
const router = useRouter();
const checkRTC = computed(() => {
  return webrtc.checkRTC;
});

const pageLoading = ref(false)
const loadingMessage = ref('This may take a few seconds, please wait.')
const loading = ref(false);
const connected = ref(false);
const trainerConnected = computed(() => {
  return webrtc.trainerJoined;
});
const trainerVideo = computed(() => {
  return webrtc.trainerVideo;
});
const roomUsers = computed(() => {
  return webrtc.roomUsers;
});
const tableTrStyle = computed(() => mainStore.tableTrStyle)

const tableTrOddStyle = computed(() => mainStore.tableTrOddStyle)

const gridCols = computed(() => {
  if(webrtc.videoCount > 4){
    return 4
  }
  return webrtc.videoCount;
});

const chatMessage = ref('')

const activeChatUser = reactive({})

const showBottomChat = ref(false)

const newMessage = computed(() => webrtc.setNewMessage)

const disableNewMessage = () => 
{
  webrtc.setMessageFalse();
}

const scrollToBottom = () => {
  const container = document.getElementById('journal-scroll');
  container.scrollTop = container.scrollHeight;
}

const headerClick = () => {
  showBottomChat.value = false
}

const headerBroadcast = () => {
  Object.assign(activeChatUser, broadcastUser)
  showBottomChat.value = true
}

const userMessage = (user) => {
  Object.assign(activeChatUser, user)
  showBottomChat.value = true
}

const broadcastUser = reactive({
        userID: 'all',
        name: 'Broadcast',
        connected: true,
        messages: [],
      })

const sendMessage = () => {
  if(chatMessage.value.length > 0){
      webrtc.sendChatMessage(chatMessage.value,activeChatUser.userID)
      activeChatUser.messages.push({
          content:chatMessage.value,
          date: dayjs().format('MMM D, h:mm A'),
          from: mainStore.user.id,
          fromSelf: true,
        })
      chatMessage.value = ''
  }
}

const error = ref(false);
const errorMessage = ref('');

const isStudent = computed(() => {
  return user.isStudent;
});

const roomBatch = computed(() => {
  return roomStore.roomBatch;
});
const studentBatch = computed(() => {
  return roomStore.roomStudentBatch;
});
const broadcastRecordValue = computed(() => {
  return webrtc.broadcastVideoPaused;
});
const broadcastRoomValue = computed(() => {
  return webrtc.broadcastRoom;
});
const muteAllValue = computed(() => {
  return webrtc.muteAll;
});
const audioValue = computed(() => {
  return webrtc.audio;
});
const videoValue = computed(() => {
  return webrtc.video;
});
const recordValue = computed(() => {
  return webrtc.record;
});
const screenValue = computed(() => {
  return webrtc.screen;
});
const chatValue = computed(() => {
  // return true
  return webrtc.chat;
});
const exitValue = ref(false)
const stopBroadcast = ref(false)


const muteRoomValue = computed(() => {
  return webrtc.muteRoom;
});
const muteUserValue = computed(() => {
  return webrtc.muteUser;
});


const colGrids = ref(0)

const trimString = (messages) => {
  if (messages.length > 0) {
        let message = messages[messages.length - 1];
        let newText = message.content;
        if (newText && newText.length > 150) {
          newText = newText.substring(0, 150) + "...";
        }
        return newText;
      }
}

const joinRoom = async () => {

  try {

    loadingMessage.value = "Joining classroom, this may take a few seconds, please wait."
    pageLoading.value = true;
    if (connected.value) {

      await webrtc.joinRoom(route.params.id);
      pageLoading.value = false;
      mainStore.pushMessage("You have joined the classroom!")
    }
    else{
      mainStore.pushMessage("Failed to join classroom, please check browser and permissions")
    }
  } catch (err) {

    pageLoading.value = false;
  }
};

const isVideoOnFullScreen = ref(false)

const handleFS = (id) => {
      let videoPlayer = document.getElementById(id);
      videoPlayer.addEventListener("fullscreenchange", (e) => {
        if (videoPlayer.controls) return;
        let fullscreenElement = document.fullscreenElement;
        if (!fullscreenElement) {
          videoPlayer.style.pointerEvents = "auto";
          isVideoOnFullScreen.value = false;
        }
      });
      videoPlayer.addEventListener("webkitfullscreenchange", (e) => {
        if (videoPlayer.controls) return;
        let webkitIsFullScreen = document.webkitIsFullScreen;
        if (!webkitIsFullScreen) {
          videoPlayer.style.pointerEvents = "auto";
          isVideoOnFullScreen.value = false;
        }
      });
      videoPlayer.addEventListener("click", (e) => {
        if (videoPlayer.controls) return;
        if (!isVideoOnFullScreen.value) {
          if (videoPlayer.requestFullscreen) {
            videoPlayer.requestFullscreen();
          } else if (videoPlayer.webkitRequestFullscreen) {
            videoPlayer.webkitRequestFullscreen();
          } else if (videoPlayer.msRequestFullscreen) {
            videoPlayer.msRequestFullscreen();
          }
          isVideoOnFullScreen.value = true;
          videoPlayer.style.pointerEvents = "none";
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
          isVideoOnFullScreen.value = false;
          videoPlayer.style.pointerEvents = "auto";
        }
      });
    };


const remoteMedia = computed(() => {
  return webrtc.remoteTracks;
});

const joined = computed(() => {
  return webrtc.joined;
});
const clickMuteAll = async () => {
  if (muteAllValue.value) {
    await webrtc.unmuteRoomTrainer();
  } else {
    await webrtc.muteRoomTrainer();
  }
};
const clickBroadcast = async () => {
  if (broadcastRoomValue.value) {
    stopBroadcast.value = false
    await webrtc.castRoom();
  } else {
    await webrtc.uncastRoom();
  }
};
const recordBroadcast = async () => {
  if (broadcastRecordValue.value) {
    await webrtc.resumeCastRoom();
  } else {
    await webrtc.pauseCastRoom();
  }
};
const clickAudio = async () => {
    if (audioValue.value) {
      await webrtc.closeProducer("audio");
    } else {
      await webrtc.produce("audio");
    }
};
const clickVideo = async () => {
  if (videoValue.value) {
    await webrtc.closeProducer("video");
  } else {
    await webrtc.produce("video");
  }
};
const clickRecord = async () => {
  if (recordValue.value) {
    await webrtc.stopRecording();
  } else {
    await webrtc.startRecording();
  }
};
const clickScreen = async () => {
  if (screenValue.value) {
    await webrtc.closeProducer("screen");
  } else {
    await webrtc.produce("screen");
  }
};
const clickChat = () => {
  webrtc.chatToggle();
};
const clickExit = () => {
  exitValue.value = !exitValue.value;
};
const stopBroadcasting = () => {
  stopBroadcast.value = !stopBroadcast.value;
};
const exitRoom = () => {
  location.href = "/";
};


watch(webrtc.localVideo, (localMedia) => {
  if (localMedia.get("media")) {
    let ele = localMedia.get("media");
    let elem;
    if (ele.type === "video") {
      colGrids.value = colGrids.value + 1
      let lVideo = document.getElementById("videos");
      elem = document.createElement("video");
      elem.srcObject = ele.stream;
      elem.id = ele.id;
      elem.playsinline = false;
      elem.autoplay = true;
      elem.className = "flex text-center items-center justify-center aspect-video h-stream-container";
      lVideo.appendChild(elem);
      handleFS(elem.id);
    }
  }
  else{
    if (document.getElementById("localvideo")) {
        let elem = document.getElementById("localvideo");
        if (elem.srcObject) {
          let tracks = elem.srcObject;
          tracks.getTracks().forEach(function (track) {
            track.stop();
          });
        }
        elem.remove();
        colGrids.value = colGrids.value - 1
  }
  }
});

watch(webrtc.broadcastStream, (broadcastMedia) => {
  if (broadcastMedia.get("media")) {
    let ele = broadcastMedia.get("media");
    let elem;
    if (ele.type === "video") {
      colGrids.value = colGrids.value + 1
      let bVideo = document.getElementById("videos");
      elem = document.createElement("video");
      elem.srcObject = ele.stream;
      elem.id = ele.id;
      elem.playsinline = false;
      elem.muted = true
      elem.autoplay = true;
      elem.className = "flex text-center items-center justify-center aspect-video h-stream-container";
      bVideo.appendChild(elem);
      handleFS(elem.id);
    }
  }
  else{
    if (document.getElementById("broadcast")) {
        let elem = document.getElementById("broadcast");
        if (elem.srcObject) {
          let tracks = elem.srcObject;
          tracks.getTracks().forEach(function (track) {
            track.stop();
          });
        }
        colGrids.value = colGrids.value - 1
        elem.remove();
  }
  }
});

watch(webrtc.remoteTracks, (newMedia) => {
  console.log(newMedia)
  if (newMedia.get("media")) {
    let ele = newMedia.get("media");
    let elem;
    if (ele.type === "video") {
      let remoteVideo = document.getElementById("videos");
      elem = document.createElement("video");
      elem.srcObject = ele.stream;
      elem.id = ele.id;
      elem.playsinline = false;
      elem.autoplay = true;
      elem.className = "flex text-center items-center justify-center aspect-video h-stream-container";
      remoteVideo.appendChild(elem);
      handleFS(elem.id);
      colGrids.value = colGrids.value + 1
    }
  }
});
watch(webrtc.deletedTracks, (delMedia) => {
  try {
    for (let [key, value] of delMedia) {
      if (document.getElementById(value)) {
        let elem = document.getElementById(value);
        if (elem.srcObject) {
          let tracks = elem.srcObject;
          tracks.getTracks().forEach(function (track) {
            track.stop();
          });
        }
        elem.remove();
        colGrids.value = colGrids.value - 1
        webrtc.removedMedia(value);
      }
    }
  } catch (err) {
    console.log("Deleting media error", err);
  }
});
onMounted(async () => {
  if (!user.loggedIn) {
    router.replace("/login");
  }
  else if(isStudent === false){
    mainStore.pushMessage("You do not have permission, please check your login")
    router.replace("/");
  }
  else{
    if (checkRTC && checkRTC.osName !== "Apple") {
          if (Notification.permission !== "denied") {
            Notification.requestPermission();
          }
        }
  }
});
onBeforeMount(async () => {
  pageLoading.value = true
  await user.checkUser();
  if (user.loggedIn) {
  if(isStudent === false){
    mainStore.pushMessage("You do not have permission, please check your login")
    router.replace("/");
  }
  else{
   await webrtc.getWebRtc();
   const id = route.params.id
   mainStore.setPageTitle("Classroom");
//    await roomStore.get_single_batch(id);
//    await roomStore.get_student_batch(id);
    // if(isStudent){
    //     roomStore.add_trainer_attendance({
    //     bid: roomBatch.value.id,
    //     uid: mainStore.user.id,
    //     role: 'student',
    //   })
      connected.value = await webrtc.connectSocket("https://rec.qspiders.com");
    // }
    // else{
    //   error.value = true
    //   errorMessage.value = 'This batch does not belong to you, please go to home page and start your batch session'
    // }
  }
  }
  pageLoading.value = false
});
</script>
<template>
<SectionMain>
     <div v-if="pageLoading" wire:loading
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
    <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
    <p class="w-1/3 text-center text-white">{{loadingMessage}}</p>
  </div>
  <div v-if="!joined" class='grid h-video-screen place-items-center '>
    <CardBox
    class="lg:w-2/4"
        :title="route.query.name +' - '+ route.query.trainer"
        :icon="mdiBroadcast"
      >
        <div v-if="checkRTC && checkRTC.osName" class="py-2 px-12 lg:py-2 lg:px-12 text-gray-500 dark:text-gray-400">
          
          <ButtonTextLink
              class="text-blue-600"
              :label="checkRTC.isMobileDevice?'Mobile(Audio will be disabled)':'Laptop/Desktop'"
              :icon="mdiDevices"
            />
            <DividerHorizontal />
          <ButtonTextLink
              class = "text-blue-600"
              :label="checkRTC.osName"
              :icon="mdiMonitor"
            />
            <DividerHorizontal />
          <ButtonTextLink
               class = "text-blue-600"
              :label="checkRTC.browser.name +' (version: '+checkRTC.browser.version+')'"
              :icon="mdiWeb"
            />
            <DividerHorizontal />
          <ButtonTextLink
              :class="checkRTC.isWebRTCSupported?'text-green-600':'text-red-600'"
              :label="checkRTC.isWebRTCSupported?'Streaming supported':'Streaming not supported'"
              :icon="mdiWebrtc"
            />
            <DividerHorizontal />
          <ButtonTextLink
              :class="checkRTC.hasMicrophone?'text-green-600':'text-red-600'"
              :label="checkRTC.hasMicrophone?'Microphone supported':'Microphone not supported'"
              :icon="mdiMicrophoneSettings"
            />
            <DividerHorizontal />
          <ButtonTextLink
              :class="checkRTC.hasWebcam?'text-green-600':'text-red-600'"
              :label="checkRTC.hasWebcam?'Webcam supported':'Webcam not supported'"
              :icon="mdiWebcam"
            />
          

        </div>

        <template #footer>
          <BaseLevel mobile>
            <BaseButtons>
            <!-- <BaseButton
                v-if="roomBatch.status !== '1'"
                color="danger"
                :icon="mdiBroadcast"
                label="Closed"
              />
              <BaseButton
                v-else-if="studentBatch.total_attended > roomBatch.demo_days"
                color="danger"
                :icon="mdiBroadcast"
                label="online.qspiders.com"
                href="https://online.qspiders.com"
                tip="Demo classes are closed"
                tip-x="center"
              />
              <BaseButton
                v-else-if="studentBatch.blocked"
                color="danger"
                :icon="mdiBroadcast"
                label="Blocked"
              /> -->
              <BaseButton
                
                color="info"
                :icon="mdiBroadcast"
                label="Join class"
                @click="joinRoom"
              />
            </BaseButtons>
          </BaseLevel>
        </template>
      </CardBox>
    </div>
    <div v-else class="grid grid-cols-6 gap-1">
      <div class="" :class="chatValue ? 'col-span-4' : 'col-span-6'">
      <CardBox class="h-video-screen">
        <div class=" text-red-500 dark:text-gray-400">
          <nav class="border-gray-200 px-1 py-1 rounded bg-gray-900">
            <div class="flex flex-wrap justify-between mx-auto ">
              <span class="flex">
              <span
                class="
                  self-center
                  text-lg
                  font-semibold
                  whitespace-nowrap
                  text-gray-200
                  pr-4
                ">{{route.query.name}} 
                <BaseButton
                  :color="trainerConnected ? 'success': 'danger'"
                  :icon="mdiCheckboxBlankCircle"
                  small
                /></span>
              </span>
              <div class="block w-auto">
              <span class="px-1">
                <BaseButton
                  :disabled = "muteUserValue || muteRoomValue ? true : false "
                  :color="audioValue ? 'success': 'danger'"
                  :icon="mdiMicrophone"
                  small
                  @click="clickAudio"
                />
                </span>  
                <span class="px-1">
                <BaseButton
                  :color="chatValue ? 'success': 'danger'"
                  :icon="mdiMessageText"
                  :class="newMessage ? 'animate-pulse' : ''"
            
                  small
                  @click="clickChat"
                />
                </span>  
                <span class="px-1">
                <BaseButton
                  :color="exitValue ? 'success': 'danger'"
                  :icon="mdiExitToApp"
                  small
                  @click="clickExit"
                />
                </span>
                </div>
            </div>
          </nav>
          <div id="videos" class ="h-stream-container grid grid-cols-1" :class="'lg:grid-cols-'+colGrids">
        </div> 
        </div>
      </CardBox>
      </div>
      <div v-if="chatValue"  class="col-span-2">
      <CardBox :title="'Room users - ' + roomUsers.length" :icon="mdiMessageText" class="h-video-screen" :header-icon="mdiClose"
      @header-icon-click="clickChat">
        <div class="text-gray-500 dark:text-gray-400">
        
  <table class="table-auto text-xs">
  <thead>
    <tr>
      <th>Name</th>
      <th>Role</th>
      <th>Message</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(client, index) in roomUsers"
        :key="index">
      <td :class="client.connected ? 'text-green-500' : 'text-red-500'">{{ client.name }}</td>
      <td>{{client.role}}</td>
      <td>{{trimString(client.messages)}}</td>
      <td><BaseButton
              :disabled="client.connected ? false : true"
              color="info"
              :icon="mdiMessageText"
              small
              @click="userMessage(client)"
            /></td>
    </tr>
  </tbody>
</table>
        </div>
      </CardBox>
      </div>
      <div class="fixed bottom-0 bg-slate-900  right-0 lg:bottom-2 lg:right-2" v-if="showBottomChat">
      <div class="w-80 rounded shadow-2xl">
			<nav class="w-full h-10 bg-gray-800 rounded-tr rounded-tl flex justify-between items-center">
					<div class="flex justify-center items-center">
						<span class="font-semibold text-gray-300 ml-1">{{activeChatUser.name}}</span>
					</div>

					<div class="flex items-center">
            <BaseButton
              :icon="mdiClose"
              small
              rounded-full
              @click="headerClick"
            />
					</div>
			</nav>
			<div class="overflow-auto px-1 py-1 flex flex-col" style="height: 19rem;" id="journal-scroll">
        <div class="flex flex-col-reverse overflow-auto">
          <div class="flex-col-reverse">
        <div class=""  v-for="(message, index) in activeChatUser.messages"
            :key="index">
     
        <div  v-if="message.from == mainStore.user.id" class="flex justify-end pt-2 pl-10">
					<span class="bg-green-900 h-auto text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end flex justify-end " style="font-size: 10px;">{{ message.content }} <span class="text-gray-400 pl-1" style="font-size: 8px;">{{ message.date }}</span></span>

				</div>
				<div v-else class="flex items-center pt-2 pr-10">
					<span class="flex ml-1  h-auto bg-gray-600 text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end" style="font-size: 10px;"> {{ message.content }} <span class="text-gray-400 pl-1" style="font-size: 8px;">{{ message.date }}</span></span>
				</div>	
				</div>
        </div>
        </div>
			</div>
      <form @submit.prevent="onSubmit">
			<div class="flex items-center p-1">
				<div class="relative">
				<input v-model="chatMessage" type="text" class="py-2 focus:outline-none h-auto placeholder-gray-100 bg-gray-900 text-white" style="font-size: 11px;width: 250px;" placeholder="Type a message..." id="typemsg">
				</div>
				<div  class="w-7 h-7 rounded-full pl-4 bg-blue-300 text-center items-center flex justify-center">
					<BaseButton
          type="submit"
          color="info"   
          :icon="mdiMessageArrowRight"
          @click="sendMessage"
            />
				</div>
				
			</div>
      </form>
		</div>
</div>
    </div>
   <CardBoxModal
    :modelValue="exitValue"
    title="Exit classroom"
    button-label="Exit"
    button="danger"
    has-cancel
    @confirm="exitRoom"
    @cancel="clickExit"
  >
    <p>Are you sure you want to exit classroom?</p>
  </CardBoxModal>
  <CardBoxModal
    :modelValue="stopBroadcast"
    title="Stop broadcast"
    button-label="Stop"
    button="danger"
    has-cancel
    @confirm="clickBroadcast"
    @cancel="stopBroadcasting"
  >
    <p>Are you sure you want to stop broadcasting?</p>
  </CardBoxModal>
                    
</SectionMain>
</template>