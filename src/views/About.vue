<template>
    <div class="about">
        <h1>Powered by 七言AI</h1>
        <h3>Made with
            <font-awesome-icon icon="heart"/>
        </h3>
        <hr/>
        <h2>导师</h2>
        <h3>王德瑞</h3>
        <hr/>
        <h2>组长</h2>
        <h3>孙蒙新</h3>
        <hr/>
        <h2>组员</h2>
        <h3>王超群</h3>
        <h3>陆亦杨</h3>
        <h3>庞雲升</h3>
        <h3>詹珏岑</h3>
        <h3>石华</h3>
        <h3>周子群</h3>
        <h3>汪自力</h3>
        <h3>伊玮雯</h3>
        <h3>王诗俊</h3>
        <h3>项瑞昌</h3>
        <hr/>
    </div>
</template>
<style scoped lang="scss">
    @import "../assets/scss/basic-container";

    .about {
        //@extend %main-container;
        @extend %flex-container-column;
        //height: 100%;
        align-items: center;
        justify-content: center;
        padding: 0 0 5em 0;

        & > hr {
            width: 70%;
        }

        & > h3 {
            margin: 0;
            padding: 0.2em 0;
        }
    }
</style>