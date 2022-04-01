import { RouteConfig } from "vue-router";

const money_routes: Array<RouteConfig> = [
	{
		path: "",
		redirect: "month",
	},
	{
		path: "month",
		name: "moneymanagement-monthly",
		component: () => import("@/views/money/MonthManage.vue"),
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
	{
		path: "pay-view",
		name: "moneymanagement-payview",
		component: () => import("@/views/money/PayView.vue"),
		meta: {
			title: "支付查看 - 资金管理 - 道路信息管理系统",
		},
	},
];

export default money_routes;
