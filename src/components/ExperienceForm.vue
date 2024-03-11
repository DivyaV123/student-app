
<template>
  <main-section v-if="show_educational===false && show_personal===false && show_other===false">
    <div class="grid grid-cols-1 gap-6 mb-6 xl:grid-cols-4">
      <card-component :smallerPadding="true"  v-if="pageLoading" class="mb-6">
          <div wire:loading class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
          <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
          <p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
        </div>
        </card-component>
      <card-component v-else
        :icon="mdiBallot"
        class="mb-6 lg:mb-0 lg:col-span-2 xl:col-span-4 text-amber-400"
        :hasprofilepadding="true"
      >
      <div class="max-w-full mx-auto my-4  pb-0">	
	<div class="flex pt-0">
		<div class="flex-1">
		</div>

		<div class="flex-1">
			<div class="w-10 h-10 bg-gray-900 mx-auto text-lg text-white flex items-center">
				<jb-button class="text-center w-full h-full text-xs" :color="user.personal_data&&user.personal_data.gender?'white':'info'"  :icon="user.personal_data&&user.personal_data.gender?mdiCheck:mdiAccountAlertOutline"></jb-button>
			</div>
      <div class="flex text-xs content-center text-center items-center justify-center font-bold text-white">
        <label v-if="user.personal_data&&user.personal_data.gender" for="html">Personal Details
        </label>
        <label v-else for="html">Add Personal Details
        </label>
		</div>
		</div>


		<div class="w-1/6 align-center items-center align-middle content-center flex">
			<div class="w-full bg-blue-600  items-center align-middle align-center flex-1">
			 	<div class=" text-xs leading-none py-1 text-center text-white rounded " style="width: 100%"></div>
			</div>
		</div>
	
		
		<div class="flex-1">
			<div class="w-10 h-10 bg-gray-900 mx-auto rounded-full text-lg text-white flex items-center">
				<jb-button class=" text-center w-full h-full" :color="user.educational_data&&user.educational_data.highestdegree&&user.educational_data.highestdegree.name?'white':'info'" :icon="user.educational_data&&user.educational_data.highestdegree&&user.educational_data.highestdegree.name?mdiCheck:mdiBookEducation" ></jb-button>
			</div>

      <div class="flex text-xs content-center text-center items-center justify-center font-bold text-white">
        <label v-if="user.educational_data&&user.educational_data.highestdegree&&user.educational_data.highestdegree.name" for="html">Educational Details
    </label>
    <label v-else for="html">Add Educational details
    </label>
</div>
		</div>
	
		<div class="w-1/6 align-center items-center align-middle content-center flex">
			<div :class="
                  user.educational_data&&user.educational_data.highestdegree&&user.educational_data.highestdegree.name
                    ? 'w-full bg-blue-600  items-center align-middle align-center flex-1'
                    : 'w-full bg-grey-300  items-center align-middle align-center flex-1'
                ">
			 	<div class=" text-xs leading-none py-1 text-center text-white rounded " :style="user.educational_data&&user.educational_data.highestdegree&&user.educational_data.highestdegree.name?'width: 100%':'width: 0%'"></div>
			</div>
		</div>
	
		<div class="flex-1">
			<div class="w-10 h-10 bg-gray-900  mx-auto text-lg text-white flex items-center">
				<jb-button class=" text-center w-full h-full" :color="user.experience_data&&user.experience_data.experience!=null?'white':'info'"   :icon="user.experience_data&&user.experience_data.experience!=null?mdiCheck:mdiAccountCogOutline"></jb-button>
			</div>

      <div class="flex text-xs content-center text-center items-center justify-center font-bold text-white" v-if="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'">
        <label v-if="user.experience_data&&user.experience_data.experience!=null" for="html">Experience Details
        </label>
        <label v-else for="html">Add Experience details
        </label>
		</div>
		</div>
	
	
		<div  v-if="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'" class="w-1/6 align-center items-center align-middle content-center flex">
			<div
          :class="
            user.experience_data &&
            user.experience_data.experience!=null
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
                    user.experience_data.experience!=null
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
                      user.experience_data.experience!=null) ||
                    (user.personal_data &&
                      user.personal_data.fresherexp &&
                      user.personal_data.fresherexp.Name == 'fresher' &&
                      user.educational_data&&user.educational_data.highestdegree&&user.educational_data.highestdegree.name)
                      ? other()
                      : null
                  "
                ></jb-button>
			</div>

      <div class="flex text-xs content-center text-center items-center justify-center font-bold text-white">
        <label v-if="user.other_data" for="html">Other Details
        </label>
        <label v-else for="html">Add Other Details
        </label>
		</div>
		</div>
	
	
		<div class="flex-1">
		</div>		
	</div>
	
	<div class="flex text-xs content-center text-center">
		<!-- <div class="w-1/4 font-bold text-white">
    <label v-if="user.personal_data&&user.personal_data.gender" for="html">Edit Personal Details
