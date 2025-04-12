<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader/>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view/>
      </a-layout-content>
<!--      <a-layout-footer class="footer"></a-layout-footer>-->
    </a-layout>
  </div>
</template>

<script>
import GlobalHeader from '@/components/GlobalHeader';

export default {
  components: {GlobalHeader},
};
</script>

<style scoped>
#basicLayout {
}

#basicLayout .header {
  box-shadow: #eee 1px 1px 5px;
}

#basicLayout .content {
  background: url("../assets/wallpaper.jpg") no-repeat;
  background-size: cover; /* 覆盖整个容器 */
  background-position: center; /* 居中对齐 */
  padding: 20px;
}

#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>