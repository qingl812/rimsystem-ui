<template>
	<div id="withHead">
		<GHead></GHead>
		<GNavigate></GNavigate>
		<router-view></router-view>
		<GStatus
			m_company="惠州市公共事业管理局"
			m_userName="admin"
			m_systemVersion="系统管理员"
			m_userType="v1.00"
		></GStatus>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GHead from "../components/GHead.vue";
import GNavigate from "../components/GNavigate.vue";
import GStatus from "../components/GStatus.vue";

@Component({
	components: {
		GHead,
		GNavigate,
		GStatus,
	},
})
export default class Home extends Vue {}
</script>

<style lang="scss"></style>
