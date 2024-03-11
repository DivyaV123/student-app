
<template>
  <main-section v-if="show_education===false&&show_experience===false&&show_other===false">
    <div class="grid grid-cols-1 gap-6  xl:grid-cols-4 ">
      <card-component :smallerPadding="true"  v-if="pageLoading" class="mb-6">
          <div wire:loading class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
          <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
          <p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
        </div>
        </card-component>
      <card-component v-else
        class="lg:mb-0 lg:col-span-2 xl:col-span-4 text-amber-300"
        :hasprofilepadding="true"
      >
      <div class="max-w-full mx-auto my-4  pb-0">	
	<div class="flex pt-0">
		<div class="flex-1">
		</div>
		<div class="flex-1">
			<div class="w-10 h-10 bg-gray-900 mx-auto text-lg text-white flex items-center">
				<jb-button class="text-center w-auto h-full text-xs" :color="user.personal_data&&user.personal_data.gender?'white':'info'" :icon="user.personal_data&&user.personal_data.gender?mdiCheck:mdiAccountAlertOutline"></jb-button>
  

			</div>
      <div class="flex text-xs content-center text-center items-center justify-center" :class="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'?'font-bold text-white':'font-bold text-white'">
        <label class="content-center text-center items-center" v-if="user.personal_data&&user.personal_data.gender" for="html">Personal Details
        </label>
        <label v-else for="html">Add Personal Details
        </label>
		</div>

		</div>


		<div :class="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'?'w-1/6 align-center items-center align-middle content-center flex':'w-1/4 align-center items-center align-middle content-center flex'">
			<div :class="user.personal_data&&user.personal_data.gender?'w-full bg-blue-500  items-center align-middle align-center flex-1':'w-full bg-grey-300  items-center align-middle align-center flex-1'">
			 	<div class="text-xs leading-none py-1 text-center text-white rounded" :style="user.personal_data&&user.personal_data.gender?'width: 100%':'width: 0%'"></div>
			</div>
		</div>
	
		
		<div class="flex-1">
			<div class="w-10 h-10 bg-gray-900 mx-auto rounded-full text-lg text-white flex items-center">
				<jb-button class=" text-center w-full h-full" :color="user.educational_data&&user.educational_data.tenth&&user.educational_data.tenth.yop?'white':'info'" :icon="user.educational_data&&user.educational_data.tenth&&user.educational_data.tenth.yop?mdiCheck:mdiBookEducation"  v-on:click="user.personal_data&&user.personal_data.gender? educational() : null"></jb-button>
			</div>		
		<div class="flex text-xs content-center text-center items-center w-auto justify-center" :class="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'?'font-bold text-white':'font-bold text-white'">
	
  <label v-if="user.educational_data&&user.educational_data.tenth&&user.educational_data.tenth.yop" for="html">Educational Details
    </label>
    <label v-else for="html">Add Educational details
    </label>
</div>
		</div>
	
		<div :class="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'?'w-1/6 align-center items-center align-middle content-center flex':'w-1/4 align-center items-center align-middle content-center flex'">
			<div :class="user.educational_data&&user.educational_data.tenth&&user.educational_data.tenth.yop?'w-full bg-blue-600  items-center align-middle align-center flex-1':'w-full bg-grey-300  items-center align-middle align-center flex-1'">
			 	<div class=" text-xs leading-none py-1 text-center text-white rounded " :style="user.educational_data&&user.educational_data.tenth&&user.educational_data.tenth.yop?'width: 100%':'width: 0%'"></div>
			</div>
		</div>
	
		<div class="flex-1" v-if="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'">
			<div class="w-10 h-10 bg-gray-900  mx-auto text-lg text-white flex items-center">
				<jb-button class=" text-center w-full h-full" :color="user.experience_data&&user.experience_data.company&&user.experience_data.company.name?'white':'info'"  :icon="user.experience_data&&user.experience_data.company&&user.experience_data.company.name?mdiCheck:mdiAccountCogOutline"  v-on:click="user.personal_data&&user.educational_data.tenth&&user.educational_data.tenth.yop? experience() : null"></jb-button>
			</div>
      <div class="font-bold text-white flex text-xs content-center text-center items-center w-auto justify-center" v-if="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'">
			
      <label v-if="user.experience_data&&user.experience_data.company&&user.experience_data.company.name" for="html">Experience Details
        </label>
        <label v-else for="html">Add Experience details
        </label>
		</div>
		</div>
	
	
		<div  v-if="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'" class='w-1/6 align-center items-center align-middle content-center flex'>
			<div v-if="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'"
          :class="
            user.experience_data &&
            user.experience_data.company &&
            user.experience_data.company.name
              ? 'w-full bg-blue-600  items-center align-middle align-center flex-1'
              : 'w-full bg-grey-300  items-center align-middle align-center flex-1'
          "
        >
			 	<div
                  class="
                    text-xs
                    leading-none
                    py-1
                    text-center text-white
                    rounded
                  "
                  :style="
                    user.experience_data &&
                    user.experience_data.company &&
                    user.experience_data.company.name
                      ? 'width: 100%'
                      : 'width: 0%'
                  "
                ></div>
			</div>
		</div>


		<div class="flex-1">
			<div class="w-10 h-10 bg-gray-900  mx-auto  text-lg text-white flex items-center">
				<jb-button
                  class="text-center w-full h-full"
                  :color="user.other_data?'white':'info'" 
                  :icon="user.other_data?mdiCheck:mdiExitRun"
                  v-on:click="
                    (user.personal_data &&
                      user.personal_data.fresherexp &&
                      user.personal_data.fresherexp.Name == 'experienced' &&
                      user.experience_data &&
                      user.experience_data.company &&
                      user.experience_data.company.name) ||
                    (user.personal_data &&
                      user.personal_data.fresherexp &&
                      user.personal_data.fresherexp.Name == 'fresher' &&
                      user.educational_data &&
                      user.educational_data.tenth &&
                      user.educational_data.tenth.yop)
                      ? other()
                      : null
                  "
                ></jb-button>
			</div>
      <div class="flex text-xs content-center text-center items-center w-auto justify-center" :class="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'?'font-bold text-white':'font-bold text-white'">
			<label v-if="user.other_data" for="html">Other Details
        </label>
        <label v-else for="html">Add Other Details
        </label>
		</div>	
		</div>
	
	
		<div class="flex-1">
		</div>		
	</div>
	
	<div class="flex text-xs content-center text-center items-center w-auto">

	</div>
 <!-- ((!form.name.replace(/\s+/g, '').length)&&(/^[\.]+$/.test(form.name))&&(!(/^[a-zA-Z\s\.]+$/.test(form.name)))) -->
      <div class="grid md:grid-cols-3 xl:grid-cols-5 sm:grid-cols-2 gap-1 pt-2">
       <field label="Name" :error="
                          ((form.name.replace(/\s+/g, '').length)&&(!/^[\.]+$/.test(form.name))&&((/^[a-zA-Z\s]+$/.test(form.name))))
                            ? false
                            : 'Add valid name'" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700">
            <control
            v-model="form.name"
            name="URL"
            placeholder="Enter Name here"
            autocomplete="username"
            />
        </field>
 
      <field label="Date of Birth" :error="form.dateofbirth !== null ? false : true" vertical help="Please select Date of Birth" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700"> 
        <div>

            <input type="date" v-model="form.dateofbirth" onkeydown="return false"
            :max="dayjs(dates_value).subtract(16, 'year').format('YYYY-MM-DD')"
            class="w-full border border-white bg-gray-700 py-1 pl-2 pr-2 h-[38px] text-white"
             >
        </div>
      </field>

          <field label="Gender" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700" :error="form.gender !== null ? false : true" help="Please search gender here">
        <div class="flex flex-wrap margin ">
           <Multiselect
                v-model="form.gender"
                valueProp="id"
                label="name"
                class="border border-white text-xs text-white"
                searchable
                placeholder="Search Gender here"
                track-by ="name"
                :object="true"
                :classes="selectClasses" 
                :options="studentgender"
              />
        </div>
      </field>
<!-- 
      <field
          label="Upload Passport Size Photo"
          help="Photo size should be less than 5mb"
          :error="image_error"
          class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700"
    
        >
        <div>
          <input
            class="
            bg-gray-800
            border-gray-700 border
            py-1 px-2
            w-full
            text-white
            "
            id="file"
            ref="file"
            type="file"
            name="file"
            accept="image/png, image/jpg, image/jpeg, image/jfif,image/PNG, image/JPG, image/JPEG, image/JFIF"
            v-on:change="onFileChange"
            onchange="document.getElementById('img-show').src = window.URL.createObjectURL(this.files[0]); document.getElementById('img-show').style.height = '6rem'"
          />
          
        </div>
        </field>
        <img id="img-show" v-if="isSaveOpen" class="ml-2" /> -->

      
        <!-- <field
          label="My Profile Photo"
          class="text-white text-sm"
    
        > -->
        <!-- <figure v-if="show_images===true" class="justify-start lg:ml-8 pt-0" >
        <img :src="`https://gotest.qspiders.com/images/${studentimagess}`" class = "sm:w-[30%] md:w-[40%] xl:w-[50%] h-[100px] rounded-full"  @click="imageresize=true">
        </figure> -->
