<template>
	<el-container class="daily-inspection-add">
		<el-aside>
			<div class="title centered">
				<ion-icon name="folder-outline"></ion-icon>
				<span>请选择下面的树</span>
			</div>
			<el-tree
				:data="m_tree"
				node-key="id"
				:default-expanded-keys="[1]"
				@node-click="handleNodeClick"
			>
				<span class="custom-tree-node" slot-scope="{ node }">
					<ion-icon name="document-outline"></ion-icon>
					<span @click="to_branch(id)">{{ node.label }}</span>
				</span>
			</el-tree>
		</el-aside>

		<el-main>
			<div class="title centered-vertical">
				<span>{{ m_road_name }} - 基本巡查</span>
			</div>
			<el-form :model="m_form" ref="form" label-width="80px">
				<el-form-item
					label="日期"
					prop="date"
					:rules="[{ required: true, message: '日期不能为空' }]"
				>
					<el-input
						type="date"
						v-model="m_form.date"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item label="天气">
					<el-input
						v-model="m_form.weather"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item label="巡查人">
					<el-input
						v-model="m_form.people"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitUpload()">
						保存
					</el-button>
					<el-button @click="cancel()">返回</el-button>
				</el-form-item>
			</el-form>
		</el-main>
	</el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyAxios } from "../typings/MyAxios";
import { BranchRoad } from "../typings/BranchRoad";
import { Inspection } from "../typings/Inspection";

@Component
export default class RoadInformation extends Vue {
	private m_my_axios = new MyAxios();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private m_tree = new Array<any>();
	private m_form = new Inspection();
	private m_road_name = "";

	constructor() {
		super();
	}

	mounted(): void {
		let road_id =
			typeof this.$route.query.road_id == "string"
				? this.$route.query.road_id
				: "";
		this.m_my_axios.road_info(road_id, (data) => {
			this.m_road_name = data.name;
			this.m_tree = [
				{
					id: 1,
					label: data.name,
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					children: new Array<any>(),
				},
			];
			data.branch_road.forEach((element: BranchRoad) => {
				this.m_tree[0].children.push({
					label: element.name,
				});
			});
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

	cancel(): void {
		this.$router.go(-1);
	}

	to_branch(): void {
		this.$router.push({
			path: "daily-inspection-add-branch",
			query: { road_id: this.$route.query.road_id },
		});
	}
}
</script>

<style scoped lang="scss">
@import "themes/normal.scss";

.daily-inspection-add > .el-aside {
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

	.el-tree {
		color: black;
		background-color: $aside-background-color;
	}
}

.daily-inspection-add > .el-main {
	padding-top: 0;
	padding-bottom: 0;
	background-color: $gmain-background-color;

	.title {
		height: 40px;
		margin-left: 10px;

		span {
			margin-left: 4px;
		}
	}
}
</style>
