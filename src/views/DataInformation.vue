<template>
    <!-- 数据信息 -->
    <el-container class="global-layout">
        <el-aside>
            <SideTreeRoad @updated_node="updated_node"></SideTreeRoad>
        </el-aside>
        <el-main v-if="type == 'road'">
            <el-tabs type="card" v-model="selected_tab">
                <el-tab-pane label="基本信息" name="first">
                    <RoadInfoEdit></RoadInfoEdit>
                </el-tab-pane>

                <el-tab-pane label="图片信息" name="second">
                </el-tab-pane>

                <el-tab-pane label="录音录像" name="third">录音录像</el-tab-pane>
            </el-tabs>
        </el-main>

        <el-main v-else>
            <el-tabs type="card" v-model="selected_tab">
                <el-tab-pane label="基本信息" name="first">
                    <BranchInfoEdit></BranchInfoEdit>
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
        return {
            type: tools.get_router_query("type"),
            selected_tab: "first",
        };
    },
    methods: {
        updated_node() {
            this.$store.dispatch("get_road_info", tools.get_router_query("road_id"));
            this.type = tools.get_router_query("type");
        }
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
