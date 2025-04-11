<template>
  <Viewer style="z-index: 1000" :value="value" :plugins="plugins" />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import {Editor, Viewer} from "@bytemd/vue-next";
import { withDefaults, defineProps } from "vue";
import math from "@bytemd/plugin-math";
import breaks from '@bytemd/plugin-breaks'

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
    breaks()

  // Add more plugins here
];

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});
</script>

<style></style>
