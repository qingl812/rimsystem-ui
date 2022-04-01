import { RouteConfig } from "vue-router";

const communication_routes: Array<RouteConfig> = [
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
		component: () => import("@/views/work/AuthorityWork.vue"),
		meta: {
			title: "管理局 - 工作沟通 - 道路信息管理系统",
		},
	},
];

export default communication_routes;
