<template>
    <div>
        <div class="bar box-sizing-border-box"
             :style="{width: (sentenceLength/maxLength*100)+'%'}"></div>
        <!--<div v-if="showDetail">-->
            <!--<p class="info">({{sentenceLength['wordCount']}} words,-->
                <!--{{sentenceLength['rhyme_type']}},-->
                <!--{{sentenceLength['rhyme_pinyin']}})-->
            <!--</p>-->
        <!--</div>-->
    </div>
</template>

<script>
    export default {
        name: "TemplateLine",
        props: {
            sentenceLength: Number,
            maxLength: Number,
            // showDetail: Boolean,
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/theme-color";
    @import "../assets/scss/helper";

    .bar {
        background: $template-line-color;
        height: 0.5em;
        margin: 0.2em 0;
        @include border-radius(1em);
    }

    .detail {
        display: inline-block;
    }

    .info {
        margin: 0.05em 0 1em 0;
    }
</style>