</label>
<label v-else for="html">Add Personal Details
</label>
</div>

<div class="w-1/4 font-bold text-white">
    <label v-if="user.educational_data&&user.educational_data.tenth&&user.educational_data.tenth.yop" for="html">Edit Educational Details
</label>
<label v-else for="html">Add Educational details
</label>
</div>

<div class="w-1/4 font-bold text-white" v-if="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'">
<label v-if="user.experience_data&&user.experience_data.company&&user.experience_data.company.name" for="html">Edit Experience Details
</label>
<label v-else for="html">Add Experience details
</label>
</div>

<div class="w-1/4 font-bold text-white">
    <label v-if="user.other_data" for="html">Edit Other Details
</label>
<label v-else for="html">Add Other Details
</label>
</div>			 -->
	</div>
</div>
<div class="border border-white shadow-md shadow-white mb-5">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 gap-1">

        <field label="Do you have Work experience?" class="text-white text-sm box-border h-24 w-50 p-2 border-0 border-gray-700"  :error="form.experience !== null ? false : true">
        <div>
              <label class="cursor-pointer label" for="expyes">
                <span class="label-text font-medium pr-1 text-white text-sm">Yes</span> 
                <input type="radio"
                      id="expyes"
                      name="exp"
                      :value="true"
                      :native-value="true"
                      @click="changingexperience()"
                      v-model="form.experience" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm">
              </label>
              <label class="cursor-pointer label" for="expno">
                <span class="label-text font-medium pl-4 pr-1 text-white text-sm">No</span> 
                <input type="radio"
                      id="expno"
                      name="exp"
                      :value="false"
                      :native-value="false"
                      @click="changingexperience()"
                      v-model="form.experience" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm">
              </label> 
            </div> 
       </field>
       <div v-if="form.experience===true">
      <div 
          class="
          w-full
              text-white text-center
              text-sm
              font-semibold
              bg-black
             rounded-lg
              pl-1
              pr-1
              py-1
              mb-2
          "
          >
          Total Experience
          </div>
          <div class="grid md:grid-cols-2 sm:grid-cols-2 gap-1 m-3">

              <field  label="Year" :error="form.experience_year !== null ? false : true" help="Please select year" class="text-white text-sm">
                  <Multiselect
                      v-model="form.experience_year"
                      valueProp ="name"
                      label="name"
                      class="border border-white text-xs text-white"
                      searchable
                      placeholder="Select total year"
                      track-by ="name"
                      :classes="selectClasses" 
                      @click="changing"
                      :options="form.year"
                    />
                </field>
                <!-- </label>
               <label for="html" v-if="form.experience===true">               -->
                <field  label="Month" :error="form.experience_month !== null ? false : true" help="Please select month" class="text-white text-sm sm:h-2">
                  <Multiselect
                      v-model="form.experience_month"
                      valueProp ="name"
                      label="name"
                      class="border border-white text-xs text-white"
                      searchable
                      placeholder="Select total month"
                      track-by ="name"
                      :classes="selectClasses" 
                      @click="changing"
                      :options="form.months1"
                    />
                </field>
          </div>
       </div>
      </div>
      <div >
      <div 
          class="
          w-full
              text-white text-center
              text-sm
              font-semibold
              bg-black
             rounded-lg
              pl-1
              pr-1
              py-1
          "
          v-if="form.experience===true">
          Type of Experience
          </div>

       <field v-if="form.experience===true"  :error="form.type_of_experience !== null ? false : true" help="Please select type of experience" class="text-white text-sm box-border h-[130px] sm:h-24 w-50 p-2 border-2 border-gray-700">
         <div>
              <label class="cursor-pointer label" for="development">
                <span class="label-text font-medium pr-1 text-white text-base">Development</span> 
                <input type="radio"
                      id="development"
                      name="development"
                      value="Development"
                      native-value="Development"
                      v-model="form.type_of_experience" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm">
              </label>
              <label class="cursor-pointer label" for="testing">
                <span class="label-text font-medium pl-4 pr-1 text-white text-base">Testing</span> 
                <input type="radio"
                      id="testing"
                      name="testing"
                      value="Testing"
                      native-value="Testing"
                      v-model="form.type_of_experience" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm">
              </label> 
              <label class="cursor-pointer label" for="it">
                <span class="label-text font-medium pl-4 pr-1 text-white text-base">IT support/BPO</span> 
                <input type="radio"
                      id="it"
                      name="it"
                      value="IT support/BPO"
                      native-value="IT support/BPO"
                      v-model="form.type_of_experience" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm">
              </label> 
              <label class="cursor-pointer label" for="any">
                <span class="label-text font-medium pl-4 pr-1 text-white text-base">Any business process</span> 
                <input type="radio"
                      id="any"
                      name="any"
                      value="Any business process"
                      native-value="Any business process"
                      v-model="form.type_of_experience" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm">
              </label> 
              <label class="cursor-pointer label" for="others">
                <span class="label-text font-medium pl-4 pr-1 text-white text-base">Others</span> 
                <input type="radio"
                      id="others"
                      name="others"
                      value="Others"
                      native-value="Others"
                      v-model="form.type_of_experience" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm">
              </label> 
            </div> 
         <!-- <div
              v-for="(datas, index1) in statess"
              :key="index1"
            >
         
            <label class="cursor-pointer label" :for="datas.name">
            <span class="label-text font-bold pr-1 text-white text-sm"
            >{{datas.name}}</span
          >
          <input
                type="radio"
                :id="datas.name"
                :name="datas.name"
                :value="datas.name"
                :native-value="datas.name"
                @click="changing"
                v-model="form.type_of_experience"
                class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
              /> 
            </label>
            
          </div>  -->
           </field> 
        
      </div>
        <!-- <field
                class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700"
                >
                <check-radio-picker
                    v-model="form.present"
                    name="sample-checkbox-two"
                    :options="checkboxOptions2"
                    class="mb-[10px] font-bold"
                    column
                />
                </field> -->
              <!-- <label v-if="form.experience===true" for="html" class="text-sm text-white font-bold">Total Experience -->
               
              <!-- </label> -->
            <div class="grid md:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 gap-1 ">
              <field label="Currently are you working?" class="text-white text-sm box-border h-24 w-50 p-2" v-if="form.experience===true" :error="form.working !== null ? false : true" >
              <div>
                    <label class="cursor-pointer label" for="workyes">
                      <span class="label-text font-medium pr-1 text-white text-sm">Yes</span> 
                      <input type="radio"
                            id="workyes"
                            name="work"
                            :value="true"
                            :native-value="true"
                            @click="changingworking()"
                            v-model="form.working" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm">
                    </label>
                    <label class="cursor-pointer label" for="workno">
                      <span class="label-text font-medium pl-4 pr-1 text-white text-sm">No</span> 
                      <input type="radio"
                            id="workno"
                            name="work"
                            :value="false"
                            :native-value="false"
                            @click="changingworking()"
                            v-model="form.working" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm">
                    </label> 
                  </div> 
            </field>
            <div v-if="form.experience===true&&form.working===false">
          <div 
              class="
                  w-full
                  text-white text-center
                  text-sm
                  font-medium
                  bg-black
                rounded-lg
                  pl-1
                  pr-1
                  py-1
              "
              >
              Since how many years you are not working?
              </div>
              <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-1 m-3">
              <field  label="Year"  :error="form.notworking_year !== null ? false : true"  help="Please select Year" class="lg:h-20 h-auto text-white text-sm">
                  <Multiselect
                      v-model="form.notworking_year"
                      valueProp ="name"
                      label="name"
                      class="border border-white text-xs text-white"
                      searchable
                      placeholder="Select Year"
                      track-by ="name"
                      :classes="selectClasses" 
                      @click="changing"
                      :options="form.year1"
                    />
                </field>
            
                <field  label="Month" :error="form.notworking_month !== null ? false : true" help="Please select Month" class="lg:h-20 h-auto text-white text-sm">
                  <Multiselect
                      v-model="form.notworking_month"
                      valueProp ="name"
                      label="name"
                      class="border border-white text-xs text-white"
                      searchable
                      placeholder="Select Month"
                      track-by ="name"
                      :classes="selectClasses" 
                      @click="changing"
                      :options="form.months1"
                    />
                </field>
              </div>
            </div>
            </div>
  
     </div>
     <div v-if="((form.experience===true&&form.working===true)||((form.experience===true&&show_exp===true)||(form.experience===true&&form.working===false)))"
          class="
              w-full
              text-white text-center
              text-sm
              font-bold
              bg-black
             rounded-lg
              pl-1
              pr-1
              py-1
          "
          >
          Work Experience
          </div>
          <div class="border border-white shadow-md mb-5" v-if="form.experience===true&&form.working===true">
                    <div
                    >
          <div  class="grid md:grid-cols-3 xl:grid-cols-5 sm:grid-cols-2 gap-1">
              <field label="Current working company" :error="
                    ((form.company!=null)&&(!/^[\.]+$/.test(form.company)))
                      ? false
                      : 'Current company name is required'" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700" help="Please enter company">
                        <control
                        v-model="form.company"
                        name="URL"
                        placeholder="Enter company"
                        autocomplete="username"
                        />
                    </field>
                    <field label="Current Designation" :error="
                    ((form.designation!=null)&&(!/^[\.]+$/.test(form.designation)))
                      ? false
                      : 'Current company Designation is required'" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700" help="Please enter designation">
                        <control
                        v-model="form.designation"
                        name="URL"
                        placeholder="Enter designation"
                        autocomplete="username"
                        />
                    </field>

                    <field label="Current CTC" :error="
                    ((form.ctc!=null)&&(!/^[\.]+$/.test(form.ctc)))
                      ? false
                      : 'Current company CTC is required'" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700" help="Please enter ctc">
                        <control
                        v-model="form.ctc"
                        name="URL"
                        placeholder="Enter ctc"
                        autocomplete="username"
                        />
                    </field>
                    <field label="Total experience in this company" :error="
                    ((form.total_experience!=null)&&(!/^[\.]+$/.test(form.total_experience)))
                      ? false
                      : 'Current company Total experience is required'" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700" help="Please enter total experience">
                        <control
                        v-model="form.total_experience"
                        name="URL"
                        placeholder="Enter total experience"
                        autocomplete="username"
                        />
                    </field>
                    <field label="Notice period" :error="
                    ((form.notice_peiod!=null)&&(!/^[\.]+$/.test(form.notice_peiod)))
                      ? false
                      : 'Current company Notice Period is required'" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700" help="Please enter notice period">
                        <control
                        v-model="form.notice_peiod"
                        name="URL"
                        placeholder="Enter notice period"
                        autocomplete="username"
                        />
                    </field>
                      <field label="Currently serving notice period?" :error="form.serving_notice_period !== null ? false : true" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700">
                        <div>
                              <label class="cursor-pointer label" for="noticeyes">
                                <span class="label-text font-bold pr-1 text-white text-sm">Yes</span> 
                                <input type="radio"
                                      id="noticeyes"
                                      name="notice"
                                      :value="true"
                                      :native-value="true"
                                      @click="changeservingnoticeperiod()"
                                      v-model="form.serving_notice_period" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm">
                              </label>
                              <label class="cursor-pointer label" for="noticeno">
                                <span class="label-text font-bold pl-4 pr-1 text-white text-sm">No</span> 
                                <input type="radio"
                                      id="noticeno"
                                      name="notice"
                                      :value="false"
                                      :native-value="false"
                                      @click="changeservingnoticeperiod()"
                                      v-model="form.serving_notice_period" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm">
                              </label> 
                            </div> 
                      </field>
                       <field v-if="form.serving_notice_period===true" label="Pending notice period days" :error="
                    ((form.pending_days!=null)&&(!/^[\.]+$/.test(form.pending_days)))
                      ? false
                      : 'Current company Notice Period is required'" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700" help="Please enter notice period days">
                        <control
                        v-model="form.pending_days"
                        name="URL"
                        placeholder="Enter notice period days"
                        autocomplete="username"
                        />
                    </field>
                     <field label="Skills" :error="
                    ((form.skills!=null)&&(!/^[\.]+$/.test(form.skills)))
                      ? false
                      : 'Current company Skills is required'" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700" help="Please enter skills">
                        <control
                        v-model="form.skills"
                        name="URL"
                        placeholder="Enter skills"
                        autocomplete="username"
                        />
                    </field>

          </div> 
                    </div>
                    <div v-if="show_button===false&&show_exp===false" class="flex flex-wrap">
                <div class="p-2">
                    <jb-button
                            label="Add Previous working Experience"
                            @click="addcompanies1"
                            color="success"
                            class="mt-2"
                          />
                    </div>
                    <!-- <div class="p-2" v-if="form.skillss.length > 1">
                    <jb-button 
                            label="Remove"
                            @click="removeskills"
                            color="danger"
                          />
                    </div>  -->
           </div>
          </div>

        
        <div class="border border-white shadow-md mb-4" v-if="(form.experience===true&&show_exp===true)||(form.experience===true&&form.working===false)">
                    <div
                      v-for="(datas, index1) in form.companies"
                      :key="index1"
                    >
           <div class="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-1 m-3">
                      <field label="Previous worked company" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700" help="Please enter company">
                        <control
                        v-model="datas.company"
                        name="URL"
                        placeholder="Enter company"
                        autocomplete="username"
                        />
                    </field>
                  <field label="Previous Designation" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700" help="Please enter Designation">
                        <control
                        v-model="datas.designation"
                        name="URL"
                        placeholder="Enter Designation"
                        autocomplete="username"
                        />
                    </field>

                    <field label="Previous CTC" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700" help="Please enter CTC">
                        <control
                        v-model="datas.ctc"
                        name="URL"
                        placeholder="Enter CTC"
                        autocomplete="username"
                        />
                    </field>

                    <field label="Total worked years in this company" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700" help="Please enter years">
                        <control
                        v-model="datas.years"
                        name="URL"
                        placeholder="Enter years"
                        autocomplete="username"
                        />
                    </field>

                      <field label="Skills" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700" help="Please enter skills">
                        <control
                        v-model="datas.skills"
                        name="URL"
                        placeholder="Enter skills"
                        autocomplete="username"
                        />
                    </field>                 
                    </div>
                    </div>
             


           <div class="flex flex-wrap gap-2 ">
                <div class="p-2">
                    <jb-button
                            label="Add Previous working Experience"
                            @click="addcompanies"
                            color="success"
                           
                          />
                    </div>
                    <div class="p-2" v-if="form.companies.length > 1">
                    <jb-button 
                            label="Remove Previous working Experience"
                            @click="removecompanies"
                            color="danger"
                          />
                    </div> 
           </div>
           </div>

      <template #footer>
        <level mobile>
          <jb-buttons>
             <jb-button
              label="Previous"
              type="submit1"
              color="info"
              @click="educational"
            /> 
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
  <education-form v-if="show_educational===true"/>
  <personal-form v-if="show_personal===true"/>
  <otherdetails-form v-if="show_other===true"/>
