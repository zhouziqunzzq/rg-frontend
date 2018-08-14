<template>
    <div>
        <div @click="onShowViewerClicked">
            <TemplateThumbnail
                    :template="template"
                    :selected="selected"
                    class="hand-cursor"
            />
        </div>
        <transition name="fade" mode="out-in">
            <TemplateViewer
                    :template="template"
                    v-show="showViewer"
                    v-on:close-viewer="showViewer=false"
                    v-on:select="$emit('select-template', id)"
            />
        </transition>
    </div>
</template>

<script>
    import TemplateThumbnail from "./TemplateThumbnail";
    import TemplateViewer from "./TemplateViewer";

    export default {
        name: "TemplateToggle",
        components: {TemplateViewer, TemplateThumbnail},
        props: {
            template: Object,
            selected: Boolean,
            id: Number,
        },
        data() {
            return {
                showViewer: false,
            }
        },
        methods: {
            onShowViewerClicked() {
                this.showViewer = true;
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/theme-color";
    @import "../assets/scss/helper";
    @import "../assets/scss/animation";

    div {
        width: 8em;
        padding: 0.5em 1em 0 0;
    }

</style>