<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import TopNav from "../components/home/TopNav.vue";
import SwiperTop from "../components/home/SwiperTop.vue";
import IconList from "../components/home/IconList.vue";
import MusicList from "../components/home/MusicList.vue";
import { ElMessage } from "element-plus";
// const isDark = useDark()
// const toggleDark = useToggle(isDark)
if (localStorage.getItem("User")) {
  const data = JSON.parse(localStorage.getItem("User") || "");
  ElMessage({
    message: `欢迎 ${data.nickname} 使用网易云音乐`,
    type: "success",
  })
}
</script>

<template>
  <top-nav />
  <SwiperTop />
  <IconList />
  <MusicList />
  <!-- <el-icon @click.stop="toggleDark()" v-model="isDark" style="float: right;"><Moon /></el-icon> -->
</template>

<style scoped></style>
