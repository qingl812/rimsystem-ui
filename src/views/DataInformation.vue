<template>
	<el-container class="data-infomation">
		<el-aside>
			<div class="title centered">
				<ion-icon name="folder-outline"></ion-icon>
				<span>请选择下面的树</span>
			</div>
			<div class="main">
				<div class="left">
					<ion-icon name="add-circle-outline"></ion-icon>
					<ion-icon name="remove-circle-outline"></ion-icon>
					<ion-icon name="search-outline"></ion-icon>
					<ion-icon name="add-outline"></ion-icon>
					<ion-icon name="remove-outline"></ion-icon>
				</div>
				<div class="main">
					<el-menu
						default-active="0"
						:default-openeds="m_opened_menu"
						background-color="#ddefff"
					>
						<el-submenu index="0">
							<el-menu-item
								:index="m_road.id"
								slot="title"
								class="main-road-menu"
								@click="jump('main', m_road.id)"
								>{{ m_road.name }}</el-menu-item
							>
							<el-submenu
								:v-model="m_road.branch_road"
								v-for="o in m_road.branch_road"
								:key="o.id"
								v-bind:index="o.id"
							>
								<el-menu-item
									v-bind:index="[o.id + '-0']"
									slot="title"
									class="branch-road-menu"
									@click="jump('branch', o.id)"
									>{{ o.name }}</el-menu-item
								>
								<el-menu-item v-bind:index="[o.id + '-1']"
									>道路位置信息</el-menu-item
								><el-menu-item
									v-bind:index="[o.id + '-2']"
									@click="jump('basic-database', o.id)"
									>基本资料库</el-menu-item
								>
							</el-submenu>
						</el-submenu>
					</el-menu>
				</div>
			</div>
		</el-aside>
		<el-main>
			<router-view></router-view>
		</el-main>
	</el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyAxios } from "../typings/MyAxios";
import { Road } from "../typings/Road";

@Component
export default class RoadInformation extends Vue {
	private m_my_axios = new MyAxios();
	private m_road = new Road();
	private m_opened_menu = new Array<string>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private m_menu = new Array<any>();

	mounted(): void {
		let road_id =
			typeof this.$route.query.road_id == "string"
				? this.$route.query.road_id
				: "";
		this.m_my_axios.road_info(road_id, (data) => {
			this.m_road = data;
		});
		Vue.set(this.m_opened_menu, 0, "1");
	}

	jump(path: string, para: string): void {
		let p = "/data-information/" + path;
		if (this.$route.path != p || this.$route.query.road_id != para) {
			this.$router.push({
				path: p,
				query: { road_id: para },
			});
		}
	}
}
</script>

<style scoped lang="scss">
@import "themes/normal.scss";

.data-infomation > .el-aside {
	height: $gmain-height;
	max-width: $gaside-width;
	background-color: $aside-background-color;

	.title {
		height: 40px;
		color: black;
		border-bottom: $border-divider;

		span {
			margin-left: 4px;
		}
	}

	.main {
		.left {
			background-color: #b4e0fc;
			width: 40px;
			height: 230px;
			padding: 5px;
			float: left;

			font-size: 30px;
			border-bottom-right-radius: 100px;
			border-right: $border-divider;
			border-bottom: $border-divider;
		}

		.main {
			margin-left: 40px;
			background-color: $aside-background-color;
			.main-road-menu {
				padding-left: 0 !important;
			}
			.branch-road-menu {
				padding-left: 0 !important;
			}
		}
	}
}

.data-infomation > .el-main {
	padding-top: 0;
	padding-bottom: 0;
	background-color: $gmain-background-color;
}
</style>
