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
		name: "login",
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
				name: "home",
				component: () => import("@/views/index/Home.vue"),
				meta: {
					title: "主页 - 道路信息管理系统",
				},
			},
			{
				path: "/visa-record",
				name: "visa-record",
				component: () => import("@/views/index/VisaRecord.vue"),
				meta: {
					title: "现场签证记录 - 道路信息管理系统",
				},
			},
			{
				path: "/road-information",
				name: "road-information",
				component: () => import("@/views/index/RoadInformation.vue"),
				meta: {
					title: "道路资料 - 道路信息管理系统",
				},
			},
			{
				path: "/road-detection",
				name: "road-detection",
				component: () => import("@/views/index/RoadDetection.vue"),
				meta: {
					title: "道路检测 - 道路信息管理系统",
				},
			},
			{
				path: "/maintenance-management",
				name: "maintenance-management",
				component: () =>
					import("@/views/index/MaintenanceManagement.vue"),
				meta: {
					title: "维修管理 - 道路信息管理系统",
				},
			},
			{
				path: "/money-management",
				component: () => import("@/views/index/MoneyManagement.vue"),
				children: [
					{
						path: "",
						redirect: "month",
					},
					{
						path: "month",
						name: "money-management-monthly",
						component: () =>
							import("@/views/money/MonthManage.vue"),
						meta: {
							title: "资金月度管理 - 道路信息管理系统",
						},
					},
					{
						path: "year",
						name: "money-management-yearly",
						component: () => import("@/views/money/YearManage.vue"),
						meta: {
							title: "资金年度管理 - 道路信息管理系统",
						},
					},
					{
						path: "pay",
						name: "money-management-pay",
						component: () => import("@/views/money/PayManage.vue"),
						meta: {
							title: "资金支付管理 - 道路信息管理系统",
						},
					},
				],
			},
			{
				path: "/work-communication",
				name: "work-communication",
				component: () => import("@/views/index/WorkCommunication.vue"),
				meta: {
					title: "工作沟通 - 道路信息管理系统",
				},
			},
			{
				path: "/system-management",
				name: "system-management",
				component: () => import("@/views/index/SystemManagement.vue"),
				meta: {
					title: "系统管理 - 道路信息管理系统",
				},
			},
		],
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
