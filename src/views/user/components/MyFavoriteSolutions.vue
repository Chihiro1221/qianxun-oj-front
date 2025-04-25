<template>
  <a-table
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
      <a-typography-paragraph ellipsis>
        <span class="sys-text"
              @click="$router.push({path:`/view/question/${record.questionId}`,query:{solutionId:record.id}})">{{
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
      <a-popconfirm content="确定取消收藏这个题解吗？" @ok="doDelete(record)">
        <icon-delete class="cursor-pointer hover:text-blue-500 duration-200" size="20"/>
      </a-popconfirm>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import MdEditor from "@/components/MdEditor.vue";
import {defineProps, ref, watch, watchEffect, withDefaults} from "vue";
import {SolutionControllerService, SolutionVO} from "../../../../generated/question";
import message from "@arco-design/web-vue/es/message";

const tableRef = ref();
const loading = ref(false)
const columns = [
  {
    title: "标题",
    slotName: "title"
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
  const res = await SolutionControllerService.listFavoriteSolutionVoByPage(
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
      if (props.currentStatus === 'favorite') {
        loadData();
      }
    }
);


const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
  loadData()
};

/**
 * 删除题解
 * @param solution
 */
const doDelete = async (solution: SolutionVO) => {
  const res = await SolutionControllerService.unFavorite({
    id: solution.id,
  });
  if (res.code === 0) {
    message.success("取消收藏成功");
    loadData();
  } else {
    message.error("取消收藏失败");
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
// watchEffect(() => {
//   loadData();
// }, {});

</script>

<style scoped></style>
