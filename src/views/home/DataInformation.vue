<template>
	<!-- 数据信息 -->
	<el-container id="DataInformation">
		<el-aside>
			<SideTree :title="m_side_title" :data="m_tree"></SideTree>
		</el-aside>
		<el-main> 数据信息 </el-main>
	</el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyAxios } from "@/typings/MyAxios";
import SideTree, { TreeNode } from "@/components/SideTree.vue";
import { Road } from "@/typings/Road";

@Component({
	components: {
		SideTree,
	},
})
export default class DataInformation extends Vue {
	// side
	private m_side_title = "请选择下面的树";
	private m_tree: Array<TreeNode> = [
		{
			id: 0,
			label: "",
			isFolder: true,
			children: [],
		},
	];
	private m_road = new Road();

	mounted(): void {
		// 如果没有参数 road_id 返回主页
		let t = this.$route.query.road_id;
		this.m_road.id = typeof t == "string" ? t : "";
		if ((this, this.m_road.id == "")) this.$router.replace("/home");

		MyAxios.get_road_info(this.m_road.id, (data) => {
			this.m_road = data;
			this.m_tree[0].label = data.name;

			data.branch_road.forEach((element) => {
				this.m_tree[0].children?.push({
					id: Number(element.id),
					label: element.name,
				});
			});
		});
	}
}
</script>
