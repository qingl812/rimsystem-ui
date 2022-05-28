<template>
	<el-form class="RoadInfoEdit" ref="form" :model="road" label-width="150px">
		<el-form-item label="道路名称">
			<el-input v-model="road.name"></el-input>
		</el-form-item>

		<el-form-item label="道路编号">
			<el-input v-model="road.id" disabled></el-input>
		</el-form-item>

		<el-form-item label="道路类型">
			<el-select v-model="road.type">
				<el-option
					v-for="item in road_types"
					:key="item"
					:label="item"
					:value="item"
				>
				</el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="道路养护等级">
			<el-select v-model="road.maintenance_level">
				<el-option
					v-for="item in road_mlevels"
					:key="item"
					:label="item"
					:value="item"
				>
				</el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="道路长度">
			<el-input v-model="road.total_length"></el-input>
		</el-form-item>

		<el-form-item label="道路分段数">
			<el-input v-model="road.segment_number"></el-input>
		</el-form-item>

		<el-form-item label="道路路面类型">
			<el-select v-model="road.surface_type">
				<el-option
					v-for="item in road_surface_types"
					:key="item"
					:label="item"
					:value="item"
				>
				</el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="人行道面砖类型">
			<el-select v-model="road.sidewalk_tile_type">
				<el-option
					v-for="item in road_sidewalk_tile_types"
					:key="item"
					:label="item"
					:value="item"
				>
				</el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="盲道面砖类型">
			<el-select v-model="road.blind_road_tile_type">
				<el-option
					v-for="item in road_blind_road_tile_types"
					:key="item"
					:label="item"
					:value="item"
				>
				</el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="路缘石（侧石）类型">
			<el-select v-model="road.curb_type">
				<el-option
					v-for="item in road_curb_types"
					:key="item"
					:label="item"
					:value="item"
				>
				</el-option>
			</el-select>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="onSubmit"> 保存 </el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Road } from "@/typings/Road";

@Component
export default class RoadInfoEdit extends Vue {
	@Prop({ required: true }) readonly road!: Road;

	@Prop({ required: true }) readonly road_types!: Array<string>;
	@Prop({ required: true }) readonly road_mlevels!: Array<string>;
	@Prop({ required: true }) readonly road_surface_types!: Array<string>;
	@Prop({ required: true }) readonly road_sidewalk_tile_types!: Array<string>;
	@Prop({ required: true })
	readonly road_blind_road_tile_types!: Array<string>;
	@Prop({ required: true }) readonly road_curb_types!: Array<string>;

	onSubmit() {
		alert("submit");
	}
}
</script>
