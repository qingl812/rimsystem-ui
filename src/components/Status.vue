<template>
	<div class="status">
		<div id="organization">使用单位：惠州市公用事业管理局</div>
		<div>用户名称：admin</div>
		<div>用户类型：系统管理员</div>
		<div>当前使用版本号：v1.00</div>
	</div>
</template>

<script>
	export default {
		name: 'Status'
	}
</script>

<style scoped>
	.status {
		height: 100%;
		width: 100%;
		
		background-color: rgb(58, 165, 219);
		display: grid;
		grid-template-columns: auto 200px 200px 300px;
	}

	.status>div {
		height: 100%;
		border-left: 2px solid rgb(161, 188, 216);

		/* css3子元素水平，垂直居中 */
		justify-content: center;
		align-items: center;
		display: -webkit-flex;
	}

	.status>#organization {
		justify-content: inherit;
	}
</style>
