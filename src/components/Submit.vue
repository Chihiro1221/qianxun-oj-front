<template>
  <div v-show="submitTabStatus == 'list'"
       class="solution-container border-b border-x-0 border-t-0 border-solid border-gray-200  pb-4">
    <a-table
        :columns="columns"
        :data="dataList"
        :loading="isTableLoading"
        stripe
        :pagination="{
                showTotal: true,
                pageSize: searchParams.pageSize,
                current: searchParams.current,
                total,
              }"
        @page-change="onPageChange"
    >
      <template #createTime="{ record }">
        <div>{{ dayjs(record.createTime).fromNow() }}</div>
      </template>
      <template #status="{ record }">
        <div
            :class="[statusColor[record.judgeInfo.message] ? statusColor[record.judgeInfo.message] : 'text-red-700']">
                  <span class="cursor-pointer hover:underline" @click="showSubmitItem(record.id)">
                    {{ record.judgeInfo.message }}
                  </span>
        </div>
      </template>
      <template #time="{ record }">
        <div v-if="record.judgeInfo.time !== 0 && record.judgeInfo.time !== null">{{
            record.judgeInfo.time
          }}ms
        </div>
        <div v-else>N/A</div>
      </template>
    </a-table>
  </div>
  <div class="solution-show" v-show="submitTabStatus == 'item'">
    <a-card :header-style="{ 'background-color': '#f2f3f5' }">
      <template #title>
        <div
            class="flex items-center cursor-pointer text-gray-400 hover:text-gray-700 text-sm duration-200"
            @click="submitTabStatus = 'list'"
        >
          <icon-import size="20px"/>
          返回
        </div>
      </template>
      <div>
        <a-row>
          <a-col :span="12">
            <div class="flex items-center gap-2">
              <span>作者：</span>
              <MyAvatar :size="20" :url="store.state.user?.userAvatar"/>
              <span>{{ loginUser.userName }}</span>
            </div>
          </a-col>
          <a-col :span="12">
            <div>
              结果：
              <span
                  :class="[statusColor[currentSubmit?.judgeInfo.message] ? statusColor[currentSubmit?.judgeInfo.message] : 'text-red-700']"
              >
                          {{ currentSubmit?.judgeInfo.message }}
                        </span>
            </div>
          </a-col>
        </a-row>
        <a-row class="mt-4">
          <a-col :span="12">
            <div>通过了 {{ currentSubmit?.judgeInfo?.pass_num }}/{{ currentSubmit?.judgeInfo?.total_case }}
              个数据
            </div>
          </a-col>
          <a-col :span="12">
            <div class="flex items-center">
              <span>运行时间：</span>
              <div v-if="currentSubmit?.judgeInfo.time !== 0 && currentSubmit?.judgeInfo.time !== null">
                {{ currentSubmit?.judgeInfo.time }} ms
              </div>
              <div v-else>N/A</div>
            </div>
          </a-col>
        </a-row>
        <a-row class="mt-4">
          <a-col :span="12">
            <div class="flex items-center">
              <span>运行空间：</span>
              <div v-if="currentSubmit?.judgeInfo.memory !== 0">{{ currentSubmit?.judgeInfo.memory }} KB</div>
              <div v-else>N/A</div>
            </div>
          </a-col>
          <a-col :span="12">
            <div>提交时间：{{ dayjs(currentSubmit?.createTime).fromNow() }}</div>
          </a-col>
        </a-row>
      </div>
    </a-card>
    <a-divider/>
    <CodeReader :value="currentSubmit?.code" :language="currentSubmit?.language" readonly/>
  </div>

</template>

<script setup lang="ts">
import {editor} from "monaco-editor";
import {defineProps, ref, watch, withDefaults} from "vue";
import {QuestionControllerService, QuestionQueryRequest} from "../../generated";
import message from "@arco-design/web-vue/es/message";
import MyAvatar from "@/components/MyAvatar.vue";
import dayjs from "dayjs";
import {useStore} from "vuex";
import {statusColor} from "@/utils";
import CodeReader from "@/components/CodeReader.vue";

interface Props {
  questionId: number | undefined;
  tabValue?: string
}

const props = withDefaults(defineProps<Props>(), {});
const searchParams = ref<QuestionQueryRequest>({
  pageSize: 10,
  current: 1,
});

watch(
    () => props.tabValue,
    () => {
      if (props.tabValue === 'submit-records') {
        loadSubmitRecords();
      }
    }
);

const columns = [
  {
    title: '提交时间',
    slotName: 'createTime',
    width: 150,
  },
  {
    title: '状态',
    slotName: 'status',
    width: 280,
  },
  {
    title: '运行时间',
    slotName: 'time',
  },
  {
    title: '语言',
    dataIndex: 'language',
  },
];
const dataList = ref([]);
const total = ref(0);
const store = useStore();
const loginUser = store.state.user.loginUser;
/**
 * 当前提交数据
 */
const currentSubmit = ref();
/**
 * 提交记录内容状态
 */
const submitTabStatus = ref('list');

/**
 * 提交记录表格是否为loading
 */
const isTableLoading = ref(false);


/**
 * 获取提交记录数据
 */
const loadSubmitRecords = async () => {
  isTableLoading.value = true;
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost({
    ...searchParams.value,
    userId: store.state.user?.loginUser?.id,
    sortField: 'createTime',
    sortOrder: 'descend',
    questionId: props.questionId,
  });
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = parseInt(res.data.total);
  } else {
    message.error('加载失败，' + res.message);
  }
  isTableLoading.value = false;
};

const showSubmitItem = async (submitId: number) => {
  submitTabStatus.value = 'item';
  const res = await QuestionControllerService.getQuestionSubmitVoByIdUsingGet(submitId);
  if (res.code === 0) {
    currentSubmit.value = res.data;
    console.log(currentSubmit.value);
  } else {
    message.error('加载失败，' + res.message);
  }
};

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
  loadSubmitRecords();
};
</script>

<style scoped></style>
