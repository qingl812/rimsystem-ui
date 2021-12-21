import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import '../themes/element_ui.scss'
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// mock
if (process.env.NODE_ENV === 'development') {
	require('../mock/index.ts')
}

// axios
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(function (config: AxiosRequestConfig) {
	const token = localStorage.getItem('token')
	if (token && config && config.headers) {
		config.headers.token = token;
	}
	return config;
}, function (error) {
	// TODO: 没有经过测试
	// 处理响应错误
	localStorage.removeItem("token");
	return Promise.reject(error);
});
// 添加一个响应拦截器，在 header 中右 new_token 时更新 token
// TODO: 没有经过测试
axios.interceptors.response.use(function (response: AxiosResponse) {
	const new_token = response.headers.new_token;
	if (new_token) {
		localStorage.setItem("token", new_token);
	}
	return response;
}, function (error) {
	// 处理响应错误
	return Promise.reject(error);
});

Vue.use(ElementUI);
Vue.config.productionTip = false;
new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");

