<template>
    <PublicTable title="道路信息列表" :data="table_data" :loading="table_loading" @updated="handleUpdate"
        :has_pagination="true">
        <template #table>
            <el-table-column label="选择" width="55">
                <template v-slot:=scope>
                    <el-radio v-model="selected_line" :label="scope.row.id">
                        <i></i>
                    </el-radio>
                </template>
            </el-table-column>
            <el-table-column prop="num" label="道路编号" align="center" width="100">
            </el-table-column>
            <el-table-column prop="name" label="道路名称" align="center">
            </el-table-column>
            <el-table-column prop="type" label="道路类型" align="center">
            </el-table-column>
            <el-table-column prop="maintenance_level" label="道路养护等级" align="center">
            </el-table-column>
            <el-table-column prop="unit" label="管理单位" align="center">
            </el-table-column>
        </template>

        <template #search>
            <el-row>
                <el-col :span="4">
                    <el-input placeholder="道路名称" v-model="search_name" clearable>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="search_type" clearable placeholder="道路类型">
                        <el-option v-for="item in road_types" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="search_mlevel" clearable placeholder="道路养护等级">
                        <el-option v-for="item in road_mlevels" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="handleUpdate">
                        查询
                    </el-button>
                </el-col>
            </el-row>
        </template>

        <template #button>
            <el-button type="primary" plain>新增</el-button>
            <el-button type="primary" plain>查看</el-button>
            <el-button type="primary" plain>删除</el-button>
        </template>
    </PublicTable>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PublicTable from "@/components/PublicTable.vue";
import axios, { AxiosResponse } from "axios";

interface RoadInfo {
    id: number;
    num: string;
    name: string;
    type: string;
    maintenance_level: string;
    unit: string;
}

export default defineComponent({
    name: "RoadInfoTable",
    components: {
        PublicTable
    },
    data() {
        this.$store.dispatch("get_datas", "road_type");
        return {
            // search
            road_types: this.$store.state.datas.road_type,
            road_mlevels: this.$store.state.datas.mlevels,
            search_name: "",
            search_type: "",
            search_mlevel: "",
            selected_line: "",
            // table
            table_data: new Array<RoadInfo>(),
            table_loading: false,
        };
    },
    methods: {
        handleUpdate() {
            this.table_loading = true;
            this.table_data = new Array<RoadInfo>();
            axios({
                method: "post",
                url: "/api/road_info_list",
                data: {
                    pageSize: this.$store.state.data_pagination.page_size,
                    currentPage: this.$store.state.data_pagination.current_page,
                    roadName: this.search_name,
                    roadType: this.search_type,
                    roadMaintenance: this.search_mlevel,
                },
            }).then((response: AxiosResponse) => {
                if (response.status == 200) {
                    this.$store.state.data_pagination.total_size = response.data.pageCount;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    response.data.pageData.forEach((element: any) => {
                        this.table_data.push({
                            id: element.id,
                            num: element.roadNum,
                            name: element.roadName,
                            type: element.roadType,
                            maintenance_level: element.roadMaintenanceGrade,
                            unit: element.user.organizationName,
                        });
                    });
                }
                this.table_loading = false;
            });
        }
    }
});
</script>

<style lang="scss">
.el-input {
    width: 100%;
    padding-right: 20px;
}

.el-select {
    width: 100%;
}
</style>
