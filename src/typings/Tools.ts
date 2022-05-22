/* eslint-disable @typescript-eslint/no-explicit-any */
import router from "@/router";
import { Vue } from "vue-property-decorator";

export class Tools extends Vue {
	// 添加参数到 vue router
	public static addRouterParam(key: string, value: string) {
		const route = router.currentRoute;
		const query = JSON.parse(JSON.stringify(route.query));
		if (query[key] != value) {
			query[key] = value;
			router.push({ path: route.path, query });
		}
	}

	// 添加参数到 vue router
	public static routerParam(params: any) {
		const route = router.currentRoute;
		const query = JSON.parse(JSON.stringify(route.query));
		if (JSON.stringify(query) != JSON.stringify(params)) {
			router.push({ path: route.path, query: params });
		}
	}

	// 获取参数
	public static getRouterParam(key: string): string {
		const route = router.currentRoute;
		const query = JSON.parse(JSON.stringify(route.query));
		return query[key] == undefined ? "" : query[key];
	}

	// 跳转到指定 url 和参数
	public static goTo(url: string, params: any) {
		const route = router.currentRoute;
		const path = route.path;
		const query = JSON.parse(JSON.stringify(route.query));
		if (path != url || JSON.stringify(query) != JSON.stringify(params)) {
			router.push({ path: url, query: params });
		}
	}

	// 单例模式
	private static _instance: Tools | undefined;

	static get instance(): Tools {
		if (this._instance == undefined) {
			this._instance = new Tools();
		}
		return this._instance;
	}

	// 成功消息提示
	public static success(msg: string) {
		this.instance.$notify({
			type: "success",
			title: "成功",
			message: msg,
		});
	}

	// 错误消息提示
	public static error(msg: string) {
		this.instance.$notify.error({
			title: "错误",
			message: msg,
		});
	}

	public static logout() {
		if (Tools.status != "unlogged") {
			Tools.status = "unlogged";
			Tools.success("退出登录");
		}
	}

	constructor() {
		super();
	}

	public static status: string; // page status

	private static _token: string | undefined;
	public static get token(): string {
		if (this._token == undefined) {
			const authentication = localStorage.getItem("authentication");
			this._token = authentication == undefined ? "" : authentication;
		}
		return this._token;
	}
	public static set token(new_value: string) {
		const old_value = this._token;
		this._token = new_value;
		if (new_value == "" && old_value != "")
			localStorage.removeItem("authentication");
		localStorage.setItem("authentication", new_value);
	}
}
