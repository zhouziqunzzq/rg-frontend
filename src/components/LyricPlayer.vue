<template>
    <div class="lyric-wrapper box-sizing-border-box">
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
</style>