</template>

<script setup>
import { mdiAccount, mdiEyeOff,mdiProgressCheck,mdiAccountAlertOutline,mdiBookEducation,mdiAccountCogOutline,mdiExitRun,mdiCheck } from '@mdi/js'
import FormScreenSection from '@/components/FormScreenSection.vue'
import OtherdetailsForm from '@/components/OtherdetailsForm.vue'
import PersonalForm from '@/components/PersonalForm.vue'
import CardComponent from '@/components/CardComponent.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import TitleSubBar from '@/components/TitleSubBar.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import JbButton from '@/components/JbButton.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import EducationForm  from '@/components/EducationForm.vue'
import TextLink from '@/components/TextLink.vue'
import { themeStore } from "../stores/theme";
import { ref, computed, onBeforeMount,reactive} from "vue";
// import { useStorage } from "vue3-storage";
import { getdata } from "../stores/user";
import { sessionStore } from "../stores/session";
import { useRouter } from "vue-router";

import Multiselect from '@vueform/multiselect'
import { selectClasses } from '@/selectcss.js'
import dayjs from 'dayjs';
const pageLoading = ref(false)
const code = getdata();
const show_educational = ref(false);
const changing =(val) =>{
  degn_error.value=false,
  comp_error.value=false,

sinceyear_error.value=false,
sincemonth_error.value=false,
toyear_error.value=false,
tomonth_error.value=false,
 spe_error .value=false
ctc_error.value=false


}
const show_other = ref(false)
const other = async () => {
  show_other.value=true
}
const show_personal = ref(false)
const personal = async () => {
  show_personal.value=true
  show_educational.value=false
}
const educational = async () => {
  show_educational.value=true
  show_personal.value=false
}

