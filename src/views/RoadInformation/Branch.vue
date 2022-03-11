<template>
	<!-- v-model="activeName" @tab-click="handleClick" -->
	<el-tabs class="branch">
		<el-tab-pane label="基本信息">
			<el-form
				:model="m_road_form"
				ref="form"
				label-width="150px"
				:inline="true"
			>
				<el-form-item
					label="分段名称"
					prop="name"
					:rules="[{ required: true, message: '分段名称不能为空' }]"
				>
					<el-input
						type="name"
						v-model="m_road_form.name"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item
					label="分段编号"
					prop="id"
					:rules="[{ required: true, message: '分段编号不能为空' }]"
				>
					<el-input
						type="id"
						v-model="m_road_form.id"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item
					label="分段长度"
					prop="length"
					:rules="[
						{
							required: true,
							type: 'integer',
							message: '分段长度必须为数字值',
						},
					]"
				>
					<el-input
						v-model.number="m_road_form.length"
						type="length"
					></el-input>
				</el-form-item>
				<el-form-item label="起点位置">
					<el-input
						v-model="m_road_form.begin_location"
					></el-input>
				</el-form-item>
				<el-form-item label="终点位置">
					<el-input
						v-model="m_road_form.begin_location"
					></el-input>
				</el-form-item>
				<el-form-item label="起止坐标">
					<el-input
						v-model="m_road_form.begin_end"
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
				<el-form-item label="备注">
					<el-input
						v-model="m_road_form.remark"
					></el-input>
				</el-form-item>
				<el-form-item class="buttons">
					<el-button type="primary" @click="submitUpload()">
						保存
					</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</el-tab-pane>
		<el-tab-pane label="图片信息" class="picture-info">
			<el-carousel height="150px">
				<el-carousel-item v-for="item in 4" :key="item">
					<h3 class="small">{{ item }}</h3>
				</el-carousel-item>
			</el-carousel>
			<el-form
				:model="m_picture_form"
				ref="form"
				label-width="150px"
				:inline="true"
			>
				<el-form-item label="上传图片" :rules="[{ required: true }]">
					<el-upload
						class="upload"
						ref="upload"
						action="api/picture_upload"
						:file-list="m_picture_list"
						:data="m_picture_form"
						:multiple="false"
						:limit="1"
						:auto-upload="false"
					>
						<el-button slot="trigger" size="small" type="primary">
							选取图片
						</el-button>
						<span slot="tip" class="upload-tip">
							上传的图片大小不能超过10MB
						</span>
					</el-upload>
				</el-form-item>
				<el-form-item
					label="图片类型"
					prop="type"
					:rules="[{ required: true, message: '图片类型不能为空' }]"
				>
					<el-input
						type="type"
						v-model="m_picture_form.type"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item
					label="图片名称"
					prop="name"
					:rules="[{ required: true, message: '道路片名称不能为空' }]"
				>
					<el-input
						type="name"
						v-model="m_picture_form.name"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input
						v-model="m_picture_form.remark"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item class="buttons">
					<el-button type="primary" @click="submitUpload()">
						保存
					</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</el-tab-pane>
	</el-tabs>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyAxios } from "../../typings/MyAxios";
import { Road } from "../../typings/Road";
import { BranchRoad } from "../../typings/BranchRoad";

@Component
export default class RoadInformation extends Vue {
	private m_my_axios = new MyAxios();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private m_tree = new Array<any>();

	private m_road_form = new BranchRoad();
	private m_types = new Array<string>();
	private m_maintenance_levels = new Array<string>();
	private m_surface_types = new Array<string>();
	private m_sidewalk_tile_types = new Array<string>();
	private m_blind_road_tile_types = new Array<string>();
	private m_curb_types = new Array<string>();

	// picture
	private m_picture_form = {
		road_id: this.m_road_form.id,
		name: "",
		type: "",
		remark: "",
	};
	private m_picture_list = [];

	mounted(): void {
		let road_id =
			typeof this.$route.query.road_id == "string"
				? this.$route.query.road_id
				: "";
		this.m_my_axios.branch_road_info(road_id, (data) => {
			this.m_road_form = data;
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

.picture-info {
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 150px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n + 1) {
		background-color: #d3dce6;
	}
}
</style>
