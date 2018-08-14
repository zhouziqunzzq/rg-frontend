<template>
    <div class="thumbnail-container">
        <div class="thumbnail-container-inner"
            :class="{'selected': selected}">
            <div v-for="(verse, index) in template['verseList']"
                 :key="'v'+index"
            >
                <TemplateLine v-for="(sentence, index) in verse['sentenceList']"
                              :key="'s'+index"
                              :sentence="sentence"
                              :max-length="maxSentenceLength"
                              :show-detail="false"
                />
            </div>
        </div>
        <p>{{template['name']}}</p>
    </div>
</template>

<script>
    import TemplateLine from "./TemplateLine";

    export default {
        name: "TemplateThumbnail",
        components: {TemplateLine},
        props: {
            template: Object,
            selected: Boolean,
        },
        computed: {
            maxSentenceLength() {
                let maxLen = 0;
                for (let verse of this.template['verseList']) {
                    for (let sentence of verse['sentenceList']) {
                        maxLen = Math.max(maxLen, sentence['wordCount']);
                    }
                }
                // console.log('maxLen=', maxLen);
                return maxLen;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/basic-container";
    @import "../assets/scss/theme-color";
    @import "../assets/scss/helper";

    .thumbnail-container {
        width: 100%;
    }

    .thumbnail-container-inner {
        @extend %flex-container-column;
        justify-content: flex-start;
        align-items: stretch;
        height: 10em;
        overflow: hidden;
        border: $border-color 0.1em solid;
        @include border-radius(0.2em);
        padding: 0.5em;

        @include transition(background .3s);
        &:hover {
            background: $theme-color-light;
        }
    }

    .selected {
        background: $theme-color-light;
    }

    p {
        text-align: center;
    }
</style>