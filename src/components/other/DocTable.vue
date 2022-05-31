<template>
    <!-- 文档信息 -->
    <PublicTable :title="$store.state.road_info.name + ' - 全部资料'" :data="table_data" :loading="table_loading"
        @updated="handleUpdate" :has_pagination="true">
        <template #table>
            <el-table-column label="选择" width="55">
                <template v-slot:=scope>
                    <el-radio v-model="selected_line" :label="scope.row.id">
                        <i></i>
                    </el-radio>
                </template>
            </el-table-column>
            <el-table-column prop="id" label="序号" align="center" width="100">
            </el-table-column>
            <el-table-column prop="name" label="名称" align="center">
            </el-table-column>
            <el-table-column prop="format" label="格式" align="center" width="100">
            </el-table-column>
            <el-table-column prop="time" label="时间" align="center" width="200">
            </el-table-column>
            <el-table-column label="查看" align="center" width="60">
                <template v-slot:=scope>
                    <el-icon @click="handleView(scope.$index, scope.row)">
                        <View />
                    </el-icon>
                </template>
            </el-table-column>
            <el-table-column label="下载" align="center" width="60">
                <template v-slot:=scope>
                    <el-icon @click="handleDownload(scope.$index, scope.row)">
                        <Download />
                    </el-icon>
                </template>
            </el-table-column>
        </template>

        <template #button>
            <el-button type="primary" plain
                @click="$router.push({ path: 'doc-manage', query: { road_id: tools.get_router_query('road_id'), mode: 'add' } })">
                新增
            </el-button>
            <el-button type="primary" plain @click="handleRemove">删除</el-button>
        </template>
    </PublicTable>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PublicTable from "@/components/PublicTable.vue";
import axios, { AxiosResponse } from "axios";
import tools from "@/typings/Tools";
import { ElMessageBox } from "element-plus";

interface DocInfo {
    id: string;
    name: string;
    format: string;
    time: string;
}

export default defineComponent({
    name: "DocTable",
    components: {
        PublicTable
    },
    data() {
        return {
            selected_line: "",
            // table
            table_data: new Array<DocInfo>(),
            table_loading: false,
            tools: tools
        };
    },
    methods: {
        handleUpdate() {
            // TODO:
            if (this.table_loading)
                return;
            this.table_loading = true;
            this.table_data = new Array<DocInfo>();
            axios({
                method: "post",
                url: "/allPlan",
                data: {
                    pageSize: this.$store.state.data_pagination.page_size,
                    currentPage: this.$store.state.data_pagination.current_page,
                },
            }).then((response: AxiosResponse) => {
                if (response.data.code == 200) {
                    this.table_data.push({
                        id: "id",
                        name: "name",
                        format: "format",
                        time: "time",
                    });
                }
                this.$store.state.data_pagination.total_size = 1;
                this.table_loading = false;
            });
        },
        handleView(index: number, row: DocInfo) {
            this.$router.push({ path: 'doc-manage', query: { road_id: tools.get_router_query('road_id'), mode: 'edit', doc_id: row.id } })
        },
        handleDownload(index: number, row: DocInfo) {
            console.log("download", index, row);
        },
        handleRemove() {
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
                '是否要删除文档' + selected_name + '？',
                '警告',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                .then(() => {
                    tools.success("删除成功");
                })
                .catch(() => {
                    tools.error("已取消");
                })
        },
    },
    watch: {
        "$route.query": function () {
            this.handleUpdate();
        },
    },
});
</script>
