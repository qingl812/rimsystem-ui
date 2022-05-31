<template>
    <el-form ref="road_form" :model="new_road" label-width="150px" :rules="rules">
        <el-form-item label="分段名称" prop="name">
            <el-input v-model="new_road.name"></el-input>
        </el-form-item>

        <el-form-item label="分段编号" prop="num">
            <el-input v-model="new_road.num"></el-input>
        </el-form-item>

        <el-form-item label="分段长度" prop="length">
            <el-input v-model="new_road.length"></el-input>
        </el-form-item>

        <el-form-item label="起点位置">
            <el-input v-model="new_road.begin_location"></el-input>
        </el-form-item>

        <el-form-item label="终止位置">
            <el-input v-model="new_road.end_location"></el-input>
        </el-form-item>

        <el-form-item label="起止坐标">
            <el-input v-model="new_road.begin_end"></el-input>
        </el-form-item>

        <el-form-item label="路面类型">
            <el-select v-model="new_road.surface_type">
                <el-option v-for="item in $store.state.datas.surface" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="人行道面砖类型">
            <el-select v-model="new_road.sidewalk_tile_type">
                <el-option v-for="item in $store.state.datas.sidewalk_tile" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="盲道面砖类型">
            <el-select v-model="new_road.blind_road_tile_type">
                <el-option v-for="item in $store.state.datas.blind_road_tile" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="侧石类型">
            <el-select v-model="new_road.curb_type">
                <el-option v-for="item in $store.state.datas.curb" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="备注">
            <el-input v-model="new_road.remark"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import type { FormInstance, FormRules } from 'element-plus'
import axios, { AxiosResponse } from "axios";
import tools from "@/typings/Tools";

export default defineComponent({
    name: "BranchInfoEdit",
    data() {
        const rules = reactive<FormRules>({
            name: [
                { required: true, message: '请输入分段名称' },
            ],
            num: [
                { required: true, message: '请输入分段编号' },
            ],
            length: [
                { required: true, message: '请输入分段长度' },
            ],
        })
        return {
            new_road: reactive(JSON.parse(JSON.stringify(this.$store.state.branch_road_info))),
            rules: rules,
        }
    },
    beforeCreate() {
        this.$store.dispatch("get_datas", "road_type");
        this.$store.dispatch("get_road_info", tools.get_router_query("road_id"));
        this.$store.dispatch("get_branch_road_info", tools.get_router_query("branch_id"));
        this.new_road = tools.clone(this.$store.state.branch_road_info);
    },
    watch: {
        "$route.query": function () {
            this.$store.dispatch("get_road_info", tools.get_router_query("road_id"));
            this.$store.dispatch("get_branch_road_info", tools.get_router_query("branch_id"));
            this.new_road = tools.clone(this.$store.state.branch_road_info);
        },
        "$store.state.road_info": function () {
            this.$store.dispatch("get_branch_road_info", tools.get_router_query("branch_id"));
            this.new_road = tools.clone(this.$store.state.branch_road_info);
        }
    },
    methods: {
        async onSubmit() {
            const road_form = this.$refs.road_form as FormInstance
            await road_form.validate((valid) => {
                if (valid) {
                    if (tools.get_router_query("type") == "add") {
                        axios({
                            method: "post",
                            url: "/",
                            data: {
                                roadName: this.new_road.name,
                                roadNum: this.new_road.num,
                                roadType: this.new_road.type,
                                roadMaintenanceGrade: this.new_road.maintenance_level,
                                roadLength: this.new_road.total_length,
                                roadSectionNum: this.new_road.segment_number,
                                roadPavementType: this.new_road.surface_type,
                                sidewalkBrickType: this.new_road.sidewalk_tile_type,
                                blindBrickType: this.new_road.blind_road_tile_type,
                                curbType: this.new_road.curb_type,
                            }
                        }).then((response: AxiosResponse) => {
                            if (response.data.code == 200) {
                                console.log(response)
                            }
                        });
                    } else {
                        axios({
                            method: "post",
                            url: "/",
                            data: {
                                id: this.new_road.id,
                                roadName: this.new_road.name,
                                roadNum: this.new_road.num,
                                roadType: this.new_road.type,
                                roadMaintenanceGrade: this.new_road.maintenance_level,
                                roadLength: this.new_road.total_length,
                                roadSectionNum: this.new_road.segment_number,
                                roadPavementType: this.new_road.surface_type,
                                sidewalkBrickType: this.new_road.sidewalk_tile_type,
                                blindBrickType: this.new_road.blind_road_tile_type,
                                curbType: this.new_road.curb_type,
                            }
                        }).then((response: AxiosResponse) => {
                            if (response.data.code == 200) {
                                console.log(response)
                            }
                        });
                    }
                }
            })
        }
    }
});
</script>

<style scoped lang="scss">
.el-form {
    margin-top: 20px;
}
</style>
