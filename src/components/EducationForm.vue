
<template>
  <main-section
    v-if="
      show_personal === false &&
      show_experience === false &&
      show_other === false
    "
  >
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
        <div class="max-w-full mx-auto my-4 pb-0">
          <div class="flex pt-0">
            <div class="flex-1"></div>

            <div class="flex-1">
              <div
                class="
                  w-10
                  h-10
                  bg-gray-900
                  mx-auto
                  text-lg text-white
                  flex
                  items-center
                "
              >
                <jb-button
                  class="text-center w-full h-full text-xs"
                  :color="user.personal_data&&user.personal_data.gender?'white':'info'"
      
                  :icon="user.personal_data&&user.personal_data.gender?mdiCheck:mdiAccountAlertOutline"
                ></jb-button>
              </div>

              <div class="flex text-xs content-center text-center items-center justify-center" :class="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'?'font-bold text-white':'font-bold text-white'">
              <label v-if="user.personal_data&&user.personal_data.gender" for="html">Personal Details
                  </label>
                  <label v-else for="html">Add Personal Details
                  </label>
              </div>
            </div>

            <div :class="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'?'w-1/6 align-center items-center align-middle content-center flex':'w-1/4 align-center items-center align-middle content-center flex'">
              <div
                class="
                  w-full
                  bg-blue-600
                  items-center
                  align-middle align-center
                  flex-1
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
                  style="width: 100%"
                ></div>
              </div>
            </div>

            <div class="flex-1">
              <div
                class="
                  w-10
                  h-10
                  bg-gray-900
                  mx-auto
                  rounded-full
                  text-lg text-white
                  flex
                  items-center
                "
              >
                <jb-button
                  class="text-center w-full h-full"
                  :color="user.educational_data&&user.educational_data.tenth&&user.educational_data.tenth.yop?'white':'info'"
                  :icon="user.educational_data&&user.educational_data.tenth&&user.educational_data.tenth.yop?mdiCheck:mdiBookEducation"
                  @click="educational"
                ></jb-button>
              </div>

              <div class="flex text-xs content-center text-center items-center w-auto justify-center" :class="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'?'font-bold text-white':'font-bold text-white'">
    <label v-if="user.educational_data&&user.educational_data.tenth&&user.educational_data.tenth.yop" for="html">Educational Details
    </label>
    <label v-else for="html">Add Educational details
    </label>
