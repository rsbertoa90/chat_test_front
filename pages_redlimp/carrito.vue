<template>
    <div>
        <cart></cart>
    </div>
</template>

<script>
import cart from '@/components/shoppingCart/ShoppingCart.vue';
import metaMixin from '@/plugins/metadataMixin.js';
export default {
    mixins:[metaMixin],
    components:{cart},
    name:'carrito',
    layout:'cart'
}
</script>
