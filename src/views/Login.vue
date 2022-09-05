<script setup lang="ts">
import { ref } from "vue";
import Loginpass from "./loginpass.vue";

const active = ref(0);
</script>

<template>
  <div class="box">
    <van-tabs v-model:active="active" type="card">
      <van-tab title="密码登录">
        <Loginpass />
      </van-tab>
      <van-tab title="验证码登录">验证码登录</van-tab>
    </van-tabs>
  </div>
</template>

<style scoped lang="less">
.box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin-top: 50%;
  .van-tabs {
    width: 80%;
    height: 50%;

    margin: 0 auto;

  }
}
</style>
