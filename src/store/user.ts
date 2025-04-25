// initial state
import {StoreOptions} from "vuex";
import {UserControllerService} from "../../generated/user";

export default {
    namespaced: true,
    state: () => ({
        loginUser: null,
        loginVisible: false,
        isAdmin: false
    }),
    actions: {
        async getLoginUser({commit, state}, payload) {
            // 从远程请求获取登录信息
            const res = await UserControllerService.getLoginUser();
            if (res.code === 0) {
                commit("updateUser", res.data);
            } else {
                commit("updateUser", null);
            }
        },
    },
    mutations: {
        updateUser(state, payload) {
            state.loginUser = payload;
            if (payload != null) {
                state.isAdmin = payload.userRole === 'admin';
            }
            console.log("test:" + state.loginUser)
            // useSocket(payload);
        },
        updateLoginVisible(state, payload) {
            state.loginVisible = payload;
        }
    },
} as StoreOptions<any>;
