<template>
  <div class="home bg-white flex items-center justify-center" style="max-width: 1280px; margin:0 auto; height: 60vh">
    <a-result
        status="403"
        subtitle="您无权访问该页面，如有疑问请联系管理员。"
    >
      <template #extra>
        <a-space>
          <a-button type="primary" @click="$router.back()">返回</a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>

<script lang="ts"></script>

