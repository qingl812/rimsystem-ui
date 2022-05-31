<template>
    <!-- 文档管理 -->
    <el-container class="global-layout">
        <el-aside>
            <SideTree title="请选择级别" :data="tree_data"></SideTree>
        </el-aside>

        <el-main>
            <DocTable v-if="mode == 'view'"></DocTable>
            <DocEdit v-else-if="mode == 'add' || mode == 'edit'"></DocEdit>
        </el-main>
    </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideTree, { TreeNode } from "@/components/SideTree.vue";
import tools from "@/typings/Tools"
import DocTable from "@/components/other/DocTable.vue";
import DocEdit from "@/components/other/DocEdit.vue";

export default defineComponent({
    name: "DocManage",
    components: {
        SideTree,
        DocTable,
        DocEdit
    },
    data() {
        return {
            tree_data: new Array<TreeNode>(),
            mode: "",
        }
    },
    beforeCreate() {
        this.$store.dispatch("get_road_info", tools.get_router_query("road_id"));
    },
    beforeMount() {
        this.getMode();
    },
    watch: {
        "$store.state.road_info": function () {
            this.tree_data = [{
                id: this.$store.state.road_info.id,
                label: this.$store.state.road_info.name,
                isFolder: true,
                children: [],
                callback: () => {
                    this.$router.push({
                        path: "/doc-manage",
                        query: {
                            type: "all",
                            mode: "view",
                            road_id: tools.get_router_query("road_id"),
                        }
                    });
                },
            }]
            const types = ["a", "b", "c"];
            types.forEach((element) => {
                this.tree_data[0].children?.push({
                    id: element,
                    label: element,
                    callback: (node) => {
                        this.$router.push({
                            path: "/doc-manage",
                            query: {
                                type: node.id,
                                mode: "view",
                                road_id: tools.get_router_query("road_id"),
                            }
                        });
                    },
                });
            });
        },
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
