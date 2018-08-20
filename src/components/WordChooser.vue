<template>
    <div :class="{'center': !loadFinishFlag}">
        <Loader v-show="!loadFinishFlag"/>
        <p v-show="showWordCount && loadFinishFlag">
            当前的模板最多可以选择{{maxWordCount}}个主题词,
            现在共选择了{{selectedWordList.length}}个主题词。
        </p>
        <div v-show="allowCustomWord && loadFinishFlag"
             class="custom-word-wrapper box-sizing-border-box"
        >
            <input id="custom-word" type="text" placeholder="自定义主题词"
                   v-model="customWord"
                   @keyup.enter="onAddCustomWord"
            />
            <button @click="onAddCustomWord">添加</button>
        </div>
        <WordToggle v-for="(word, index) in wordList"
                    :key="'wt'+index" :word="word" :id="index"
                    :selected="selectedFlag[index]"
                    :enabled="!maxWordCountFlag"
                    :toggle-able="true"
                    :hover-able="false"
                    v-on:add-word="onAddWord"
                    v-on:delete-word="onDeleteWord"
        />
        <!--<p v-for="(w, i) in selectedWordList" :key="'sw'+i">{{w}}</p>-->
    </div>
</template>

<script>
    import WordToggle from "./WordToggle";
    import themeWordList from "../themeWordList";

    export default {
        name: "WordChooser",
        components: {WordToggle},
        props: {
            maxWordCount: Number,
            showWordCount: Boolean,
            allowCustomWord: Boolean,
        },
        data() {
            return {
                wordList: [],
                selectedFlag: [],
                selectedWordList: [],
                customWord: "",
            }
        },
        computed: {
            maxWordCountFlag() {
                return this.selectedWordList.length >= this.maxWordCount;
            },
            loadFinishFlag() {
                return this.wordList.length !== 0;
            }
        },
        methods: {
            onAddWord(wordID) {
                // check duplicate word
                for (let w of this.selectedWordList) {
                    if (w === this.wordList[wordID]) {
                        return null;
                    }
                }
                // check max word count
                if (this.maxWordCountFlag) {
                    return null;
                } else {
                    // set selected flag and push to selected word list
                    this.$set(this.selectedFlag, wordID, true);
                    this.selectedWordList.push(this.wordList[wordID]);
                }
            },
            onDeleteWord(wordID) {
                // clear selected flag
                this.$set(this.selectedFlag, wordID, false);
                // find and splice target word
                let targetWord = this.wordList[wordID];
                for (let i = 0; i < this.selectedWordList.length; i++) {
                    if (this.selectedWordList[i] === targetWord) {
                        this.selectedWordList.splice(i, 1);
                        break;
                    }
                }
            },
            onAddCustomWord() {
                // check for blank string
                if (this.customWord.length === 0)
                    return null;
                // find duplicate word
                for (let i in this.wordList) {
                    if (this.wordList[i] === this.customWord) {
                        this.onAddWord(i);
                        // clear input
                        this.customWord = "";
                        return null;
                    }
                }
                // otherwise push to word list
                this.wordList.push(this.customWord);
                this.onAddWord(this.wordList.length - 1);
                // clear input
                this.customWord = "";
            },
            getWordList() {
                let vm = this;
                // clear
                this.wordList.splice(0, this.wordList.length);
                this.selectedFlag.splice(0, this.selectedFlag.length);
                // TODO: Get word list from BE
                for (let w of themeWordList)
                    vm.wordList.push(w);
                // init selected flag
                for (let i = 0; i < this.wordList.length; i++)
                    this.selectedFlag.push(false);
            }
        },
        mounted() {
            this.getWordList();
        },
        watch: {
            selectedWordList(newValue) {
                this.$emit('select-word', newValue);
                // console.log(newValue);
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/helper";
    @import "../assets/scss/basic-button";
    @import "../assets/scss/basic-container";
    @import "../assets/scss/theme-color";

    .custom-word-wrapper {
        margin: 1em 0;
        & > label {
            margin-right: 1em;
        }
        & > input {
            border-top: $border-color 0.1em solid;
            border-bottom: $border-color 0.1em solid;
            border-left: $border-color 0.1em solid;
            border-right: none;
            border-radius: 0.3em 0 0 0.3em;
            padding: 0.5em;

            @media only screen and (max-width: $small-screen-width) {
                width: 70%;
            }
        }
        & > button {
            @extend %round-button;
            border-radius: 0 0.3em 0.3em 0;
            padding: 0.2em 0.5em 0.3em 0.5em;

            @media only screen and (max-width: $small-screen-width) {
                width: 25%;
            }
        }

        @media only screen and (max-width: $small-screen-width) {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
    }

    .center {
        @extend %flex-container-row;
        width: 100%;
        align-items: center;
        justify-content: center;
    }
</style>