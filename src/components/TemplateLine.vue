<template>
    <div>
        <div class="bar"
             :style="{width: (sentence['wordCount']/maxLength*100)+'%'}"></div>
        <div v-if="showDetail">
            <p class="info">({{sentence['wordCount']}} words,
                {{sentence['rhymeType']}},
                {{sentence['rhymePinyin']}})
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TemplateLine",
        props: {
            sentence: Object,
            maxLength: Number,
            showDetail: Boolean,
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/theme-color";
    @import "../assets/scss/helper";

    .bar {
        background: $template-line-color;
        height: 0.5em;
        margin: 0.2em;
        @include border-radius(1em);
    }

    .detail {
        display: inline-block;
    }

    .info {
        margin: 0.05em 0 1em 0;
    }
</style>