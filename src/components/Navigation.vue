<template>
	<div class="navigation">
		<div>
			<router-link to="/home">首页</router-link>
		</div>
		<div>
			<router-link to="/visaRecord">现场签证记录</router-link>
		</div>
		<div>
			<router-link to="/roadInformation">道路资料</router-link>
		</div>
		<div>
			<router-link to="/roadDetection">道路检测</router-link>
		</div>
		<div>
			<router-link to="/maintenanceManage">维修管理</router-link>
		</div>
		<div>
			<router-link to="/moneyManage">资金管理</router-link>
		</div>
		<div>
			<router-link to="/workCommunication">工作沟通</router-link>
		</div>
		<div>
			<router-link to="/systemManage">系统管理</router-link>
		</div>
		<div>
			<router-link to="/login">注销</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Navigation'
	}
</script>

<style scoped>
	.navigation {
		background-color: rgb(58, 165, 219);
		display: flex;
	}

	.navigation>div {
		height: 100%;
		width: 100px;
		border-left: 2px solid rgb(161, 188, 216);
		/* text-decoration: none; */
		/* css3子元素水平居中 */
		justify-content: center;
		/* css3子元素垂直居中 */
		align-items: center;
		display: -webkit-flex;
	}
	
	.navigation a {
		text-decoration: none;
		color: whitesmoke;
	}
</style>
