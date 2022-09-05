import vue from "@vitejs/plugin-vue";
import { UserConfigExport } from "vite";
import {
  createStyleImportPlugin,
  VantResolve,
  ElementPlusResolve
} from "vite-plugin-style-import";
export default (): UserConfigExport => {
  return {
    plugins: [
      vue(),
      createStyleImportPlugin({
        resolves: [
          VantResolve(),
          ElementPlusResolve(),
        ],
        libs: [
          // 如果没有你需要的resolve，可以在lib内直接写，也可以给我们提供PR
          {
            libraryName: "vant",
            esModule: true,
            resolveStyle: (name) => {
              return `../es/${name}/style`;
            },
          },
        ],
      }),
    ],
  };
};
