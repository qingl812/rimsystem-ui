import Vue from "vue";
import VueRouter, { RouteConfig, Route, NavigationGuardNext } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/",
		redirect: "/home",
	},
	{
		path: "/login",
		component: () => import("@/views/Login.vue"),
		meta: {
			title: "登陆 - 道路信息管理系统",
		},
	},
	{
		path: "*",
		component: () => import("@/views/WithHead.vue"),
		children: [
			{
				path: "/home",
				component: () => import("@/views/Home.vue"),
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
				path: "/doc-manage",
				component: () => import("@/views/DocManage.vue"),
				meta: {
					title: "文档管理 - 道路信息管理系统",
				},
			},
			{
				path: "/data-information",
				component: () => import("@/views/DataInformation.vue"),
				meta: {
					title: "数据信息 - 道路信息管理系统",
				},
				children: [
					{
						path: "main",
						component: () =>
							import("@/views/RoadInformation/Main.vue"),
						meta: {
							title: "主路 - 道路资料",
						},
					},
					{
						path: "branch",
						component: () =>
							import("@/views/RoadInformation/Branch.vue"),
						meta: {
							title: "支路 - 道路资料",
						},
					},
					{
						path: "basic-database",
						component: () =>
							import("@/views/RoadInformation/BasicDatabase.vue"),
						meta: {
							title: "基本资料库 - 道路资料",
						},
					},
				],
			},
			{
				path: "/daily-inspection",
				component: () => import("@/views/DailyInspection.vue"),
				meta: {
					title: "日常巡查 - 道路信息管理系统",
				},
			},
			{
				path: "/daily-inspection-add",
				component: () => import("@/views/DailyInspectionAdd.vue"),
				meta: {
					title: "编辑巡查信息 - 道路信息管理系统",
				},
			},
			{
				path: "/doc-new",
				component: () => import("@/views/DocNew.vue"),
				meta: {
					title: "新增文档 - 道路信息管理系统",
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
				path: "/test",
				component: () => import("@/views/Test.vue"),
				meta: {
					title: "test - 道路信息管理系统",
				},
			},
		],
	},
	{
		path: "*",
		name: "NotFound",
		component: () => import("@/views/NotFound.vue"),
		meta: {
			title: "404 - 道路信息管理系统",
		},
	},
];

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
