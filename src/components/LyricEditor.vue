<template>
    <div class="container">
        <font-awesome-icon v-show="this.editingSentence.length > 0"
                           icon="arrow-right"
                           class="edit-icon"
        />
        <div class="wrapper">
            <div v-for="(word, i) in editingSentence"
                 :key="'w' + i"
                 class="word-block box-sizing-border-box no-select hand-cursor"
            >
                {{word}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LyricEditor",
        props: {
            sentence: Array,
        },
        data() {
            return {
                editingSentence: [],
            }
        },
        methods: {
            clearEditing() {
                while (this.editingSentence.length > 0) {
                    this.editingSentence.pop();
                }
            },
            init() {
                this.clearEditing();
                for (let w of this.sentence) {
                    this.editingSentence.push(w);
                }
            },
        },
        watch: {
            sentence() {
                this.init();
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/basic-container";
    @import "../assets/scss/helper";
    @import "../assets/scss/theme-color";

    .container {
        @extend %flex-container-column;
        justify-content: center;
        align-items: center;
        width: 100%;
        flex-shrink: 0;
    }

    .wrapper {
        @extend %flex-container-row;
        justify-content: center;
        flex-wrap: wrap;
        flex-shrink: 0;
        width: 100%;
        border-bottom: $border-color 0.1em solid;
        padding: 0 0 0.1em 0;
    }

    .word-block {
        display: inline-block;
        font-size: 1.5em;
        padding: 0.2em 0.3em;
        margin: 0 0.15em;
        @include border-radius(0.2em);
        border: $border-color 0.1em solid;
        @include transition(background .5s);

        &:hover {
            background: $theme-color-light;
        }
    }

    .edit-icon {
        position: absolute;
        top: 0.2em;
        left: -0.5em;
        font-size: 2em;
    }
</style>