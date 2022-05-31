<template>
    <!-- 日常巡查 -->
    <el-container class="global-layout">
        <el-aside>
            <SideTreeRoad></SideTreeRoad>
        </el-aside>
        <el-main>
            <InspectionTable v-if="mode == 'view'"></InspectionTable>
        </el-main>
    </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideTreeRoad from "@/components/road/SideTreeRoad.vue";
import tools from "@/typings/Tools"
import InspectionTable from "@/components/other/InspectionTable.vue";

export default defineComponent({
    name: "DataInformation",
    components: {
        SideTreeRoad,
        InspectionTable
    },
    data() {
        return {
            type: tools.get_router_query("type"),
            mode: "",
        };
    },
    created() {
        this.getMode();
    },
    watch: {
        "$route.query": function () {
            this.getMode();
        },
    },
    methods: {
        getMode() {
            let mode = tools.get_router_query("mode");
            if (tools.get_router_query("road_id") == "") {
                this.$router.push("/");
            }
            if (mode != "view" && mode != "add" && mode != "edit") {
                mode = "view";
            }
            this.mode = mode;
        },
    },
});
</script>

<style scoped lang="scss">
.el-main {
    padding-left: 20px;
    padding-right: 20px;
}
</style>
