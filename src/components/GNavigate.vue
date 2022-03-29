<template>
	<div class="gnavigate">
		<el-menu
			class="el-menu-demo"
			mode="horizontal"
			:default-active="m_active"
			text-color="white"
			active-text-color="#ffd04b"
			background-color="#43ace5"
		>
			<el-menu-item index="1" @click="jump(1)">首页</el-menu-item>
			<el-menu-item index="2" @click="jump(2)">现场签证记录</el-menu-item>
			<el-menu-item index="3" @click="jump(3)">道路资料</el-menu-item>
			<el-menu-item index="4" @click="jump(4)">道路检测</el-menu-item>
			<el-menu-item index="5" @click="jump(5)">维修管理</el-menu-item>
			<el-menu-item index="6" @click="jump(6)">资金管理</el-menu-item>
			<el-menu-item index="7" @click="jump(7)">工作沟通</el-menu-item>
			<el-menu-item index="8" @click="jump(8)">系统管理</el-menu-item>
			<el-menu-item index="9" @click="jump(9)">注销</el-menu-item>
		</el-menu>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class GNavigate extends Vue {
	private m_active = "1";
	private m_nav = new Map([
		["1", "home"],
		["2", "visa-record"],
		["3", "road-information"],
		["4", "road-detection"],
		["5", "maintenance-management"],
		["6", "money-management"],
		["7", "work-communication"],
		["8", "system-management"],
		["9", "logout"],
	]);

	mounted(): void {
		// 获取一级路由
		let t = this.$router.currentRoute.path;
		let p = t.indexOf("/");
		t = t.substr(p + 1);
		p = t.indexOf("/");
		if (p != -1) t = t.substr(0, p);

		// 判断一级路由
		this.m_nav.forEach((value, key) => {
			if (value == t) {
				this.m_active = key;
			}
		});
	}

	jump(id: number): void {
		this.m_active = id.toString();
		let target = this.m_nav.get(this.m_active);

		if (target == "logout") {
			localStorage.removeItem("authentication");
			target = "login";
		}

		// 获取一级路由
		let t = this.$router.currentRoute.path;
		let p = t.indexOf("/");
		t = t.substr(p + 1);
		if (t != target) this.$router.push({ path: "/" + target });
	}
}
</script>

<style scoped lang="scss">
@import "@/themes/normal.scss";

.gnavigate > .el-menu-item {
	height: calc($gnavigate-height - 1px);
	line-height: calc($gnavigate-height - 1px);
}
</style>
