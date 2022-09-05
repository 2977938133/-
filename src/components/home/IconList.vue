<script setup lang="ts"></script>

<template>
  <div class="iconlist">
    <div class="iconitem">
      <van-icon name="shopping-cart-o" size="40px"/>
      <span>每日推荐</span>
    </div>
    <div class="iconitem">
      <van-icon name="service-o" size="40px"/>
      <span>推荐歌单</span>
    </div>
    <div class="iconitem">
      <van-icon name="music-o" size="40px"/>
      <span>我的音乐</span>
    </div>
    <div class="iconitem">
      <van-icon name="chart-trending-o" size="40px"/>
      <span>排行榜</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.iconlist{
  
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .iconitem{
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>
