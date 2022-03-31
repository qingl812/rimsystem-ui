<template>
	<div class="SideBar">
		<div class="title centered">{{ title }}</div>
		<div class="main">
			<div :v-model="options" v-for="o in options" :key="o.name">
				<div class="text centered" @click="jump(o.url)">
					<ion-icon name="caret-down-circle-outline"></ion-icon>
					<span>{{ o.name }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class SideBar extends Vue {
	@Prop({ required: true }) readonly title: string | undefined;
	@Prop({ required: true }) readonly options:
		| Array<{ name: string; url: string }>
		| undefined;

	jump(url: string): void {
		if (url == "") return;
		
		let path = this.$router.currentRoute.path;
		path = path.substr(path.lastIndexOf("/") + 1);
		if (path != url)
			this.$router.push({
				path: url,
			});
	}
}
</script>

<style scoped lang="scss">

.title {
	height: 40px;
	color: black;
	border-bottom: $border-divider;
}

.main {
	height: calc(100% - 40px);

	.text {
		width: 80%;
		margin: auto;
		color: #4c788d;
		height: 40px;

		border-bottom: $border-divider;

		span {
			margin-left: 5px;
		}
	}
}
</style>
