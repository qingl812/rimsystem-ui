<template>
	<div id="App">
		<div id="MainView" v-if="m_status == 'logged'">
			<!-- head -->
			<div class="head centered-vertical">
				<router-link to="/">广州省惠州市道路管理系统</router-link>
			</div>

			<!-- navigate -->
			<el-menu
				class="navigate"
				mode="horizontal"
				router
				text-color="white"
				active-text-color="#ffd04b"
				background-color="#43ace5"
				:default-active="m_navigate_active"
			>
				<el-menu-item
					v-for="item in m_navigate_option"
					:key="item.url"
					:index="item.url"
					:route="{ path: item.url }"
				>
					{{ item.name }}
				</el-menu-item>
			</el-menu>

			<!-- main -->
			<router-view></router-view>

			<!-- status -->
			<el-row type="flex" class="status">
				<el-col v-for="item in m_status_list" :key="item">
					<span>{{ item }}</span>
				</el-col>
			</el-row>
		</div>

		<div id="LoginView" v-else-if="m_status == 'unlogged'">
			<div class="top"></div>
			<div class="bottom"></div>
			<LoginCard></LoginCard>
		</div>

		<div id="NotFoundView" v-else-if="m_status == 'not_found'">
			<el-empty description="404 页面找不到了">
				<el-button type="primary" @click="$router.back(-1)"
					>返回</el-button
				>
				<el-button type="primary" @click="to_home()">主页</el-button>
			</el-empty>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginCard from "@/components/LoginCard.vue";
import { Tools } from "@/typings/Tools";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

@Component({
	components: {
		LoginCard,
	},
})
export default class App extends Vue {
	public m_status: "logged" | "unlogged" | "not_found" | "not_permission"; // Tools.status

	private m_navigate_option = [
		{ name: "首页", url: "/home" },
		{ name: "现场签证记录", url: "/visa-record" },
		{ name: "道路资料", url: "/road-information" },
		{ name: "道路检测", url: "/road-detection" },
		{ name: "维修管理", url: "/maintenance-management" },
		{ name: "资金管理", url: "/money-management" },
		{ name: "工作沟通", url: "/work-communication" },
		{ name: "系统管理", url: "/system-management" },
		{ name: "注销" },
	]; // navigate
	private m_navigate_active = this.m_navigate_option[0].url; // navigate
	private m_status_list = new Array<string>(); // status
	private m_status_inited = false; // status

	constructor() {
		super();

		this.m_status = Tools.token == "" ? "unlogged" : "logged";
	}

	created() {
		// 设置 Tools.status 的 getter 和 setter
		Object.defineProperty(Tools, "status", {
			get: () => {
				if (Tools.token == "") return "unlogged";
				else return "logged";
			},
			set: (
				value: "logged" | "unlogged" | "not_found" | "not_permission"
			) => {
				if (this.m_status == value) return;

				// 先加载完在显示，防止闪烁
				let main_view_div = document.getElementById(
					"App"
				) as HTMLElement;
				main_view_div.style.display = "none";
				setTimeout(() => {
					main_view_div.style.display = "block";
				}, 100);

				this.m_status = value;
				switch (value) {
					case "unlogged":
						Tools.token = "";
						break;
				}
			},
		});

		// axios config
		axios.defaults.baseURL = "https://dev.winterwonder.top/";
		// 添加请求拦截器，在请求头中加 token
		axios.interceptors.request.use(
			function (config: AxiosRequestConfig) {
				if (Tools.status != "unlogged" && config && config.headers) {
					config.headers.authentication = Tools.token;
				}
				return config;
			},
			function (error) {
				// 处理响应错误
				Tools.status = "unlogged";
				return Promise.reject(error);
			}
		);
		// 添加一个响应拦截器，在 header 中有 new_token 时更新 token
		// axios.interceptors.response.use(
		// 	function (response: AxiosResponse) {
		// 		const authentication = localStorage.getItem("authentication");
		// 		const new_authentication = response.headers.authentication;
		// 		if (authentication != new_authentication) {
		// 			localStorage.setItem("authentication", new_authentication);
		// 		}
		// 		return response;
		// 	},
		// 	function (error) {
		// 		// 处理响应错误
		// 		return Promise.reject(error);
		// 	}
		// );
		// 添加一个响应拦截器，在服务器返回 401 时退回到登陆界面
		axios.interceptors.response.use(
			(response: AxiosResponse) => {
				return response;
			},
			(error) => {
				// 处理响应错误
				if (error.response.status == 401) {
					Tools.logout();
				}
				return Promise.reject(error);
			}
		);
	}

	updated() {
		if (Tools.status == "logged") {
			this.$router.onReady(() => {
				this.m_navigate_active = this.$route.matched[0].path;
			});
			if (!this.m_status_inited) {
				App.get_status_info((data) => {
					Vue.set(this.m_status_list, 0, "使用单位: " + data[0]);
					Vue.set(this.m_status_list, 1, "用户名称: " + data[1]);
					Vue.set(this.m_status_list, 2, "用户类型:" + data[2]);
					Vue.set(
						this.m_status_list,
						3,
						"当前使用版本号: " + data[3]
					);
					this.m_status_inited = true;
				});
			}

			// 点击注销按钮退出登录
			let divs = document.getElementsByClassName("el-menu-item");
			let div = divs[divs.length - 1] as HTMLElement;
			div.addEventListener("click", () => {
				Tools.logout();
			});
		}
	}

	// 获取底部 status 栏信息
	public static get_status_info(
		callback: (data: Array<string>) => void
	): void {
		axios({
			method: "post",
			url: "/userInfo",
		}).then((response: AxiosResponse) => {
			if (response.data.code == 200) {
				callback([
					response.data.data.user.organizationName,
					response.data.data.user.username,
					response.data.data.user.roles[0].roleDescription,
					"v1.0",
				]);
			}
		});
	}

	public to_home(): void {
		window.location.href = "/home";
	}
}
</script>

<style scoped lang="scss">
#LoginView {
	.top {
		position: absolute;
		height: 50%;
		width: 100%;
		background: linear-gradient(#bfddff, white);
	}

	.bottom {
		position: absolute;
		top: 50%;
		height: 50%;
		width: 100%;
		background: linear-gradient(#0260c1, #429bff);
	}
}

#MainView {
	.head {
		background: linear-gradient($head_background, white);
		height: $ghead-height;

		a {
			margin: 0;
			font-size: 40px;
			padding-left: 30px;
			text-decoration: none;
			color: black;
		}
	}

	.navigate {
		height: calc($gnavigate-height - 1px);
		line-height: calc($gnavigate-height - 1px);
	}

	.status {
		position: fixed;
		background-color: $status_background;
		bottom: 0px;
		width: 100%;
		height: 40px;

		.el-col {
			height: 40px;
			/*Flex布局 指定垂直居中*/
			display: flex;
			align-items: center;
			padding-left: 20px;

			.el-divider {
				color: #409eff;
				height: 60%;
				margin-right: 20px;
			}

			:last-child {
				border-right: 0;
			}
		}
	}
}

#NotFoundView {
	height: 100vh;

	.el-empty {
		height: 100%;
	}
}
</style>
