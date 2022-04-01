import { RouteConfig } from "vue-router";

const detection_routes: Array<RouteConfig> = [
	{
		path: "",
		redirect: "daily",
	},
	{
		path: "daily",
		name: "roaddetection-daily",
		component: () => import("@/views/detect/DailyInspection.vue"),
		meta: {
			title: "日常巡查 - 道路检测 - 道路信息管理系统",
		},
	},
	{
		path: "summary",
		name: "roaddetection-summary",
		component: () => import("@/views/detect/InspectionSummary.vue"),
		meta: {
			title: "巡查汇总 - 道路检测 - 道路信息管理系统",
		},
	},
];

export default detection_routes;
