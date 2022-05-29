<template>
	<el-container class="global-layout">
		<el-aside direction="vertical">
			<!-- 搜索 -->
			<div class="title">
				<span class="centered">筛选条件</span>
				<el-divider></el-divider>
			</div>

			<el-select v-model="search_unit" clearable size="large" placeholder="管理单位" @change="update_list()">
				<el-option v-for="item in $store.state.datas.units" :key="item" :label="item" :value="item">
				</el-option>
			</el-select>

			<div class="search">
				<el-input placeholder="道路名称" v-model="search_name" clearable size="large" @input="update_list">
				</el-input>

				<el-button type="primary" circle @click="update_list">
					<el-icon>
						<Search />
					</el-icon>
				</el-button>

				<el-divider></el-divider>
			</div>

			<!-- 显示的道路列表 -->
			<el-card class="road-list-card" v-loading="list_loading">
				<div>
					<div :v-model="road_list" v-for="o in road_list" :key="o.id" class="road_item">
						<el-link type="primary" :class="{
							'active-road-item-link':
								o.id == current_road_id,
							'road-item-link': o.id != current_road_id,
						}" @click="$router.push({ query: { road_id: o.id } })">
							{{ o.name }}
						</el-link>
					</div>
				</div>
				<el-pagination layout="prev,jumper, next" :page-size="list_page_size" :total="list_total" background
					small :current-page="list_current_page" @current-change="update_list">
				</el-pagination>
			</el-card>
		</el-aside>
		<el-main>
			<BaiduMap width="100%" :height="current_road_id == '' ? '100%' : 'calc(100% - 32px)'"></BaiduMap>

			<div class="map-status" v-if="current_road_id != ''">
				<el-button type="primary" @click="$router.push('doc-manage')">
					文档管理
				</el-button>
				<el-button type="primary"
					@click="$router.push({ path: 'data-information', query: { road_id: current_road_id } })">
					数据信息
				</el-button>
				<el-button type="primary" @click="$router.push('data-deletion')">
					数据删除
				</el-button>
				<el-button type="primary" @click="$router.push('daily-inspection')">
					日常巡查
				</el-button>
			</div>
		</el-main>
	</el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios, { AxiosResponse } from "axios";
import BaiduMap from "@/components/BaiduMap.vue";
import tools from "@/typings/Tools";

export default defineComponent({
	name: "HomeView",
	components: {
		BaiduMap,
	},
	data() {
		return {
			// search
			search_unit: "",
			search_name: "",
			// road list
			road_list: new Array<{
				id: string;
				name: string;
			}>(),
			list_page_size: 10,
			list_total: 0,
			list_current_page: 1,
			list_loading: false,
			current_road_id: "",
			map_width: "100%",
			map_height: "100%",
		};
	},
	methods: {
		update_list(): void {
			this.list_loading = true;
			axios({
				method: "post",
				url: "/selectHomePageRoad",
				data: {
					pageSize: this.list_page_size,
					currentPage: this.list_current_page,
					roadName: this.search_name,
					unit: this.search_unit,
				},
			}).then((response: AxiosResponse) => {
				this.road_list.length = 0;
				if (response.data.code == 200) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					response.data.data.pageInfo.list.forEach((element: any) => {
						this.road_list.push({
							id: element.id,
							name: element.roadName,
						});
					});
				}
				this.list_loading = false;
			});
		},
		get_road_id() {
			this.current_road_id = tools.get_router_query("road_id");
			let sign = false;
			for (const i in this.road_list) {
				if (this.road_list[i].id == this.current_road_id) {
					sign = true;
					break;
				}
			}
			if (!sign)
				this.$router.push({ query: { road_id: "" } });
		}
	},
	beforeCreate() {
		this.$store.dispatch("get_datas", "units");
	},
	mounted() {
		this.update_list();
		this.get_road_id()
	},
	beforeUpdate() {
		this.get_road_id()
	},
});
</script>

<style scoped lang="scss">
.el-divider {
	margin: 0;
	border-bottom: 2px solid #43ace5;
}

.el-aside {
	.title {
		width: 80%;
		margin: 0 auto 2px;

		span {
			height: 40px;
		}
	}

	.el-select,
	.search {
		width: 80%;
		/* 上边 | 右边 | 下边 | 左边 */
		margin: 5px 10% 5px 10%;
	}

	.search .el-input {
		width: 80%;
		margin-right: 5px;
	}

	.search .el-divider {
		margin-top: 4px;
	}

	.el-card {
		margin: 28px 10% 0 10%;
		height: 60%;
		position: relative;

		.el-pagination {
			position: absolute;
			bottom: 10px;
			margin-left: -10px;
		}
	}
}

.active-road-item-link {
	color: #e6a23c;
}

.road-item-link {
	color: #409eff;
}

.el-main {
	padding: 0;
}
</style>
