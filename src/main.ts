import {computed, createApp, watch} from 'vue';
import App from './App.vue';
import '@/assets/tailwind.css';
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import router from './router';
import store from './store';
import '@/plugins/axios';
import '@/access';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // 导入import 'dayjs/locale/zh-cn' // 导入本地化语言
import 'dayjs/locale/zh-cn'
import '@/assets/global.css';

dayjs.extend(relativeTime);
dayjs.extend(isLeapYear); // 使用插件
dayjs.locale('zh-cn'); // 使用本地化语言
useBytemdPlugin();

// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import {useBytemdPlugin} from '@/plugins/bytemd';
import {useSocket, wsClient} from '@/utils/webSocketClient';

const loginUser = computed(() => store.state.user.loginUser);
watch(
    () => loginUser.value,
    () => {
        if (loginUser.value != null) {
            useSocket(loginUser.value);
        }
    }
);

createApp(App).use(ArcoVue).use(ArcoVueIcon).use(store).use(router).mount('#app');
