<template>
	<router-link class="jump" :to="target" :style="{'color': color,'text-decoration': textDecoration?'underline':'none'}">
		{{context}}</router-link>
</template>

<script>
	export default {
		name: 'Jump',
		props: {
			context: String,
			target: String,
			color: String,
			textDecoration: Boolean
		}
	}
</script>

<style>
</style>
