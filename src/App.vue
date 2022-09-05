<script setup lang="ts">
import FooterMusic from './components/item/FooterMusic.vue';
import { useStore } from "./pinia/index";
import { storeToRefs } from "pinia";
const store = useStore()
const { isshowfootermusic } = storeToRefs(store)
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
<router-view />
<footer-music v-show="isshowfootermusic" />
</template>

<style scoped lang="less">
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    height: 100%;
    font-size: 16px;
    color:black
}
</style>
