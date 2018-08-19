<template>
    <div class="thumbnail-container">
        <div class="thumbnail-container-inner"
            :class="{'selected': selected}">
            <div v-for="(verse, index) in template['verse_list']"
                 :key="'v'+index"
            >
                <TemplateLine v-for="s in verse['sentence_count']"
                              :key="'s'+s"
                              :sentence-length="verse['word_count']"
                              :max-length="maxSentenceLength"
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
                for (let verse of this.template['verse_list']) {
                    maxLen = Math.max(maxLen, verse['word_count']);
                }
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