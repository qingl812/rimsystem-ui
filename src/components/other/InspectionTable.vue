<template>
    <!-- 日常巡查 -->
    <PublicTable title="日常巡查列表" :data="table_data" :loading="table_loading" @updated="handleUpdate"
        :has_pagination="false">
        <template #table>
            <el-table-column label="选择" width="55">
                <template v-slot:=scope>
                    <el-radio v-model="selected_line" :label="scope.row.id">
                        <i></i>
                    </el-radio>
                </template>
            </el-table-column>
            <el-table-column prop="id" label="检查ID" align="center" width="100">
            </el-table-column>
            <el-table-column prop="name" label="道路名称" align="center">
            </el-table-column>
            <el-table-column prop="date" label="检查日期" align="center">
            </el-table-column>
            <el-table-column prop="weather" label="天气情况" align="center">
            </el-table-column>
        </template>

        <template #search>
            <el-row>
                <el-col :span="4" class="centered-vertical">
                    <el-date-picker v-model="search_begin" type="date" placeholder="开始时间">
                    </el-date-picker>
                </el-col>
                <el-col :span="4" class="centered-vertical">
                    <el-date-picker v-model="search_end" type="date" placeholder="结束时间">
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
            <el-button type="primary" plain>新增</el-button>
            <el-button type="primary" plain>查看</el-button>
            <el-button type="primary" plain>删除</el-button>
            <el-button type="primary" plain>返回</el-button>
        </template>
    </PublicTable>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PublicTable from "@/components/PublicTable.vue";
// import axios, { AxiosResponse } from "axios";

interface SummaryInfo {
    id: string;
    name: string;
    date: string;
    weather: string;
}

export default defineComponent({
    name: "InspectionTable",
    components: {
        PublicTable
    },
    data() {
        return {
            selected_line: "",
            search_begin: "",
            search_end: "",
            // table
            table_data: new Array<SummaryInfo>(),
            table_loading: false,
        };
    },
    methods: {
        handleUpdate() {
            if (this.table_loading)
                return;
            this.table_loading = true;
            this.table_data = new Array<SummaryInfo>();
            // 日期格式转换
            // const date = new Date(this.search_date);
            // let year = date.getFullYear().toString();
            // let month = (date.getMonth() + 1).toString();

            // axios({
            //     method: "post",
            //     url: "/searchPatrolByMonth",
            //     params: {
            //         year: Number(year),
            //         month: Number(month),
            //     },
            // }).then((response: AxiosResponse) => {
            //     this.table_loading = false;
            // });
        }
    }
});
</script>

<style scoped lang="scss">
.search_button {
    margin-left: 20px;
}
</style>