</div>
            </div>

            <div :class="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'?'w-1/6 align-center items-center align-middle content-center flex':'w-1/4 align-center items-center align-middle content-center flex'">
              <div
                :class="
                  user.educational_data &&
                  user.educational_data.tenth &&
                  user.educational_data.tenth.yop
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
                    user.educational_data &&
                    user.educational_data.tenth &&
                    user.educational_data.tenth.yop
                      ? 'width: 100%'
                      : 'width: 0%'
                  "
                ></div>
              </div>
            </div>

            <div
              class="flex-1"
              v-if="
                user.personal_data &&
                user.personal_data.fresherexp &&
                user.personal_data.fresherexp.Name == 'experienced'
              "
            >
              <div
                class="
                  w-10
                  h-10
                  bg-gray-900
                  mx-auto
                  text-lg text-white
                  flex
                  items-center
                "
              >
                <jb-button
                  class="text-center w-full h-full"
                  :color="user.experience_data&&user.experience_data.company&&user.experience_data.company.name?'white':'info'"
                  :icon="user.experience_data&&user.experience_data.company&&user.experience_data.company.name?mdiCheck:mdiAccountCogOutline"
                  v-on:click="
                    user.personal_data &&
                    user.educational_data.tenth &&
                    user.educational_data.tenth.yop
                      ? experience()
                      : null
                  "
                ></jb-button>
              </div>

              <div class="flex text-xs content-center text-center items-center justify-center font-bold text-white" v-if="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'">
    <label v-if="user.experience_data&&user.experience_data.company&&user.experience_data.company.name" for="html">Experience Details
        </label>
        <label v-else for="html">Add Experience details
        </label>
		</div>
            </div>

            <div
              v-if="
                user.personal_data &&
                user.personal_data.fresherexp &&
                user.personal_data.fresherexp.Name == 'experienced'
              "
              class="
                w-1/6
                align-center
                items-center
                align-middle
                content-center
                flex
              "
            >
              <div
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
              <div
                class="
                  w-10
                  h-10
                  bg-gray-900
                  mx-auto
                  text-lg text-white
                  flex
                  items-center
                "
              >
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

              <div class="flex text-xs content-center text-center items-center justify-center font-bold text-white" :class="user.personal_data&&user.personal_data.fresherexp&&user.personal_data.fresherexp.Name=='experienced'?'font-bold text-white':'font-bold text-white'">
    <label v-if="user.other_data" for="html">Other Details
        </label>
        <label v-else for="html">Add Other Details
        </label>
		</div>
            </div>

            <div class="flex-1"></div>
          </div>

          <div class="flex text-xs content-center text-center">
           			
          </div>
        </div>
        <field
          v-if="
            user.personal_data &&
            user.personal_data.fresherexp &&
            user.personal_data.fresherexp.Name === 'experienced'
          "
          class="mb-0"
        >
          <check-radio-picker
            v-model="skip"
            name="sample-checkbox-two"
            :options="checkboxOptions2"
            class="mb-0 text-red-600 font-bold"
            column
          />
        </field>
        <div class="border border-white shadow-sm shadow-white mb-5">
          <div class="grid md:grid-cols-3 xl:grid-cols-5 sm:grid-cols-1 gap-1">
          <field label="Highest Degree" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700" :error="form.highestdegree !== null ? false : true"  help="Please search highest degree here">
            <Multiselect
            v-model="form.highestdegree"
            valueProp="id"
            label="name"
            class="border border-white text-xs text-white"
            searchable
            placeholder="Search highest degree here"
            track-by ="name"
            :classes="selectClasses" 
            :object="true"
            @select="clearallfunction()"
            :options="studentdegree"
          />
       </field>
          </div>
          <div v-if="skip===false"
            class="
              flex
              border-b
              bg-black
              w-full
              text-white text-center
              font-bold
              pl-1
              pr-1
              
              border-white
              justify-center
              text-sm
            "
          >
            <p class="flex items-center py-2 font-bold text-center">
              *10th Information
            </p>
          </div>
          <div v-if="skip===false" class="grid md:grid-cols-3 xl:grid-cols-5 sm:grid-cols-2 gap-1">
            <field
              label="CGPA or Percentage?"
              :error="form.tenth.cgpa_percentage !== null ? false : true"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <div>
                <label class="cursor-pointer label" for="cgpa">
                  <span class="label-text font-medium pr-1 text-white text-sm"
                    >CGPA</span
                  >
                  <input
                    type="radio"
                    id="cgpa"
                    name="cgpa"
                    value="cgpa"
                    native-value="cgpa"
                    @click="changing10th"
                    v-model="form.tenth.cgpa_percentage"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
                <label class="cursor-pointer label" for="percentage">
                  <span
                    class="label-text font-medium pr-1 pl-4 text-white text-sm"
                    >Percentage</span
                  >
                  <input
                    type="radio"
                    id="percentage"
                    name="percentage"
                    value="percentage"
                    native-value="percentage"
                    @click="changing10th"
                    v-model="form.tenth.cgpa_percentage"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
              </div>
            </field>

            <field v-if="form.tenth.cgpa_percentage==='percentage'"
              label="10th Percentage"
              :error="
                    ((parseInt(form.tenth.percentage) > 35)&&(parseInt(form.tenth.percentage) < 100)||(form.tenth.percentage != Math.floor(form.tenth.percentage)))
                      ? false
                      : 'Add valid Percentage'" 
              help="Please enter Percentage"
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
                v-model="form.tenth.percentage"
                name="Percentage"
                placeholder="Enter 10th Percentage"
                autocomplete="username"
                @change="changing"
              />
            </field>

            <field v-if="form.tenth.cgpa_percentage==='cgpa'"
              label="10th CGPA"
              :error="
                    ((parseInt(form.tenth.cgpa) > 3)&&(parseInt(form.tenth.cgpa) < 10)||(form.tenth.cgpa != Math.floor(form.tenth.cgpa)))
                      ? false
                      : 'Add valid CGPA'" 
              help="Please enter CGPA"
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
                v-model="form.tenth.cgpa"
                name="CGPA"
                placeholder="Enter 10th CGPA"
                class="h-9"
                autocomplete="username"
                @change="changing"
              />
            </field>

            <field 
              label="10th Year of Pass Out"
              :error="form.tenth.yop !== null ? false : true"
              help="Please select Year of Pass Out"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <Multiselect
                v-model="form.tenth.yop"
                valueProp="id"
                label="name"
                class="border border-white text-xs text-white"
                searchable
                placeholder="Select 10th Year of Pass Out"
                track-by="name"
                :classes="selectClasses"
                @click="changing"
                :options="form1.years1"
              />
            </field>

            <!-- <field label="Do you have year gap in 10th?" :error="tengap_err" class="text-white text-sm box-border h-24 w-50 p-2 border-2 border-gray-700">
        <div>
            <label class="cursor-pointer label" for="yes">
              <span class="label-text font-bold pr-1 text-white text-sm">Yes</span> 
              <input type="radio"
                    id="yes"
                    name="ygtenth"
                    :value="true"
                    :native-value="true"
                     @click="changing" 
                    v-model="form.tenth.ygtenth" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm">
            </label>
            <label class="cursor-pointer label" for="no">
              <span class="label-text font-bold pl-4 pr-1 text-white text-sm">No</span> 
              <input type="radio"
                    id="no"
                    name="ygtenth"
                    :value="false"
                    :native-value="false"
                       @click="changing" 
                    v-model="form.tenth.ygtenth" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm">
            </label> 
          </div> 
       </field> -->
            
          </div>
        </div>
      <div class="grid md:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 gap-1 2xl:grid-cols-5" v-if="skip===false">
        <field
             :error="form1.value !== null ? false : true"
              help="Please choose the above option"
              v-if="
                (user.personal_data &&
                  form.highestdegree &&
                  form.highestdegree.name.toLowerCase() == 'degree') ||
                (user.personal_data &&
                  form.highestdegree &&
                  form.highestdegree.name.toLowerCase() == 'masters')
              "
              class="
                text-white text-sm
                box-border
                shadow-sm shadow-white
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <div class="flex flex-wrap pt-2">
                <!-- <check-radio-picker
                  v-model="form1.value"
                  name="value"
                  type="radio"
                  :options="radioOptions"
                  @click="changing"
                  column
                /> -->
                <label class="cursor-pointer label" for="2">
                  <span class="label-text font-medium pr-1 text-white text-sm"
                    >12th/PUC</span
                  >
                  <input
                    type="radio"
                    id="2"
                    name="2"
                    value="2"
                    native-value="12th/PUC"
                    @click="clearfunctions()"
                    v-model="form1.value"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
                <label class="cursor-pointer label" for="3">
                  <span
                    class="label-text font-medium pr-1 pl-4 text-white text-sm"
                    >ITI</span
                  >
                  <input
                    type="radio"
                    id="3"
                    name="3"
                    value="3"
                    native-value="ITI"
                   @click="clearfunctions()"
                    v-model="form1.value"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
                <label class="cursor-pointer label" for="1">
                  <span
                    class="label-text font-medium pr-1 pl-4 text-white text-sm"
                    >Diploma</span
                  >
                  <input
                    type="radio"
                    id="1"
                    name="1"
                    value="1"
                    native-value="Diploma"
                    @click="clearfunctions()"
                    v-model="form1.value"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
              </div>
            </field>
      </div>
   

        <div
          class="border border-white shadow-sm shadow-white mb-5"
          v-if="(form1.value == 2||(user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() == '12th/puc'))&&skip===false"
        >
          <div 
            class="
              flex
              border-b
              bg-black
              text-center
              font-semibold
              pl-1
              pr-1
              bg-black
              pr-1
              border-white
              justify-center
              text-white text-sm
            "
            v-if="form1.value == 2||(user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() == '12th/puc')"
          >
            <p class="flex items-center py-2 font-bold">*PUC Information</p>
          </div>
          <div
            v-if="form1.value == 2||(user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() == '12th/puc')"
            class="grid md:grid-cols-4 xl:grid-cols-5 sm:grid-cols-1 gap-1"
          >
          <field
              label="CGPA or Percentage?"
              :error="form.twelth.cgpa_percentage !== null ? false : true"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <div>
                <label class="cursor-pointer label" for="cgpa1">
                  <span class="label-text font-medium pr-1 text-white text-sm"
                    >CGPA</span
                  >
                  <input
                    type="radio"
                    id="cgpa1"
                    name="cgpa1"
                    value="cgpa"
                    native-value="cgpa"
                    @click="changing12th"
                    v-model="form.twelth.cgpa_percentage"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
                <label class="cursor-pointer label" for="percentage1">
                  <span
                    class="label-text font-medium pr-1 pl-4 text-white text-sm"
                    >Percentage</span
                  >
                  <input
                    type="radio"
                    id="percentage1"
                    name="percentage1"
                    value="percentage"
                    native-value="percentage"
                    @click="changing12th"
                    v-model="form.twelth.cgpa_percentage"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
              </div>
            </field>
            <field v-if="form.twelth.cgpa_percentage==='percentage'"
              label="12th Percentage"
              :error="
                    ((parseInt(form.twelth.percentage) > 35)&&(parseInt(form.twelth.percentage) < 100)||(form.twelth.percentage != Math.floor(form.twelth.percentage)))
                      ? false
                      : 'Add valid Percentage'" 
              help="Please enter Percentage"
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
                v-model="form.twelth.percentage"
                name="Percentage"
                class="text-xs"
                placeholder="Enter 12th percentage"
                autocomplete="username"
                @change="changing"
              />
            </field>

            <field v-if="form.twelth.cgpa_percentage==='cgpa'"
              label="12th CGPA"
              :error="
                ((parseInt(form.twelth.cgpa) > 3)&&(parseInt(form.twelth.cgpa) < 10)||(form.twelth.cgpa != Math.floor(form.twelth.cgpa)))
                  ? false
                  : 'Add valid CGPA'"
              help="Please enter CGPA"
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
                v-model="form.twelth.cgpa"
                name="CGPA"
                class="text-xs"
                placeholder="Enter 12th CGPA"
                autocomplete="username"
                @change="changing"
              />
            </field>
            <field
              label="12th Year of Pass Out"
              :error="form.twelth.yop !== null ? false : true"
              help="Please enter Year of Pass Out"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
              v-if="
                user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() != '12th/puc'
              "
            >
              <Multiselect
                v-model="form.twelth.yop"
                valueProp="id"
                label="name"
                class="border border-white text-xs text-white"
                searchable
                placeholder="Select 12th Year of Pass Out"
                track-by="name"
                :classes="selectClasses"
                @click="changing"
                :options="form1.years"
              />
            </field>

            <field
              label="12th Year of Pass Out"
              v-if="
                user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() == '12th/puc'
              "
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <h1
                class="
                  px-3
                  py-2
                  max-w-full
                  focus:ring focus:outline-none
                  dark:placeholder-gray-400
                  w-full
                  h-12
                  border-0 border-gray-700
                  dark:bg-gray-800
                  rounded
                  pr-10
                  opacity-50
                  cursor-not-allowed
                  text-white
                "
              >
                {{ user.personal_data.highestyop }}
              </h1>
            </field>

            <field
              label="Do you have academic gap upto 12th?"
              v-if="form1.value == 2||(user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() == '12th/puc')"
              :error="form.twelth.ygtwelth !== null ? false : true"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <div>
                <label class="cursor-pointer label" for="yes">
                  <span class="label-text font-medium pr-1 text-white text-sm"
                    >Yes</span
                  >
                  <input
                    type="radio"
                    id="yes"
                    name="ygtwelth"
                    :value="true"
                    :native-value="true"
                    @click="changingyg12th"
                    v-model="form.twelth.ygtwelth"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
                <label class="cursor-pointer label" for="no">
                  <span
                    class="label-text font-medium pr-1 pl-4 text-white text-sm"
                    >No</span
                  >
                  <input
                    type="radio"
                    id="no"
                    name="ygtwelth"
                    :value="false"
                    :native-value="false"
                    @click="changingyg12th"
                    v-model="form.twelth.ygtwelth"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
              </div>
            </field>
            <field
              v-if="form.twelth.ygtwelth === true"
              :error="
                ((parseInt(form.twelth.ygyear) > 0))
                  ? false
                  : 'Tweflth Yeargap year is required'"
              label="Number of Year gap"
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
                v-model="form.twelth.ygyear"
                name="URL"
                placeholder="Enter number of year gap"
                autocomplete="username"
              />
            </field>
          </div>
        </div>

        <div
          class="border border-white shadow-sm shadow-white mb-5"
          v-if="
            (form1.value == 3&&skip===false) ||
            (user.personal_data &&
              form.highestdegree &&
              form.highestdegree.name.toLowerCase() == 'iti'&&skip===false)
          "
        >
          <div
            v-if="
              form1.value == 3 ||
              (user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() == 'iti')
            "
            class="
              flex
              border-b
              bg-black
              w-full
              text-white text-sm text-center
              font-semibold
              justify-center
              pl-1
              pr-1
              bg-black
              pr-1
              border-white
            "
          >
            <p class="flex items-center py-2 font-bold text-white text-sm">
              *ITI Information
            </p>
          </div>
          <div
            v-if="
              form1.value == 3 ||
              (user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() == 'iti') 
            "
            class="
              grid
              md:grid-cols-3
              xl:grid-cols-5
              sm:grid-cols-1
              gap-1
              text-white text-sm
            "
          >
          <field
              label="CGPA or Percentage?"
              :error="form.iti.cgpa_percentage !== null ? false : true"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <div>
                <label class="cursor-pointer label" for="cgpa2">
                  <span class="label-text font-medium pr-1 text-white text-sm"
                    >CGPA</span
                  >
                  <input
                    type="radio"
                    id="cgpa2"
                    name="cgpa2"
                    value="cgpa"
                    native-value="cgpa"
                    @click="changingiti"
                    v-model="form.iti.cgpa_percentage"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
                <label class="cursor-pointer label" for="percentage2">
                  <span
                    class="label-text font-medium pr-1 pl-4 text-white text-sm"
                    >Percentage</span
                  >
                  <input
                    type="radio"
                    id="percentage2"
                    name="percentage2"
                    value="percentage"
                    native-value="percentage"
                    @click="changingiti"
                    v-model="form.iti.cgpa_percentage"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
              </div>
            </field>
            <field v-if="form.iti.cgpa_percentage==='percentage'"
              label="ITI Percentage"
              :error="
                    ((parseInt(form.iti.percentage) > 35)&&(parseInt(form.iti.percentage) < 100)||(form.iti.percentage != Math.floor(form.iti.percentage)))
                      ? false
                      : 'Add valid Percentage'" 
              help="Please enter Percentage"
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
                v-model="form.iti.percentage"
                name="Percentage"
                placeholder="Enter ITI percentage"
                autocomplete="username"
                @change="changing"
              />
            </field>
            <field v-if="form.iti.cgpa_percentage==='cgpa'"
              label="ITI CGPA"
              :error="
                ((parseInt(form.iti.cgpa) > 3)&&(parseInt(form.iti.cgpa) < 10)||(form.iti.cgpa != Math.floor(form.iti.cgpa)))
                  ? false
                  : 'Add valid CGPA'"
              help="Please enter CGPA"
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
                v-model="form.iti.cgpa"
                name="CGPA"
                class="text-xs"
                placeholder="Enter ITI CGPA"
                autocomplete="username"
                @change="changing"
              />
            </field>
            <field
              label="ITI Year of Pass Out"
              :error="form.iti.yop !== null ? false : true"
              help="Please select Year of Pass Out"
              v-if="
                user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() != 'iti'
              "
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <Multiselect
                v-model="form.iti.yop"
                valueProp="id"
                label="name"
                class="border border-white text-xs text-white"
                searchable
                placeholder="Select ITI Year of Pass Out"
                track-by="name"
                :classes="selectClasses"
                @click="changing"
                :options="form1.years"
              />
            </field>

            <field
              label="ITI Year of Pass Out"
              v-if="
                user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() == 'iti'
              "
            >
              <h1
                class="
                  px-3
                  py-2
                  max-w-full
                  focus:ring focus:outline-none
                  dark:placeholder-gray-400
                  w-full
                  h-12
                  border-0 border-gray-700
                  dark:bg-gray-800
                  rounded
                  pr-10
                  opacity-50
                  cursor-not-allowed
                  text-white text-sm
                "
              >
                {{ user.personal_data.highestyop }}
              </h1>
            </field>

            <field
              label="ITI Stream"
              v-if="form.iti.otherstream === false"
              :error="form.iti.stream !== null ? false : true"
              help="Please search Stream"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <Multiselect
                v-model="form.iti.stream"
                valueProp="id"
                label="name"
                class="border border-white text-xs text-white"
                :searchable="true"
                placeholder="Search ITI stream"
                track-by="conactname"
                :classes="selectClasses"
                @click="changing"
                :object="true"
                @search-change="fetchstream"
                :options="itistreams"
              />
            </field>

            <field
              help="Please select other stream option if stream is not present in the options "
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
                v-model="form.iti.otherstream"
                name="sample-checkbox-two"
                class="font-bold"
                :options="checkboxOptions"
                column
                @input="changingitistream"
              />
            </field>

            <field
              v-if="form.iti.otherstream == true"
              :error="
                    ((form.iti.other_stream.replace(/\s+/g, '').length)&&(!/^[\.]+$/.test(form.iti.other_stream)))
                      ? false
                      : 'ITI Other stream is required'"
              label="Stream Name"
              help="Please enter Stream name"
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
                v-model="form.iti.other_stream"
                name="Other Stream Name"
                placeholder="Enter ITI stream name"
                autocomplete="username"
                @click="changing"
              />
            </field>

            <field
              label="ITI Board"
              v-if="form.iti.otheruniversity == false"
              :error="form.iti.university !== null ? false : true"
              help="Please search Board name"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <Multiselect
                v-model="form.iti.university"
                valueProp="id"
                label="name"
                class="border border-white text-xs text-white"
                :searchable="true"
                placeholder="search ITI Board name"
                track-by="conactname"
                :classes="selectClasses"
                @click="iticollegechange"
                @select="fetchiticollege"
                @search-change="fetchuniversityvalues"
                :object="true"
                :options="university_values"
              />
               <!-- {{form.iti.university}}  -->
            </field>

            <field
              help="Please select other Board option if Board is not present in the options "
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
                v-model="form.iti.otheruniversity"
                name="sample-checkbox-two"
                class="font-bold"
                :options="checkboxOptions6"
                column
                @change="changingitiboard"
              />
            </field>

            <field
              v-if="form.iti.otheruniversity == true"
              :error="
                    ((form.iti.other_university.replace(/\s+/g, '').length)&&(!/^[\.]+$/.test(form.iti.other_university)))
                      ? false
                      : 'ITI Other Board is required'"
              label="Board Name"
              help="Please enter Board name"
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
                v-model="form.iti.other_university"
                name="Other Board Name"
                placeholder="Enter  ITI Board name"
                autocomplete="username"
                @change="changing"
              />
            </field>

            <field
              label="ITI College"
              v-if="form.iti.othercollege === false"
              :error="form.iti.college !== null ? false : true"
              help="Please search College name"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <Multiselect
                v-model="form.iti.college"
                valueProp="id"
                label="name"
                class="border border-white text-xs text-white"
                searchable
                placeholder="search ITI college name"
                track-by="concatname"
                :classes="selectClasses"
                @click="changing"
                :object="true"
                @search-change="fetchcollege"
                :options="iticollege"
              />
            </field>

            <field v-if="show_itiboard===false"
              help="Please select other college option if college is not present in the options "
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
                v-model="form.iti.othercollege"
                name="sample-checkbox-two"
                class="font-bold"
                :options="checkboxOptions1"
                column
                @change="changingiticollege"
              />
            </field>

            <field
              v-if="form.iti.othercollege == true"
              :error="
                    ((form.iti.other_college.replace(/\s+/g, '').length)&&(!/^[\.]+$/.test(form.iti.other_college)))
                      ? false
                      : 'ITI Other College is required'"
              label="College Name"
              help="Please enter college name"
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
                v-model="form.iti.other_college"
                name="Other College Name"
                placeholder="Enter ITI college name"
                autocomplete="username"
                @change="changing"
              />
            </field>

            <field
              label="Do you have academic gap upto ITI?"
              :error="form.iti.ygiti !== null ? false : true"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <div>
                <label class="cursor-pointer label" for="yes1">
                  <span class="label-text font-medium pr-1 text-white text-sm"
                    >Yes</span
                  >
                  <input
                    type="radio"
                    id="yes1"
                    name="ygiti"
                    :value="true"
                    :native-value="true"
                    @click="changingygiti"
                    v-model="form.iti.ygiti"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
                <label class="cursor-pointer label" for="no1">
                  <span
                    class="label-text font-medium pr-1 pl-4 text-white text-sm"
                    >No</span
                  >
                  <input
                    type="radio"
                    id="no1"
                    name="ygiti"
                    :value="false"
                    :native-value="false"
                    @click="changingygiti"
                    v-model="form.iti.ygiti"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
              </div>
            </field>
            <field
              v-if="form.iti.ygiti === true"
              :error="
                ((parseInt(form.iti.ygyear) > 0))
                  ? false
                  : 'ITI Yeargap year is required'"
              label="Number of Year gap"
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
                v-model="form.iti.ygyear"
                name="URL"
                placeholder="Enter number of year gap"
                autocomplete="username"
              />
            </field>
          </div>
        </div>

        <div
          class="border border-white shadow-sm shadow-white mb-5"
          v-if="
            (form1.value == 1&&skip===false) ||
            (user.personal_data &&
              form.highestdegree &&
              form.highestdegree.name.toLowerCase() == 'diploma'&&skip===false) 
          "
        >
          <div
            v-if="
              form1.value == 1 ||
              (user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() == 'diploma')
            "
            class="
              flex
              border-b
              bg-black
              w-full
              text-white text-sm text-center
              font-semibold
              justify-center
              pl-1
              pr-1
              bg-black
              pr-1
              border-white
            "
          >
            <p class="flex items-center py-2 font-bold text-white text-sm">
              *Diploma Information
            </p>
          </div>
          <div
            v-if="
              form1.value == 1 ||
              (user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() == 'diploma')
            "
            class="grid md:grid-cols-3 xl:grid-cols-5 sm:grid-cols-2 gap-1"
          >
          <field
              label="CGPA or Percentage?"
              :error="form.diploma.cgpa_percentage !== null ? false : true"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <div>
                <label class="cursor-pointer label" for="cgpa3">
                  <span class="label-text font-medium pr-1 text-white text-sm"
                    >CGPA</span
                  >
                  <input
                    type="radio"
                    id="cgpa3"
                    name="cgpa3"
                    value="cgpa"
                    native-value="cgpa"
                    @click="changingdiploma"
                    v-model="form.diploma.cgpa_percentage"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
                <label class="cursor-pointer label" for="percentage3">
                  <span
                    class="label-text font-medium pr-1 pl-4 text-white text-sm"
                    >Percentage</span
                  >
                  <input
                    type="radio"
                    id="percentage3"
                    name="percentage3"
                    value="percentage"
                    native-value="percentage"
                    @click="changingdiploma"
                    v-model="form.diploma.cgpa_percentage"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
              </div>
            </field>
            <field v-if="form.diploma.cgpa_percentage==='percentage'"
              label="Diploma Percentage"
             :error="
                    ((parseInt(form.diploma.percentage) > 35)&&(parseInt(form.diploma.percentage) < 100)||(form.diploma.percentage != Math.floor(form.diploma.percentage)))
                      ? false
                      : 'Add valid Percentage'" 
              help="Please enter Percentage"
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
                v-model="form.diploma.percentage"
                name="Percentage"
                placeholder="Enter Diploma Percentage"
                autocomplete="username"
                @change="changing"
              />
            </field>

            <field v-if="form.diploma.cgpa_percentage==='cgpa'"
              label="Diploma CGPA"
              :error="
                ((parseInt(form.diploma.cgpa) > 3)&&(parseInt(form.diploma.cgpa) < 10)||(form.diploma.cgpa != Math.floor(form.diploma.cgpa)))
                  ? false
                  : 'Add valid CGPA'"
              help="Please enter CGPA"
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
                v-model="form.diploma.cgpa"
                name="CGPA"
                placeholder="Enter Diploma CGPA"
                autocomplete="username"
                @change="changing"
              />
            </field>
            <field
              label="Diploma Year of Pass Out"
              :error="form.diploma.yop !== null ? false : true"
              help="Please select Year of Pass Out"
              v-if="
                user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() != 'diploma'
              "
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <Multiselect
                v-model="form.diploma.yop"
                valueProp="id"
                label="name"
                class="border border-white text-xs text-white"
                searchable
                placeholder="Select Diploma Year of Pass Out"
                track-by="name"
                :classes="selectClasses"
                @click="changing"
                :options="form1.years"
              />
            </field>

            <field
              label="Diploma Year of Pass Out"
              v-if="
                user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() == 'diploma'
              "
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <h1
                class="
                  px-3
                  py-2
                  max-w-full
                  focus:ring focus:outline-none
                  dark:placeholder-gray-400
                  w-full
                  h-12
                  border-0 border-gray-700
                  dark:bg-gray-800
                  rounded
                  pr-10
                  opacity-50
                  cursor-not-allowed
                  text-white
                "
              >
                {{ user.personal_data.highestyop }}
              </h1>
            </field>

            <field
              label="Diploma Stream"
             :error="form.diploma.stream !== null ? false : true"
              v-if="form.diploma.otherstream === false"
              help="Please search Stream"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <Multiselect
                v-model="form.diploma.stream"
                valueProp="id"
                label="name"
                class="border border-white text-xs text-white"
                :searchable="true"
                placeholder="Search Diploma Stream"
                track-by="conactname"
                :classes="selectClasses"
                @click="changing"
                :object="true"
                @search-change="fetchdipstream"
                :options="diplomastreams"
              />
            </field>
            <field
              help="Please select other stream option if stream is not present in the options "
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
                v-model="form.diploma.otherstream"
                name="sample-checkbox-two"
                class="font-bold"
                :options="checkboxOptions"
                column
                @input="changingdiplomastream"
              />
            </field>

            <field
              v-if="form.diploma.otherstream == true"
              label="Stream Name"
              :error="
                    ((form.diploma.other_stream.replace(/\s+/g, '').length)&&(!/^[\.]+$/.test(form.diploma.other_stream)))
                      ? false
                      : 'Diploma Other stream is required'"
              help="Please enter Stream name"
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
                v-model="form.diploma.other_stream"
                name="Other Stream Name"
                placeholder="Enter Diploma stream name"
                autocomplete="username"
                @change="changing"
              />
            </field>

            <field
              label="Diploma Board"
              v-if="form.diploma.otheruniversity === false"
              :error="form.diploma.university !== null ? false : true"
              help="Please search Board name"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <Multiselect
                v-model="form.diploma.university"
                valueProp="id"
                label="name"
                class="border border-white text-xs text-white"
                :searchable="true"
                placeholder="search  Diploma Board name"
                track-by="conactname"
                :classes="selectClasses"
                @click="diplomacollegechange"
                @search-change="fetchuniversityvalues"
                :object="true"
                @select="fetchdipcolleges"
                :options="university_values"
                
              />
            </field>

            <field
              help="Please select other Board option if Board is not present in the options "
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
                v-model="form.diploma.otheruniversity"
                name="sample-checkbox-two"
                class="font-bold"
                :options="checkboxOptions6"
                column
                @change="changingdiplomaboard"
              />
            </field>

            <field
              v-if="form.diploma.otheruniversity == true"
              :error="
                    ((form.diploma.other_university.replace(/\s+/g, '').length)&&(!/^[\.]+$/.test(form.diploma.other_university)))
                      ? false
                      : 'Diploma Other Board is required'"
              label="Board Name"
              help="Please enter Board name"
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
                v-model="form.diploma.other_university"
                name="Other Board Name"
                placeholder="Enter Diploma Board name"
                autocomplete="username"
                @change="changing"
              />
            </field>

            <field
              label="Diploma College"
              :error="form.diploma.college !== null ? false : true"
              v-if="form.diploma.othercollege === false"
              help="Please search College"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <Multiselect
                v-model="form.diploma.college"
                valueProp="id"
                label="name"
                class="border border-white text-xs text-white"
                searchable
                placeholder="Search  Diploma college name"
                :classes="selectClasses"
                @click="changing"
                track-by="concatname"
                :object="true"
                
                @search-change="fetchdiplomacollege"
                :options="diplomacollege"
              />
            </field>

            <field v-if="show_diplomaboard===false"
              help="Please select other college option if college is not present in the options "
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
                v-model="form.diploma.othercollege"
                name="sample-checkbox-two"
                class="font-bold"
                :options="checkboxOptions1"
                column
                @input="changingdiplomacollege"
              />
            </field>

            <field
              v-if="form.diploma.othercollege == true"
              label="College Name"
              :error="
                    ((form.diploma.other_college.replace(/\s+/g, '').length)&&(!/^[\.]+$/.test(form.diploma.other_college)))
                      ? false
                      : 'Diploma Other College is required'"
              help="Please enter College name"
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
                v-model="form.diploma.other_college"
                name="Other college Name"
                placeholder="Enter Diploma college name"
                autocomplete="username"
                @change="changing"
              />
            </field>

            <field
              label="Do you have academic gap upto Diploma?"
              :error="form.diploma.ygdiploma !== null ? false : true"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <div>
                <label class="cursor-pointer label" for="yes2">
                  <span class="label-text font-medium pr-1 text-white text-sm"
                    >Yes</span
                  >
                  <input
                    type="radio"
                    id="yes2"
                    name="ygdiploma"
                    :value="true"
                    :native-value="true"
                    @click="changingygdiploma"
                    v-model="form.diploma.ygdiploma"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
                <label class="cursor-pointer label" for="no2">
                  <span
                    class="label-text font-medium pr-1 pl-4 text-white text-sm"
                    >No</span
                  >
                  <input
                    type="radio"
                    id="no2"
                    name="ygdiploma"
                    :value="false"
                    :native-value="false"
                    @click="changingygdiploma"
                    v-model="form.diploma.ygdiploma"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
              </div>
            </field>
            <field
              v-if="form.diploma.ygdiploma === true"
               :error="
                ((parseInt(form.diploma.ygyear) > 0))
                  ? false
                  : 'Diploma Yeargap year is required'"
              label="Number of Year gap"
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
                v-model="form.diploma.ygyear"
                name="URL"
                placeholder="Enter number of year gap"
                autocomplete="username"
              />
            </field>
          </div>
        </div>
        <div
          class="border border-white shadow-sm shadow-white mb-5"
          v-if="
            (user.personal_data &&
              form.highestdegree &&
              form.highestdegree.name.toLowerCase() == 'degree'&&skip===false) ||
            (user.personal_data &&
              form.highestdegree &&
              form.highestdegree.name.toLowerCase() == 'masters'&&skip===false)
          "
        >
          <div
            class="
              flex
              border-b
              bg-black
              w-full
              ttext-white
              text-sm text-center
              font-semibold
              justify-center
              pl-1
              pr-1
              bg-black
              pr-1
              border-white
            "
            v-if="
              (user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() == 'degree'&&skip===false) ||
              (user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() == 'masters'&&skip===false)
            "
          >
            <p class="flex items-center py-2 font-bold text-white">
              *Degree Information
            </p>
          </div>

          <div
            class="grid md:grid-cols-3 xl:grid-cols-5 sm:grid-cols-2 gap-1"
            v-if="
              (user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() == 'degree'&&skip===false) ||
              (user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() == 'masters'&&skip===false)
            "
          >
          <field
              label="CGPA or Percentage?"
              :error="form.degree.cgpa_percentage !== null ? false : true"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <div>
                <label class="cursor-pointer label" for="cgpa4">
                  <span class="label-text font-medium pr-1 text-white text-sm"
                    >CGPA</span
                  >
                  <input
                    type="radio"
                    id="cgpa4"
                    name="cgpa4"
                    value="cgpa"
                    native-value="cgpa"
                    @click="changingdegree"
                    v-model="form.degree.cgpa_percentage"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
                <label class="cursor-pointer label" for="percentage4">
                  <span
                    class="label-text font-medium pr-1 pl-4 text-white text-sm"
                    >Percentage</span
                  >
                  <input
                    type="radio"
                    id="percentage4"
                    name="percentage4"
                    value="percentage"
                    native-value="percentage"
                    @click="changingdegree"
                    v-model="form.degree.cgpa_percentage"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
              </div>
            </field>

             <field v-if="form.degree.cgpa_percentage==='percentage'"
              label="Degree Percentage"
             :error="
                    ((parseInt(form.degree.percentage) > 35)&&(parseInt(form.degree.percentage) < 100)||(form.degree.percentage != Math.floor(form.degree.percentage)))
                      ? false
                      : 'Add valid Percentage'" 
              help="Please enter Percentage"
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
                v-model="form.degree.percentage"
                name="Percentage"
                placeholder="Enter Degree Percentage"
                autocomplete="username"
                @change="changing"
              />
            </field>

            <field v-if="form.degree.cgpa_percentage==='cgpa'"
              label="Degree CGPA"
               :error="
                ((parseInt(form.degree.cgpa) > 3)&&(parseInt(form.degree.cgpa) < 10)||(form.degree.cgpa != Math.floor(form.degree.cgpa)))
                  ? false
                  : 'Add valid CGPA'"
              help="Please enter CGPA"
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
                v-model="form.degree.cgpa"
                name="CGPA"
                placeholder="Enter Degree CGPA"
                autocomplete="username"
                @change="changing"
              />
            </field>
            <field
              label="Degree"
              :error="form.degree.degree !== null ? false : true"
              v-if="
                form.degree.otherdegree === false ||
                form.degree.otherdegree === null
              "
              help="Please search Degree"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <Multiselect
                v-model="form.degree.degree"
                valueProp="id"
                :options="degOptions"
                label='conactname'
                class="border border-white text-xs text-white"
                placeholder="Search  Degree here"
                :classes="selectClasses"
                :object="true"
                @click="changedegree()"
                @select="selectdegreestream"
                :searchable="true"
                track-by="conactname"
              />

              <!-- <v-select
                class="border border-success  "
                v-model="form.degree.degree"
                :options="degOptions"
                placeholder="Select Split Enquiry"
                :reduce="(name) => name.id"
                name="name"
                label="conactname"
              @click="changedegree()"
            ></v-select> -->
                </field>

            <field 
              help="Please select other Degree option if Degree is not present in the options "
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
                v-model="form.degree.otherdegree"
                name="sample-checkbox-two"
                class="font-bold"
                :options="checkboxOptions3"
                column
                @input="changingdegreetype"
              />
            </field>

            <field
              v-if="form.degree.otherdegree === true"
              :error="
                    ((form.degree.other_degree.replace(/\s+/g, '').length)&&(!/^[\.]+$/.test(form.degree.other_degree)))
                      ? false
                      : 'Degree Name is required'"
              label="Degree Name"
              help="Please enter Degree name"
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
                v-model="form.degree.other_degree"
                name="Other Degree"
                placeholder="Enter Degree name"
                autocomplete="username"
                @click="changing"
              />
            </field>

           
            <field
              label="Degree Year of Pass Out"
              :error="form.degree.yop !== null ? false : true"
              help="Please select Year of Pass Out"
              v-if="
                user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() != 'degree'
              "
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <Multiselect
                v-model="form.degree.yop"
                valueProp="id"
                label="name"
                class="border border-white text-xs text-white"
                searchable
                placeholder="Select Degree Year of Pass Out"
                track-by="name"
                :classes="selectClasses"
                @click="changing"
                :options="form1.years"
              />
            </field>

            <field
              label="Degree Year of Pass Out"
              v-if="
                user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() == 'degree'
              "
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <h1
                class="
                  px-3
                  py-2
                  max-w-full
                  focus:ring focus:outline-none
                  dark:placeholder-gray-400
                  w-full
                  h-12
                  border-0 border-gray-700
                  dark:bg-gray-800
                  rounded
                  pr-10
                  opacity-50
                  cursor-not-allowed
                  text-white
                "
              >
                {{ user.personal_data.highestyop }}
              </h1>
            </field>
            <field
              label="Degree Stream"
              :error="form.degree.stream !== null ? false : true"
              help="Please search Stream"
              v-if="form.degree.otherstream === false"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <Multiselect
                v-model="form.degree.stream"
                valueProp="id"
                label="name"
                class="border border-white text-xs text-white"
                :searchable="true"
                placeholder="Search degree stream"
                track-by="conactname"
                :classes="selectClasses"
                @search-change="fetchdegstream"
                @click="changing"
                :object="true"
                :options="degreestreams
                "
              />
            </field>

            <field v-if="show_degreetype===false"
              help="Please select other stream option if stream is not present in the Degree stream options "
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
                v-model="form.degree.otherstream"
                name="sample-checkbox-two"
                class="font-bold"
                :options="checkboxOptions"
                column
                @input="changingdegreestream"
              />
            </field>

            <field
              v-if="form.degree.otherstream == true"
              :error="
                    ((form.degree.other_stream.replace(/\s+/g, '').length)&&(!/^[\.]+$/.test(form.degree.other_stream)))
                      ? false
                      : 'Degree Other stream is required'"
              label="Stream Name"
              help="Please enter Stream name"
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
                v-model="form.degree.other_stream"
                name="Other Stream Name"
                placeholder="Enter Degree stream name"
                autocomplete="username"
                @change="changing"
              />
            </field>

            <field
              label="Degree University"
              v-if="form.degree.otheruniversity === false"
              :error="form.degree.university !== null ? false : true"
              help="Please search University name"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >

              <Multiselect
                v-model="form.degree.university"
                @click="degreecollegechange()"
                valueProp="id"
                label="name"
                class="border border-white text-xs text-white"
                :searchable="true"
                placeholder="search  Degree University name here"
                track-by="conactname"
                :classes="selectClasses"
                @search-change="fetchuniversityvalues"
                :object="true"
                @select="selectdegreecolleges"
                :options="university_values"
              />
            </field>

            <field
              help="Please select other University option if University is not present in the options "
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
                v-model="form.degree.otheruniversity"
                name="sample-checkbox-two"
                class="font-bold"
                :options="checkboxOptions5"
                column
                @change="changingdegreeboard"
              />
            </field>

            <field
              v-if="form.degree.otheruniversity == true"
              :error="
                    ((form.degree.other_university.replace(/\s+/g, '').length)&&(!/^[\.]+$/.test(form.degree.other_university)))
                      ? false
                      : 'Degree Other Board is required'"
              label="University Name"
              help="Please enter University name"
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
                v-model="form.degree.other_university"
                name="Other University Name"
                placeholder="Enter Degree University name"
                autocomplete="username"
                @change="changing"
              />
            </field>

            <field
              label="Degree College"
              :error="form.degree.college !== null ? false : true"
              help="Please search College"
              v-if="form.degree.othercollege === false"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <Multiselect
                v-model="form.degree.college"
                valueProp="id"
                label="name"
                class="border border-white text-xs text-white"
                searchable
                placeholder="Search degree college name"
                track-by="concatname"
                :classes="selectClasses"
                @click="changing"
                @search-change="fetchdegreecollege"
                :object="true"
                :options="degreecollege
                "
              />
            </field>

            <field v-if="show_degreeuni===false"
              help="Please select other college option if college is not present in the options "
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
                class="font-bold"
                v-model="form.degree.othercollege"
                name="sample-checkbox-two"
                :options="checkboxOptions1"
                column
                @input="changingdegreecollege"
              />
            </field>

            <field
              v-if="form.degree.othercollege == true"
              label="College Name"
              :error="
                    ((form.degree.other_college.replace(/\s+/g, '').length)&&(!/^[\.]+$/.test(form.degree.other_college)))
                      ? false
                      : 'Degree Other College is required'"
              help="Please enter college name"
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
                v-model="form.degree.other_college"
                name="Other College Name"
                placeholder="Enter Degree college name"
                autocomplete="username"
                @change="changing"
              />
            </field>

            <field
              label="Do you have year gap in Degree?"
              v-if="
                (user.personal_data &&
                  form.highestdegree &&
                  form.highestdegree.name.toLowerCase() == 'degree') ||
                (user.personal_data &&
                  form.highestdegree &&
                  form.highestdegree.name.toLowerCase() == 'masters')
              "
              :error="form.degree.ygdeg !== null ? false : true"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <div>
                <label class="cursor-pointer label" for="yes3">
                  <span class="label-text font-medium pr-1 text-white text-sm"
                    >Yes</span
                  >
                  <input
                    type="radio"
                    id="yes3"
                    name="ygdeg"
                    :value="true"
                    :native-value="true"
                    @click="changingygdegree"
                    v-model="form.degree.ygdeg"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
                <label class="cursor-pointer label" for="no3">
                  <span
                    class="label-text font-medium pl-4 pr-1 text-white text-sm"
                    >No</span
                  >
                  <input
                    type="radio"
                    id="no3"
                    name="ygdeg"
                    :value="false"
                    :native-value="false"
                    @click="changingygdegree"
                    v-model="form.degree.ygdeg"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
              </div>
            </field>

            <field
              v-if="form.degree.ygdeg === true"
              :error="
                ((parseInt(form.degree.ygyear) > 0))
                  ? false
                  : 'Degree Yeargap year is required'"
              label="Number of Year gap"
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
                v-model="form.degree.ygyear"
                name="URL"
                placeholder="Enter number of year gap"
                autocomplete="username"
              />
            </field>
          </div>
        </div>

        <div
          class="border border-white shadow-sm shadow-white mb-5"
          v-if="
            user.personal_data &&
            form.highestdegree &&
            form.highestdegree.name.toLowerCase() == 'masters'&&skip===false
          "
        >
          <div
            v-if="
              user.personal_data &&
              form.highestdegree &&
              form.highestdegree.name.toLowerCase() == 'masters'
              &&skip===false
            "
            class="
              flex
              border-b
              bg-black
              w-full
              text-white text-sm text-center
              font-semibold
              justify-center
              pl-1
              pr-1
              bg-black
              pr-1
              border-white
            "
          >
            <p class="flex items-center py-2 font-bold text-white text-sm">
              *Master's Information
            </p>
          </div>
          <div
            v-if="
              user.personal_data &&
              form.highestdegree &&
              form.highestdegree.name.toLowerCase() == 'masters'&&skip===false
            "
            class="grid md:grid-cols-3 xl:grid-cols-5 sm:grid-cols-2 gap-1"
          >
           
            <field
              label="CGPA or Percentage?"
               :error="form.master.cgpa_percentage !== null ? false : true"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <div>
                <label class="cursor-pointer label" for="cgpa5">
                  <span class="label-text font-medium pr-1 text-white text-sm"
                    >CGPA</span
                  >
                  <input
                    type="radio"
                    id="cgpa5"
                    name="cgpa5"
                    value="cgpa"
                    native-value="cgpa"
                    @click="changingmaster"
                    v-model="form.master.cgpa_percentage"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
                <label class="cursor-pointer label" for="percentage5">
                  <span
                    class="label-text font-medium pr-1 pl-4 text-white text-sm"
                    >Percentage</span
                  >
                  <input
                    type="radio"
                    id="percentage5"
                    name="percentage5"
                    value="percentage"
                    native-value="percentage"
                    @click="changingmaster"
                    v-model="form.master.cgpa_percentage"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
              </div>
            </field>

            <field v-if="form.master.cgpa_percentage==='percentage'"
              label="Master's Percentage"
              :error="
                    ((parseInt(form.master.percentage) > 35)&&(parseInt(form.master.percentage) < 100)||(form.master.percentage != Math.floor(form.master.percentage)))
                      ? false
                      : 'Add valid Percentage'" 
              help="Please enter Percentage"
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
                v-model="form.master.percentage"
                name="Percentage"
                placeholder="Enter Master's percentage"
                autocomplete="username"
                @change="changing"
              />
            </field>

            <field v-if="form.master.cgpa_percentage==='cgpa'"
              label="Master's CGPA"
              :error="
                ((parseInt(form.master.cgpa) > 3)&&(parseInt(form.master.cgpa) < 10)||(form.master.cgpa != Math.floor(form.master.cgpa)))
                  ? false
                  : 'Add valid CGPA'"
              help="Please enter CGPA"
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
                v-model="form.master.cgpa"
                name="CGPA"
                placeholder="Enter Master's CGPA"
                autocomplete="username"
                @change="changing"
              />
            </field>

             <field
              label="Master's"
              v-if="form.master.othermaster == false"
              :error="form.master.master !== null ? false : true"
              help="Please search Master's"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <Multiselect
                v-model="form.master.master"
                valueProp="id"
                label="conactname"
                class="border border-white text-xs text-white"
                :searchable="true"
                placeholder="Search Master's"
                track-by="conactname"
                :classes="selectClasses"
                :object="true"
                @select="selectmasstream"
                @click="changemasters()"
                :options="masOptions"
              />
            </field>

            <field
              help="Please select other Master's option if Master's  is not present in the options "
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
                v-model="form.master.othermaster"
                class="font-bold"
                name="sample-checkbox-two"
                :options="checkboxOptions4"
                column
                @input="changingmastertype"
              />
            </field>

            <field
              v-if="form.master.othermaster == true"
              :error="
                    ((form.master.other_master.replace(/\s+/g, '').length)&&(!/^[\.]+$/.test(form.master.other_master)))
                      ? false
                      : 'Masters Name is required'"
              label="Master's Name"
              help="Please enter Master's name"
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
                v-model="form.master.other_master"
                name="Other Master's"
                placeholder="Enter  Master's name"
                autocomplete="username"
                @click="changing"
              />
            </field>
            <field
              label="Master's Year of Pass Out"
              :error="form.master.yop !== null ? false : true"
              help="Please select Year of Pass Out"
              v-if="
                user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() != 'masters'
              "
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <Multiselect
                v-model="form.master.yop"
                valueProp="id"
                label="name"
                class="border border-white text-xs text-white"
                searchable
                placeholder="Select Master's Year of Pass Out"
                track-by="name"
                :classes="selectClasses"
                @click="changing"
                :options="form1.years"
              />
            </field>

            <field
              label="Master's Year of Pass Out"
              v-if="
                user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() == 'masters'
              "
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <h1
                class="
                  px-3
                  py-2
                  max-w-full
                  focus:ring focus:outline-none
                  dark:placeholder-gray-400
                  w-full
                  h-12
                  border-0 border-gray-700
                  dark:bg-gray-800
                  rounded
                  pr-10
                  opacity-50
                  cursor-not-allowed
                  text-white
                "
              >
                {{ user.personal_data.highestyop }}
              </h1>
            </field>
            <field
              label="Master's Stream"
              :error="form.master.stream !== null ? false : true"
              help="Please search Stream"
              v-if="form.master.otherstream === false"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <Multiselect
                v-model="form.master.stream"
                valueProp="id"
                label="name"
                class="border border-white text-xs text-white"
                :searchable="true"
                placeholder="Search Master's Stream"
                track-by="conactname"
                :classes="selectClasses"
                @click="changing"
                :object="true"
                @search-change="fetchmasstream"
                :options="masterstreams
                "
              />
            </field>

            <field v-if="show_mastertype===false"
              help="Please select other stream option if stream is not present in the options "
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
                class="font-bold"
                v-model="form.master.otherstream"
                name="sample-checkbox-two"
                @change="changingmastersstream"
                :options="checkboxOptions"
                column
              />
            </field>

            <field
              v-if="form.master.otherstream == true"
              :error="
                    ((form.master.other_stream.replace(/\s+/g, '').length)&&(!/^[\.]+$/.test(form.master.other_stream)))
                      ? false
                      : 'Masters Other stream is required'"
              label="Stream Name"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
              help="Please enter stream name"
            >
              <control
                v-model="form.master.other_stream"
                name="Other Stream Name"
                placeholder="Enter Master's stream name"
                autocomplete="username"
                @change="changing"
              />
            </field>

            <field
              label="Master's University"
              v-if="form.master.otheruniversity === false"
              :error="form.master.university !== null ? false : true"
              help="Please search University name"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <Multiselect
                v-model="form.master.university"
                valueProp="id"
                label="name"
                class="border border-white text-xs text-white"
                :searchable="true"
                placeholder="search Master's University name"
                track-by="conactname"
                :classes="selectClasses"
                @click="mastercollegechange()"
                @search-change="fetchuniversityvalues"
                @select="selectmasterscollege"
                :object="true"
                :options="university_values"
              />
            </field>

            <field
              help="Please select other University option if University is not present in the options "
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
                v-model="form.master.otheruniversity"
                class="font-bold"
                name="sample-checkbox-two"
                :options="checkboxOptions5"
                column
                @change="changingmasterboard"
              />
            </field>

            <field
              v-if="form.master.otheruniversity == true"
              :error="
                    ((form.master.other_university.replace(/\s+/g, '').length)&&(!/^[\.]+$/.test(form.master.other_university)))
                      ? false
                      : 'Masters Other Board is required'"
              label="University Name"
              help="Please enter University name"
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
                v-model="form.master.other_university"
                name="Other University Name"
                placeholder="Enter  Master's University name"
                autocomplete="username"
                @change="changing"
              />
            </field>

            <field
              label="Master's College"
              :error="form.master.college !== null ? false : true"
              help="Please search Degree College"
              v-if="form.master.othercollege === false"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <Multiselect
                v-model="form.master.college"
                valueProp="id"
                label="name"
                class="border border-white text-xs text-white"
                searchable
                placeholder="Search  Master's Degree College"
                :classes="selectClasses"
                @click="changing"
                :object="true"
                track-by="concatname"
                @search-change="fetchmastercollege"
                :options="mastercollege
                "
              />
            </field>

            <field v-if="show_masterboard===false"
              help="Please select other college option if college is not present in the options "
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
                v-model="form.master.othercollege"
                class="font-bold"
                @input="changingmastercollege"
                name="sample-checkbox-two"
                :options="checkboxOptions1"
                column
              />
            </field>

            <field
              v-if="form.master.othercollege == true"
              :error="
                    ((form.master.other_college.replace(/\s+/g, '').length)&&(!/^[\.]+$/.test(form.master.other_college)))
                      ? false
                      : 'Masters Other College is required'"
              label="College Name"
              help="Please enter college name"
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
                v-model="form.master.other_college"
                name="Other college name"
                placeholder="Enter Master's college name"
                autocomplete="username"
                @change="changing"
              />
            </field>

            <field
              v-if="
                user.personal_data &&
                form.highestdegree &&
                form.highestdegree.name.toLowerCase() == 'masters'
              "
              label="Do you have year gap in Masters?"
              :error="form.master.ygmas !== null ? false : true"
              class="
                text-white text-sm
                box-border
                h-24
                w-50
                p-2
                border-2 border-gray-700
              "
            >
              <div>
                <label class="cursor-pointer label" for="yes4">
                  <span class="label-text font-medium pr-1 text-white text-sm"
                    >Yes</span
                  >
                  <input
                    type="radio"
                    id="yes4"
                    name="ygmas"
                    :value="true"
                    :native-value="true"
                    @click="changingygmasters"
                    v-model="form.master.ygmas"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
                <label class="cursor-pointer label" for="no4">
                  <span
                    class="label-text font-medium pl-4 pr-1 text-white text-sm"
                    >No</span
                  >
                  <input
                    type="radio"
                    id="no4"
                    name="ygmas"
                    :value="false"
                    :native-value="false"
                    @click="changingygmasters"
                    v-model="form.master.ygmas"
                    class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm"
                  />
                </label>
              </div>
            </field>

            <field
              v-if="form.master.ygmas === true"
              :error="
                ((parseInt(form.master.ygyear) > 0))
                  ? false
                  : 'Masters Yeargap year is required'"
              label="Number of Year gap"
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
                v-model="form.master.ygyear"
                name="URL"
                placeholder="Enter number of year gap"
                autocomplete="username"
              />
            </field>
          </div>
        </div>

        <template #footer>
          <level mobile>
            <jb-buttons>
              <jb-button
                label="Previous"
                type="submit1"
                color="info"
                @click="personal"
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
  <personal-form v-if="show_personal === true" />
  <experience-form v-if="show_experience === true" />
  <otherdetails-form v-if="show_other === true" />
