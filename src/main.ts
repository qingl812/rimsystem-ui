import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import '../themes/normal.scss'
import { NavigationGuardNext, Route } from "vue-router";

if (process.env.NODE_ENV === 'development') {
	require('../mock/index.ts')
}

Vue.config.productionTip = false;

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
	/* 路由发生变化修改页面title */
	if (to.meta?.title) {
		document.title = to.meta.title;
	}
	next();
});

Vue.use(ElementUI);

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");

