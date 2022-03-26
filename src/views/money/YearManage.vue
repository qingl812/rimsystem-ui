<template>
	<!-- 资金年度申请 -->
	<div id="YearManage">资金年度申请</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import { MyAxios } from "@/typings/MyAxios";

@Component
export default class YearManage extends Vue {}
</script>

<style scoped lang="scss">
@import "@/themes/normal.scss";
</style>
