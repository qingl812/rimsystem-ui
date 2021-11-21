<template>
	<div class="head">
		<h1>广东省惠州市道路信息管理系统</h1>
	</div>
</template>

<script>
	export default {
		name: 'Head'
	}
</script>

<style scoped>
	.head {
		width: 100%;
		height: 100%;

		background-color: blanchedalmond;
		/* css3子元素垂直居中 */
		align-items: center;
		display: -webkit-flex;
	}

	.head>h1 {
		/* 上边 | 右边 | 下边 | 左边 */
		margin: 0 0 0 100px;
	}
</style>
