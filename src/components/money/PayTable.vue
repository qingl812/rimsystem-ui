<template>
    <!-- 资金支付管理 -->
    <PublicTable title="资金支付管理" :data="table_data" :loading="table_loading" @updated="handleUpdate"
        :has_pagination="true">
        <template #table>
            <el-table-column prop="id" label="序号" align="center" width="100">
            </el-table-column>
            <el-table-column prop="date" label="年份" align="center">
            </el-table-column>
            <el-table-column prop="total_price" label="总预算（元）" align="center">
            </el-table-column>
            <el-table-column prop="finish_price" label="已拨付金额" align="center">
            </el-table-column>
            <el-table-column prop="wait_price" label="呈批待拨付金额" align="center">
            </el-table-column>
            <el-table-column prop="pre_price" label="预算金额" align="center">
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template>
                    <el-button type="primary" plain>
                        支付查看
                    </el-button>
                    <el-button type="primary" plain>
                        支付管理
                    </el-button>
                </template>
            </el-table-column>
        </template>

        <template #button>
            <el-button type="primary" plain>
                资金预算管理
            </el-button>
            <el-button type="primary" plain>导出</el-button>
        </template>
    </PublicTable>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PublicTable from "@/components/PublicTable.vue";
import axios, { AxiosResponse } from "axios";

interface PayInfo {
    id: string;
    date: string;
    total_price: string;
    finish_price: string;
    wait_price: string;
    pre_price: string;
}

export default defineComponent({
    name: "PayTable",
    components: {
        PublicTable
    },
    data() {
        return {
            // table
            table_data: new Array<PayInfo>(),
            table_loading: false,
        };
    },
    methods: {
        handleUpdate() {
            if (this.table_loading)
                return;
            this.table_loading = true;
            this.table_data = new Array<PayInfo>();
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
                            total_price: element.totalPrice,
                            finish_price: "",
                            wait_price: "",
                            pre_price: "",
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
