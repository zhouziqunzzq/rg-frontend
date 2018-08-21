<template>
    <div class="home">
        <img class="logo" alt="logo" src="../assets/img/logo.png">
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
        //@extend %main-container;
        @extend %flex-container-column;
        justify-content: center;
        align-items: center;
    }

    .logo {
        width: 30%;
        @media only screen and (max-width: $small-screen-width) {
            width: 80%;
        }
    }
</style>