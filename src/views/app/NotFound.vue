<template>
	<el-empty description="404 页面找不到了">
		<el-button type="primary" @click="$router.back()">返回</el-button>
		<el-button type="primary" @click="$router.push({ path: '/' })">
			主页
		</el-button>
	</el-empty>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "NotFoundView",
	beforeCreate() {
		this.$store.commit("set_page_status", "not_found");
	},
	watch: {
		$route() {
			this.$store.commit("set_page_status", "init");
		},
	},
});
</script>

<style scoped lang="scss">
.el-empty {
	height: 100vh;
}
</style>
