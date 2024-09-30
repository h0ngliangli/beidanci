// JavaScript可以直接引入css文件
import './assets/main.css'
// vue和pinia通过npm安装
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
