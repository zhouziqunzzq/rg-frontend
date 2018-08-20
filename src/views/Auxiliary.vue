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
                        <transition name="fade">
                            <h3 v-show="showFSWarning">
                                非常抱歉，无法使用该主题词生成第一句，请换一个主题词重试
                            </h3>
                        </transition>
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
                         v-on:edit-sentence="onEditSentence"
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
    import config from "../config";
    import buildUrlParam from "../buildUrlParam";

    export default {
        name: "Auxiliary",
        components: {LyricEditor, LyricLine, WordChooser},
        data() {
            return {
                step: 0,
                lyricList: [],
                nowSentence: [],
                nowSentenceEdited: [],
                firstSentence: "",
                selectedWordList: [],
                showLoader: false,
                showFSWarning: false,
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
                    if (this.nowSentenceEdited.length > 0)
                        this.generateNextLine(this.nowSentenceEdited.join(''));
                    else
                        this.generateNextLine(this.nowSentence.join(''));
                    this.nowSentenceEdited = [];
                }
            },
            generateFirstLine(word) {
                let vm = this;
                vm.showLoader = true;
                fetch(config.urlPrefix + "/generate/first_sentence?" + buildUrlParam({
                    keyword: word,
                }))
                    .then(res => {
                        res.json()
                            .then(res => {
                                if (res.result) {
                                    for (let w of res.sentence) {
                                        vm.nowSentence.push(w);
                                    }
                                    this.step++;
                                } else {
                                    vm.showFSWarning = true;
                                }
                                vm.showLoader = false;
                            })
                    });
            },
            generateNextLine(sentence) {
                this.showLoader = true;
                let vm = this;
                // save now sentenceLength to final lyrics
                vm.lyricList.push({
                    lyric: sentence,
                    rhymeToggle: false,
                });
                // clear now sentenceLength
                while (vm.nowSentence.length > 0) {
                    vm.nowSentence.pop();
                }
                // call BE to generate next line
                let data = new FormData();
                data.append("sentence", sentence);
                fetch(config.urlPrefix + "/generate/next_sentence", {
                    method: 'POST',
                    body: data
                })
                    .then(res => {
                        res.json()
                            .then(res => {
                                for (let w of res) {
                                    vm.nowSentence.push(w);
                                }
                                this.step++;
                                this.showLoader = false;
                            })
                    });
            },
            onSelectWord(wordList) {
                this.selectedWordList = wordList;
                this.showFSWarning = false;
            },
            onEditSentence(s) {
                this.nowSentenceEdited = s;
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