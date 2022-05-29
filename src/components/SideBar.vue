<template>
    <div class="title centered">{{ title }}</div>
    <div class="main">
        <div :v-model="options" v-for="item in options" :key="item">
            <div class="text centered" @click="onClick(item)">
                <el-icon>
                    <Expand />
                </el-icon>
                <span>{{ item }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
    name: "SideBar",
    props: {
        title: String,
        options: Array as PropType<Array<string>>,
        click_callback: Function as PropType<(name: string) => void>,
    },
    methods: {
        onClick(name: string) {
            if (this.click_callback) {
                this.click_callback(name);
            }
        },
    },
})
</script>

<style scoped lang="scss">
$border-divider: 2px solid #43ace5;

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
</style>
