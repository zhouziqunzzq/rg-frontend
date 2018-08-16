<template>
    <div id="nav">
        <div class="nav-switch-wrapper" @click="onHideClick">
            <font-awesome-icon icon="bars"/>
        </div>
        <transition name="up-slide-fade">
            <div class="nav" v-show="!hide">
                <router-link tag="div" class="nav-item" to="/">
                    <a>欢迎使用</a>
                </router-link>
                <router-link tag="div" class="nav-item" to="/generate">
                    <a>主题生成</a>
                </router-link>
                <router-link tag="div" class="nav-item" to="/auxiliary">
                    <a>辅助作词</a>
                </router-link>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                hide: false,
            }
        },
        methods: {
            onHideClick() {
                this.hide = !this.hide;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/basic-container";
    @import "../assets/scss/helper";
    @import "../assets/scss/vars";
    @import "../assets/scss/theme-color";
    @import "../assets/scss/animation";

    @font-face {
        font-family: "HYZiYanHuanLeSongJ-2";
        src: url("../assets/fonts/HYZiYanHuanLeSongJ-2.ttf");
    }

    .nav {
        @extend %flex-container-row-center;
        //background: $nav-main-color;
        align-items: flex-end;
        padding: 0.1em;
        margin: 0 0 2em 0;
        position: relative;
        //width: 100%;
        //top: 0;
        height: $nav-height;
        z-index: 100;

        @media only screen and (max-width: $small-screen-width) {
            flex-wrap: wrap;
            height: auto;
            margin: 0;
        }

        .nav-item {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 0 0.05em;
            padding: 0 0.5em;
            //background: $nav-main-color;
            //@include transition(all .3s);
            a {
                font-family: "HYZiYanHuanLeSongJ-2", sans-serif;
                font-weight: bold;
                font-size: 2em;
                color: $nav-text-color;
                text-decoration: none;
            }
            &.router-link-exact-active > a {
                -webkit-text-stroke: 0.05em #fff;
                text-shadow: 0.1em 0.2em 0.3em #000;
            }
            &:hover > a {
                -webkit-text-stroke: 0.05em #fff;
            }

            @media only screen and (max-width: $small-screen-width) {
                width: 100%;
                margin: 0;
                padding: 0.8em;
            }
        }
    }

    .nav-switch-wrapper {
        display: none;
        position: absolute;
        top: 0.5em;
        right: 1em;
        font-size: 2em;
        z-index: 1010;
        @media only screen and (max-width: $small-screen-width) {
            display: block;
        }
    }

    .hide {
        display: none !important;
    }
</style>