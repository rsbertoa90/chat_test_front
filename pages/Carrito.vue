<template>
    <div class="container">
        <div v-if="$mq!='lg'">
            <mobileCart></mobileCart>
        </div>
    </div>
</template>


<script>
import mobileCart from '@/components/cart/Mobile.vue';
export default {
async fetch({store}){
    await store.dispatch('fetchStates');  
},
  layout:'cart',
  name:'carrito',
  components:{mobileCart}

}
</script>
