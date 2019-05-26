<template>
    <div>
        <wideProduct v-if="$mq == 'lg'" :product="product"></wideProduct>
        <mobileProduct v-if="$mq!='lg'" :product="product"></mobileProduct>
    </div>
</template>

<script>
import metamixin from '@/plugins/metadataMixin.js';
import wideProduct from '@/components/product/Wide.vue';
import mobileProduct from '@/components/product/Mobile.vue';
export default {
  mixins:[metamixin],
  name:'producto',
  components:{wideProduct,mobileProduct},
    computed:{
          product()
        {
            let res = null;
            this.categories.forEach(c=>{
               let prod  = c.products.find(p => {
                   let slug = '/'+p.slug;
                    slug =slug.replace('//','/');
                    let param = '/' + this.$route.params.product;
                    param =param.replace('//','/');
                    return slug == param;
               });
               if(prod){
                   res = prod;
                    return res;
               }
            });
             return res;
        },
    }
}
</script>

<style lang="scss" scoped>

</style>
