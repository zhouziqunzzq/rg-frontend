<template>
    <div>
        <!--<h1>{{ msg }}</h1>-->
        <!--<p>-->
            <!--Feel the beat and the flow...-->
        <!--</p>-->
        <button @click="gotoAbout">
            Let's Go
            <font-awesome-icon icon="arrow-right"/>
        </button>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        methods: {
            gotoAbout() {
                this.$router.push({path: 'generate'});
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/basic-container";
    @import "../assets/scss/basic-button";

    h1 {
        font-size: 4em;
        margin: 0.2em 0;
    }

    p {
        font-size: 2em;
        margin: 0.2em 0;
    }

    div {
        @extend %flex-container-column;
        align-items: center;
    }

    div > button {
        @extend %round-button;
        font-size: 3em;
        margin: 0.3em 0;
    }
</style>
