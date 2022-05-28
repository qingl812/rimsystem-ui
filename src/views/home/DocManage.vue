<template>
	<!-- 文档管理 -->
	<el-container id="DocManage">
		<el-aside>
			<SideTree :title="m_side_title" :data="m_tree"></SideTree>
		</el-aside>

		<el-main v-if="true">
			<DocTable
				:road_id="m_road.id"
				:table_title="m_table_title"
				:file_type="m_file_type"
			></DocTable>
		</el-main>

		<el-main v-if="false"> </el-main>
	</el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyAxios } from "@/typings/MyAxios";
import SideTree, { TreeNode } from "@/components/SideTree.vue";
import { Road } from "@/typings/Road";
import DocTable from "@/components/DocTable.vue";

@Component({
	components: {
		SideTree,
		DocTable,
	},
})
export default class VisaRecord extends Vue {
	// side
	private m_side_title = "请选择级别";
	private m_tree: Array<TreeNode> = [
		{
			id: 0,
			label: "",
			isFolder: true,
			children: [],
		},
	];
	private m_road = new Road();
	// doc table
	private m_file_type = "";
	private m_table_title = "";

	mounted(): void {
		// 如果没有参数 road_id 返回主页
		let t = this.$route.query.road_id;
		this.m_road.id = typeof t == "string" ? t : "";
		if ((this, this.m_road.id == "")) this.$router.replace("/home");

		MyAxios.get_road_info(this.m_road.id, (data) => {
			this.m_road = data;
			this.m_tree[0].label = data.name;
			this.m_table_title = this.m_road.name + " - 全部资料";
		});
		MyAxios.get_file_type_name_list((data) => {
			for (let i in data) {
				this.m_tree[0].children?.push({
					id: Number(i) + 1,
					label: data[i],
					callback: (data) => {
						this.m_file_type = data.label;
						this.m_table_title =
							this.m_road.name + " - " + this.m_file_type;
						// 手动触发窗口resize事件
						var myEvent = new Event("resize");
						window.dispatchEvent(myEvent);
					},
				});
			}
		});
	}

	// eslint-disable-next-line
	download(index: number, scope: any): void {
		// this.m_my_axios.file_download(scope.id, (url: string) => {
		// 	window.open(url, "_blank")?.location;
		// });
	}
}
</script>

<style scoped lang="scss">
#DocManage {
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
