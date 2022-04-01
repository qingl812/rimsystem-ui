import { RouteConfig } from "vue-router";

const maintenance_routes: Array<RouteConfig> = [
	{
		path: "",
		redirect: "plan",
	},
	{
		path: "plan",
		name: "maintenance-managementplan",
		component: () => import("@/views/maintenance/MaintenancePlan.vue"),
		meta: {
			title: "维修计划 - 维修管理 - 道路信息管理系统",
		},
	},
	{
		path: "achieve",
		name: "maintenance-managementachieve",
		component: () => import("@/views/maintenance/AchieveBatch.vue"),
		meta: {
			title: "实现呈批 - 维修管理 - 道路信息管理系统",
		},
	},
	{
		path: "field",
		name: "maintenance-managementfield",
		component: () =>
			import("@/views/maintenance/FieldImplementationRecords.vue"),
		meta: {
			title: "现场实施记录 - 维修管理 - 道路信息管理系统",
		},
	},
];

export default maintenance_routes;
