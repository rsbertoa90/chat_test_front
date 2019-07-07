<template>
    <div class="row">
       
            <div class="col-4 mt-2" v-for="p in products" :key="p.code">
                <productCard class="border-grey" :product="p"></productCard>
            </div>
       
    </div>
</template>

<script>
import productCard from '../../category/product/small-card.vue';
export default {
    components:{productCard},
    props:['products'],
    computed:{
        user(){
            return this.$store.getters.getUser;
        },
    },
    methods:{
         show(product){
             this.$emit('show',product);
               
        },
    }
}
</script>


<style lang="scss" scoped>
 
  

</style>
