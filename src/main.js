import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import { darkModeKey, styleKey } from '@/config.js'
import './css/main.css'
// import Notifications from '@kyvg/vue3-notification'
// import "vue-awesome-paginate/dist/style.css";
// import VueAwesomePaginate from "vue-awesome-paginate";
// import VCalendar from 'v-calendar';
// import 'v-calendar/dist/style.css';

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(createPinia())
// app.use(VueAwesomePaginate)
// app.use(VCalendar, {})
app.use(router)
app.mount('#app')
// app.use(Notifications)

