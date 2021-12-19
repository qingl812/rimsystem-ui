<template>
	<div class="gnavigate">
		<el-menu
			class="el-menu-demo"
			mode="horizontal"
			:router="true"
			:default-active="$route.path"
			background-color="#545c64"
			active-text-color="#facc4b"
			text-color="#ffffff"
		>
			<el-menu-item index="/home">首页</el-menu-item>
			<el-menu-item index="/a">现场签证记录</el-menu-item>
			<el-menu-item index="/b">道路资料</el-menu-item>
			<el-menu-item index="/c">道路检测</el-menu-item>
			<el-menu-item index="/d">维修管理</el-menu-item>
			<el-menu-item index="/e">资金管理</el-menu-item>
			<el-menu-item index="/f">工作沟通</el-menu-item>
			<el-menu-item index="/g">系统管理</el-menu-item>
			<el-menu-item index="/h">注销</el-menu-item>
		</el-menu>
	</div>
</template>

<style scoped lang="scss"></style>
