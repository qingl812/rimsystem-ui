<template>
	<div class="ghead">
		<router-link to="/home">广州省惠州市道路管理系统</router-link>
	</div>
</template>

<style scoped lang="scss">
@import "themes/normal.scss";

.ghead {
	background: linear-gradient($head_background, white);
	height: 100px;
	/*Flex布局 指定垂直居中*/
	display: flex;
	align-items: center;
}

a {
	margin: 0;
	font-size: 40px;
	padding-left: 30px;
	text-decoration: none;
	color: black;
}
</style>
