<template>
    <!-- 巡查汇总 -->
    <PublicTable title="巡查汇总表" :data="table_data" :loading="table_loading" @updated="handleUpdate"
        :has_pagination="false">
        <template #table>
            <el-table-column prop="id" label="序号" align="center" width="100">
            </el-table-column>
            <el-table-column prop="name" label="道路名称" align="center">
            </el-table-column>
            <el-table-column prop="segment_name" label="道路段名称" align="center">
            </el-table-column>
            <el-table-column prop="date" label="巡查日期" align="center">
            </el-table-column>
            <el-table-column prop="location_description" label="具体位置描述" align="center">
            </el-table-column>
            <el-table-column prop="damaged_pavement_area" label="破损路面面积（m2）" align="center">
            </el-table-column>
            <el-table-column prop="damaged_sidewalk_area" label="破损人行道面积（m2）" align="center">
            </el-table-column>
            <el-table-column prop="damaged_blind_area" label="破损盲道面积（m2）" align="center">
            </el-table-column>
            <el-table-column prop="damaged_curb_length" label="破损路缘石（m）" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template>
                    <el-button type="primary" plain>
                        查看
                    </el-button>
                </template>
            </el-table-column>
        </template>

        <template #search>
            <el-row>
                <el-col :span="4" class="centered-vertical">
                    <el-date-picker v-model="search_date" type="month" placeholder="选择月">
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
            <el-button type="primary" plain>病害汇总</el-button>
            <el-button type="primary" plain>导出</el-button>
            <el-button type="primary" plain>返回</el-button>
        </template>
    </PublicTable>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PublicTable from "@/components/PublicTable.vue";
import axios, { AxiosResponse } from "axios";

interface SummaryInfo {
    id: string;
    name: string;
    segment_name: string;
    date: string;
    location_description: string;
    damaged_pavement_area: string;
    damaged_sidewalk_area: string;
    damaged_blind_area: string;
    damaged_curb_length: string;
}

export default defineComponent({
    name: "InspectionSummaryTable",
    components: {
        PublicTable
    },
    data() {
        return {
            selected_line: "",
            search_date: new Date(),
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
            const date = new Date(this.search_date);
            let year = date.getFullYear().toString();
            let month = (date.getMonth() + 1).toString();

            axios({
                method: "post",
                url: "/searchPatrolByMonth",
                params: {
                    year: Number(year),
                    month: Number(month),
                },
            }).then((response: AxiosResponse) => {
                if (response.data.code == 200) {
                    let data = response.data.data.patrolLogs;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    data.forEach((main: any) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        main.branchPatrol.forEach((element: any) => {
                            let info = element.branchRoad;
                            this.table_data.push({
                                id: element.id,
                                name: main.roadName,
                                segment_name: info.branchName,
                                date: main.checkTime,
                                location_description: element.locationDescription,
                                damaged_pavement_area: info.pavementBreak,
                                damaged_sidewalk_area: info.sidewalkBrickBreak,
                                damaged_blind_area: info.blindBrickBreak,
                                damaged_curb_length: info.curbBreak,
                            });
                        })
                    });
                }
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
