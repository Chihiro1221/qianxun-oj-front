<template>
  <div class="login-container">
    <a-alert :show-icon="false">请输入登录信息</a-alert>
    <a-form :model="loginForm" @submit="handleLoginSubmit" layout="vertical">
      <a-form-item field="userAccount">
        <a-input
            v-model="loginForm.userAccount"
            placeholder="用户名"
        />
      </a-form-item>
      <a-form-item field="userPassword">
        <a-input type="password" v-model="loginForm.userPassword" placeholder="密码"/>
      </a-form-item>
      <a-form-item>
        <a-button :loading="isLoading" class="h-[100px]" long size="large" type="primary" html-type="submit">登录
        </a-button>
      </a-form-item>
      <div class="text-right text-gray-400 hover:text-blue-600 cursor-pointer" @click="emitter('change-tab')">注册</div>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {UserControllerService, UserLoginRequest} from "../../generated";
import message from "@arco-design/web-vue/es/message";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const emitter = defineEmits(['close-modal', 'change-tab']);
const loginForm = reactive<UserLoginRequest>({
  userAccount: 'heart',
  userPassword: 'youzhi..'
});
const router = useRouter();
const store = useStore();

/**
 * 按钮loading
 */
const isLoading = ref(false);

/**
 * 提交表单
 * @param data
 */
const handleLoginSubmit = async () => {
  isLoading.value = true;
  const res = await UserControllerService.userLoginUsingPost(loginForm);
  isLoading.value = false;
  emitter('close-modal')
  // 登录成功，跳转到主页
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    // router.push({
    //   path: "/",
    //   replace: true,
    // });
  } else {
    message.error("登陆失败，" + res.message);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.arco-form-item {
  margin-bottom: 10px;
}
</style>
