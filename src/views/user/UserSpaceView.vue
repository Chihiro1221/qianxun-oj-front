<template>
  <div id="userSolutionView" class="max-w-[1280px] m-auto ">
    <a-row :wrap="false" gutter="20">
      <a-col flex="5">
        <div class="bg-white h-[300px] rounded shadow p-4">
          <a-avatar v-if="loginUser?.userAvatar" class="!w-full !h-[200px]" shape="square"
                    :imageUrl="loginUser?.userAvatar"></a-avatar>
          <a-avatar
              v-else
              class="!w-full !h-[200px]"
              shape="square"
              imageUrl="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
          >
          </a-avatar>
          <a-divider/>
          <div class="text-center">
            <h4>{{ loginUser?.userName }}</h4>
          </div>
        </div>
      </a-col>
      <a-col class="ml-6" flex="20">
        <div class="space-con">
          <div class="bg-white p-4 rounded shadow">
            <a-tabs default-active-key="current" v-model="currentStatus" @change="onTabChange">
              <a-tab-pane key="current" title="我的题解">
                <MySolutions :current-status="currentStatus"/>
              </a-tab-pane>
              <a-tab-pane key="favorite" title="我的收藏">
                <MyFavoriteSolutions :current-status="currentStatus"/>
              </a-tab-pane>
            </a-tabs>
          </div>

        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {useStore} from "vuex";
import {computed, ref} from "vue";
import MySolutions from "@/views/user/components/MySolutions.vue";
import MyFavoriteSolutions from "@/views/user/components/MyFavoriteSolutions.vue";

const store = useStore()
const currentStatus = ref('current')
const loginUser = computed(() => store.state.user?.loginUser)

const onTabChange = (key: string) => {
  currentStatus.value = key;
};
</script>
