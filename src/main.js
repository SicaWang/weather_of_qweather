import { createApp } from 'vue'
// import './style.css'
import './styles/tailwind.css';
import App from './App.vue'
import SvgIcon from 'svg-icon';
import 'qweather-icons/font/qweather-icons.css'

createApp(App)
.component('SvgIcon',SvgIcon)
.mount('#app')
