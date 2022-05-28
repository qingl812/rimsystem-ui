<template>
	<div class="PictureInfo">
		<el-carousel height="150px">
			<el-carousel-item v-for="item in 4" :key="item">
				<h3 class="small">{{ item }}</h3>
			</el-carousel-item>
		</el-carousel>
		<el-form :model="m_picture_form" label-width="150px">
			<el-form-item label="上传图片">
				<el-upload
					action="https://jsonplaceholder.typicode.com/posts/"
					multiple="false"
				>
					<el-button size="small" type="primary">浏览</el-button>
				</el-upload>
			</el-form-item>

			<el-form-item label="图片类型">
				<el-select v-model="m_picture_form.type">
					<el-option
						v-for="item in m_picture_types"
						:key="item"
						:label="item"
						:value="item"
					>
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="图片名称">
				<el-input v-model="m_picture_form.name"></el-input>
			</el-form-item>

			<el-form-item label="备注">
				<el-input v-model="m_picture_form.remark"></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PictureInfo extends Vue {
	@Prop({ required: true }) readonly is_branch!: boolean;
	@Prop({ required: true }) readonly road_id!: number;

	private m_picture_form = new Picture();
	private m_picture_types = ["png", "jpg"];

	onSubmit() {
		alert("submit");
	}
}

export class Picture {
	road_is_branch = false;
	road_id = "";
	name = "";
	remark = "";
	// url: string;
}
</script>
