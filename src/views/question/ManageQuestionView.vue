<template>
  <div id="manageQuestionView">
    <a-form :model="searchParams" layout="inline" class="bg-white py-3 rounded shadow mb-5">
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
    <a-table
        class="bg-white pb-2"
        :ref="tableRef"
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
      <template #tags="{ record }">
        <a-space>
          <a-tag v-for="(tag, index) of record.tags" :key="index" color="green"
          >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #difficulty="{ record }">
        <Difficulty :difficulty="record.difficulty"/>
      </template>
      <template #user="{ record }">
        <div>{{ record.userVO.userName }}</div>
      </template>
      <template #createTime="{record}">
        {{ dayjs(record.createTime).format("YYYY-MM-DD HH:MM:ss") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)"> 修改</a-button>
          <a-popconfirm content="确定删除这道题吗？" @ok="doDelete(record)">
            <a-button status="danger">删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import {ref, watchEffect} from "vue";
import message from "@arco-design/web-vue/es/message";
import {useRouter} from "vue-router";
import dayjs from "dayjs";
import Difficulty from "@/components/Difficulty.vue";
import {QuestionControllerService, QuestionVO} from "../../../generated/question";

const tableRef = ref();

const dataList = ref<QuestionVO[]>([]);
const total = ref(0);
const searchParams = ref({
  title: "",
  tags: [],
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPage(
      searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data?.records!;
    total.value = res.data?.total!;
  } else {
    message.error("加载失败，" + res.message);
  }
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

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

// /**
//  * 页面加载时，请求数据
//  */
// onMounted(() => {
//   loadData();
// });

// {id: "1", title: "A+ D", content: "新的题目内容", tags: "["二叉树"]", answer: "新的答案", submitNum: 0,…}

const columns = [
  {
    title: "id",
    dataIndex: "id",
    width: 200
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
    width: 300
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "难度",
    slotName: "difficulty",
  },
  {
    title: "用户",
    slotName: "user"
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const doDelete = async (question: QuestionVO) => {
  const res = await QuestionControllerService.deleteQuestion({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败");
  }
};

const router = useRouter();

const doUpdate = (question: QuestionVO) => {
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};
</script>

<style scoped>
#manageQuestionView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
