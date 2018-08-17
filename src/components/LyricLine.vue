<template>
    <div class="line-wrapper">
        <vue-typed-js
                v-show="!hideTyping"
                :strings="[sentence['lyric']]"
                :typeSpeed="typeSpeed"
                @onComplete="onCompleteTyping"
        >
            <h3 class="typing"></h3>
        </vue-typed-js>
        <div class="typing" v-show="hideTyping">
            <h3 class="pre">{{sentencePre}}</h3>
            <h3 class="post complete">{{sentencePost}}</h3>
        </div>
        <transition name="bounce" mode="out-in">
            <h3 class="rhyme-p" v-show="sentence['rhymeToggle'] && showRhyme">
                【{{sentence['rhymeType']}}
                <font-awesome-icon icon="times"/>
                {{sentence['rhymeCount']}}】
            </h3>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "LyricLine",
        props: {
            sentence: Object,
            typeSpeed: Number,
        },
        data() {
            return {
                showRhyme: false,
                hideTyping: false,
            }
        },
        computed: {
            sentencePre() {
                if (this.sentence['rhymeToggle']) {
                    let s = this.sentence['lyric'];
                    let l = this.sentence['rhymeWordCount'];
                    return s.substr(0, s.length - l);
                } else {
                    return this.sentence['lyric'];
                }
            },
            sentencePost() {
                if (this.sentence['rhymeToggle']) {
                    let s = this.sentence['lyric'];
                    let l = this.sentence['rhymeWordCount'];
                    return s.substr(s.length - l);
                } else {
                    return "";
                }
            },
        },
        methods: {
            onCompleteTyping() {
                this.showRhyme = true;
                this.hideTyping = true;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/helper";
    @import "../assets/scss/basic-container";
    @import "../assets/scss/animation";
    @import "../assets/scss/theme-color";

    @font-face {
        font-family: "HYZiYanHuanLeSongJ-2";
        src: url("../assets/fonts/HYZiYanHuanLeSongJ-2.ttf");
    }

    .typing {
        margin: 0;
        font-size: 1.3em;

        @media only screen and (max-width: $small-screen-width) {
            width: 100%;
            font-size: 1em;
        }
    }

    .typed-element {
        font-size: 1.3em;

        @media only screen and (max-width: $small-screen-width) {
            font-size: 1em;
        }
    }

    .complete {
        color: $player-rhyme-word-color;
    }

    .pre, .post {
        display: inline;
        font-size: 1.3em;

        @media only screen and (max-width: $small-screen-width) {
            font-size: 1em;
        }
    }

    .line-wrapper {
        @extend %flex-container-row;
        margin: 0 0 2em 0;
        justify-content: flex-start;

        @media only screen and (max-width: $small-screen-width) {
            flex-wrap: wrap;
            justify-content: flex-start;
        }
    }

    .rhyme-p {
        margin: 0 0 0 1em;
        color: $nav-text-color;
        font-family: "HYZiYanHuanLeSongJ-2", sans-serif;
        font-size: 1.5em;
        -webkit-text-stroke: 0.05em #fff;
        text-shadow: 0.1em 0.2em 0.3em #000;

        @media only screen and (max-width: $small-screen-width) {
            margin: 0;
            font-size: 1em;
        }
    }
</style>