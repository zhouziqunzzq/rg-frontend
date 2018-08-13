<template>
    <div :class="{selected: selected}"
         class="no-select"
         @click="onToggle">
        {{word}}
    </div>
</template>

<script>
    export default {
        name: "WordToggle",
        props: {
            word: String,
            id: Number,
        },
        data() {
            return {
                selected: false,
            }
        },
        methods: {
            onToggle() {
                if (this.selected) {
                    this.$emit('delete-word', this.id);
                } else {
                    this.$emit('add-word', this.id);
                }
                this.selected = !this.selected;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/theme-color";
    @import "../assets/scss/helper";

    div {
        border: $border-color 0.1em solid;
        @include border-radius(50%);
        padding: 0.4em;
        margin: 0.2em;
        cursor: pointer;
        min-width: 3em;
        text-align: center;

        @include transition(background .3s);
        &:hover {
            background: $theme-color-light;
        }
    }

    .selected {
        background: $theme-color-light;
    }
</style>