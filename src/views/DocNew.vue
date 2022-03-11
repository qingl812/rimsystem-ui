<template>
	<div class="doc-new">
		<div class="title centered-vertical">
			<ion-icon name="list-outline"></ion-icon>
			<span>
				{{ m_file_types.road_name + " - 新增" }}
			</span>
		</div>
		<el-form :model="m_form" ref="form" label-width="80px">
			<el-form-item label="上传文件" :rules="[{ required: true }]">
				<el-upload
					class="upload"
					ref="upload"
					action="api/file_upload"
					:file-list="m_file_list"
					:data="m_form"
					:multiple="false"
					:limit="1"
					:auto-upload="false"
				>
					<el-button slot="trigger" size="small" type="primary">
						选取文件
					</el-button>
					<span slot="tip" class="upload-tip">
						上传的文件大小不能超过10MB
					</span>
				</el-upload>
			</el-form-item>
			<el-form-item
				label="文件名"
				prop="name"
				:rules="[{ required: true, message: '文件名不能为空' }]"
			>
				<el-input
					type="name"
					v-model="m_form.name"
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item
				label="文件分类"
				prop="type"
				:rules="[{ required: true, message: '文件分类不能为空' }]"
			>
				<el-select
					type="type"
					v-model="m_form.type"
					clearable
					placeholder="文件类别"
				>
					<el-option
						v-for="item in m_file_types.types"
						:key="item"
						:label="item"
						:value="item"
					>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="归档单位">
				<el-select
					v-model="m_form.unit"
					clearable
					placeholder="归档单位"
				>
					<el-option
						v-for="item in m_units"
						:key="item"
						:label="item"
						:value="item"
					>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item
				label="归档号"
				prop="archive_number"
				:rules="[{ type: 'integer', message: '归档号必须为数字值' }]"
			>
				<el-input
					v-model.number="m_form.archive_number"
					type="archive_number"
				></el-input>
			</el-form-item>
			<el-form-item
				label="份号"
				prop="part_number"
				:rules="[{ type: 'integer', message: '份号必须为数字值' }]"
			>
				<el-input
					v-model.number="m_form.part_number"
					type="archive_number"
				></el-input>
			</el-form-item>
			<el-form-item
				label="页数"
				prop="page_number"
				:rules="[{ type: 'integer', message: '页数必须为数字值' }]"
			>
				<el-input
					v-model.number="m_form.page_number"
					type="archive_number"
				></el-input>
			</el-form-item>
			<el-form-item label="备注">
				<el-input
					type="textarea"
					placeholder="请输入内容"
					v-model="m_form.remark"
					:autosize="{ minRows: 2, maxRows: 4 }"
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitUpload()">
					保存
				</el-button>
				<el-button @click="cancel()">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyAxios } from "../typings/MyAxios";

@Component
export default class DocNew extends Vue {
	private m_my_axios = new MyAxios();

	private m_file_types = {
		road_name: "",
		types: new Array<string>(),
	};
	private m_units = new Array<string>();
	private m_form = {
		road_name: this.m_file_types.road_name,
		name: "",
		type: "",
		unit: "",
		archive_number: "",
		part_number: "",
		page_number: "",
		remark: "",
	};
	private m_file_list = [];

	constructor() {
		super();
	}

	mounted(): void {
		this.m_my_axios.file_types_list((data) => {
			this.m_file_types.types = data;
		});

		let road_id =
			typeof this.$route.query.road_id == "string"
				? this.$route.query.road_id
				: "";
		this.m_my_axios.road_info(road_id, (data) => {
			this.m_file_types.road_name = data.name;
		});

		this.m_my_axios.unit_name_list((data) => {
			this.m_units = data;
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
}
</script>

<style scoped lang="scss">
@import "themes/normal.scss";

.doc-new {
	margin: auto;
	margin-left: 20%;
}

.doc-new > .title {
	height: 40px;
	margin-left: 10px;

	span {
		margin-left: 4px;
	}
}

.doc-new > .el-form {
	width: 350px;

	.upload {
		span {
			font-size: 10px;
		}
	}
}
</style>