</template>

<script setup>
import { reactive, ref, computed, onBeforeMount } from "vue";
import {
  mdiAccount,
  mdiEyeOff,
  mdiProgressCheck,
  mdiAccountAlertOutline,
  mdiBookEducation,
  mdiAccountCogOutline,
  mdiExitRun,
  mdiCheck
} from "@mdi/js";
import FormScreenSection from "@/components/FormScreenSection.vue";
import PersonalForm from "@/components/PersonalForm.vue";
import ExperienceForm from "@/components/ExperienceForm.vue";
import OtherdetailsForm from "@/components/OtherdetailsForm.vue";
import CardComponent from "@/components/CardComponent.vue";
import CheckRadioPicker from "@/components/CheckRadioPicker.vue";
import TitleSubBar from "@/components/TitleSubBar.vue";
import Field from "@/components/Field.vue";
import Control from "@/components/Control.vue";
import JbButton from "@/components/JbButton.vue";
import Level from "@/components/Level.vue";
import JbButtons from "@/components/JbButtons.vue";
import TextLink from "@/components/TextLink.vue";
import { sessionStore } from "../stores/session";
import { useRouter } from "vue-router";
import { getdata } from "../stores/user";
import { themeStore } from "../stores/theme";
// import { sub } from 'date-fns'
// import { useStorage } from "vue3-storage";

import Multiselect from "@vueform/multiselect";
import { selectClasses } from "@/selectcss.js";

import dayjs from "dayjs";
import { trueGray } from "tailwindcss/colors";

// change part
const changing = (value) => {
  (tenth_percen.value = false),
    (tenth_yop.value = false),
    (value_error.value = false),
    (mas_othcoll.value = false),
    (mas_coll.value = false),
    (masoth_stream.value = false),
    (mas_stream.value = false),
    (mas_yop.value = false),
    (mas_percen.value = false),
    (mas_type.value = false),
    (degoth_col.value = false),
    (deg_college.value = false),
    (deg_strerr.value = false),
    (deg_stream.value = false),
    (deg_percen.value = false),
    (deg_type.value = false),
    (deg_yop.value = false);
  (dipoth_coll.value = false),
    (dip_college.value = false),
    (dip_stream.value = false),
    (dip_yop.value = false),
    (dip_percen.value = false),
    (iti_yop.value = false),
    (iti_othcoll.value = false),
    (iti_coll.value = false),
    (itioth_stream.value = false),
    (iti_stream.value = false),
    (iti_yop.value = false),
    (iti_percen.value = false),
    (twelfth_yop.value = false),
    (twelfth_percen.value = false),
    (tenth_yop.value = false),
    (tenth_percen.value = false),
    (tengap_err.value = false),
    (twegap_err.value = false),
    (deggap_err.value = false),
    (masgap_err.value = false);

};
const show_personal = ref(false);
const personal = async () => {
  show_personal.value = true;
};
const show_experience = ref(false);
const show_other = ref(false);
const experience = async () => {
  show_experience.value = true;
};

const other = async () => {
  show_other.value = true;

};
const changingyg12th = async () => {
 form.twelth.ygyear=""
};
const changingygiti = async () => {
 form.iti.ygyear=""
};

const changingygdiploma = async () => {
 form.diploma.ygyear=""
};

const changingygdegree = async () => {
 form.degree.ygyear=""
};

const changingygmasters = async () => {
 form.master.ygyear=""
};
const changing10th = async () => {
 form.tenth.percentage=""
 form.tenth.cgpa=""
};
const changing12th = async () => {
 form.twelth.percentage=""
 form.twelth.cgpa=""
};

const changingiti = async () => {
 form.iti.percentage=""
 form.iti.cgpa=""
};

const changingdiploma = async () => {
 form.diploma.percentage=""
 form.diploma.cgpa=""
};

const changingdegree = async () => {
 form.degree.percentage=""
 form.degree.cgpa=""
};

const changingmaster = async () => {
 form.master.percentage=""
 form.master.cgpa=""
};

