<template>
  <div>
    <a-card v-if="question" :title="question.title">
      <a-descriptions title="判题条件" :column="{ xs: 1, md: 2, lg: 3 }">
        <a-descriptions-item label="时间限制："> {{
            question.judgeConfig?.timeLimit / 1000 ?? 0
          }}s
        </a-descriptions-item>
        <a-descriptions-item label="内存限制：">
          {{ question.judgeConfig?.memoryLimit ? convertKBToMB(question.judgeConfig?.memoryLimit) : 0 }}MB
        </a-descriptions-item>
        <a-descriptions-item label="堆栈限制：">
          {{ question.judgeConfig?.stackLimit ?? 0 }}
        </a-descriptions-item>
        <a-descriptions-item label="总尝试数：">
          {{ question.submitNum ?? 0 }}
        </a-descriptions-item>
        <a-descriptions-item label="总通过数：">
          {{ question.acceptedNum ?? 0 }}
        </a-descriptions-item>
      </a-descriptions>
      <MdViewer :value="question.content || ''"/>
      <template #extra>
        <a-space>
          <a-tag v-for="(tag, index) of question.tags" :key="index" color="green">{{ tag }}</a-tag>
        </a-space>
      </template>
    </a-card>
    <a-spin v-else :loading="true" tip="loading question..." class="w-full">
      <div class="m-[500px]">
      </div>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import {editor} from "monaco-editor";
import {defineProps, ref, watch, withDefaults} from "vue";
import {QuestionControllerService, QuestionQueryRequest, QuestionVO} from "../../generated";
import message from "@arco-design/web-vue/es/message";
import MyAvatar from "@/components/MyAvatar.vue";
import dayjs from "dayjs";
import {useStore} from "vuex";
import {convertKBToMB, statusColor} from "@/utils";
import CodeReader from "@/components/CodeReader.vue";
import MdViewer from "@/components/MdViewer.vue";

interface Props {
  question: QuestionVO;
  tabValue?: string;
}

const props = withDefaults(defineProps<Props>(), {});
// watch(
//     () => props.tabValue,
//     () => {
//       if (props.tabValue === 'question') {
//         loadSubmitRecords();
//       }
//     }
// );
</script>

<style scoped></style>
