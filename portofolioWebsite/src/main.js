import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { inject } from '@vercel/analytics'
import { createApp } from 'vue'
import App from './App.vue'
inject()
createApp(App).mount('#app')