<template>
  <Editor style="z-index: 1000" :value="value" :mode="mode" :locale="zhHans" :plugins="plugins" @change="handleChange"
          :uploadImages="uploadImage"/>
</template>

<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import {Editor, Viewer} from '@bytemd/vue-next';
import {ref, withDefaults, defineProps} from 'vue';
import math from '@bytemd/plugin-math';
import breaks from '@bytemd/plugin-breaks';
import gfmLocale from '@bytemd/plugin-gfm/locales/zh_Hans.json';
import mathLocale from '@bytemd/plugin-math/locales/zh_Hans.json';
import zhHans from 'bytemd/lib/locales/zh_Hans.json'; //

import copyCode from 'bytemd-plugin-copy-code';
import 'bytemd-plugin-copy-code/dist/style/index.css';
import gemoji from '@bytemd/plugin-gemoji';
import {OssControllerService} from "../../generated/file";
import FormData from "form-data";
import message from "@arco-design/web-vue/es/message";
// // 图片的缩放
// import imagePlugin from 'bytemd-plugin-image';
// // 代码复制

// // 缩放图片 点击图片放大,再点击缩小
// import mediumZoom from '@bytemd/plugin-medium-zoom';
// // 表情

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  mode?: string;
  handleChange: (v: string) => void;
}

const plugins = [
  gfm({locale: gfmLocale}),
  highlight(),
  math({
    locale: mathLocale,
  }),
  breaks(),
  // imagePlugin(),
  copyCode({
    copySuccess: text => {
      console.log('复制成功');
    },
    copyError: err => {
    },
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
  mode: () => 'split',
  handleChange: (v: string) => {
    console.log(v);
  },
});

/**
 * 图片上传
 * @param files
 */
const uploadImage = async (files: any) => {
  const data: { title: string, url: string }[] = [];

  const promises: any = [];
  files.forEach(async (file: File) => {
    const formData = new FormData();
    formData.append("file", file)
    promises.push(OssControllerService.uploadFile(formData));
  })

  const response = await Promise.all(promises);
  response.forEach((d, i) => {
    if (d.code == 0) {
      data.push({title: files[i], url: d.data})
    } else {
      message.error("部分图片上传失败！")
    }
  })
  console.log(data)
  return data
};
</script>

<style>
.bytemd {
  height: calc(60vh) !important;
}
</style>
