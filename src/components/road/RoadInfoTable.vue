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
                    <el-input placeholder="道路名称" v-model="search_name" clearable @input="handleUpdate">
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="search_type" clearable placeholder="道路类型" @change="handleUpdate">
                        <el-option v-for="item in $store.state.datas.road_type" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="search_mlevel" clearable placeholder="道路养护等级" @change="handleUpdate">
                        <el-option v-for="item in $store.state.datas.mlevels" :key="item" :label="item" :value="item">
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
            <el-button type="primary" plain
                @click="$router.push({ path: '/data-information', query: { type: 'road', mode: 'add' } })">新增
            </el-button>
            <el-button type="primary" plain @click="view_road">查看</el-button>
            <el-button type="primary" plain @click="remove_road">删除</el-button>
        </template>
    </PublicTable>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PublicTable from "@/components/PublicTable.vue";
import axios, { AxiosResponse } from "axios";
import tools from "@/typings/Tools";
import { ElMessageBox } from "element-plus";

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
            if (this.table_loading) return;
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
                    this.$store.state.data_pagination.total_size = response.data.totalCount;
                }
                this.table_loading = false;
            });
        },
        view_road() {
            if (this.selected_line == "") {
                tools.error("请选择一条数据");
                return;
            }
            this.$router.push({
                path: "/data-information",
                query: {
                    type: "road",
                    mode: "edit",
                    road_id: this.selected_line,
                }
            });
        },
        remove_road() {
            if (this.selected_line == "") {
                tools.error("请选择一条数据");
                return;
            }
            let selected_name = "";
            this.table_data.forEach((element) => {
                if (element.id.toString() == this.selected_line) {
                    selected_name = element.name;
                }
            });
            ElMessageBox.confirm(
                '是否要删除道路' + selected_name + '？',
                '警告',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                .then(() => {
                    console.log(this.selected_line);
                    axios({
                        method: "post",
                        url: "/deleteRoad",
                        params: {
                            roadId: this.selected_line,
                        },
                    }).then((response: AxiosResponse) => {
                        if (response.data.code == 200) {
                            tools.success("删除成功");
                            this.handleUpdate();
                        } else {
                            tools.error("删除失败");
                            console.log(response);
                        }
                    }).catch((error) => {
                        tools.error("网络错误？");
                        console.log(error);
                    });
                })
                .catch(() => {
                    tools.error("已取消");
                })
        },
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
