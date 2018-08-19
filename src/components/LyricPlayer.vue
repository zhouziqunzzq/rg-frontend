<template>
    <div class="lyric-wrapper box-sizing-border-box">
        <font-awesome-icon icon="share-alt"
                           class="share hand-cursor"
                           v-show="shareable"
                           @click="share"
        />
        <LyricLine
                v-for="(s, i) in sentences"
                :key="'s'+i"
                :sentence="s"
                :typeSpeed="typeSpeed"
        />
    </div>
</template>

<script>
    import LyricLine from "./LyricLine";

    export default {
        name: "LyricPlayer",
        components: {LyricLine},
        props: {
            lyricList: Array,
        },
        data() {
            return {
                sentences: [],
                step: 0,
                typeSpeed: 100,
                typeInterval: 500,
                scrollInterval: 100,
            }
        },
        computed: {
            shareable() {
                return navigator.share;
            }
        },
        methods: {
            nextStep() {
                let vm = this;
                let lastLen = this.lyricList[this.step]['lyric'].length;
                this.sentences.push(this.lyricList[this.step++]);
                setTimeout(vm.scrollToBottom, vm.scrollInterval);
                if (this.step === this.lyricList.length) {
                    return null;
                } else {
                    setTimeout(vm.nextStep,
                        (lastLen + 1) * this.typeSpeed + this.typeInterval);
                }
            },
            play() {
                this.reset();
                this.nextStep();
            },
            reset() {
                while (this.sentences.length > 0) {
                    this.sentences.pop();
                }
            },
            scrollToBottom() {
                this.$emit('scroll-to-end');
            },
            share() {
                let shareText = "分享歌词 - 由七言AI生成\n";
                for (let s of this.lyricList) {
                    shareText = shareText + s['lyric'] + "\n";
                }
                navigator.share({
                    title: "分享歌词 - 由七言AI生成",
                    text: shareText,
                    url: document.location.href,
                })
                    .then(() => console.log('Successful share'))
                    .catch((error) => console.log('Error sharing', error));
            }
        },
        mounted() {
            this.play();
        },
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/helper";

    .lyric-wrapper {
        width: 100%;
        padding: 2em;
    }

    .share {
        font-size: 1.5em;
        position: absolute;
        right: 0.5em;
        top: 1em;
    }
</style>