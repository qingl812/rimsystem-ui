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
		path: "/data-information",
		component: () => import("@/views/DataInformation.vue"),
		meta: {
			title: "数据信息 - 道路信息管理系统",
		},
	},
	{
		path: "/road-detection",
		component: () => import("@/views/RoadDetection.vue"),
		meta: {
			title: "道路检测 - 道路信息管理系统",
		},
	},
	{
		path: "/maintenance-management",
		component: () => import("@/views/MaintenanceManagement.vue"),
		meta: {
			title: "维修管理 - 道路信息管理系统",
		},
	},
	{
		path: "/money-management",
		component: () => import("@/views/MoneyManagement.vue"),
		meta: {
			title: "资金管理 - 道路信息管理系统",
		},
	},
	{
		path: "/doc-manage",
		component: () => import("@/views/DocManage.vue"),
		meta: {
			title: "文档管理 - 道路信息管理系统",
		},
	},
	{
		path: "/daily-inspection",
		component: () => import("@/views/DailyInspection.vue"),
		meta: {
			title: "巡查信息 - 道路信息管理系统",
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