const changingitistream = async () => {
 form.iti.stream=null
 form.iti.other_stream=""
};
const changingdiplomastream = async () => {
 form.diploma.stream=null
 form.diploma.other_stream=""
};
const changingdegreestream = async () => {
 form.degree.stream=null
 form.degree.other_stream=""
};
const changingmastersstream = async () => {
 form.master.stream=null
 form.master.other_stream=""
};
const show_itiboard = ref(false)
const changingitiboard = async () => {
 form.iti.university=null
 form.iti.other_university=""
 if(form.iti.otheruniversity===true){
   form.iti.othercollege = true
   show_itiboard.value=true
 }
 else{
   form.iti.othercollege = false
   show_itiboard.value=false
 }
 

};
const show_diplomaboard = ref(false)
const changingdiplomaboard = async () => {
 form.diploma.university=null
 form.diploma.other_university=""
 if(form.diploma.otheruniversity===true){
   form.diploma.othercollege = true
   show_diplomaboard.value=true
 }
 else{
   form.diploma.othercollege = false
   show_diplomaboard.value=false
 }
};
const show_degreeuni = ref(false)
const changingdegreeboard = async () => {
 form.degree.university=null
 form.degree.other_university=""
 if(form.degree.otheruniversity===true){
   form.degree.othercollege = true
   show_degreeuni.value=true
 }
 else{
   form.degree.othercollege = false
   show_degreeuni.value=false
 }
};
const show_masterboard = ref(false)
const changingmasterboard = async () => {
 form.master.university=null
 form.master.other_university=""
 if(form.master.otheruniversity===true){
   form.master.othercollege = true
   show_masterboard.value=true
 }
 else{
   form.master.othercollege = false
   show_masterboard.value=false
 }
};
const changingiticollege = async () => {
 form.iti.college=null
 form.iti.other_college=""
};
const changingdiplomacollege = async () => {
 form.diploma.college=null
 form.diploma.other_college=""
};
const changingdegreecollege = async () => {
 form.degree.college=null
 form.degree.other_college=""
};
const changingmastercollege = async () => {
 form.master.college=null
 form.master.other_college=""
};
const show_degreetype = ref(false)
const changingdegreetype = async () => {
 form.degree.degree=null
 form.degree.other_degree=""
 if(form.degree.otherdegree===false){
   form.degree.otherstream = true
   show_degreetype.value=true
 }
 else{
   form.degree.otherstream = false
   show_degreetype.value=false
 }
};
const show_mastertype = ref(false)
const changingmastertype = async () => {
 form.master.master=null
 form.master.other_master=""
 if(form.master.othermaster===false){
   form.master.otherstream = true
   show_mastertype.value=true
 }
 else{
   form.master.otherstream = false
   show_mastertype.value=false
 }
};
// const ls = useStorage();
const router = useRouter();
const user = sessionStore();
const theme = themeStore();
const code = getdata();
const current_user = ref("");
const form1 = reactive({
  value: null,
  years: [...Array(30)].map((a, b) => new Date().getFullYear() + 1 - b),
  years1: [...Array(30)].map((a, b) => new Date().getFullYear() - 2 - b),
  yops: null,
});
const form = reactive({
  highestdegree:null,
  tenth: {
    yop: null,
    cgpa_percentage:null,
    percentage: "",
    cgpa:"",
    ygtenth: null,
  },
  twelth: {
    yop: null,
    cgpa_percentage:null,
    percentage: "",
    cgpa:"",
    ygtwelth: null,
    ygyear: null,
  },
  iti: {
    yop: null,
    cgpa_percentage:null,
    percentage: "",
    cgpa:"",
    stream: null,
    otherstream: false,
    other_stream: "",
    university: null,
    otheruniversity: false,
    other_university: "",
    college: null,
    othercollege: false,
    other_college: "",
    ygiti: null,
    ygyear: null,
  },
  diploma: {
    yop: null,
    cgpa_percentage:null,
    percentage: "",
    cgpa:"",
    stream: null,
    otherstream: false,
    other_stream: "",
    university: null,
    otheruniversity: false,
    other_university: "",
    college: null,
    othercollege: false,
    other_college: "",
    ygdiploma: null,
    ygyear: null,
  },
  degree: {
    degree: null,
    otherdegree: false,
    other_degree: "",
    yop: null,
    cgpa_percentage:null,
    percentage: "",
    cgpa:"",
    stream: null,
    otherstream: false,
    other_stream: "",
    university: null,
    otheruniversity: false,
    other_university: "",
    college: null,
    othercollege: false,
    other_college: "",
    ygdeg: null,
    ygyear: null,
  },
  master: {
    master: null,
    othermaster: false,
    other_master: "",
    yop: null,
    cgpa_percentage:null,
    percentage: "",
    cgpa:"",
    stream: null,
    otherstream: false,
    other_stream: "",
    university: null,
    otheruniversity: false,
    other_university: "",
    college: null,
    othercollege: false,
    other_college: "",
    ygmas: null,
    ygyear: null,
  },
});
const studentdegree = computed(() => {
  return user.highestdegree
})
const highdeg_error = ref(false)

const tenth_percen = ref(false);
const tenth_cgpa = ref(false);
const cgpa_percentage_error = ref(false);
const cgpa_percentage_twelfth_error = ref(false);
const cgpa_percentage_iti_error = ref(false);
const cgpa_percentage_diploma_error = ref(false);
const cgpa_percentage_degree_error = ref(false);
const cgpa_percentage_master_error = ref(false);
const tenth_yop = ref(false);
const value_error = ref(false);
const twelfth_percen = ref(false);
const twelfth_cgpa = ref(false);
const twelfth_yop = ref(false);
const iti_percen = ref(false);
const iti_cgpa = ref(false);
const iti_yop = ref(false);
const dip_percen = ref(false);
const dip_cgpa= ref(false);
const dip_yop = ref(false);
const dip_stream = ref(false);
const dip_college = ref(false);
const dipoth_coll = ref(false);
const dip_university = ref(false);
const dipoth_university = ref(false);
const deg_type = ref(false);
const deg_othtype = ref(false);
const deg_yop = ref(false);
const deg_percen = ref(false);
const deg_cgpa = ref(false);
const deg_stream = ref(false);
const deg_strerr = ref(false);
const deg_college = ref(false);
const degoth_col = ref(false);
const deg_university = ref(false);
const degoth_university = ref(false);
const mas_type = ref(false);
const mas_othtype = ref(false);
const mas_percen = ref(false);
const mas_cgpa = ref(false);
const mas_yop = ref(false);
const mas_stream = ref(false);
const masoth_stream = ref(false);
const mas_coll = ref(false);
const mas_othcoll = ref(false);
const mas_university = ref(false);
const masoth_university = ref(false);
const iti_stream = ref(false);
const itioth_stream = ref(false);
const dip_othstr = ref(false);
const iti_coll = ref(false);
const iti_othcoll = ref(false);
const iti_university = ref(false);
const itioth_university = ref(false);
const tengap_err = ref(false);
const twegap_err = ref(false);
const twegapyear_err = ref(false);
const itigap_err = ref(false);
const itigapyear_err = ref(false);
const diplomagap_err = ref(false);
const diplomagapyear_err = ref(false);
const deggap_err = ref(false);
const deggapyear_err = ref(false);
const masgap_err = ref(false);
const masgapyear_err = ref(false);
const skip = ref(false);
const cardClassAddon = computed(() => (hasError.value ? "animate-shake" : ""));
const radioOptions = { 1: "Diploma", 2: "12th/PUC", 3: "ITI" };
const radioOptions1 = { true: "Yes", false: "No" };
const radioOptions2 = { true: "Yes", false: "No" };
const radioOptions3 = { true: "Yes", false: "No" };
const radioOptions4 = { true: "Yes", false: "No" };
const checkboxOptions = { false: "Other Stream" };
const checkboxOptions3 = { false: "Other Degree" };
const checkboxOptions4 = { false: "Other Master's" };
const checkboxOptions1 = { false: "Other College" };
const checkboxOptions5 = { false: "Other University" };
const checkboxOptions6 = { false: "Other Board" };
const checkboxOptions2 = { false: "Skip adding educational information" };
const pageLoading = ref(false)
const nanfunc = async () => {
  
  if(form.highestdegree === null)
    {
      highdeg_error.value = "This field is required"
      theme.pushMessage("Highest degree is required")
    }
    else {
      show_experience.value = true
    }
};

const nanfunc1 = async () => {
  
  if(skip===true&&form.highestdegree!=null)
    {
  
      show_experience.value = true
      // highdeg_error.value = "This field is required"
      // theme.pushMessage("Highest degree is required")
    }
};

const educational = async () => {
  show_personal.value = false;
};

