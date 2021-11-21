<template>
	<div id="withHead">
		<Head></Head>
		<Navigation></Navigation>
		<router-view></router-view>
		<Status></Status>
	</div>
</template>

<script>
	import Head from '../components/Head.vue'
	import Navigation from '../components/Navigation.vue'
	import Status from '../components/Status.vue'

	export default {
		name: 'WithHead',
		components: {
			Head,
			Navigation,
			Status
		}
	}
</script>

<style scoped>
	#withHead {
		height: 100%;
		width: 100%;

		display: grid;
		grid-template-rows: 80px 40px auto 30px;
	}
</style>
