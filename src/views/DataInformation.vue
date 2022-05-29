<template>
    <!-- 数据信息 -->
    <el-container class="global-layout">
        <el-aside>
            <SideTreeRoad :road="$store.state.road_info" @update:branch_id="updateBranchId"
                @update:road_id="updateRoadId"></SideTreeRoad>
        </el-aside>
        <el-main v-if="branch_id == ''">
            <el-tabs type="card" v-model="selected_tab">
                <el-tab-pane label="基本信息" name="first">
                    <RoadInfoEdit :road="$store.state.road_info"></RoadInfoEdit>
                </el-tab-pane>

                <el-tab-pane label="图片信息" name="second">
                </el-tab-pane>

                <el-tab-pane label="录音录像" name="third">录音录像</el-tab-pane>
            </el-tabs>
        </el-main>

        <el-main v-else>
            <el-tabs type="card" v-model="selected_tab">
                <el-tab-pane label="基本信息" name="first">
                    <BranchInfoEdit :road="$store.state.branch_road_info"></BranchInfoEdit>
                </el-tab-pane>

                <el-tab-pane label="图片信息" name="second">
                </el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideTreeRoad from "@/components/road/SideTreeRoad.vue";
import tools from "@/typings/Tools"
import RoadInfoEdit from "@/components/road/RoadInfoEdit.vue";
import BranchInfoEdit from "@/components/road/BranchInfoEdit.vue";

export default defineComponent({
    name: "DataInformation",
    components: {
        SideTreeRoad,
        RoadInfoEdit,
        BranchInfoEdit
    },
    data() {
        const road_id = tools.get_router_query("road_id");
        this.$store.dispatch("get_road_info", road_id);
        const branch_id = tools.get_router_query("branch_id");
        this.$store.dispatch("get_branch_road_info", branch_id);
        const type = tools.get_router_query("type");
        if (type != "add" && road_id == "") {
            this.$router.push("/");
        }

        return {
            branch_id: branch_id,
            road_id: road_id,
            add_type: type == "add",
            selected_tab: "first",
        };
    },
    methods: {
        updateBranchId(branch_id: string) {
            this.branch_id = branch_id;
            this.$store.dispatch("get_branch_road_info", branch_id);
        },
        updateRoadId(road_id: string) {
            this.road_id = road_id;
            this.$store.dispatch("get_road_info", road_id);
        },
    },
});
</script>

<style scoped lang="scss">
.el-tabs {
    width: 100%;
    height: 100%;
    padding: 0;
}
</style>
