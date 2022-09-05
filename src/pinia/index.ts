import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { getlyric } from "../request/api";
export const useStore = defineStore("main", () => {
  const playlist = ref([
    {
      al: {
        id: 19115,
        name: "有个人",
        pic: 129742372092479,
        picUrl:
          "https://p1.music.126.net/F84FQQ_AicIW8N2DO_6fqQ==/129742372092479.jpg",
      },
      ar: [
        {
          id: 6460,
          name: "张学友",
        },
      ],
      name: "有个人",
      id: 188927,
    },
  ]);
  const playlistindex = ref(0);
  const isbtnshow = ref(true);
  const show = ref(false);
  const lrc = reactive({
    lyric: "",
  });
  const currenttime = ref(0);
  const duration = ref(0);
  const islogin = ref(false);
  const isshowfootermusic = ref(true);
  const Token = ref('')
  function updateisbtnshow(value: boolean) {
    isbtnshow.value = value;
  }
  function updateplaylist(value: any[]) {
    playlist.value = value;
    console.log(playlist);
  }
  function updateplaylistindex(value: number) {
    playlistindex.value = value;
  }
  const showPopup = () => {
    show.value = !show.value;
  };
  async function getmusiclyric(value: number) {
    try {
      const res = await getlyric(value);
      updatelyriclist(res.data.lrc.lyric);
    } catch (error) {
      console.log(error);
    }
  }
  const updatelyriclist = (value: string) => {
    lrc.lyric = value;
    console.log(lrc);
  };
  const updatecurrenttime = (value: number) => {
    console.log(currenttime.value);
    currenttime.value = value;
  };
  const updateduration = (value: number) => {
    duration.value = value;
  };
  const addplaylist = (value: any) => {
    playlist.value.push(value);
  };
  return {
    playlist,
    playlistindex,
    isbtnshow,
    show,
    updateisbtnshow,
    updateplaylist,
    updateplaylistindex,
    showPopup,
    getmusiclyric,
    updatelyriclist,
    lrc,
    currenttime,
    updatecurrenttime,
    duration,
    updateduration,
    addplaylist,
    islogin,
    isshowfootermusic,
    Token
  };
});
