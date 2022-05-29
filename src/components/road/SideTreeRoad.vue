<template>
    <SideTree title="请选择下面的树" :data="tree_data"></SideTree>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideTree, { TreeNode } from "@/components/SideTree.vue";
import { Road } from "@/typings/interfaces";
import tools from "@/typings/Tools"

export default defineComponent({
    name: "SideTreeRoad",
    components: {
        SideTree,
    },
    props: {
        road: Object as () => Road,
        branch_id: String,
        road_id: String
    },
    emits: ['update:branch_id', 'update:road_id'],
    data() {
        return {
            tree_data: new Array<TreeNode>(),
        }
    },
    beforeUpdate() {
        this.tree_data = [{
            id: this.$store.state.road_info.id,
            label: this.$store.state.road_info.name,
            isFolder: true,
            children: [],
            callback: () => {
                tools.remove_query("branch_id");
                this.$emit('update:branch_id', "")
            },
        }]
        this.$store.state.road_info.branch_road.forEach((element) => {
            this.tree_data[0].children?.push({
                id: element.id,
                label: element.name,
                callback: (node) => {
                    tools.add_router_query("branch_id", node.id);
                    this.$emit('update:branch_id', node.id)
                },
            });
        });
    }
});
</script>
