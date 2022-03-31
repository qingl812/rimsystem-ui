<template>
	<!-- 街道 -->
	<div id="StreetWork">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="发文" name="first">发文</el-tab-pane>
			<el-tab-pane label="收文" name="second">收文</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { MyAxios } from "@/typings/MyAxios";

@Component
export default class StreetWork extends Vue {}
</script>
