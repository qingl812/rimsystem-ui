<template>
	<!-- 资金支付管理 -->
	<div id="PayManage">资金支付管理</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import { MyAxios } from "@/typings/MyAxios";

@Component
export default class PayManage extends Vue {}
</script>

<style scoped lang="scss">
@import "@/themes/normal.scss";
</style>