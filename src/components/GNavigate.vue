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

	jump(id: number): void {
		this.m_active = id.toString();
		let target = "";
		switch (id) {
			case 1:
				target = "home";
				break;
			case 2:
				target = "visa-record";
				break;
			case 3:
				target = "road-information";
				break;
			case 4:
				target = "road-detection";
				break;
			case 5:
				target = "maintenance-management";
				break;
			case 6:
				target = "money-management";
				break;
			case 7:
				target = "work-communication";
				break;
			case 8:
				target = "system-management";
				break;
			case 9:
				localStorage.removeItem("authentication");
				target = "login";
				break;
		}
		this.$router.push({ path: "/" + target });
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
