<script setup lang="ts">
import { reactive, ref } from "vue";
import { postlogin,getuser } from "../request/api";
import { useStore } from "../pinia/index";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const { Token } = storeToRefs(useStore());
const router = useRouter()
const phone = ref("");
const password = ref("");
interface User{
  nickname:string,
  avatarUrl:string,
  id:number
}
const user:User = reactive({
  nickname:'',
  avatarUrl:'',
  id:0
})
const onSubmit = () => {
  postlogin(phone.value, password.value).then((res) => {
    console.log(res);
    if (res.data.code == 502) {
      ElMessage({
        message: `${res.data.msg}`,
        type: "warning",
      });
    }
    if (res.data.code == 200) {
      ElMessage({
        message: "登录成功",
        type: "success",
      });
      Token.value = res.data.token;
      localStorage.setItem("token", Token.value);
      user.nickname = res.data.profile.nickname
      user.avatarUrl = res.data.profile.avatarUrl
      user.id = res.data.account.id
      localStorage.setItem('User',JSON.stringify(user))
      const result = getuser(res.data.account.id)
      console.log(result);
      router.push({
        name:'Home'
      });
    }
  });
};
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="phone"
        name="用户名"
        label="用户名"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<style scoped lang="less"></style>
