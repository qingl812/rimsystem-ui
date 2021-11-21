<template>
	<button type="button" class="blueButton">
		{{context}}
	</button>
</template>

<script>
	export default {
		name: 'App',
		props: {
			context: String,
		}
	}
</script>

<style>
	.blueButton {
		margin-right: 10px;
		background-color: rgb(193, 238, 251);
		border-radius: 8px;
		border: 2px solid rgb(67, 140, 182);
	}
</style>
