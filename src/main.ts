import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import ElementUI from "element-ui";
import "@/styles/element_ui.scss";
import BaiduMap from "vue-baidu-map";
import { MyAxios } from "@/typings/MyAxios";

Vue.config.productionTip = false;

Vue.use(ElementUI); // element ui
Vue.use(BaiduMap, { ak: "HpA4MtzOdUZ9Ywnum4HHwtnbwcIrn0Hc" }); // baidu map
Vue.config.ignoredElements = [/^ion-/]; //ion-icon
MyAxios.init(); // axios

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
