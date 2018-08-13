<template>
    <div id="nav">
        <router-link tag="div" class="nav-item" to="/">
            <a>欢迎使用</a>
        </router-link>
        <router-link tag="div" class="nav-item" to="/generate">
            <a>主题生成</a>
        </router-link>
        <router-link tag="div" class="nav-item" to="/auxiliary">
            <a>辅助作词</a>
        </router-link>
        <router-link tag="div" class="nav-item" to="/about">
            <a>关于我们</a>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/basic-container";
    @import "../assets/scss/helper";
    @import "../assets/scss/vars";
    @import "../assets/scss/theme-color";

    #nav {
        @extend %flex-container-row-center;
        background: $nav-main-color;
        padding: 0.1em;
        position: fixed;
        width: 100%;
        height: $nav-height;
        top: 0;
        z-index: 100;
        a {
            font-weight: bold;
            font-size: 1em;
            color: $nav-text-color;
            text-decoration: none;
        }
        .nav-item {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 0 0.05em;
            padding: 0 0.5em;
            background: $nav-main-color;
            @include transition(background .3s);
            &.router-link-exact-active {
                background: $nav-active-color;
            }
            &:hover {
                background: $nav-active-color;
            }
        }
    }
</style>