import { defineStore } from 'pinia'
import { sessionStore } from '@/stores/session'
import axios from 'axios'

export const useGeneralStore = defineStore('general', {
    state: () => ({
        batches: [],
        batchCount: 0,
        roomBatch: {},
        batchStatus: {},
        roomStudentBatch: {},
    }),
    actions: {
        async get_single_batch(id) {
            const user = sessionStore();
            const token = user.token
            if (token) {
                const headers = {
                    'Authorization': `${token}`
                }
                try {
                    const batch = await axios.get(`https://gotest.qspiders.com/api/online/get-student-batch?name=${id}`, {
                        headers: headers
                    });
                    this.roomBatch = batch.data

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async get_batch_status(id) {
            const user = sessionStore();
            const token = user.token
            if (token) {
                const headers = {
                    'Authorization': `${token}`
                }
                try {
                    const batch = await axios.get(`https://gotest.qspiders.com/api/online/checkblocked?batch=${id}`, {
                        headers: headers
                    });
                    this.roomBatch = batch.data

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
        async add_student_attendance(data) {
            const user = sessionStore();
            const token = user.token
            if (token) {
                const headers = {
                    'Authorization': `${token}`
                }
                try {
                    await axios.post(`https://gotest.qspiders.com/api/online/add-studentattendance`, data,{
                        headers: headers
                    });

                }
                catch (err) {
                    console.log("errors", err)
                }
            }
        },
    }
})