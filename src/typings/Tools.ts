import router from "@/router";
import { ElMessage } from "element-plus";
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
	public add_router_query(key: string, value: string) {
		router.push({
			query: { ...router.currentRoute.value.query, [key]: value },
		});
	}
	// 删除 vue router 参数
	public remove_query(key: string) {
		const newQuery = JSON.parse(
			JSON.stringify(router.currentRoute.value.query)
		);
		delete newQuery[key];
		router.push({ query: newQuery });
	}
	// 获取参数
	public get_router_query(key: string): string {
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

	public logout() {
		if (store.state.page_status != "unlogged") {
			this.success("退出登录");
			store.commit("set_page_status", "unlogged");
		}
	}
}

export default Tools.instance;
