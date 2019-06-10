<template>
    <productpage></productpage>
</template>



<script>
import productpage from '@/components/category/product/Product.vue';
export default {
    
    components:{productpage},
    name:'producto',
    head() {
        return {
            titleTemplate: this.metatitle,
            meta: [
                { name: 'description', content: this.metadescription }

            ]
        }
    },

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
