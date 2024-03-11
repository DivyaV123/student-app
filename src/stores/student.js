import { defineStore, acceptHMRUpdate } from 'pinia'
// import { useStorage } from "vue3-storage";
import axios from 'axios';
import Cookies from 'js-cookie';
import { sessionStore } from './session'
// import { websockets } from "../stores/websocket";
// const ls = useStorage();

export const studentStore = defineStore('student', {
    state: () => ({
        refer:[],
        error_refer_data:null,
        referral_list:[],
        referralcount:[],
        pay:[],
        course:[],
        gateway : [],
        address : [],
        terms:[],
        coursecount:0,
        stdaddress:[],
        cdetails:[],
        ccount:0,
        pdetails:[],
        update:[],
        error : "",
        validate:null,
        stdreceipt:[],
        failed:[],
        failure:[],
        failedcount:0,
        receipt_data:[]
       
    }),
    actions: {


        async getOrders(data) {
            const user = sessionStore();

        
            const token = user.token;
            if (token) {
                    const headers = {
                        'Authorization': `${token}`
                    }

                    try {  
                        const response = await axios.post('https://gotest.qspiders.com/api/fc/online-payment-order',data,{
                        headers: headers
                    });  
                    this.update = response.data
   
                

                    } 
                    catch (err) {
                        this.error = err.response.data.error
                        return this.error    
                    }
                }
        },



        async getReceiptdata(data) {
            const user = sessionStore();
            const token = user.token;
            if (token) {
                    const headers = {
                        'Authorization': `${token}`
                    }

                    try {  
                        const response = await axios.get(`https://gotest.qspiders.com/api/fc/get-invoice-student?invoiceno=${data}`,{
                        headers: headers
                    });  
                    this.receipt_data = response.data

                

                    } 
                    catch (err) {
                        this.error = err.response.data.error
                        return this.error    
                    }
                }
        },


        async removeError(){
            this.error = ""
        },



        async paymentVerification(data){

            const user = sessionStore();
            const token = user.token;                                            
                if (token) {
                    const headers = {
                        'Authorization': `${token}`
                    }
                    try {  
                        const response = await axios.post('https://gotest.qspiders.com/api/fc/online-payment-success',data,{
                            headers: headers
                        });        
                                          
                    this.validate = response.data.invoice

                
                    user.getstudentcoursess()
                    user.getstudentpayments()
                    return this.validate
                    }
                    catch (err) {
                        this.error = err.response.data.error
                        return this.error    
                    }
                }
        },

        async failurepaymentVerification(data){
            const user = sessionStore();
            const token = user.token;                                            
                if (token) {
                    const headers = {
                        'Authorization': `${token}`
                    }
                    try {  
                        const response = await axios.post('https://gotest.qspiders.com/api/fc/online-payment-failure',data,{
                            headers: headers
                        });        
                                          
                    this.failure = response
                    return this.failure
                    }
                    catch (err) {
                        this.error = err.response.data.error
                        return this.error    
                    }
                }
        },

  

}
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(studentStore, import.meta.hot))
}