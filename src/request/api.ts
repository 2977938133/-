import  requset  from "./index";
//获取轮播图
export const getBanners = () => {
  return requset({
    method:'get',
    url:'/banner?type=2'
  })
}
//获取推荐歌单
export const getMusicList = () => {
  return requset({
    method:'get',
    url:'/personalized?limit=10'
  })
}
//获取歌单详情
export const getplaylist = (id:number) => {
  return requset({
    method:'get',
    url:`/playlist/detail?id=${id}`
  })
}
//获取歌单所有歌曲
export const gettrack = (id:number,limit:number) => {
  return requset({
    method:'get',
    url:`/playlist/track/all?id=${id}&limit=${limit}&offset=0`
  })
}
//检查是否可用
export const getcheck = (id:number) => {
  return requset({
    method:'get',
    url:`/check/music?id=${id}`
  })
}
//获取歌词
export const getlyric = (id:number) => {
  return requset({
    method:'get',
    url:`/lyric?id=${id}`
  })
}
//搜索/search?keywords=海阔天空
export const getSearch = (value:any) => {
  return requset({
    method:'get',
    url:`/cloudsearch?keywords=${value}`
  })
}
//手机登录
export const postlogin = (phone:string,password:string) => {
  return requset({
    method:'post',
    url:`/login/cellphone?phone=${phone}&password=${password}`
  })
}
//获取用户详情/user/detail?uid=32953014
export const getuser = (uid:number) => {
  return requset({
    method:'post',
    url:`/user/detail?uid=${uid}`
  })
}