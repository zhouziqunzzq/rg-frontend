<template>
    <div>
        <img src="../assets/img/cd.png"/>
    </div>
</template>

<script>
    export default {
        name: "CDAnimation"
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/basic-container";
    @import "../assets/scss/vars";
    @import "../assets/scss/animation";
    @import "../assets/scss/helper";

    div {
        @extend %flex-container-row;
        justify-content: center;
        position: fixed;
        bottom: -5em;
        width: 100%;

        & > img {
            margin: 0 auto;
            width: 10em;
            height: 10em;
            z-index: -100;
            opacity: 0.8;
            // spin animation
            @include animation(spin 4s linear infinite);
        }

        @media only screen and (max-width: $small-screen-width) {
            display: none;
        }
    }
</style>