const online = computed(() =>  user.isonline);
// const ls = useStorage();
const router = useRouter();
const user = sessionStore();
const current_user = ref("");
const token_value = ref("");
const theme = themeStore();
const token=ref("");
const show = ref(true);
const skip = ref(false);

const checkboxOptions = { false: 'Other Company' }
const checkboxOptions1 = { false: 'Are you serving Notice Period?' }

const checkboxOptions3 = { false: 'Skip adding educational information' }
const statess = computed(() => {
  return user.specialization;
});
const form = reactive({
   companies:[
        {
            designation:"",
            company:"",
            ctc:"",
            years:"",
            skills:""
        },
   ],
  type_of_experience:null,
  experience:null,
  experience_year:null,
  experience_month:null,
  working:null,
  notworking_year:null,
  notworking_month:null,
  company:null,
  designation:null,
  ctc:null,
  total_experience:null,
  notice_peiod:null,
  serving_notice_period:null,
  pending_days:null,
  skills:null,
  workingsince:null,
  workingtill:null,
  workingsincemonth:null,
  workingsinceyear:null,
  workingtillyear:null,
  workingtillmonth:null,
  totalnoticeperioddays:null,
  noticeperioddaysleft:null,
  servingnoticeperiod:false,
  companyindustry:null,
  url:'',
  currentworkingcity:null,
  describeyourprofessionalbackground:"",
  specialization:"",
  current_company:[
        {
          company:null,
          designation:null,
          ctc:null,
          experience:null,
          notice_peiod:null,
          serving_notice_period:null,
          pending_days:null,
          skills:null,
        },
   ],
  ctc:"",
  years: [...Array(11)].map((a, b) => (new Date().getMonth() + 1) - b),
  // noticeperiods: [...Array(12)].map((a, b) => (new Date().getMonth() + 1) - b),
  months: [...Array(12).keys()].map(i => i + 1),
  months1: [...Array(12).keys()].map(i => i),
  year1: [...Array(20).keys()].map(i=> i),
  year: [...Array(20).keys()].map(i=> i),
})

