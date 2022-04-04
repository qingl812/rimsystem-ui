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
			title: "日常巡查 - 主页 - 道路信息管理系统",
		},
	},
];

export default inspection_routes;
