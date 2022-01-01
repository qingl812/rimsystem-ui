<template>
    <el-container class="roadInformation">
        <el-aside>
            <div class="title centered">道路资料</div>
            <div class="main">
                <div>
                    <div class="text centered">
                        <ion-icon name="caret-down-circle-outline"></ion-icon>
                        <span>道路信息</span>
                    </div>
                    <div class="text centered">
                        <ion-icon name="caret-down-circle-outline"></ion-icon>
                        <span>文档资料</span>
                    </div>
                </div>
            </div>
        </el-aside>
        <el-main>
            <div class="title centered-vertical">
                <ion-icon name="list-outline"></ion-icon>
                <span>道路信息列表</span>
            </div>
            <el-row :gutter="20" class="search">
                <el-col :span="4" class="centered-vertical">
                    <el-input
                        placeholder="道路名称"
                        v-model="m_search_name"
                        clearable
                        @change="updateRoadList()"
                    >
                    </el-input>
                </el-col>
                <el-col :span="4" class="centered-vertical">
                    <el-select
                        v-model="m_search_type"
                        clearable
                        placeholder="道路类型"
                        @change="updateRoadList()"
                    >
                        <el-option
                            v-for="item in m_road_types"
                            :key="item"
                            :label="item"
                            :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4" class="centered-vertical">
                    <el-select
                        v-model="m_search_type"
                        clearable
                        placeholder="道路养护等级"
                        @change="updateRoadList()"
                    >
                        <el-option
                            v-for="item in m_search_mlevel"
                            :key="item"
                            :label="item"
                            :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="1.6" class="centered-vertical">
                    <el-button
                        type="primary"
                        icon="el-icon-search"
                        size="small"
                    >
                        查询
                    </el-button>
                </el-col>
            </el-row>
            <div>列表</div>
        </el-main>
    </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";

@Component
export default class RoadInformation extends Vue {
    private m_search_name: string;
    private m_search_type: string;
    private m_search_mlevel: string;
    private m_road_types = new Array<string>();
    private m_road_mlevels = new Array<string>();

    constructor() {
        super();

        this.m_search_name = "";
        this.m_search_type = "";
        this.m_search_mlevel = "";

        axios({
            method: "get",
            url: "/api/road_types_list",
        }).then((response: AxiosResponse) => {
            response.data.areas.forEach((element: string) => {
                this.m_road_types.push(element);
            });
        });

        axios({
            method: "get",
            url: "/api/road_mlevels_list",
        }).then((response: AxiosResponse) => {
            response.data.units.forEach((element: string) => {
                this.m_road_mlevels.push(element);
            });
        });
    }

    public updateRoadList(): void {
        var a;
    }
}
</script>

<style scoped lang="scss">
@import "themes/normal.scss";
.roadInformation > .el-aside {
    height: $gmain-height;
    max-width: $gaside-width;
    background-color: $aside-background-color;

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
}

.roadInformation > .el-main {
    padding-top: 0;

    .title {
        height: 40px;

        span {
            margin-left: 5px;
        }
    }

    .search {
        height: 60px;

        .el-input,
        .el-select {
            width: 100%;
        }

        .el-col {
            border: $border-divider;
            border-right: none;
            height: 100%;
            background-color: #f0f8fe;
        }

        .el-col:last-child {
            border-right: $border-divider;
        }
    }
}
</style>