const changingexperience = async () => {
 form.experience_year = null,
 form.experience_month = null,
 form.type_of_experience=null,
 form.working=null,
 form.notworking_year = null,
 form.notworking_month = null,
 form.company = null,
 form.designation=null,
 form.ctc = null,
 form.total_experience = null,
 form.notice_peiod = null,
 form.serving_notice_period=null,
 form.pending_days = null,
 form.skills=null,
 form.companies=[
        {
            designation:"",
            company:"",
            ctc:"",
            years:"",
            skills:""
        },
   ]


};


const changingworking = async () => {
 form.notworking_year = null,
 form.notworking_month = null,
 form.company = null,
 form.designation=null,
 form.ctc = null,
 form.total_experience = null,
 form.notice_peiod = null,
 form.serving_notice_period=null,
 form.pending_days = null,
 form.skills=null,
 form.companies=[
        {
            designation:"",
            company:"",
            ctc:"",
            years:"",
            skills:""
        },
   ]


};


const changeservingnoticeperiod = async () => {
 form.pending_days = null
};

const fetchdesignation = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      let courses = await user.getdomain(query);
  return courses
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
 
};

const fetchcompany = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      let courses = await user.getcompany(query);
  return courses
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
 
};

const fetchcity = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      let courses = await user.getrelocation(query);
    return courses
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
  
};

