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
     metaInfo(){
        return{
            title:this.metatitle,
            meta: [
                { charset: 'utf-8' },
                { vmid: 'description', name: 'description', content: this.metadescription }
            ]
        }
    },
    computed:{

         metatitle(){
            if (this.product )
            {
                
                return this.product.metatitle ? this.product.metatitle : this.product.name+' por mayor'
            }else{return ''}
            
        },
        metadescription(){
            if (this.product){
                if (this.product.metadescription)
                {
                    return this.product.metadescription;
                }
                else if (this.product.description)
                {
                    return this.product.description;
                }
                else return this.product.name+" "+'por mayor';
                    
            }  else{return ''}
            
        },
        
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
