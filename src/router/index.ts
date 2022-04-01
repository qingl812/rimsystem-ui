import Vue from "vue";
import VueRouter, { RouteConfig, Route, NavigationGuardNext } from "vue-router";
import main_routes from "@/router/main";

const routes: Array<RouteConfig> = [
	{
		path: "/",
		redirect: "/home",
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/Login.vue"),
		meta: {
			title: "登陆 - 道路信息管理系统",
		},
	},
	{
		path: "*",
		component: () => import("@/views/GMain.vue"),
		children: main_routes,
	},
];

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
	// 路由发生变化修改页面title
	if (to.meta?.title) {
		document.title = to.meta.title;
	}

	// 判断本地是否存在 token，不存在则 login
	if (to.path === "/login") {
		next();
		return;
	}
	const authentication = localStorage.getItem("authentication");
	if (authentication === null || authentication === "") {
		next("/login");
		return;
	}

	next();
});

export default router;
