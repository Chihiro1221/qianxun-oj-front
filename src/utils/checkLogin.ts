import {Store, useStore} from "vuex";


/**
 * 未登录的弹出登录框
 */
export function checkLogin(store: Store<any>) {
    if (!store.state.user.loginUser) {
        store.commit("user/updateLoginVisible", true);
        return false;
    }
    return true;
}