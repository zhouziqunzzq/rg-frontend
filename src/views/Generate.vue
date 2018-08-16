<template>
    <div class="main-container">
        <div class="block">
            <h1>{{titleList[step]}}</h1>
            <p class="push-right">{{subTitleList[step]}}</p>
            <hr/>
            <transition name="fade" mode="out-in">
                <component :is="componentList[step]"
                           :show-word-count="true"
                           :max-word-count="maxWordCount"
                           :allow-custom-word="true"
                           :lyric-list="lyricList"
                           v-on:select-template="onSelectTemplate"
                           v-on:select-word="onSelectWord"
                />
            </transition>
            <button @click="onNextClick"
                    v-show="nextButtonShow[step]"
                    :disabled="!checkNext"
                    :class="{'active-button': checkNext}"
            >{{nextButtonTip[step]}}
            </button>
        </div>
    </div>
</template>

<script>
    import WordChooser from "../components/WordChooser";
    import TemplateChooser from "../components/TemplateChooser";
    import LyricPlayer from "../components/LyricPlayer";

    export default {
        name: "Generate",
        components: {TemplateChooser, WordChooser, LyricPlayer},
        data() {
            return {
                step: 0,
                titleList: ['第一步...', '第二步...', '生成中...', 'And NOW...'],
                subTitleList: ['...选择模板', '...选择主题词', '', '...enjoy the beat and flow'],
                nextButtonShow: [true, true, false, true],
                nextButtonTip: ["下一步", "开始生成", "", "重新生成"],
                componentList: ["TemplateChooser", "WordChooser", "Loader", "LyricPlayer"],
                selectedTemplate: null,
                selectedWordList: [],
                lyricList: [
                    {
                        lyric: "腿 搁在办公桌上",
                        rhymeToggle: true,
                        rhymeType: "双押",
                        rhymeCount: 1,
                        rhymeWordCount: 2,
                    },
                    {
                        lyric: "这五六分钟我只关心说唱",
                        rhymeToggle: true,
                        rhymeType: "双押",
                        rhymeCount: 2,
                        rhymeWordCount: 2,
                    },
                    {
                        lyric: "大脑像硬币投进的湖里的波浪激荡",
                        rhymeToggle: true,
                        rhymeType: "双押",
                        rhymeCount: 3,
                        rhymeWordCount: 2,
                    },
                    {
                        lyric: "如果你们智商170和我一样",
                        rhymeToggle: true,
                        rhymeType: "双押",
                        rhymeCount: 4,
                        rhymeWordCount: 2,
                    },
                ],
            }
        },
        computed: {
            maxWordCount() {
                if (this.selectedTemplate === null)
                    return 0;
                else
                    return this.selectedTemplate['verseList'].length;
            },
            checkNext() {
                // return true if validate ok
                switch (this.step) {
                    case 0: // template
                        return this.selectedTemplate !== null;
                    case 1: // keyword
                        return this.selectedWordList.length > 0
                            && this.selectedTemplate !== null
                            && this.selectedWordList.length <= this.selectedTemplate['verseList'].length;
                    default:
                        return true;
                }
            }
        },
        methods: {
            onNextClick() {
                let maxStep = this.componentList.length - 1;
                if (this.step === maxStep) {
                    this.step = 0;
                } else {
                    this.step++;
                    if (this.step === 2) {  // generate lyric
                        this.generate();
                    }
                }
            },
            onSelectTemplate(template) {
                this.selectedTemplate = template;
            },
            onSelectWord(wordList) {
                this.selectedWordList = wordList;
            },
            generate() {
                let vm = this;
                // TODO: post template and keywords to BE
                setTimeout(() => {
                    vm.step++;
                }, 2000);
            },
        }
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

    h1, p {
        margin: 0;
    }

    hr {
        width: 100%;
    }

</style>