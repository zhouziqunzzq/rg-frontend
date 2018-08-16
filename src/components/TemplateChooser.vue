<template>
    <div class="container" :class="{'center': !loadFinishFlag}">
        <Loader v-show="!loadFinishFlag"/>
        <TemplateToggle v-for="(t, i) in templateList"
                        :key="i"
                        :template="t"
                        :id="i"
                        :selected="selectedTemplateFlag[i]"
                        v-on:select-template="onSelectTemplate"
        />
    </div>
</template>

<script>
    import TemplateToggle from "./TemplateToggle";

    export default {
        name: "TemplateChooser",
        components: {TemplateToggle},
        data() {
            return {
                templateList: [],
                selectedTemplateFlag: [],
                selectedTemplateID: -1,
            }
        },
        computed: {
            loadFinishFlag() {
                return this.templateList.length !== 0;
            }
        },
        methods: {
            clearSelectTemplate() {
                for (let i in this.selectedTemplateFlag) {
                    this.$set(this.selectedTemplateFlag, i, false);
                }
            },
            onSelectTemplate(id) {
                this.clearSelectTemplate();
                this.$set(this.selectedTemplateFlag, id, true);
                this.selectedTemplateID = this.templateList[id]["id"];
                this.$emit('select-template', this.templateList[id]);
            },
            getTemplateList() {
                let vm = this;
                // clear
                this.templateList.splice(0, this.templateList.length);
                this.selectedTemplateFlag.splice(0, this.selectedTemplateFlag.length);
                this.selectedTemplateID = -1;
                // TODO: get template list from BE
                let fakeTemplateList = [
                    {   // template1
                        name: '糟糕的模板',
                        id: 1,
                        verseList: [
                            {   //verse1
                                sentenceList: [
                                    {   //sentence1
                                        wordCount: 6,
                                        rhymeType: "单押",
                                        rhymePinyin: "ang",
                                    },
                                    {   //sentence2
                                        wordCount: 6,
                                        rhymeType: "单押",
                                        rhymePinyin: "ang",
                                    },
                                    {   //sentence3
                                        wordCount: 6,
                                        rhymeType: "单押",
                                        rhymePinyin: "i",
                                    },
                                    {   //sentence4
                                        wordCount: 6,
                                        rhymeType: "单押",
                                        rhymePinyin: "i",
                                    },
                                ]
                            },
                            {   //verse2
                                sentenceList: [
                                    {   //sentence1
                                        wordCount: 8,
                                        rhymeType: "双押",
                                        rhymePinyin: "ang in",
                                    },
                                    {   //sentence2
                                        wordCount: 8,
                                        rhymeType: "双押",
                                        rhymePinyin: "ang in",
                                    },
                                ]
                            },
                            {   //verse3
                                sentenceList: [
                                    {   //sentence1
                                        wordCount: 4,
                                        rhymeType: "双押",
                                        rhymePinyin: "ang in",
                                    },
                                    {   //sentence2
                                        wordCount: 4,
                                        rhymeType: "双押",
                                        rhymePinyin: "ang in",
                                    },
                                    {   //sentence1
                                        wordCount: 4,
                                        rhymeType: "双押",
                                        rhymePinyin: "ang in",
                                    },
                                    {   //sentence2
                                        wordCount: 4,
                                        rhymeType: "双押",
                                        rhymePinyin: "ang in",
                                    },
                                ]
                            },
                        ],
                    },
                    {   // template2
                        name: '海星的模板',
                        id: 2,
                        verseList: [
                            {   //verse1
                                sentenceList: [
                                    {   //sentence1
                                        wordCount: 4,
                                        rhymeType: "单押",
                                        rhymePinyin: "ang",
                                    },
                                    {   //sentence2
                                        wordCount: 4,
                                        rhymeType: "单押",
                                        rhymePinyin: "ang",
                                    },
                                    {   //sentence3
                                        wordCount: 6,
                                        rhymeType: "单押",
                                        rhymePinyin: "i",
                                    },
                                    {   //sentence4
                                        wordCount: 6,
                                        rhymeType: "单押",
                                        rhymePinyin: "i",
                                    },
                                ]
                            },
                            {   //verse2
                                sentenceList: [
                                    {   //sentence1
                                        wordCount: 10,
                                        rhymeType: "双押",
                                        rhymePinyin: "ang in",
                                    },
                                    {   //sentence2
                                        wordCount: 10,
                                        rhymeType: "双押",
                                        rhymePinyin: "ang in",
                                    },
                                ]
                            },
                        ],
                    },
                    {   // template2
                        name: '布星的模板',
                        id: 3,
                        verseList: [
                            {   //verse1
                                sentenceList: [
                                    {   //sentence1
                                        wordCount: 4,
                                        rhymeType: "单押",
                                        rhymePinyin: "ang",
                                    },
                                    {   //sentence2
                                        wordCount: 4,
                                        rhymeType: "单押",
                                        rhymePinyin: "ang",
                                    },
                                    {   //sentence3
                                        wordCount: 6,
                                        rhymeType: "单押",
                                        rhymePinyin: "i",
                                    },
                                    {   //sentence4
                                        wordCount: 6,
                                        rhymeType: "单押",
                                        rhymePinyin: "i",
                                    },
                                ]
                            },
                            {   //verse2
                                sentenceList: [
                                    {   //sentence1
                                        wordCount: 10,
                                        rhymeType: "双押",
                                        rhymePinyin: "ang in",
                                    },
                                    {   //sentence2
                                        wordCount: 10,
                                        rhymeType: "双押",
                                        rhymePinyin: "ang in",
                                    },
                                ]
                            },
                        ],
                    },
                    {   // template2
                        name: '恶星的模板',
                        id: 4,
                        verseList: [
                            {   //verse1
                                sentenceList: [
                                    {   //sentence1
                                        wordCount: 4,
                                        rhymeType: "单押",
                                        rhymePinyin: "ang",
                                    },
                                    {   //sentence2
                                        wordCount: 4,
                                        rhymeType: "单押",
                                        rhymePinyin: "ang",
                                    },
                                    {   //sentence3
                                        wordCount: 6,
                                        rhymeType: "单押",
                                        rhymePinyin: "i",
                                    },
                                    {   //sentence4
                                        wordCount: 6,
                                        rhymeType: "单押",
                                        rhymePinyin: "i",
                                    },
                                ]
                            },
                            {   //verse2
                                sentenceList: [
                                    {   //sentence1
                                        wordCount: 10,
                                        rhymeType: "双押",
                                        rhymePinyin: "ang in",
                                    },
                                    {   //sentence2
                                        wordCount: 10,
                                        rhymeType: "双押",
                                        rhymePinyin: "ang in",
                                    },
                                ]
                            },
                        ],
                    },
                ];
                setTimeout(() => {
                    for (let t of fakeTemplateList)
                        vm.templateList.push(t);
                }, 1000);
                // init selectedTemplateFlag
                for (let i = 0; i < this.templateList.length; i++)
                    this.selectedTemplateFlag.push(false);
            }
        },
        mounted() {
            this.getTemplateList();
        },
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/basic-container";

    .container {
        @extend %flex-container-row;
        width: 100%;
        flex-wrap: wrap;

        @media only screen and (max-width: $small-screen-width) {
            align-items: center;
            justify-content: center;
        }
    }

    .center {
        align-items: center;
        justify-content: center;
    }

</style>