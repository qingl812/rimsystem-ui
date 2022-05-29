import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		redirect: "/home",
	},
	{
		path: "/home",
		component: () => import("@/views/HomeView.vue"),
		meta: {
			title: "主页 - 道路信息管理系统",
		},
	},
	{
		path: "/road-information",
		component: () => import("@/views/RoadInformation.vue"),
		meta: {
			title: "道路资料 - 道路信息管理系统",
		},
	},
	{
		path: "/:catchAll(.*)",
		component: () => import("@/views/app/NotFound.vue"),
		meta: {
			title: "404 - 道路信息管理系统",
		},
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	// 路由发生变化修改页面title
	if (to.meta?.title) {
		document.title = to.meta.title as string;
	}
	next();
});

export default router;
