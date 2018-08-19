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
    import config from "../config";

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
                // get template list from BE
                fetch(config.urlPrefix + "/templates")
                    .then(res => {
                        res.json()
                            .then(tList => {
                                for (let t of tList)
                                    vm.templateList.push(t);
                            })
                    });
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