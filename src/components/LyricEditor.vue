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
                 :class="{'selected': selectedFlag[i]}"
                 @click="onClickWord(word, i)"
            >
                {{word}}
            </div>
        </div>
        <h3>点击词语进行联想替换...</h3>
        <WordExpansion v-show="selectedWordID >= 0"
                       :target-word="selectedWord"
                       v-on:select-word="onSelectWord"
        />
        <input id="next-sentence-input"
               placeholder="或直接输入一整句..."
               v-model="nextSentenceInput">
    </div>
</template>

<script>
    import WordExpansion from "./WordExpansion";

    export default {
        name: "LyricEditor",
        components: {WordExpansion},
        props: {
            sentence: Array,
        },
        data() {
            return {
                editingSentence: [],
                selectedWord: "",
                selectedWordID: -1,
                selectedFlag: [],
                nextSentenceInput: "",
            }
        },
        methods: {
            clearEditing() {
                while (this.editingSentence.length > 0) {
                    this.editingSentence.pop();
                    this.selectedFlag.pop();
                }
            },
            init() {
                this.clearSelectedWord();
                this.clearEditing();
                for (let w of this.sentence) {
                    this.editingSentence.push(w);
                    this.selectedFlag.push(false);
                }
                this.nextSentenceInput = "";
            },
            clearSelectedWord() {
                this.selectedWord = "";
                this.selectedWordID = -1;
            },
            clearSelectedFlag() {
                for (let i = 0; i < this.selectedFlag.length; i++) {
                    this.selectedFlag[i] = false;
                }
            },
            onClickWord(w, i) {
                this.nextSentenceInput = "";
                this.selectedWord = w;
                this.selectedWordID = i;
                this.clearSelectedFlag();
                this.selectedFlag[i] = true;
            },
            onSelectWord(w) {
                // console.log(w);
                this.$set(this.editingSentence, this.selectedWordID, w);
            }
        },
        watch: {
            sentence() {
                this.init();
            },
            editingSentence(newSentence) {
                this.$emit("edit-sentence", newSentence);
            },
            nextSentenceInput(newValue) {
                if (newValue !== "") {
                    this.clearSelectedWord();
                    this.clearSelectedFlag();
                    this.$emit("edit-sentence", [newValue]);
                }
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
        margin: 0.15em 0.15em 0 0;
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

    .selected {
        background: $theme-color-light;
    }

    #next-sentence-input {
        border: $border-color 0.1em solid;
        border-radius: 0.3em;
        padding: 0.5em;
        margin: 1em 0;
        width: 50%;
        z-index: 1000;

        @media only screen and (max-width: $small-screen-width) {
            width: 96%;
        }
    }
</style>