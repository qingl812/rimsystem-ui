<template>
	<PublicTable
		:table_data="m_table"
		:title="table_title"
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
			<el-table-column prop="id" label="序号" align="center" width="100">
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
			<el-button type="primary" plain size="medium"> 删除 </el-button>
		</template>
	</PublicTable>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PublicTable from "@/components/PublicTable.vue";
import { RoadFile } from "@/typings/RoadFile";
import { MyAxios } from "@/typings/MyAxios";

@Component({
	components: {
		PublicTable,
	},
})
export default class DocTable extends Vue {
	@Prop({ required: true }) readonly road_id: string = "";

	// table
	@Prop({ required: true }) readonly table_title: string = "";
	private m_table = new Array<RoadFile>();
	// search
	@Prop({ required: true }) readonly file_type: string = "";

	public update_table(
		page_size: number,
		page: number,
		callback: (total: number) => void
	) {
		MyAxios.file_info_list(
			page_size,
			page,
			this.road_id,
			this.file_type,
			(total, data) => {
				callback(total);
				this.m_table = data;
			}
		);
	}
}
</script>
