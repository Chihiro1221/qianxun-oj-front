<template>
  <div id="userProfileView" class="max-w-[1280px] m-auto ">
    <a-row :wrap="false" gutter="20">
      <a-col flex="5">
        <a-spin class="w-full" :loading="isAvatarLoading" tip="上传头像中">
          <div class="bg-white h-[300px] rounded shadow p-4">
            <a-avatar v-if="store.state.user?.loginUser?.userAvatar" class="!w-full !h-[200px]" shape="square"
                      :imageUrl="store.state.user?.loginUser?.userAvatar"></a-avatar>
            <a-avatar
                v-else
                class="!w-full !h-[200px]"
                shape="square"
                imageUrl="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
            >
            </a-avatar>
            <a-divider/>
            <div class="flex justify-center">
              <a-upload action="http://localhost:8101/api/file/oss/upload" name="file" with-credentials
                        :show-file-list="false"
                        @success="handleUploadSuccess"
                        :on-before-upload="handleBeforeUpload"
              />
            </div>
          </div>
        </a-spin>
      </a-col>
      <a-col class="ml-6" flex="20">
        <div class="profile">
          <div class="bg-white p-4 rounded shadow">
            <h2 class="font-normal">个人信息</h2>
            <a-divider/>
            <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
              <a-form-item field="userName" label="用户昵称：">
                <a-input
                    placeholder="请输入用户昵称"
                    v-model="form.userName"
                />
              </a-form-item>
              <a-form-item field="post" label="用户简介：">
                <a-textarea v-model="form.userProfile" placeholder="请输入用户简介" class="h-[80px]" allow-clear/>
              </a-form-item>
              <a-form-item>
                <a-button html-type="submit" type="primary">更新信息</a-button>
              </a-form-item>
            </a-form>
          </div>

          <div class="bg-white p-4 rounded shadow mt-4">
            <h2 class="font-normal">账号安全</h2>
            <a-divider/>
            <div class="">
              <a-row class="list-item">
                <a-col flex="4">
                  <span><icon-lock size="18"/>密码</span>
                </a-col>
                <a-col flex="4">
                  <span class="text-xs text-[#aaa]">已设置</span>
                </a-col>
                <a-col flex="4">
                  <span class="sys-text" @click="psdModalVisible = true">修改密码</span>
                </a-col>
                <a-modal v-model:visible="psdModalVisible" @ok="handleOk" @cancel="handleCancel">
                  <template #title>
                    修改密码
                  </template>
                  <div>
                    <a-form :model="form">
                      <a-form-item field="name" label="原密码">
                        <a-input type="password" v-model="form.userPassword"/>
                      </a-form-item>
                      <a-form-item field="name" label="新密码">
                        <a-input type="password" v-model="form.userNewPassword"/>
                      </a-form-item>
                      <a-form-item field="name" label="重复新密码">
                        <a-input type="password" v-model="form.userNewPasswordConfirmation"/>
                      </a-form-item>
                    </a-form>
                  </div>
                </a-modal>
              </a-row>
              <a-row class="list-item">
                <a-col flex="4">
                  <span><icon-phone size="18"/>手机</span>
                </a-col>
                <a-col flex="4">
                  <span class="text-xs text-[#aaa]">159***71902</span>
                </a-col>
                <a-col flex="4">
                  <span class="sys-text">修改手机号</span>
                </a-col>
              </a-row>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {useStore} from "vuex";
import {computed, reactive, ref} from "vue";
import {UserControllerService} from "../../../generated";
import message from "@arco-design/web-vue/es/message";

const store = useStore();
const loginUser = computed(() => store.state.user?.loginUser)
const isAvatarLoading = ref(false)
const psdModalVisible = ref(false)
const form = reactive({
  userName: loginUser.value.userName,
  userProfile: loginUser.value.userProfile,
  userPassword: "",
  userNewPassword: "",
  userNewPasswordConfirmation: ""
});

const handleClick = () => {
  psdModalVisible.value = true;
};

const handleOk = async () => {
  const {userPassword, userNewPassword, userNewPasswordConfirmation} = form;
  const res = await UserControllerService.updateMyUserUsingPost({
    userPassword, userNewPassword, userNewPasswordConfirmation
  });
  if (res.code === 0) {
    message.success("密码更新成功")
    psdModalVisible.value = false;
    form.userPassword = "";
    form.userNewPassword = "";
    form.userNewPasswordConfirmation = "";
  } else {
    message.error("密码更新失败，" + res.message)
  }
};
const handleCancel = () => {
  form.userPassword = "";
  form.userNewPassword = "";
  form.userNewPasswordConfirmation = "";
  psdModalVisible.value = false;
}

/**
 * 修改密码
 * @param data
 */
const handleSubmit = async (data) => {
  const {userName, userProfile} = form;
  const res = await UserControllerService.updateMyUserUsingPost({
    userName, userProfile
  });
  if (res.code === 0) {
    message.success("更新信息成功")
    await store.dispatch("user/getLoginUser");
  } else {
    message.error("更新失败，" + res.message)
  }

  form.userPassword = "";
  form.userNewPassword = "";
  form.userNewPasswordConfirmation = "";
};

const handleUploadSuccess = async (data: any) => {
  console.log(data.response.code)
  if (data.response.code === 0) {
    const res = await UserControllerService.updateMyUserUsingPost({
      userAvatar: data.response.data
    })
    if (res.code === 0) {
      message.success("更新头像成功")
      await store.dispatch("user/getLoginUser");
    } else {
      message.error("更新头像失败")
    }
  } else {
    message.error("上传失败，" + data.response.message)
  }
  isAvatarLoading.value = false;
  console.log(data.response)
}

const handleBeforeUpload = () => {
  isAvatarLoading.value = true;
  return true;
}


</script>

<style scoped>
.list-item {
  @apply py-4;
  border-bottom: 1px solid rgb(var(--gray-3));
}
</style>
