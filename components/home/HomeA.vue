<template>
    <div>
        
        <div v-if="hidePrices" class="pricesHided mt-4">
            <p>
                Jueves 4 de Junio estará disponible nuevamente el cotizador Web para pedidos al Interior.
            </p>
            <p>
                Estamos trabajando con personal reducido en todas las áreas debido a la situación actual por lo que hay demoras. Agradecemos la paciencia y comprensión, es muy particular el momento que estamos pasando como sociedad, buscamos brindarles lo mejor posible dentro de las limitaciones que impone la cuarentena.
            </p>
           
        </div>
    
    
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
