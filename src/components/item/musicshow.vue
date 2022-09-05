<script setup lang="ts">
import { storeToRefs } from "pinia";
import {
  computed,
  onBeforeMount,
  onBeforeUpdate,
  onMounted,
  onUpdated,
  Ref,
  ref,
  watch,
  watchEffect,
} from "vue";
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { useStore } from "../../pinia/index";
import { FormatLyric } from "../../utils/FormatLyric";
const store = useStore();
const { isbtnshow, lrc, currenttime, playlistindex, playlist,duration } =
  storeToRefs(store);
const { showPopup, updateplaylistindex } = store;
const props = defineProps<{
  musicname: string;
  arname: string;
  picUrl: string;
  isbtnshow: boolean;
}>();
const emit = defineEmits<{
  (event: "play"): void;
  ( event: 'addDuration' ):void
}>();
const playbtn = () => {
  emit("play");
};
const addDuration = () => {
  emit('addDuration')
}
const lyricshow = ref(true);
const changelyricshow = () => {
  lyricshow.value = !lyricshow.value;
};
const backback = () => {
  showPopup();
  lyricshow.value = true;
};

const musiclyric: Ref<HTMLElement | null> = ref(null);
watch(
  () => currenttime.value,
  (newvalue) => {
    let p = document.querySelector("p.p_active") as HTMLElement;
    if (p) {
      if (p.offsetTop > 300) {
        musiclyric.value!.scrollTop = p.offsetTop - 300;
      }
      console.log(musiclyric);
    }
    if(newvalue == duration.value){
      if(playlistindex.value === playlist.value.length-1){
        updateplaylistindex(0)
        playbtn()
      }else{
        updateplaylistindex(playlistindex.value)
      }
    }
  }
);
const goPlay = (value: number) => {
  let index = playlistindex.value + value;
  if (index < 0) {
    index = playlist.value.length - 1;
  } else if (index == playlist.value.length) {
    index = 0;
  }
  updateplaylistindex(index+1);
};
console.log(props.musicname);
onBeforeMount(() => {
  console.log("子组件onBeforeMount");
});
onMounted(() => {
  console.log("子组件onMounted");
  addDuration()
});
onBeforeUpdate(() => {
  console.log("子组件onBeforeUpdate");
});
onUpdated(() => {
  console.log("子组件onUpdated");
});
</script>

<template>
  <img :src="picUrl" class="picurl" />
  <div class="detailtop">
    <div class="detailtopleft">
      <van-icon name="arrow-left" :size="25" @click="backback" />
      <div class="leftright">
        <Vue3Marquee :duration="10" class="marquee">{{
          musicname
        }}</Vue3Marquee>
        <div class="leftrightbottom">
          <span>{{ arname }}</span>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <div class="detailtopright">
      <van-icon name="qq" />
    </div>
  </div>
  <div class="detailcontent" v-show="lyricshow" @click="changelyricshow">
    <img
      src="../../assets/needle-ab.png"
      :class="[isbtnshow ? 'needle' : 'needle_active']"
    />
    <img src="../../assets/cd.png" class="cd" />
    <img
      :src="picUrl"
      class="activeimg"
      :class="[isbtnshow ? 'activeimg_paused' : 'activeimg_running']"
    />
  </div>
  <div class="lyric" ref="musiclyric" v-show="!lyricshow">
    <p
      v-for="(item, index) in FormatLyric(lrc.lyric)"
      :key="index"
      :class="{
        p_active:
          currenttime * 1000 >= item.time &&
          currenttime * 1000 < item!.nexttime,
      }"
    >
      {{ item.lrc }}
    </p>
  </div>
  <div class="detailfooter">
    <div class="footertop">
      <van-icon name="like" :size="25" />
      <van-icon name="down" :size="25" />
      <van-icon name="live" :size="25" />
      <van-icon name="chat-o" :size="25" />
      <van-icon name="exchange" :size="25" />
    </div>
    <div class="footercontent">
      <el-slider :show-tooltip="false" :min="0" v-model="currenttime" :max="duration"/>
    </div>
    <div class="footer">
      <van-icon name="revoke" :size="30" />
      <van-icon name="arrow-left" :size="30" @click="goPlay(-1)" />
      <van-icon name="play" v-if="isbtnshow" :size="35" @click="playbtn" />
      <van-icon name="pause" v-else :size="35" @click="playbtn" />
      <van-icon name="arrow" :size="30" @click="goPlay(1)" />
      <van-icon name="bars" :size="30" />
    </div>
  </div>
</template>

<style scoped lang="less">
.picurl {
  width: 100%;
  height: 100%;
  filter: blur(50px);
  position: absolute;
  z-index: -1;
}
.detailtop {
  width: 100%;
  display: flex;
  z-index: 1;
  .detailtopleft {
    width: 70%;
    display: flex;
    .van-icon {
      display: flex;
      margin-left: 10px;
      align-items: center;
    }
    .leftright {
      margin-left: 15px;
      .marquee {
        margin-top: 10px;
        font-size: 16px;
        width: 150px;
      }
      .leftrightbottom {
        display: flex;
        margin-top: 5px;
        span {
          font-size: 12px;
        }
        .van-icon {
          margin-top: 0px;
        }
      }
    }
  }
  .detailtopright {
    display: flex;
    width: 30%;
    .van-icon {
      display: flex;
      align-items: center;
      margin: 0 auto;
    }
  }
}
.detailcontent {
  width: 100%;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .needle {
    width: 100px;
    height: 150px;
    position: absolute;
    left: 47%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }
  .needle_active {
    width: 100px;
    height: 150px;
    position: absolute;
    left: 47%;
    transform-origin: 0 0;
    transform: rotate(6deg);
    transition: all 2s;
  }
  .cd {
    width: 250px;
    height: 250px;
    position: absolute;
    bottom: 100px;
    z-index: -1;
  }
  .activeimg {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    position: absolute;
    bottom: 145px;
    animation: rotate 10s linear infinite;
  }
  .activeimg_running {
    animation-play-state: running;
  }
  .activeimg_paused {
    animation-play-state: paused;
  }
  @keyframes rotete {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.lyric {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  overflow: scroll;
  p {
    color: rgb(191, 250, 250);
    margin-bottom: 10px;
  }
  .p_active {
    color: chartreuse;
    font-size: 20px;
  }
}
.detailfooter {
  width: 100%;
  height: 150px;
  position: absolute;
  bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footertop {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  // .footercontent {
  // }
  .footer {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 0px;
  }
}
</style>
