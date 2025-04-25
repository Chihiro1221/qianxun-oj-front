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
  </div>
</template>

<script setup lang="ts">
import {defineProps, withDefaults} from 'vue';
import {convertKBToMB} from '@/utils';
import MdViewer from '@/components/MdViewer.vue';
import Difficulty from './Difficulty.vue';
import {QuestionVO} from "../../generated/question";

interface Props {
  question: QuestionVO;
  tabValue?: string;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<style scoped></style>