<!-- </field> -->
      </div>

      <div class="grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 gap-1 pb-0">
  

       <!-- <field label="Highest Degree" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700" :error="highdeg_error" help="Please search highest degree here">
            <Multiselect
            v-model="form.highestdegree"
            valueProp="id"
            label="name"
            class="border border-white text-xs text-white"
            searchable
            placeholder="Search highest degree here"
            track-by ="name"
            :classes="selectClasses" 
            @click="changing"
            :object="true"
            :options="studentdegree"
          />
       </field> -->

      <field label="Do you have Aadhar card?" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700" :error="form.aadharcard !== null ? false : true">
        <div>
              <label class="cursor-pointer label" for="aadhyes">
                <span class="label-text font-bold pr-1 text-white text-sm">Yes</span> 
                <input type="radio"
                      id="aadhyes"
                      name="aadhar"
                      :value="true"
                      :native-value="true"
                      v-model="form.aadharcard" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm">
              </label>
              <label class="cursor-pointer label" for="aadhno">
                <span class="label-text font-bold pl-4 pr-1 text-white text-sm">No</span> 
                <input type="radio"
                      id="aadhno"
                      name="aadhar"
                      :value="false"
                      :native-value="false"
                      v-model="form.aadharcard" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm">
              </label> 
            </div> 
       </field>

        <field label="Do you have Passport?" :error="form.passport !== null ? false : true" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700" >
         <div>
            <label class="cursor-pointer label" for="passyes">
              <span class="label-text font-bold pr-1 text-white text-sm">Yes</span> 
              <input type="radio"
                    id="passyes"
                    name="passport"
                    :value="true"
                    :native-value="true"
                    v-model="form.passport" class="radio radio-info radio-md w-5 h-5 align-middle pl-1">
            </label>
            <label class="cursor-pointer label" for="passno">
              <span class="label-text font-bold pl-4 pr-1 text-white text-sm">No</span> 
              <input type="radio"
                    id="passno"
                    name="passport"
                    :value="false"
                    :native-value="false"
                    v-model="form.passport" class="radio radio-info radio-md w-5 h-5 align-middle pl-1">
            </label> 
          </div> 
       </field>
       <div class="">
      <field label="Do you have Pancard?" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700"  :error="form.pancard !== null ? false : true"
          > 
        <div>
            <label class="cursor-pointer label" for="panyes">
              <span class="label-text font-bold pr-1 text-white text-sm">Yes</span> 
              <input type="radio"
                    id="panyes"
                    name="pan_card"
                    :value="true"
                    :native-value="true"
                    v-model="form.pancard" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm">
            </label>
            <label class="cursor-pointer label" for="panno">
              <span class="label-text font-bold pl-4 pr-1 text-white text-sm">No</span> 
              <input type="radio"
                    id="panno"
                    name="pan_card"
                    :value="false"
                    :native-value="false"
                    v-model="form.pancard" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm">
            </label> 
          </div> 
      </field> 
       </div>
         <!-- <field
          label="Upload Resume"
          help="Upload resume for placement purpose"
          :error="image_error"
          class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700"
    
        >
        <div>
          <input
            class="
            bg-gray-800
            border-gray-700 border
            py-1 px-2
            w-full
            text-white
            "
            id="file1"
            ref="file"
            type="file"
            name="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/msword, application/pdf,.doc,.docx"
            v-on:change="onFileChange1"

          />
          
        </div>
        </field> -->
      </div>
