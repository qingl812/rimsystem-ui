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
			// home
			{
				path: "/home/doc-manage",
				name: "home-docmanage",
				component: () => import("@/views/home/DocManage.vue"),
				meta: {
					title: "文档管理 - 主页 - 道路信息管理系统",
				},
			},
			{
				path: "/home/data-information",
				name: "home-datainformation",
				component: () => import("@/views/home/DataInformation.vue"),
				meta: {
					title: "数据信息 - 主页 - 道路信息管理系统",
				},
			},
			{
				path: "/home/data-deletion",
				name: "home-datadeletion",
				component: () => import("@/views/home/DataDeletion.vue"),
				meta: {
					title: "数据删除 - 主页 - 道路信息管理系统",
				},
			},
			{
				path: "/home/daily-inspection",
				name: "home-dailyinspection",
				component: () => import("@/views/home/DailyInspection.vue"),
				meta: {
					title: "数据删除 - 主页 - 道路信息管理系统",
				},
			},
			// ! home
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
				component: () =>
					import("@/views/index/MaintenanceManagement.vue"),
				children: [
					{
						path: "",
						redirect: "plan",
					},
					{
						path: "plan",
						name: "maintenance-managementplan",
						component: () =>
							import("@/views/maintenance/MaintenancePlan.vue"),
						meta: {
							title: "维修计划 - 维修管理 - 道路信息管理系统",
						},
					},
					{
						path: "achieve",
						name: "maintenance-managementachieve",
						component: () =>
							import("@/views/maintenance/AchieveBatch.vue"),
						meta: {
							title: "实现呈批 - 维修管理 - 道路信息管理系统",
						},
					},
					{
						path: "field",
						name: "maintenance-managementfield",
						component: () =>
							import(
								"@/views/maintenance/FieldImplementationRecords.vue"
							),
						meta: {
							title: "现场实施记录 - 维修管理 - 道路信息管理系统",
						},
					},
				],
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
						name: "moneymanagement-monthly",
						component: () =>
							import("@/views/money/MonthManage.vue"),
						meta: {
							title: "资金月度管理 - 资金管理 - 道路信息管理系统",
						},
					},
					{
						path: "year",
						name: "moneymanagement-yearly",
						component: () => import("@/views/money/YearManage.vue"),
						meta: {
							title: "资金年度管理 - 资金管理 - 道路信息管理系统",
						},
					},
					{
						path: "pay",
						name: "moneymanagement-pay",
						component: () => import("@/views/money/PayManage.vue"),
						meta: {
							title: "资金支付管理 - 资金管理 - 道路信息管理系统",
						},
					},
				],
			},
			{
				path: "/work-communication",
				component: () => import("@/views/index/WorkCommunication.vue"),
				children: [
					{
						path: "",
						redirect: "street",
					},
					{
						path: "street",
						name: "workcommunication-street",
						component: () => import("@/views/work/StreetWork.vue"),
						meta: {
							title: "街道 - 工作沟通 - 道路信息管理系统",
						},
					},
					{
						path: "authority",
						name: "workcommunication-authority",
						component: () =>
							import("@/views/work/AuthorityWork.vue"),
						meta: {
							title: "管理局 - 工作沟通 - 道路信息管理系统",
						},
					},
				],
			},
			{
				path: "/system-management",
				name: "systemmanagement",
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
