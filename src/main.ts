import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/styles/global.scss";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import tools from "@/typings/Tools";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// axios config
axios.defaults.baseURL = "https://dev.winterwonder.top/";
// 添加请求拦截器，在请求头中加 token
axios.interceptors.request.use(
	function (config: AxiosRequestConfig) {
		if (store.state.page_status != "unlogged" && config && config.headers) {
			config.headers.authentication = store.state.token;
		}
		return config;
	},
	function (error) {
		// 处理响应错误
		tools.logout();
		return Promise.reject(error);
	}
);
// 添加一个响应拦截器，在 header 中有 new_token 时更新 token
// axios.interceptors.response.use(
// 	function (response: AxiosResponse) {
// 		const authentication = localStorage.getItem("authentication");
// 		const new_authentication = response.headers.authentication;
// 		if (authentication != new_authentication) {
// 			localStorage.setItem("authentication", new_authentication);
// 		}
// 		return response;
// 	},
// 	function (error) {
// 		// 处理响应错误
// 		return Promise.reject(error);
// 	}
// );
// 添加一个响应拦截器，在服务器返回 401 时退回到登陆界面
axios.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error) => {
		// 处理响应错误
		if (error.response.status == 401) {
			tools.logout();
		}
		return Promise.reject(error);
	}
);

export const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);
for (const [key, comp] of Object.entries(ElementPlusIconsVue)) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	app.component(key, comp as any);
}
app.mount("#app");