</div>

      <div class="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:grid-cols-2 gap-1 pb-0">
        <field label="Your Linkedin URL" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700">
            <control
            v-model="form.linkedinurl"
            :icon-right="mdiAccount"
            name="URL"
            placeholder="url"
            autocomplete="username"
            />
        </field>
         <field label="Your Twitter URL" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700">
            <control
            v-model="form.twitterurl"
            :icon-right="mdiAccount"
            name="URL"
            placeholder="url"
            autocomplete="username"
            />
        </field>
          <field label="Your Instagram URL" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700">
            <control
            v-model="form.instagramurl"
            :icon-right="mdiAccount"
            name="URL"
            placeholder="url"
            autocomplete="username"
            />
        </field>
          <field label="Your Facebook URL" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700">
            <control
            v-model="form.facebookurl"
            :icon-right="mdiAccount"
            name="URL"
            placeholder="url"
            autocomplete="username"
            />
        </field>
      </div>
      <div class="grid md:grid-cols-2 sm:grid-cols-2 gap-3 pt-0">
        <div>
      <div 
          class="
              w-full
              text-white text-center
              font-semibold
                rounded-lg
              pl-1
              pr-1
              bg-black
              py-2
          "
          >
          Current Address
          </div>
  
     <div class="grid md:grid-cols-2 xl:grid-cols-3 sm:grid-cols-1 gap-1">
        <field label="State" :error="form.tempaddress.state_id !== null ? false : true"  class="text-white text-sm box-border h-24 w-50 border-2 border-gray-700" help="Please search temporary address state(Not mandatory outside India)"> 

           <Multiselect
                          v-model="form.tempaddress.state_id"
                          valueProp="id"
                          label="name"
                          class="border border-white text-xs text-white"
                          searchable
                          placeholder="Search state here"
                          track-by ="name"
                          :classes="selectClasses"
                          @select="statechange(form.tempaddress.state_id)"
                          :object="true"
                          @search-change="fetchstate"
                          :options="states_value"
            />
       </field>
        
        <field v-if="form.tempaddress.state_id!=null" label="District" :error="form.tempaddress.district_id !== null ? false : true" class="text-white text-sm box-border h-24 w-50  border-2 border-gray-700" help="Please search temporary address district(Not mandatory outside India)">
       <Multiselect
            v-model="form.tempaddress.district_id"
            valueProp="id"
            label="name"
            class="border border-white text-xs text-white"
            searchable
            placeholder="Search district here"
            track-by ="name"
            :classes="selectClasses" 
            @select="tempdistrictchange(form.tempaddress.state_id)"
            :object=true
            @search-change="fetchdistricts"
            :options="districts"
          />
        </field>
        <field v-if="form.tempaddress.district_id!=null&&form.tempaddress.otherpincode == false" label="Pincode" :error="form.tempaddress.pincode !== null ? false : true" class="text-white text-sm box-border h-24 w-50  border-2 border-gray-700" help="Please enter your pincode(Not mandatory outside India)">
       <Multiselect
            v-model="form.tempaddress.pincode"
            valueProp="id"
            label="name"
            class="border border-white text-xs text-white"
            searchable
            placeholder="Search pincode here"
            track-by ="name"
            :classes="selectClasses" 
            @click="temppincodechange()"
            :object=true
            @search-change="fetchtemppincode"
            :options="studentpincode"
          />
        </field>
          <field v-if="form.tempaddress.district_id!=null"
              help="Please select other pincode option if pincode is not present in the options(Not mandatory outside India)"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <check-radio-picker
                v-model="form.tempaddress.otherpincode"
                name="sample-checkbox-two"
                class="font-bold"
                :options="checkboxOptions5"
                column
                @click="tempothpincodechange()"
              />
            </field>

            <field 
              v-if="form.tempaddress.otherpincode == true"
              label="Pincode Name"
              :error="
                    ((form.tempaddress.other_pincode.replace(/\s+/g, '').length)&&(!/^[\.]+$/.test(form.tempaddress.other_pincode))&&(!isNaN(form.tempaddress.other_pincode.replace(/\s+/g, ''))))
                      ? false
                      : 'Add valid Other Pincode(Not mandatory outside India)'"
              help="Please enter Pincode name"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <control
                v-model="form.tempaddress.other_pincode"
                name="Other Pincode Name"
                placeholder="Enter Pincode name"
                autocomplete="username"
                @click="tempoth_pincodechange()"
              />
            </field>
        <!-- <field label="Pincode" :error="temppincode_error" help="Please enter your pincode" class="text-white text-sm box-border h-24 w-50  border-2 border-gray-700">
            <control
              v-model="form.tempaddress.pincode"
              name="name"
              :icon-right="mdiAccount"
              @click="temppincodechange()"
              class="text-xs"
              autocomplete="username"
              placeholder="Enter your pincode"

            />
          </field> -->
       <field
          label="Address"
          help="Please enter temporary address here"
          :error="
                ((form.tempaddress.address.replace(/\s+/g, '').length))
                  ? false
                  : 'Add temporary address(Not mandatory outside India)'"
          class="text-white text-sm"
        >
        <div>
          <control
            v-model="form.tempaddress.address"
            type="textarea"
            @click="tempaddresschange()"
            placeholder="Type here"
          />
        </div>
        </field>
     </div>
        </div>

         <div >
      <div 
          class="
              w-full
              text-white text-center
              font-semibold
             
             rounded-lg
              pl-1
              pr-1
              bg-black
              py-2
          "
          >
          Permanent Address/Native Place Address
          </div>

    <div class="grid md:grid-cols-2 xl:grid-cols-3 sm:grid-cols-1 gap-1">
        <field label="State" :error="form.permanentaddress.state_id !== null ? false : true" class="text-white text-sm box-border h-24 w-50  border-2 border-gray-700" help="Please search permanent address state(Not mandatory outside India)">       
            <Multiselect
                          v-model="form.permanentaddress.state_id"
                          valueProp="id"
                          label="name"
                          class="border border-white text-xs text-white"
                          searchable
                          placeholder="Search state here"
                          track-by ="name"
                          :classes="selectClasses" 
                          @select="statechange1(form.permanentaddress.state_id)"
                          :object="true"
                          @search-change="fetchstateperm"
                          :options="permstate_value"
            /> 
          </field> 
        <field v-if="form.permanentaddress.state_id!=null"  label="District" :error="form.permanentaddress.district_id !== null ? false : true" class="text-white text-sm box-border h-24 w-50  border-2 border-gray-700" help="Please search permanent address district(Not mandatory outside India)">
       <Multiselect
                          v-model="form.permanentaddress.district_id"
                          valueProp="id"
                          label="name"
                          class="border border-white text-xs text-white"
                          searchable
                          placeholder="Search district here"
                          track-by ="name"
                          :classes="selectClasses" 
                          @select="tempdistrictchange1(form.permanentaddress.state_id)"
                          :object="true"
                          @search-change="fetchdistricts1"
                          :options="districts1"
                        />
         </field> 

         <field v-if="form.permanentaddress.district_id!=null&&form.permanentaddress.otherpincode == false"  label="Pincode" :error="form.permanentaddress.pincode !== null ? false : true"  class="text-white text-sm box-border h-24 w-50  border-2 border-gray-700" help="Please enter your pincode(Not mandatory outside India)">
       <Multiselect
                          v-model="form.permanentaddress.pincode"
                          valueProp="id"
                          label="name"
                          class="border border-white text-xs text-white"
                          searchable
                          placeholder="Search pincode here"
                          track-by ="name"
                          :classes="selectClasses" 
                          :object="true"
                          @search-change="fetchpermpincode"
                          :options="studentpincode1"
                        />
         </field> 

         <field v-if="form.permanentaddress.district_id!=null"
              help="Please select other pincode option if pincode is not present in the options(Not mandatory outside India)"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <check-radio-picker
                v-model="form.permanentaddress.otherpincode"
                name="sample-checkbox-two"
                class="font-bold"
                :options="checkboxOptions5"
                column
                @click="permothpincodechange()"
              />
            </field>

            <field
              v-if="form.permanentaddress.otherpincode == true"
              label="Pincode Name"
              :error="
                    ((form.permanentaddress.other_pincode.replace(/\s+/g, '').length)&&(!/^[\.]+$/.test(form.permanentaddress.other_pincode))&&(!isNaN(form.permanentaddress.other_pincode.replace(/\s+/g, ''))))
                      ? false
                      : 'Add valid Other Pincode(Not mandatory outside India)'"
              help="Please enter Pincode name"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <control
                v-model="form.permanentaddress.other_pincode"
                name="Other Pincode Name"
                placeholder="Enter Pincode name"
                autocomplete="username"
              />
            </field>

         <!-- <field label="Pincode" :error="permpincode_error" help="Please enter your pincode" class="text-white text-sm box-border h-24 w-50 border-2 border-gray-700">
            <control
              v-model="form.permanentaddress.pincode"
              name="email"
              :icon-right="mdiAccount"
              class="text-xs"
              autocomplete="username"
              placeholder="Enter your pincode"

            />
          </field> -->
       <field :error="
                ((form.permanentaddress.address.replace(/\s+/g, '').length))
                  ? false
                  : 'Add permanent address(Not mandatory outside India)'"
          label="Address"
          help="Please enter permanent address here"
          class="text-white text-sm"
        >
        <div>
          <control
            v-model="form.permanentaddress.address"
            type="textarea"
            placeholder="Type here"

          />
        </div>
        </field>

      </div> 
      </div>
        <!-- <div>
     <div v-for="(contact, index) in form.numberss"
                    :key="index">
         <field label="Contact Number" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700">  <h1 class="px-3 py-2 max-w-full focus:ring focus:outline-none dark:placeholder-gray-400 h-12 border-0 border-gray-700 dark:bg-gray-800 rounded pr-10 opacity-50 cursor-not-allowed text-white font-bold">{{contact.code+""+contact.number}}</h1>  
       </field>
        </div>

        <div v-if="verified===true">
          <div v-if="contact1&&contact1[1]">
        
         <field label="Contact Number" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700">  <h1 class="px-3 py-2 max-w-full focus:ring focus:outline-none dark:placeholder-gray-400 h-12 border-0 border-gray-700 dark:bg-gray-800 rounded pr-10 opacity-50 cursor-not-allowed text-white font-bold">{{contact1[1].code+""+contact1[1].number}}</h1>  
       </field>
          </div>
        </div> 

        <jb-buttons v-if="addfirst===true&&user.contactarray&&!user.contactarray[1]">
          <div class="p-2">
            <jb-button
              label="Add another Contact"
              color="success"
              @click="addfunction"
                class="p-2"
            />
          </div>
      </jb-buttons>
       <div v-if="verifyotp===false&&verified===false">
        <div class="md:flex pt-4 mb-4 flexsize" v-for="(con, i) in contact"
        :key="i">
            <div class="flex-none w-44 pr-2"> 
              <field label="country code" class="text-white text-sm box-border h-24 sm:h-[135px] md:h-24 w-50 p-2 border-2 border-gray-700">
              <Multiselect
                  v-model="con.code"
                  :searchable="true"
                  valueProp = "code"
                  label="code"
                  class="text-white"
                  :classes="selectClasses"
                  :options="codes"
                  :object="true"
                />
              </field>
            </div>
            <div class="shrink w-full">
              <field label="Contact Number" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700 sm:h-[135px] md:h-24">
              <control
                :onchange="nanfunc(con.number)"
                v-model="con.number"
                :icon-left="mdiPhone"
                :id = "`${con.number}`" 
                class="text-xs"
                help="Please add contact number"
                placeholder="Enter additional contact number"
                :error="hasError3"
              />
            </field>
            </div>
        </div>
       </div>
         <h1 class="text-l font-bold text-white mt-4 ml-3" v-if="verifyotp1==true">Enter the OTP you received</h1>
        <div class=" " v-if="verifyotp1==true">
            <div id="otp" class="flex w-[336px] justify-center text-center  mt-[7px]"> 
              <input :onchange="ValidatePassKey('first')" v-model="first" class="m-2 border h-10 w-10 text-center form-control rounded text-black" type="first" id="first" name="first" maxlength="1"/>
              <input  :onchange="ValidatePassKey('second')" v-model="second" class="m-2 border h-10 w-10 text-center form-control rounded text-black" type="second" id="second" name="second" maxlength="1"/> 
              <input  :onchange="ValidatePassKey('third')" v-model="third" class="m-2 border h-10 w-10 text-center form-control rounded text-black" type="third" id="third" name="third" maxlength="1"/> 
              <input  :onchange="ValidatePassKey('four')" v-model="four" class="m-2 border h-10 w-10 text-center form-control rounded text-black" type="four" id="four" name="four" maxlength="1"/>
              <input  :onchange="ValidatePassKey('five')" v-model="five" class="m-2 border h-10 w-10 text-center form-control rounded text-black" type="five" id="five" name="five" maxlength="1"/> 
              <input  :onchange="ValidatePassKey('six')" v-model="six" class="m-2 border h-10 w-10 text-center form-control rounded text-black" type="six" id="six" name="six" maxlength="1"/> 
            </div>
        
           <div class="flex m-5 flex-wrap gap-2 w-full">
            <div class=" justify-items-start">
                <jb-buttons v-if="isOpen== true">
                    <jb-button
                      label="Resend OTP?"
                      color="success"
                      @click="confirm"
                    />
                </jb-buttons>
                <jb-buttons v-else>
                  <h2 class="text-success  hover:underline">Resend OTP in {{countDown}} seconds</h2>
                </jb-buttons>
              </div>
                <jb-buttons v-if="verifyotp1==true">
            <jb-button
              label="Verify OTP"
              color="info"
              @click="verify"
            />
      </jb-buttons>
           </div>
        </div>

       
      <jb-buttons v-if="verifyotp2==false">
        <div class="p-2">
            <jb-button
              label="Send OTP"
              color="success"
              @click="confirm"
              id="sign-in-button"
            />
        </div>
      </jb-buttons>



      <jb-buttons v-if="showsubmit==true">
            <jb-button
              label="Submit Contact"
              color="info"
              @click="contactconfirm"
            />
      </jb-buttons>

  <jb-buttons v-if="addlast===true">
    <div class="p-2">
            <jb-button
              label="Remove Contact"
              color="danger"
              @click="removefunction"
                 class="p-2"
            
            />
    </div>
      </jb-buttons>
      <jb-buttons v-if="submitenable==true">
            <jb-button
              label="Add Contact"
              color="info"
              @click="addContact"
            />
      </jb-buttons>
      <jb-buttons v-if="submitenable1==true">
            <jb-button
              label="Remove Contact"
              color="danger"
              @click="removeContact"
            />
      </jb-buttons>
  </div> -->
      </div>
       
    <div class="grid md:grid-cols-2 xl:grid-cols-3 sm:grid-cols-1 gap-3 mb-5">
        <field
          class="
            text-white text-sm
          "
        >

          <check-radio-picker
          v-model="form.same_as_above"
            name="checkbox2"
            id="myCheckbox"
            class="font-bold"
            :options="checkboxOptions"
            column
            :onchange="sameasabove"
          />
        </field>


    </div>
      <!-- <div class="grid md:grid-cols-2 sm:grid-cols-2 gap-3 pt-0"> -->
  
      <!-- <div>
    <div v-for="(email, index) in form.emails"
                    :key="index">
      <field label="Email" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700">  
      <h1 class="px-3 py-2 max-w-full focus:ring focus:outline-none 
      dark:placeholder-gray-400 h-12 border-0 border-gray-700 dark:bg-gray-800 rounded pr-10 opacity-50 cursor-not-allowed text-white font-bold">{{email.email}}</h1>    
       </field>
    </div>
       <div v-if="verifiedemail===true">
          <div v-if="email1&&email1[0]">
        
         <field class="box-border h-24 w-50 p-2 border-2 border-gray-700">  <h1 class="px-3 py-2 max-w-full focus:ring focus:outline-none dark:placeholder-gray-400 h-12 border-0 border-gray-700 dark:bg-gray-800 rounded pr-10 opacity-50 cursor-not-allowed text-white font-bold">{{email1[0].email}}</h1>  
       </field>
          </div>
        </div> 
       <jb-buttons v-if="addfirst1===true&&user.emailarray&&!user.emailarray[1]">
         <div class="p-2">
            <jb-button
              label="Add another Email"
              color="success"
              @click="addfunction1"
            />
         </div>
      </jb-buttons>

      <div v-if="verifyotp3===false" class="mt-4 mr-2">
       <div  class="space-y-3 w-full">
        <field label="Email" help="Please enter email address" class="text-white text-xs box-border h-24 w-50 p-2 border-2 border-gray-700 pt-2">
        <control
          v-model="form.emailss"
          class="text-xs"
          placeholder="Enter additional email address"
          :error="emailerror"
        />
      </field>
      </div>
      </div>

      <jb-buttons v-if="addlast1===true">
        <div class="p-2">
            <jb-button
              label="Remove Email"
              color="danger"
              class="p-2"
              @click="removefunction1"
            />
            <jb-button
              label="Submit Email"
              color="info"
              @click="confirmemail"
            />
        </div>
      </jb-buttons>


  </div> -->
      

     

      <template #footer v-if="show_submit_button===false">
        <level mobile>
          <jb-buttons>
            <jb-button
              label="Next"
              type="submit"
              color="info"
              @click="submit"
            />
     
          </jb-buttons>
        </level>
      </template>
      
    </card-component>
    </div>
  </main-section>
  <education-form v-if="show_education===true"/>
  <experience-form v-if="show_experience===true"/>
  <otherdetails-form v-if="show_other===true"/>
  <Addcontact v-if="show_addcontact===true" v-model="show_addcontact" has-cancel/>
