import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
		path: '/login',
		name: 'login',
		component: () => import('../views/Login.vue'),
		meta: {
			title: '广东省惠州市道路信息管理系统 - 登录'
		}
	},
	{
		path: '/',
		name: 'WithHead',
		component: () => import('../views/WithHead.vue'),
		children: [{
				path: '',
				redirect: '/home'
			},
			{
				path: 'homePage',
				redirect: '/home'
			},
			{
				path: 'home',
				name: 'Home',
				component: () => import('../views/Home.vue'),
				meta: {
					title: '广东省惠州市道路信息管理系统 - 首页'
				}
			},
			// road
			{
				path: 'docManage',
				name: 'docManage',
				component: () => import('../views/road/DocManage.vue')
			},
			{
				path: 'visaRecord',
				name: 'VisaRecord',
				component: () => import('../views/NotFound.vue')
			},
			{
				path: 'roadDetection',
				name: 'RoadDetection',
				component: () => import('../views/NotFound.vue')
			},
			{
				path: 'maintenanceManage',
				name: 'MaintenanceManage',
				component: () => import('../views/NotFound.vue')
			},
			{
				path: 'moneyManage',
				name: 'MoneyManage',
				component: () => import('../views/NotFound.vue')
			},
			{
				path: 'workCommunication',
				name: 'WorkCommunication',
				component: () => import('../views/NotFound.vue')
			},
			{
				path: 'systemManage',
				name: 'SystemManage',
				component: () => import('../views/NotFound.vue')
			}
		]
	},
	{
		path: '*',
		name: 'NotFound',
		component: () => import('../views/NotFound.vue'),
		meta: {
			title: '该页面不存在-404'
		}
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
