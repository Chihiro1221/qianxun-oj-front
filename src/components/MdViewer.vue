<template>
  <Viewer style="z-index: 1000" :value="value" :plugins="plugins" />
</template>

<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import { Viewer } from '@bytemd/vue-next';
import { defineProps, withDefaults } from 'vue';
import math from '@bytemd/plugin-math';
import breaks from '@bytemd/plugin-breaks';
import copyCode from 'bytemd-plugin-copy-code';
import 'bytemd-plugin-copy-code/dist/style/index.css';
import gemoji from '@bytemd/plugin-gemoji';

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
}

const plugins = [
  gfm(),
  highlight(),
  math(),
  breaks(),
  copyCode({
    copySuccess: text => {
      console.log('复制成功');
    },
    copyError: err => {},
    copyRight: '',
  }),
  // mediumZoom(),
  gemoji(),

  // Add more plugins here
];

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => '',
});
</script>

<style scoped lang="scss"></style>
