import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BaiduMap from 'vue-baidu-map'
import Axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, Axios)
Vue.use(BaiduMap, {
	ak: 'HpA4MtzOdUZ9Ywnum4HHwtnbwcIrn0Hc'
})

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title
	}
	next()
})

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
