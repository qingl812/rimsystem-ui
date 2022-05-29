import router from "@/router";
import { ElMessage } from "element-plus";
import { LocationQuery } from "vue-router";
import store from "@/store";

export class Tools {
	// 单例模式
	private static _instance: Tools | undefined;
	static get instance(): Tools {
		if (this._instance == undefined) {
			this._instance = new Tools();
		}
		return this._instance;
	}

	// 成功消息提示
	public success(msg: string) {
		ElMessage({
			message: msg,
			type: "success",
		});
	}
	// 错误消息提示
	public error(msg: string) {
		ElMessage({
			message: msg,
			type: "warning",
		});
	}

	// 添加参数到 vue router
	public add_router_param(key: string, value: string) {
		const route = router.currentRoute.value;
		const query = JSON.parse(JSON.stringify(route.query));
		if (query[key] != value) {
			query[key] = value;
			router.push({ path: route.path, query });
		}
	}
	// 覆盖 vue router 参数
	public router_param(params: LocationQuery) {
		const route = router.currentRoute.value;
		const query = JSON.parse(JSON.stringify(route.query));
		if (JSON.stringify(query) != JSON.stringify(params)) {
			router.push({ path: route.path, query: params });
		}
	}
	// 获取参数
	public get_router_param(key: string): string {
		const query = window.location.search.substring(1);
		const vars = query.split("&");
		for (let i = 0; i < vars.length; i++) {
			const pair = vars[i].split("=");
			if (pair[0] == key) {
				return pair[1];
			}
		}
		return "";
	}
	// 跳转到指定 url 和参数
	public set_router(url: string, params: LocationQuery) {
		const route = router.currentRoute.value;
		const path = route.path;
		const query = JSON.parse(JSON.stringify(route.query));
		if (path != url || JSON.stringify(query) != JSON.stringify(params)) {
			router.push({ path: url, query: params });
		}
	}

	public logout() {
		console.log("hello")
		if (store.state.page_status != "unlogged") {
			this.success("退出登录");
			store.commit("set_page_status", "unlogged");
		}
	}
}

export default Tools.instance;
