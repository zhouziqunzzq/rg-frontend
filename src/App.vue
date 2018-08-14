<template>
    <div id="app">
        <Header/>
        <transition name="slide-fade" mode="out-in">
            <router-view
                    @scroll-to-end="scrollToEnd"
            />
        </transition>
    </div>
</template>

<script>
    import Header from "./components/Header";

    export default {
        components: {Header},
        methods: {
            scrollToEnd() {
                let container = this.$el;
                container.scrollTop = container.scrollHeight;
            }
        },
    }

</script>

<style scoped lang="scss">
    @import "assets/scss/helper";
    @import "assets/scss/animation";

    #app {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
        overflow-x: hidden;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        width: 100%;
        height: 100%;
    }

</style>
