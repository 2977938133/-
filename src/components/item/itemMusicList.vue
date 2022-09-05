<script setup lang="ts">
import {
  nextTick,
  onBeforeMount,
  onBeforeUpdate,
  onMounted,
  onUpdated,
  reactive,
  toRefs,
  watch,
} from "vue";
import { useStore } from "../../pinia/index";
import { storeToRefs } from "pinia";
const props = defineProps<{
  itemlist: any[];
  subscribedCount: number;
  checkid: number;
}>();
console.log(props.itemlist);
const store = useStore();
const { isbtnshow } = storeToRefs(store);
const { updateplaylist, updateplaylistindex } = store;
const playmusic = (i: number) => {
  updateplaylist(props.itemlist);
  updateplaylistindex(i);
  isbtnshow.value = true;
};

onBeforeMount(() => {
  console.log("子组件onBeforeMount");
});
onMounted(() => {
  console.log("子组件onMounted");
});
onBeforeUpdate(() => {
  console.log("子组件onBeforeUpdate");
});
onUpdated(() => {
  console.log("子组件onUpdated");
});
</script>

<template>
  <div class="itemMusicList">
    <div class="itemListTop">
      <div class="listLeft">
        <van-icon name="play-circle-o" :size="25" />
        <span
          >播放全部<span>(共{{ itemlist.length }}首)</span></span
        >
      </div>
      <div class="listRight">
        <van-icon name="star-o" />
        <span>收藏{{ (subscribedCount / 10000).toFixed(1) + "万" }}</span>
      </div>
    </div>
    <!-- <div class="itemListContent">
      <div class="itemList" v-for="(item, i) in itemlist" :key="i">
        <div class="listLeft" @click="playmusic(i)">
          <span class="index">{{ i + 1 }}</span>
          <div class="content">
            <p>{{ item.name }}</p>
            <span v-for="(ar, index) in item.ar" :key="index">
              {{ ar.name }}&nbsp
            </span>
          </div>
        </div>
        <div class="listRight">
          <van-icon class="playmusic" name="music-o" :size="25" />
          <van-icon
            class="playvideo"
            name="video-o"
            v-if="item.mv"
            :size="25"
          />
          <van-icon class="more" name="ellipsis" :size="15" />
        </div>
      </div>
      <div class="block"></div>
    </div> -->
    <div class="Grid" v-for="(item, i) in itemlist" :key="i">
      <div class="g-1" @click="playmusic(i)">{{ i + 1 }}</div>
      <div class="g-2" @click="playmusic(i)">
        <p>{{ item.name }}</p>
        <div class="double">
          <span v-for="(ar, index) in item.ar" :key="index">
            {{ ar.name }}
          </span>
        </div>
      </div>
      <div class="g-3">
        <div class="musicvideo">
          <van-icon class="music" name="music-o" :size="25" />
          <van-icon class="video" name="video-o" v-show="item.mv" :size="25" />
        </div>

        <van-icon class="more" name="ellipsis" :size="20" />
      </div>
      <!-- <div class="itemList" v-for="(item, i) in itemlist" :key="i">
        <div class="listLeft" @click="playmusic(i)">
          <span class="index">{{ i + 1 }}</span>
          <div class="content">
            <p>{{ item.name }}</p>
            <span v-for="(ar, index) in item.ar" :key="index">
              {{ ar.name }}&nbsp
            </span>
          </div>
        </div>
        <div class="listRight">
          <van-icon class="playmusic" name="music-o" :size="25" />
          <van-icon
            class="playvideo"
            name="video-o"
            v-if="item.mv"
            :size="25"
          />
          <van-icon class="more" name="ellipsis" :size="15" />
        </div>
      </div> -->
      <div class="block"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.itemMusicList {
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
  background-color: rgb(241, 239, 243);
  height: auto;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  .itemListTop {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    .listLeft {
      display: flex;
      align-items: center;
      .van-icon {
        color: aquamarine;
      }
      span {
        font-size: 16px;
      }
    }
    .listRight {
      display: flex;
      align-items: center;
      .van-icon {
        color: crimson;
      }
      span {
        font-size: 14px;
      }
    }
  }
  // .itemListContent {
  //   width: 100%;
  //   .itemList {
  //     height: 80px;
  //     display: flex;
  //     border-bottom: 1px solid rgb(187, 175, 175);
  //     justify-content: space-between;
  //     padding: 10px;
  //     .listLeft {
  //       width: 70%;
  //       display: flex;
  //       align-items: center;
  //       padding: 10px;
  //       .index {
  //         font-size: 16px;
  //         padding-right: 10px;
  //       }
  //       .content {
  //         padding: 10px;
  //         p {
  //           font-size: 16px;
  //           margin-top: 16px;
  //           font-weight: 700;
  //         }
  //         span {
  //           display: inline-block;
  //           font-size: 12px;
  //           margin-top: -5px;
  //           margin-bottom: 10px;
  //         }
  //       }
  //     }
  //     .listRight {
  //       width: 30%;
  //       height: auto;
  //       display: flex;
  //       align-items: center;
  //       position: relative;
  //       justify-content: space-between;
  //       padding: 0 10px;
  //       .playmusic {
  //         margin-right: 20px;
  //         position: absolute;
  //       }
  //       .playvideo {
  //         margin-left: 40px;
  //       }
  //       .more {
  //         right: 0;
  //         margin-right: 5px;
  //         position: absolute;
  //       }
  //     }
  //   }
  // }
  .Grid {
    display: flex;
    border-bottom: 1px solid rgb(255, 0, 0);
    height: 86px;
    .g-1 {
      flex: 0 0 10%;
      height: 86px;
      line-height: 86px;
      text-align: center;
    }
    .g-2 {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      padding: 10px;
      p {
        height: 25px;
        line-height: 25px;
        margin-top: 5px;
        margin-bottom: 8px;
        margin-left: 5px;
        overflow: hidden;
        font-weight: 600;
      }
      .double {
        span {
          margin-left: 5px;
        }
      }
    }
    .g-3 {
      flex: 0 0 30%;
      display: flex;
      align-items: center;
      .musicvideo {
        flex: 0 0 76%;
        display: flex;
        .music {
          flex: 0 0 50%;
          margin-left: 5px;
        }
        .video {
          flex: 0 0 50%;
          margin-right: 5px;
        }
      }

      .more {
        flex: 0 0 24%;
      }
    }
  }
}
</style>
