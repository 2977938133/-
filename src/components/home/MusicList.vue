<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, toRefs } from "vue";
import { getMusicList } from "../../request/api";
import { useRouter, useRoute } from "vue-router";
const music: any = reactive({
  musicList: [],
});
const router = useRouter();
const jumptoRouter = (id:number) => {
    router.push({
        path:'/ItemMusic',
        query:{
            id:id
        }
    })
};

onBeforeMount(async () => {
  let res = await getMusicList();
  console.log(res);
  for (const value of res.data.result) {
    music.musicList.push(value);
  }
  console.log(music.musicList);
});
</script>

<template>
  <div class="musiclist">
    <div class="musictop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="150"
        class="myswiper"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in music.musicList" :key="item.id">
          <div class="jumptoRouter" @click="jumptoRouter(item.id)">
            <img :src="item.picUrl" />
            <span class="palyCount">
              <van-icon name="service-o" :size="15" />
              <span>{{ (item.playCount / 10000).toFixed(1) + "万" }}</span>
            </span>
            <span class="name">{{ item.name }}</span>
          </div>
          <router-view />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style scoped lang="less">
.musiclist {
  
  height: 250px;
  padding: 10px;
  .musictop {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .title {
      font-size: 20px;
      font-weight: 900;
    }
    .more {
      border: 1px solid rgb(243, 9, 48);
      text-align: center;
      line-height: 30px;
      padding: 0 10px;
      border-radius: 20px;
    }
  }
  .musicContent {
    width: 100%;
    height: 200px;
    .van-swipe-item {
      padding-right: 15px;
      height: 250px;
    }
    .myswiper {
      height: 100%;
      img {
        width: 100%;
        height: 150px;
        border-radius: 15px;
        position: relative;
        z-index: -1;
      }
      .palyCount {
        position: absolute;
        padding: 5px;
        right: 0;
        color: rgb(0, 0, 0);
        font-size: 14px;
        transform: translate(-15px);
        .van-icon {
          margin-right: 0px;
          vertical-align: middle;
        }
      }
      .name {
        display: block;
        width: 100%;
        height: auto;
        font-size: 14px;
        text-align: left;
      }
    }
  }
}
</style>
