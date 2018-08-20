<template>
    <div class="word-container-1">
        <Loader v-show="showLoader"/>
        <div class="word-list box-sizing-border-box" id="co-exist-word-list" v-show="!showLoader">
            <h3>共同出现词</h3>
            <hr/>
            <WordToggle v-for="(word, index) in coExistWordList"
                        :key="'co-wt'+index" :word="word" :id="index"
                        :selected="false"
                        :enabled="true"
                        :toggle-able="false"
                        :hover-able="true"
                        v-on:add-word="onSelectCoExistWord"
            />
            <p v-show="coExistWordList.length === 0">空空如也</p>
        </div>
        <div class="word-list box-sizing-border-box" id="crawler-word-list" v-show="!showLoader">
            <h3>爬取相关词</h3>
            <hr/>
            <WordToggle v-for="(word, index) in crawlerWordList"
                        :key="'cr-wt'+index" :word="word" :id="index"
                        :selected="false"
                        :enabled="true"
                        :toggle-able="false"
                        :hover-able="true"
                        v-on:add-word="onSelectCrawlerWord"
            />
            <p v-show="crawlerWordList.length === 0">空空如也</p>
        </div>
    </div>
</template>

<script>
    import WordToggle from "./WordToggle";
    import config from "../config"
    import buildUrlParam from "../buildUrlParam"

    export default {
        name: "WordExpansion",
        components: {WordToggle},
        props: {
            targetWord: String,
        },
        data() {
            return {
                coExistWordList: ["测试", "海星"],
                coExistLoadedFlag: false,
                crawlerWordList: [],
                crawlerLoadedFlag: false,
                crawlerNum: 5,
            }
        },
        computed: {
            showLoader() {
                return !(this.coExistLoadedFlag && this.crawlerLoadedFlag);
            }
        },
        methods: {
            clearList(list) {
                while (list.length > 0) {
                    list.pop();
                }
            },
            clearAll() {
                this.clearList(this.coExistWordList);
                this.clearList(this.crawlerWordList);
            },
            loadCoExistWord(word) {
                let vm = this;
                vm.coExistLoadedFlag = false;
                fetch(config.urlPrefix + "/co_exist/?" + buildUrlParam({
                    str: word,
                }))
                    .then(res => {
                        res.json()
                            .then(data => {
                                for (let w of data) {
                                    vm.coExistWordList.push(w);
                                }
                                vm.coExistLoadedFlag = true;
                            })
                    })
            },
            loadCrawlerWord(word) {
                let vm = this;
                vm.crawlerLoadedFlag = false;
                fetch(config.urlPrefix + "/crawler/?" + buildUrlParam({
                    str: word,
                    num: vm.crawlerNum,
                }))
                    .then(res => {
                        res.json()
                            .then(data => {
                                for (let w of data) {
                                    vm.crawlerWordList.push(w);
                                }
                                vm.crawlerLoadedFlag = true;
                            })
                    })
            },
            onSelectCoExistWord(id) {
                // console.log(this.coExistWordList[id]);
                this.$emit("select-word", this.coExistWordList[id])
            },
            onSelectCrawlerWord(id) {
                // console.log(this.crawlerWordList[id]);
                this.$emit("select-word", this.crawlerWordList[id])
            },
        },
        watch: {
            targetWord(newWord) {
                this.clearAll();
                this.loadCoExistWord(newWord);
                this.loadCrawlerWord(newWord);
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/basic-container";
    @import "../assets/scss/helper";
    @import "../assets/scss/theme-color";
    @import "../assets/scss/vars";

    .word-container-1 {
        @extend %flex-container-row;
        align-items: flex-start;
        justify-content: center;
        flex-wrap: wrap;
    }

    .word-list {
        width: 40%;
        border: $border-color solid 0.1em;
        border-radius: 0.2em;
        margin: 0.3em;
        padding: 0.5em;

        & > h3 {
            text-align: center;
            padding: 0;
            margin: 0;
        }

        @media only screen and (max-width: $small-screen-width) {
            width: 100%;
        }
    }
</style>