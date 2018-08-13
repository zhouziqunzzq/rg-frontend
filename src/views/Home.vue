<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/img/logo.png">
        <HelloWorld msg="Rap Generator"/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '../components/HelloWorld'

    export default {
        name: 'home',
        components: {
            HelloWorld
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/basic-container";
    @import "../assets/scss/vars";

    .home {
        @extend %main-container;
        @extend %flex-container-column;
        justify-content: center;
        align-items: center;
    }
</style>