const fetchspecialization = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      let courses = await user.getspecialization(query); 
 return courses
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
  

};

const fetchindustry = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      let courses = await user.getindustry(query);

return courses
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }

};

const fetchskill = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      let courses = await user.getskills(query);

return courses
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
  
};
const show_exp = ref(false)
// const checkboxOptions2 = await user.getspecialization()
onBeforeMount(async () => {
  await user.checkonlines();

  pageLoading.value = true
  window.scrollTo(0, 0);
  await user.checkUser();
  if (user.$state.loggedIn===false) {
    router.push("/login");

  }
  if(online.value===true){
  await user.getstudent();
  await user.getdomain();
  await user.getcompany();
  await user.getskills();
  await user.getspecialization();
  await user.getindustry();
  await user.getrelocation();
  await user.getvalidations();
  }
  else{
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  }
  // if(user.experience_data.company && user.experience_data.company.name){
  //   form.company = user.experience_data.company
  // }
  // if(user.experience_data.other_company===true){
  //   form.other_company=true
  //   form.othercompany=user.experience_data.othercompany
  // }
  // if(user.experience_data.designation && user.experience_data.designation.name){
  //   form.designation = user.experience_data.designation
  // }
  // if(user.experience_data.workingtill){
  //   form.workingtill = user.experience_data.workingtill
  // }
  // if(user.experience_data.workingsince){
  //   form.workingsince = user.experience_data.workingsince
  //   form.present = user.experience_data.present
  //   form.servingnoticeperiod = user.experience_data.servingnoticeperiod
  //   form.noticeperioddaysleft = user.experience_data.noticeperioddaysleft
  //   form.totalnoticeperioddays = user.experience_data.totalnoticeperioddays
  //   form.describeyourprofessionalbackground = user.experience_data.describeyourprofessionalbackground
  // }
  // if(user.experience_data.ctc){
  //   form.ctc = user.experience_data.ctc
  // }
  // if(user.experience_data.skills){
  //   form.skillss = user.experience_data.skills
  // }
  // if(user.experience_data.companies){
  //   form.companies = user.experience_data.companies
  // }
  // if(user.experience_data.specialization){
  //   form.specialization = user.experience_data.specialization
  // }
  // if(user.experience_data.companyindustry){
  //   form.companyindustry = user.experience_data.companyindustry
  // }
  // if(user.experience_data.currentworkingcity){
  //   form.currentworkingcity = user.experience_data.currentworkingcity
  // }
  pageLoading.value = false

});



