import { defineStore } from "pinia";
import { useRouter } from "vue-router";
export const usecommon = defineStore("common", () => {
  const router = useRouter();
  const back = () => {
    router.go(-1);
  };
  return { back }
});
