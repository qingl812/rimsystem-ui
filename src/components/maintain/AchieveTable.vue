<template>
    <!-- 实现呈批 -->
    <PublicTable title="项目实施呈现表" :data="table_data" :loading="table_loading" @updated="handleUpdate"
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
            <el-table-column prop="name" label="项目名称" align="center">
            </el-table-column>
            <el-table-column prop="type" label="项目类型" align="center">
            </el-table-column>
            <el-table-column prop="date" label="录入日期" align="center">
            </el-table-column>
            <el-table-column prop="is_act" label="现场实施是否执行" align="center">
            </el-table-column>
            <el-table-column prop="is_finish" label="现场实施是否完成" align="center">
            </el-table-column>
        </template>

        <template #search>
            <el-row>
                <el-col :span="4" class="centered-vertical">
                    <el-date-picker v-model="search_date" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-col>
                <el-col :span="4">
                    <el-button class="search_button" type="primary" @click="handleUpdate">
                        查询
                    </el-button>
                </el-col>
            </el-row>
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

interface AchieveInfo {
    id: string;
    name: string;
    type: string;
    date: string;
    is_act: string;
    is_finish: string;
}

export default defineComponent({
    name: "AchieveTable",
    components: {
        PublicTable
    },
    data() {
        return {
            selected_line: "",
            search_date: "",
            // table
            table_data: new Array<AchieveInfo>(),
            table_loading: false,
        };
    },
    methods: {
        handleUpdate() {
            if (this.table_loading)
                return;
            this.table_loading = true;
            this.table_data = new Array<AchieveInfo>();
            // 日期格式转换
            const date = new Date(this.search_date);
            let dateStr = date.getFullYear() + "/";
            let t = (date.getMonth() + 1).toString();
            if (t.length == 1) t = "0" + t;
            dateStr += t;

            axios({
                method: "post",
                url: "/searchMonthFundOfYear",
                data: {
                    pageSize: this.$store.state.data_pagination.page_size,
                    currentPage: this.$store.state.data_pagination.current_page,
                    createTableTime: dateStr,
                },
            }).then((response: AxiosResponse) => {
                if (response.data.code == 200) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    response.data.data.pageInfo.list.forEach((element: any) => {
                        const date = new Date(element.fundTime);
                        this.table_data.push({
                            id: element.id,
                            date: date.getFullYear() +
                                "/" +
                                (date.getMonth() + 1) +
                                "/" +
                                date.getDay() +
                                " " +
                                date.getHours() +
                                ":" +
                                date.getMinutes() +
                                ":" +
                                date.getSeconds(),
                            name: element.fundName,
                            type: "null",
                            is_act: "null",
                            is_finish: "null",
                        });
                    });
                }
                this.$store.state.data_pagination.total_size = response.data.data.pageInfo.total;
                this.table_loading = false;
            });
        }
    }
});
</script>

<style scoped lang="scss">
.search_button {
    margin-left: 20px;
}
</style>
