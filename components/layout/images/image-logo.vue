<template>
<nuxt-link to="/" title="home" >

    <img :src="imagePath('/storage/images/app/logo.png')" alt="Mates Fabi">
</nuxt-link>
</template>

<style scoped>
    img{width: 100%}
    @media(max-width:660px)
    {
        img{
            width:176px;
            margin-left:calc(50% - 93px);
        }
    }
</style>
