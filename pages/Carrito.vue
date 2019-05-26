<template>
    <div class="container">
        <div v-if="total>0">
            <div v-if="$mq!='lg'">
                <mobileCart></mobileCart>
            </div>
            <div v-else>
                <wideCart></wideCart>
            </div>
        </div>
        <div class="v-else">
            <div class="white-bubble">
                <h2>NO HAY PRODUCTOS EN EL CARRITO DE COMPRAS</h2>
            </div>
        </div>
    </div>
</template>


<script>
import mobileCart from '@/components/cart/Mobile.vue';
import wideCart from '@/components/cart/Wide.vue';
import metaMixin from '@/plugins/metadataMixin.js';
export default {
    mixins:[metaMixin],
async fetch({store}){
    await store.dispatch('fetchStates');  
},
  layout:'cart',
  name:'carrito',
  components:{wideCart,mobileCart}

}
</script>

<style lang="scss" scoped>
    .white-bubble{
        width:80vw;
        background-color: #fff;
        border:1px solid #ccc;
        margin-top:50px;
        border-radius:15px;
        display:flex;
        justify-content: center;
        align-items:center;
        padding:20px;
    }
</style>
