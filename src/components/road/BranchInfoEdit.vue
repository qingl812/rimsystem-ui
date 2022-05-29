<template>
    <el-form ref="form" :model="new_road" label-width="150px">
        <el-form-item label="分段名称">
            <el-input v-model="new_road.name"></el-input>
        </el-form-item>

        <el-form-item label="分段编号">
            <el-input v-model="new_road.num" disabled></el-input>
        </el-form-item>

        <el-form-item label="分段长度">
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
import { defineComponent } from "vue";
import { BranchRoad } from "@/typings/interfaces";

export default defineComponent({
    name: "BranchInfoEdit",
    props: {
        road: {
            type: Object as () => BranchRoad,
            required: true
        }
    },
    emits: ["submit"],
    data() {
        return {
            new_road: JSON.parse(JSON.stringify(this.road)),
        }
    },
    beforeCreate() {
        this.$store.dispatch("get_datas", "types");
    },
    beforeUpdate() {
        this.new_road = JSON.parse(JSON.stringify(this.road));
    },
    methods: {
        onSubmit() {
            this.$emit("submit", this.new_road);
        }
    }
});
</script>

<style scoped lang="scss">
.el-form {
    margin-top: 20px;
}
</style>