const submit = async () => {
  if(skip.value===true){
    if(form.highestdegree===null){
      highdeg_error.value = "This field is required"
      theme.pushMessage("Highest degree is required")
    }
    else{
      show_experience.value = true
      // let data1 = new FormData();
      // data1.append(
      //   "educationdetails",
      //   JSON.stringify({
      //     highestdegree:form.highestdegree,
      //     tenth: {
      //       yop: null,
      //       percentage: "",
      //       cgpa_percentage:null,
      //       cgpa:"",
      //     },
      //     twelth: {
      //       yop: null,
      //       percentage: "",
      //       cgpa_percentage:null,
      //       cgpa:"",
      //       ygtwelth: null,
      //       ygyear: null,
      //     },
      //     iti: {
      //       yop: null,
      //       percentage: "",
      //       cgpa_percentage:null,
      //       cgpa:"",
      //       stream: null,
      //       otherstream: false,
      //       other_stream: "",
      //       university: null,
      //       otheruniversity: false,
      //       other_university: "",
      //       college: null,
      //       othercollege: false,
      //       other_college: "",
      //       ygiti: null,
      //       ygyear: null,
      //     },
      //     diploma: {
      //       yop: null,
      //       percentage: "",
      //       cgpa_percentage:null,
      //       cgpa:"",
      //       stream: null,
      //       otherstream: false,
      //       other_stream: "",
      //       university: null,
      //       otheruniversity: false,
      //       other_university: "",
      //       college: null,
      //       othercollege: false,
      //       other_college: "",
      //       ygdiploma: null,
      //       ygyear: null,
      //     },
      //     degree: {
      //       degree: null,
      //       otherdegree: false,
      //       other_degree: "",
      //       yop: null,
      //       percentage: "",
      //       cgpa_percentage:null,
      //       cgpa:"",
      //       stream: null,
      //       otherstream: false,
      //       other_stream: "",
      //       university: null,
      //       otheruniversity: false,
      //       other_university: "",
      //       college: null,
      //       othercollege: false,
      //       other_college: "",
      //       ygdeg: null,
      //       ygyear: null,
      //     },
      //     master: {
      //       master: null,
      //       othermaster: false,
      //       other_master: "",
      //       yop: null,
      //       percentage: "",
      //       cgpa_percentage:null,
      //       cgpa:"",
      //       stream: null,
      //       otherstream: false,
      //       other_stream: "",
      //       university: null,
      //       otheruniversity: false,
      //       other_university: "",
      //       college: null,
      //       othercollege: false,
      //       other_college: "",
      //       ygmas: null,
      //       ygyear: null,
      //     },
      //   })
      // );
      await user.checkonlines();
    if(online.value===true){
      pageLoading.value = true 
      await user.educational({"educationdetails":{highestdegree:form.highestdegree,
          tenth: {
            yop: 0,
            percentage: "",
            cgpa_percentage:null,
            cgpa:"",
          },
          twelth: {
            yop: 0,
            percentage: "",
            cgpa_percentage:null,
            cgpa:"",
            ygtwelth: null,
            ygyear: null,
          },
          iti: {
            yop: 0,
            percentage: "",
            cgpa_percentage:null,
            cgpa:"",
            stream: null,
            otherstream: false,
            other_stream: "",
            university: null,
            otheruniversity: false,
            other_university: "",
            college: null,
            othercollege: false,
            other_college: "",
            ygiti: null,
            ygyear: null,
          },
          diploma: {
            yop: 0,
            percentage: "",
            cgpa_percentage:null,
            cgpa:"",
            stream: null,
            otherstream: false,
            other_stream: "",
            university: null,
            otheruniversity: false,
            other_university: "",
            college: null,
            othercollege: false,
            other_college: "",
            ygdiploma: null,
            ygyear: null,
          },
          degree: {
            degree: null,
            otherdegree: false,
            other_degree: "",
            yop: null,
            percentage: "",
            cgpa_percentage:null,
            cgpa:"",
            stream: null,
            otherstream: false,
            other_stream: "",
            university: null,
            otheruniversity: false,
            other_university: "",
            college: null,
            othercollege: false,
            other_college: "",
            ygdeg: null,
            ygyear: null,
          },
          master: {
            master: null,
            othermaster: false,
            other_master: "",
            yop: null,
            percentage: "",
            cgpa_percentage:null,
            cgpa:"",
            stream: null,
            otherstream: false,
            other_stream: "",
            university: null,
            otheruniversity: false,
            other_university: "",
            college: null,
            othercollege: false,
            other_college: "",
            ygmas: null,
            ygyear: null,
          }}});
          pageLoading.value = false
        }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }

    }

  }
  else{
     let valid = true;
  // percentage part
  if(form.highestdegree === null)
    {

      theme.pushMessage("Highest degree is required")
      valid = false
    }
  const percent1 = (val) => {
    if (
      isNaN(form.tenth.percentage) ||
      form.tenth.percentage < 35 ||
      form.tenth.percentage > 100 ||
      form.tenth.percentage === Math.floor(form.tenth.percentage)
    ) {
      return "this field is required";
    } else {
      return form.tenth.percentage;
    }
  };
  const cgpa1 = (val) => {
    if (
      isNaN(form.tenth.cgpa) ||
      form.tenth.cgpa < 3 ||
      form.tenth.cgpa > 10 ||
      form.tenth.cgpa === Math.floor(form.tenth.cgpa)
    ) {
      return "this field is required";
    } else {
      return form.tenth.cgpa;
    }
  };
  const percent2 = (val) => {
    if (
      isNaN(form.twelth.percentage) ||
      form.twelth.percentage < 35 ||
      form.twelth.percentage > 100 ||
      form.twelth.percentage === Math.floor(form.twelth.percentage)
    )
      return "this field is required";
    else return form.twelth.percentage;
  };

  const cgpa2 = (val) => {
    if (
      isNaN(form.twelth.cgpa) ||
      form.twelth.cgpa < 3 ||
      form.twelth.cgpa > 10 ||
      form.twelth.cgpa === Math.floor(form.twelth.cgpa)
    )
      return "this field is required";
    else return form.twelth.cgpa;
  };

  const percent3 = (val) => {
    if (
      isNaN(form.iti.percentage) ||
      form.iti.percentage < 35 ||
      form.iti.percentage > 100 ||
      form.iti.percentage === Math.floor(form.iti.percentage)
    )
      return "this field is required";
    else return form.iti.percentage;
  };

  const cgpa3 = (val) => {
    if (
      isNaN(form.iti.cgpa) ||
      form.iti.cgpa < 3 ||
      form.iti.cgpa > 10 ||
      form.iti.cgpa === Math.floor(form.iti.percentage)
    )
      return "this field is required";
    else return form.iti.cgpa;
  };

  const percent4 = (val) => {
    if (
      isNaN(form.diploma.percentage) ||
      form.diploma.percentage < 35 ||
      form.diploma.percentage > 100 ||
      form.diploma.percentage === Math.floor(form.diploma.percentage)
    )
      return "this field is required";
    else return form.diploma.percentage;
  };

  const cgpa4 = (val) => {
    if (
      isNaN(form.diploma.cgpa) ||
      form.diploma.cgpa < 3 ||
      form.diploma.cgpa > 10 ||
      form.diploma.cgpa === Math.floor(form.diploma.cgpa)
    )
      return "this field is required";
    else return form.diploma.cgpa;
  };

  const percent5 = (val) => {
    if (
      isNaN(form.degree.percentage) ||
      form.degree.percentage < 35 ||
      form.degree.percentage > 100 ||
      form.degree.percentage === Math.floor(form.degree.percentage)
    )
      return "this field is required";
    else return form.degree.percentage;
  };

  const cgpa5 = (val) => {
    if (
      isNaN(form.degree.cgpa) ||
      form.degree.cgpa < 3 ||
      form.degree.cgpa > 10 ||
      form.degree.cgpa === Math.floor(form.degree.cgpa)
    )
      return "this field is required";
    else return form.degree.cgpa;
  };

  const percent6 = (val) => {
    if (
      isNaN(form.master.percentage) ||
      form.master.percentage < 35 ||
      form.master.percentage > 100 ||
      form.master.percentage === Math.floor(form.master.percentage)
    )
      return "this field is required";
    else return form.master.percentage;
  };

  const cgpa6 = (val) => {
    if (
      isNaN(form.master.cgpa) ||
      form.master.cgpa < 3 ||
      form.master.cgpa > 10 ||
      form.master.cgpa === Math.floor(form.master.cgpa)
    )
      return "this field is required";
    else return form.master.cgpa;
  };

  if (
    user.personal_data &&
    form.highestdegree &&
    form.highestdegree.name.toLowerCase() == 'degree'
  ) {
    form.degree.yop = user.personal_data.highestyop;
  } else if (
    user.personal_data &&
    form.highestdegree &&
    form.highestdegree.name.toLowerCase() == 'masters'
  ) {
    form.degree.yop = form.degree.yop;
  } else {
    form.degree.yop = null;
  }

  if (
    user.personal_data &&
    form.highestdegree &&
    form.highestdegree.name.toLowerCase() == 'masters'
  ) {
    form.master.yop = user.personal_data.highestyop;
  } else {
    form.master.yop = null;
  }
  if (form.tenth.cgpa_percentage === null) {

    theme.pushMessage("Please select any one option out of cgpa and percentage in 10th details");
    valid = false;
  } 
  if (form.tenth.percentage === ""&&form.tenth.cgpa_percentage === "percentage") {
    tenth_percen.value = "This field is required";
    theme.pushMessage("10th Percentage is required");
    valid = false;
  }
  if (form.tenth.cgpa === ""&&form.tenth.cgpa_percentage === "cgpa") {
    tenth_cgpa.value = "This field is required";
    theme.pushMessage("10th CGPA is required");
    valid = false;
  }
  if (
    form.tenth.percentage != percent1(form.tenth.percentage) &&
    form.tenth.percentage != ""
  ) {
    tenth_percen.value = "enter valid percentage";
    theme.pushMessage("10th percentage should be valid");
    valid = false;
  }
  if (
    form.tenth.cgpa != cgpa1(form.tenth.cgpa) &&
    form.tenth.cgpa != ""
  ) {
    tenth_cgpa.value = "enter valid cgpa";
    theme.pushMessage("10th cgpa should be valid");
    valid = false;
  }
  // if(form.tenth.ygtenth === null )
  // {

  //   tengap_err.value = "This field is required"
  //   theme.pushMessage("10th Yeargap is required")
  //   valid=false
  // }

  if (form.tenth.yop === null) {
    tenth_yop.value = "This field is required";
    theme.pushMessage("10th YOP is required");
    valid = false;
  }

  if (
    form1.value === null &&
    ((user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == 'degree') ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'masters'))
  ) {
    value_error.value = "This field is required";
    theme.pushMessage(" choose any one option");
    valid = false;
  }
  if (form.twelth.cgpa_percentage === null&& (form1.value == 2||user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == '12th/puc')) {
    cgpa_percentage_twelfth_error.value = "This field is required";
    theme.pushMessage("Please select any one option out of CGPA and Percentage in 12th details");
    valid = false;
  } 
  if (form.twelth.percentage === "" && (form1.value == 2||user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == '12th/puc') &&form.twelth.cgpa_percentage === "percentage") {
    twelfth_percen.value = "This field is required";
    theme.pushMessage("Tweflth Percentage is required");
    valid = false;
  }
  if (form.twelth.cgpa === "" && (form1.value == 2||user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == '12th/puc') &&form.twelth.cgpa_percentage === "cgpa") {
    twelfth_cgpa.value = "This field is required";
    theme.pushMessage("Tweflth CGPA is required");
    valid = false;
  }
  if (
    form.twelth.percentage != percent2(form.twelth.percentage) &&
    (form1.value == 2||user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == '12th/puc') &&
    form.twelth.percentage != ""
  ) {
    twelfth_percen.value = "enter valid percentage";
    theme.pushMessage("Tweflth percentage should be valid");
    valid = false;
  }
  if (
    form.twelth.cgpa != cgpa2(form.twelth.cgpa) &&
    (form1.value == 2||user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == '12th/puc') &&
    form.twelth.cgpa != ""
  ) {
    twelfth_cgpa.value = "enter valid cgpa";
    theme.pushMessage("Tweflth cgpa should be valid");
    valid = false;
  }
  if (form.twelth.ygtwelth === null && (form1.value == 2||user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == '12th/puc')) {
    twegap_err.value = "This field is required";
    theme.pushMessage("Tweflth Yeargap is required");
    valid = false;
  }
  if (
    (form.twelth.ygyear === null||form.twelth.ygyear <= 0) &&
    (form1.value == 2||user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == '12th/puc') &&
    form.twelth.ygtwelth === true
  ) {
    twegapyear_err.value = "This field is required";
    theme.pushMessage("Tweflth Yeargap year is required");
    valid = false;
  }
  // if (
  //   form.twelth.ygyear <= 0 &&
  //   (form1.value == 2||user.personal_data &&
  //     form.highestdegree &&
  //     form.highestdegree.name.toLowerCase() == '12th/puc') &&
  //   form.twelth.ygtwelth === true
  // ) {
  //   twegapyear_err.value = "This field is required";
  //   theme.pushMessage("Tweflth Yeargap year is required");
  //   valid = false;
  // }
  if (form.twelth.yop === null && form1.value == 2&&user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() != '12th/puc') {
    twelfth_yop.value = "This field is required";
    theme.pushMessage("Tweflth YOP is required");
    valid = false;
  }
  if (
    (form1.value == 3 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() === 'iti')) &&
    form.iti.cgpa_percentage === null
  ) {
    cgpa_percentage_iti_error.value = "This field is required";
    theme.pushMessage("Please select any one option out of CGPA and Percentage in ITI details");
    valid = false;
  }
  if (
    (form1.value == 3 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'iti')) &&
    form.iti.percentage === "" && form.iti.cgpa_percentage ==="percentage"
  ) {
    iti_percen.value = "This field is required";
    theme.pushMessage("ITI percentage is required");
    valid = false;
  }

  if (
    (form1.value == 3 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'iti')) &&
    form.iti.cgpa === "" && form.iti.cgpa_percentage ==="cgpa"
  ) {
    iti_cgpa.value = "This field is required";
    theme.pushMessage("ITI cgpa is required");
    valid = false;
  }
  // percent
  if (
    (form1.value == 3 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'iti')) &&
    form.iti.percentage != percent3(form.iti.percentage) &&
    form.iti.percentage != ""
  ) {
    iti_percen.value = "enter valid percentage";
    theme.pushMessage("ITI percentage should be valid");
    valid = false;
  }

  if (
    (form1.value == 3 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'iti')) &&
    form.iti.cgpa != cgpa3(form.iti.cgpa) &&
    form.iti.cgpa != ""
  ) {
    iti_cgpa.value = "enter valid cgpa";
    theme.pushMessage("ITI cgpa should be valid");
    valid = false;
  }

  if (
    form1.value == 3 &&
    form.iti.yop === null &&
    user.personal_data &&
    form.highestdegree &&
    form.highestdegree.name.toLowerCase() != 'iti'
  ) {
    iti_yop.value = "This field is required";
    theme.pushMessage("ITI YOP is required");
    valid = false;
  }
  if (
    (form1.value == 3 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'iti')) &&
    form.iti.stream === null &&
    form.iti.otherstream === false
  ) {
    iti_stream.value = "This field is required";
    theme.pushMessage("ITI Stream is required");
    valid = false;
  }
  if (
    (form1.value == 3 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'iti')) &&
    (form.iti.other_stream === ""||!form.iti.other_stream.replace(/\s/g, '').length) &&
    form.iti.otherstream === true
  ) {
    itioth_stream.value = "This field is required";
    theme.pushMessage("ITI Other stream is required");
    valid = false;
  }
  // if (
  //   (form1.value == 3 ||
  //     (user.personal_data &&
  //       form.highestdegree &&
  //       form.highestdegree.name.toLowerCase() == 'iti')) &&
  //  (!form.iti.other_stream.replace(/\s/g, '').length) &&
  //   form.iti.otherstream === true
  // ) {
  //   itioth_stream.value = "This field is required";
  //   theme.pushMessage("ITI Other stream is required");
  //   valid = false;
  // }
  if (
    (form1.value == 3 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'iti')) &&
    form.iti.college === null &&
    form.iti.othercollege === false
  ) {
    iti_coll.value = "This field is required";
    theme.pushMessage("ITI college is required");
    valid = false;
  }
  if (
    (form1.value == 3 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'iti')) &&
    (form.iti.other_college === ""||!form.iti.other_college.replace(/\s/g, '').length) &&
    form.iti.othercollege === true
  ) {
    iti_othcoll.value = "This field is required";
    theme.pushMessage("ITI Other college is required");
    valid = false;
  }
  // if (
  //   (form1.value == 3 ||
  //     (user.personal_data &&
  //       form.highestdegree &&
  //       form.highestdegree.name.toLowerCase() == 'iti')) &&
  //   (!form.iti.other_college.replace(/\s/g, '').length) &&
  //   form.iti.othercollege === true
  // ) {
  //   iti_othcoll.value = "This field is required";
  //   theme.pushMessage("ITI Other college is required");
  //   valid = false;
  // }
  if (
    (form1.value == 3 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'iti')) &&
    form.iti.university === null &&
    form.iti.otheruniversity === false
  ) {
    iti_university.value = "This field is required";
    theme.pushMessage("ITI Board is required");
    valid = false;
  }

  if (
    (form1.value == 3 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'iti')) &&
    (form.iti.other_university === ""||!form.iti.other_university.replace(/\s/g, '').length) &&
    form.iti.otheruniversity === true
  ) {
    itioth_university.value = "This field is required";
    theme.pushMessage("ITI Other Board is required");
    valid = false;
  }
  // if (
  //   (form1.value == 3 ||
  //     (user.personal_data &&
  //       form.highestdegree &&
  //       form.highestdegree.name.toLowerCase() == 'iti')) &&
  //   (!form.iti.other_university.replace(/\s/g, '').length) &&
  //   form.iti.otheruniversity === true
  // ) {
  //   itioth_university.value = "This field is required";
  //   theme.pushMessage("ITI Other Board is required");
  //   valid = false;
  // }
  if (
    (form1.value == 3 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'iti')) &&
    form.iti.ygiti === null
  ) {
    itigap_err.value = "This field is required";
    theme.pushMessage("ITI Yeargap is required");
    valid = false;
  }

  if (
    (form1.value == 3 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'iti')) &&
    form.iti.ygiti === true &&
   (form.iti.ygyear === null||form.iti.ygyear <= 0)
  ) {
    itigapyear_err.value = "This field is required";
    theme.pushMessage("Number Year gap is required");
    valid = false;
  }

  // if (
  //   (form1.value == 3 ||
  //     (user.personal_data &&
  //       form.highestdegree &&
  //       form.highestdegree.name.toLowerCase() == 'iti')) &&
  //   form.iti.ygiti === true &&
  //   form.iti.ygyear <= 0 
  // ) {
  //   itigapyear_err.value = "This field is required";
  //   theme.pushMessage("Number Year gap is required");
  //   valid = false;
  // }

  if (
    (form1.value == 1 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'diploma')) &&
    form.diploma.cgpa_percentage === null
  ) {
    cgpa_percentage_diploma_error.value = "This field is required";
    theme.pushMessage("Please select any one option out of CGPA and Percentage in Diploma details");
    valid = false;
  }

  if (
    (form1.value == 1 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'diploma')) &&
    form.diploma.percentage === "" && form.diploma.cgpa_percentage === "percentage"
  ) {
    dip_percen.value = "This field is required";
    theme.pushMessage("Diploma percentage is required");
    valid = false;
  }

  if (
    (form1.value == 1 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'diploma')) &&
    form.diploma.cgpa === "" && form.diploma.cgpa_percentage === "cgpa"
  ) {
    dip_cgpa.value = "This field is required";
    theme.pushMessage("Diploma cgpa is required");
    valid = false;
  }
  // percent

  if (
    (form1.value == 1 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'diploma')) &&
    form.diploma.percentage != percent4(form.diploma.percentage) &&
    form.diploma.percentage != ""
  ) {
    dip_percen.value = "enter valid percentage";
    theme.pushMessage("Diploma percentage should be valid");
    valid = false;
  }

  if (
    (form1.value == 1 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'diploma')) &&
    form.diploma.cgpa != cgpa4(form.diploma.cgpa) &&
    form.diploma.cgpa != ""
  ) {
    dip_cgpa.value = "enter valid cgpa";
    theme.pushMessage("Diploma cgpa should be valid");
    valid = false;
  }

  if (
    form1.value == 1 &&
    form.diploma.yop === null &&
    user.personal_data &&
    form.highestdegree &&
    form.highestdegree.name.toLowerCase() != 'diploma'
  ) {
    dip_yop.value = "This field is required";
    theme.pushMessage("Diploma YOP is required");
    valid = false;
  }
  if (
    (form1.value == 1 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'diploma')) &&
    form.diploma.stream === null &&
    form.diploma.otherstream === false
  ) {
    dip_stream.value = "This field is required";
    theme.pushMessage("Diploma stream is required");
    valid = false;
  }
  
  if (
    (form1.value == 1 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'diploma')) &&
    (form.diploma.other_stream === ""||!form.diploma.other_stream.replace(/\s/g, '').length) &&
    form.diploma.otherstream === true
  ) {
    dip_othstr.value = "This field is required";
    theme.pushMessage("Diploma Other stream is required");
    valid = false;
  }

  // if (
  //   (form1.value == 1 ||
  //     (user.personal_data &&
  //       form.highestdegree &&
  //       form.highestdegree.name.toLowerCase() == 'diploma')) &&
  //   (!form.diploma.other_stream.replace(/\s/g, '').length) &&
  //   form.diploma.otherstream === true
  // ) {
  //   dip_othstr.value = "This field is required";
  //   theme.pushMessage("Diploma Other stream is required");
  //   valid = false;
  // }

  if (
    (form1.value == 1 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'diploma')) &&
    form.diploma.college === null &&
    form.diploma.othercollege === false
  ) {
    dip_college.value = "This field is required";
    theme.pushMessage("Diploma college is required");
    valid = false;
  }
  if (
    (form1.value == 1 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'diploma')) &&
    (form.diploma.other_college === ""||!form.diploma.other_college.replace(/\s/g, '').length) &&
    form.diploma.othercollege === true
  ) {
    dipoth_coll.value = "This field is required";
    theme.pushMessage("Diploma other college is required");
    valid = false;
  }

  // if (
  //   (form1.value == 1 ||
  //     (user.personal_data &&
  //       form.highestdegree &&
  //       form.highestdegree.name.toLowerCase() == 'diploma')) &&
  //   (!form.diploma.other_college.replace(/\s/g, '').length) &&
  //   form.diploma.othercollege === true
  // ) {
  //   dipoth_coll.value = "This field is required";
  //   theme.pushMessage("Diploma other college is required");
  //   valid = false;
  // }

  if (
    (form1.value == 1 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'diploma')) &&
    form.diploma.university === null &&
    form.diploma.otheruniversity === false
  ) {
    dip_university.value = "This field is required";
    theme.pushMessage("Diploma Board is required");
    valid = false;
  }
  if (
    (form1.value == 1 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'diploma')) &&
    (form.diploma.other_university === ""||!form.diploma.other_university.replace(/\s/g, '').length)&&
    form.diploma.otheruniversity === true
  ) {
    dipoth_university.value = "This field is required";
    theme.pushMessage("Diploma other Board is required");
    valid = false;
  }
  // if (
  //   (form1.value == 1 ||
  //     (user.personal_data &&
  //       form.highestdegree &&
  //       form.highestdegree.name.toLowerCase() == 'diploma')) &&
  //   (!form.diploma.other_university.replace(/\s/g, '').length) &&
  //   form.diploma.otheruniversity === true
  // ) {
  //   dipoth_university.value = "This field is required";
  //   theme.pushMessage("Diploma other Board is required");
  //   valid = false;
  // }
  if (
    (form1.value == 1 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'diploma')) &&
    form.diploma.ygdiploma === null
  ) {
    diplomagap_err.value = "This field is required";
    theme.pushMessage("Diploma Yeargap is required");
    valid = false;
  }
  if (
    (form1.value == 1 ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'diploma')) &&
    form.diploma.ygdiploma === true &&
    (form.diploma.ygyear === null||form.diploma.ygyear <= 0)
  ) {
    diplomagapyear_err.value = "This field is required";
    theme.pushMessage("Diploma Yeargap year is required");
    valid = false;
  }

  // if (
  //   (form1.value == 1 ||
  //     (user.personal_data &&
  //       form.highestdegree &&
  //       form.highestdegree.name.toLowerCase() == 'diploma')) &&
  //   form.diploma.ygdiploma === true &&
  //   form.diploma.ygyear <= 0
  // ) {
  //   diplomagapyear_err.value = "This field is required";
  //   theme.pushMessage("Diploma Yeargap year is required");
  //   valid = false;
  // }
  if (
    ((user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == 'degree') ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'masters')) &&
    form.degree.degree === null &&
    form.degree.otherdegree === false
  ) {
    deg_type.value = "This field is required";
    theme.pushMessage("Degree is required");
    valid = false;
  }

  if (
    ((user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == 'degree') ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'masters')) &&
    (form.degree.other_degree === ""||!form.degree.other_degree.replace(/\s/g, '').length) &&
    form.degree.otherdegree === true
  ) {
    deg_othtype.value = "This field is required";
    theme.pushMessage("Other Degree is required");
    valid = false;
  }

  // if (
  //   ((user.personal_data &&
  //     form.highestdegree &&
  //     form.highestdegree.name.toLowerCase() == 'degree') ||
  //     (user.personal_data &&
  //       form.highestdegree &&
  //       form.highestdegree.name.toLowerCase() == 'masters')) &&
  //   (!form.degree.other_degree.replace(/\s/g, '').length) &&
  //   form.degree.otherdegree === true
  // ) {
  //   deg_othtype.value = "This field is required";
  //   theme.pushMessage("Other Degree is required");
  //   valid = false;
  // }
  if (
    ((user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == 'degree') ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'masters')) &&
    form.degree.ygdeg === null
  ) {
    deggap_err.value = "This field is required";
    theme.pushMessage("Degree Yeargap is required");
    valid = false;
  }

  if (
    ((user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == 'degree') ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'masters')) &&
    form.degree.ygdeg === true &&
    (form.degree.ygyear === null||form.degree.ygyear <= 0)
  ) {
    deggapyear_err.value = "This field is required";
    theme.pushMessage("Degree Yeargap year is required");
    valid = false;
  }

  // if (
  //   ((user.personal_data &&
  //     form.highestdegree &&
  //     form.highestdegree.name.toLowerCase() == 'degree') ||
  //     (user.personal_data &&
  //       form.highestdegree &&
  //       form.highestdegree.name.toLowerCase() == 'masters')) &&
  //   form.degree.ygdeg === true &&
  //   form.degree.ygyear <= 0
  // ) {
  //   deggapyear_err.value = "This field is required";
  //   theme.pushMessage("Degree Yeargap year is required");
  //   valid = false;
  // }
  if (
    ((user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == 'degree') ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'masters')) &&
        form.degree.cgpa_percentage === null
  ) {
    cgpa_percentage_degree_error.value = "This field is required";
    theme.pushMessage("Please select any one option out of CGPA and Percentage in Degree details");
    valid = false;
  }

  if (
    ((user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == 'degree') ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'masters')) &&
    form.degree.percentage === "" && form.degree.cgpa_percentage === "percentage"
  ) {
    deg_percen.value = "This field is required";
    theme.pushMessage("Degree percentage is required");
    valid = false;
  }

  if (
    ((user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == 'degree') ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'masters')) &&
    form.degree.cgpa === "" && form.degree.cgpa_percentage === "cgpa"
  ) {
    deg_cgpa.value = "This field is required";
    theme.pushMessage("Degree CGPA is required");
    valid = false;
  }

  // percent

  if (
    ((user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == 'degree') ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'masters')) &&
    form.degree.percentage != percent5(form.degree.percentage) &&
    form.degree.percentage != ""
  ) {
    deg_percen.value = "enter valid percentage";
    theme.pushMessage("Degree percentage should be valid");
    valid = false;
  }

  if (
    ((user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == 'degree') ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'masters')) &&
    form.degree.cgpa != cgpa5(form.degree.cgpa) &&
    form.degree.cgpa != ""
  ) {
    deg_cgpa.value = "enter valid cgpa";
    theme.pushMessage("Degree cgpa should be valid");
    valid = false;
  }
  if (
    form.degree.yop === null &&
    ((user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == 'degree') ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'masters'))
  ) {
    deg_yop.value = "This field is required";
    theme.pushMessage("Degree YOP is required");
    valid = false;
  }
  if (
    ((user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == 'degree') ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'masters')) &&
    form.degree.stream === null &&
    form.degree.otherstream === false
  ) {
    deg_stream.value = "This field is required";
    theme.pushMessage("Degree stream is required");
    valid = false;
  }

  if (
    ((user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == 'degree') ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'masters')) &&
    (form.degree.other_stream === ""||!form.degree.other_stream.replace(/\s/g, '').length) &&
    form.degree.otherstream === true
  ) {
    deg_strerr.value = "This field is required";
    theme.pushMessage("Degree Other stream is required");
    valid = false;
  }

  // if (
  //   ((user.personal_data &&
  //     form.highestdegree &&
  //     form.highestdegree.name.toLowerCase() == 'degree') ||
  //     (user.personal_data &&
  //       form.highestdegree &&
  //       form.highestdegree.name.toLowerCase() == 'masters')) &&
  //   (!form.degree.other_stream.replace(/\s/g, '').length) &&
  //   form.degree.otherstream === true
  // ) {
  //   deg_strerr.value = "This field is required";
  //   theme.pushMessage("Degree Other stream is required");
  //   valid = false;
  // }

  if (
    ((user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == 'degree') ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'masters')) &&
    form.degree.university === null &&
    form.degree.otheruniversity === false
  ) {
    deg_university.value = "This field is required";
    theme.pushMessage("Degree University is required");
    valid = false;
  }

  if (
    ((user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == 'degree') ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'masters')) &&
    (form.degree.other_university === ""||!form.degree.other_university.replace(/\s/g, '').length) &&
    form.degree.otheruniversity === true
  ) {
    degoth_university.value = "This field is required";
    theme.pushMessage("Degree Other University is required");
    valid = false;
  }

  // if (
  //   ((user.personal_data &&
  //     form.highestdegree &&
  //     form.highestdegree.name.toLowerCase() == 'degree') ||
  //     (user.personal_data &&
  //       form.highestdegree &&
  //       form.highestdegree.name.toLowerCase() == 'masters')) &&
  //   (!form.degree.other_university.replace(/\s/g, '').length) &&
  //   form.degree.otheruniversity === true
  // ) {
  //   degoth_university.value = "This field is required";
  //   theme.pushMessage("Degree Other University is required");
  //   valid = false;
  // }
  if (
    ((user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == 'degree') ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'masters')) &&
    form.degree.college === null &&
    form.degree.othercollege === false
  ) {
    deg_college.value = "This field is required";
    theme.pushMessage("Degree college is required");
    valid = false;
  }

  if (
    ((user.personal_data &&
      form.highestdegree &&
      form.highestdegree.name.toLowerCase() == 'degree') ||
      (user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'masters')) &&
    (form.degree.other_college === ""||!form.degree.other_college.replace(/\s/g, '').length) &&
    form.degree.othercollege === true
  ) {
    degoth_col.value = "This field is required";
    theme.pushMessage("Degree other college is required");
    valid = false;
  }

  // if (
  //   ((user.personal_data &&
  //     form.highestdegree &&
  //     form.highestdegree.name.toLowerCase() == 'degree') ||
  //     (user.personal_data &&
  //       form.highestdegree &&
  //       form.highestdegree.name.toLowerCase() == 'masters')) &&
  //   (!form.degree.other_college.replace(/\s/g, '').length) &&
  //   form.degree.othercollege === true
  // ) {
  //   degoth_col.value = "This field is required";
  //   theme.pushMessage("Degree other college is required");
  //   valid = false;
  // }

  if (
    user.personal_data &&
    form.highestdegree &&
    form.highestdegree.name.toLowerCase() == 'masters' &&
    form.master.master === null &&
    form.master.othermaster === false
  ) {
    mas_type.value = "This field is required";
    theme.pushMessage("Masters is required");
    valid = false;
  }

  if (
    user.personal_data &&
    form.highestdegree &&
    form.highestdegree.name.toLowerCase() == 'masters' &&
    (form.master.other_master === ""||!form.master.other_master.replace(/\s/g, '').length) &&
    form.master.othermaster === true
  ) {
    mas_othtype.value = "This field is required";
    theme.pushMessage("Other Masters is required");
    valid = false;
  }

  // if (
  //   user.personal_data &&
  //   form.highestdegree &&
  //   form.highestdegree.name.toLowerCase() == 'masters' &&
  //   (!form.master.other_master.replace(/\s/g, '').length) &&
  //   form.master.othermaster === true
  // ) {
  //   mas_othtype.value = "This field is required";
  //   theme.pushMessage("Other Masters is required");
  //   valid = false;
  // }


  if (
    user.personal_data &&
    form.highestdegree &&
    form.highestdegree.name.toLowerCase() == 'masters' &&
    form.master.cgpa_percentage === null
  ) {
    cgpa_percentage_master_error.value = "This field is required";
    theme.pushMessage("Please select any one option out of cgpa and percentage in 10th details");
    valid = false;
  }

  if (
    user.personal_data &&
    form.highestdegree &&
    form.highestdegree.name.toLowerCase() == 'masters' &&
    form.master.percentage === "" &&
    form.master.cgpa_percentage === "percentage"
  ) {
    mas_percen.value = "This field is required";
    theme.pushMessage("Masters percentage is required");
    valid = false;
  }

  if (
    user.personal_data &&
    form.highestdegree &&
    form.highestdegree.name.toLowerCase() == 'masters' &&
    form.master.cgpa === "" &&
    form.master.cgpa_percentage === "cgpa"
  ) {
    mas_cgpa.value = "This field is required";
    theme.pushMessage("Masters CGPA is required");
    valid = false;
  }
  // percent
  if (
    user.personal_data &&
    form.highestdegree &&
    form.highestdegree.name.toLowerCase() == 'masters' &&
    form.master.percentage != "" &&
    form.master.percentage != percent6(form.master.percentage)
  ) {
    mas_percen.value = "enter valid percentage";
    theme.pushMessage("Masters percentage is not valid");
    valid = false;
  }

  if (
    user.personal_data &&
    form.highestdegree &&
    form.highestdegree.name.toLowerCase() == 'masters' &&
    form.master.cgpa != "" &&
    form.master.cgpa != cgpa6(form.master.cgpa)
  ) {
    mas_cgpa.value = "enter valid cgpa";
    theme.pushMessage("Masters cgpa is not valid");
    valid = false;
  }

  if (
    user.personal_data &&
    form.highestdegree &&
    form.highestdegree.name.toLowerCase() == 'masters' &&
    form.master.yop === null
  ) {
    mas_yop.value = "This field is required";
    theme.pushMessage("Masters YOP is required");
    valid = false;
  }
  if (
    user.personal_data &&
    form.highestdegree &&
    form.highestdegree.name.toLowerCase() == 'masters' &&
    form.master.stream === null &&
    form.master.otherstream === false
  ) {
    mas_stream.value = "This field is required";
    theme.pushMessage("Masters stream is required");
    valid = false;
  }
  if (
    user.personal_data &&
    form.highestdegree &&
    form.highestdegree.name.toLowerCase() == 'masters' &&
    (form.master.other_stream === ""||!form.master.other_stream.replace(/\s/g, '').length) &&
    form.master.otherstream === true
  ) {
    masoth_stream.value = "This field is required";
    theme.pushMessage("Masters other stream is required");
    valid = false;
  }

  // if (
  //   user.personal_data &&
  //   form.highestdegree &&
  //   form.highestdegree.name.toLowerCase() == 'masters' &&
  //   (!form.master.other_stream.replace(/\s/g, '').length) &&
  //   form.master.otherstream === true
  // ) {
  //   masoth_stream.value = "This field is required";
  //   theme.pushMessage("Masters other stream is required");
  //   valid = false;
  // }

  if (
    user.personal_data &&
    form.highestdegree &&
    form.highestdegree.name.toLowerCase() == 'masters' &&
    form.master.university === null &&
    form.master.otheruniversity === false
  ) {
    mas_stream.value = "This field is required";
    theme.pushMessage("Masters University is required");
    valid = false;
  }
  if (
    user.personal_data &&
    form.highestdegree &&
    form.highestdegree.name.toLowerCase() == 'masters' &&
    (form.master.other_university === ""||!form.master.other_university.replace(/\s/g, '').length) &&
    form.master.otheruniversity === true
  ) {
    masoth_stream.value = "This field is required";
    theme.pushMessage("Masters other University is required");
    valid = false;
  }

  // if (
  //   user.personal_data &&
  //   form.highestdegree &&
  //   form.highestdegree.name.toLowerCase() == 'masters' &&
  //   (!form.master.other_university.replace(/\s/g, '').length) &&
  //   form.master.otheruniversity === true
  // ) {
  //   masoth_stream.value = "This field is required";
  //   theme.pushMessage("Masters other University is required");
  //   valid = false;
  // }
  if (
    user.personal_data &&
    form.highestdegree &&
    form.highestdegree.name.toLowerCase() == 'masters' &&
    form.master.college === null &&
    form.master.othercollege === false
  ) {
    mas_coll.value = "This field is required";
    theme.pushMessage("Masters college is required");
    valid = false;
  }
  if (
    user.personal_data &&
    form.highestdegree &&
    form.highestdegree.name.toLowerCase() == 'masters' &&
    (form.master.other_college === ""||!form.master.other_college.replace(/\s/g, '').length) &&
    form.master.othercollege === true
  ) {
    mas_othcoll.value = "This field is required";
    theme.pushMessage("Masters other college is required");
    valid = false;
  }
  // if (
  //   user.personal_data &&
  //   form.highestdegree &&
  //   form.highestdegree.name.toLowerCase() == 'masters' &&
  //   (!form.master.other_college.replace(/\s/g, '').length) &&
  //   form.master.othercollege === true
  // ) {
  //   mas_othcoll.value = "This field is required";
  //   theme.pushMessage("Masters other college is required");
  //   valid = false;
  // }
  if (
    user.personal_data &&
    form.highestdegree &&
    form.highestdegree.name.toLowerCase() == 'masters' &&
    form.master.ygmas === null
  ) {
    masgap_err.value = "This field is required";
    theme.pushMessage("Masters Yeargap is required");
    valid = false;
  }

  if (
    user.personal_data &&
    form.highestdegree &&
    form.highestdegree.name.toLowerCase() == 'masters' &&
    form.master.ygmas === true &&
    form.master.ygyear === null
  ) {
    masgapyear_err.value = "This field is required";
    theme.pushMessage("Masters Yeargap year is required");
    valid = false;
  }

  if (
    user.personal_data &&
    form.highestdegree &&
    form.highestdegree.name.toLowerCase() == 'masters' &&
    form.master.ygmas === true &&
    form.master.ygyear <= 0
  ) {
    masgapyear_err.value = "This field is required";
    theme.pushMessage("Masters Yeargap year is required");
    valid = false;
  }

  if (valid === true) {
    try {
      if (
        user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'iti'
      ) {
        form.iti.yop = user.personal_data.highestyop;
      }
      if (
        user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == 'diploma'
      ) {
        form.diploma.yop = user.personal_data.highestyop;
      }

      if (
        user.personal_data &&
        form.highestdegree &&
        form.highestdegree.name.toLowerCase() == '12th/puc'
      ) {
        form.twelth.yop = user.personal_data.highestyop;
      }

      if (form1.value == 2) {
        (form.iti.yop = 0),
          (form.iti.percentage = ""),
          (form.iti.cgpa = ""),
          (form.iti.cgpa_percentage = ""),
          (form.iti.stream = null),
          (form.iti.otherstream = false),
          (form.iti.other_stream = ""),
          (form.iti.college = null),
          (form.iti.othercollege = false),
          (form.iti.other_college = ""),
          (form.iti.university = null),
          (form.iti.otheruniversity = false),
          (form.iti.other_university = ""),
          (form.iti.ygiti = false),
          (form.iti.ygyear = ""),
          (form.diploma.yop = 0),
          (form.diploma.percentage = ""),
          (form.diploma.cgpa = ""),
          (form.diploma.cgpa_percentage = ""),
          (form.diploma.stream = null),
          (form.diploma.otherstream = false),
          (form.diploma.other_stream = ""),
          (form.diploma.college = null),
          (form.diploma.othercollege = false),
          (form.diploma.other_college = ""),
          (form.diploma.university = null),
          (form.diploma.otheruniversity = false),
          (form.diploma.other_university = ""),
          (form.diploma.ygdiploma = false),
          (form.diploma.ygyear = "");
      }
      if (form1.value == 3) {
        (form.diploma.yop = 0),
          (form.diploma.percentage = ""),
          (form.diploma.cgpa = ""),
          (form.diploma.cgpa_percentage = ""),
          (form.diploma.stream = null),
          (form.diploma.otherstream = false),
          (form.diploma.other_stream = ""),
          (form.diploma.college = null),
          (form.diploma.othercollege = false),
          (form.diploma.other_college = ""),
          (form.diploma.university = null),
          (form.diploma.otheruniversity = false),
          (form.diploma.other_university = ""),
          (form.diploma.ygdiploma = false),
          (form.diploma.ygyear = "");
          (form.twelth.yop = 0), 
          (form.twelth.percentage = ""),
          (form.twelth.cgpa = ""), 
          (form.twelth.cgpa_percentage = ""),
          (form.twelth.cgpa = ""), 
          (form.twelth.cgpa_percentage = "");
      }
      if (form1.value == 1) {
        (form.twelth.yop = null),
          (form.twelth.percentage = ""),
          (form.iti.yop = 0),
          (form.iti.percentage = ""),
          (form.iti.stream = null),
          (form.iti.otherstream = false),
          (form.iti.other_stream = ""),
          (form.iti.college = null),
          (form.iti.othercollege = false),
          (form.iti.other_college = ""),
          (form.iti.university = null),
          (form.iti.otheruniversity = false),
          (form.iti.other_university = ""),
          (form.iti.ygiti = false),
          (form.iti.ygyear = null);
      }
      // if (
      //   (user.personal_data &&
      //     form.highestdegree &&
      //     form.highestdegree.name.toLowerCase() == 'iti') ||
      //   (user.personal_data &&
      //     form.highestdegree &&
      //     form.highestdegree.name.toLowerCase() == 'diploma')
      // ) {
      //   form.degree.percentage = 0;
      //   form.master.percentage = 0;
      // }
      // if (
      //   user.personal_data &&
      //   form.highestdegree &&
      //   form.highestdegree.name.toLowerCase() == 'degree'
      // ) {
      //   form.master.percentage = 0;
      // }
      // if (
      //   user.personal_data &&
      //   form.highestdegree &&
      //   form.highestdegree.name.toLowerCase() == 'diploma'
      // ) {
      //   form.twelth.percentage = 0;
      //   form.iti.percentage = 0;
      // }
      // if (
      //   user.personal_data &&
      //   form.highestdegree &&
      //   form.highestdegree.name.toLowerCase() == 'iti'
      // ) {
      //   form.twelth.percentage = 0;
      //   form.diploma.percentage = 0;
      // }
      if (form.diploma.otherstream == true) {
        form.diploma.stream = null;
      }
      if (form.diploma.otherstream == false) {
        form.diploma.other_stream = "";
      }
      if (form.diploma.othercollege == true) {
        form.diploma.college = null;
      }
      if (form.diploma.othercollege == false) {
        form.diploma.other_college = "";
      }
      if (form.diploma.otheruniversity == true) {
        form.diploma.university = null;
      }
      if (form.diploma.otheruniversity == false) {
        form.diploma.other_university = "";
      }
      if (form.iti.otherstream == true) {
        form.iti.stream = null;
      }
      if (form.iti.otherstream == false) {
        form.iti.other_stream = "";
      }
      if (form.iti.othercollege == true) {
        form.iti.college = null;
      }
      if (form.iti.othercollege == false) {
        form.iti.other_college = "";
      }
      if (form.iti.otheruniversity == true) {
        form.iti.university = null;
      }
      if (form.iti.otheruniversity == false) {
        form.iti.other_university = "";
      }
      if (form.degree.otherstream == true) {
        form.degree.stream = null;
      }
      if (form.degree.otherstream == false) {
        form.degree.other_stream = "";
      }
      if (form.degree.otherdegree == true) {
        form.degree.degree = null;
      }
      if (form.degree.otherdegree == false) {
        form.degree.other_degree = "";
      }
      if (form.degree.othercollege == true) {
        form.degree.college = null;
      }
      if (form.degree.othercollege == false) {
        form.degree.other_college = "";
      }
      if (form.degree.otheruniversity == true) {
        form.degree.university = null;
      }
      if (form.degree.otheruniversity == false) {
        form.degree.other_university = "";
      }
      if (form.master.otherstream == true) {
        form.master.stream = null;
      }
      if (form.master.otherstream == false) {
        form.master.other_stream = "";
      }
      if (form.master.othermaster == true) {
        form.master.master = null;
      }
      if (form.master.othermaster == false) {
        form.master.other_master = "";
      }
      if (form.master.othercollege == true) {
        form.master.college = null;
      }
      if (form.master.othercollege == false) {
        form.master.other_college = "";
      }
      if (form.master.otheruniversity == true) {
        form.master.university = null;
      }
      if (form.master.otheruniversity == false) {
        form.master.other_university = "";
      }
      await user.checkonlines();
      pageLoading.value = true
    if(online.value===true){
      
      let data1 = new FormData();
      data1.append(
        "educationdetails",
        JSON.stringify({
          highestdegree:form.highestdegree,
          tenth: {
            yop: form.tenth.yop,
            cgpa_percentage: form.tenth.cgpa_percentage,
            percentage: form.tenth.percentage,
            cgpa: form.tenth.cgpa,
          },
          twelth: {
            yop: form.twelth.yop,
            cgpa_percentage: form.twelth.cgpa_percentage,
            percentage: form.twelth.percentage,
            cgpa: form.twelth.cgpa,
            ygtwelth: form.twelth.ygtwelth,
            ygyear: form.twelth.ygyear,
          },
          iti: {
            yop: form.iti.yop,
            cgpa_percentage: form.iti.cgpa_percentage,
            percentage: form.iti.percentage,
            cgpa: form.iti.cgpa,
            stream: form.iti.stream,
            otherstream: form.iti.otherstream,
            other_stream: form.iti.other_stream,
            university: form.iti.university,
            otheruniversity: form.iti.otheruniversity,
            other_university: form.iti.other_university,
            college: form.iti.college,
            othercollege: form.iti.othercollege,
            other_college: form.iti.other_college,
            ygiti: form.iti.ygiti,
            ygyear: form.iti.ygyear,
          },
          diploma: {
            yop: form.diploma.yop,
            cgpa_percentage: form.diploma.cgpa_percentage,
            percentage: form.diploma.percentage,
            cgpa: form.diploma.cgpa,
            stream: form.diploma.stream,
            otherstream: form.diploma.otherstream,
            other_stream: form.diploma.other_stream,
            university: form.diploma.university,
            otheruniversity: form.diploma.otheruniversity,
            other_university: form.diploma.other_university,
            college: form.diploma.college,
            othercollege: form.diploma.othercollege,
            other_college: form.diploma.other_college,
            ygdiploma: form.diploma.ygdiploma,
            ygyear: form.diploma.ygyear,
          },
          degree: {
            degree: form.degree.degree,
            otherdegree: form.degree.otherdegree,
            other_degree: form.degree.other_degree,
            yop: form.degree.yop,
            cgpa_percentage: form.degree.cgpa_percentage,
            percentage: form.degree.percentage,
            cgpa: form.degree.cgpa,
            stream: form.degree.stream,
            otherstream: form.degree.otherstream,
            other_stream: form.degree.other_stream,
            university: form.degree.university,
            otheruniversity: form.degree.otheruniversity,
            other_university: form.degree.other_university,
            college: form.degree.college,
            othercollege: form.degree.othercollege,
            other_college: form.degree.other_college,
            ygdeg: form.degree.ygdeg,
            ygyear: form.degree.ygyear,
          },
          master: {
            master: form.master.master,
            othermaster: form.master.othermaster,
            other_master: form.master.other_master,
            yop: form.master.yop,
            cgpa_percentage: form.master.cgpa_percentage,
            percentage: form.master.percentage,
            cgpa: form.master.cgpa,
            stream: form.master.stream,
            otherstream: form.master.otherstream,
            other_stream: form.master.other_stream,
            university: form.master.university,
            otheruniversity: form.master.otheruniversity,
            other_university: form.master.other_university,
            college: form.master.college,
            othercollege: form.master.othercollege,
            other_college: form.master.other_college,
            ygmas: form.master.ygmas,
            ygyear: form.master.ygyear,
          },
        })
      );
      if(form.degree.degree&&form.degree.degree.id){
        form.degree.degree={
              "id":form.degree.degree.id,
              "name":form.degree.degree.name,
            }
      }
      if(form.diploma.stream&&form.diploma.stream.id){
        form.diploma.stream={
              "id":form.diploma.stream.id,
              "name":form.diploma.stream.name,
            }
      }
      if(form.iti.stream&&form.iti.stream.id){
        form.iti.stream={
              "id":form.iti.stream.id,
              "name":form.iti.stream.name,
            }
      }
      if(form.degree.stream&&form.degree.stream.id){
        form.degree.stream={
              "id":form.degree.stream.id,
              "name":form.degree.stream.name,
            }
      }
      if(form.master.stream&&form.master.stream.id){
        form.master.stream={
              "id":form.master.stream.id,
              "name":form.master.stream.name,
            }
      }
      if(form.master.master&&form.master.master.id){
        form.master.master={
              "id":form.master.master.id,
              "name":form.master.master.name,
            }
      }
      
      await user.educational({"educationdetails":{"highestdegree":form.highestdegree,
          "tenth": {
            "yop": form.tenth.yop,
            "cgpa_percentage": form.tenth.cgpa_percentage,
            "percentage": form.tenth.percentage,
            "cgpa": form.tenth.cgpa,
          },
          "twelth": {
            "yop": form.twelth.yop,
            "cgpa_percentage": form.twelth.cgpa_percentage,
            "percentage": form.twelth.percentage,
            "cgpa": form.twelth.cgpa,
            "ygtwelth": form.twelth.ygtwelth,
            "ygyear": form.twelth.ygyear,
          },
          "iti": {
            "yop": form.iti.yop,
            "cgpa_percentage": form.iti.cgpa_percentage,
            "percentage": form.iti.percentage,
            "cgpa": form.iti.cgpa,
            "stream": form.iti.stream,
            "otherstream": form.iti.otherstream,
            "other_stream": form.iti.other_stream,
            "university": form.iti.university,
            "otheruniversity": form.iti.otheruniversity,
            "other_university": form.iti.other_university,
            "college": form.iti.college,
            "othercollege": form.iti.othercollege,
            "other_college": form.iti.other_college,
            "ygiti": form.iti.ygiti,
            "ygyear": form.iti.ygyear,
          },
          "diploma": {
            "yop": form.diploma.yop,
            "cgpa_percentage": form.diploma.cgpa_percentage,
            "percentage": form.diploma.percentage,
            "cgpa": form.diploma.cgpa,
            "stream": form.diploma.stream,
            "otherstream": form.diploma.otherstream,
            "other_stream": form.diploma.other_stream,
            "university": form.diploma.university,
            "otheruniversity": form.diploma.otheruniversity,
            "other_university": form.diploma.other_university,
            "college": form.diploma.college,
            "othercollege": form.diploma.othercollege,
            "other_college": form.diploma.other_college,
            "ygdiploma": form.diploma.ygdiploma,
            "ygyear": form.diploma.ygyear,
          },
          "degree": {
            "degree": form.degree.degree,
            "otherdegree": form.degree.otherdegree,
            "other_degree": form.degree.other_degree,
            "yop": form.degree.yop,
            "cgpa_percentage": form.degree.cgpa_percentage,
            "percentage": form.degree.percentage,
            "cgpa": form.degree.cgpa,
            "stream": form.degree.stream,
            "otherstream": form.degree.otherstream,
            "other_stream": form.degree.other_stream,
            "university": form.degree.university,
            "otheruniversity": form.degree.otheruniversity,
            "other_university": form.degree.other_university,
            "college": form.degree.college,
            "othercollege": form.degree.othercollege,
            "other_college": form.degree.other_college,
            "ygdeg": form.degree.ygdeg,
            "ygyear": form.degree.ygyear,
          },
          "master": {
            "master": form.master.master,
            "othermaster": form.master.othermaster,
            "other_master": form.master.other_master,
            "yop": form.master.yop,
            "cgpa_percentage": form.master.cgpa_percentage,
            "percentage": form.master.percentage,
            "cgpa": form.master.cgpa,
            "stream": form.master.stream,
            "otherstream": form.master.otherstream,
            "other_stream": form.master.other_stream,
            "university": form.master.university,
            "otheruniversity": form.master.otheruniversity,
            "other_university": form.master.other_university,
            "college": form.master.college,
            "othercollege": form.master.othercollege,
            "other_college": form.master.other_college,
            "ygmas": form.master.ygmas,
            "ygyear": form.master.ygyear,
          }}});
          // pageLoading.value = false
      if (user.educational_message.status === 200) {
        if (
          user.personal_data &&
          user.personal_data.fresherexp &&
          user.personal_data.fresherexp.Name === "experienced"
        ) {
          theme.pushMessage(
            "You have successfully added Educational Information"
          );
          show_experience.value=true
        } else {
          theme.pushMessage(
            "You have successfully added Educational Information"
          );
          show_other.value=true
        }
      } else {
        theme.pushMessage(user.error_educational_data);
        user.error_educational_data = "";
        pageLoading.value = false
      }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
      pageLoading.value = false
    }

    
    } catch (err) {
      theme.pushMessage("Something went wrong");
      pageLoading.value = false
    }
  }

  }
 
 
};
const passShowHideClicked = ref(true);
const online = computed(() =>  user.isonline);

