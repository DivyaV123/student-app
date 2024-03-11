import { defineStore, acceptHMRUpdate } from 'pinia'
// import { useStorage } from "vue3-storage";
import { sessionStore } from "../stores/session";

import axios from 'axios';
// const ls = useStorage();
export const getdata = defineStore('datas', {
    state: () => ({
        test: null,
        code:[],
        user:[],
        user_data:[],
        user_data1:[],
        otp:"",
        forgototp:"",
        otp_value:"",
        verify:[],
        errors:'',
        register:[],
        reset_send:[],
        reset_send_email:[],
        number:'',
        reset_verify:[],
        otp_confirm:[],
        otp_confirm_email:[],
        reset_verify_email:[],
        otp_count:[],
        error_otp_verify:null,
        error_otp_send:"",
        error_forgototp_send:"",
        error_otp_resend:null,
        update_course:null,
        error_update_course:null,
        enquiry_course:[]


    }),
    actions: {


    async send_otp(data) {

        const data1={
            "contact":data
        }
            try{
                const response = await axios.post(`https://gotest.qspiders.com/student/generate-otp`,data1);
                this.otp = response.data

            
                return this.otp
            }
            catch(error){
                this.error_otp_send =  error.response.data
            }

    },

    async forgotpassword_otp(data) {

    
        const data1={
            "contact":data
        }
            try{
                const response = await axios.post(`https://gotest.qspiders.com/student/forgot-passwordotp`,data1);
                this.forgototp = response

            
                return this.forgototp
            }
            catch(error){
                this.error_forgototp_send =  error.response.data
            }

    },



    async resetconfirmotp(data) {
        try {

            const response = await axios.post(`https://gotest.qspiders.com/student/change-forgotpassword`,data);
            this.otp_confirm = response
    }
        catch(error){

            this.error_otp_resend =  error.response.data.error

        }
    },




}
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(getdata, import.meta.hot))
}