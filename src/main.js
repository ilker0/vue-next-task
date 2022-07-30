import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.scss'

// Services
import EventService from '@/services/EventService'

const app = createApp(App)
app.use(router)
app.mount('#app')

app.provide('eventService', new EventService())
