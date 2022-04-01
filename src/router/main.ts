import { RouteConfig } from "vue-router";
import detection_routes from "@/router/detection";
import maintenance_routes from "@/router/maintenance";
import money_routes from "@/router/money";
import communication_routes from "@/router/communication";

const main_routes: Array<RouteConfig> = [
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
		component: () => import("@/views/index/RoadDetection.vue"),
		children: detection_routes,
	},
	{
		path: "/maintenance-management",
		component: () => import("@/views/index/MaintenanceManagement.vue"),
		children: maintenance_routes,
	},
	{
		path: "/money-management",
		component: () => import("@/views/index/MoneyManagement.vue"),
		children: money_routes,
	},
	{
		path: "/work-communication",
		component: () => import("@/views/index/WorkCommunication.vue"),
		children: communication_routes,
	},
	{
		path: "/system-management",
		name: "systemmanagement",
		component: () => import("@/views/index/SystemManagement.vue"),
		meta: {
			title: "系统管理 - 道路信息管理系统",
		},
	},
];

export default main_routes;
