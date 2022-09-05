<script setup lang="ts">
import {
  isReactive,
  isRef,
  nextTick,
  onBeforeMount,
  onBeforeUpdate,
  onMounted,
  onUpdated,
  reactive,
  ref,
  toRef,
  toRefs,
  watch,
  watchEffect,
} from "vue";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
import { getplaylist, gettrack, getcheck } from "../request/api";
import ItemMusicTop from "../components/item/itemMusicTop.vue";
import ItemMusicList from "../components/item/itemMusicList.vue";
const route: RouteLocationNormalizedLoaded = useRoute();
const id: any = route.query.id;
const state = reactive({
  playlist: {
    coverImgUrl: "",
    creator: {
      avatarUrl: "",
      nickname: "",
    },
    commentCount: 0,
    shareCount: 0,
    name: "",
    description: "",
    tracks: [],
    subscribedCount: 0,
  },
});
const { tracks, subscribedCount } = toRefs(state.playlist);
watch(
  () => tracks.value,
  (newvalue, oldvalue) => {
    tracks.value = newvalue;
  }
);
const data = reactive({
  itemlist: [
    {
      name: "",
      id: 0,
      al: {
        name: "",
      },
    },
  ],
});
const { itemlist } = toRefs(data);
getplaylist(id).then((res) => {
  Object.assign(state.playlist, res.data.playlist);
  tracks.value = res.data.playlist.tracks;
  subscribedCount.value = res.data.playlist.subscribedCount;
  console.log(res);
});
watchEffect(async () => {
  console.log("父组件onBeforeUpdate");
  try {
    const result = await gettrack(Number(id), tracks.value.length);
    for (const iterator of result.data.songs) {
      itemlist.value.push(iterator);
    }
    itemlist.value.splice(0, 1);
    console.log(itemlist.value);
  } catch (error) {
    console.log(error);
  }
});
onMounted(() => {
  console.log("onMounted");
});
onBeforeUpdate(() => {
  console.log("父组件onBeforeUpdate");
});
onUpdated(() => {
  console.log("父组件onUpdate");
});
</script>

<template>
  <div>
    <ItemMusicTop
      :coverImgUrl="state.playlist.coverImgUrl"
      :avatarUrl="state.playlist.creator.avatarUrl"
      :nickname="state.playlist.creator.nickname"
      :comment-count="state.playlist.commentCount"
      :share-count="state.playlist.shareCount"
      :name="state.playlist.name"
      :description="state.playlist.description"
    />
    <ItemMusicList
      :itemlist="itemlist"
      :subscribed-count="state.playlist.subscribedCount"
      :checkid="Number(id)"
    />
  </div>
</template>

<style scoped lang="less"></style>
