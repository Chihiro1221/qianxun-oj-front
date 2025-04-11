<template>
  <div class="login-container">
    <a-alert type="success" :show-icon="false">请输入注册信息</a-alert>
    <a-form :model="registerForm" @submit="handleRegisterSubmit" layout="vertical">
      <a-form-item field="userAccount">
        <a-input
            v-model="registerForm.userAccount"
            placeholder="用户名"
        />
      </a-form-item>
      <a-form-item field="userPassword">
        <a-input type="password" v-model="registerForm.userPassword" placeholder="密码"/>
      </a-form-item>
      <a-form-item field="checkPassword">
        <a-input type="password" v-model="registerForm.checkPassword" placeholder="重复密码"/>
      </a-form-item>
      <a-form-item>
        <a-button :loading="isLoading" class="h-[100px]" long size="large" type="primary" html-type="submit">注册
        </a-button>
      </a-form-item>
      <div class="text-right text-gray-400 hover:text-blue-600 cursor-pointer" @click="emitter('change-tab')">登录</div>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {UserControllerService, UserLoginRequest, UserRegisterRequest} from "../../generated";
import message from "@arco-design/web-vue/es/message";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const emitter = defineEmits(['close-modal', 'change-tab']);
const registerForm = reactive<UserRegisterRequest>({
  userAccount: '',
  userPassword: '',
  checkPassword: ''
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
const handleRegisterSubmit = async () => {
  isLoading.value = true;
  const res = await UserControllerService.userRegisterUsingPost(registerForm);
  isLoading.value = false;
  console.log(res)
  // 登录成功，跳转到主页
  if (res.code === 0) {
    emitter('change-tab')
    message.success('注册成功！')
  } else {
    message.error("注册失败，" + res.message);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.arco-form-item {
  margin-bottom: 10px;
}
</style>
