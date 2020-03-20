<template>
    <div>
        
        <div v-if="hidePrices" class="pricesHided mt-4">
            Cuidémonos entre todos: Ante el anuncio del Gobierno Nacional, Mates Fabi se encuentra temporalmente cerrado. 
            <br>  En estos momentos permanecer en nuestros hogares es muy importante, seamos responsables.
            <br> Seguiremos publicando las novedades en nuestra redes sociales.       
        </div>
      <!--   <div v-if="hidePrices" class="pricesHided mt-4">
            Estamos actualizando nuestra Web, pronto precios y toma de pedidos disponible. Disculpa la molestia! Cualquier consulta el numero del área de venta es 11 3008 5414
        </div> -->

            <home-banners></home-banners>
            <home-icons></home-icons>
    
        
    </div>
</template>

<script>

import homeBanners from './banners.vue';
import homeIcons from './icons.vue';
export default {
   
    components:{
        homeBanners,
        homeIcons
    },
    computed:{
        user(){
            return this.$store.getters.getUser;
        },

    },
   
}
</script>

<style lang="scss" scoped>

.pricesHided{
    background-color: #666;
    color:#fff;
    padding:10px;
    font-size: 1.15rem;
}
</style>
