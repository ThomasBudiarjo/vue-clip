import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import router from './router'
import PocketBase from 'pocketbase'

// Initialize PocketBase
const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL || 'http://localhost:8090')

const app = createApp(App)

// Make PocketBase available globally
app.config.globalProperties.$pb = pb
app.provide('pb', pb)

app.use(router)
app.mount('#app')