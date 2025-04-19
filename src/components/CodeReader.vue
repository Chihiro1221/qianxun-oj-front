<template>
  <div
      class="mt-2"
      id="code-reader"
      ref="codeReaderRef"
      style="min-height: 600px; height: 60vh; border:1px solid #eee"
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

// const fillValue = () => {
//   if (!codeEditor.value) {
//     return;
//   }
//   // 改变值
//   toRaw(codeEditor.value).setValue("新的值");
// };

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

watch(
    () => props.value,
    (newValue) => {
      if (codeEditor.value) {
        toRaw(codeEditor.value).setValue(newValue);
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
    scrollBeyondLastLine: false
    // lineNumbers: "off",
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
  });

  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped></style>
