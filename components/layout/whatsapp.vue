<template>
    <a class="floating" rel="noreferrer" target="_blank" href="https://wa.me/541138951332">
        
        <span class="fab fa-whatsapp"></span>
        <span>¿Necesitas ayuda?</span>
    </a>
</template>

<style scoped lang="scss">

 $color-second : #0FE0E8;



    .floating{
        position: fixed;
        z-index:100;
        bottom:10px;
        right:10px;
        display:flex;
        justify-content:center;
        background-color:transparent;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 1.1rem;
        border-radius: 10%;
        border: 3px solid $color-second;
        background-color: #fff;
        padding-right: 10px;
    }
    .fa-whatsapp{
        color: #fff;
        background-color: $color-second;
        font-size: 2rem;
        font-weight: bold;
        margin-right: 10px;
        padding: 10px;
        
    }
</style>