<template>
	<!-- 工作沟通 -->
	<el-container id="WorkCommunication">
		<el-aside>
			<SideTree :title="m_title" :data="m_tree"></SideTree>
		</el-aside>
		<el-main>
			<router-view></router-view>
		</el-main>
	</el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SideTree, { TreeNode } from "@/components/SideTree.vue";

@Component({
	components: {
		SideTree,
	},
})
export default class WorkCommunication extends Vue {
	private m_title = "请选择级别";
	private m_tree: Array<TreeNode> = [
		{
			id: 0,
			label: "工作沟通",
			isFolder: true,
			children: [
				{
					id: 1,
					label: "街道",
					url: "street",
				},
				{
					id: 2,
					label: "管理局",
					url: "authority",
				},
			],
		},
	];
}
</script>
