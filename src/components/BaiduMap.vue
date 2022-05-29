<template>
	<div id="bmap" :style="{ width: width, height: height }"></div>
</template>

<script lang="js">
/* eslint-disable no-undef */
import { defineComponent } from "vue";

export default defineComponent({
	name: "BaiduMap",
	props: {
		width: String,
		height: String,
	},
	mounted() {
		var map = new BMapGL.Map("bmap");
		var point = new BMapGL.Point(116.404, 39.915);
		map.centerAndZoom(point, 15);
	},
})
</script>

<style scoped lang="scss">
#bmap {
	background-color: aqua;
}
</style>