function addcompanies() {
      show_exp.value=true
      form.companies.push({
        designation:"",
        company:"",
        ctc:"",
        years:"",
        skills:""

      });
    }
const show_button = ref(false)
    function addcompanies1() {
      show_button.value=true
      show_exp.value=true
      // form.companies.push({
      //   designation:"",
      //   company:"",
      //   ctc:"",
      //   years:"",
      //   skills:""

      // });
    }
function removecompanies() {
  
      form.companies.pop({
        designation:"",
        company:"",
        ctc:"",
        years:"",
        skills:""
      });
    }
const experience_error = ref(false)    
const experienceyear_error = ref(false)
const experiencemonth_error = ref(false)
const experiencetype_error = ref(false)
const working_error = ref(false)
const notworkingyear_error = ref(false)
const notworkingmonth_error = ref(false)
const degn_error = ref(false)
const comp_error = ref(false)
const ctc_error = ref(false)
const exp_company_error = ref(false)
const notice_period_error = ref(false)
const serving_notice_period_error = ref(false)
const pending_notice_period_error = ref(false)
const skills_error = ref(false)
const sinceyear_error = ref(false)
const sincemonth_error = ref(false)
const toyear_error = ref(false)
const tomonth_error = ref(false)
const spe_error = ref(false)


const nanfunc = async () => {
  router.push("/otherdetails_form");
};

