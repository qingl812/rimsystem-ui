<template>
	<!-- head -->
	<div class="head centered-vertical">
		<router-link to="/">广州省惠州市道路管理系统</router-link>
	</div>

	<!-- navigate -->
	<el-menu class="navigate" mode="horizontal" text-color="white" active-text-color="#ffd04b"
		background-color="#43ace5" :default-active="navigate_active" @select="handleSelect">
		<el-menu-item v-for="item in navigate_option" :key="item.url" :index="item.url">
			{{ item.name }}
		</el-menu-item>
	</el-menu>

	<!-- main -->
	<router-view></router-view>

	<!-- status -->
	<el-row class="status">
		<el-col :span="6" v-for="item in status_list" :key="item">
			<span>{{ item }}</span>
		</el-col>
	</el-row>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { defineComponent, reactive } from "vue";
import tools from "@/typings/Tools";

export default defineComponent({
	name: "MainView",
	data() {
		const navigate_option = [
			{ name: "首页", url: "/home" },
			{ name: "现场签证记录", url: "/visa-record" },
			{ name: "道路资料", url: "/road-information" },
			{ name: "道路检测", url: "/road-detection" },
			{ name: "维修管理", url: "/maintenance-management" },
			{ name: "资金管理", url: "/money-management" },
			{ name: "工作沟通", url: "/work-communication" },
			{ name: "系统管理", url: "/system-management" },
			{ name: "注销", url: "/logout" },
		];

		const query = window.location.pathname.split("/");
		if (query[1] === "") {
			query[1] = "home";
		}
		const navigate_active = "/" + query[1];

		const state = reactive({
			status_list: new Array<string>(4),
		});
		axios({
			method: "post",
			url: "/userInfo",
		}).then((response: AxiosResponse) => {
			if (response.data.code == 200) {
				state.status_list[0] =
					"使用单位: " + response.data.data.user.organizationName;
				state.status_list[1] =
					"用户名称: " + response.data.data.user.username;
				state.status_list[2] =
					"用户类型:" +
					response.data.data.user.roles[0].roleDescription;
				state.status_list[3] = "当前使用版本号: " + "v1.0";
			}
		});

		return {
			navigate_option: navigate_option,
			navigate_active: navigate_active,
			status_list: state.status_list,
			tools: tools,
		};
	},
	methods: {
		handleSelect(index: string) {
			if (index == "/logout") {
				tools.logout();
			} else {
				this.$router.push({ path: index });
			}
		},
	},
});
</script>

<style scoped lang="scss">
.head {
	background: linear-gradient(#15a2e9, white);
	height: 100px;

	a {
		margin: 0;
		font-size: 40px;
		padding-left: 30px;
		text-decoration: none;
		color: black;
	}
}

.navigate {
	height: 60px;
	line-height: 60px;
}

.status {
	position: fixed;
	background-color: #40adf2;
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
</style>
