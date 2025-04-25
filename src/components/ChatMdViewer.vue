<template>
  <div></div>
</template>

<script lang="ts" setup>
// node.js
// can use `require('markdown-it')` for CJS
import markdownit from 'markdown-it';
const md = markdownit();
const result = md.render('# markdown-it rulezz!');
</script>

<style scoped></style>
