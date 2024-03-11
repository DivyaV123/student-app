import { defineStore, acceptHMRUpdate } from 'pinia'
// import { useStorage } from "vue3-storage";
import axios from 'axios';
import Cookies from 'js-cookie';
import { sessionStore } from './session'
// const ls = useStorage();


export const batchStore = defineStore('batch', {
    state: () => ({
        user: null,
        loggedIn: false,
        error: "",
        my_batches: [],
        student_batches_view: [],
        subject: [],
        trainer: [],
        batch_calendar:[],
        student_batches_total: 0

    }),
    actions: {



        async getmybatches(page, search) {

            const user = sessionStore();
            const token = user.token
            if (token) {
                const headers = {
                    'Authorization': `${token}`
                }
                const response = await axios.get(`https://gotest.qspiders.com/api/student/batches-view`, {
                    headers: headers
                });

                this.student_batches_view = response.data.items
                this.student_batches_total = response.data.total

            }
        },




    }
})



if (
    import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(batchStore,
        import.meta.hot))
}