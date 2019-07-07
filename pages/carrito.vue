<template>
    
    <appComponent></appComponent>

</template>

<script>
import appComponent from '@/components/shoppingCart/ShoppingCart.vue';
import metaMixin from '@/plugins/metadataMixin.js';
export default {
    name:'carrito',
    layout:'categories',
    mixins:[metaMixin],
    components:{appComponent}
}
</script>
