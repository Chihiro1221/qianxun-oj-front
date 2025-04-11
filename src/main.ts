import {createApp} from 'vue';
import App from './App.vue';
import '@/assets/tailwind.css';
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import router from './router';
import store from './store';
import '@/plugins/axios';
import '@/access';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import isLeapYear from 'dayjs/plugin/isLeapYear' // 导入插件
import 'dayjs/locale/zh-cn' // 导入本地化语言
import '@/assets/global.css'

dayjs.extend(relativeTime)
dayjs.extend(isLeapYear) // 使用插件
dayjs.locale('zh-cn') // 使用本地化语言
useBytemdPlugin()

// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import {useBytemdPlugin} from "@/plugins/bytemd";

createApp(App).use(ArcoVue).use(ArcoVueIcon).use(store).use(router).mount('#app');
