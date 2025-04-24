<template>
  <div class="border-[1px]" id="code-editor" ref="codeEditorRef"/>
  <!--  <a-button @click="fillValue">填充值</a-button>-->
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor';
import {onMounted, ref, toRaw, withDefaults, defineProps, watch, onBeforeUnmount} from 'vue';
import {editor} from 'monaco-editor';
import EditorOption = editor.EditorOption;
import {debounce} from 'lodash';

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  language?: string;
  readonly?: boolean;
  handleChange: (v: string) => void;
}

/**
 * 编辑器最小高度
 */
const MIN_HEIGHT = 400;

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => '',
  language: () => 'java',
  handleChange: (v: string) => {
    console.log(v);
  },
  readonly: () => false,
});

const codeEditorRef = ref();
const codeEditor = ref();

watch(
    () => props.language,
    () => {
      if (codeEditor.value) {
        monaco.editor.setModelLanguage(toRaw(codeEditor.value).getModel(), props.language);
      }
    }
);

watch(
    () => props.value,
    newValue => {
      if (codeEditor.value) {
        // 当外部值变化且与当前编辑器内容不同时更新
        if (newValue !== toRaw(codeEditor.value).getValue()) {
          toRaw(codeEditor.value).setValue(newValue);
        }
      }
    }
);

const updateEditorHeight = () => {
  // 获取内容高度（像素）
  const contentHeight = codeEditor.value.getContentHeight();
  // 计算目标高度（不小于 MIN_HEIGHT）
  const targetHeight = Math.max(contentHeight, MIN_HEIGHT);

  // 设置容器高度
  codeEditorRef.value!.style.height = `${targetHeight}px`;
  // 通知编辑器更新布局
  // codeEditor.value.layout();
};

const debouncedUpdateHeight = debounce(updateEditorHeight, 100);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,

    colorDecorators: true,
    scrollBeyondLastLine: false,
    minimap: {
      enabled: false,
    },
    readOnly: props.readonly,
    theme: 'vs-light',
    mouseWheelZoom: true,
    scrollbar: {
      scrollByPage: false,
      alwaysConsumeMouseWheel: false
    }
  });

  const fontSize = localStorage.getItem('problem_editor_font_size');
  if (fontSize) {
    toRaw(codeEditor.value).updateOptions({fontSize});
  }

  debouncedUpdateHeight();

  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
    debouncedUpdateHeight();
  });

  // 监听字体大小变化
  codeEditor.value.onDidChangeConfiguration(() => {
    const currentFontSize = toRaw(codeEditor.value).getOptions().get(EditorOption.fontSize);
    localStorage.setItem('problem_editor_font_size', currentFontSize.toString());
  });

});

onBeforeUnmount(() => {
  toRaw(codeEditor.value).dispose();
});
</script>

<style scoped></style>
