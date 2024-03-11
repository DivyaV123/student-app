<template>
<div v-if="pageLoading" wire:loading
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
    <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
    <p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
  </div>
  <div class=" container mx-auto width w-full">


    <div class="shadow-2xl dark:bg-slate-600 my-14">
      <div class="block sm:flex items-stretch">

        <!-- ===================Left side========= -->


        <div class="w-full p-4 shadow-2xl bg-gray-900 sm:w-3/5">
          <div class="mt-0">
            <div v-if="thumbnail100">
            <img :src="`https://gotest.qspiders.com/thumbnails/${thumbnail100}`"
              class="object-scale-down w-40 mx-auto rounded-full" />
            </div>
            <div v-else class="text-red-500">
              {{"Photo not added..QR Code will not be enabled and will not be able to join online classes!!"}}
              <jb-button  label="Add Photo" type="submit" color="info" @click="photoupload" class="font-medium text-xs" small/>
            </div>
            <div class="mt-2">
              <p
                class="tracking-wider border-b border-gray-700 uppercase mb-3 sm:text-sm md:text-base text-base mt-4 text-green-500 font-bold">
                Personal Information
              </p>

              <li class="flex text-sm items-center text-gray-200 mb-1">
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4 mr-3 font-bold text-white">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg></span> <span class="break-all font-bold">{{ emailss_data }}</span>
              </li>

              <li class="flex mb-1 text-sm items-center text-gray-200">
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4 mr-3 font-bold text-white">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z">
                    </path>
                  </svg></span>

                <span class="break-all font-bold">{{ contactss_data }}</span>
              </li>

              <li class="flex mb-1 text-sm items-center text-gray-200">
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4 mr-3 font-bold text-white">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z">
                    </path>
                  </svg></span>
                <span class="font-bold">{{ gender }}</span>
              </li>

              <li class="flex mb-0 text-sm items-center text-gray-200 mb-1">
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4 mr-3 font-bold text-white">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z">
                    </path>
                  </svg></span>
                <span class="font-bold">DOB : {{ dob }}</span>
              </li>

              <li class="flex mb-0 text-sm items-center text-gray-200" v-if="to_relocate === true">
                <span>
                  <svg class="w-4 h-4 mr-3 font-bold text-white" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M15,23H13V21H15V23M19,21H17V23H19V21M15,17H13V19H15V17M7,21H5V23H7V21M7,17H5V19H7V17M19,17H17V19H19V17M15,13H13V15H15V13M19,13H17V15H19V13M21,9A2,2 0 0,1 23,11V23H21V11H11V23H9V15H3V23H1V15A2,2 0 0,1 3,13H9V11A2,2 0 0,1 11,9V7A2,2 0 0,1 13,5H15V1H17V5H19A2,2 0 0,1 21,7V9M19,9V7H13V9H19Z" />
                  </svg>
                </span>
                <span class="break-all font-bold">Relocation Cities : {{ relocate_data }}</span>
              </li>
              <li class="flex mb-0 text-sm items-center text-gray-200" v-if="temp_statee&&temp_districtt&&temp_addresss">
                <span>
                  <svg class="w-4 h-4 mr-3 font-bold text-white" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M15,23H13V21H15V23M19,21H17V23H19V21M15,17H13V19H15V17M7,21H5V23H7V21M7,17H5V19H7V17M19,17H17V19H19V17M15,13H13V15H15V13M19,13H17V15H19V13M21,9A2,2 0 0,1 23,11V23H21V11H11V23H9V15H3V23H1V15A2,2 0 0,1 3,13H9V11A2,2 0 0,1 11,9V7A2,2 0 0,1 13,5H15V1H17V5H19A2,2 0 0,1 21,7V9M19,9V7H13V9H19Z" />
                  </svg>
                </span>
                <span class="break-all font-bold">Temporary address : {{ temp_statee }},
              {{ temp_districtt }}, {{ temp_addresss }}</span>
              </li>

              <h6
                v-if="aadhar_number!=null || passport!=null || pan_card!=null" class="tracking-wider border-b border-gray-700 uppercase mb-3 sm:text-sm md:text-base text-base mt-4 text-green-500 font-bold">
                Personal Documents</h6>

              <li class="flex mb-0 text-sm items-center text-gray-200" v-if="aadhar_number === true">
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4 mr-3 font-bold text-white">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z">
                    </path>
                  </svg></span>
                <span class="font-bold">Aadhar : {{ "Yes" }}</span>
              </li>
              <li class="flex mb-0 text-sm items-center text-gray-200" v-if="aadhar_number === false">
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4 mr-3 font-bold text-white">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z">
                    </path>
                  </svg></span>
                <span class="font-bold">Aadhar : {{ "No" }}</span>
              </li>

              <li class="flex mb-0 text-sm items-center text-gray-200" v-if="passport === true">
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4 mr-3 font-bold text-white">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75">
                    </path>
                  </svg></span>
                <span class="font-bold">Passport : {{ "Yes" }}</span>
              </li>

              <li class="flex mb-0 text-sm items-center text-gray-200" v-if="passport === false">
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4 mr-3 font-bold text-white">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75">
                    </path>
                  </svg></span>
                <span class="font-bold">Passport : {{ "No" }}</span>
              </li>

              <li class="flex mb-0 text-sm items-center text-gray-200" v-if="pan_card === true">
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4 mr-3 font-bold text-white">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184">
                    </path>
                  </svg></span>
                <span class="font-bold">PanCard : {{ "Yes" }}</span>
              </li>

              <li class="flex mb-0 text-sm items-center text-gray-200" v-if="pan_card === false">
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4 mr-3 font-bold text-white">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184">
                    </path>
                  </svg></span>
                <span class="font-bold"> PanCard : {{ "No" }}</span>
              </li>

              <li class="flex mb-0 text-sm items-center text-gray-200" >
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4 mr-3 font-bold text-white">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184">
                    </path>
                  </svg></span>
                <span  class="font-bold">Resume :
                  <jb-button v-if="!studentresumes" label="Add" type="submit" color="info" @click="resumeupload" class="font-medium text-xs" small/>
                  <jb-button v-if="studentresumes" label="Edit" type="submit" color="info" @click="resumeupload" class="font-medium text-xs" small/>
                  <jb-button v-if="studentresumes"  label="Download" type="submit" color="white" 
                   class="font-medium text-xs" 
                   @click="resumedownload(
          
                   )"

                     small />
                </span>
              </li>

              <h6
                v-if="linkedinurl || twitterurl || instagramurl || facebookurl" class="tracking-wider border-b border-gray-700 uppercase mb-3 sm:text-sm md:text-base text-base mt-7 text-green-500 font-bold">
                Social Media Details</h6>
              <li class="flex mb-0 text-sm items-center text-gray-200 pb-3" v-if="linkedinurl">

                <span><svg class="w-4 h-4 mr-3 font-bold text-white" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                  </svg></span>
                <!-- <span class="break-all">Linkedin URL : {{ linkedinurl }}</span> -->
                <a :href="linkedinurl"  class="font-bold" target="_blank">Linkedin URL :
                  {{linkedinurl}}
                </a>
              </li>

              <li class="flex mb-0 text-sm items-center text-gray-200 pb-3" v-if="twitterurl">
                <span><svg class="w-4 h-4 mr-3 font-bold text-white" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M23 11.5L19.95 10.37C19.69 9.22 19.04 8.56 19.04 8.56C17.4 6.92 14.75 6.92 13.11 8.56L11.63 10.04L5 3C4 7 5 11 7.45 14.22L2 19.5C2 19.5 10.89 21.5 16.07 17.45C18.83 15.29 19.45 14.03 19.84 12.7L23 11.5M17.71 11.72C17.32 12.11 16.68 12.11 16.29 11.72C15.9 11.33 15.9 10.7 16.29 10.31C16.68 9.92 17.32 9.92 17.71 10.31C18.1 10.7 18.1 11.33 17.71 11.72Z" />
                  </svg></span>
                  <a :href="twitterurl"  class="font-bold" target="_blank">Twitter URL :
                  {{twitterurl}}
                </a>
                <!-- <span class="break-all">Twitter URL : {{ twitterurl }}</span> -->
              </li>

              <li class="flex mb-0 text-sm items-center text-gray-200 pb-3" v-if="instagramurl">
                <span><svg class="w-4 h-4 mr-3 font-bold text-white" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                  </svg></span>
                <!-- <span class="break-all">Instagram URL : {{ instagramurl }}</span> -->
                <a :href="instagramurl"  class="font-bold" target="_blank">Instagram URL :
                  {{instagramurl}}
                </a>
              </li>

              <li class="flex mb-0 text-sm items-center text-gray-200" v-if="facebookurl">
                <span><svg class="w-4 h-4 mr-3 font-bold text-white" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                  </svg></span>
                  <a :href="facebookurl" class="font-bold" target="_blank">Facebook URL :
                  {{facebookurl}}
                </a>
                <!-- <span class="break-all">Facebook URL : {{ facebookurl }}</span> -->
              </li>
              <h6
                class="tracking-wider border-b border-gray-700 uppercase mb-3 sm:text-sm md:text-base text-base mt-7 text-green-500 font-bold"
                v-if="refe_name_data">Referral Information
              </h6>
              <li class="flex mb-0 text-sm text-gray-200 pb-3" v-if="refe_name_data">
                <span><svg class="w-4 h-4 mr-3 font-bold text-white" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                  </svg></span>
                <span class="break-all font-bold">Name : {{ refe_name_data }}</span>
              </li>

              <li class="flex mb-0 text-sm text-gray-200 pb-3" v-if="refe_name_data">
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4 mr-3 font-bold text-white">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z">
                    </path>
                  </svg></span>
                <span class="break-all font-bold">Number : {{ refe_number_data }}</span>
              </li>

              <h6
                class="tracking-wider border-b border-gray-700 uppercase mb-3 sm:text-sm md:text-base text-base mt-4 text-green-500 font-bold" v-if="emer_name_data">
                Parents/Guardian Information</h6>
              <li class="flex mb-0 text-sm text-gray-200 pb-3 " v-if="emer_name_data">
                <span><svg class="w-4 h-4 mr-3 font-bold text-white" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                  </svg></span>
                <span class="break-all font-bold">Name : {{ emer_name_data }}</span>
              </li>

              <li class="flex mb-0 text-sm text-gray-200 pb-3" v-if="emer_name_data">
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4 mr-3 font-bold text-white">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z">
                    </path>
                  </svg></span>
                <span class="break-all font-bold">Number : {{ emer_number_data }}</span>
              </li>
              <li class="flex mb-0 text-sm text-gray-200 pb-3" v-if="emer_name_data">
                <svg class="w-4 h-4 mr-3 font-bold text-white" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z" />
                </svg>
                <span class="break-all font-bold">Relation : {{ emer_relation_data }}</span>
              </li>
            </div>
          </div>
        </div>

        <!-- ================Right Side========================== -->

        <div class=" p-4 sm:w-2/3">
          <div class>
            <h6 class="font-medium tracking-widest uppercase text-4xl text-white pb-4">{{ name }}</h6>

            <p v-if="state&&district&&address" class="text-green-500 text-sm sm:text-base capitalize tracking-widest font-semibold">{{ state }},
              {{ district }}, {{ address }}</p>

            <div class="pt-6">
              <div class=" mb-2">
                <p class="py-1 px-4 text-gray-100 uppercase tracking-widest text-sm border-b bg-black border-white mb-3 font-bold">
                  Education Information
                </p>
                <li class="font-bold text-base pb-1 dark:text-gray-200">Highest degree : {{ highest_degree }}</li>
                <li class="font-bold text-base pb-1 dark:text-gray-200">Highest YOP : {{ highest_yop }}</li>
                <h6 v-if="tenth_cgpa_percentage" class="text-green-500 underline font-bold">10th/SSLC details</h6>
                <ul v-if="tenth_cgpa_percentage" class="pt-2 list-outside list-disc pl-4">

                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="tenth_cgpa_percentage === 'percentage'"><b>Percentage
                      :
                    </b>{{ percentage }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="tenth_cgpa_percentage === 'cgpa'"><b>CGPA : </b>{{
                      cgpa
                  }}
                  </li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200"><b>Year of Pass Out : </b>{{ yop }}</li>


                </ul>

                <h6 v-if="twe_pcgpa_percentage" class="text-green-500 underline font-bold">PUC details</h6>
                <ul v-if="twe_pcgpa_percentage" class="pt-2 list-outside list-disc pl-4">

                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="twe_pcgpa_percentage === 'percentage'"><b>Percentage :
                    </b>{{ twe_percentage }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="twe_pcgpa_percentage === 'cgpa'"><b>CGPA :
                    </b>{{ twe_cgpa }}</li>

                  <li class="font-bold text-base pb-1 dark:text-gray-200"><b>Year of Pass Out : </b>{{ twe_yop }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="twe_ygp === true"><b>Year Gap : </b>{{ "Yes" }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="twe_ygp === false"><b>Year Gap : </b>{{ "No" }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="twe_ygp_days&&twe_ygp === true"><b>Number of Year Gap :
                    </b>{{ twe_ygp_days }}</li>
                </ul>

                <h6 v-if="iti_cgpa_percentage" class="text-green-500 underline font-bold">ITI details</h6>
                <ul v-if="iti_cgpa_percentage" class="pt-2 list-outside list-disc pl-4">

                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="iti_cgpa_percentage === 'percentage'"><b>Percentage :
                    </b>{{ iti_percentage }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="iti_cgpa_percentage === 'cgpa'"><b>CGPA :
                    </b>{{ iti_cgpa }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200"><b>Year of Pass Out : </b>{{ iti_yop }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="iti_otherstream === false"><b>Stream :
                    </b>{{ iti_stream }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="iti_otherstream === true"><b>Stream :
                    </b>{{ iti_other_stream }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="iti_othercollege === false"><b>College :
                    </b>{{ iti_college }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="iti_othercollege === true"><b>College :
                    </b>{{ iti_other_college }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="iti_otheruniversity === false"><b>University :
                    </b>{{ iti_university }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="iti_otheruniversity === true"><b>University :
                    </b>{{ iti_other_university }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="iti_ygp === true"><b>Year Gap : </b>{{ "Yes" }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="iti_ygp === false"><b>Year Gap : </b>{{ "No" }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="iti_ygp_days&&iti_ygp === true"><b>Number of Year Gap :
                    </b>{{ iti_ygp_days }}</li>
                </ul>


                <h6 v-if="dip_cgpa_percentage" class="text-green-500 underline font-bold">Diploma details</h6>
                <ul v-if="dip_cgpa_percentage" class="pt-2 list-outside list-disc pl-4">

                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="dip_cgpa_percentage === 'percentage'"><b>Percentage :
                    </b>{{ dip_percentage }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="dip_cgpa_percentage === 'cgpa'"><b>CGPA :
                    </b>{{ dip_cgpa }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200"><b>Year of Pass Out : </b>{{ dip_yop }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="dip_otherstream === false"><b>Stream :
                    </b>{{ dip_stream }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="dip_otherstream === true"><b>Stream :
                    </b>{{ dip_other_stream }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="dip_othercollege === false"><b>College :
                    </b>{{ dip_college }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="dip_othercollege === true"><b>College :
                    </b>{{ dip_other_college }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="dip_otheruniversity === false"><b>University :
                    </b>{{ dip_university }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="dip_otheruniversity === true"><b>University :
                    </b>{{ dip_other_university }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="dip_ygp === true"><b>Year Gap : </b>{{ "Yes" }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="dip_ygp === false"><b>Year Gap : </b>{{ "No" }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="dip_ygp_days&&dip_ygp === true"><b>Number of Year Gap :
                    </b>{{ dip_ygp_days }}</li>
                </ul>

                <h6 v-if="deg_cgpa_percentage" class="text-green-500 underline font-bold">Degree details</h6>
                <ul v-if="deg_cgpa_percentage" class="pt-2 list-outside list-disc pl-4">

                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="deg_cgpa_percentage === 'percentage'"><b>Percentage :
                    </b>{{ deg_percentage }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="deg_cgpa_percentage === 'cgpa'"><b>CGPA :
                    </b>{{ deg_cgpa }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200"><b>Year of Pass Out : </b>{{ deg_yop }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="deg_othertype === false"><b>Degree : </b>{{ deg_type
                  }}
                  </li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="deg_othertype === true"><b>Degree :
                    </b>{{ deg_other_type }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="deg_otherstream === false"><b>Stream :
                    </b>{{ deg_stream }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="deg_otherstream === true"><b>Stream :
                    </b>{{ deg_other_stream }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="deg_othercollege === false"><b>College :
                    </b>{{ deg_college }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="deg_othercollege === true"><b>College :
                    </b>{{ deg_other_college }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="deg_otheruniversity === false"><b>University :
                    </b>{{ deg_university }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="deg_otheruniversity === true"><b>University :
                    </b>{{ deg_other_university }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="deg_yg === true"><b>Year Gap : </b>{{ "Yes" }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="deg_yg === false"><b>Year Gap : </b>{{ "No" }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="deg_yg === true">
                    <b>Number of Year Gap :</b>
                    {{ deg_yg_year }}
                  </li>
                </ul>

                <h6 v-if="mas_cgpa_percentage" class="text-green-500 underline font-bold">Master details</h6>
                <ul v-if="mas_cgpa_percentage" class="pt-2 list-outside list-disc pl-4">

                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="mas_cgpa_percentage === 'percentage'"><b>Percentage :
                    </b>{{ mas_percentage }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="mas_cgpa_percentage === 'cgpa'"><b>CGPA :
                    </b>{{ mas_cgpa }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200"><b>Year of Pass Out : </b>{{ mas_yop }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="mas_othertype === false"><b>Degree : </b>{{ mas_type
                  }}
                  </li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="mas_othertype === true"><b>Degree :
                    </b>{{ mas_other_type }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="mas_otherstream === false"><b>Stream :
                    </b>{{ mas_stream }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="mas_otherstream === true"><b>Stream :
                    </b>{{ mas_other_stream }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="mas_othercollege === false"><b>College :
                    </b>{{ mas_college }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="mas_othercollege === true"><b>College :
                    </b>{{ mas_other_college }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="mas_otheruniversity === false"><b>University :
                    </b>{{ mas_university }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="mas_otheruniversity === true"><b>University :
                    </b>{{ mas_other_university }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="mas_yg === true"><b>Year Gap : </b>{{ "Yes" }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="mas_yg === false"><b>Year Gap : </b>{{ "No" }}</li>
                  <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="mas_yg_year&&mas_yg === true"><b>Number of Year Gap :
                    </b>{{ mas_yg_year }}</li>
                </ul>

              </div>



              <!-- <div class=" mb-7">
                            <p class="sub-heading bg-gray-900">
                                Parents/Guardian Information
                            </p>
                            <ul class="pt-2 list-inside list-disc">
                             
                                <li class="font-bold text-base pb-1 dark:text-gray-200"><b>Name : </b>{{emer_name_data}}</li>
                                <li class="font-bold text-base pb-1 dark:text-gray-200"><b>Number : </b>{{emer_number_data}}</li>
                                <li class="font-bold text-base pb-1 dark:text-gray-200"><b>Relation : </b>{{emer_relation_data}}</li>
                            </ul>
                        </div> -->

              <!-- <div class=" mb-7" v-if="refe_name_data">
                            <p class="sub-heading bg-gray-900">
                                Referal Information
                            </p>
                            <ul class="pt-2 list-inside list-disc">
                             
                                <li class="font-bold text-base pb-1 dark:text-gray-200"><b>Name : </b>{{refe_name_data}}</li>
                                <li class="font-bold text-base pb-1 dark:text-gray-200"><b>Number : </b>{{refe_number_data}}</li>
                            </ul>
                        </div> -->

            </div>
          </div>
        </div>

        <div v-if="
        user.personal_data &&
        user.personal_data.fresherexp &&
        user.personal_data.fresherexp.Name === 'experienced'" class="dark:bg-gray-900 p-4 sm:w-2/3">
          <div class="px-0">
            <div class=" mb-7">

              <p class="py-1 px-4 text-gray-100 uppercase tracking-widest text-sm border-b bg-black border-white mb-3 font-bold">
                Experience Information
              </p>
              <ul v-if="experience === false" class="pt-2 list-outside list-disc pl-4">

                <li class="font-bold text-base pb-1 dark:text-gray-200"><b>Working Experience : </b>{{ "No" }}</li>

              </ul>

              <ul v-if="experience === true" class="pt-2 list-outside list-disc pl-4">

                <li class="font-bold text-base pb-1 dark:text-gray-200">Working Experience : {{ "Yes" }}</li>
                <li class="font-bold text-base pb-1 dark:text-gray-200">Total Experience : {{ total_experience }}</li>
                <li class="font-bold text-base pb-1 dark:text-gray-200">Type of Experience : {{ type_of_experience }}</li>
                <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="currently_working === true">Currently Working :
                  {{ "Yes" }}</li>
                <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="currently_working === false">Currently Working :
                  {{ "No" }}</li>
                <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="currently_working === false">Not working since :
                  {{ not_working_duration }}</li>

              </ul>

              <h6 v-if="experience === true && currently_working === true" class="text-green-500 underline font-bold">
                Current
                Work Information</h6>

              <ul v-if="experience === true && currently_working === true" class="pt-2 list-outside list-disc pl-4">

                <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="current_company">Company Name : {{ current_company }}</li>
                <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="current_designation">Designation Name : {{ current_designation }}</li>
                <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="current_ctc">CTC : {{ current_ctc }}</li>
                <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="current_total_experience">Total Experience : {{ current_total_experience }}</li>
                <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="notice_period_duration" >Notice Period : {{ notice_period_duration }}</li>
                <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="serving_notice_period === true">Serving Notice Period
                    :
                  {{ "Yes" }}</li>
                <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="serving_notice_period === false">Serving Notice
                    Period
                    : {{ "No" }}</li>
                <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="serving_notice_period === true">Pending Notice Period
                    :
                  {{ pending_notice_period }}</li>
                <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="skillss">Skills : {{ skillss }}</li>

              </ul>

              <h6 v-if="experience === true && previous_company_name_data" class="text-green-500 underline font-bold">
                Previous Work Information</h6>

              <ul v-if="experience === true && previous_company_name_data" class="pt-2 list-outside list-disc pl-4">

                <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="previous_company_name_data">Company Name :{{ previous_company_name_data }}</li>
                <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="previous_company_designation_data">Designation Name :
                  {{ previous_company_designation_data }}</li>
                <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="previous_company_ctc_data">CTC : {{ previous_company_ctc_data }}</li>
                <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="previous_company_years_data">Total Experience : {{ previous_company_years_data }}
                </li>
                <li class="font-bold text-base pb-1 dark:text-gray-200" v-if="previous_company_skills_data">Skills: {{ previous_company_skills_data }}</li>

              </ul>


            </div>
          </div>
        </div>

        <!-- Right Side End-->
      </div>

    </div>
  </div>
  <UploadResume v-if="resumeuplaod===true" v-model="resumeuplaod"   has-cancel/>
  <Uploadphoto v-if="photouplaod===true" v-model="photouplaod"   has-cancel/>
</template>




<script setup>
import { ref, reactive, onBeforeMount, computed } from 'vue'
import { mdiAccount, mdiAccountCircle, mdiLock, mdiMail, mdiFormTextboxPassword, mdiLifebuoy, mdiMapMarkerOutline, mdiAttachment } from '@mdi/js'
import { buttonMenuOptions } from '@/button-menu-sample-options.js'
import MainSection from '@/components/MainSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
// import { saveAs } from 'file-saver';
import Divider from '@/components/Divider.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
// import UserCard from '@/components/UserCard.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import Level from '@/components/Level.vue'
import UploadResume from '@/components/UploadResume.vue'
import Uploadphoto from '@/components/Uploadphoto.vue'
import TextLink from '@/components/TextLink.vue'
import ButtonMenu from '@/components/ButtonMenu.vue'
import BottomOtherPagesSection from '@/components/BottomOtherPagesSection.vue'
import { sessionStore } from "../stores/session";
import { useRouter, useRoute } from "vue-router";
import { themeStore } from "../stores/theme";
// import fileSaver from 'file-saver'
import axios from 'axios';
const pageLoading = ref(false)
const resumeuplaod = ref(false)
const photouplaod = ref(false)
const router = useRouter();
const user = sessionStore();
const titleStack = ref(['']);
const yop = ref(null);
const numnum = ref(1)
const tenth_cgpa_percentage = ref("");
const percentage = ref("");
const cgpa = ref("");
const ten_ygp = ref(false);
const twe_yop = ref(null);
const twe_percentage = ref("");
const twe_cgpa = ref("");
const twe_pcgpa_percentage = ref("");
const twe_ygp = ref(false);
const twe_ygp_days = ref("");
const iti_yop = ref(null);
const iti_cgpa_percentage = ref("");
const iti_percentage = ref("");
const iti_cgpa = ref("");
const iti_stream = ref(null);
const iti_college = ref(null);
const iti_university = ref(null);
const iti_otherstream = ref(false);
const iti_othercollege = ref(false);
const iti_otheruniversity = ref(false);
const iti_other_stream = ref("");
const iti_other_college = ref("");
const iti_other_university = ref("");
const iti_ygp = ref(null)
const iti_ygp_days = ref("")
const dip_yop = ref(null);
const dip_cgpa_percentage = ref("");
const dip_percentage = ref("");
const dip_cgpa = ref("");
const dip_stream = ref(null);
const dip_college = ref(null);
const dip_university = ref(null);
const dip_otherstream = ref(false);
const dip_othercollege = ref(false);
const dip_otheruniversity = ref(false);
const dip_other_stream = ref("");
const dip_other_college = ref("");
const dip_other_university = ref("");
const dip_ygp = ref(null)
const dip_ygp_days = ref("")
const deg_yop = ref(null);
const deg_type = ref(null);
const deg_other_type = ref("");
const deg_othertype = ref(false);
const deg_cgpa_percentage = ref("");
const deg_percentage = ref("");
const deg_cgpa = ref("");
const deg_stream = ref(null);
const deg_college = ref(null);
const deg_university = ref(null);
const deg_otherstream = ref(false);
const deg_othercollege = ref(false);
const deg_otheruniversity = ref(false);
const deg_other_stream = ref("");
const deg_other_college = ref("");
const deg_other_university = ref("");
const deg_yg = ref(null);
const deg_yg_year = ref("");
const mas_yop = ref(null);
const mas_type = ref(null);
const mas_other_type = ref("");
const mas_othertype = ref(false);
const mas_cgpa_percentage = ref("");
const mas_percentage = ref("");
const mas_cgpa = ref("");
const form = reactive({
  name: '',
  numberss: '',
  emaill: '',
  wrong: ''
})
const mas_stream = ref(null);
const mas_college = ref(null);
const mas_university = ref(null)
const mas_otherstream = ref(false);
const mas_othercollege = ref(false);
const mas_otheruniversity = ref(false);
const mas_other_stream = ref("");
const mas_other_college = ref("");
const mas_other_university = ref("");
const mas_yg = ref(null);
const mas_yg_year = ref("");
const relocate = reactive([]);
const emer_name = reactive([]);
const emer_number = reactive([]);
const refe_name = reactive([]);
const refe_number = reactive([]);
const previous_company_name = reactive([]);
const previous_company_designation = reactive([]);
const previous_company_ctc = reactive([]);
const previous_company_years = reactive([]);
const previous_company_skills = reactive([]);
const previous_company_name_data = ref("");
const previous_company_designation_data = ref("");
const previous_company_ctc_data = ref("");
const previous_company_years_data = ref("");
const previous_company_skills_data = ref("");
const emer_relation = reactive([]);
const company = ref(null);
const other_company = ref(false);
const othercompany = ref("");
const job_change = ref(false);
const durationofnoticeperiod = ref(null);
const workingsincemonth = ref(null);
const workingsinceyear = ref(null);
const workingtillyear = ref(null);
const workingtillmonth = ref(null);
const servingnoticeperiod = ref(false);
const version = ref("");
const lastusedyear = ref(false);
const describeyourprofessional = ref("");
const skill = ref("");
const ctc = ref("");
const specialization = ref("");
const experienced = ref(null);
const comp_industry = ref(null);
const emp_designation = reactive([]);
const emp_company = reactive([]);
const emp_workingsince = reactive([]);
const emp_workingtill = reactive([]);
const emp_othercompany = reactive([]);
const emp_other_company = reactive([]);
const contactss = reactive([]);
const contactss_data = ref("");
const emailss = reactive([]);
const emailss_data = ref("");
const emer_name_data = ref("")
const emer_number_data = ref("");
const emer_relation_data = ref("");
const to_relocate = ref(false);
const relocate_data = ref("");
const refe_name_data = ref("");
const refe_number_data = ref("");
const emp_designation_data = ref("");
const emp_company_data = ref("");
const emp_othercompany_data = ref("");
const emp_workingsince_data = ref("");
const emp_workingtill_data = ref("");
const skill_name_data = ref("");
const skill_version_data = ref("");
const skill_lastused_data = ref("");
const skill_experienceyear_data = ref("");
const skill_experiencemonth_data = ref("");
const fresh = ref("")
const name = ref("");
const gender = ref(false);
const dob = ref("");
const aadhar_number = ref(null);
const pan_card = ref(null);
const passport = ref(null);
const highest_degree = ref("");
const highest_yop = ref(null);
const thumbnail100 = ref("");
const studentresume = ref("");
const studentimage = ref("");
const address = ref("");
const state = ref("");
const district = ref("");
const temp_addresss = ref("");
const temp_statee = ref("");
const temp_districtt = ref("");
const linkedinurl = ref("");
const twitterurl = ref("");
const instagramurl = ref("");
const facebookurl = ref("");
const naukriurl = ref("");
const temp_address = ref("");
const userSwitchVal = ref([])
const current_user = ref("");
const branch = reactive([]);
const batch = reactive([]);
const theme = themeStore();
const experience = ref(null)
const type_of_experience = ref(null)
const currently_working = ref(null)
const not_working_duration = ref(null)
const current_company = ref("")
const current_designation = ref("")
const current_ctc = ref("")
const current_total_experience = ref("")
const total_experience = ref("")
const notice_period_duration = ref("")
const serving_notice_period = ref(false)
const pending_notice_period = ref("")
const skillss = ref("")

const online = computed(() =>  user.isonline);
const studentresumes = computed(() =>  user.studentresume);

const resumeupload = async () => {
  resumeuplaod.value=true
};

const photoupload = async () => {
  photouplaod.value=true
};

const resumedownload = async () => {
  pageLoading.value=true
  // window.location.assign("https://gotest.qspiders.com/resumes/"+studentresume.value,'_blank')
  window.open("https://gotest.qspiders.com/resumes/"+studentresumes.value, '_blank');
  pageLoading.value=false
};




onBeforeMount(async () => {
  await user.checkonlines();
  theme.setPageTitle("View Placement Form")
  pageLoading.value = true
  window.scrollTo(0, 0);
  await user.checkUser();
  if (user.$state.loggedIn === false) {
    router.push("/login");

  }
  else {
    if(online.value===true){
    await user.getvalidations();
    if (user.validation_status===200){
    if(user.validation.studentcourse===false){
      router.push("/pay_directly")
    }
    else if(user.validation.studentcourse===true&&user.validation.studentbatch===false){
      router.push("/add_regcode")
    }
    else if(user.validation.other===false){
      router.push("/profile")
    }
    else{
    router.push("/view_profile");
    }
    }
    else{
      await user.logout()
      router.go()

    }

  await user.getstudent();
  form.name = user.personal_data.name
  form.numberss = user.studentcontact
  form.emaill = user.studentemail
  name.value = user.studentname
  fresh.value = user.personal_data.fresherexp.Name
  gender.value = user.personal_data.gender.name
  dob.value = user.personal_data.dateofbirth
  aadhar_number.value = user.personal_data.aadharcard
  pan_card.value = user.personal_data.pancard
  passport.value = user.personal_data.passport
 if(user.educational_data&&user.educational_data.highestdegree&&user.educational_data.highestdegree.name){
    highest_degree.value = user.educational_data.highestdegree.name
  }
  highest_yop.value = user.personal_data.highestyop
  if(user.personal_data&&user.personal_data.permanentaddress&&user.personal_data.permanentaddress.address){
    address.value = user.personal_data.permanentaddress.address
  }
  if(user.personal_data&&user.personal_data.permanentaddress&&user.personal_data.permanentaddress.state_id&&user.personal_data.permanentaddress.state_id.name){
    state.value = user.personal_data.permanentaddress.state_id.name
  }
  if(user.personal_data&&user.personal_data.permanentaddress&&user.personal_data.permanentaddress.district_id&&user.personal_data.permanentaddress.district_id.name){
    district.value = user.personal_data.permanentaddress.district_id.name
  }
  if(user.personal_data&&user.personal_data.tempaddress&&user.personal_data.tempaddress.address){
    temp_addresss.value = user.personal_data.tempaddress.address
  }
  if(user.personal_data&&user.personal_data.tempaddress&&user.personal_data.tempaddress.state_id&&user.personal_data.tempaddress.state_id.name){
    temp_statee.value = user.personal_data.tempaddress.state_id.name
  }
  if(user.personal_data&&user.personal_data.tempaddress&&user.personal_data.tempaddress.district_id&&user.personal_data.tempaddress.district_id.name){
    temp_districtt.value = user.personal_data.tempaddress.district_id.name
  }
  // temp_address.value = user.personal_data.tempaddress.district_id.name
  thumbnail100.value = user.studentthumbnail
  // studentresume.value = user.studentresume
  studentimage.value = user.studentimages
  linkedinurl.value = user.personal_data.linkedinurl
  twitterurl.value = user.personal_data.twitterurl
  instagramurl.value = user.personal_data.instagramurl
  facebookurl.value = user.personal_data.facebookurl
  naukriurl.value = user.personal_data.naukriurl
  if(user.other_data.relocation){
     to_relocate.value = user.other_data.relocation.ready_to_relocate
  }
 
  if (user.educational_data && user.educational_data.tenth && user.educational_data.tenth.yop) {
    yop.value = user.educational_data.tenth.yop
    tenth_cgpa_percentage.value = user.educational_data.tenth.cgpa_percentage
    percentage.value = user.educational_data.tenth.percentage
    cgpa.value = user.educational_data.tenth.cgpa
    ten_ygp.value = user.educational_data.tenth.ygtenth
  }
  if (user.educational_data && user.educational_data.twelth && user.educational_data.twelth.yop) {
    twe_yop.value = user.educational_data.twelth.yop
    twe_pcgpa_percentage.value = user.educational_data.twelth.cgpa_percentage
    twe_percentage.value = user.educational_data.twelth.percentage
    twe_cgpa.value = user.educational_data.twelth.cgpa
    twe_ygp.value = user.educational_data.twelth.ygtwelth
    twe_ygp_days.value = user.educational_data.twelth.ygyear
  }
  if (user.educational_data && user.educational_data.iti && user.educational_data.iti.yop) {
    iti_yop.value = user.educational_data.iti.yop
    iti_cgpa_percentage.value = user.educational_data.iti.cgpa_percentage
    iti_percentage.value = user.educational_data.iti.percentage
    iti_cgpa.value = user.educational_data.iti.cgpa
    if (user.educational_data.iti.stream) {
      iti_stream.value = user.educational_data.iti.stream.name
    }
    if (user.educational_data.iti.college) {
      iti_college.value = user.educational_data.iti.college.name
    }
    if (user.educational_data.iti.university) {
      iti_university.value = user.educational_data.iti.university.name
    }
    iti_otherstream.value = user.educational_data.iti.otherstream
    iti_othercollege.value = user.educational_data.iti.othercollege
    iti_other_stream.value = user.educational_data.iti.other_stream
    iti_other_college.value = user.educational_data.iti.other_college
    iti_otheruniversity.value = user.educational_data.iti.otheruniversity
    iti_other_university.value = user.educational_data.iti.other_university
    iti_ygp.value = user.educational_data.iti.ygiti
    iti_ygp_days.value = user.educational_data.iti.ygyear
  }
  if (user.educational_data && user.educational_data.diploma && user.educational_data.diploma.yop) {
    dip_yop.value = user.educational_data.diploma.yop
    dip_cgpa_percentage.value = user.educational_data.diploma.cgpa_percentage
    dip_percentage.value = user.educational_data.diploma.percentage
    dip_cgpa.value = user.educational_data.diploma.cgpa
    if (user.educational_data.diploma.stream) {
      dip_stream.value = user.educational_data.diploma.stream.name
    }
    if (user.educational_data.diploma.college) {
      dip_college.value = user.educational_data.diploma.college.name
    }
    if (user.educational_data.diploma.university) {
      dip_university.value = user.educational_data.diploma.university.name
    }
    dip_otherstream.value = user.educational_data.diploma.otherstream
    dip_othercollege.value = user.educational_data.diploma.othercollege
    dip_other_stream.value = user.educational_data.diploma.other_stream
    dip_other_college.value = user.educational_data.diploma.other_college
    dip_otheruniversity.value = user.educational_data.diploma.otheruniversity
    dip_other_university.value = user.educational_data.diploma.other_university
    dip_ygp.value = user.educational_data.diploma.ygdiploma
    dip_ygp_days.value = user.educational_data.diploma.ygyear
  }
  if (user.educational_data && user.educational_data.degree && user.educational_data.degree.yop) {
    deg_yop.value = user.educational_data.degree.yop
    if (user.educational_data.degree.degree) {
      deg_type.value = user.educational_data.degree.degree.name
    }
    deg_cgpa_percentage.value = user.educational_data.degree.cgpa_percentage
    deg_percentage.value = user.educational_data.degree.percentage
    deg_cgpa.value = user.educational_data.degree.cgpa
    if (user.educational_data.degree.stream) {
      deg_stream.value = user.educational_data.degree.stream.name
    }
    if (user.educational_data.degree.college) {
      deg_college.value = user.educational_data.degree.college.name
    }
    if (user.educational_data.degree.university) {
      deg_university.value = user.educational_data.degree.university.name
    }
    deg_other_type.value = user.educational_data.degree.other_degree
    deg_othertype.value = user.educational_data.degree.otherdegree
    deg_otherstream.value = user.educational_data.degree.otherstream
    deg_othercollege.value = user.educational_data.degree.othercollege
    deg_otheruniversity.value = user.educational_data.degree.otheruniversity
    deg_other_stream.value = user.educational_data.degree.other_stream
    deg_other_college.value = user.educational_data.degree.other_college
    deg_other_university.value = user.educational_data.degree.other_university
    deg_yg.value = user.educational_data.degree.ygdeg
    deg_yg_year.value = user.educational_data.degree.ygyear
  }
  if (user.educational_data && user.educational_data.master && user.educational_data.master.yop) {
    mas_yop.value = user.educational_data.master.yop
    if (user.educational_data.master.master) {
      mas_type.value = user.educational_data.master.master.name
    }
    mas_cgpa_percentage.value = user.educational_data.master.cgpa_percentage
    mas_percentage.value = user.educational_data.master.percentage
    mas_cgpa.value = user.educational_data.master.cgpa
    if (user.educational_data.master.stream) {
      mas_stream.value = user.educational_data.master.stream.name
    }
    if (user.educational_data.master.college) {
      mas_college.value = user.educational_data.master.college.name
    }
    if (user.educational_data.master.university) {
      mas_university.value = user.educational_data.master.university.name
    }
    mas_other_type.value = user.educational_data.master.other_master
    mas_othertype.value = user.educational_data.master.othermaster
    mas_otherstream.value = user.educational_data.master.otherstream
    mas_othercollege.value = user.educational_data.master.othercollege
    mas_other_stream.value = user.educational_data.master.other_stream
    mas_other_college.value = user.educational_data.master.other_college
    mas_other_university.value = user.educational_data.master.other_university
    mas_otheruniversity.value = user.educational_data.master.otheruniversity
    mas_yg.value = user.educational_data.master.ygmas
    mas_yg_year.value = user.educational_data.master.ygyear
  }
  if (user.other_data.relocation && user.other_data.relocation.location) {
    for (var i = 0; i < user.other_data.relocation.location.length; i++) {
      relocate.push(user.other_data.relocation.location[i].name)
      relocate_data.value = JSON.stringify(relocate).replace(/[\[\]']+/g, '').replaceAll("\"", "")
    }

  }
  if (user.other_data.emergencycontact) {

    for (var i = 0; i < user.other_data.emergencycontact.length; i++) {

      emer_name.push(user.other_data.emergencycontact[i].name)
      emer_number.push(user.other_data.emergencycontact[i].code+""+user.other_data.emergencycontact[i].number)
      emer_relation.push(user.other_data.emergencycontact[i].relation)

      emer_name_data.value = JSON.stringify(emer_name).replace(/[\[\]']+/g, '').replaceAll("\"", "")

      emer_number_data.value = JSON.stringify(emer_number).replace(/[\[\]']+/g, '').replaceAll("\"", "")

      emer_relation_data.value = JSON.stringify(emer_relation).replace(/[\[\]']+/g, '').replaceAll("\"", "")
    }

  }
  if (user.contactarray) {

    for (var i = 0; i < user.contactarray.length; i++) {
      // console.log(user.contactarray[i].code)
      contactss.push(user.contactarray[i].code+""+user.contactarray[i].number)
      // console.log(contactss)
      contactss_data.value = JSON.stringify(contactss).replace(/[\[\]']+/g, '').replaceAll("\"", " ")
      // console.log(contactss_data)
    }

  }
  if (user.emailarray) {

    for (var i = 0; i < user.emailarray.length; i++) {

      emailss.push(user.emailarray[i].email)
      emailss_data.value = JSON.stringify(emailss).replace(/[\[\]']+/g, '').replaceAll("\""," ")

    }

  }
  if (user.refer_data) {
    for (var i = 0; i < user.refer_data.length; i++) {
      refe_name.push(user.refer_data[i].name)
      refe_number.push(user.refer_data[i].code+""+user.refer_data[i].number)
      refe_name_data.value = JSON.stringify(refe_name).replace(/[\[\]']+/g, '').replaceAll("\"", " ")
      refe_number_data.value = JSON.stringify(refe_number).replace(/[\[\]']+/g, '').replaceAll("\"", " ")
    }

  }
  if (user.experience_data) {
    if (user.experience_data) {
      experience.value = user.experience_data.experience
      total_experience.value = user.experience_data.total_experience_duration
      type_of_experience.value = user.experience_data.type_of_experience
      currently_working.value = user.experience_data.working
      not_working_duration.value = user.experience_data.not_working_duration
      current_company.value = user.experience_data.company
      current_designation.value = user.experience_data.designation
      current_ctc.value = user.experience_data.ctc
      current_total_experience.value = user.experience_data.current_total_experience
      notice_period_duration.value = user.experience_data.totalnoticeperioddays
      pending_notice_period.value = user.experience_data.noticeperioddaysleft
      serving_notice_period.value = user.experience_data.servingnoticeperiod
      skillss.value = user.experience_data.skills
      if (user.experience_data.previous_company) {
        for (var i = 0; i < user.experience_data.previous_company.length; i++) {
          previous_company_name.push(user.experience_data.previous_company[i].company)
          previous_company_designation.push(user.experience_data.previous_company[i].designation)
          previous_company_ctc.push(user.experience_data.previous_company[i].ctc)
          previous_company_years.push(user.experience_data.previous_company[i].years)
          previous_company_skills.push(user.experience_data.previous_company[i].skills)
          previous_company_name_data.value = JSON.stringify(previous_company_name).replace(/[\[\]']+/g, '').replaceAll("\"", "")
          previous_company_designation_data.value = JSON.stringify(previous_company_designation).replace(/[\[\]']+/g, '').replaceAll("\"", "")
          previous_company_ctc_data.value = JSON.stringify(previous_company_ctc).replace(/[\[\]']+/g, '').replaceAll("\"", "")
          previous_company_years_data.value = JSON.stringify(previous_company_years).replace(/[\[\]']+/g, '').replaceAll("\"", "")
          previous_company_skills_data.value = JSON.stringify(previous_company_skills).replace(/[\[\]']+/g, '').replaceAll("\"", "")
        }
      }
    }


    // }
    // if(user.experience_data.other_company===true){
    //   othercompany.value = user.experience_data.othercompany
    // }
    // if(user.experience_data.designation){
    //   current_designation.value = user.experience_data.designation.name
    // }
    // if(user.experience_data.noticeperioddaysleft){
    //   durationofnoticeperiod.value = user.experience_data.noticeperioddaysleft
    // }
    // if(user.experience_data.workingsince){
    //   workingsincemonth.value = user.experience_data.workingsince
    // }
    // if(user.experience_data.workingtill){
    //   workingtillmonth.value = user.experience_data.workingtill
    // }
    // if(user.experience_data.servingnoticeperiod){
    //   servingnoticeperiod.value = user.experience_data.servingnoticeperiod
    // }
    // if(user.experience_data.describeyourprofessionalbackground){
    //   describeyourprofessional.value = user.experience_data.describeyourprofessionalbackground
    // }

    // if(user.experience_data.ctc){
    //   ctc.value = user.experience_data.ctc
    // }
    // if(user.experience_data.specialization){
    //   specialization.value = user.experience_data.specialization.name
    // }
    // if(user.experience_data.companyindustry){
    //   comp_industry.value = user.experience_data.companyindustry.name
    // }
    // if(user.experience_data.companies)
    // {
    //   for (var i = 0; i < user.experience_data.companies.length; i++) {

    //   emp_designation.push(user.experience_data.companies[i].designation.name)
    //   emp_company.push(user.experience_data.companies[i].company.name)
    //   emp_workingsince.push(user.experience_data.companies[i].workingsince)
    //   emp_workingtill.push(user.experience_data.companies[i].workingtill)
    //   if(user.experience_data.companies[i].other_company===true){
    //     emp_othercompany.push(user.experience_data.companies[i].othercompany)
    //     emp_othercompany_data.value=JSON.stringify(emp_othercompany).replace(/[\[\]']+/g,'').replaceAll("\"", "")
    //   }
    //   emp_designation_data.value=JSON.stringify(emp_designation).replace(/[\[\]']+/g,'').replaceAll("\"", "")
    //   emp_company_data.value=JSON.stringify(emp_company).replace(/[\[\]']+/g,'').replaceAll("\"", "")
    //   emp_workingsince_data.value=JSON.stringify(emp_workingsince).replace(/[\[\]']+/g,'').replaceAll("\"", "")
    //   emp_workingtill_data.value=JSON.stringify(emp_workingtill).replace(/[\[\]']+/g,'').replaceAll("\"", "")
    //   }
    // }
  }
  }
  else{
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  }


  // window.onpopstate = event => {
  //             router.push("/");
  //         };
  pageLoading.value = false
    
    // else{
    //   theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    // }
  }
 
});


function downloadWithAxios ({ url, label }) {
    axios.get("https://gotest.qspiders.com/resumes/"+studentresumes.value, {headers: {
                    //   get: {
                    //   "Access-Control-Allow-Origin": "*"
                    // },
                    responseType: 'blob',
                    "Access-Control-Allow-Origin":"https://gotest.qspiders.com/resumes/"+studentresumes.value,
                    "Content-Disposition": "https://gotest.qspiders.com/resumes/"+studentresumes.value,
                    "Content-Type": "application/octet-stream"
                }},)
      .then(response => {
        // console.log("response",response)
        const blob = new Blob([response.data], { type: 'application/pdf' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = studentresumes.value
        link.click()
        URL.revokeObjectURL(link.href)
      }).catch(console.error)
  }
const downloadWithAxioss = (url,name) => {
  fileSaver.saveAs("https://gotest.qspiders.com/resumes/"+studentresumes.value,studentresumes.value);
  // Axios.get(`https://gotest.qspiders.com/resumes/` + studentresumes.value, {
  //   responseType: 'blob',
  // }).then(response =>
  // {
  //   saveAs(new Blob([response.data], { type: 'application/json' }), response.filename, { autoBOM: false });
  // });
      // axios({
      //   method: 'get',
      //   url: "https://gotest.qspiders.com/resumes/"+studentresumes.value,
      //   responseType: 'arraybuffer'
      // })
      // .then(response => {
        
      //   forceFileDownload(response)
        
      // })
      // .catch(() => console.log('error occured'))
    }



const values = ref(true)

</script>


<style>
@media (min-width: 1440px) {
  .width {
    width: 60% !important;
  }
}
</style>