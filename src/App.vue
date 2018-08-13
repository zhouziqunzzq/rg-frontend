<template>
    <div id="app">
        <Header/>
        <transition name="slide-fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>
    import Header from "./components/Header";

    export default {
        components: {Header}
    }

</script>

<style scoped lang="scss">
    @import "assets/scss/helper";

    #app {
        position: absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        z-index:-1;
        overflow-x: hidden;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;
        width: 100%;
        height: 100%;
    }

    .slide-fade-enter-active {
        @include transition(all .5s ease);
    }

    .slide-fade-leave-active {
        @include transition(all .5s ease);
    }

    .slide-fade-leave-to {
        @include transform(translateX(-500px));
        opacity: 0;
    }

    .slide-fade-enter {
        @include transform(translateX(500px));
        opacity: 0;
    }
</style>