</template>


<script setup>
import { reactive, ref, computed, onBeforeMount,onMounted,watch} from 'vue'
import { mdiAccount, mdiEyeOff,mdiProgressCheck,mdiPlusBox,mdiMinusBox,mdiAccountAlertOutline,mdiBookEducation,mdiAccountCogOutline,mdiExitRun,mdiCheck } from '@mdi/js'
import FormScreenSection from '@/components/FormScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import ExperienceForm from '@/components/ExperienceForm.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import EducationForm  from '@/components/EducationForm.vue'
import TitleSubBar from '@/components/TitleSubBar.vue'
import OtherdetailsForm from '@/components/OtherdetailsForm.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import JbButton from '@/components/JbButton.vue'
import Addcontact from '@/components/Addcontact.vue'
// import Addcontact from '@/components/Addcontact.vue'
// import Emailadd from '@/components/Emailadd.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import TextLink from '@/components/TextLink.vue'
import { sessionStore } from "../stores/session";
import { useRouter } from "vue-router";
import { getdata } from "../stores/user";
import { themeStore } from "../stores/theme";
import Multiselect from '@vueform/multiselect'
import { selectClasses } from '@/selectcss.js'
// import { useStorage } from "vue3-storage";
import dayjs from 'dayjs';
import { firebaseStore } from "../stores/firebase";
import firebase from 'firebase/app'
const props = defineProps({
  numbers_value: {
    type: Array
  },
  

})

// const changing = () =>{
//   tempstate_error.value=false,
//   tempdistrict_error.value=false,
//   tempaddress_error.value=false,
//   permstate_error.value=false,
//   permdistrict_error.value=false,
//   permaddress_error.value=false,
//   highdeg_error.value=false,
//   highyop_error.value=false,
//   workexp_error.value=false,
// dob_error.value=false,
// gender_error.value=false,
// aadharerror.value=false,
// passerror.value=false,
// panerror.value=false
// }
const selected = ref(null);
// const ls = useStorage();
const router = useRouter();
const user = sessionStore();
const theme = themeStore();
const code = getdata();
const current_user = ref("");
const emails1 = ref([])
const emails = ref([{ email: "" }]);
const appVerifier = ref('');
const conResult = ref('');
const numbers = ref([])
const first = ref("");
const datassss = ref(null);
const captcha = ref(false)
const second = ref("");
const third = ref("");
const four = ref("");
const counts = ref(0);
const five = ref("");
const six = ref("");
const interval = ref("");
const contact = ref([{ number: "" ,code:""}]);
const contact1 = ref([]);
const email1 = ref([]);
const verifyotp = ref(true)
const verifyotp1 = ref(false)
const verifyotp2 = ref(true)
const verifyotp3 = ref(true)
const addfirst = ref(true)
const verifiedemail = ref(false)
const addlast = ref(false)
const addfirst1 = ref(true)
const addlast1 = ref(false)
const verifyotpconfirm = ref(false)
const verified = ref(false)
const submitenable = ref(false)
const showsubmit = ref(false)
const submitenable1 = ref(false)
const isOpen = ref(false);
const timeout = ref(null);
const countDown = ref(30);
const isSaveOpen = ref(true)
const datassss1 = ref(null);
const emailerror = ref(false)
const timeOut = ref('')
const codes = [
  { code: "+91" },
  { code: "+97" },
  { code: "+968" },
  { code: "+1" },
  { code: "+355" },
  { code: "+356" },
  { code: "+352" },
  { code: "+370" },
  { code: "+372" },
  { code: "+371" },
  { code: "+39" },
  { code: "+61" },
  { code: "+93" },
  { code: "+376" },
  { code: "+1684" },
  { code: "+244" },
  { code: "+1264" },
  { code: "+1268" },
  { code: "+54" },
  { code: "+374" },
  { code: "+297" },
  { code: "+43" },
  { code: "+994" },
  { code: "+421" },
  { code: "+420" },
  { code: "+30" },
  { code: "+40" },
  { code: "+33" },
  { code: "+1242" },
  { code: "+973" },
  { code: "+880" },
  { code: "+1246" },
  { code: "+375" },
  { code: "+32" },
  { code: "+501" },
  { code: "+229" },
  { code: "+1441" },
  { code: "+975" },
  { code: "+591" },
  { code: "+387" },
  { code: "+385" },
  { code: "+386" },
  { code: "+65" },
  { code: "+267" },
  { code: "+55" },
  { code: "+246" },
  { code: "+46" },
  { code: "+673" },
  { code: "+1284" },
  { code: "+226" },
  { code: "+257" },
  { code: "+855" },
  { code: "+237" },
  { code: "+238" },
  { code: "+599" },
  { code: "+1345" },
  { code: "+359" },
  { code: "+45" },
  { code: "+34" },
  { code: "+236" },
  { code: "+358" },
  { code: "+357" },
  { code: "+36" },
  { code: "+235" },
  { code: "+353" },
  { code: "+351" },
  { code: "+48" },
  { code: "+31" },
  { code: "+56" },
  { code: "+86" },
  { code: "+61" },
  { code: "+57" },
  { code: "+269" },
  { code: "+977" },
  { code: "+0046" },
  { code: "+256" },
  { code: "+64" },
  { code: "+44" },
  { code: "+47" },
  { code: "+49" },
];

const addContact = () => {
  verifyotp.value=false
  verifyotp2.value=false
  submitenable.value=false
  submitenable1.value=true
  contact.value.push({ number: "" });
  for (var i = 0; i < contact.value.length; i++) {
        contact.value[i].code = code.$state.code[0].code;
      }
};

const nanfunc = async (number) => {
  if(number){
    if(number.length===1){
      hasError3.value =false
    }
    else if(number.length!=10 || isNaN(number) || /\s/g.test(number)){
      hasError3.value ="Contact Number not valid"
    }
    else{

      hasError3.value =false
    }

  }

};

