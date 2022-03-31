<template>
	<div id="withHead">
		<!-- head -->
		<div class="ghead centered-vertical">
			<router-link to="/">广州省惠州市道路管理系统</router-link>
		</div>

		<!-- navigate -->
		<el-menu
			class="gnavigate"
			mode="horizontal"
			:default-active="m_navigate_active"
			text-color="white"
			active-text-color="#ffd04b"
			background-color="#43ace5"
			:router="true"
		>
			<el-menu-item
				v-for="item in m_navigate_option"
				:key="item.url"
				:index="item.url"
			>
				{{ item.name }}
			</el-menu-item>
		</el-menu>

		<!-- main -->
		<router-view></router-view>

		<!-- status -->
		<el-row type="flex" class="gstatus">
			<el-col v-for="item in m_status" :key="item">
				<span>{{ item }}</span>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyAxios } from "@/typings/MyAxios";

@Component
export default class WithHead extends Vue {
	// navigate
	private m_navigate_option = [
		{ id: "1", name: "首页", url: "/home" },
		{ id: "2", name: "现场签证记录", url: "/visa-record" },
		{ id: "3", name: "道路资料", url: "/road-information" },
		{ id: "4", name: "道路检测", url: "/road-detection" },
		{ id: "5", name: "维修管理", url: "/maintenance-management" },
		{ id: "6", name: "资金管理", url: "/money-management" },
		{ id: "7", name: "工作沟通", url: "/work-communication" },
		{ id: "8", name: "系统管理", url: "/system-management" },
		{ id: "9", name: "注销", url: "/logout" },
	];
	private m_navigate_active = this.m_navigate_option[0].url;
	// status
	private m_status = new Array<string>();
	// Vue Router 路径对象
	private m_route = this.$route;

	created() {
		this.m_navigate_option.forEach((element) => {
			// 判断一级路由
			if (element.url.match(this.$route.matched[1].regex) != null) {
				this.m_navigate_active = element.url;
				return;
			}
		});

		MyAxios.get_status_info((data) => {
			Vue.set(this.m_status, 0, "使用单位: " + data[0]);
			Vue.set(this.m_status, 1, "用户名称: " + data[1]);
			Vue.set(this.m_status, 2, "用户类型:" + data[2]);
			Vue.set(this.m_status, 3, "当前使用版本号: " + data[3]);
		});
	}
}
</script>

<style lang="scss">

#withHead {
	.ghead {
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

	.gnavigate {
		height: calc($gnavigate-height - 1px);
		line-height: calc($gnavigate-height - 1px);
	}

	.gstatus {
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
</style>