onBeforeMount(async () => {
  await user.checkonlines();
  pageLoading.value = true
  window.scrollTo(0, 0);
  await user.checkUser();
  if (user.$state.loggedIn === false) {
    router.push("/login");
  }
  if(online.value===true){
    await user.getstudent();
    await user.getcollege();
    await user.getHighestDegree();
    await user.getmastertype();
    await user.getdegreetype()
    await user.getstudentuniversity();
  // if (user.educational_data&&user.educational_data.tenth && user.educational_data.tenth.yop) {
  //   form.tenth = user.educational_data.tenth;
  //   if (user.educational_data.iti && user.educational_data.iti.yop) {
  //     form1.value = 3;
  //     form.iti = user.educational_data.iti;
  //   }
  //   if (user.educational_data.diploma && user.educational_data.diploma.yop) {
  //     form1.value = 1;
  //     form.diploma = user.educational_data.diploma;
  //   }
  //   if (user.educational_data.twelth && user.educational_data.twelth.yop) {
  //     form1.value = 2;
  //     form.twelth = user.educational_data.twelth;
  //   }
  //   if (user.educational_data.degree && user.educational_data.degree.yop) {
  //     form.degree = user.educational_data.degree;
  //   }
  //   if (user.educational_data.master && user.educational_data.master.yop) {
  //     form.master = user.educational_data.master;
  //   }
  // }
  }
    else{
    theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
  }
  pageLoading.value = false
});

