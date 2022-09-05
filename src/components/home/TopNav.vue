<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
const jumpSearch = () => {
  router.push({
    path:'/Search'
  })
}
const gouser = () => {
  router.push({
    path:'/infoUser'
  })
}
</script>

<template>
  <van-row class="row" justify="space-between">
    <van-col span="2">
      <van-icon name="coupon-o" size="25" />
    </van-col>
    <van-col span="3" >
      <span @click="gouser">我的</span>
    </van-col>
    <van-col span="3" >
      <span>发现</span>
    </van-col>
    <van-col span="3">
      <span>云村</span>
    </van-col>
    <van-col span="3">
      <span>视频</span>
    </van-col>
    <van-col span="2" @click="jumpSearch">
      <van-icon name="search" size="25" />
    </van-col>
  </van-row>
</template>

<style scoped lang="less">
.row{
    padding: 10px 0;

}
</style>
