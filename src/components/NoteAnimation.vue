<template>
    <div>
        <transition name="fade">
            <div id="note1" v-show="show[0]" class="animate-lu">
                <img src="../assets/img/notes/note1.png"/>
            </div>
        </transition>
        <transition name="fade">
            <div id="note2" v-show="show[1]" class="animate-ru">
                <img src="../assets/img/notes/note2.png"/>
            </div>
        </transition>
        <transition name="fade">
            <div id="note3" v-show="show[2]" class="animate-ru">
                <img src="../assets/img/notes/note3.png"/>
            </div>
        </transition>
        <transition name="fade">
            <div id="note4" v-show="show[3]" class="animate-lu">
                <img src="../assets/img/notes/note4.png"/>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "NoteAnimation",
        data() {
            return {
                show: [false, false, false, false],
                nowNoteID: -1,
                animator: null,
                duration: 500,
            }
        },
        methods: {
            start() {
                let vm = this;
                this.animator = setInterval(vm.nextTick, vm.duration);
            },
            nextTick() {
                // randomly choose next note
                let nextNoteID = Math.floor(Math.random() * 4);
                while (nextNoteID === this.nowNoteID) {
                    nextNoteID = Math.floor(Math.random() * 4);
                }
                this.nowNoteID = nextNoteID;
                // show chosen note
                for (let i in this.show) {
                    this.$set(this.show, i, false);
                }
                this.$set(this.show, nextNoteID, true);
            },
            stop() {
                clearInterval(this.animator);
            }
        },
        mounted() {
            this.start();
        },
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/basic-container";
    @import "../assets/scss/helper";
    @import "../assets/scss/animation";

    div {
        @extend %flex-container-row;
        justify-content: center;
        position: fixed;
        bottom: 0em;
        width: 100%;
        z-index: -100;

        @media only screen and (max-width: $small-screen-width) {
            top: 0;
            left: 0;
            justify-content: flex-start;
            width: auto;
        }
    }

    $animate-speed: 2s;

    img {
        height: 2em;
        width: auto;
        // spin animation
        @include animation(spin $animate-speed linear infinite);
    }

    .animate-lu {
        @include animation(move-lu $animate-speed linear infinite);
        @media only screen and (max-width: $small-screen-width) {
            @include animation(move-rd $animate-speed linear infinite);
        }
    }

    .animate-ru {
        @include animation(move-ru $animate-speed linear infinite);
        @media only screen and (max-width: $small-screen-width) {
            @include animation(move-rd $animate-speed linear infinite);
        }
    }
</style>