const submit = async () => {
  let valid = true
  if(form.experience === null )
  {
    experience_error.value = "This field is required"
    theme.pushMessage("Please select if you have experience or not?")
    valid=false
   
  }

  if(form.experience === true && form.experience_year===null )
  {

    experienceyear_error.value = "This field is required"
    theme.pushMessage("Total experience year is required")
    valid=false
   
  }
  if(form.experience === true && form.experience_month===null)
  {

    experiencemonth_error.value = "This field is required"
    theme.pushMessage("Total experience month is required")
    valid=false
   
  }
  if(form.experience === true && form.type_of_experience===null )
  {

    experiencetype_error.value = "This field is required"
    theme.pushMessage("Type of experience is required")
    valid=false
  }
 
  if(form.experience === true && form.working===null )
  {

    working_error.value = "This field is required"
    theme.pushMessage("Please select if you are working currently")
    valid=false
  }
  if(form.experience === true && form.working===false&&form.notworking_year===null )
  {

    notworkingyear_error.value = "This field is required"
    theme.pushMessage("Please select year if you are not working currently")
    valid=false
  }
  if(form.experience === true && form.working===false&&form.notworking_month===null )
  {

    notworkingmonth_error.value = "This field is required"
    theme.pushMessage("Please select month if you are not working currently")
    valid=false
  }
  // if(form.experience===true&&form.working===true&&form.company===null )
  // {

  //   comp_error.value = "This field is required"
  //   theme.pushMessage("Please enter company")
  //   valid=false
  // }
  if(form.experience===true&&form.working===true&&(form.company===null||!String(form.company).replace(/\s/g, '').length) )
  {

    comp_error.value = "This field is required"
    theme.pushMessage("Please enter company")
    valid=false
  }
  // if(form.experience===true&&form.working===true&&form.designation===null )
  // {

  //   degn_error.value = "This field is required"
  //   theme.pushMessage("Please enter Designation")
  //   valid=false
  // }
   if(form.experience===true&&form.working===true&&(form.designation===null||!String(form.designation).replace(/\s/g, '').length) )
  {

    degn_error.value = "This field is required"
    theme.pushMessage("Please enter Designation")
    valid=false
  }
  // if(form.experience===true&&form.working===true&&form.ctc===null )
  // {

  //   ctc_error.value = "This field is required"
  //   theme.pushMessage("Please enter ctc")
  //   valid=false
  // }
  if(form.experience===true&&form.working===true&&(form.ctc===null||!String(form.ctc).replace(/\s/g, '').length) )
  {

    ctc_error.value = "This field is required"
    theme.pushMessage("Please enter ctc")
    valid=false
  }
  // if(form.experience===true&&form.working===true&&form.total_experience===null )
  // {

  //   ctc_error.value = "This field is required"
  //   theme.pushMessage("Please enter total experience")
  //   valid=false
  // }
  if(form.experience===true&&form.working===true&&(form.total_experience===null||!String(form.total_experience).replace(/\s/g, '').length))
  {

    exp_company_error.value = "This field is required"
    theme.pushMessage("Please enter total experience")
    valid=false
  }
  if(form.experience===true&&form.working===true&&(form.notice_peiod===null||!String(form.notice_peiod).replace(/\s/g, '').length) )
  {

    notice_period_error.value = "This field is required"
    theme.pushMessage("Please enter notice period")
    valid=false
  }
  // if(form.experience===true&&form.working===true&&(!String(form.notice_peiod).replace(/\s/g, '').length) )
  // {

  //   notice_period_error.value = "This field is required"
  //   theme.pushMessage("Please enter notice period")
  //   valid=false
  // }
  if(form.experience===true&&form.working===true&&form.serving_notice_period===null )
  {

    serving_notice_period_error.value = "This field is required"
    theme.pushMessage("Please select if you are serving notice period")
    valid=false
  }
  // if(form.experience===true&&form.working===true&&form.serving_notice_period===true&&form.pending_days===null )
  // {

  //   pending_notice_period_error.value = "This field is required"
  //   theme.pushMessage("Please enter pending notice period days")
  //   valid=false
  // }
  if(form.experience===true&&form.working===true&&form.serving_notice_period===true&&(form.pending_days===null||!String(form.pending_days).replace(/\s/g, '').length) )
  {

    pending_notice_period_error.value = "This field is required"
    theme.pushMessage("Please enter pending notice period days")
    valid=false
  }
  if(form.experience===true&&form.working===true&&(form.skills===null||!String(form.skills).replace(/\s/g, '').length) )
  {

    skills_error.value = "This field is required"
    theme.pushMessage("Please enter skills")
    valid=false
  }
  // if(form.experience===true&&form.working===true&&(!String(form.skills).replace(/\s/g, '').length) )
  // {

  //   skills_error.value = "This field is required"
  //   theme.pushMessage("Please enter skills")
  //   valid=false
  // }

  if(valid===true){
    try{
      pageLoading.value = true
      await user.checkonlines();
    if(online.value===true){
      if(form.companies[0].company!=""){
         form.companies=form.companies
       }
       else{
         form.companies=null
       }
       let data1 = new FormData();
       data1.append("experiencedetails",JSON.stringify({ 
                "experience":form.experience,
                "total_experience_duration":form.experience_year+"year"+"-"+form.experience_month+"month",
                "type_of_experience":form.type_of_experience,
                "working":form.working,
                "not_working_duration":form.notworking_year+"year"+"-"+form.notworking_month+"month",
                "company":form.company,
                "designation":form.designation,
                "ctc":form.ctc,
                "current_total_experience":form.total_experience,
                "totalnoticeperioddays":form.notice_peiod,
                "servingnoticeperiod":form.serving_notice_period,
                "noticeperioddaysleft":form.pending_days,
                "skills":form.skills,
                "previous_company":form.companies,
                }))
           
          await user.experience({
                "experiencedetails":{"experience":form.experience,
                "total_experience_duration":form.experience_year+"year"+"-"+form.experience_month+"month",
                "type_of_experience":form.type_of_experience,
                "working":form.working,
                "not_working_duration":form.notworking_year+"year"+"-"+form.notworking_month+"month",
                "company":form.company,
                "designation":form.designation,
                "ctc":form.ctc,
                "current_total_experience":form.total_experience,
                "totalnoticeperioddays":form.notice_peiod,
                "servingnoticeperiod":form.serving_notice_period,
                "noticeperioddaysleft":form.pending_days,
                "skills":form.skills,
                "previous_company":form.companies}});
                
          if(user.experience_message.status===200){
            theme.pushMessage("You have successfully added Experience Information");
            if(user.validation&&user.validation.other===false){
              show_other.value=true
            }
            else{
              router.push("/");
            }
            
          }
          else 
          {
            theme.pushMessage(user.error_experience_data);
            user.error_experience_data=""
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

</script>

<style >
.hello{
  width:100%
}
.modal-card-body{
 overflow-y: auto;
 -ms-overflow-style: none;
}
input.largerCheckbox {
            width: 20px;
            height: 20px;
        }


</style>