const itistreams = ref([ 
          {
            "id": 73,
            "name": "Automobile Engineering",
            "short_name": ""
        },
        {
            "id": 430,
            "name": "Bleaching And Dyeing Calico Print",
            "short_name": ""
        },
        {
            "id": 448,
            "name": "Book Binder",
            "short_name": ""
        },
        {
            "id": 449,
            "name": "Carpenter Engineering",
            "short_name": ""
        },
        {
            "id": 433,
            "name": "Commercial Art",
            "short_name": ""
        },
        {
            "id": 444,
            "name": "Cutting And Sewing",
            "short_name": ""
        },
        {
            "id": 415,
            "name": "Diesel Mechanic Engineering",
            "short_name": ""
        },
        {
            "id": 416,
            "name": "Draughtsman Civil Engineering",
            "short_name": ""
        },
        {
            "id": 414,
            "name": "Draughtsman Mechanical Engineering",
            "short_name": ""
        },
        {
            "id": 421,
            "name": "Dress Making",
            "short_name": ""
        },
        {
            "id": 431,
            "name": "Electrician Engineering",
            "short_name": ""
        },
        {
            "id": 450,
            "name": "Embroidery And Needle Worker",
            "short_name": ""
        },
        {
            "id": 418,
            "name": "Fitter Engineering",
            "short_name": ""
        },
        {
            "id": 440,
            "name": "Foundry Man Engineering",
            "short_name": ""
        },
        {
            "id": 428,
            "name": "Fruit And Vegetable Processing",
            "short_name": ""
        },
        {
            "id": 426,
            "name": "Hair And Skin Care",
            "short_name": ""
        },
        {
            "id": 436,
            "name": "Hand Compositor",
            "short_name": ""
        },
        {
            "id": 423,
            "name": "Information Technology And Esm Engineering",
            "short_name": ""
        },
        {
            "id": 434,
            "name": "Leather Goods Maker",
            "short_name": ""
        },
        {
            "id": 432,
            "name": "Letter Press Machine Mender",
            "short_name": ""
        },
        {
            "id": 425,
            "name": "Machinist Engineering",
            "short_name": ""
        }])

const fetchstream = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      if(query){
      await user.getstream(query.replace("'","''"),'iti',"");
      itistreams.value=[]
      user.degree_stream.filter((degree) => {
            itistreams.value.push({id:degree.id,conactname:degree.name+"-"+degree.short_name,name:degree.name,short_name:degree.short_name})
        })
    }
    else{
    itistreams.value=[ 
          {
            "id": 73,
            "name": "Automobile Engineering",
            "short_name": ""
        },
        {
            "id": 430,
            "name": "Bleaching And Dyeing Calico Print",
            "short_name": ""
        },
        {
            "id": 448,
            "name": "Book Binder",
            "short_name": ""
        },
        {
            "id": 449,
            "name": "Carpenter Engineering",
            "short_name": ""
        },
        {
            "id": 433,
            "name": "Commercial Art",
            "short_name": ""
        },
        {
            "id": 444,
            "name": "Cutting And Sewing",
            "short_name": ""
        },
        {
            "id": 415,
            "name": "Diesel Mechanic Engineering",
            "short_name": ""
        },
        {
            "id": 416,
            "name": "Draughtsman Civil Engineering",
            "short_name": ""
        },
        {
            "id": 414,
            "name": "Draughtsman Mechanical Engineering",
            "short_name": ""
        },
        {
            "id": 421,
            "name": "Dress Making",
            "short_name": ""
        },
        {
            "id": 431,
            "name": "Electrician Engineering",
            "short_name": ""
        },
        {
            "id": 450,
            "name": "Embroidery And Needle Worker",
            "short_name": ""
        },
        {
            "id": 418,
            "name": "Fitter Engineering",
            "short_name": ""
        },
        {
            "id": 440,
            "name": "Foundry Man Engineering",
            "short_name": ""
        },
        {
            "id": 428,
            "name": "Fruit And Vegetable Processing",
            "short_name": ""
        },
        {
            "id": 426,
            "name": "Hair And Skin Care",
            "short_name": ""
        },
        {
            "id": 436,
            "name": "Hand Compositor",
            "short_name": ""
        },
        {
            "id": 423,
            "name": "Information Technology And Esm Engineering",
            "short_name": ""
        },
        {
            "id": 434,
            "name": "Leather Goods Maker",
            "short_name": ""
        },
        {
            "id": 432,
            "name": "Letter Press Machine Mender",
            "short_name": ""
        },
        {
            "id": 425,
            "name": "Machinist Engineering",
            "short_name": ""
        }]
  }

    // if(form.degree.degree&&form.degree.degree.name){
    //   await user.getstream(query.replace("'","''"),'iti',form.degree.degree.name);
    //   itistreams.value=[]
    //   user.degree_stream.filter((degree) => {
    //         itistreams.value.push({id:degree.id,conactname:degree.name+"-"+degree.short_name,name:degree.name,short_name:degree.short_name})
    //     })

    // }
    // else{
     

    // }
   
  }
  else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
  
};


const iticollege = ref([])
  

const fetchcollege = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      if(query){
    if(form.iti.university&&form.iti.university.name){
      iticollege.value = await user.getuniversitycollege(query.replace("'","''"),form.iti.university.id,'iti');
      iticollege.value=[]
      user.university_college.filter((clg) =>{
        iticollege.value.push({id:clg.id,concatname:clg.name+"-"+clg.short_name,name:clg.name,shortname:clg.short_name})
  })
  return iticollege
    }
    else{
      iticollege.value = await user.getcollege(query.replace("'","''"),'iti');
      iticollege.value=[]
      user.college.filter((clg) =>{
        iticollege.value.push({id:clg.id,concatname:clg.name+"-"+clg.short_name,name:clg.name,shortname:clg.short_name})
  })
  return iticollege
    }   
  }
  else{
    iticollege.value=iticollege.value
  }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }

};

const fetchiticollege = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      // if(query){
    if(form.iti.university&&form.iti.university.name){
      iticollege.value = await user.getuniversitycollege("",form.iti.university.id,'iti');
      iticollege.value=[]
      user.university_college.filter((clg) =>{
        iticollege.value.push({id:clg.id,concatname:clg.name+"-"+clg.short_name,name:clg.name,shortname:clg.short_name})
  })
  return iticollege
    }
    else{
      iticollege.value = await user.getcollege("",'iti');
      iticollege.value=[]
      user.college.filter((clg) =>{
        iticollege.value.push({id:clg.id,concatname:clg.name+"-"+clg.short_name,name:clg.name,shortname:clg.short_name})
  })
  return iticollege
    }   
  // }
  // else{
  //   iticollege.value=iticollege.value
  // }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }

};
const diplomacollege = ref([])

// const diplomacollege = ref([ 
//          {
//             "id": 5,
//             "name": "acharya prafulla chandra ray polytechnic",
//             "short_name": "APCRP"
//         },
//         {
//             "id": 17,
//             "name": "abhinav college of engineering & polytechnology & management",
//             "short_name": "ACE&P&M"
//         },
//         {
//             "id": 373,
//             "name": "agnel polytechnic",
//             "short_name": "AP"
//         },
//         {
//             "id": 374,
//             "name": "agnel polytechnic",
//             "short_name": "AP"
//         },
//         {
//             "id": 386,
//             "name": "aissms college of polytechnic",
//             "short_name": "AISSMSCP"
//         },
//         {
//             "id": 605,
//             "name": "anjuman -i-islam's m.h.saboo siddik polytechnic",
//             "short_name": "MHSSP"
//         },
//         {
//             "id": 648,
//             "name": "ankush shikshan sanstha's g.h. raisoni polytechnic",
//             "short_name": "ASSGHRP"
//         },
//         {
//             "id": 712,
//             "name": "apex institute of pharmacy",
//             "short_name": "AIP"
//         },
//         {
//             "id": 729,
//             "name": "apollo college of pharmacy",
//             "short_name": "ACP"
//         },
//         {
//             "id": 730,
//             "name": "apollo college of pharmacy",
//             "short_name": "ACP"
//         },
//         {
//             "id": 781,
//             "name": "arpit institute of engineering & technology",
//             "short_name": "AIET"
//         },
//         {
//             "id": 814,
//             "name": "arya college of pharmacy",
//             "short_name": "ACP"
//         }])

const fetchdiplomacollege = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      if(query){
    if(form.diploma.university&&form.diploma.university.name){
      diplomacollege.value = await user.getuniversitycollege(query.replace("'","''"),form.diploma.university.id,'diploma');
      diplomacollege.value=[]
      user.university_college.filter((clg) =>{
        diplomacollege.value.push({id:clg.id,concatname:clg.name+"-"+clg.short_name,name:clg.name,shortname:clg.short_name})
  })
  return diplomacollege
    }
    else{
      diplomacollege.value = await user.getcollege(query.replace("'","''"),'diploma');
      diplomacollege.value=[]
      user.college.filter((clg) =>{
        diplomacollege.value.push({id:clg.id,concatname:clg.name+"-"+clg.short_name,name:clg.name,shortname:clg.short_name})
  })
  return diplomacollege
    }   
  }
  else{
    diplomacollege.value=diplomacollege.value
  }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
  
};

const fetchdipcolleges = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      // if(query){
    if(form.diploma.university&&form.diploma.university.name){
      diplomacollege.value = await user.getuniversitycollege("",form.diploma.university.id,'diploma');
      diplomacollege.value=[]
      user.university_college.filter((clg) =>{
        diplomacollege.value.push({id:clg.id,concatname:clg.name+"-"+clg.short_name,name:clg.name,shortname:clg.short_name})
  })
  return diplomacollege
    }
    else{
      diplomacollege.value = await user.getcollege("",'diploma');
      diplomacollege.value=[]
      user.college.filter((clg) =>{
        diplomacollege.value.push({id:clg.id,concatname:clg.name+"-"+clg.short_name,name:clg.name,shortname:clg.short_name})
  })
  return diplomacollege
    }   
  // }
  // else{
  //   diplomacollege.value=diplomacollege.value
  // }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
  
};






const degreecollege = ref([])
const fetchdegreecollege = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      if(query){
    if(form.degree.university&&form.degree.university.name){
      degreecollege.value = await user.getuniversitycollege(query.replace("'","''"),form.degree.university.id,'degree');
      degreecollege.value=[]
      user.university_college.filter((clg) =>{
        degreecollege.value.push({id:clg.id,concatname:clg.name+"-"+clg.short_name,name:clg.name,shortname:clg.short_name})
  })
  return degreecollege
    }
    else{
      degreecollege.value = await user.getcollege(query.replace("'","''"),'degree');
      degreecollege.value=[]
      user.college.filter((clg) =>{
        degreecollege.value.push({id:clg.id,concatname:clg.name+"-"+clg.short_name,name:clg.name,shortname:clg.short_name})
  })
 return degreecollege
    }   
  }
  else{
    degreecollege.value=degreecollege.value
  }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }

 
};

const selectdegreecolleges = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      // if(query){
    if(form.degree.university&&form.degree.university.name){
      degreecollege.value = await user.getuniversitycollege("",form.degree.university.id,'degree');
      degreecollege.value=[]
      user.university_college.filter((clg) =>{
        degreecollege.value.push({id:clg.id,concatname:clg.name+"-"+clg.short_name,name:clg.name,shortname:clg.short_name})
  })
  return degreecollege
    }
    else{
      degreecollege.value = await user.getcollege("",'degree');
      degreecollege.value=[]
      user.college.filter((clg) =>{
        degreecollege.value.push({id:clg.id,concatname:clg.name+"-"+clg.short_name,name:clg.name,shortname:clg.short_name})
  })
 return degreecollege
    }   
  // }
  // else{
  //   degreecollege.value=degreecollege.value
  // }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }

 
};


const mastercollege = ref([])
const fetchmastercollege = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      if(query){
    if(form.master.university&&form.master.university.name){
      mastercollege.value = await user.getuniversitycollege(query.replace("'","''"),form.master.university.id,'masters');
      mastercollege.value=[]
      user.university_college.filter((clg) =>{
        mastercollege.value.push({id:clg.id,concatname:clg.name+"-"+clg.short_name,name:clg.name,shortname:clg.short_name})
  })
  return mastercollege
    }
    else{
      mastercollege.value = await user.getcollege(query.replace("'","''"),'masters');
      mastercollege.value=[]
      user.college.filter((clg) =>{
        mastercollege.value.push({id:clg.id,concatname:clg.name+"-"+clg.short_name,name:clg.name,shortname:clg.short_name})
  })
  return mastercollege
    }   
  }
  else{
    mastercollege.value=mastercollege.value
  }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }

};

const selectmasterscollege = async () => {
  await user.checkonlines();
    if(online.value===true){
      // if(query){
    if(form.master.university&&form.master.university.name){
      mastercollege.value = await user.getuniversitycollege("",form.master.university.id,'masters');
      mastercollege.value=[]
      user.university_college.filter((clg) =>{
        mastercollege.value.push({id:clg.id,concatname:clg.name+"-"+clg.short_name,name:clg.name,shortname:clg.short_name})
  })
  return mastercollege
    }
    else{
      mastercollege.value = await user.getcollege("",'masters');
      mastercollege.value=[]
      user.college.filter((clg) =>{
        mastercollege.value.push({id:clg.id,concatname:clg.name+"-"+clg.short_name,name:clg.name,shortname:clg.short_name})
  })
  return mastercollege
    }   
  // }
  // else{
  //   mastercollege.value=mastercollege.value
  // }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }

};

const diplomastreams = ref([ 
          {
            "id": 396,
            "name": "Agriculture",
            "short_name": ""
        },
        {
            "id": 397,
            "name": "Automobile Engineering",
            "short_name": "AUT"
        },
        {
            "id": 398,
            "name": "Career Counseling Psychology",
            "short_name": ""
        },
        {
            "id": 393,
            "name": "Chemical Engineering",
            "short_name": "CHE"
        },
        {
            "id": 391,
            "name": "Civil Engineering",
            "short_name": "CIV"
        },
        {
            "id": 399,
            "name": "Commercial Practice",
            "short_name": ""
        },
        {
            "id": 387,
            "name": "Computer Science",
            "short_name": "CS"
        },
        {
            "id": 400,
            "name": "Doctor Of Nursing Practice",
            "short_name": ""
        },
        {
            "id": 401,
            "name": "Dress Designing And Garment Manufacturing",
            "short_name": ""
        },
        {
            "id": 402,
            "name": "Education",
            "short_name": ""
        },
        {
            "id": 395,
            "name": "Electrical",
            "short_name": ""
        },
        {
            "id": 388,
            "name": "Electrical And Electronics Engineering",
            "short_name": "EEE"
        },
        {
            "id": 404,
            "name": "Electrical Engineering",
            "short_name": ""
        },
        {
            "id": 389,
            "name": "Electronics And Communication Engineering",
            "short_name": "ECE"
        },
        {
            "id": 405,
            "name": "Electronics And Telecommunications Engineering",
            "short_name": "ETE"
        },
        {
            "id": 406,
            "name": "Engineering",
            "short_name": ""
        },
        {
            "id": 535,
            "name": "Industrial Electronics",
            "short_name": ""
        },
        {
            "id": 407,
            "name": "Information Technology",
            "short_name": ""
        },
        {
            "id": 392,
            "name": "Instrumentation",
            "short_name": ""
        },
        {
            "id": 403,
            "name": "Instrumentation Technology",
            "short_name": ""
        },
        {
            "id": 394,
            "name": "It/Is",
            "short_name": ""
        }])

const fetchdipstream = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      if(query){
    await user.getstream(query.replace("'","''"),'diploma',"");
    diplomastreams.value=[]
    user.degree_stream.filter((degree) => {
           diplomastreams.value.push({id:degree.id,conactname:degree.name+"-"+degree.short_name,name:degree.name,short_name:degree.short_name})
      })
  }
  else{
    diplomastreams.value=[ 
          {
            "id": 396,
            "name": "Agriculture",
            "short_name": ""
        },
        {
            "id": 397,
            "name": "Automobile Engineering",
            "short_name": "AUT"
        },
        {
            "id": 398,
            "name": "Career Counseling Psychology",
            "short_name": ""
        },
        {
            "id": 393,
            "name": "Chemical Engineering",
            "short_name": "CHE"
        },
        {
            "id": 391,
            "name": "Civil Engineering",
            "short_name": "CIV"
        },
        {
            "id": 399,
            "name": "Commercial Practice",
            "short_name": ""
        },
        {
            "id": 387,
            "name": "Computer Science",
            "short_name": "CS"
        },
        {
            "id": 400,
            "name": "Doctor Of Nursing Practice",
            "short_name": ""
        },
        {
            "id": 401,
            "name": "Dress Designing And Garment Manufacturing",
            "short_name": ""
        },
        {
            "id": 402,
            "name": "Education",
            "short_name": ""
        },
        {
            "id": 395,
            "name": "Electrical",
            "short_name": ""
        },
        {
            "id": 388,
            "name": "Electrical And Electronics Engineering",
            "short_name": "EEE"
        },
        {
            "id": 404,
            "name": "Electrical Engineering",
            "short_name": ""
        },
        {
            "id": 389,
            "name": "Electronics And Communication Engineering",
            "short_name": "ECE"
        },
        {
            "id": 405,
            "name": "Electronics And Telecommunications Engineering",
            "short_name": "ETE"
        },
        {
            "id": 406,
            "name": "Engineering",
            "short_name": ""
        },
        {
            "id": 535,
            "name": "Industrial Electronics",
            "short_name": ""
        },
        {
            "id": 407,
            "name": "Information Technology",
            "short_name": ""
        },
        {
            "id": 392,
            "name": "Instrumentation",
            "short_name": ""
        },
        {
            "id": 403,
            "name": "Instrumentation Technology",
            "short_name": ""
        },
        {
            "id": 394,
            "name": "It/Is",
            "short_name": ""
        }]
  }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
 
};

const university_values = ref([ 
    {
        "id": 1195,
        "name": "Bengaluru City University  (Bangalore City University)",
        "shortname": ""
    },
    {
        "id": 1157,
        "name": "Visvesvaraya Technological University",
        "shortname": ""
    },
    {
        "id": 1194,
        "name": "West Bengal State Council Of Technical Education",
        "shortname": ""
    },
    {
        "id": 1206,
        "name": "Kalyani University",
        "shortname": ""
    },
    {
        "id": 1182,
        "name": "Yogi Vemana University",
        "shortname": ""
    },
    {
        "id": 872,
        "name": "Rajiv Gandhi Proudyogiki Vishwavidyalaya",
        "shortname": ""
    },
    {
        "id": 556,
        "name": "Karnataka State Akkamahadevi Womens University  (Karnataka State Women University)",
        "shortname": ""
    },
    {
        "id": 1207,
        "name": "Prist University",
        "shortname": ""
    },
    {
        "id": 1183,
        "name": "State Board Of Technical Education And Training",
        "shortname": ""
    },
    {
        "id": 72,
        "name": "Aryabhatta Knowledge University",
        "shortname": ""
    },
    {
        "id": 993,
        "name": "Siksha 'O' Anusandhan University",
        "shortname": ""
    },
    {
        "id": 1184,
        "name": "Maharashtra State Board Of Technical Education",
        "shortname": ""
    },
    {
        "id": 1196,
        "name": "Awadhesh Pratap Singh University (Aps University)",
        "shortname": ""
    },
    {
        "id": 153,
        "name": "University Of Calcutta",
        "shortname": ""
    },
    {
        "id": 1185,
        "name": "Chaudhary Devi Lal University",
        "shortname": ""
    },
    {
        "id": 99,
        "name": "Dr. Bhimrao Ambedkar University",
        "shortname": ""
    },
    {
        "id": 110,
        "name": "Bengaluru Central University (Bangalore Central University)",
        "shortname": ""
    },
    {
        "id": 1186,
        "name": "Mahamaya Technical University",
        "shortname": ""
    },
    {
        "id": 1197,
        "name": "Test University",
        "shortname": ""
    },
    {
        "id": 1180,
        "name": "Ybn University",
        "shortname": ""
    },
    {
        "id": 7,
        "name": "Acharya Nagarjuna University",
        "shortname": ""
    },
    {
        "id": 506,
        "name": "Jannayak Chandrashekhar University",
        "shortname": ""
    },
    {
        "id": 227,
        "name": "Deen Dayal Upadhyaya Gorakhpur University",
        "shortname": ""
    },
    {
        "id": 1187,
        "name": "All India Council For Technical Education",
        "shortname": ""
    },
    {
        "id": 1198,
        "name": "Dr Bhimrao Ambedkar University (Agra University)",
        "shortname": ""
    },
    {
        "id": 1199,
        "name": "Himachal Pradesh Takniki Shiksha Board",
        "shortname": ""
    }])

