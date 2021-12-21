<template>
	<div id="withHead">
		<GHead></GHead>
		<GNavigate></GNavigate>
		<router-view></router-view>
		<GStatus></GStatus>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GHead from "@/components/GHead.vue";
import GNavigate from "@/components/GNavigate.vue";
import GStatus from "@/components/GStatus.vue";

@Component({
	components: {
		GHead,
		GNavigate,
		GStatus,
	},
})
export default class WithHead extends Vue {}
</script>

<style lang="scss"></style>
