<template>
    <!-- 维修管理 -->
    <el-container class="global-layout">
        <el-aside>
            <SideBar title="维修管理" :options="['维修计划', '实现呈批', '现场实施记录']" :click_callback="onClickSideBar"></SideBar>
        </el-aside>

        <el-main>
            <PlanTable v-if="type == 'plan'"></PlanTable>
            <AchieveTable v-else-if="type == 'achieve'"></AchieveTable>
            <FieldTable v-else-if="type == 'field'"></FieldTable>
        </el-main>
    </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "@/components/SideBar.vue";
import tools from "@/typings/Tools";
import PlanTable from "@/components/maintain/PlanTable.vue";
import AchieveTable from "@/components/maintain/AchieveTable.vue";
import FieldTable from "@/components/maintain/FieldTable.vue";

export default defineComponent({
    name: "MaintenanceManagement",
    components: {
        SideBar,
        PlanTable,
        AchieveTable,
        FieldTable
    },
    data() {
        let type = tools.get_router_query("type");
        if (type != "plan" && type != "achieve" && type != "field")
            type = "plan";
        return {
            type: type,
        }
    },
    methods: {
        onClickSideBar(type: string) {
            if (type == "维修计划")
                type = "plan";
            else if (type == "实现呈批")
                type = "achieve";
            else if (type == "现场实施记录")
                type = "field";
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
