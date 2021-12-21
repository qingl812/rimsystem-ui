<template>
	<div class="home">
		<el-container direction="horizontal">
			<el-container id="left_container" direction="vertical">
				<span>筛选条件</span>
				<el-divider id="divider_1"></el-divider>
				<el-select
					v-model="m_valueArea"
					clearable
					placeholder="所属区属"
					@change="updateRoadList()"
				>
					<el-option
						v-for="item in m_areas"
						:key="item"
						:label="item"
						:value="item"
					>
					</el-option>
				</el-select>
				<el-select
					v-model="m_valueUnit"
					clearable
					placeholder="管理单位"
					@change="updateRoadList()"
				>
					<el-option
						v-for="item in m_units"
						:key="item"
						:label="item"
						:value="item"
					>
					</el-option>
				</el-select>
				<!-- 搜索框 -->
				<div class="search">
					<el-input
						placeholder="道路名称"
						v-model="m_valueSearch"
						clearable
						@change="updateRoadList()"
					>
					</el-input>
					<el-button icon="el-icon-search" circle></el-button>
				</div>
				<el-divider id="divider_2"></el-divider>
				<!-- 显示的道路列表 -->
				<el-main>
					<el-card>
						<div class="list" v-loading="m_loading">
							<div
								:v-model="m_roadList"
								v-for="o in m_roadList"
								:key="o"
								class="road_item"
							>
								<el-link type="primary">{{ o }}</el-link>
							</div>
						</div>
						<el-pagination
							layout="prev,jumper, next"
							:page-size="m_roadList_SingleSize"
							:total="m_roadCount"
							background
							small
							:current-page.sync="m_roadListPage"
							@current-change="updateRoadList()"
						>
						</el-pagination>
					</el-card>
				</el-main>
			</el-container>
			<el-container id="main_container"> </el-container>
		</el-container>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";

@Component
export default class Home extends Vue {
	// 筛选道路
	private m_valueArea: string;
	private m_valueUnit: string;
	private m_valueSearch: string;
	// 筛选道路的选项
	private m_areas = new Array<string>();
	private m_units = new Array<string>();
	// 道路
	private m_roadCount = 0;
	private m_roadList_SingleSize = 10; // 每页显示的道路数量
	private m_roadList = new Array<string>(this.m_roadList_SingleSize);
	private m_roadListPage = 1;
	private m_loading = true; //正在从服务器获取 road 列表

	constructor() {
		super();

		// 变量初始化
		this.m_valueArea = "";
		this.m_valueUnit = "";
		this.m_valueSearch = "";

		axios({
			method: "get",
			url: "/api/area_name_list",
		}).then((response: AxiosResponse) => {
			response.data.areas.forEach((element: string) => {
				this.m_areas.push(element);
			});
		});

		axios({
			method: "get",
			url: "/api/unit_name_list",
		}).then((response: AxiosResponse) => {
			response.data.units.forEach((element: string) => {
				this.m_units.push(element);
			});
		});
	}

	mounted(): void {
		this.updateRoadList();
	}

	public updateRoadList(): void {
		this.m_loading = true;

		axios({
			method: "get",
			url: "/api/road_name_list",
			data: {
				count: this.m_roadList_SingleSize,
				page: this.m_roadListPage,
				name: this.m_valueSearch,
				area: this.m_valueArea,
				unit: this.m_valueUnit,
			},
		}).then((response: AxiosResponse) => {
			this.m_roadCount = response.data.total;
			for (let i = 0; i < this.m_roadList_SingleSize; i++) {
				Vue.set(this.m_roadList, i, response.data.roads[i]);
			}
		});

		// setTimeout to debug
		setTimeout(() => (this.m_loading = false), 300);
	}
}
</script>

<style scoped lang="scss">
@import "themes/normal.scss";

#left_container {
	max-width: 250px;
	height: calc(100vh - 100px - 61px - 40px);
	background-color: $home_left_background;
}

#left_container span {
	height: 40px;
	/*Flex布局 垂直居中 水平居中*/
	display: flex;
	align-items: center;
	justify-content: center;
}

#left_container .el-select {
	margin-bottom: 2px;
	margin-left: 10px;
	margin-right: 10px;
}

#left_container .search {
	box-sizing: content-box;
	margin-bottom: 2px;
	margin-left: 10px;
	margin-right: 10px;
}

#left_container .search .el-input {
	width: 80%;
	margin-right: 5px;
}

#divider_1,
#divider_2 {
	margin-left: 10%;
	margin-right: 10%;
	width: 80%;
	margin-top: 0;
	margin-bottom: 5px;

	border-top: 1px solid blue;
}

#divider_2 {
	margin-top: 5px;
	margin-bottom: 0;
}

#left_container .el-card {
	position: relative;
	min-height: 90%;
	background-color: $home_left_list_background;
}

#left_container .el-card .el-pagination {
	position: absolute;
	bottom: 10px;
	margin-left: -10px;
}

#main_container {
	background-color: bisque;
}
</style>
