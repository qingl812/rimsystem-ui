<template>
	<!-- 现场实施记录 -->
    <PublicTable title="现场实施记录" :data="table_data" :loading="table_loading" @updated="handleUpdate"
        :has_pagination="true">
        <template #table>
            <el-table-column label="选择" width="55">
                <template v-slot:=scope>
                    <el-radio v-model="selected_line" :label="scope.row.id">
                        <i></i>
                    </el-radio>
                </template>
            </el-table-column>
            <el-table-column prop="id" label="编号" align="center" width="100">
            </el-table-column>
            <el-table-column prop="date" label="维修年月" align="center">
            </el-table-column>
            <el-table-column prop="total_price" label="维修总价" align="center">
            </el-table-column>
            <el-table-column prop="is_act" label="现场实施是否执行" align="center">
            </el-table-column>
            <el-table-column prop="is_finish" label="现场实施是否完成" align="center">
            </el-table-column>
        </template>

        <template #button>
            <el-button type="primary" plain>查看</el-button>
            <el-button type="primary" plain>删除</el-button>
        </template>
    </PublicTable>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PublicTable from "@/components/PublicTable.vue";
import axios, { AxiosResponse } from "axios";

interface PlanInfo {
    id: string;
    date: string;
    total_price: string;
    is_act: string;
    is_finish: string;
}

export default defineComponent({
    name: "FieldTable",
    components: {
        PublicTable
    },
    data() {
        return {
            selected_line: "",
            // table
            table_data: new Array<PlanInfo>(),
            table_loading: false,
        };
    },
    methods: {
        handleUpdate() {
            if (this.table_loading)
                return;
            this.table_loading = true;
            this.table_data = new Array<PlanInfo>();
            axios({
                method: "post",
                url: "/allPlan",
                data: {
                    pageSize: this.$store.state.data_pagination.page_size,
                    currentPage: this.$store.state.data_pagination.current_page,
                },
            }).then((response: AxiosResponse) => {
                if (response.data.code == 200) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    response.data.data.pageBean.pageData.forEach((element: any) => {
                        const date = new Date(element.planTime);
                        this.table_data.push({
                            id: element.id,
                            date: date.getFullYear() + "年" + date.getMonth() + "月",
                            total_price: element.totalPrice + "元",
                            is_act: element.isAct,
                            is_finish: element.isFinish,
                        });
                    });
                }
                this.$store.state.data_pagination.total_size = response.data.data.pageBean.totalCount;
                this.table_loading = false;
            });
        }
    }
});
</script>
