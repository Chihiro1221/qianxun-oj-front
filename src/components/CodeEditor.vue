<template>
  <div
      class="border-[1px]"
      id="code-editor"
      ref="codeEditorRef"
      style="min-height: 400px; height: 60vh"
  />
  <!--  <a-button @click="fillValue">填充值</a-button>-->
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
  value: string;
  language?: string;
  readonly?: boolean
  handleChange: (v: string) => void;
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

const codeEditorRef = ref();
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
        // 当外部值变化且与当前编辑器内容不同时更新
        if (newValue !== toRaw(codeEditor.value).getValue()) {
          toRaw(codeEditor.value).setValue(newValue);
        }
        // toRaw(codeEditor.value).setValue(newValue);
      }
    }
);

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
    theme: "vs-light",
    mouseWheelZoom: true
    // lineNumbers: "off",
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
  });

  const fontSize = localStorage.getItem('problem_editor_font_size');
  if (fontSize) {
    toRaw(codeEditor.value).updateOptions({fontSize})
  }

  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });

  // 监听字体大小变化
  codeEditor.value.onDidChangeConfiguration(() => {
    const currentFontSize = toRaw(codeEditor.value).getOptions().get(EditorOption.fontSize);
    localStorage.setItem('problem_editor_font_size', currentFontSize.toString());
  });
});
</script>

<style scoped>
</style>
