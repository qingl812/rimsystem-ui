<template>
	<el-form ref="road_form" :model="new_road" label-width="150px" :rules="rules">
		<el-form-item label="道路名称" prop="name">
			<el-input v-model="new_road.name"></el-input>
		</el-form-item>

		<el-form-item label="道路编号" prop="num">
			<el-input v-model="new_road.num"></el-input>
		</el-form-item>

		<el-form-item label="道路类型" prop="type">
			<el-select v-model="new_road.type">
				<el-option v-for="item in $store.state.datas.road_type" :key="item" :label="item" :value="item">
				</el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="道路养护等级" prop="maintenance_level">
			<el-select v-model="new_road.maintenance_level">
				<el-option v-for="item in $store.state.datas.mlevels" :key="item" :label="item" :value="item">
				</el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="道路总长" prop="total_length">
			<el-input v-model="new_road.total_length"></el-input>
		</el-form-item>

		<el-form-item label="道路分段数">
			<el-input v-model="new_road.segment_number"></el-input>
		</el-form-item>

		<el-form-item label="道路路面类型">
			<el-select v-model="new_road.surface_type">
				<el-option v-for="item in $store.state.datas.surface" :key="item" :label="item" :value="item">
				</el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="人行道面砖类型">
			<el-select v-model="new_road.sidewalk_tile_type">
				<el-option v-for="item in $store.state.datas.sidewalk_tile" :key="item" :label="item" :value="item">
				</el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="盲道面砖类型">
			<el-select v-model="new_road.blind_road_tile_type">
				<el-option v-for="item in $store.state.datas.blind_road_tile" :key="item" :label="item" :value="item">
				</el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="路缘石（侧石）类型">
			<el-select v-model="new_road.curb_type">
				<el-option v-for="item in $store.state.datas.curb" :key="item" :label="item" :value="item">
				</el-option>
			</el-select>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="onSubmit()">保存</el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import type { FormInstance, FormRules } from 'element-plus'
import axios, { AxiosResponse } from "axios";
import tools from "@/typings/Tools";

export default defineComponent({
	name: "RoadInfoEdit",
	data() {
		const rules = reactive<FormRules>({
			name: [
				{ required: true, message: '请输入道路名称' },
			],
			num: [
				{ required: true, message: '请输入道路编号' },
			],
			type: [
				{ required: true, message: '请选择道路类型' },
			],
			maintenance_level: [
				{ required: true, message: '请选择道路养护等级' },
			],
			total_length: [
				{ required: true, message: '请输入道路总长' },
			],
		})
		return {
			new_road: reactive(JSON.parse(JSON.stringify(this.$store.state.road_info))),
			rules: rules,
		}
	},
	beforeCreate() {
		this.$store.dispatch("get_datas", "road_type");
		this.$store.dispatch("get_road_info", tools.get_router_query("road_id"));
	},
	watch: {
		"$route.query": function () {
			this.$store.dispatch("get_road_info", tools.get_router_query("road_id"));
			this.new_road = tools.clone(this.$store.state.road_info)
		},
		"$store.state.road_info": function () {
			this.new_road = tools.clone(this.$store.state.road_info)
		},
	},
	methods: {
		async onSubmit() {
			const road_form = this.$refs.road_form as FormInstance
			await road_form.validate((valid) => {
				if (valid) {
					if (tools.get_router_query("mode") == "add") {
						axios({
							method: "post",
							url: "/insertRoad",
							data: {
								roadName: this.new_road.name,
								roadNum: this.new_road.num,
								roadType: this.new_road.type,
								roadMaintenanceGrade: this.new_road.maintenance_level,
								roadLength: this.new_road.total_length,
								roadSectionNum: this.new_road.segment_number,
								roadPavementType: this.new_road.surface_type,
								sidewalkBrickType: this.new_road.sidewalk_tile_type,
								blindBrickType: this.new_road.blind_road_tile_type,
								curbType: this.new_road.curb_type,
							}
						}).then((response: AxiosResponse) => {
							if (response.data.code == 200) {
								tools.success("添加成功");
								this.$router.push("/road-information")
							} else {
								tools.success("添加失败");
							}
						}).catch((error) => {
							tools.error("网络错误？");
							console.log(error);
						});
					} else if (tools.get_router_query("mode") == "edit") {
						axios({
							method: "post",
							url: "/updateRoadDetail",
							data: {
								id: this.new_road.id,
								roadName: this.new_road.name,
								roadNum: this.new_road.num,
								roadType: this.new_road.type,
								roadMaintenanceGrade: this.new_road.maintenance_level,
								roadLength: this.new_road.total_length,
								roadSectionNum: this.new_road.segment_number,
								roadPavementType: this.new_road.surface_type,
								sidewalkBrickType: this.new_road.sidewalk_tile_type,
								blindBrickType: this.new_road.blind_road_tile_type,
								curbType: this.new_road.curb_type,
							}
						}).then((response: AxiosResponse) => {
							if (response.data.code == 200) {
								tools.success("更新成功");
								this.$store.dispatch("get_road_info", "");
								setTimeout(() => {
									this.$store.dispatch("get_road_info", tools.get_router_query("road_id"));
								}, 10);
							} else {
								tools.success("更新成功");
							}
						}).catch((error) => {
							tools.error("网络错误？");
							console.log(error);
						});
					}
				}
			})
		},
	}
});
</script>

<style scoped lang="scss">
.el-form {
	margin-top: 20px;
}
</style>
