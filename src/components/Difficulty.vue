<template>
  <div class="py-1 px-2 rounded-full text-xs text-white inline-block" :class="difficultyColor[difficulty]">
    <span>{{difficultyText[difficulty]}}</span>
  </div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import {onMounted, ref, toRaw, withDefaults, defineProps, watch} from "vue";
import {editor} from "monaco-editor";
import EditorOption = editor.EditorOption;

/**
 * 定义组件属性类型
 */
interface Props {
  difficulty: number;
}

const props = withDefaults(defineProps<Props>(), {

});

const difficultyColor = {
  "1":"bg-[#5cb85c]",
  "2":"bg-[#f0ad4e]",
  "3":"bg-[#d9534f]",
}

const difficultyText = {
  "1":"简单",
  "2":"中等",
  "3":"困难",
}

</script>

<style scoped></style>
