import { createApp } from "vue";
import App from "./App.vue";
// eslint-disable-next-line import/extensions, import/no-unresolved
import router from "./router";

createApp(App).use(router).mount("#app");
