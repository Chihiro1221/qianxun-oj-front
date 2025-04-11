<template>
  <div>
    <a-avatar :size="size" v-if="!url">
      <img
          alt="avatar"
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
      />
    </a-avatar>
    <a-avatar :size="size" v-else>
      <img
          alt="avatar"
          :src="url"
      />
    </a-avatar>
  </div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import {onMounted, ref, toRaw, withDefaults, defineProps, watch} from "vue";
import {useStore} from "vuex";

const store = useStore();

interface Props {
  size?: number,
  url?:string
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<style scoped></style>
