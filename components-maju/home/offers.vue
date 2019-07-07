<template>
<div class="d-flex flex-column w-100 justify-content-center text-center align-items-center mt-4">
    <h2 class="text-red">MIRA QUE OFERTAS EN MAJU!</h2>
    <div class="row mt-4 d-flex align-items-stretch p-4" v-if="offers && offers.length > 0">
        <div v-for="product in offers" :key="product.id" class="col-12 col-lg-6 mt-2">
            <productCard v-if="$mq=='lg'" :product="product" class="border-grey"></productCard>
            <small-card v-else :product="product" class="border-grey"></small-card>
        </div>
    </div>
</div>
</template>

<script>
import productCard from '../category/product/card.vue';
import smallCard from '../category/product/small-card.vue';
export default {
    components:{productCard,smallCard},
    computed:{
        offers(){
            return this.$store.getters.getOffers;
        },
        
    },
    
}
</script>

<style lang="scss" scoped>
.border-grey{
    border: 1px solid #868686;

}


</style>
