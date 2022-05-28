<template>
	<el-form
		class="BranchInfoEdit"
		ref="form"
		:model="branch_road"
		label-width="150px"
	>
		<el-form-item label="分段名称">
			<el-input v-model="branch_road.name"></el-input>
		</el-form-item>

		<el-form-item label="分段编号">
			<el-input v-model="branch_road.id" disabled></el-input>
		</el-form-item>

		<el-form-item label="分段长度">
			<el-input v-model="branch_road.length"></el-input>
		</el-form-item>

		<el-form-item label="起点位置">
			<el-input v-model="branch_road.begin_location"></el-input>
		</el-form-item>

		<el-form-item label="终止位置">
			<el-input v-model="branch_road.end_location"></el-input>
		</el-form-item>

		<el-form-item label="起止坐标">
			<el-input v-model="branch_road.begin_end"></el-input>
		</el-form-item>

		<el-form-item label="路面类型">
			<el-select v-model="branch_road.surface_type">
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
			<el-select v-model="branch_road.sidewalk_tile_type">
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
			<el-select v-model="branch_road.blind_road_tile_type">
				<el-option
					v-for="item in road_blind_road_tile_types"
					:key="item"
					:label="item"
					:value="item"
				>
				</el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="侧石类型">
			<el-select v-model="branch_road.curb_type">
				<el-option
					v-for="item in road_curb_types"
					:key="item"
					:label="item"
					:value="item"
				>
				</el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="备注">
			<el-input v-model="branch_road.remark"></el-input>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="onSubmit"> 保存 </el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { BranchRoad } from "@/typings/BranchRoad";

@Component
export default class BranchInfoEdit extends Vue {
	@Prop({ required: true }) readonly branch_road!: BranchRoad;

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
