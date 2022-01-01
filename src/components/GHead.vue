<template>
    <div class="ghead centered-vertical">
        <router-link to="/home">广州省惠州市道路管理系统</router-link>
    </div>
</template>

<style scoped lang="scss">
@import "themes/normal.scss";

.ghead {
    background: linear-gradient($head_background, white);
    height: $ghead-height;

    a {
        margin: 0;
        font-size: 40px;
        padding-left: 30px;
        text-decoration: none;
        color: black;
    }
}
</style>
