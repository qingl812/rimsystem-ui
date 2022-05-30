<template>
	<!-- 道路资料 -->
	<el-container class="global-layout">
		<el-aside>
			<SideBar title="道路资料" :options="['道路信息', '文档资料']"></SideBar>
		</el-aside>
		<el-main>
			<RoadInfoTable></RoadInfoTable>
		</el-main>
	</el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "@/components/SideBar.vue";
import RoadInfoTable from "@/components/road/RoadInfoTable.vue";

export default defineComponent({
	name: "RoadInformation",
	components: {
		SideBar,
		RoadInfoTable
	},
});
</script>

<style scoped lang="scss">
.el-main {
	padding-left: 20px;
	padding-right: 20px;
}
</style>
