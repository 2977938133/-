<script setup lang="ts">
import { useRouter } from "vue-router";
const props = defineProps<{
  coverImgUrl?: string;
  avatarUrl?: string;
  nickname?: string;
  commentCount?: number;
  shareCount?: number;
  name?: string;
  description?: string;
}>();
const router = useRouter();
const goback = () => {
  router.go(-1);
};
</script>

<template>
  <div class="itemmusictop">
    <img class="background" :src="props.coverImgUrl" />
    <div class="itemleft">
      <van-icon name="arrow-left" @click="goback" />
      <span>歌单</span>
    </div>
    <div class="itemright">
      <van-icon name="search" size="25" />
      <van-icon name="coupon-o" size="25" />
    </div>
  </div>
  <div class="itemtopcontent">
    <div class="contentleft">
      <img :src="props.coverImgUrl" />
    </div>
    <div class="contentright">
      <p class="rightP_one">{{ props.name }}</p>
      <div class="right_img">
        <img :src="props.avatarUrl" />
        <span>{{ props.nickname }}</span>
        <van-icon name="arrow" />
      </div>
      <div class="rightP_two">
        <p>{{ props.description }}</p>
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
  <div class="itemtopnav">
    <div class="navitem">
      <van-icon name="chat-o" :size="20"/>
      <span>{{ props.commentCount }}</span>
    </div>
    <div class="navitem">
      <van-icon name="share-o" :size="20"/>
      <span>{{ props.shareCount }}</span>
    </div>
    <div class="navitem">
      <van-icon name="down" :size="20"/>
      <span>下载</span>
    </div>
    <div class="navitem">
      <van-icon name="diamond-o" :size="20"/>
      <span>多选</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.itemmusictop {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .itemleft,
  .itemright {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin: 0 10px;
    span {
      font-size: 20px;
      color: #fff;
    }
    .van-icon {
      color: #fff;
    }
  }
  .background {
    width: 100%;
    height: 550px;
    position: fixed;
    z-index: -1;
    filter: blur(30px);
  }
}
.itemtopcontent {
  height: 150px;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .contentleft {
    width: 130px;
    height: 130px;
    position: relative;
    margin-right: 10px;
    img {
      width: 130px;
      height: 130px;
      border-radius: 20px;
    }
  }
  .contentright {
    width: 60%;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .rightP_one {
      font-size: 15px;
      font-weight: 500;
      color: darkkhaki;
    }
    .right_img {
      height: 30px;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
      }
      span {
        color: blueviolet;
        padding: 5px;
      }
      .icon {
        width: 13px;
        height: 13px;
        margin-top: 4px;
        vertical-align: middle;
      }
    }
    .rightP_two {
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        display: block;
        width: 95%;
        height: 100%;
        font-size: 12px;
        overflow: hidden;
        color: darkgray;
      }
      .icon {
        width: 12px;
        height: 12px;
      }
    }
  }
}
.itemtopnav {
  height: 70px;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  .navitem {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    span {
      display: block;
      margin-top: 10px;
      line-height: 20px;
    }
  }
}
</style>
