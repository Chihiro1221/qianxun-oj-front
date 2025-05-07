import {computed, createApp, watch} from 'vue';
import App from './App.vue';
import '@/assets/tailwind.css';
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import router from './router';
import store from './store';
import '@/plugins/axios';
import '@/access';
import 'dayjs/locale/zh-cn'
import '@/assets/global.scss';
// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import {useBytemdPlugin} from '@/plugins/bytemd';
import {useSocket} from '@/utils/webSocketClient';
import {useDayjsPlugin} from "@/plugins/dayjs";

useBytemdPlugin();
useDayjsPlugin();

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
