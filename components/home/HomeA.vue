<template>
    <div>
        
        <div v-if="hidePrices && hidePricesMessage" class="pricesHided mt-4" >
            <p v-html="hidePricesMessage"></p>
           
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