const fetchuniversityvalues = async (query) => {
  await user.checkonlines();
    if(online.value===true){
    if(query){
      await user.getstudentuniversity(query.replace("'","''"));
      university_values.value=[]
      user.universities.filter((degree) => {
        university_values.value.push({id:degree.id,conactname:degree.name+"-"+degree.shortname,name:degree.name,short_name:degree.shortname})
      })
    // university_values.value = studentuniversity.value
  
  
  }
  else{
    university_values.value=[ 
     {
        "id": 1195,
        "name": "Bengaluru City University  (Bangalore City University)",
        "shortname": ""
    },
    {
        "id": 1157,
        "name": "Visvesvaraya Technological University",
        "shortname": ""
    },
    {
        "id": 1194,
        "name": "West Bengal State Council Of Technical Education",
        "shortname": ""
    },
    {
        "id": 1206,
        "name": "Kalyani University",
        "shortname": ""
    },
    {
        "id": 1182,
        "name": "Yogi Vemana University",
        "shortname": ""
    },
    {
        "id": 872,
        "name": "Rajiv Gandhi Proudyogiki Vishwavidyalaya",
        "shortname": ""
    },
    {
        "id": 556,
        "name": "Karnataka State Akkamahadevi Womens University  (Karnataka State Women University)",
        "shortname": ""
    },
    {
        "id": 1207,
        "name": "Prist University",
        "shortname": ""
    },
    {
        "id": 1183,
        "name": "State Board Of Technical Education And Training",
        "shortname": ""
    },
    {
        "id": 72,
        "name": "Aryabhatta Knowledge University",
        "shortname": ""
    },
    {
        "id": 993,
        "name": "Siksha 'O' Anusandhan University",
        "shortname": ""
    },
    {
        "id": 1184,
        "name": "Maharashtra State Board Of Technical Education",
        "shortname": ""
    },
    {
        "id": 1196,
        "name": "Awadhesh Pratap Singh University (Aps University)",
        "shortname": ""
    },
    {
        "id": 153,
        "name": "University Of Calcutta",
        "shortname": ""
    },
    {
        "id": 1185,
        "name": "Chaudhary Devi Lal University",
        "shortname": ""
    },
    {
        "id": 99,
        "name": "Dr. Bhimrao Ambedkar University",
        "shortname": ""
    },
    {
        "id": 110,
        "name": "Bengaluru Central University (Bangalore Central University)",
        "shortname": ""
    },
    {
        "id": 1186,
        "name": "Mahamaya Technical University",
        "shortname": ""
    },
    {
        "id": 1197,
        "name": "Test University",
        "shortname": ""
    },
    {
        "id": 1180,
        "name": "Ybn University",
        "shortname": ""
    },
    {
        "id": 7,
        "name": "Acharya Nagarjuna University",
        "shortname": ""
    },
    {
        "id": 506,
        "name": "Jannayak Chandrashekhar University",
        "shortname": ""
    },
    {
        "id": 227,
        "name": "Deen Dayal Upadhyaya Gorakhpur University",
        "shortname": ""
    },
    {
        "id": 1187,
        "name": "All India Council For Technical Education",
        "shortname": ""
    },
    {
        "id": 1198,
        "name": "Dr Bhimrao Ambedkar University (Agra University)",
        "shortname": ""
    },
    {
        "id": 1199,
        "name": "Himachal Pradesh Takniki Shiksha Board",
        "shortname": ""
    }]
  }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
 
};

function leftFillNum(num, targetLength) {
  // console.log("num.toString().padEnd(targetLength",num.toString())
  // const ss=  num.toString().substring(0,targetLength).padEnd(targetLength,' ')+'1';
  // console.log("fdgdg",typeof(ss))
  const ss=  num.toString().padEnd(targetLength,' ')
  const str = 'lt10'.substring(0,10).padEnd(10, ' ')+"test    test";
  // console.log(str);
  return ss
};

const degreestreams = ref([])

const fetchdegstream = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      if(query){
    if(form.degree.degree&&form.degree.degree.name){
    await user.getstream(query.replace("'","''"),'degree',form.degree.degree.name.toLowerCase());
    degreestreams.value=[]
    user.degree_stream.filter((degree) => {
           degreestreams.value.push({id:degree.id,conactname:degree.name+"-"+degree.short_name,name:degree.name,short_name:degree.short_name})
      })
    }
    else{
    await user.getstream(query.replace("'","''"),'degree',"");
    degreestreams.value=[]
    user.degree_stream.filter((degree) => {
           degreestreams.value.push({id:degree.id,conactname:degree.name+"-"+degree.short_name,name:degree.name,short_name:degree.short_name})
      })
    }
  }
  else{
    degreestreams.value=degreestreams.value
  }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }


};

const selectdegreestream = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      // if(query){
    if(form.degree.degree&&form.degree.degree.name){
    await user.getstream('','degree',form.degree.degree.name.toLowerCase());
    degreestreams.value=[]
    user.degree_stream.filter((degree) => {
           degreestreams.value.push({id:degree.id,conactname:degree.name+"-"+degree.short_name,name:degree.name,short_name:degree.short_name})
      })
    }
    else{
    await user.getstream('','degree',"");
    degreestreams.value=[]
    user.degree_stream.filter((degree) => {
           degreestreams.value.push({id:degree.id,conactname:degree.name+"-"+degree.short_name,name:degree.name,short_name:degree.short_name})
      })
    }
  // }
  // else{
  //   degreestreams.value=degreestreams.value
  // }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }


};

const masterstreams = ref([])

// const masterstreams = ref([])

const selectmasstream = async () => {
  await user.checkonlines();
    if(online.value===true){
      // if(query){
    if(form.master.master&&form.master.master.name){
    await user.getstream("",'masters',form.master.master.name.toLowerCase());
    masterstreams.value=[]
    user.degree_stream.filter((degree) => {
           masterstreams.value.push({id:degree.id,conactname:degree.name+"-"+degree.short_name,name:degree.name,short_name:degree.short_name})
      })
    }
    else{
    await user.getstream("",'masters',"");
    masterstreams.value=[]
    user.degree_stream.filter((degree) => {
           masterstreams.value.push({id:degree.id,conactname:degree.name+"-"+degree.short_name,name:degree.name,short_name:degree.short_name})
      })
    }
  // }
  // else{
  //   masterstreams.value=masterstreams.value
  // }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
 
}; 


const fetchmasstream = async (query) => {
  await user.checkonlines();
    if(online.value===true){
      if(query){
    if(form.master.master&&form.master.master.name){
    await user.getstream(query.replace("'","''"),'masters',form.master.master.name.toLowerCase());
    masterstreams.value=[]
    user.degree_stream.filter((degree) => {
           masterstreams.value.push({id:degree.id,conactname:degree.name+"-"+degree.short_name,name:degree.name,short_name:degree.short_name})
      })
    }
    else{
    await user.getstream(query.replace("'","''"),'masters',"");
    masterstreams.value=[]
    user.degree_stream.filter((degree) => {
           masterstreams.value.push({id:degree.id,conactname:degree.name+"-"+degree.short_name,name:degree.name,short_name:degree.short_name})
      })
    }
  }
  else{
    masterstreams.value=masterstreams.value
  }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
 
};

const mastercollegechange = async(data) => {

  form.master.college=null
  mastercollege.value=[]

}


const clearallfunction = async(data) => {
            form1.value = null
            form.tenth.yop=null,
            form.tenth.percentage= "",
            form.tenth.cgpa_percentage=null,
            form.tenth.cgpa="",
            form.twelth.yop=null,
            form.twelth.percentage= "",
            form.twelth.cgpa_percentage=null,
            form.twelth.cgpa="",
            form.twelth.ygtwelth=null,
            show_degreetype.value=false,
            show_mastertype.value=false,
            show_masterboard.value=false,
            show_degreeuni.value=false,
            show_diplomaboard.value=false,
            show_itiboard.value=false,
            form.twelth.ygyear=null,
            form.iti.yop=null,
            form.iti.percentage= "",
            form.iti.cgpa_percentage=null,
            form.iti.cgpa="",
            form.iti.ygiti=null,
            form.iti.ygyear=null,
            form.iti.stream=null,
            form.iti.otherstream=false,
            form.iti.other_stream="",
            form.iti.university=null,
            form.iti.otheruniversity=false,
            form.iti.other_university="",
            form.iti.college=null,
            form.iti.othercollege=false,
            form.iti.other_college="",
            form.diploma.yop=null,
            form.diploma.percentage= "",
            form.diploma.cgpa_percentage=null,
            form.diploma.cgpa="",
            form.diploma.ygdiploma=null,
            form.diploma.ygyear=null,
            form.diploma.stream=null,
            form.diploma.otherstream=false,
            form.diploma.other_stream="",
            form.diploma.university=null,
            form.diploma.otheruniversity=false,
            form.diploma.other_university="",
            form.diploma.college=null,
            form.diploma.othercollege=false,
            form.diploma.other_college="",
            form.degree.yop=null,
            form.degree.percentage= "",
            form.degree.cgpa_percentage=null,
            form.degree.cgpa="",
            form.degree.ygdeg=null,
            form.degree.ygyear=null,
            form.degree.degree=null,
            form.degree.otherdegree=false,
            form.degree.other_degree="",
            form.degree.stream=null,
            form.degree.otherstream=false,
            form.degree.other_stream="",
            form.degree.university=null,
            form.degree.otheruniversity=false,
            form.degree.other_university="",
            form.degree.college=null,
            form.degree.othercollege=false,
            form.degree.other_college="",
            form.master.yop=null,
            form.master.percentage= "",
            form.master.cgpa_percentage=null,
            form.master.cgpa="",
            form.master.ygmas=null,
            form.master.ygyear=null,
            form.master.master=null,
            form.master.othermaster=false,
            form.master.other_master="",
            form.master.stream=null,
            form.master.otherstream=false,
            form.master.other_stream="",
            form.master.university=null,
            form.master.otheruniversity=false,
            form.master.other_university="",
            form.master.college=null,
            form.master.othercollege=false,
            form.master.other_college=""


}


const clearfunctions = async(data) => {
            form.twelth.yop=null,
            form.twelth.percentage= "",
            form.twelth.cgpa_percentage=null,
            form.twelth.cgpa="",
            form.twelth.ygtwelth=null,
            form.twelth.ygyear=null,
            form.iti.yop=null,
            form.iti.percentage= "",
            form.iti.cgpa_percentage=null,
            form.iti.cgpa="",
            form.iti.ygiti=null,
            form.iti.ygyear=null,
            form.iti.stream=null,
            form.iti.otherstream=false,
            form.iti.other_stream="",
            form.iti.university=null,
            form.iti.otheruniversity=false,
            form.iti.other_university="",
            form.iti.college=null,
            form.iti.othercollege=false,
            form.iti.other_college="",
            form.diploma.yop=null,
            form.diploma.percentage= "",
            form.diploma.cgpa_percentage=null,
            form.diploma.cgpa="",
            form.diploma.ygdiploma=null,
            form.diploma.ygyear=null,
            form.diploma.stream=null,
            form.diploma.otherstream=false,
            form.diploma.other_stream="",
            form.diploma.university=null,
            form.diploma.otheruniversity=false,
            form.diploma.other_university="",
            form.diploma.college=null,
            form.diploma.othercollege=false,
            form.diploma.other_college=""
    
  


}

const degreecollegechange = async(data) => {

  form.degree.college=null
  degreecollege.value=[]

}

const changedegree = async() =>{
  form.degree.stream=null
  degreestreams.value=[]
}

const changemasters = async() =>{
  // console.log("inisde changesmasters")
  form.master.stream=null
  masterstreams.value=[]
}

const selectfunction = async() =>{
  await user.checkonlines();
    if(online.value===true){
      if(form.master.master&&form.master.master.name){
    await user.getstream("",'masters',form.master.master.name);
    masterstreams.value=[]
    user.degree_stream.filter((degree) => {
           masterstreams.value.push({id:degree.id,conactname:degree.name+"-"+degree.short_name,name:degree.name,short_name:degree.short_name})
      })
    }
    }
    else{
      theme.pushMessage('Trying to reconnect to server, this may take a few seconds, please wait or check your internet connection')
    }
 
}


const diplomacollegechange = async(data) => {

  form.diploma.college=null
  diplomacollege.value=[]

}

const iticollegechange = async(data) => {

  form.iti.college=null
  iticollege.value=[]

}




const mastertypevalues = computed(() => {
  return user.master_type
})

const studentuniversity = computed(() => {
  return user.universities
})
const something = ref("")
// const degOptions = computed(() => {
//   let values = []
//   user.degree_type.filter((degree) => {

//             something.value = leftFillNum(degree.shortname.toUpperCase(), 6)
//             console.log('something',something.value.length)
//             values.push({id:degree.id,conactname:something.value+"-"+degree.name,name:degree.name,displayname:something.value})

          
//       })
//   return values
// })


const degOptions = computed(() => {
  let values = []
  user.degree_type.filter((degree) => {
          values.push({id:degree.id,conactname:degree.shortname.toUpperCase()+"-"+degree.name,name:degree.name,displayname:degree.shortname})
      })
  return values
})

const masOptions = computed(() => {
  let values = []
  user.master_type.filter((degree) => {
          values.push({id:degree.id,conactname:degree.shortname.toUpperCase()+"-"+degree.name,name:degree.name,displayname:degree.shortname})
      })
  return values
})

let degreetypevalues = ref( []);
const fetchdegreetype = async (query,value) => {

  // if(query){
    if(query.length > 0){
      user.degree_type.filter((degree) => {
        if(degree.name.includes(query) || degree.shortname.includes(query)){
          degreetypevalues.value.push({id:degree.id,conactname:degree.name+"-"+degree.shortname,name:degree.name})
        }
      })
    }
    // degreetypevalues.value = await user.getdegreetype(query);
    // console.log("degreetypevalues",degreetypevalues.value)
  // }
  // else{
  //   degreetypevalues.value =  [
  //       {
  //           "id": 1,
  //           "name": "aircraft maintenance engieering",
  //           "shortname": "ame"
  //       },
  //       {
  //           "id": 2,
  //           "name": "bachelor of architecture",
  //           "shortname": "b arch"
  //       },
  //       {
  //           "id": 3,
  //           "name": "bachelor of arts",
  //           "shortname": "ba"
  //       },
  //       {
  //           "id": 4,
  //           "name": "bachelor of arts & law",
  //           "shortname": "ba llb"
  //       },
  //       {
  //           "id": 5,
  //           "name": "bachelor of ayurvedic medical sciencesa",
  //           "shortname": "bams"
  //       },
  //       {
  //           "id": 6,
  //           "name": "bachelor of busines administration",
  //           "shortname": "bba"
  //       },
  //       {
  //           "id": 7,
  //           "name": "bachelor of busines administration & law",
  //           "shortname": "bba llb"
  //       },
  //       {
  //           "id": 8,
  //           "name": "bachelor of business management",
  //           "shortname": "bbm"
  //       },
  //       {
  //           "id": 9,
  //           "name": "bachelor of business studies",
  //           "shortname": "bbs"
  //       },
  //       {
  //           "id": 10,
  //           "name": "bachelor of commerce",
  //           "shortname": "b com"
  //       },
  //       {
  //           "id": 11,
  //           "name": "bachelor of commerce & law",
  //           "shortname": "b com llb"
  //       },
  //       {
  //           "id": 12,
  //           "name": "bachelor of communication & journalism",
  //           "shortname": "bcj"
  //       },
  //       {
  //           "id": 13,
  //           "name": "bachelor of computer application",
  //           "shortname": "bca"
  //       },
  //       {
  //           "id": 14,
  //           "name": "bachelor of dental surgerya",
  //           "shortname": "bds"
  //       },
  //       {
  //           "id": 15,
  //           "name": "bachelor of designs",
  //           "shortname": "b desgn"
  //       },
  //       {
  //           "id": 16,
  //           "name": "bachelor of education",
  //           "shortname": "b ed"
  //       },
  //       {
  //           "id": 17,
  //           "name": "bachelor of engineering",
  //           "shortname": "be"
  //       },
  //       {
  //           "id": 18,
  //           "name": "bachelor of fashion technology",
  //           "shortname": "bft"
  //       },
  //       {
  //           "id": 19,
  //           "name": "bachelor of fine arts",
  //           "shortname": "bfa"
  //       },
  //       {
  //           "id": 20,
  //           "name": "bachelor of fisheries science",
  //           "shortname": "bfsc"
  //       },
  //       {
  //           "id": 21,
  //           "name": "bachelor of homeopathy medicine & surgerya",
  //           "shortname": "bhms"
  //       },
  //       {
  //           "id": 22,
  //           "name": "bachelor of hotel management",
  //           "shortname": "bhm"
  //       },
  //       {
  //           "id": 23,
  //           "name": "bachelor of lab technology",
  //           "shortname": "blt"
  //       },
  //       {
  //           "id": 24,
  //           "name": "bachelor of law",
  //           "shortname": "llb"
  //       },
  //       {
  //           "id": 25,
  //           "name": "bachelor of library sciencce",
  //           "shortname": "bls"
  //       },
  //       {
  //           "id": 26,
  //           "name": "bachelor of medicine and bachelor of surgery",
  //           "shortname": "mbbs"
  //       },
  //       {
  //           "id": 27,
  //           "name": "bachelor of naturopathy and yogic science",
  //           "shortname": "bnys"
  //       },
  //       {
  //           "id": 28,
  //           "name": "bachelor of nursing",
  //           "shortname": "bng"
  //       },
  //       {
  //           "id": 29,
  //           "name": "bachelor of performance arts",
  //           "shortname": "bpa"
  //       },
  //       {
  //           "id": 30,
  //           "name": "bachelor of pharmacy",
  //           "shortname": "b pharma"
  //       },
  //       {
  //           "id": 31,
  //           "name": "bachelor of physical education",
  //           "shortname": "b ped"
  //       },
  //       {
  //           "id": 33,
  //           "name": "bachelor of physioptherapy",
  //           "shortname": "bpt"
  //       },
  //       {
  //           "id": 32,
  //           "name": "bachelor of physio therapy",
  //           "shortname": "bpt"
  //       },
  //       {
  //           "id": 34,
  //           "name": "bachelor of planning",
  //           "shortname": "b plan"
  //       },
  //       {
  //           "id": 35,
  //           "name": "bachelor of science",
  //           "shortname": "b sc"
  //       },
  //       {
  //           "id": 36,
  //           "name": "bachelor of social work",
  //           "shortname": "bsw"
  //       },
  //       {
  //           "id": 37,
  //           "name": "bachelor of technology",
  //           "shortname": "b tech"
  //       },
  //       {
  //           "id": 39,
  //           "name": "bachelor of tourism administration",
  //           "shortname": "bta"
  //       },
  //       {
  //           "id": 38,
  //           "name": "bachelor of tourism & hospitality",
  //           "shortname": "bth"
  //       },
  //       {
  //           "id": 40,
  //           "name": "bachelor of travel & tourism management",
  //           "shortname": "bttm"
  //       },
  //       {
  //           "id": 41,
  //           "name": "bachelor of unani medicine & surgery",
  //           "shortname": "bums"
  //       },
  //       {
  //           "id": 42,
  //           "name": "bachelor of veterinary science",
  //           "shortname": "bvsc"
  //       },
  //       {
  //           "id": 43,
  //           "name": "bachelor of veterinary science & animal husband",
  //           "shortname": "bvsc & ah"
  //       },
  //       {
  //           "id": 44,
  //           "name": "bachelor of visual arts",
  //           "shortname": "bva"
  //       },
  //       {
  //           "id": 45,
  //           "name": "bachelor of vocation",
  //           "shortname": "bvoc"
  //       },
  //       {
  //           "id": 46,
  //           "name": "bachelor of vocational",
  //           "shortname": "b voc"
  //       },
  //       {
  //           "id": 47,
  //           "name": "bachelors in hospital administration",
  //           "shortname": "bha"
  //       },
  //       {
  //           "id": 48,
  //           "name": "bachelors in public health",
  //           "shortname": "bph"
  //       },
  //       {
  //           "id": 49,
  //           "name": "diplamo in education",
  //           "shortname": "d ed"
  //       },
  //       {
  //           "id": 50,
  //           "name": "diplamo in pharmacy",
  //           "shortname": "d pharma"
  //       }
  //   ]
  // }

};
</script>

<style >
.hello {
  width: 100%;
}
.modal-card-body {
  overflow-y: auto;
  -ms-overflow-style: none;
}
</style>

