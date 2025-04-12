<template>
  <div id="questionsView">
    <a-form :model="searchParams" layout="inline" class="bg-white py-3 rounded shadow ">
      <a-form-item field="title" label="名称" style="min-width: 240px" class="!mb-0 !ml-4">
        <a-input v-model="searchParams.title" placeholder="请输入名称"/>
      </a-form-item>
      <a-form-item field="tags" label="标签" style="min-width: 240px" class="!mb-0 !ml-4">
        <a-input-tag v-model="searchParams.tags" placeholder="请输入标签"/>
      </a-form-item>
      <a-form-item class="!mb-0">
        <a-button type="primary" @click="doSubmit">提交</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0"/>
    <a-table
        :ref="tableRef"
        :loading="isLoading"
        :columns="columns"
        stripe
        :data="dataList"
        :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
        @page-change="onPageChange"
    >
      <template #title="{ record }">
        <div class="text-blue-700">
          <span class="hover:underline cursor-pointer" @click="toQuestionPage(record)">{{ record.title }}</span>
        </div>
      </template>
      <template #tags="{ record }">
        <a-space>
          <a-tag v-for="(tag, index) of record.tags" :key="index" color="green"
          >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #acceptedRate="{ record }">
        {{
          `${
              record.submitNum ? (record.acceptedNum / record.submitNum).toFixed(2) : "0"
          }%`
        }}
      </template>
      <template #difficulty="{ record }">
        <Difficulty :difficulty="record.difficulty"/>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import {
  Page_Question_,
  Question,
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import * as querystring from "querystring";
import {useRouter} from "vue-router";
import moment from "moment";
import Difficulty from "@/components/Difficulty.vue";

const tableRef = ref();
const isLoading = ref(false)

const dataList = ref([]);
const total = ref(0);
const searchParams = ref<QuestionQueryRequest>({
  title: "",
  tags: [],
  pageSize: 8,
  current: 1,
});

const loadData = async () => {
  isLoading.value = true;
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
      searchParams.value
  );
  isLoading.value = false;
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

// {id: "1", title: "A+ D", content: "新的题目内容", tags: "["二叉树"]", answer: "新的答案", submitNum: 0,…}

const columns = [
  {
    title: "题目名称",
    slotName: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "acceptedRate",
  },
  {
    title: "难度",
    slotName: "difficulty",
  }
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const router = useRouter();

/**
 * 跳转到做题页面
 * @param question
 */
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};

/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  // 这里需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
#questionsView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
