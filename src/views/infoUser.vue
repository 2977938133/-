<script setup lang="ts">
import { ElMessage } from "element-plus";
import { toRefs } from "vue";

const data = JSON.parse(localStorage.getItem("User") || "{}");
</script>

<template>
  <div class="box">
    <img class="avatarUrl" :src="data.avatarUrl" />
    <div class="nickname">{{ data.nickname }}</div>
  </div>
</template>

<style scoped lang="less">
.box {
    width: 100%;
    height: 100px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border: 1px solid #000;
  .avatarUrl {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .nickname{
    font-weight: 700;
    font-size: 20px;
  }
}
</style>
