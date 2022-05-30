<template>
    <!-- 道路检测 -->
    <el-container class="global-layout">
        <el-aside>
            <SideBar title="检测数据" :options="['日常巡查', '巡查汇总']" :click_callback="onClickSideBar"></SideBar>
        </el-aside>

        <el-main>
            <RoadInfoTable v-if="type == 'daily'"></RoadInfoTable>
            <InspectionSummaryTable v-else-if="type == 'summary'"></InspectionSummaryTable>
        </el-main>
    </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "@/components/SideBar.vue";
import tools from "@/typings/Tools";
import RoadInfoTable from "@/components/road/RoadInfoTable.vue";
import InspectionSummaryTable from "@/components/other/InspectionSummaryTable.vue";

export default defineComponent({
    name: "RoadDetection",
    components: {
        SideBar,
        RoadInfoTable,
        InspectionSummaryTable
    },
    data() {
        let type = tools.get_router_query("type");
        if (type != "daily" && type != "summary")
            type = "daily";
        return {
            type: type,
        }
    },
    methods: {
        onClickSideBar(type: string) {
            if (type == "日常巡查")
                type = "daily";
            else if (type == "巡查汇总")
                type = "summary";
            this.type = type;
            this.$router.push({ query: { type: type } });
        }
    },

});
</script>

<style scoped lang="scss">
.el-main {
    padding-left: 20px;
    padding-right: 20px;
}
</style>
