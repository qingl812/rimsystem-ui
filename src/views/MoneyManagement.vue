<template>
    <!-- 资金管理 -->
    <el-container class="global-layout">
        <el-aside>
            <SideBar title="资金管理" :options="['资金月度申请', '资金年度申请', '资金支付管理']" :click_callback="onClickSideBar"></SideBar>
        </el-aside>

        <el-main>
            <MonthTable v-if="type == 'month'"></MonthTable>
            <YearTable v-else-if="type == 'year'"></YearTable>
            <PayTable v-else-if="type == 'pay'"></PayTable>
        </el-main>
    </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "@/components/SideBar.vue";
import tools from "@/typings/Tools";
import MonthTable from "@/components/money/MonthTable.vue";
import YearTable from "@/components/money/MonthTable.vue";
import PayTable from "@/components/money/PayTable.vue";

export default defineComponent({
    name: "MoneyManagement",
    components: {
        SideBar,
        MonthTable,
        YearTable,
        PayTable
    },
    data() {
        let type = tools.get_router_query("type");
        if (type != "month" && type != "year" && type != "pay")
            type = "month";
        return {
            type: type,
        }
    },
    methods: {
        onClickSideBar(type: string) {
            if (type == "资金月度申请")
                type = "month";
            else if (type == "资金年度申请")
                type = "year";
            else if (type == "资金支付管理")
                type = "pay";
            this.type = type;
            this.$router.push({ query: { type: type } });
        }
    },
});
</script>

<style scoped lang="scss">
.el-main {
    padding-left: 20px;
    padding-right: 20px;
}
</style>
