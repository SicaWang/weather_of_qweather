import { createApp } from 'vue';
// import './style.css'
import SvgIcon from '@/components/SvgIcon.vue'; // 导入 SvgIcon 组件
import 'qweather-icons/font/qweather-icons.css';
import 'virtual:svg-icons-register';
import App from './App.vue';
import './styles/tailwind.css';
createApp(App)
.component('SvgIcon',SvgIcon)
.mount('#app')
