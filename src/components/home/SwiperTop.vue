<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref, toRef } from "vue";
import { getBanners } from "../../request/api";
interface Img {
  images: string[];
}

const state: Img = reactive({
  images: [],
});
onBeforeMount(async () => {
  try {
    const res = await getBanners();
    for (const value of res.data.banners) {
      console.log(typeof value);
      state.images.push(value.pic);
    }
  } catch (error) {
    console.log(error);
    
  }
});
</script>

<template>
  <div id="swipertop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style lang="less">
#swipertop {
  padding: 0 10px;
  padding-bottom: 10px;
  .van-swipe {
    .van-swipe__track {
      .van-swipe-item {
        img {
          border-radius: 20px;
          width: 100%;
          height: 150px;
        }
      }
    }
    .van-swipe__indicator--active {
      background-color: chocolate;
    }
  }
}
</style>
