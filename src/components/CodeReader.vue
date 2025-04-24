<template>
  <div
      class="mt-2"
      id="code-reader"
      ref="codeReaderRef"
      style="border:1px solid #eee"
  />
  <!--  <a-button @click="fillValue">填充值</a-button>-->
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import {onMounted, ref, toRaw, withDefaults, defineProps, watch} from "vue";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  language?: string;
  readonly?: boolean
  handleChange?: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "java",
  handleChange: (v: string) => {
    console.log(v);
  },
  readonly: () => false
});

const codeReaderRef = ref();
const codeEditor = ref();

watch(
    () => props.language,
    () => {
      if (codeEditor.value) {
        monaco.editor.setModelLanguage(
            toRaw(codeEditor.value).getModel(),
            props.language
        );
      }
    }
);
/**
 * 编辑器最小高度
 */
const MIN_HEIGHT = 400;

const updateEditorHeight = () => {
  console.log("tests1222222222222222222222")
  // 获取内容高度（像素）
  const contentHeight = codeEditor.value.getContentHeight();
  console.log(contentHeight)
  // 计算目标高度（不小于 MIN_HEIGHT）
  const targetHeight = Math.max(contentHeight, MIN_HEIGHT);

  // 设置容器高度
  codeReaderRef.value!.style.height = `${targetHeight}px`;
  console.log("adjklfsjklfjadslfk" + `${targetHeight}px`)
  // 通知编辑器更新布局
  // codeEditor.value.layout();
};

watch(
    () => props.value,
    (newValue) => {
      if (codeEditor.value) {
        toRaw(codeEditor.value).setValue(newValue);
        updateEditorHeight()
      }
    }
);

onMounted(() => {
  if (!codeReaderRef.value) {
    return;
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeReaderRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: false,
    },
    readOnly: props.readonly,
    theme: "vs-light",
    scrollBeyondLastLine: false,
    scrollbar: {
      alwaysConsumeMouseWheel: false
    }
    // lineNumbers: "off",
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
  });

  // 编辑 监听内容变化
  // codeEditor.value.onDidChangeModelContent(() => {
  //   props.handleChange(toRaw(codeEditor.value).getValue());
  // });
  // updateEditorHeight()
});
</script>

<style scoped></style>
