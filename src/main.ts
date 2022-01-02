import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// mock
if (process.env.NODE_ENV === "development") {
	require("../mock/index.ts");
}

// axios
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
	function (config: AxiosRequestConfig) {
		const authentication = localStorage.getItem("authentication");
		if (authentication && config && config.headers) {
			config.headers.authentication = authentication;
		}
		return config;
	},
	function (error) {
		// TODO: 没有经过测试
		// 处理响应错误
		localStorage.removeItem("authentication");
		return Promise.reject(error);
	}
);
// 添加一个响应拦截器，在 header 中有 new_token 时更新 token
// TODO: 没有经过测试
axios.interceptors.response.use(
	function (response: AxiosResponse) {
		const authentication = localStorage.getItem("authentication");
		const new_authentication = response.headers.authentication;
		if (authentication != new_authentication) {
			localStorage.setItem("authentication", new_authentication);
		}
		return response;
	},
	function (error) {
		// 处理响应错误
		return Promise.reject(error);
	}
);

// element ui
import ElementUI from "element-ui";
import "../themes/element_ui.scss";
Vue.use(ElementUI);

// baidu map
import BaiduMap from "vue-baidu-map";
Vue.use(BaiduMap, { ak: "HpA4MtzOdUZ9Ywnum4HHwtnbwcIrn0Hc" });

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/^ion-/]; //ion-icon
new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
