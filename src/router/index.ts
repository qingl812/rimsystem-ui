import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '*',
		component: () => import("@/views/WithHead.vue"),
		children: [
			{
				path: '/home',
				component: () => import("@/views/Home.vue"),
				meta: {
					title: "主页 - 道路信息管理系统",
				},
			}, {
				path: '/test',
				component: () => import("@/views/Test.vue"),
				meta: {
					title: "test - 道路信息管理系统",
				},
			}
		]
	},
	{
		path: "*",
		name: "NotFound",
		component: () => import("@/views/NotFound.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
