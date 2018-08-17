<template>
    <div class="container">
        <p>Powered by 七言AI | Made with
            <font-awesome-icon icon="heart"/>
        </p>
        <router-link tag="div" to="/about">
            <a>关于我们</a>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/basic-container";
    @import "../assets/scss/theme-color";
    @import "../assets/scss/vars";

    .container {
        @extend %flex-container-row;
        justify-content: space-between;
        align-items: center;
        padding: 1em;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 500;

        a {
            text-decoration: none;
            color: $footer-link-color;
        }

        @media only screen and (max-width: $small-screen-width) {
            position: relative;
        }
    }
</style>