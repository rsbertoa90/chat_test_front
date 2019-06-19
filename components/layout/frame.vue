<template>
<div>
    <div class="line-top"></div>
    <div class="line-left"></div>
    <div class="line-bottom"></div>
    <div class="line-right"></div>
</div>
</template>

<style lang="scss" scoped>
    .line-top,.line-bottom,.line-right,.line-left{
        position:fixed;
        background-color: #ff0aaf;
        z-index:200;
    }

    .line-top{
        top:0;
        left:0;
        width: 100vw;
        height: 1px;
    }

    .line-bottom{
        bottom:0;
        left:0;
        width: 100vw;
        height: 1px;
    }
    
    .line-left{
        top:0;
        left:0;
        width: 1px;
        height: 100vh;
    }

     .line-right{
        top:0;
        right:0;
        width: 1px;
        height: 100vh;
    }

    


</style>
