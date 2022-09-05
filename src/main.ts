import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// import "element-plus/theme-chalk/dark/css-vars.css";
// import "./styles/dark/css-vars.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import Vant from "./plugins/index";
import { createPinia } from "pinia";
import router from "./router/index";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
Vant(app);
app
  .use(ElementPlus)
  .use(createPinia())
  .use(router)
  .mount("#app");
