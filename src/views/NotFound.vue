<template>
	<div class="notFound">
		<div class="system">
			<img src="/static/img/notFound/404.png" />
			<div class="title">
				<h2>页面走丢了...</h2>
				<h4>远方的朋友你好！非常抱歉，您所请求的页面不存在！</h4>
				<h4>请仔细检查您输入的网址是否正确。</h4>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'NotFound'
	}
</script>

<style scoped>
	@import url("/static/css/notFound/h-ui.reset.css");
	@import url("/static/css/notFound/index.css");
</style>