const addEmail = () => {
  emails.value.push({ email: "" });
};
const studentgender = computed(() => {
  return user.gender
  // await user.checkonlines();
  //   if(online.value===true){
  //     return user.gender
  //   }
  //   else{
  //     theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  //   }


})

const studentpersonaldata = computed(() => {
  return user.personal_data



})

const aadharerror = ref(false)
const panerror = ref(false)
const passerror = ref(false)

// const studentdegree = computed(() => {
//   return user.highestdegree
// })



const removeEmail = () => {
    for (var i = 0; i < emails.value.length; i++) {
    if(emails.value[i].email==""){
           
    }
     emails.value.pop()
      break; 
    
      }
 };
 const show_addcontact = ref(false)
 const addfunction = () =>{
   show_addcontact.value=true
  //  contact.value[0].number=""
  //  contact.value[0].code=selected.value
  //  verifyotp.value=false
  //  show_submit_button.value=true
  //  verifyotp2.value=false
  addfirst.value=false
  //  addlast.value = true

 };
 const removefunction = () =>{
   show_submit_button.value=false
   addfirst.value=true
   addlast.value = false
   verifyotp.value=true
   verifyotp2.value=true
 };
 const addfunction1 = () =>{
   verifyotp3.value=false
   addfirst1.value=false
   addlast1.value = true


 };
 const removefunction1 = () =>{
   addfirst1.value=true
   addlast1.value = false
   verifyotp3.value=true
   emails.value.pop()
   
 };
const removeContact = () => {
  submitenable1.value=false
  submitenable.value=true
  verifyotp2.value=true
  for (var i = 0; i < contact.value.length; i++) {
    if(contact.value[i].number==""){
        contact.value.pop();
    }
      }
 };
 const confirm = async ()  => {
    first.value=""
    second.value=""
    third.value=""
    four.value=""
    five.value=""
    six.value=""
   if(window.recaptchaVerifier ){
     window.recaptchaVerifier.render().then(function(widgetId) {
                grecaptcha.reset(widgetId);
              });
   }
   
   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      
        // submit();

      }
      
    });
    appVerifier.value = window.recaptchaVerifier
    submitenable1.value=false
    submitenable.value=false
    addlast.value = false

  try{
    await user.checkonlines();
    if(online.value===true){
      if(contact.value[0].number==="")
    {
      theme.pushMessage("Add contact details!")
    }
    else if(selected.value===null)
    {
      theme.pushMessage("Add country code!")
    }
    else if(contact.value[0].number.length!=10)
    {
      theme.pushMessage("Add Valid number!")
    }
     else if(isNaN(contact.value[0].number))
    {
      theme.pushMessage("Add Valid number!")
    }
    else if(/\s/g.test(contact.value[0].number)){
      theme.pushMessage("Add Valid number!")
    }
    else
    {
      //  await code.send_otp(selected.value['code']+""+contact.value[0].number); 
          clearTimeout(interval.value)
          clearTimeout(timeOut.value)
          await user.getstudentnumbercheck(contact.value[0].number)
          if(user.check_number){
          firebase.auth().signInWithPhoneNumber(selected.value['code']+""+contact.value[0].number, window.recaptchaVerifier)
            .then((confirmationResult) => {
              isOpen.value = false
              countDown.value = 30
              interval.value = setTimeout(() => {
                                isOpen.value = true 
                                }, 30000)                
              countDownTimer(countDown.value)
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
              conResult.value = confirmationResult;
              theme.pushMessage("OTP sent successfully to your mobile number");
              verifyotp1.value = true
              verifyotp2.value = true
              
              // ...
            }).catch((error) => {
              clearTimeout(interval.value)
              clearTimeout(timeOut.value)
              verifyotp.value=true
              verifyotp2.value=true
              verifyotp1.value=false
              addfirst.value=true
              window.recaptchaVerifier.render().then(function(widgetId) {
                grecaptcha.reset(widgetId);
              });
              location.reload()
              // Error; SMS not sent
              // ...
            });
             }
            else {
              theme.pushMessage("Number is already registered!!");
              location.reload()
            }
          
          // if(code.otp.message==="contact does not exists."){
          //   theme.pushMessage("OTP sent successfully to your mobile number");
          //   code.otp.message=""
          //   verifyotp1.value = true
          //   verifyotp2.value = true
          // }
          // else if(code.error_otp_send){
          //     if(code.error_otp_send.error==="otp limit exceeded try again tomorrow."){
          //       theme.pushMessage("OTP has been sent to you for 10 times Today...Please try again Tomorrow");
          //       code.error_otp_send = ""
          //       clearTimeout(interval.value)
          //       clearTimeout(timeOut.value)
          //       verifyotp.value=true
          //       verifyotp2.value=true
          //       verifyotp1.value=false
          //       addfirst.value=true
          //       router.push("/login")
          //     }
          //     else if(code.error_otp_send.error==="number already registered please log in."){
          //       theme.pushMessage("This number has been already registered...PLease try with another number");
          //       code.error_otp_send = ""
          //       clearTimeout(interval.value)
          //       clearTimeout(timeOut.value)
          //       verifyotp.value=true
          //       verifyotp2.value=true
          //       verifyotp1.value=false
          //       addfirst.value=true
          //     }
          // }
  

    }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }

   

    }

    catch(err){
      theme.pushMessage("something went wrong");
      clearTimeout(interval.value)
      clearTimeout(timeOut.value)
      code.error_otp_send = ""
      location.reload()
    }
}

const verify = async ()  => {
  const data1=first.value+second.value+third.value+four.value+five.value+six.value
  if(first.value==""&&second.value==""&&third.value==""&&four.value==""&&five.value==""&&six.value=="")
    {
      theme.pushMessage("Enter the OTP!!")
    } 
  else
  {
  try{   
    window.confirmationResult.confirm(data1).then((result) => {
        // User signed in successfully.
        const user = result.user;
        theme.pushMessage("OTP has been verified to the number"+ "   "+ contact.value[0].number);
        show_submit_button.value=false
        verifyotp1.value=false
        verified.value=true
        clearTimeout(interval.value)
        clearTimeout(timeOut.value)
        contact1.value.push({"number":form.numberss[0].number,"code":form.numberss[0].code})
        contact1.value.push({"number":contact.value[0].number,"code":contact.value[0].code.code})
        // ...
      }).catch((error) => {
        theme.pushMessage("You have entered wrong OTP...Please enter valid OTP");
        // User couldn't sign in (bad verification code?)
        // ...
      });  

      // if(data1===code.otp.otp){
        
      // }
      // else{
      //   theme.pushMessage("You have entered wrong OTP...Please enter valid OTP");
      // }
          
    }
    catch(err){

      theme.pushMessage("Something went wrong");
    }
}

    }
const contactconfirm = async() => {
  try{

    for (var i = 0; i < contact.value.length; i++) {
        contact.value[i].number = contact.value[i].number;
        contact.value[i].code = contact.value[i].code.code;
      }

    show_submit_button.value=false
    verifyotp.value=false
    submitenable.value=true
    showsubmit.value=false
    verified.value = true
    contact.value.pop()
    theme.pushMessage("Contact number added successfully")

    
  }
  catch(err){

    theme.pushMessage("something went wrong");
  }
}



const form = reactive({
  name: '',
  state:null,
  gender:null,
  pancard:null,
  passport:null,
  aadharcard:null,
  workexp:null,
  dateofbirth : null,
  permanentaddress:{
      address:"",
      district_id:null,
      state_id:null,
      pincode:null,
      otherpincode:false,
      other_pincode:"",
  },
  tempaddress:{
      address:"",
      district_id:null,
      state_id:null,
      pincode:null,
      otherpincode:false,
      other_pincode:"",
  },
  highestdegree:null,
  years: [...Array(30)].map((a, b) => (new Date().getFullYear() + 1) - b),
  noticeperiods: [...Array(13).keys()],
  Highestyop:null,
  numberss: [
        {
          number: "",
          code:""
        },
      ],
  numbers: [  
        {
        number: "",
        code: code.$state.code[0],
        },
    ],
    emails: [
          {
            email: "",
          },
        ],
  emailss:"",      
  add_another:false,
  images:null,
  imagename:null,
  linkedinurl:"",
  twitterurl:"",
  instagramurl:"",
  facebookurl:"",
  same_as_above:false,
})
const form1 = reactive({
  upload:null
})
const fb = firebaseStore();
const tempstate_error = ref(false)
const tempdistrict_error = ref(false)
const tempaddress_error = ref(false)
const permstate_error = ref(false)
const permdistrict_error = ref(false)
const permaddress_error = ref(false)
const highdeg_error = ref(false)
const highyop_error = ref(false)
const dob_error = ref(false)
const name_error = ref(false)
const image_error= ref(false)
const gender_error = ref(false)
const workexp_error = ref(false)
const temppincode_error = ref(false)
const othtemppincode_error = ref(false)
const permpincode_error = ref(false)
const othpermpincode_error = ref(false)
const enableemail=ref(false)
const enablecontact = ref(false)
const show_education = ref(false)
const show_submit_button = ref(false)
const checkboxOptions5 = { false: "Other Pincode" };
const confirmemail = async() => {
  try{
  if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.emailss)))
  {
    emailerror.value=true
    theme.pushMessage("Add valid email!")
  }
  else{
  emailerror.value=false
  await user.checkonlines();
    if(online.value===true){
      let response = await user.addemails(form.emailss)
  if(user.email_data.status===200)
    {
      email1.value.push({"email":form.emailss.toLowerCase()})
      email1.value.push({"email":studentemail.value})
      verifiedemail.value=true
      addlast1.value=false
      verifyotp3.value=true
    }
    else {
    theme.pushMessage("Email already exists in our database!!")
    user.error_email_data=""
    }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
  

  }
  }
  catch(err){

    theme.pushMessage(user.error_email_data);
    user.error_email_data=""
  }
}



