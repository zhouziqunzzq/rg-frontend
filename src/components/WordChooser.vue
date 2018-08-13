<template>
    <div>
        <WordToggle class="word-toggle"
                    v-for="(word, index) in wordList"
                    :key="'wt'+index" :word="word" :id="index"
                    v-on:add-word="onAddWord"
                    v-on:delete-word="onDeleteWord"
        />
        <p v-for="(w, i) in selectedWordList" :key="'sw'+i">{{w}}</p>
    </div>
</template>

<script>
    import WordToggle from "./WordToggle";

    export default {
        name: "WordChooser",
        components: {WordToggle},
        data() {
            return {
                wordList: ["我的", "你的", "他的", "cat", "dog", "a", "is", "are", "腿",
                    "办公桌", "太强了", "萌新瑟瑟发抖", "仰望高端玩家"],
                selectedWordList: [],
            }
        },
        methods: {
            onAddWord(wordID) {
                // console.log(wordID);
                this.selectedWordList.push(this.wordList[wordID]);
            },
            onDeleteWord(wordID) {
                let targetWord = this.wordList[wordID];
                for (let i = 0; i < this.selectedWordList.length; i++) {
                    if (this.selectedWordList[i] === targetWord) {
                        this.selectedWordList.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .word-toggle {
        display: inline-block;
    }
</style>