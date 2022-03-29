<template>
	<!-- 系统管理 -->
	<div id="SystemManagement">系统管理</div>
	<!-- <el-container id="SystemManagement">
		<el-aside>
			<SideTree :title="m_title" :data="m_tree"></SideTree>
		</el-aside>
		<el-main>
			<router-view></router-view>
		</el-main>
	</el-container> -->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SideTree, { TreeNode } from "@/components/SideTree.vue";

@Component({
	components: {
		SideTree,
	},
})
export default class SystemManagement extends Vue {
	private m_title = "请选择级别";
	private m_tree: Array<TreeNode> = [
		{
			id: 0,
			label: "工作沟通",
			url: "",
			isFolder: true,
			children: [
				{
					id: 1,
					label: "街道",
					url: "",
					isFolder: false,
					children: undefined,
				},
				{
					id: 2,
					label: "管理局",
					url: "",
					isFolder: false,
					children: undefined,
				},
			],
		},
	];
}
</script>

<style scoped lang="scss">
@import "@/themes/normal.scss";
</style>