const tempdistrictchange = async(data) => {


  user.pincodes=[]
  form.tempaddress.pincode=null
  if(form.same_as_above===true){
    form.same_as_above=false
    form.permanentaddress.district_id=null
    form.permanentaddress.state_id=null
    form.permanentaddress.pincode=null
    form.permanentaddress.address=""
    form.permanentaddress.otherpincode = false
    form.permanentaddress.other_pincode = ""
    
  }
  if(data&&data.id){
    await user.checkonlines();
    if(online.value===true){
      await user.getstudentpincode(data.id,"",true);
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
   
  }
}

const tempdistrictchange1 = async(data) => {
  await user.checkonlines();
    if(online.value===true){
      user.pincodes1=[]
  form.permanentaddress.pincode=null
  if(data&&data.id){
    await user.getstudentpincode(data.id,"",false);
  };
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
   
 
}

const fetchpermpincode = async(query) => {
  await user.checkonlines();
    if(online.value===true){
      if(form.permanentaddress.state_id&&form.permanentaddress.state_id.id){
    await user.getstudentpincode(form.permanentaddress.state_id.id,query,false);
  }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
  
}

const fetchtemppincode = async(query) => {
  await user.checkonlines();
    if(online.value===true){
      if(form.tempaddress.state_id&&form.tempaddress.state_id.id){
    await user.getstudentpincode(form.tempaddress.state_id.id,query,true);
  }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
 
}

const studentpincode = computed(() => {
  return user.pincodes
})

const studentpincode1 = computed(() => {
  return user.pincodes1
})
const temppincodechange = async(data) => {
  if(form.same_as_above===true){
    form.same_as_above=false
    form.permanentaddress.district_id=null
    form.permanentaddress.state_id=null
    form.permanentaddress.pincode=null
    form.permanentaddress.address=""
    form.permanentaddress.otherpincode = false
    form.permanentaddress.other_pincode = ""
    
  }
}

const tempothpincodechange = async(data) => {
  form.tempaddress.pincode=null
  form.tempaddress.other_pincode=""
  if(form.same_as_above===true){
    form.same_as_above=false
    form.permanentaddress.district_id=null
    form.permanentaddress.state_id=null
    form.permanentaddress.pincode=null
    form.permanentaddress.address=""
    form.permanentaddress.otherpincode = false
    form.permanentaddress.other_pincode = ""
  }
}

const tempoth_pincodechange = async(data) => {

  if(form.same_as_above===true){
    form.same_as_above=false
    form.permanentaddress.district_id=null
    form.permanentaddress.state_id=null
    form.permanentaddress.pincode=null
    form.permanentaddress.address=""
    form.permanentaddress.otherpincode = false
    form.permanentaddress.other_pincode = ""
  }
}


const tempaddresschange = async(data) => {

  if(form.same_as_above===true){
    form.same_as_above=false
    form.permanentaddress.district_id=null
    form.permanentaddress.state_id=null
    form.permanentaddress.pincode=null
    form.permanentaddress.address=""
  }
}
const statechange = async(data) => {
  await user.checkonlines();
    if(online.value===true){
      user.district=[]
  form.tempaddress.district_id=null
  if(form.same_as_above===true){
    form.same_as_above=false
    form.permanentaddress.district_id=null
    form.permanentaddress.state_id=null
    form.permanentaddress.pincode=null
    form.permanentaddress.address=""
    form.permanentaddress.otherpincode = false
    form.permanentaddress.other_pincode = ""
  }
  if(data&&data.id){
    await user.getDistrict(data.id,"",true);
  }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }

  
  
}

const permothpincodechange = async(data) => {
  form.permanentaddress.pincode=null
  form.permanentaddress.other_pincode=""
}

const statechange1 = async(data) => {
  await user.checkonlines();
    if(online.value===true){
      user.district1=[]
  form.permanentaddress.district_id=null

  if(data&&data.id){

    await user.getDistrict(data.id,"",false);
  }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }

}




// const states = await user.getState();
const districts = computed(() => {
  return user.district
}) 
const districts1 = computed(() => {
  return user.district1
}) 

const states_value =ref( [{
            "id": 11,
            "name": "Andhra Pradesh"
        },
        {
            "id": 12,
            "name": "Arunachal Pradesh"
        },
        {
            "id": 13,
            "name": "Assam"
        },
        {
            "id": 14,
            "name": "Bihar"
        },
        {
            "id": 15,
            "name": "Chhattisgarh"
        },
        {
            "id": 16,
            "name": "Delhi"
        },
        {
            "id": 17,
            "name": "Goa"
        },
        {
            "id": 18,
            "name": "Gujarat"
        },
        {
            "id": 19,
            "name": "Haryana"
        }])

const permstate_value = ref([{
            "id": 11,
            "name": "Andhra Pradesh"
        },
        {
            "id": 12,
            "name": "Arunachal Pradesh"
        },
        {
            "id": 13,
            "name": "Assam"
        },
        {
            "id": 14,
            "name": "Bihar"
        },
        {
            "id": 15,
            "name": "Chhattisgarh"
        },
        {
            "id": 16,
            "name": "Delhi"
        },
        {
            "id": 17,
            "name": "Goa"
        },
        {
            "id": 18,
            "name": "Gujarat"
        },
        {
            "id": 19,
            "name": "Haryana"
        }])

// const permstate_value = computed(() => {
//   return user.permstate
// }) 

const fetchdistrict = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      if(query){
    states_value.value = await user.getState(query);
  }
  else{
    states_value.value=states_value.value
  }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
 

};

    
const fetchstate = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      if(query){
    states_value.value = await user.getState(query.replace("'","''"));

  }
  else{
    states_value.value=[{
            "id": 11,
            "name": "Andhra Pradesh"
        },
        {
            "id": 12,
            "name": "Arunachal Pradesh"
        },
        {
            "id": 13,
            "name": "Assam"
        },
        {
            "id": 14,
            "name": "Bihar"
        },
        {
            "id": 15,
            "name": "Chhattisgarh"
        },
        {
            "id": 16,
            "name": "Delhi"
        },
        {
            "id": 17,
            "name": "Goa"
        },
        {
            "id": 18,
            "name": "Gujarat"
        },
        {
            "id": 19,
            "name": "Haryana"
        }]
  }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
 
};

const fetchstateperm = async (query) => {
  
  await user.checkonlines();
    if(online.value===true){
      if(query){
    permstate_value.value = await user.getState(query.replace("'","''"));
  }
  else{
  

    permstate_value.value=[{
            "id": 11,
            "name": "Andhra Pradesh"
        },
        {
            "id": 12,
            "name": "Arunachal Pradesh"
        },
        {
            "id": 13,
            "name": "Assam"
        },
        {
            "id": 14,
            "name": "Bihar"
        },
        {
            "id": 15,
            "name": "Chhattisgarh"
        },
        {
            "id": 16,
            "name": "Delhi"
        },
        {
            "id": 17,
            "name": "Goa"
        },
        {
            "id": 18,
            "name": "Gujarat"
        },
        {
            "id": 19,
            "name": "Haryana"
        }]
  }

    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }

 
  
};

const fetchdistricts = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      if(query){
    districts.value = await user.getDistrict(form.tempaddress.state_id.id,query.replace("'","''"),true);
  }
  else{
    districts.value=districts.value
  }
  
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
 
};

const fetchdistricts1 = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      if(query){
    districts1.value = await user.getDistrict(form.permanentaddress.state_id.id,query.replace("'","''"),false);
  }
  else{
    districts1.value=districts1.value
  }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
 
  
};

// const fetchdistrict = async (query,stateid) => {
//   let selectdistrict = await user.getDistrict(query,stateid);
//   return selectdistrict
// };

const gender = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      let selectgender = await user.getGender(query);
  return selectgender
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
 
};

const show_images=ref(false)

