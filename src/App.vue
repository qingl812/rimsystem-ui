<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { Vue } from "vue-property-decorator";

export default class App extends Vue {}
</script>

<style lang="scss">
@import "themes/normal.scss";
</style>
