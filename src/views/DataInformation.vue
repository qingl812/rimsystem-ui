<template>
    <!-- 数据信息 -->
    <el-container class="global-layout">
        <el-aside>
            <SideTreeRoad></SideTreeRoad>
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
            type: "",
            selected_tab: "first",
        };
    },
    watch: {
        "$route.query": function () {
            this.getMode();
        },
    },
    created() {
        this.getMode();
    },
    methods: {
        getMode() {
            if (this.$route.path != "/data-information") {
                return;
            }
            let type = tools.get_router_query("type");
            if (type != "road" && type != "branch") {
                type = "road";
            }
            let mode = tools.get_router_query("mode");
            if (mode != "add" && mode != "edit") {
                this.$router.push("/");
                tools.error("参数错误")
            }
            let road_id = tools.get_router_query("road_id");
            let branch_id = tools.get_router_query("branch_id");
            if ((mode == "add" && type == "branch" && branch_id == "") ||
                (mode == "edit" && type == "road" && road_id == "") ||
                (mode == "edit" && type == "branch" && (road_id == "" || branch_id == ""))
            ) {
                this.$router.push("/");
                tools.error("参数错误")
            }
            this.type = type;
            this.$store.dispatch("get_road_info", tools.get_router_query("road_id"));
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
