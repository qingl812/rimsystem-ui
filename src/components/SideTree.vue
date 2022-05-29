<template>
    <div class="title centered">
        <el-icon>
            <FolderOpened />
        </el-icon>
        <span>{{ title }}</span>
    </div>
    <div class="main">
        <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false">
            <template #default="{ node, data }">
                <span class="custom-tree-node" @click="onClick(data)">
                    <template v-if="
                        typeof data.isFolder != 'undefined' && data.isFolder
                    ">
                        <el-icon>
                            <Folder />
                        </el-icon>
                        <span class="folder">{{ node.label }}</span>
                    </template>
                    <template v-else>
                        <el-icon>
                            <Document />
                        </el-icon>
                        <span>{{ node.label }}</span>
                    </template>
                </span>
            </template>
        </el-tree>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export interface TreeNode {
    id: string;
    label: string;
    isFolder?: boolean;
    children?: Array<TreeNode>;
    callback?: (data: TreeNode) => void;
}

export default defineComponent({
    name: "SideTree",
    props: {
        // table
        title: String,
        data: Array as PropType<Array<TreeNode>>,
    },
    methods: {
        onClick(node: TreeNode): void {
            if (node.callback)
                node.callback(node);
        }
    },
});
</script>

<style scoped lang="scss">
.title {
    height: 40px;
    color: black;
    border-bottom: 2px solid #43ace5;

    span {
        margin-left: 2px;
    }
}

.main {
    .el-tree {
        background: none;

        .custom-tree-node {
            color: #304080;

            width: 100%;

            span {
                margin-left: 2px;
            }
        }
    }
}
</style>
