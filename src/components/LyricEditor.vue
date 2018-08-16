<template>
    <div>
        <div v-for="(word, i) in sentence"
             :key="'w' + i"
        >
            {{word}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "LyricEditor",
        props: {
            sentence: Array,
        },
        data() {
            return {
                editingSentence: [],
            }
        },
    }
</script>

<style scoped lang="scss">

</style>