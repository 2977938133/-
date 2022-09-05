<script setup lang="ts">
import { useStore } from "../../pinia/index";
import { storeToRefs } from "pinia";
import { onMounted, onUpdated, reactive, Ref, ref, watch } from "vue";
import Musicshow from "./musicshow.vue";
import { getcheck } from "../../request/api";
import { ElMessage } from "element-plus";
const store = useStore();
const { playlist, playlistindex, isbtnshow, show, currenttime } = storeToRefs(store);
const { updateisbtnshow, showPopup,getmusiclyric,updatecurrenttime,updateduration } = store;
const audio: Ref<any> = ref(null);
const play = () => {
  getcheck(playlist.value[playlistindex.value].id).then((checked) => {
    console.log(checked);
    if (checked.data.success == true) {
      if (audio.value.paused) {
        audio.value.play();
        updateisbtnshow(false);
      } else {
        audio.value.pause();
        updateisbtnshow(true);
      }
    } else {
      ElMessage.warning("亲爱的，暂无授权");
    }
  });
};
const updateTime = () => {
    updatecurrenttime(audio.value.currentTime)
}
const addDuration = () => {
  updateduration(audio.value.duration)
}
watch(
  () => playlistindex.value,
  () => {
    audio.value.autoplay = true;
    updateisbtnshow(false);
  }
);
watch(
  () => playlist.value,
  () => {
    if (isbtnshow) {
      audio.value.autoplay = true;
      updateisbtnshow(false);
    }
  }
);
console.log(audio);

onMounted(() => {
  getmusiclyric(playlist.value[playlistindex.value].id)
});
onUpdated( () => {
  getmusiclyric(playlist.value[playlistindex.value].id)
  addDuration()
})
</script>

<template>
  <div class="footermusic">
    <div class="footerleft" @click="showPopup">
      <img :src="playlist[playlistindex].al.picUrl" />
      <div class="border">
        <p>{{ playlist[playlistindex].name }}</p>
        <span>横滑切换上下首</span>
      </div>
    </div>
    <div class="footerright">
      <van-icon name="play" :size="25" @click="play" v-if="isbtnshow" />
      <van-icon
        name="pause-circle-o"
        :size="25"
        @click="play"
        v-if="!isbtnshow"
      />
      <van-icon name="bars" :size="25" />
    </div>
    <audio
      ref="audio"
      @timeupdate="updateTime"
      :src="`https://music.163.com/song/media/outer/url?id=${playlist[playlistindex].id}.mp3`"
    ></audio>
    <van-popup
      v-model:show="show"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
    >
      <Musicshow
        :musicname="playlist[playlistindex].name"
        :arname="playlist[playlistindex].ar[0].name"
        :pic-url="playlist[playlistindex].al.picUrl"
        @play="play"
        :isbtnshow="isbtnshow"
        @addDuration="addDuration"
      />
    </van-popup>
  </div>
</template>

<style scoped lang="less">
.footermusic {
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 70px;
  background-color: rgb(221, 66, 87);
  display: flex;
  padding: 10px;
  justify-content: space-between;
  .footerleft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .border {
      position: relative;
      p {
        width: 150px;
        font-weight: 700;
        margin-bottom: 5px;
      }
      span {
        display: block;
        margin-bottom: 15px;
      }
    }
  }
  .footerright {
    width: 18%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
