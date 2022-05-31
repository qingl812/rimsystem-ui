<template>
    <el-form ref="form" :model="form" label-width="150px" :rules="rules">
        <el-form-item label="下载文件" prop="file" v-if="mode == 'edit'">
            <el-icon>
                <Download />
            </el-icon>
        </el-form-item>

        <el-form-item label="上传文件" prop="file" v-if="mode == 'add'">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="1">
                <el-button type="primary">浏览</el-button>
                <template #tip>
                    <div class="el-upload__tip">
                        这是一个提示
                    </div>
                </template>
            </el-upload>
        </el-form-item>

        <el-form-item label="文件分类" prop="type">
            <el-select v-model="form.type">
                <el-option v-for="item in $store.state.datas.road_type" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="文件名" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="归档单位">
            <el-select v-model="form.unit">
                <el-option v-for="item in $store.state.datas.mlevels" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="归档号">
            <el-input v-model="form.num"></el-input>
        </el-form-item>

        <el-form-item label="份号">
            <el-input v-model="form.part_num"></el-input>
        </el-form-item>

        <el-form-item label="页数">
            <el-input v-model="form.total_page"></el-input>
        </el-form-item>

        <el-form-item label="备注">
            <el-input v-model="form.remark"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit()">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import type { FormInstance, FormRules } from 'element-plus'
import tools from "@/typings/Tools";

interface DocInfo {
    file: string;
    type: string;
    name: string;
    unit: string;
    num: string;
    part_num: string;
    total_page: string;
    remark: string;
}

export default defineComponent({
    name: "DocEdit",
    data() {
        const rules = reactive<FormRules>({
            file: [
                { required: true, message: '请选择一个文件' },
            ],
            type: [
                { required: true, message: '请选择文件类型' },
            ],
            name: [
                { required: true, message: '请输入文件名称' },
            ],
        })

        const mode = tools.get_router_query("mode")
        if (tools.get_router_query("road_id") == "" &&
            mode != "edit" && mode != "add") {
            this.$router.push("/")
            tools.error("错误的参数")
        }
        this.$store.dispatch("get_datas", "units");
        const form: DocInfo = {
            file: "",
            type: "",
            name: "",
            unit: "",
            num: "",
            part_num: "",
            total_page: "",
            remark: "",
        };

        return {
            form: form,
            rules: rules,
            mode: mode,
        }
    },
    methods: {
        async onSubmit() {
            const road_form = this.$refs.road_form as FormInstance
            await road_form.validate((valid, fields) => {
                if (valid) {
                    if (tools.get_router_query("type") == "add") {
                        console.log("add")
                    } else {
                        console.log("edit")
                    }
                } else {
                    console.log('error submit!', fields)
                }
            })
        },
    }
});
</script>

<style scoped lang="scss">
.el-form {
    margin-top: 20px;
}
</style>
