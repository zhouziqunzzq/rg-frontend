<template>
    <div class="main-container">
        <div class="block">
            <h1>{{titleList[step]}}</h1>
            <!--<p class="push-right">{{subTitleList[step]}}</p>-->
            <hr/>
            <transition name="fade" mode="out-in">
                <component :is="componentList[step]"
                           :show-word-count="true"
                           :max-word-count="maxWordCount"
                           :allow-custom-word="true"
                           :lyric-list="lyricList"
                           :next-step-trigger="nextStepTrigger"
                           v-on:select-template="onSelectTemplate"
                           v-on:select-word="onSelectWord"
                />
            </transition>
            <Loader v-show="showLoader"/>
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
    import config from "../config";
    import buildUrlParam from "../buildUrlParam";
    import rhymeList from "../rhymeList";

    export default {
        name: "Generate",
        components: {TemplateChooser, WordChooser, LyricPlayer},
        data() {
            return {
                step: 0,
                //titleList: ['第一步...', '第二步...', '生成中...', 'And NOW...'],
                titleList: ['选择模板', '选择主题词', 'Enjoy the beat and flow'],
                subTitleList: ['...选择模板', '...选择主题词', '...enjoy the beat and flow'],
                nextButtonShow: [true, true, true],
                nextButtonTip: ["下一步", "开始生成", "重新生成"],
                componentList: ["TemplateChooser", "WordChooser", "LyricPlayer"],
                selectedTemplate: null,
                selectedWordList: [],
                lyricList: [
                    // {
                    //     lyric: "腿 搁在办公桌上",
                    //     rhymeToggle: true,
                    //     rhymeType: "双押",
                    //     rhymeCount: 1,
                    //     rhymeWordCount: 2,
                    // },
                ],
                nextStepTrigger: false,
                triggerTime: 10,
                generatedVerseCount: 0,
            }
        },
        computed: {
            maxWordCount() {
                if (this.selectedTemplate === null)
                    return 0;
                else
                    return this.selectedTemplate['verse_list'].length;
            },
            checkNext() {
                // return true if validate ok
                switch (this.step) {
                    case 0: // template
                        return this.selectedTemplate !== null;
                    case 1: // keyword
                        return this.selectedWordList.length > 0
                            && this.selectedTemplate !== null
                            && this.selectedWordList.length <= this.selectedTemplate['verse_list'].length;
                    default:
                        return true;
                }
            },
            showLoader() {
                return this.step === this.componentList.length - 1
                    && this.selectedTemplate !== null
                    && this.generatedVerseCount < this.selectedTemplate['verse_list'].length
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
                let title = this.selectedWordList.join(" ");
                this.$set(this.titleList, this.titleList.length - 1, title);
            },
            generate() {
                // clear lyric list
                this.clearLyricList();

                let vm = this;

                // TODO: do keyword expansion

                // generate lyric verse by verse
                let i = 0;
                for (let verse of vm.selectedTemplate['verse_list']) {
                    i = Math.min(i, vm.selectedWordList.length - 1);
                    let keyword = vm.selectedWordList[i];
                    i++;
                    fetch(config.urlPrefix + "/generate/verse?" + buildUrlParam({
                        keyword: keyword,
                        num_sentence: verse['sentence_count'],
                        target_length: verse['word_count'],
                        rhyme_mode: verse['rhyme_mode'],
                        rhyme_style_id: verse['rhyme_style_id']
                    }))
                        .then(res => {
                            res.json()
                                .then(sentenceList => {
                                    // push sentences of generated verse to lyric list
                                    let sentences = vm.formatSentenceList(sentenceList, verse);
                                    // console.log(sentences);
                                    for (let s of sentences) {
                                        vm.lyricList.push(s);
                                    }
                                    // trigger lyric player
                                    vm.nextStepTrigger = true;
                                    setTimeout(() => {
                                        vm.nextStepTrigger = false
                                    }, this.triggerTime);
                                    // increase generated verse counter
                                    vm.generatedVerseCount++;
                                })
                        })
                }
            },
            formatSentenceList(sentenceList, verse) {
                let rst = [];
                let cnt = 1;
                switch (verse['rhyme_style_id']) {
                    case 0: //排韵
                        for (let s of sentenceList) {
                            rst.push({
                                lyric: s,
                                rhymeToggle: true,
                                rhymeType: rhymeList.rhymeModeList[verse['rhyme_mode']],
                                rhymeCount: cnt++,
                                rhymeWordCount: verse['rhyme_mode'],
                            });
                        }
                        break;
                    case 1: //交韵
                        for (let s of sentenceList) {
                            rst.push({
                                lyric: s,
                                rhymeToggle: true,
                                rhymeType: rhymeList.rhymeStyleList[verse['rhyme_style_id']]
                                    + " " + rhymeList.rhymeModeList[verse['rhyme_mode']],
                                rhymeCount: cnt++,
                                rhymeWordCount: verse['rhyme_mode'],
                            });
                        }
                        break;
                    case 2: //隔行押
                        for (let s of sentenceList) {
                            rst.push({
                                lyric: s,
                                rhymeToggle: cnt % 2 === 0,
                                rhymeType: rhymeList.rhymeStyleList[verse['rhyme_style_id']]
                                    + " " + rhymeList.rhymeModeList[verse['rhyme_mode']],
                                rhymeCount: Math.floor(cnt / 2),
                                rhymeWordCount: verse['rhyme_mode'],
                            });
                            cnt++;
                        }
                        break;
                    case 3: //抱韵 保证4句
                        for (let s of sentenceList) {
                            rst.push({
                                lyric: s,
                                rhymeToggle: true,
                                rhymeType: rhymeList.rhymeStyleList[verse['rhyme_style_id']]
                                    + " " + rhymeList.rhymeModeList[verse['rhyme_mode']],
                                rhymeCount: cnt++,
                                rhymeWordCount: verse['rhyme_mode'],
                            });
                        }
                        break;
                    default:
                        break;
                }
                return rst;
            },
            clearLyricList() {
                this.generatedVerseCount = 0;
                while (this.lyricList.length > 0) {
                    this.lyricList.pop();
                }
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