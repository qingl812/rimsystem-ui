<template>
    <div class="title centered-vertical">
        <el-icon>
            <List />
        </el-icon>
        <span>{{ title }}</span>
    </div>

    <slot name="search"></slot>

    <el-table ref="table_ref" class="m_table" :data="data" stripe border highlight-current-row v-loading="loading">
        <slot name="table"></slot>
    </el-table>

    <el-pagination :page-size="$store.state.data_pagination.page_size" :total="$store.state.data_pagination.total_size"
        background v-model:current-page="$store.state.data_pagination.current_page" @current-change="$emit('updated')"
        layout="total, prev, pager, next, jumper" />

    <div class="option centered">
        <slot name="button"></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "PublicTable",
    props: {
        // table
        title: String,
        data: Array,
        loading: Boolean,
        // pagination
        has_pagination: Boolean,
    },
    emits: ["updated"],
    created() {
        window.addEventListener("resize", () => {
            this.updatePageSize();
        });
        this.$store.dispatch('get_data_page');
    },
    mounted() {
        this.updatePageSize();
    },
    methods: {
        updatePageSize() {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const div = this.$refs.table_ref as any;
            const height = div.$el.offsetHeight - 40;
            this.$store.state.data_pagination.page_size = Math.floor(height / 50);
            this.$emit('updated');
        },
    },
    watch: {
        "$store.state.data_pagination.current_page": function () {
            this.$router.push({
                query: {
                    ...this.$route.query,
                    page: this.$store.state.data_pagination.current_page,
                }
            })
        }
    },
});
</script>

<style scoped lang="scss">
.title {
    height: 40px;

    span {
        margin-left: 5px;
    }
}

.m_table {
    margin-top: 10px;
    height: calc(100% - 200px);
}

.pagination {
    width: 100%;
    background-color: lemonchiffon;
}

.el-pagination {
    display: flex;
    align-items: center;
    justify-content: right;
    height: 40px;
}

.option {
    margin-top: 10px;

    a {
        margin-right: 10px;
    }
}
</style>
