<template>
    <SideTree title="请选择下面的树" :data="tree_data">
        <template #right_parent>
            <el-icon>
                <View />
            </el-icon>
            <el-icon @click.stop="add_branch_road">
                <CirclePlusFilled />
            </el-icon>
            <el-icon @click.stop="remove_main_road">
                <RemoveFilled />
            </el-icon>
        </template>
        <template #right_child>
            <el-icon>
                <View />
            </el-icon>
            <el-icon @click.stop="remove_branch_road">
                <RemoveFilled />
            </el-icon>
        </template>
    </SideTree>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideTree, { TreeNode } from "@/components/SideTree.vue";
import tools from "@/typings/Tools"

export default defineComponent({
    name: "SideTreeRoad",
    components: {
        SideTree,
    },
    data() {
        return {
            tree_data: new Array<TreeNode>(),
        }
    },
    emits: ["updated_node"],
    beforeCreate() {
        this.$store.dispatch("get_road_info", tools.get_router_query("road_id"));
    },
    watch: {
        "$store.state.road_info": function () {
            if (this.$store.state.road_info.id == "") {
                this.tree_data = []
            }
            else {
                this.tree_data = [{
                    id: this.$store.state.road_info.id,
                    label: this.$store.state.road_info.name,
                    isFolder: true,
                    children: [],
                    callback: () => {
                        this.$router.push({
                            query: {
                                type: "road",
                                mode: "edit",
                                road_id: tools.get_router_query("road_id"),
                            }
                        }).then(() => {
                            this.$emit("updated_node");
                        });
                    },
                }]
                this.$store.state.road_info.branch_road.forEach((element) => {
                    this.tree_data[0].children?.push({
                        id: element.id,
                        label: element.name,
                        callback: (node) => {
                            this.$router.push({
                                query: {
                                    type: "branch",
                                    mode: "edit",
                                    road_id: tools.get_router_query("road_id"),
                                    branch_id: node.id,
                                }
                            }).then(() => {
                                this.$emit("updated_node");
                            });
                        },
                    });
                });
            }
        }
    },
    methods: {
        remove_main_road() {
            console.log("removeMainRoad");
        },
        add_branch_road() {
            this.$router.push({
                path: "/data-information",
                query: {
                    type: "branch",
                    mode: "add",
                    road_id: tools.get_router_query("road_id"),
                }
            }).then(() => {
                this.$emit("updated_node");
            });
        },
        remove_branch_road() {
            console.log("removeBranchRoad");
        },
    }
});
</script>

<style scoped lang="scss">
.el-icon {
    margin-left: 4px;
}
</style>
