<template>
	<!-- 基本信息 -->
	<div id="EditMainRoadInspection">
		<el-form ref="m-form" :model="m_form" label-width="80px">
			<el-form-item label="日期">
				<el-date-picker
					@input="this.$forceUpdate()"
					v-model="m_form.date"
					align="right"
					type="date"
					placeholder="选择日期"
					:picker-options="pickerOptions"
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item label="天气">
				<el-input
					@input="this.$forceUpdate()"
					v-model="m_form.weather"
				></el-input>
			</el-form-item>
			<el-form-item label="巡查人">
				<el-input v-model="m_form.people"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm()">保存</el-button>
				<el-button @click="$router.back(-1)">返回</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import { MyAxios } from "@/typings/MyAxios";
import { Inspection } from "@/typings/Inspection";
import { GlobalVar } from "@/typings/GlobalVar";

export default class EditMainRoadInspection extends Vue {
	private m_form: Inspection = new Inspection();

	mounted(): void {
		this.m_form.people;
	}

	submitForm(): void {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let form_div = this.$refs["m-form"] as any;
		form_div.validate((valid: boolean) => {
			if (valid) {
				// MyAxios.
				MyAxios.create_main_road_inspection(
					this.m_form.date,
					this.m_form.weather,
					GlobalVar.road.id,
					GlobalVar.road.name,
					this.m_form.people,
					(success) => {
						if (success) alert("submit success!");
						else {
							alert("submit failed!");
						}
					}
				);
			} else {
				console.log("error submit!!");
				return false;
			}
		});
	}
}
</script>
