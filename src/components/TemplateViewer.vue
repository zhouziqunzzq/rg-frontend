<template>
    <div class="mask mask-container">
        <div class="viewer-wrapper">
            <div class="viewer">
                <font-awesome-icon icon="times"
                                   class="close-button hand-cursor"
                                   @click="$emit('close-viewer')"
                />
                <h3>{{template['name']}}</h3>
                <div v-for="(verse, index) in template['verseList']"
                     :key="'v'+index">
                    <h4>Verse {{index+1}}</h4>
                    <TemplateLine
                            v-for="(sentence, index) in verse['sentenceList']"
                            :key="'s'+index"
                            :sentence="sentence"
                            :max-length="maxSentenceLength"
                            :show-detail="true"
                    />
                </div>
                <button @click="$emit('select'), $emit('close-viewer')">选择此模板</button>
            </div>
        </div>
    </div>
</template>

<script>
    import TemplateLine from "./TemplateLine";

    export default {
        name: "TemplateViewer",
        components: {TemplateLine},
        props: {
            template: Object,
        },
        computed: {
            maxSentenceLength() {
                let maxLen = 0;
                for (let verse of this.template['verseList']) {
                    for (let sentence of verse['sentenceList']) {
                        maxLen = Math.max(maxLen, sentence['wordCount']);
                    }
                }
                return maxLen;
            }
        },
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/basic-container";
    @import "../assets/scss/basic-button";
    @import "../assets/scss/theme-color";
    @import "../assets/scss/vars";
    @import "../assets/scss/helper";

    .mask-container {
        display: flex;
        justify-content: center;
        z-index: 100;
    }

    .viewer-wrapper {
        @extend %flex-container-column;
        top: $nav-height + 2em;
        flex-shrink: 0;
        width: 60%;
        height: 80%;
        min-height: 100px;
        overflow-y: hidden;
        @include border-radius(0.5em);
        z-index: 1000;
    }

    .viewer {
        @extend %flex-container-column;
        flex-shrink: 0;
        background: $window-bg-color;
        width: 100%;
        height: 100%;
        min-height: 100px;
        overflow-y: auto;
        padding: 0.5em 1em 1em 1em;
        z-index: 2000;
    }

    .close-button {
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        font-size: 2em;

        @include transition(color .3s);
        &:hover {
            color: $theme-color-light;
        }
    }

    h3 {
        text-align: center;
        font-weight: bold;
    }

    h4 {
        font-weight: bold;
    }

    p {
        display: inline;
    }

    button {
        @extend %round-button;
        flex-shrink: 0;
    }

</style>