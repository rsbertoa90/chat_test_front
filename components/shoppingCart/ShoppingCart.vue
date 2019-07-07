<template>
    <div>
        <div>
            <cotizer-form ></cotizer-form>
        </div>
        <div v-if="list && list.length > 0">
            <pedido ></pedido>
        </div>
        <div v-if="total" class="mt-3">
            <span class="total fucsia">TOTAL: ${{total |price}}</span>
        </div>
    </div>
</template>


<script>
 import pedido from './pedido.vue';
 import cotizerForm from './Cotizer-form.vue'

import metadataMixin from '../metadataMixin.js';
 import { mapActions } from 'vuex';
 import { mapGetters } from 'vuex';
export default {
    name:'carrito',
    mixins:[metadataMixin],
        components : {pedido,cotizerForm},
    computed:{
        list(){
            return this.$store.getters.getList;
        },
        total(){
            return this.$store.getters.getTotal;
        }
    }
}
</script>


<style lang="scss" scoped>
    .total{
        font-size:35px;
    }
</style>
