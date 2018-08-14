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
        <transition name="left-slide-fade" mode="out-in">
            <h3 class="rhyme-p" v-show="showRhyme">
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
                let s = this.sentence['lyric'];
                let l = this.sentence['rhymeWordCount'];
                return s.substr(0, s.length - l);
            },
            sentencePost() {
                let s = this.sentence['lyric'];
                let l = this.sentence['rhymeWordCount'];
                return s.substr(s.length - l);
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

    .typing {
        margin: 0;
    }

    .complete {
        color: $player-rhyme-word-color;
    }

    .pre, .post {
        display: inline;
    }

    .line-wrapper {
        @extend %flex-container-row;
        margin: 0 0 2em 0;
        justify-content: flex-start;
    }

    .rhyme-p {
        margin: 0 0 0 1em;
        color: $player-rhyme-tag-color;
    }
</style>