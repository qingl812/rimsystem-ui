<template>
	<!-- 文档管理 -->
	<el-container id="DocManage">
		<el-aside>
			<SideTree :title="m_side_title" :data="m_tree"></SideTree>
		</el-aside>

		<el-main>
			<PublicTable
				:table_data="m_table"
				:title="m_table_title"
				:update_table="update_table"
			>
				<template slot="table">
					<el-table-column
						prop="check"
						type="selection"
						align="center"
						width="60"
					>
					</el-table-column>
					<el-table-column
						prop="id"
						label="序号"
						align="center"
						width="100"
					>
					</el-table-column>
					<el-table-column prop="name" label="名称" align="center">
					</el-table-column>
					<el-table-column
						prop="format"
						label="格式"
						align="center"
						width="100"
					>
					</el-table-column>
					<el-table-column
						prop="time"
						label="时间"
						align="center"
						width="200"
					>
					</el-table-column>
					<el-table-column label="查看" align="center" width="60">
						<template slot-scope="scope">
							<ion-icon
								@click="download(scope.$index, scope.row)"
								name="open-outline"
							></ion-icon>
						</template>
					</el-table-column>
					<el-table-column label="下载" align="center" width="60">
						<template slot-scope="scope">
							<ion-icon
								@click="download(scope.$index, scope.row)"
								name="cloud-download-outline"
							></ion-icon>
						</template>
					</el-table-column>
				</template>

				<template slot="button">
					<el-button
						type="primary"
						plain
						size="medium"
						@click="jump('doc-new')"
					>
						新增
					</el-button>
					<el-button type="primary" plain size="medium">
						删除
					</el-button>
				</template>
			</PublicTable>
		</el-main>
	</el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MyAxios } from "@/typings/MyAxios";
import PublicTable from "@/components/PublicTable.vue";
import SideTree, { TreeNode } from "@/components/SideTree.vue";
import { Road } from "@/typings/Road";
import { RoadFile } from "@/typings/RoadFile";

@Component({
	components: {
		SideTree,
		PublicTable,
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
	// table
	private m_table_title = "";
	private m_table = new Array<RoadFile>();
	// search
	private m_file_type = "";

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

	public update_table(
		page_size: number,
		page: number,
		callback: (total: number) => void
	) {
		MyAxios.file_info_list(
			page_size,
			page,
			this.m_road.id,
			this.m_file_type,
			(total, data) => {
				callback(total);
				this.m_table = data;
			}
		);
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
@import "@/themes/normal.scss";

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
