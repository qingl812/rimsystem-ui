<template>
	<PublicTable
		:table_data="m_table"
		title="道路信息列表"
		:update_table="update_table"
	>
		<template slot="table">
			<el-table-column label="选择" width="55">
				<template slot-scope="scope">
					<el-radio v-model="m_tableRadio" :label="scope.row">
						<i></i>
					</el-radio>
				</template>
			</el-table-column>
			<el-table-column
				prop="id"
				label="道路编号"
				align="center"
				width="100"
			>
			</el-table-column>
			<el-table-column prop="name" label="道路名称" align="center">
			</el-table-column>
			<el-table-column prop="type" label="道路类型" align="center">
			</el-table-column>
			<el-table-column
				prop="maintenance_level"
				label="道路养护等级"
				align="center"
			>
			</el-table-column>
			<el-table-column prop="unit" label="管理单位" align="center">
			</el-table-column>
		</template>

		<template slot="search">
			<el-col :span="4" class="centered-vertical">
				<el-input
					placeholder="道路名称"
					v-model="m_search_name"
					clearable
				>
				</el-input>
			</el-col>
			<el-col :span="4" class="centered-vertical">
				<el-select
					v-model="m_search_type"
					clearable
					placeholder="道路类型"
				>
					<el-option
						v-for="item in road_types"
						:key="item"
						:label="item"
						:value="item"
					>
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="4" class="centered-vertical">
				<el-select
					v-model="m_search_mlevel"
					clearable
					placeholder="道路养护等级"
				>
					<el-option
						v-for="item in road_mlevels"
						:key="item"
						:label="item"
						:value="item"
					>
					</el-option>
				</el-select>
			</el-col>
		</template>

		<template slot="button">
			<el-button type="primary" plain size="medium">新增</el-button>
			<el-button type="primary" plain size="medium">查看</el-button>
			<el-button type="primary" plain size="medium">删除</el-button>
		</template>
	</PublicTable>
</template>

<script lang="ts">
import { MyAxios } from "@/typings/MyAxios";
import { Road } from "@/typings/Road";
import { Component, Prop, Vue } from "vue-property-decorator";
import PublicTable from "../PublicTable.vue";

@Component({
	components: {
		PublicTable,
	},
})
export default class RoadInfoTable extends Vue {
	// search
	private m_search_name = "";
	private m_search_type = "";
	private m_search_mlevel = "";

	@Prop({ required: true }) readonly road_types!: Array<string>;
	@Prop({ required: true }) readonly road_mlevels!: Array<string>;

	// table
	private m_table = new Array<Road>();
	private m_tableRadio = 0;

	public update_table(
		page_size: number,
		page: number,
		callback: (total: number) => void
	) {
		MyAxios.get_road_info_search(
			page_size,
			page,
			this.m_search_name,
			this.m_search_type,
			this.m_search_mlevel,
			(total, data) => {
				callback(total);
				this.m_table = data;
			}
		);
	}
}
</script>