// const studentname = computed(() => {
//   return user.studentname
// })
const pageLoading = ref(false)
const dates_value = ref(null)
onBeforeMount(async () => {
  pageLoading.value = true
  await user.checkonlines();

  // document.getElementById(
  //             "test_Date").disabled = true;
  // fb.initiateFirebase()
  // fb.initiateAuth()
  window.scrollTo(0, 0);
  await user.checkUser();
  dates_value.value = dayjs().year() + "-" + "12" + "-" + "31";
  selected.value = codes[0]
  if (user.$state.loggedIn===false) {
    router.push("/login");
 
  }
  if(online.value===true){
  // else{
  //   router.push("/personal_form");
  // }
  await user.getstudent();
  await user.getGender(); 


  form.name=user.studentname

  
for (var i = 0; i < user.contactarray.length; i++) {
    form.numberss[i] = user.contactarray[i]
  }
for (var i = 0; i < user.emailarray.length; i++) {
    form.emails[i] = user.emailarray[i]
  }

// if(user.personal_data.state){
//   form.tempaddress.state_id=user.personal_data.state
// }
// if(user.personal_data.city){
//   form.tempaddress.district_id=user.personal_data.city
// }
// if(user.personal_data.pincode){
//   form.tempaddress.pincode=user.personal_data.pincode
// }

// window.onpopstate = event => {
//             router.push("/");
//             location.reload()
//         };
}
  else{
  theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
}
pageLoading.value = false
});

onMounted(async () => {


});


const numbersvalues = computed(async() => {

  // if(props.numbers_value){
    return props.numbers_value
  // }
  
})

watch(numbersvalues, (value) => {

  // if (value) {

  // }
});


const studentimagess = computed(() => {
  return user.studentimages
})

const online = computed(() =>  user.isonline);

const studentemail = computed(() => {
  return user.studentemail
})

const studentcontact = computed(() => {
  return user.studentcontact
})
const email_data = ref([])
const contact_data = ref([])
const image_size=ref(false)
const checkboxOptions = { true: "Permanent address same as Current address" };
const hasError3 = ref(false)
const hasError4 = ref(false)
const hasError = ref(false)
const files = ref(null)
const cardClassAddon = computed(() => hasError.value ? 'animate-shake' : '')
const radioOptions = { true: 'Yes', false: 'No' }
const radioOptions1 = { true: 'Yes', false: 'No' }
const radioOptions2 = { true: 'Yes', false: 'No' }
const radioOptions3 = { 1: "Male", 2: "Female" ,3:"Others"}
const submit = async () => {
    let valid = true
    //  var fileUpload = document.getElementById("file");
    if(form.name===""){
       theme.pushMessage("Please enter your name")
       valid = false
     }
    if(!form.name.replace(/\s/g, '').length){
      theme.pushMessage("Add valid name")
      valid = false
    }
    if((/^[\.]+$/.test(form.name))){
      // /^[a-zA-Z\-]+$/
      theme.pushMessage("Add valid name")
      valid = false
    }
    if(!(/^[a-zA-Z\s]+$/.test(form.name))){
      theme.pushMessage("Add valid name")
      valid = false
    }
    // if (fileUpload.files&&fileUpload.files[0]) {
 
    //   if (!(fileUpload.files[0].type==="image/png"||fileUpload.files[0].type==="image/jpg"||fileUpload.files[0].type==="image/jpeg"||fileUpload.files[0].type==="image/jfif"||fileUpload.files[0].type==="image/PNG"||fileUpload.files[0].type==="image/JPG"||fileUpload.files[0].type==="image/JPEG"||fileUpload.files[0].type==="image/JFIF"))
    //   {
    //     theme.pushMessage("Image format should be any of these(jpg,JPG,jpeg,JPEG,png,PNG,jfif,JFIF)")
    //     document.getElementById('file').value = "";
    //     document.getElementById('img-show').src = "";
    //     form.images=null
    //     valid = false
        
    //   }

    // }
    //  if(form.images===null){
    //    theme.pushMessage("Please add your passport size photo")
    //    image_error.value=true
    //    valid = false
    //  }

    if(form.dateofbirth===null||form.dateofbirth===""){
      theme.pushMessage("Date of Birth is required")
      valid = false
    }
    if(form.gender===null){
      theme.pushMessage("Gender is required")
      valid = false
    }

    if(form.aadharcard===null){
        theme.pushMessage("Aadhar card details are required")
        valid = false
        }
    if(form.passport===null){
      theme.pushMessage("Passport details are required")
      valid = false
    }
    if(form.pancard===null){
      theme.pushMessage("Pan card details are required")
      valid = false
    }
    if(form.tempaddress.state_id === null&&studentpersonaldata.value&&studentpersonaldata.value.country&&studentpersonaldata.value.country.id===1)
    {
      theme.pushMessage("Temporary address state is required")
      valid = false
    
    }
    if(form.tempaddress.district_id === null&&studentpersonaldata.value&&studentpersonaldata.value.country&&studentpersonaldata.value.country.id===1)
    {
  
      theme.pushMessage("Temporary address district is required")
      valid = false
    }
    if(form.tempaddress.pincode === null&&form.tempaddress.otherpincode===false&&studentpersonaldata.value&&studentpersonaldata.value.country&&studentpersonaldata.value.country.id===1)
    {

      theme.pushMessage("Temporary address pincode is required")
      valid = false
    }
    // if(form.tempaddress.other_pincode === ""&&form.tempaddress.otherpincode===true)
    // {
    //   othtemppincode_error.value = "This field is required"
    //   theme.pushMessage("Temporary address other pincode is required")
    //   valid = false
    // }
    if(isNaN(form.tempaddress.other_pincode)&&form.tempaddress.otherpincode===true&&studentpersonaldata.value&&studentpersonaldata.value.country&&studentpersonaldata.value.country.id===1)
    {
      // othtemppincode_error.value = "This field is required"
      theme.pushMessage("Add valid Temporary address other pincode ")
      valid = false
    }
    if((!form.tempaddress.other_pincode.replace(/\s/g, '').length)&&form.tempaddress.otherpincode===true&&studentpersonaldata.value&&studentpersonaldata.value.country&&studentpersonaldata.value.country.id===1)
    {
      // othtemppincode_error.value = "This field is required"
      theme.pushMessage("Temporary address other pincode is required")
      valid = false
    }
    // if(!form.tempaddress.pincode.replace(/\s/g, '').length)
    // {
    //   temppincode_error.value = "This field is required"
    //   theme.pushMessage("Temporary address pincode is required")
    //   valid = false
    // }
    // if(isNaN(form.tempaddress.pincode)){
    //   temppincode_error.value = "Enter valid Temporary address pincode"
    //   theme.pushMessage("Enter valid Temporary address pincode")
    //   valid = false

    // }

    if((form.tempaddress.address === "" || !form.tempaddress.address.replace(/\s/g, '').length)&&studentpersonaldata.value&&studentpersonaldata.value.country&&studentpersonaldata.value.country.id===1)
    {
      // tempaddress_error.value = "This field is required"
      theme.pushMessage("Temporary address  is required")
      valid = false
    }
    // if(!form.tempaddress.address.replace(/\s/g, '').length&&studentpersonaldata.value&&studentpersonaldata.value.country&&studentpersonaldata.value.country.id===1){
    //   theme.pushMessage("Temporary address is required")
    //   valid = false
    // }
    if(form.permanentaddress.state_id === null&&studentpersonaldata.value&&studentpersonaldata.value.country&&studentpersonaldata.value.country.id===1)
    {
      // permstate_error.value = "This field is required"
      theme.pushMessage("Permanent address state is required")
      valid = false
    
    }
    if(form.permanentaddress.district_id === null&&studentpersonaldata.value&&studentpersonaldata.value.country&&studentpersonaldata.value.country.id===1)
    {
      // permdistrict_error.value = "This field is required"
      theme.pushMessage("Permanent address district is required")
      valid = false
    }
    if(form.permanentaddress.pincode === null&&form.permanentaddress.otherpincode===false&&studentpersonaldata.value&&studentpersonaldata.value.country&&studentpersonaldata.value.country.id===1)
    {
      // permpincode_error.value = "This field is required"
      theme.pushMessage("Permanent address pincode is required")
      valid = false
    }
    // if(form.permanentaddress.other_pincode === ""&&form.permanentaddress.otherpincode===true)
    // {
    //   othpermpincode_error.value = "This field is required"
    //   theme.pushMessage("Permanent address other pincode is required")
    //   valid = false
    // }
    if(isNaN(form.permanentaddress.other_pincode)&&form.permanentaddress.otherpincode===true&&studentpersonaldata.value&&studentpersonaldata.value.country&&studentpersonaldata.value.country.id===1)
    {
      // othpermpincode_error.value = "This field is required"
      theme.pushMessage("Add valid Permanent address other pincode")
      valid = false
    }
    if((!form.permanentaddress.other_pincode.replace(/\s/g, '').length)&&form.permanentaddress.otherpincode===true&&studentpersonaldata.value&&studentpersonaldata.value.country&&studentpersonaldata.value.country.id===1)
    {
      // othpermpincode_error.value = "This field is required"
      theme.pushMessage("Permanent address other pincode is required")
      valid = false
    }
    // if(!form.permanentaddress.pincode.replace(/\s/g, '').length)
    // {
    //   permpincode_error.value = "This field is required"
    //   theme.pushMessage("Permanent address pincode is required")
    //   valid = false
    // }

    // if(isNaN(form.permanentaddress.pincode)){
    //   permpincode_error.value = "Enter valid Permanent address pincode"
    //   theme.pushMessage("Enter valid Permanent address pincode")
    //   valid = false

    // }
    if((form.permanentaddress.address === ""||!form.permanentaddress.address.replace(/\s/g, '').length)&&studentpersonaldata.value&&studentpersonaldata.value.country&&studentpersonaldata.value.country.id===1)
    {
      // permaddress_error.value = "This field is required"
      theme.pushMessage("Permanent address is required")
      valid = false
    }
    // if(!form.permanentaddress.address.replace(/\s/g, '').length&&studentpersonaldata.value&&studentpersonaldata.value.country&&studentpersonaldata.value.country.id===1){
    //   theme.pushMessage("Permanent address is required")
    //   valid = false
    // }
    if(valid){
        try{  
          pageLoading.value = true    
          // let data1 = new FormData();
          // let data2 = new FormData();
          // if(form.images&&form.images.name){
          //   data2.append("upload", form.images, form.images.name);
          // }
          // data1.append("name", form.name)
          // data1.append("personaldetails", JSON.stringify({ 
          //                     "gender":form.gender,
          //                     "dateofbirth":dayjs(form.dateofbirth).format("YYYY-MM-DD"),
          //                     "aadharcard":form.aadharcard,
          //                     "pancard":form.pancard,
          //                     "passport":form.passport,
          //                     "fresherexp":user.personal_data.fresherexp,
          //                     "highestyop":user.personal_data.highestyop,
          //                     "linkedinurl":form.linkedinurl,
          //                     "twitterurl":form.twitterurl,
          //                     "instagramurl":form.instagramurl,
          //                     "facebookurl":form.facebookurl,
          //                     "permanentaddress":{
          //                             "address":form.permanentaddress.address,
          //                             "district_id":form.permanentaddress.district_id,
          //                             "state_id":form.permanentaddress.state_id,
          //                             "pincode":form.permanentaddress.pincode,
          //                             "otherpincode":form.permanentaddress.otherpincode,
          //                             "other_pincode":form.permanentaddress.other_pincode,
          //                         },
          //                     "tempaddress":{
          //                             "address":form.tempaddress.address,
          //                             "district_id":form.tempaddress.district_id,
          //                             "state_id":form.tempaddress.state_id,
          //                             "pincode":form.tempaddress.pincode,
          //                             "otherpincode":form.tempaddress.otherpincode,
          //                             "other_pincode":form.tempaddress.other_pincode,
          //                         },  

          //                     }));                
          // if(email1.value&&email1.value.length!=0){
          //   const numbers = email1.value.map(o => o.email)
          //   email_data.value = email1.value.filter(({email}, index) => !numbers.includes(email, index + 1))
          // }                  
          // else{
          //   const numbers = user.emailarray.map(o => o.email)
          //   email_data.value = user.emailarray.filter(({email}, index) => !numbers.includes(email, index + 1))
          // }
  

          // if(contact1.value&&contact1.value.length!=0){
          //   const numbers = contact1.value.map(o => o.number)
          //   contact_data.value = contact1.value.filter(({number}, index) => !numbers.includes(number, index + 1))
          // }                  
          // else{
          //   const numbers = user.contactarray.map(o => o.number)
          //   contact_data.value = user.contactarray.filter(({number}, index) => !numbers.includes(number, index + 1))
          // }
          await user.checkonlines();
    if(online.value===true){
                               
          await user.personal({ "name":form.name,
                                "personaldetails":{ 
                                  "gender":form.gender,
                                  "dateofbirth":dayjs(form.dateofbirth).format("YYYY-MM-DD"),
                                  "aadharcard":form.aadharcard,
                                  "pancard":form.pancard,
                                  "passport":form.passport,
                                  "fresherexp":user.personal_data.fresherexp,
                                  "highestyop":user.personal_data.highestyop,
                                  "linkedinurl":form.linkedinurl,
                                  "twitterurl":form.twitterurl,
                                  "instagramurl":form.instagramurl,
                                  "facebookurl":form.facebookurl,
                                  "permanentaddress":{
                                          "address":form.permanentaddress.address,
                                          "district_id":form.permanentaddress.district_id,
                                          "state_id":form.permanentaddress.state_id,
                                          "pincode":form.permanentaddress.pincode,
                                          "otherpincode":form.permanentaddress.otherpincode,
                                          "other_pincode":form.permanentaddress.other_pincode,
                                      },
                                  "tempaddress":{
                                          "address":form.tempaddress.address,
                                          "district_id":form.tempaddress.district_id,
                                          "state_id":form.tempaddress.state_id,
                                          "pincode":form.tempaddress.pincode,
                                          "otherpincode":form.tempaddress.otherpincode,
                                          "other_pincode":form.tempaddress.other_pincode,
                                      },  

                                  },
             
            })
          // await user.studentimage(data2)
          // pageLoading.value = false
          if(user.personal_message.status===200){
              theme.pushMessage("You have successfully added Personal Information");
              show_education.value=true
          }
          else{
            theme.pushMessage(user.error_personal_data);
            user.error_personal_data=""
            pageLoading.value = false

          }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
      pageLoading.value = false
    }
         
        }
        catch(err){
          theme.pushMessage("Something went wrong");
          pageLoading.value = false
        }
  }
};

