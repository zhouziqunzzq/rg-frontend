<template>
    <div class="main-container">
        <div class="block">
            <h1>Step ONE...</h1>
            <p class="push-right">...choose topic words</p>
            <hr/>
            <WordChooser/>
        </div>
    </div>
</template>

<script>
    import WordChooser from "../components/WordChooser";

    export default {
        name: "Generate",
        components: {WordChooser}
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/basic-container";
    @import "../assets/scss/helper";
    @import "../assets/scss/theme-color";

    .main-container {
        @extend %main-container;
        @extend %flex-container-column;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    h1, p {
        margin: 0;
    }

    hr {
        width: 100%;
    }

    .block {
        @extend %flex-container-column;
        align-items: center;
        width: 70%;
        /*border: #0d0d46 solid 0.1em;*/
        /*-webkit-border-radius: 0.5em;*/
        /*-moz-border-radius: 0.5em;*/
        border-radius: 0.2em;
        padding: 0.4em;
        margin: 1em 0;
        box-shadow: $shadow-color 0 0 1em;
    }

</style>