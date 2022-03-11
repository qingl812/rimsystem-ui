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
					<el-tree
						:data="m_tree"
						node-key="id"
						:default-expanded-keys="[1]"
						@node-click="handleNodeClick"
					>
						<span class="custom-tree-node" slot-scope="{ node }">
							<ion-icon name="document-outline"></ion-icon>
							<span>{{ node.label }}</span>
						</span>
					</el-tree>
				</div>
			</div>
		</el-aside>
		<el-main>
			<!-- v-model="activeName" @tab-click="handleClick" -->
			<el-tabs>
				<el-tab-pane label="基本信息1">
					<el-form
						:model="m_road_form"
						ref="form"
						label-width="150px"
						:inline="true"
					>
						<el-form-item
							label="道路名称"
							prop="name"
							:rules="[
								{ required: true, message: '道路名称不能为空' },
							]"
						>
							<el-input
								type="name"
								v-model="m_road_form.name"
								autocomplete="off"
							></el-input>
						</el-form-item>
						<el-form-item
							label="道路编号"
							prop="id"
							:rules="[
								{ required: true, message: '道路编号不能为空' },
							]"
						>
							<el-input
								type="id"
								v-model="m_road_form.id"
								autocomplete="off"
							></el-input>
						</el-form-item>
						<el-form-item
							label="道路类型"
							prop="type"
							:rules="[
								{
									required: true,
									message: '道路类型不能为空',
								},
							]"
						>
							<el-select
								v-model="m_road_form.type"
								clearable
								placeholder="道路类型"
								type="type"
							>
								<el-option
									v-for="item in m_types"
									:key="item"
									:label="item"
									:value="item"
								>
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item
							label="道路养护等级"
							prop="maintenance_level"
							:rules="[
								{
									required: true,
									message: '道路养护等级不能为空',
								},
							]"
						>
							<el-select
								v-model="m_road_form.maintenance_level"
								type="maintenance_level"
								clearable
								placeholder="道路养护等级"
							>
								<el-option
									v-for="item in m_maintenance_levels"
									:key="item"
									:label="item"
									:value="item"
								>
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item
							label="道路总长"
							prop="total_length"
							:rules="[
								{
									required: true,
									type: 'integer',
									message: '道路总长必须为数字值',
								},
							]"
						>
							<el-input
								v-model.number="m_road_form.total_length"
								type="total_length"
							></el-input>
						</el-form-item>
						<el-form-item
							label="道路分段数"
							prop="segment_number"
							:rules="[
								{
									type: 'integer',
									message: '道路分段数必须为数字值',
								},
							]"
						>
							<el-input
								type="segment_number"
								v-model.number="m_road_form.segment_number"
							></el-input>
						</el-form-item>
						<el-form-item label="道路路面类型" prop="surface_type">
							<el-select
								v-model="m_road_form.surface_type"
								clearable
								placeholder="道路路面类型"
							>
								<el-option
									v-for="item in m_surface_types"
									:key="item"
									:label="item"
									:value="item"
								>
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="人行道面砖类型">
							<el-select
								v-model="m_road_form.sidewalk_tile_type"
								clearable
								placeholder="人行道面砖类型"
							>
								<el-option
									v-for="item in m_sidewalk_tile_types"
									:key="item"
									:label="item"
									:value="item"
								>
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="盲道面砖类型">
							<el-select
								v-model="m_road_form.blind_road_tile_type"
								clearable
								placeholder="盲道面砖类型"
							>
								<el-option
									v-for="item in m_blind_road_tile_types"
									:key="item"
									:label="item"
									:value="item"
								>
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="路缘石（侧石）类型">
							<el-select
								v-model="m_road_form.curb_type"
								clearable
								placeholder="路缘石（侧石）类型"
							>
								<el-option
									v-for="item in m_curb_types"
									:key="item"
									:label="item"
									:value="item"
								>
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item class="buttons">
							<el-button type="primary" @click="submitUpload()">
								保存
							</el-button>
							<el-button>取消</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="图片信息">图片信息</el-tab-pane>
				<el-tab-pane label="录音录像">录音录像</el-tab-pane>
			</el-tabs>
		</el-main>
	</el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyAxios } from "../typings/MyAxios";
import { BranchRoad } from "../typings/BranchRoad";
import { Road } from "../typings/Road";

@Component
export default class RoadInformation extends Vue {
	private m_my_axios = new MyAxios();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private m_tree = new Array<any>();

	private m_road_form = new Road();
	private m_types = new Array<string>();
	private m_maintenance_levels = new Array<string>();
	private m_surface_types = new Array<string>();
	private m_sidewalk_tile_types = new Array<string>();
	private m_blind_road_tile_types = new Array<string>();
	private m_curb_types = new Array<string>();

	constructor() {
		super();
	}

	mounted(): void {
		let road_id =
			typeof this.$route.query.road_id == "string"
				? this.$route.query.road_id
				: "";
		this.m_my_axios.road_info(road_id, (data) => {
			this.m_road_form = data;

			this.m_tree = [
				{
					id: 1,
					label: this.m_road_form.name,
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					children: new Array<any>(),
				},
			];
			this.m_road_form.branch_road.forEach((element: BranchRoad) => {
				this.m_tree[0].children.push({
					label: element.name,
					children: [
						{
							label: "道路位置信息",
						},
						{
							label: "基本资料库",
						},
					],
				});
			});
		});
		this.m_my_axios.types_name_list((data) => {
			this.m_types = data;
		});
		this.m_my_axios.maintenance_levels_name_list((data) => {
			this.m_maintenance_levels = data;
		});
		this.m_my_axios.surface_types_name_list((data) => {
			this.m_surface_types = data;
		});
		this.m_my_axios.sidewalk_tile_types_name_list((data) => {
			this.m_sidewalk_tile_types = data;
		});
		this.m_my_axios.blind_road_tile_types_name_list((data) => {
			this.m_blind_road_tile_types = data;
		});
		this.m_my_axios.curb_types_name_list((data) => {
			this.m_curb_types = data;
		});
	}

	submitUpload(): void {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let form_div = this.$refs.form as any;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		form_div.validate((valid: any) => {
			if (valid) {
				alert("submit!");
			} else {
				// error submit!!
				return false;
			}
		});
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let div = this.$refs.upload as any;
		div.submit();
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

			.el-tree {
				color: black;
				background-color: $aside-background-color;
			}
		}
	}
}

.data-infomation > .el-main {
	padding-top: 0;
	padding-bottom: 0;
	background-color: $gmain-background-color;

	.el-form-item {
		width: 45%;
	}

	.buttons {
		margin-left: calc((100% - 150px) / 2 - 160px);
	}
}
</style>
