<template>
  <div>
    <a-card v-if="question">
      <a-row gutter="20">
        <a-col flex="12">
          <MdViewer :value="question.content || ''" />
        </a-col>
        <a-col flex="4">
          <a-list>
            <template #header> 题目条件 </template>
            <a-list-item>
              <div class="flex justify-between">
                <span>难度：</span>
                <Difficulty :difficulty="question.difficulty" />
              </div>
            </a-list-item>
            <a-list-item>
              <div class="flex justify-between">
                <span>时间限制：</span>
                <span>{{ question.judgeConfig?.timeLimit / 1000 ?? 0 }}s</span>
              </div>
            </a-list-item>
            <a-list-item>
              <div class="flex justify-between">
                <span>内存限制：</span>
                <span>{{ question.judgeConfig?.memoryLimit ? convertKBToMB(question.judgeConfig?.memoryLimit) : 0 }}MB</span>
              </div>
            </a-list-item>
            <a-list-item>
              <div class="flex justify-between">
                <span>堆栈限制：</span>
                <span> {{ question.judgeConfig?.stackLimit ?? 0 }}</span>
              </div>
            </a-list-item>
            <a-list-item>
              <div class="flex justify-between">
                <span>总尝试数：</span>
                <span>{{ question.submitNum ?? 0 }}</span>
              </div>
            </a-list-item>
            <a-list-item>
              <div class="flex justify-between">
                <span>总通过数：</span>
                <span>{{ question.acceptedNum ?? 0 }}</span>
              </div>
            </a-list-item>
            <a-list-item>
              <div>算法标签：</div>
              <a-space class="mt-2">
                <a-tag v-for="(tag, index) of question.tags" :key="index" color="green">{{ tag }}</a-tag>
              </a-space>
            </a-list-item>
          </a-list>
        </a-col>
      </a-row>
    </a-card>
<!--    <a-spin v-else :loading="true" tip="loading question..." class="w-full">-->
<!--      <div class="m-[500px]"></div>-->
<!--    </a-spin>-->
  </div>
</template>

<script setup lang="ts">
import { editor } from 'monaco-editor';
import { defineProps, ref, watch, withDefaults } from 'vue';
import { QuestionControllerService, QuestionQueryRequest, QuestionVO } from '../../generated';
import message from '@arco-design/web-vue/es/message';
import MyAvatar from '@/components/MyAvatar.vue';
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { convertKBToMB, statusColor } from '@/utils';
import CodeReader from '@/components/CodeReader.vue';
import MdViewer from '@/components/MdViewer.vue';
import Difficulty from './Difficulty.vue';

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
