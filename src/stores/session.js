import { defineStore, acceptHMRUpdate } from 'pinia'
// import { useStorage } from "vue3-storage";
import axios from 'axios';
import Cookies from 'js-cookie';
// import jwt_decode from "jwt-decode";
import isOnline from 'is-online';
import { jwtDecode } from "jwt-decode";
// const ls = useStorage();
// import { useRouter } from "vue-router";
// const router = useRouter();
export const sessionStore = defineStore('user', {
    state: () => ({
        user: null,
        new_pass:[],
        loggedIn: false,
        send_mail:[],
        error_send_mail:[],
        verify_otp:[],
        isonline:false,
        add_profile:false,
        studentcoursebool:false,
        personal_data:null,
        personal_message:"",
        image_data_error:"",
        empty_list:[],
        student_batchess:[],
        validation_status:null,
        image_message:"",
        educational_message:"",
        experience_message:"",
        other_message:"",
        refer_message:"",
        error_refer_data:"",
        upload_message:"",
        update_contact:"",
        update_contact_error:"",
        educational_data:null,
        isStudent: false,
        dayscrossed:false,
        filled:false,
        experience_data:null,
        contactarray:[],
        highestdegree:[],
        emailarray:[],
        student_batches:null,
        other_data:null,
        refer_data:[],
        university_college:[],
        course_batch:[],
        pay_courses:[],
        pay_coursess:[],
        branch_city:[],
        requirements_data:[],
        requirements_data_total:0,
        image:null,
        check_number:null,
        loginError: '',
        token:null,
        regcode_added:false,
        course_added:false,
        isStudent: false,
        edu_error: '',
        reg_code: "",
        reg_value:'',
        registration_error:'',
        state: [],
        statess:[],
        district: [],
        mode_of_class:[],
        highest_degree: [],
        current_user: [],
        student_image: null,
        fresher_exp:null,
        college: [],
        degree_stream: [],
        master_stream: [],
        diploma_stream: [],
        fresher_exper: [],
        degree_type: [],
        master_type: [],
        experience_data: [],
        domain: [],
        district1:[],
        company: [],
        skills: [],
        specialization: [],
        industry: [],
        experience_data1: [],
        location: [],
        other_data: [],
        profile: [],
        branch: [],
        course: [],
        student_course:null,
        repeater_data:null,
        student_payments:[],
        country:[],
        new_course: [],
        get_fresh_exp: [],
        newcourse_list: [],
        error_personal_data: "",
        error_educational_data: "",
        error_experience_data: "",
        error_other_data:"",
        error_upload_data:"",
        error_contact_data: "",
        error_email_data: null,
        error_new_course: null,
        link_reg_code: "",
        wrong_data: [],
        contact_data: "",
        email_data: [],
        number_value: [],
        error_regcode: "",
        error_checknumber: "",
        attendance_count: [],
        change_password: [],
        change_password_error: null,
        my_batches: [],
        ms_count: [],
        send: [],
        waitForConnection: [],
        scanned_data: [],
        universities:[],
        socket: "",
        newcourse_count: null,
        notification_data:[],
        update_course:"",
        update_course_error:"",
        pay_course_error:"",
        pay_course:"",
        gender:null,
        studentname:"",
        studentemail:"",
        studentcontact:"",
        studentimages:"",
        studentthumbnail:"",
        studentresume:"",
        locations:[],
        pincodes:[],
        pincodes1:[],
        validation:null,
        student_count_total:0

    }),
    actions: {

        async capitalize(arr){
            const a = arr.split(" ")
            // console.log("arr",a.length)
            for (var i = 0; i < a.length; i++) {
                // console.log("a[i][0]",a[i][0])
              a[i] = a[i][0].toUpperCase()+ a[i].slice(1)
            }
            const b = a.join(" ");
            return b
         },
        async registration(data) {
            try {
                const response = await axios.post(`https://gotest.qspiders.com/api/student/web-register`, data);
                if (response.status === 200) {
                    if(response.data.message){
                        this.reg_value = response.data.message
                    }
                    else if(response.data.error){
                        this.reg_value = response.data.error
                    }
                    return this.loggedIn
                }
            } 
            catch (err) {
                this.$patch({
                    registration_error: err.response.data.error
                })
            }
        },

        async login(data) {
            try {
                const response = await axios.post(`https://gotest.qspiders.com/api/student/web-login`, data, {
                    headers: {
                      "Content-Type": "application/json", // this shows the expected content type
                  }
                  });
                  if (response.status === 200) {
                    Cookies.set('user', response.data.token,{ expires: 180},{ domain: "devstudent.qspiders.com" })
                    Cookies.set('commonuser', response.data.token,{ domain: "qspiders.com" })
                    var decoded = jwtDecode(response.data.token);
                    this.isStudent=true
                    if(response.data) {
                        this.studentname= response.data.name
                        if(response.data.contact&&response.data.contact[0]) {
                            this.studentcontact=response.data.contact[0].code+""+response.data.contact[0].number
                        }
                        this.contactarray = response.data.contact
                        if(response.data.email&&response.data.email[0]) {
                            this.studentemail=response.data.email[0].email
                        }
                        this.student_course = response.data.studentcourse
                        this.student_batches = response.data.studentbatches
                        this.emailarray = response.data.email
                        this.personal_data=response.data.personaldetails,
                        this.educational_data=response.data.educationdetails,
                        this.experience_data=response.data.experiencedetails,
                        this.other_data=response.data.otherdetails,
                        this.refer_data=response.data.referfriend,
                        this.loggedIn=true,
                        this.course_added=response.data.regcode_added,
                        this.token=response.data.token,
                        this.user=decoded,
                        this.studentimages=response.data.image
                     }
                return this.loggedIn
                    }
            } catch (err) {
                this.$patch({
                    loginError: err.response.data.error
                })
            }

        },
   
        async logout() {
            const token = this.user.token
            const data = {}
            if (Cookies.get('user')) {
                Cookies.remove('user')
            }
        },

        async checkUser() {
            if (this.user === null) {
                if (Cookies.get('user')) {
                    const token = Cookies.get('user')

                    const decoded = jwtDecode(token);
                    if (decoded) {
                        this.$patch({
                            user: decoded,
                            token: token,
                            loggedIn: true,
                            loginError: '',
                            isStudent:true
                        })
        
                }
            }
        }
        },
        async getstudent() {
            const user = sessionStore();
            const token = this.token

            if (token) {
                try{
                    const headers = {
                        'Authorization': `${token}`
                    }
                    const response = await axios.get(`https://gotest.qspiders.com/api/student/student-data`, {
                        headers: headers
                    });

                    if (response.status === 200) {
 
                             if(response.data) {
                                this.studentname= response.data.name
                                if(response.data.contact&&response.data.contact[0]) {
                                    this.studentcontact=response.data.contact[0].code+""+response.data.contact[0].number
                                }
                                if(response.data.email&&response.data.email[0]) {
                                    this.studentemail=response.data.email[0].email
                                }
                                this.contactarray = response.data.contact
                                this.emailarray = response.data.email
                                this.personal_data=response.data.personaldetails,
                                this.educational_data=response.data.educationdetails,
                                this.experience_data=response.data.experiencedetails,
                                this.other_data=response.data.otherdetails
                                this.refer_data=response.data.referfriend,
                                this.studentimages=response.data.image
                                this.studentthumbnail=response.data.thumbnail
                                this.studentresume=response.data.resume
                                // this.student_course=response.data.studentcourse
                                // this.repeater_data=response.data.repeater
                                // this.student_batches=response.data.studentbatches
                                // this.student_payments=response.data.payments
                             }
 
                                // if(response.data.studentcourse===null){
                                //     this.$patch({
                                //         course_added:false,
                
                                //     })
                                // }
                                // else{
                                //     this.$patch({
                                //         course_added:true,
                
                                //     })
                                    
                                // }
        
                          
                        }
        
                }catch(err){
                    // console.log("inside catch error of get student")
                    // // if (Cookies.get('user')) {
                    //         Cookies.remove('user')
                    //     // }
                }
                
            }
        },

        async getGender(query) {
            const user = sessionStore();
            const token = this.token
            if (token) {
                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/genderid`, {
                    headers: headers
                });
                this.gender = response.data.items

                return this.gender
            }
        },
        async checkonlines(query) {

                const response = await isOnline()
                this.isonline = response
                return this.isonline
                // console.log("response in online",response)
                // this.gender = response.data.items
                // return this.gender
        
        },

        async getModeofclass(query) {
            const user = sessionStore();
            const token = this.token
            if (token) {

            
                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/get-modeofclass`, {
                    headers: headers
                });

            
                this.mode_of_class = response.data.items

                return this.mode_of_class
            }
        },


        async getcourses(branch,modeofclass,fresher_exp) {

        
            const user = sessionStore();
            const token = this.token
            if (token) {

            
                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/get-courses?id=${branch}&fresherexp=${fresher_exp}&mode_of_class=${modeofclass}`, {
                    headers: headers
                });

            
                this.pay_courses = response.data.courses
     
            

                return this.pay_courses
            }
        },
        async getcourses1(branch,modeofclass,fresher_exp) {

        
            const user = sessionStore();
            const token = this.token
            if (token) {

            
                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/get-courses?id=${branch}&fresherexp=${fresher_exp}&mode_of_class=${modeofclass}`, {
                    headers: headers
                });

            
                this.pay_coursess = response.data.courses

            

                return this.pay_coursess
            }
        },



        async getstudentss() {

            const token = this.token
                if(token){
                        const headers = {
                            'Authorization': `${token}`
                        }
                        const response = await axios.get(`https://gotest.qspiders.com/api/student/student-data`, {
                                headers: headers
                            });
                
                return this.loggedIn


                }
                

        },


        async regcode(data) {
            const token = this.token
            try {
                if (token) {

                    const response = await axios.post(`https://gotest.qspiders.com/student/add-regcode`, data, {
                        headers: {
                            'Authorization': `${token}`,
                            "Content-Type": "application/json",
                        }
                    });
                    if (response.status === 200) {
                            if(response.data.message){
                                this.reg_code = response.data.message
                            }
                            else if(response.data.error){
                                this.reg_code = response.data.error
                            }
                    }
                    return this.reg_code
                }
            } catch (error) {
                this.error_regcode = error.response.data.error
            }
        },


        async updatecourse(data) {
            const token = this.token

        

            try {
                if (token) {

                    const response = await axios.post(`https://gotest.qspiders.com/student/add-regcode`, data, {
                        headers: {
                            'Authorization': `${token}`,
                            "Content-Type": "application/json",
                        }
                    });
                    this.update_course = response
                    return this.update_course
                }
            } catch (error) {

                this.update_course_error = error.response.data.error
            }
        },


        async paycourse(data) {
            const token = this.token

        

            try {
                if (token) {

                    const response = await axios.post(`https://gotest.qspiders.com/api/student/pay-course`, data, {
                        headers: {
                            'Authorization': `${token}`,
                            "Content-Type": "application/json",
                        }
                    });
                    this.pay_course = response
                    return this.pay_course
                }
            } catch (error) {

                this.pay_course_error = error.response.data.error
            }
        },

        async getState(query="") {
            const token = this.token
            // console.log("query",query)

            if (token) {
                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/selectstate?name=${query}`, {
                    headers: headers
                });
                this.state = response.data.items
                // console.log("response.data.items",response.data.items)
      
            
                return this.state
                // console.log("response in getsttae",response)
                // this.permstate = response.data.items

            }
        },

        async getstudentcountry(query) {

        
            const token = this.token

    
                const headers = {
                    'Authorization': `${token}`
                }

            
                const response = await axios.get(`https://gotest.qspiders.com/api/student/get-countries`, {
                    headers: headers
                });
                this.country = response.data

                return this.country
            
        },
        async getstudentState(query) {
            const token = this.token


    
                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/students/get-states?id=${query}`, {
                    headers: headers
                });

            
                this.statess = response.data
                // console.log("this.statess",this.statess)
                return this.statess
                // return this.statess.filter(val => 
                //     val.name = this.capitalize(val.name)
                // )

            
        },
        async getDistrict(data,query,flag) {
            const token = this.token

        

            if (token) {
                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/selectdistrict?stateid=${data}&name=${query}`,{
                    headers: headers
                });
                
                
                if(flag===true){

                    
                    this.district = response.data.items
                    // console.log("this.district",this.district)
                    return this.district
                }
                else{
       
                    
                    this.district1 = response.data.items
                    return this.district1
                }
               

            }
        },
        async getHighestDegree(data) {
            const token = this.token
            if (token) {
                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/qualificationsid`, {
                    headers: headers
                });
                this.highestdegree = response.data.items

                return this.highestdegree

            }
        },


        async personal(data) {

            const token = this.token

            try {
                if (token) {
                    const headers = {
                        'Authorization': `${token}`,

                    }
      
                
                    const response = await axios.post('https://gotest.qspiders.com/api/student/add-personal', data, {
                        headers: headers
                    });
                    this.personal_message = response
     
                }
            } catch (error) {
                this.error_personal_data = error.response.data.error

            }

        },

        async studentimage(data) {

            const token = this.token

            try {
                if (token) {
                    const headers = {
                        'Authorization': `${token}`,
                        "Content-Type": "multipart/form-data",

                    }
                    const response = await axios.post('https://gotest.qspiders.com/api/student/upload-image', data, {
                        headers: headers
                    });
                    this.image_message = response
                 
                    
     
                }
            } catch (error) {
              
                
                this.image_data_error = error.response.data

            }

        },


        async getcollege(query, type) {
     
            
            const token = this.token
            if (token) {
                const headers = {
                    'Authorization': `${token}`,
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/selectcollege?name=${query}&qualification=${type}`, {
                    headers: headers
                });

                this.college = response.data.items

                return this.college

            }
        },

        async getvalidations() {
            // console.log("inisde get validstion")
            const token = this.token
            try{
            if (token) {
                // console.log("inside token")
                const headers = {
                    'Authorization': `${token}`,
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/check-form`, {
                    headers: headers
                });
                if(response.data.contact&&response.data.contact[0]) {
                    this.studentcontact=response.data.contact[0].code+""+response.data.contact[0].number
       
                    
                }
                if(response.data.email&&response.data.email[0]) {
                    this.studentemail=response.data.email[0].email
                }
                // console.log("response in validato",response)
                this.validation = response.data
                // console.log("this.validation",this.validation)
                this.studentcoursebool = response.data.studentcourse 
                this.validation_status = response.status
                return this.validation

            }
        }
        catch (error) {
        //    console.log("inside catch")
            
            if(error.response.status===401){
                this.validation_status  = error.response.status

        
                // if (Cookies.get('user')) {
                //     console.log("remove inside")
                //     Cookies.remove('user')
                //     console.log("remove inside")
                // }
            }

        }
        },

        async getstudentcoursebatch() {
            const token = this.token
     
            
            if (token) {
                const headers = {
                    'Authorization': `${token}`,
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/get-batches-courses`, {
                    headers: headers
                });
                this.student_course = response.data.studentcourse
                this.student_batches = response.data.studentbatches
                // this.dayscrossed = response.data.dayscrossed
                // this.filled = response.data.profilefilled
                // for (var i = 0; i < response.data.studentbatches.length; i++) {
                //     if(response.data.studentbatches[i].regular_attended>=7)
                //     {
                //             this.add_profile=true
                //     }
                // }     
        }
    },

    async getstudentcoursess() {
        const token = this.token
        if (token) {
            const headers = {
                'Authorization': `${token}`,
            }
            const response = await axios.get(`https://gotest.qspiders.com/api/student/get-student-courses`, {
                headers: headers
            });
            // console.log("response.data",response.data)
            this.student_course = response.data.studentcourse
            // this.student_batches = response.data.studentbatches
            // this.dayscrossed = response.data.dayscrossed
            // this.filled = response.data.profilefilled
            // for (var i = 0; i < response.data.studentbatches.length; i++) {
            //     if(response.data.studentbatches[i].regular_attended>=7)
            //     {
            //             this.add_profile=true
            //     }
            // }     
    }
},

    async getstudentbatches(closed=false,page,search="") {
        const token = this.token
        if (token) {
            const headers = {
                'Authorization': `${token}`,
            }
            const response = await axios.get(`https://gotest.qspiders.com/api/student/batches-view?page=${page}&closed=${closed}&${search}`, {
                headers: headers
            });
            // this.student_course = response.data.studentcourse
            this.student_batchess = response.data.studentbatches
            this.dayscrossed = response.data.dayscrossed
            this.filled = response.data.profilefilled
            this.student_count_total = response.data.total
            // for (var i = 0; i < response.data.studentbatches.length; i++) {
            //     if(response.data.studentbatches[i].regular_attended>=7)
            //     {
            //             this.add_profile=true
            //     }
            // }     
    }
},

        async getstudentpayments() {
            const token = this.token
            if (token) {
                const headers = {
                    'Authorization': `${token}`,
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/get-payments`, {
                    headers: headers
                });

                this.student_payments = response.data

        

            }
        },

        async getuniversitycollege(query="", university,type) {
  
        
            const token = this.token
            if (token) {
                const headers = {
                    'Authorization': `${token}`,
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/selectcollege?name=${query}&qualification=${type}&university_id=${university}`, {
                    headers: headers
                });

                this.university_college = response.data.items

                return this.university_college

            }
        },
        async getstream(query = "", type,degree) {
            const token = this.token;

            if (token) {
              const headers = {
                Authorization: `${token}`,
                "Content-Type": "application/json",
              };
              const response = await axios.get(
                `https://gotest.qspiders.com/api/student/selectstreams?qualification=${type}&degree=${degree}&size=600`,
                {
                  headers: headers,
                }
              );
      
              this.degree_stream = response.data.items;
      
              return this.degree_stream;
            }
          },

        async getrequirements(page,id) {
            const token = this.token
            if (token) {
                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://hrstbackend.qspiders.com/hr/student-reqdetails/?page=${page}&token=${token}`, {
                    headers: headers
                });
                this.requirements_data = response.data.results
                this.requirements_data_total = response.data.total
                // console.log("this.requirements_data",this.requirements_data)
                // return this.requirements_data

            }
        },



        async getdegreetype(query="") {

            const token = this.token

        
            if (token) {
                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/selectdegree?qualification=${'degree'}&name=${query}&size=500`, {
                headers: headers
                });
       
            
                this.degree_type = response.data.items

            
                return response.data.items
                
            }
      
        },


        async getmastertype() {
            const token = this.token

        
            if (token) {
                const headers = {
                    'Authorization': `${token}`
                }

            
                    const response = await axios.get(`https://gotest.qspiders.com/api/student/selectdegree?qualification=${'masters'}`, {
                    headers: headers
                });
                this.master_type = response.data.items

            
                return this.master_type

                
            }
      
        },

        async getdomain(data) {

            const token = this.token

            if (token) {
                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/designations?name=${data}`, {
                    headers: headers
                });

                this.domain = response.data.items
                return this.domain

            }
        },
        async getcompany(data) {
            const token = this.token
            if (token) {
                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/companies?name=${data}`, {
                    headers: headers
                });
                this.company = response.data.items
                return this.company

            }
        },
        async getskills(data) {

            const token = this.token

            if (token) {
                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/skills?name=${data}`, {
                    headers: headers
                });

                this.skills = response.data.items
                return this.skills

            }
        },
        async getindustry(data) {
            const token = this.token
            if (token) {
                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/companyindustry?name=${data}`, {
                    headers: headers
                });

                this.industry = response.data.items
                return this.industry

            }
        },
        async getspecialization(data) {
            const token = this.token

            if (token) {
                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/specialization`, {
                    headers: headers
                });

                this.specialization = response.data.items
      
                return this.specialization

            }
        },


        async getrelocation(data) {

            const token = this.token
            if (token) {
                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/city?size=500`, {
                    headers: headers
                });
                // for (var i = 0; i < response.data.items.length; i++) {
                //     console.log("response.data.items",response.data.items)
                //     if(response.data.items[i].name.contains("bengalu")||response.data.items[i].name.contains("banglo")){
                //         this.location=[]
                //     }
                //     else{
                //          this.location = response.data.items
                //     }
                   
                //     }
                
                this.location = response.data.items
                return this.location

            }
        },


        async getstudentcity(data) {

            const token = this.token

    
                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/registration-districts?state=${data}&size=500`, {
                    headers: headers
                });
  
                this.locations = response.data.items
                // console.log("response.data.items",response.data.items)
                return this.locations

            
        },
        async getstudentpincode(data,query,flag) {

            const token = this.token

 
        
                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/pincodes?district=${data}&name=${query}&size=500`, {
                    headers: headers
                });

                if(flag===true){
             
                
                    this.pincodes = response.data.items
                    return this.pincodes
                }
                else{
             
                
                    this.pincodes1 = response.data.items
                    return this.pincodes1
                }
               

            
        },

        async getstudentbranch(data) {

            
            const token = this.token

                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/get-city-branches?city=${data}`, {
                    headers: headers
                });

                
  
                this.branch = response.data
                return this.branch

            
        },
        async verifyotp(data) {
            try{
                const response = await axios.post(`https://gotest.qspiders.com/api/verify-otp`,data);
                this.verify_otp = response.data
            }
            catch(error){
                this.error_send_mail =  error.response.data
            }
      
      },

        async getstudentnumbercheck(data) {
            try{
                const token = this.token
      
            
                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/check-number?number=${data}`);
  
                this.check_number = response.data.data
         
            
                return this.check_number
            }
            catch (error) {
                this.check_number = true
            }

            
         
        },


        async addemaildata(data) {
            const token = this.token
            try {
                if (token) {
                    const headers = {
                        'Authorization': `${token}`
                    }
 
                    const response = await axios.post(`https://gotest.qspiders.com/api/student/update-email`, data, {
                        headers: headers
                    });

                    this.contact_data = response.data
                    return this.contact_data
                }
            } catch (error) {
                this.error_contact_data = error.response.data.message

            }

        },
        async forgotsendemail(data) {
            try{
                const response = await axios.post(`https://gotest.qspiders.com/api/send-otp-student`,data);
                this.send_mail = response.data
                return this.send_mail
            }
            catch(error){
                this.error_send_mail =  error.response.data
            }
        
        },
        async forgotpasswordnew(data) {

            
            try{
                const response = await axios.post(`https://gotest.qspiders.com/api/send-otp-student-new`,data);
                this.send_mail = response.data
                return this.send_mail
            }
            catch(error){
                this.error_send_mail =  error.response.data
            }
        
        },
        async addemails(data) {

            const token = this.token
            const data1={
                "email":data
            }

            try {
   
                    const response = await axios.post(`https://gotest.qspiders.com/student/check-email`,data1, {
                        headers: {
                          "Content-Type": "application/json", // this shows the expected content type
                      }
                      });

                    this.email_data = response
                    return this.email_data
                
            } catch (error) {
   
                this.error_email_data = error.response.data.error

            }

        },


        async changepassword(data) {
 
            const token = this.token
    
            try {
                if (token) {
                    const headers = {
                        'Authorization': `${token}`
                    }

                    const response = await axios.post(`https://gotest.qspiders.com/student/change-password`, data, {
                        headers: headers
                    });
                    this.change_password = response
                    return this.change_password
                }
            } catch (error) {
                this.change_password_error = error.response.data.error

            }

        },
        async changenew_password(data) {
            try{
                const response = await axios.post(`https://gotest.qspiders.com/api/student/change-password`,data);
                this.new_pass = response.data
                return this.new_pass
            }
            catch(error){
                this.error_send_mail =  error.response.data
            }
    
    },



        async educational(data) {

            const token = this.token
            try {
                if (token) {
                    const headers = {
                        'Authorization': `${token}`

                    }
                    const response = await axios.post('https://gotest.qspiders.com/api/student/add-educational', data, {
                        headers: headers
                    });

                

                    this.educational_message = response

                }
            } catch (error) {
                this.error_educational_data = error.response.data.error

            }

        },

        async experience(data) {
            const token = this.token
            try {
                if (token) {
                    const headers = {
                        'Authorization': `${token}`

                    }
                    const response = await axios.post('https://gotest.qspiders.com/api/student/add-experience', data, {
                        headers: headers
                    });
                    this.experience_message = response
                }
            } catch (error) {
                this.error_experience_data = error.response.data.error

            }

        },
        async updatecontact(data) {
            const token = this.token
            try {
                if (token) {
                    const headers = {
                        'Authorization': `${token}`

                    }
                    const response = await axios.post('https://gotest.qspiders.com/api/student/update-contact', data, {
                        headers: headers
                    });
                    this.update_contact = response.data.message
                }
            } catch (error) {
                this.update_contact_error = error.response.data.error

            }

        },

        async other(data) {

            
            const token = this.token
            try {
                if (token) {
                    const headers = {
                        'Authorization': `${token}`

                    }
                    const response = await axios.post('https://gotest.qspiders.com/api/student/add-other', data, {
                        headers: headers
                    });
                    this.other_message = response

                }
            } catch (error) {

                this.error_other_data = error.response.data.error

            }

        },

        async addreferal(data) {
            const token = this.token
            try {
                if (token) {
                    const headers = {
                        'Authorization': `${token}`

                    }
                    const response = await axios.post('https://gotest.qspiders.com/api/student/update-refers', data, {
                        headers: headers
                    });
                    this.refer_message = response

                }
            } catch (error) {

                this.error_refer_data = error.response.data.error

            }

        },

        async getstudentuniversity(data) {

            
            const token = this.token

    
                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/get-universities?name=${data}`, {
                    headers: headers
                });
   
                
                this.universities = response.data
                return this.universities

            
        },

        async getstudentbranchcity(data) {

            const token = this.token

    
                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/branch-cities`, {
                    headers: headers
                });
  
                this.branch_city = response.data
                return this.branch_city

            
        },

        async uploadresume(data) {
            const token = this.token

        
            try {
                if (token) {
                    const headers = {
                        'Authorization': `${token}`,
                        "Content-Type": "multipart/form-data",

                    }
                    const response = await axios.post('https://gotest.qspiders.com/api/student/resume-upload', data, {
                        headers: headers
                    });
                    
                    this.upload_message = response

                }
            } catch (error) {

                this.error_upload_data = error.response.data

            }

        },
        async unauthorized(data) {
            
        },


  




    }
})

if (
    import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(sessionStore,
        import.meta.hot))
}