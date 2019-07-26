<template>
    <productpage v-if="product"></productpage>
</template>



<script>
import productpage from '@/components/category/product/Product.vue';
export default {
    layout:'categories',
    components:{productpage},
    name:'producto',

    head() {
         let canonical ='https://matesfabi.com'+this.$route.path;
    
        return {
             link:[
                {rel:'canonical',href:canonical}
            ],
            titleTemplate: this.metatitle,
            meta: [
                { name: 'description', content: this.metadescription, hid:'description' },
                  { property:'og:url', content:canonical}
            ]
        }
    },

    computed:{
          product()
        {
            let res = null;
            let param = '/' + this.$route.params.product;
            param =param.replace('//','/');
            this.categories.forEach(c=>{
               let prod  = c.products.find(p => {
                   let slug = '/'+p.slug;
                    slug =slug.replace('//','/');
                    return slug == param;
               });
               if(prod){
                   res = prod;
                    return res;
               }
            });
             if(!res)
               {
                   this.$router.push('/');
               }else{

                   return res;
               }
      
             
        },
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
    }
}
</script>
