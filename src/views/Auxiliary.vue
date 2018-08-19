<template>
    <div class="main-container">
        <div class="block">
            <h1>分分钟创造属于自己的 Freestyle...</h1>
            <hr/>
            <div class="step-wrapper" v-show="step===0">
                <transition name="fade">
                    <div v-show="!disableFirstWord">
                        <h2>
                            要开始，请选择一个主题词...
                        </h2>
                        <WordChooser
                                :show-word-count="false"
                                :max-word-count="1"
                                :allow-custom-word="true"
                                v-on:select-word="onSelectWord"
                        />
                    </div>
                </transition>
                <transition name="fade">
                    <div v-show="!disableFirstInput">
                        <h2>
                            或是输入第一句...
                        </h2>
                        <input id="first-sentence-input"
                               placeholder="输入第一句"
                               v-model="firstSentence">
                    </div>
                </transition>
            </div>
            <LyricLine v-for="(l, i) in lyricList"
                       :key="'lyric-line'+i"
                       :sentence="l"
                       v-show="step>=1"
            />
            <Loader v-show="showLoader"/>
            <LyricEditor v-show="step>=1"
                         :sentence="nowSentence"
            />
            <button @click="onNextClick"
                    v-show="nextButtonShow"
                    :disabled="!checkNext"
                    :class="{'active-button': checkNext}"
            >{{nextButtonTip}}
            </button>
        </div>
    </div>
</template>

<script>
    import WordChooser from "../components/WordChooser";
    import LyricLine from "../components/LyricLine";
    import LyricEditor from "../components/LyricEditor";

    export default {
        name: "Auxiliary",
        components: {LyricEditor, LyricLine, WordChooser},
        data() {
            return {
                step: 0,
                lyricList: [],
                nowSentence: [],
                firstSentence: "",
                selectedWordList: [],
                showLoader: false,
            }
        },
        computed: {
            nextButtonTip() {
                if (this.step === 0)
                    return "开启创作之旅";
                else
                    return "生成下一句";
            },
            nextButtonShow() {
                return true;
            },
            checkNext() {
                return true;
            },
            disableFirstInput() {
                return this.selectedWordList.length !== 0;
            },
            disableFirstWord() {
                return this.firstSentence.length !== 0;
            }
        },
        methods: {
            onNextClick() {
                if (this.step === 0) {
                    if (this.selectedWordList.length === 1
                        && this.firstSentence.length === 0) {
                        // generate first line with selected word
                        this.generateFirstLine(this.selectedWordList[0]);
                    } else if (this.selectedWordList.length === 0
                        && this.firstSentence.length > 0) {
                        // add first line to final lyrics
                        // and generate next line with the first line
                        this.generateNextLine(this.firstSentence);
                    }
                } else {
                    this.generateNextLine(this.nowSentence.join(''));
                }
            },
            generateFirstLine(word) {
                this.step++;
                let vm = this;
                // TODO: call BE to generate first line
                console.log(word);
                this.showLoader = true;
                setTimeout(() => {
                    vm.nowSentence.push("腿", "搁", "在", "办公桌", "上");
                    vm.showLoader = false;
                }, 1000);
            },
            generateNextLine(sentence) {
                this.step++;
                let vm = this;
                // clear now sentenceLength
                while (vm.nowSentence.length > 0) {
                    vm.nowSentence.pop();
                }
                // TODO: call BE to generate next line
                console.log(sentence);
                this.showLoader = true;
                setTimeout(() => {
                    // save now sentenceLength to final lyrics
                    vm.lyricList.push({
                        lyric: sentence,
                        rhymeToggle: false,
                    });
                    // generate next sentenceLength
                    vm.nowSentence.push("腿", "搁", "在", "办公桌", "上");
                    vm.showLoader = false;
                }, 1000);
            },
            onSelectWord(wordList) {
                this.selectedWordList = wordList;
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/basic-container";
    @import "../assets/scss/basic-button";
    @import "../assets/scss/helper";
    @import "../assets/scss/theme-color";
    @import "../assets/scss/animation";
    @import "../assets/scss/vars";

    .main-container {
        @extend %flex-container-column;
        align-items: center;
        width: 100%;
        flex-shrink: 0;
    }

    .step-wrapper {
        width: 100%;
        flex-shrink: 0;
    }

    h1, p {
        margin: 0;
    }

    hr {
        width: 100%;
    }

    button {
        font-size: 1em;
        padding: 0.2em 0.5em;
        border-radius: 0.3em;
        border: $border-color 0.1em solid;
        background-color: transparent;
        @include transition(background .3s);
        flex-shrink: 0;
        width: 40%;
        margin: 1em 0 2em 0;
        align-self: flex-end;
        z-index: 1000;

        @media only screen and (max-width: $small-screen-width) {
            width: 100%;
        }
    }

    .active-button {
        cursor: pointer;
        &:hover {
            background: $theme-color-light;
        }
    }

    #first-sentence-input {
        border: $border-color 0.1em solid;
        border-radius: 0.3em;
        padding: 0.5em;
        width: 50%;

        @media only screen and (max-width: $small-screen-width) {
            width: 96%;
        }
    }
</style>