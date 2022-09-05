<script setup lang="ts">
import { onMounted, onUpdated, reactive, ref, toRefs } from "vue";
import { getSearch } from "../request/api";
import { useStore } from "../pinia/index";
import { usecommon } from "../pinia/common";
import { storeToRefs } from "pinia";
const { back } = usecommon()
const store = useStore();
const { isbtnshow,playlist } = storeToRefs(store);
const { updateplaylist, updateplaylistindex, addplaylist } = store;
const keywordlist = ref<string[]>([]);
const searchkey = ref("");
const searchlist = ref<any[]>([]);

const search = async () => {
  if (searchkey.value !== "") {
    keywordlist.value.unshift(searchkey.value);
    //重复的属性去掉
    keywordlist.value = [...new Set(keywordlist.value)];
    //统一规划历史记录的长度，超过这个长度就把最开始的那一条记录给删除
    if (keywordlist.value.length > 10) {
      keywordlist.value.pop();
    }
    localStorage.setItem("keywordlist", JSON.stringify(keywordlist.value));
    const res = await getSearch(searchkey.value);
    searchlist.value = res.data.result.songs;
    console.log(res);

    searchkey.value = "";
    console.log("添加的", keywordlist.value);
  }
};
const deletehistory = (index: number) => {
  keywordlist.value = keywordlist.value.filter((item, i) => {
    return i !== index;
  });
  localStorage.setItem("keywordlist", JSON.stringify(keywordlist.value));
  console.log("删除后的数组长度", keywordlist.value.length);
  if (keywordlist.value.length == 0) {
    localStorage.removeItem("keywordlist");
  }
};
const searchhistory = async (item: {}) => {
  const res = await getSearch(item);
  searchlist.value = res.data.result.songs;
  console.log(res);
};
const playmusic = (item:any,i: number) => {
  
  addplaylist(item);
  updateplaylistindex(playlist.value.length-1);
  isbtnshow.value = true;
  console.log(playlist);
  
};
onMounted(() => {
  if (localStorage.getItem("keywordlist") !== null) {
    keywordlist.value = JSON.parse(localStorage.getItem("keywordlist") || "[]");
  }
});
</script>

<template>
  <div class="searchtop">
    <van-icon name="arrow-left" :size="25" @click="back"/>
    <el-input
      v-model="searchkey"
      :placeholder="keywordlist[0]"
      @keydown.enter="search"
    />
    <van-icon name="search" size="25" @click="search" />
  </div>
  <div class="searchHistory">
    <div class="record">
      <span>历史记录</span>
    </div>
    <div class="history">
      <span
        v-for="(item, index) in keywordlist"
        :key="index"
        class="search"
        @click="searchhistory(item)"
      >
        {{ item }}
        <van-icon name="cross" @click="deletehistory(index)" />
      </span>
    </div>
  </div>
  <div class="itemListContent">
      <div class="itemList" v-for="(item, i) in searchlist" :key="i" @click="playmusic(item,i)">
        <div class="listLeft">
          <span class="index">{{ i + 1 }}</span>
          <div class="content">
            <p>{{ item.name }}</p>
            <span v-for="(i, index) in item.ar" :key="index">
              {{ i.name }}&nbsp
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
    </div>
</template>

<style scoped lang="less">
.searchtop {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  input {
    margin-left: 10px;
    border: none;
    border-bottom: 1px solid #fff;
    width: 75%;
    padding: 5px;
  }
}
.searchHistory {
  width: 100%;
  position: relative;
  .record {
    font-weight: 600;
    margin-left: 10px;
  }
  .history {
    .search {
      border: 4px solid transparent;
      border-radius: 16px;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      background-image: linear-gradient(to right, #fff, #fff),
        linear-gradient(90deg, #8f41e9, #578aef);
      padding: 5px 10px;
      margin: 5px 10px;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      width: auto;
    }
  }
}
.itemListContent {
    width: 100%;
    .itemList {
      height: 80px;
      display: flex;
      border-bottom: 1px solid rgb(187, 175, 175);
      justify-content: space-between;
      padding: 10px;
      .listLeft {
        width: 70%;
        display: flex;
        align-items: center;
        padding: 10px;
        .index {
          font-size: 16px;
          padding-right: 10px;
        }
        .content {
          padding: 10px;
          p {
            font-size: 16px;
            margin-top: 16px;
            font-weight: 700;
          }
          span {
            display: inline-block;
            font-size: 12px;
            margin-top: -5px;
            margin-bottom: 10px;
          }
        }
      }
      .listRight {
        width: 30%;
        height: auto;
        display: flex;
        align-items: center;
        position: relative;
        justify-content: space-between;
        padding: 0 10px;
        .playmusic {
          margin-right: 20px;
          position: absolute;
        }
        .playvideo {
          margin-left: 40px;
        }
        .more {
          right: 0;
          margin-right: 5px;
          position: absolute;
        }
      }
    }
  }
</style>