function ValidatePassKey(currentid) {
              let currentval = document.getElementById(currentid)
              if (currentval) {
                currentval.onkeyup = function(e) {
                  var target = e.srcElement || e.target;
                  var maxLength = parseInt(target.attributes["maxlength"].value, 10);
                  var myLength = target.value.length;
                  if (myLength >= maxLength) {
                    var next = target;
                    while (next = next.nextElementSibling) {
                      if (next == null)
                        break;
                      if (next.tagName.toLowerCase() === "input") {
                        next.focus();
                        break;
                      }
                    }
                  }
                  else if (myLength === 0) {
                    var previous = target;
                    while (previous = previous.previousElementSibling) {
                      if (previous == null)
                        break;
                      if (previous.tagName.toLowerCase() === "input") {
                        previous.focus();
                        break;
                      }
                    }
                  }
                }
              }
            }  
const passShowHideClicked = ref(true)
function  countDownTimer(count){

     if(count > 0 ) {
            timeOut.value = setTimeout(() => {
                count -= 1
                countDown.value = count
                countDownTimer(count)
            }, 1000)

        }
    }  
const show_experience = ref(false)
const show_other = ref(false)
const personal = async () => {
  show_education.value=false
}

const sameasabove = async () => {
 

  if(form.same_as_above===true){
    form.permanentaddress.state_id = form.tempaddress.state_id
    form.permanentaddress.district_id = form.tempaddress.district_id
    form.permanentaddress.address = form.tempaddress.address
    form.permanentaddress.pincode = form.tempaddress.pincode
    form.permanentaddress.otherpincode = form.tempaddress.otherpincode
    form.permanentaddress.other_pincode = form.tempaddress.other_pincode
  }
  else{
    form.permanentaddress.state_id = null
    form.permanentaddress.district_id = null
    form.permanentaddress.address = ""
    form.permanentaddress.pincode = null
    form.permanentaddress.otherpincode = false
    form.permanentaddress.other_pincode = ""

  }
}

// const checkbox = document.getElementById('myCheckbox')
// console.log("checkbox value",checkbox)
// checkbox.addEventListener('change', (event) => {
//   if(form.same_as_above===false){
//     form.permanentaddress.state_id = form.tempaddress.state_id
//     form.permanentaddress.district_id = form.tempaddress.district_id
//     form.permanentaddress.address = form.tempaddress.address
//     form.permanentaddress.pincode = form.tempaddress.pincode
//   }
//   else{
//     form.permanentaddress.state_id = null
//     form.permanentaddress.district_id = null
//     form.permanentaddress.address = ""
//     form.permanentaddress.pincode = null

//   }
// })
const educational = async () => {
  show_education.value=true
}
const experience = async () => {
  show_experience.value=true
}
const other = async () => {
  show_other.value=true
}

  // function  onFileChange(e) {
  //   var files = e.target.files || e.dataTransfer.files;
  //   for (const name in files) {
  //     if (files.hasOwnProperty(name)) {
  //       form.images = files[name];
  //       if (form.images.size >= 5242880) {
  //         alert("Image size should be less than 5MB");
  //         image_size.value=true
  //       }
  //       else {
  //         form.images = files[name];
  //       }
  //     }
  //   }

  // }

    function  onFileChange1(e) {
      var files = e.target.files || e.dataTransfer.files;

      form1.upload=files[0]

      // for (const name in files) {
      //   if (files.hasOwnProperty(name)) {
      //     form.images = files[name];
      //     if (form.images.size >= 2000000) {
      //       alert("Image size should be less than 2MB");
      //       $refs.file.value = "";
      //       image_size.value=true
      //     }else if(form.images.size <= 500000){
      //       alert("Image size should be greater than 500KB");
      //       $refs.file.value = "";
      //       image_size.value=true
      //     } else {
      //       form.images = files[name];
      //     }
      //   }
      // }
    }

</script>

<style>
@media (min-width:460px){
.flexsize{
  display: flex;
}
}
</style>