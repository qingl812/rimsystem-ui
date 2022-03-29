<template>
	<div class="SideTree">
		<div class="title centered">
			<ion-icon name="folder-open-outline"></ion-icon>
			<span>{{ title }}</span>
		</div>
		<div class="main">
			<el-tree
				:data="data"
				node-key="id"
				default-expand-all
				:expand-on-click-node="false"
			>
				<span
					class="custom-tree-node"
					slot-scope="{ node, data }"
					@click="jump(data)"
				>
					<template
						v-if="
							typeof data.isFolder != 'undefined' && data.isFolder
						"
						><ion-icon name="folder-outline"></ion-icon>
						<span class="folder">{{ node.label }}</span>
					</template>
					<template v-else
						><ion-icon name="document-outline"></ion-icon>
						<span>{{ node.label }}</span>
					</template>
				</span>
			</el-tree>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

export interface TreeNode {
	id: number;
	label: string;
	url?: string;
	isFolder?: boolean;
	children?: Array<TreeNode>;
	callback?: (data: TreeNode) => void;
}

@Component
export default class SideTree extends Vue {
	@Prop({ required: true }) readonly title?: string;
	@Prop({ required: true }) readonly data?: Array<TreeNode>;

	jump(data: TreeNode): void {
		let url = data.url;
		if (typeof url != "undefined" && url != "") {
			let path = this.$router.currentRoute.path;
			path = path.substr(path.lastIndexOf("/") + 1);
			if (path != url)
				this.$router.push({
					path: url,
				});
		}

		data.callback?.(data);
	}
}
</script>

<style scoped lang="scss">
@import "@/themes/normal.scss";

.title {
	height: 40px;
	color: black;
	border-bottom: $border-divider;

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
			div {
				margin-left: 2px;
			}
		}
	}
}
</style>
