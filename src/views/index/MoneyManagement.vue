<template>
	<!-- 资金管理 -->
	<el-container id="MoneyManagement">
		<el-aside>
			<SideBar :title="m_title" :options="m_options"></SideBar>
		</el-aside>
		<el-main>
			<router-view></router-view>
		</el-main>
	</el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SideBar from "@/components/SideBar.vue";

@Component({
	components: {
		SideBar,
	},
})
export default class MoneyManagement extends Vue {
	private m_title = "资金管理";
	private m_options = [
		{ name: "资金月度申请", url: "month" },
		{ name: "资金年度申请", url: "year" },
		{ name: "资金支付管理", url: "pay" },
	];
	private m_sup_url = "money-management";
}
</script>
