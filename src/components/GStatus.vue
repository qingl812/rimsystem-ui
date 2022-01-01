<template>
    <el-row type="flex" class="gstatus">
        <el-col>
            <span>使用单位: {{ m_company }}</span>
        </el-col>
        <el-col>
            <el-divider direction="vertical"></el-divider>
            <span>用户名称: {{ m_userName }}</span>
        </el-col>
        <el-col>
            <el-divider direction="vertical"></el-divider>
            <span>用户类型: {{ m_userType }}</span>
        </el-col>
        <el-col>
            <el-divider direction="vertical"></el-divider>
            <span>当前使用版本号: {{ m_systemVersion }}</span>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";

@Component
export default class GStatus extends Vue {
    private m_company = "";
    private m_userName = "";
    private m_userType = "";
    private m_systemVersion = "";

    mounted(): void {
        axios({
            method: "get",
            url: "/api/get_user_info",
        }).then((response: AxiosResponse) => {
            this.m_company = response.data.unit;
            this.m_userName = response.data.name;
            this.m_userType = response.data.type;
        });

        axios({
            method: "get",
            url: "/api/get_system_version",
        }).then((response: AxiosResponse) => {
            this.m_systemVersion = response.data.version;
        });
    }
}
</script>

<style scoped lang="scss">
@import "themes/normal.scss";

.gstatus {
    position: fixed;
    background-color: $status_background;
    bottom: 0px;
    width: 100%;
    height: 40px;

    .el-col {
        height: 40px;
        /*Flex布局 指定垂直居中*/
        display: flex;
        align-items: center;
        padding-left: 20px;

        .el-divider {
            color: #409eff;
            height: 60%;
            margin-right: 20px;
        }

        :last-child {
            border-right: 0;
        }
    }
}
</style>
