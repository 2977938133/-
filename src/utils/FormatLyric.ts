import { Lyric } from "../type/index";
export const FormatLyric = ((lyric: string): Lyric[] => {
  let arr: Lyric[] = [];
  arr = lyric.split("\n").map((item): Lyric => {
    let minute = Number(item.slice(1, 3));
    let second = Number(item.slice(4, 6));
    let millsecond = Number(item.slice(7, 10));
    let lrc = item.slice(11, item.length);
    let time = minute * 60 * 1000 + second * 1000 + millsecond;
    if (isNaN(millsecond)) {
      millsecond = Number(item.slice(7, 9));
      lrc = item.slice(10, item.length);
      time = minute * 60 * 1000 + second * 1000 + millsecond;

    }
    return { minute, second, millsecond, lrc, time, nexttime: 0 };
  });
  arr.forEach((item, i) => {
    if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
      item.nexttime = 100000;
    } else {
      item.nexttime = arr[i + 1].time;
    }
  });
  console.log(arr);
  return arr;
});
