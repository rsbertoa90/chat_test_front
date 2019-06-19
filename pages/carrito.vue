<template>
    <shoppingcart></shoppingcart>
</template>

<script>
import metaMixin from '@/plugins/metadataMixin.js';
import shoppingcart from '@/components/shoppingCart/ShoppingCart.vue'
export default {
    name:'carrito',
    layout:'cart',
    mixins:[metaMixin],
    components:{shoppingcart}
}
</script>
