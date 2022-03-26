<template>
	<!-- 维修管理 -->
	<el-container id="MaintenanceManagement">
		<el-aside>
			<SideBar :title="m_title" :options="m_options"></SideBar>
		</el-aside>
		<el-main>
			<router-view></router-view>
		</el-main>
	</el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SideBar from "@/components/SideBar.vue";

@Component({
	components: {
		SideBar,
	},
})
export default class MaintenanceManagement extends Vue {
	private m_title = "维修管理";
	private m_options = [
		{ name: "维修计划", url: "plan" },
		{ name: "实现呈批", url: "achieve" },
		{ name: "现场实施记录", url: "field" },
	];
	private m_sup_url = "money-management";
}
</script>

<style scoped lang="scss">
@import "@/themes/normal.scss";

#MaintenanceManagement {
	.el-aside {
		height: $gmain-height;
		max-width: $gaside-width;
		background-color: $aside-background-color;
	}

	.el-main {
		padding-top: 0;
		padding-bottom: 0;
		background-color: $gmain-background-color;
	}
}
</style>
