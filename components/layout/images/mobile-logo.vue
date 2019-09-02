<template>
<div class="fondo">
     <img :src="imagePath('/storage/images/app/fondo-logo.jpg')" alt="fondo" > 
    <!--  <img :src="imagePath('/storage/images/app/logo.png')" alt="Mates Fabi">
     --> 
     <nuxt-link to="/" title="home" class="logo">
        <img :src="imagePath('/storage/images/app/logo.png')" alt="Mates Fabi">
    </nuxt-link> 
</div>
</template>

<style scoped lang="scss">
.fondo{
    position:relative;
    width:100%;
    margin:auto;
    height: 200px;

}
.logo{
    position:absolute;
    width:50%;
    top:0;
    left:25%;
}
img{width: 100%}
</style>
