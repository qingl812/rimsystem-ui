import { RouteConfig } from "vue-router";

const inspection_routes: Array<RouteConfig> = [
	{
		path: "",
		redirect: "inspection",
	},
	{
		path: "inspection",
		name: "home-dailyinspection-inspection",
		component: () => import("@/views/home/inspection/ShowInspection.vue"),
		meta: {
			title: "日常巡查 - 道路信息管理系统",
		},
	},
	{
		path: "add",
		component: () => import("@/views/home/inspection/AddInspection.vue"),
		children: [
			{
				path: "",
				redirect: "main",
			},
			{
				path: "main",
				component: () =>
					import(
						"@/views/home/inspection/EditMainRoadInspection.vue"
					),
				meta: {
					title: "基本信息 - 新增日常巡查 - 道路信息管理系统",
				},
			},
			{
				path: "branch",
				component: () =>
					import(
						"@/views/home/inspection/EditBranchRoadInspection.vue"
					),
				meta: {
					title: "详细记录 - 新增日常巡查 - 道路信息管理系统",
				},
			},
		],
	},
];

export default inspection_routes;
