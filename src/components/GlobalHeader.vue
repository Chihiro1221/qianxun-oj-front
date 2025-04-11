<template>
  <a-row id="globalHeader" class="bg-[#232324]" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
          theme="dark"
          mode="horizontal"
          :selected-keys="selectedKeys"
          @menu-item-click="doMenuClick"
      >
        <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/logo.png"/>
            <!--            <div class="title"></div>-->
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="250px">
      <div class="text-white cursor-pointer text-[#c8ccd3] hover:text-white ">
        <div v-if="store.state.user?.loginUser?.userName" class="flex items-center">
          <a-dropdown :popup-max-height="false">
            <span>
              {{ store.state.user?.loginUser?.userName }}
              <icon-down/>
            </span>
            <template #content>
              <a-doption>个人中心</a-doption>
              <a-doption @click="handleLogout">退出登录</a-doption>
            </template>
          </a-dropdown>

          <div class="avatar ml-2">
            <MyAvatar :url="store.state.user?.userAvatar"/>
          </div>
        </div>
        <div v-else @click='store.commit("user/updateLoginVisible", true)'>登录/注册</div>
      </div>
      <a-modal width="400px" :footer="false" v-model:visible="store.state.user.loginVisible">
        <template #title>
          Chihiros
        </template>
        <transition name="fade" mode="out-in">
          <LoginCard v-if="isLogin" @close-modal="closeModal" @change-tab="changeTab"/>
          <RegisterCard v-else @close-modal="closeModal" @change-tab="changeTab"/>
        </transition>
      </a-modal>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import {routes} from "../router/routes";
import {useRoute, useRouter} from "vue-router";
import {computed, ref} from "vue";
import {useStore} from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";
import LoginCard from "@/components/LoginCard.vue";
import {UserControllerService} from "../../generated";
import message from "@arco-design/web-vue/es/message";
import RegisterCard from "@/components/RegisterCard.vue";
import {useSocket} from "@/utils/webSocketClient";
import MyAvatar from "@/components/MyAvatar.vue";


const router = useRouter();
const store = useStore();
const isLogin = ref(true);

// 展示在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (
        !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

/**
 * 登录框显示
 */

const handleLogout = () => {
  UserControllerService.userLogoutUsingPost();
  const wsClient = useSocket(store.state.user.loginUser);
  wsClient.close();
  store.commit("user/updateUser", null);
  router.push({
    path:"/"
  })
  message.success("已退出！")
};
const handleOk = () => {
  store.commit("user/updateLoginVisible", false)
};

const closeModal = () => {
  store.commit("user/updateLoginVisible", false)
};
const changeTab = () => {
  isLogin.value = !isLogin.value;
}


setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "鱼皮管理员",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
