<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader/>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view/>
        <div v-show="isVisible" @click="scrollToTop"
             class="p-4 bg-blue-500 rounded-full hover:bg-blue-400 duration-200 fixed right-20 bottom-20 cursor-pointer text-white">
          <icon-to-top/>
        </div>
      </a-layout-content>
      <!--      <a-layout-footer class="footer"></a-layout-footer>-->
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader';
import {onMounted, ref} from "vue";

const isVisible = ref(false);

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > 200) {
    isVisible.value = true;
  } else {
    isVisible.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>

<style scoped>
#basicLayout {
}

#basicLayout .header {
  box-shadow: #eee 1px 1px 5px;
}

#basicLayout .content {
  background: url('../assets/wallpaper.jpg') no-repeat;
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
