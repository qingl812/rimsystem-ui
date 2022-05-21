/* eslint-disable @typescript-eslint/no-explicit-any */
import router from "@/router";

export class Tools {
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
}
