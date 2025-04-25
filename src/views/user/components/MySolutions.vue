<template>
  <a-table
      v-if="solutionTabStatus === 'list'"
      :ref="tableRef"
      :columns="columns"
      :loading="loading"
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
    <template #title="{record}">
      <a-typography-paragraph ellipsis class="sys-text"
                              @click="$router.push({path:`/view/question/${record.questionId}`,query:{solutionId:record.id}})">
        <span>{{
            record.title
          }}</span>
      </a-typography-paragraph>
    </template>
    <template #user="{ record }">
      <div>{{ record.userVO.userName }}</div>
    </template>
    <template #question="{ record }">
      <div class="sys-text" @click="$router.push({path:`/view/question/${record.questionId}`})">
        {{ record.questionVO.title }}
      </div>
    </template>
    <template #createTime="{record}">
      <span>{{ dayjs(record.createTime).fromNow() }}</span>
    </template>
    <template #optional="{ record }">
      <a-space>
        <icon-edit class="cursor-pointer hover:text-blue-500 duration-200" size="20"
                   @click="updateSolution(record)"/>
        <a-popconfirm content="确定删除这个题解吗？" @ok="doDelete(record)">
          <icon-delete class="cursor-pointer hover:text-blue-500 duration-200" size="20"/>
        </a-popconfirm>
      </a-space>
    </template>
  </a-table>
  <a-card :header-style="{ 'background-color': '#f2f3f5' }" v-else>
    <template #title>
      <div class="flex items-center justify-between">
        <div
            class="inline-flex items-center cursor-pointer text-gray-400 hover:text-gray-700 text-sm duration-200"
            @click="solutionTabStatus = 'list'"
        >
          <icon-import size="20px"/>
          返回
        </div>
      </div>
    </template>
    <div class="solution-show">
      <div class="flex items-center">
        <a-form :model="form" label-align="left" layout="vertical"
                @submit="handleSubmit">
          <a-form-item field="title" label="标题" class="!w-1/2">
            <a-input v-model="form.title" placeholder="请输入标题"/>
          </a-form-item>
          <a-form-item field="content" label="题目内容">
            <MdEditor class="w-full" :value="form.content" :handle-change="onContentChange"/>
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit" type="primary">更新题解</a-button>
          </a-form-item>
        </a-form>
      </div>
      <a-divider/>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import MdEditor from "@/components/MdEditor.vue";
import {defineProps, ref, watch, watchEffect, withDefaults} from "vue";
import {SolutionControllerService, SolutionVO} from "../../../../generated/question";
import message from "@arco-design/web-vue/es/message";

const tableRef = ref();
const loading = ref(false)
const solutionTabStatus = ref('list');
const columns = [
  {
    title: "标题",
    slotName: "title",
    width: 200,
  },
  {
    title: "浏览量",
    dataIndex: "viewCount",
  },
  {
    title: "点赞量",
    dataIndex: "upvoteCount",
  },
  {
    title: "收藏量",
    dataIndex: "favoriteCount",
  },
  {
    title: "题目来源",
    slotName: "question",
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
const form = ref<SolutionVO>({
  title: '',
  content: ""
})

const dataList = ref<SolutionVO[]>([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

interface Props {
  currentStatus: string
}

const props = withDefaults(defineProps<Props>(), {});

/**
 * 加载数据
 */
const loadData = async () => {
  loading.value = true;
  const res = await SolutionControllerService.listMySolutionVoByPage(
      searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data?.records!;
    total.value = res.data?.total!;
  } else {
    message.error("加载失败，" + res.message);
  }
  loading.value = false;
};

watch(
    () => props.currentStatus,
    () => {
      if (props.currentStatus === 'current') {
        loadData();
      }
    },
    {
      immediate: true
    }
);


/**
 * 更新题解
 * @param record
 */
const updateSolution = async (record: any) => {
  const res = await SolutionControllerService.getSolutionVoById(record.id)
  if (res.code === 0) {
    form.value = res.data!
  } else {
    message.error("获取题解数据失败，" + res.message)
  }
  solutionTabStatus.value = 'item'
}

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
  loadData()
};

const onContentChange = (value: string) => {
  form.value.content = value;
};

/**
 * 删除题解
 * @param solution
 */
const doDelete = async (solution: SolutionVO) => {
  const res = await SolutionControllerService.deleteSolution({
    id: solution.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败");
  }
};

/**
 * 提交更新题解
 */
const handleSubmit = async () => {
  const res = await SolutionControllerService.updateSolution({
    id: form.value.id,
    title: form.value.title,
    content: form.value.content
  })
  if (res.code === 0) {
    message.success("更新成功！")
    solutionTabStatus.value = 'list'
  } else {
    message.error("更新失败，" + res.message)
  }
}

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
// watchEffect(() => {
//   loadData();
// });

</script>

<style scoped></style>
