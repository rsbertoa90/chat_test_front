<template>
    <productpage></productpage>
</template>



<script>
import productpage from '@/components/category/product/Product.vue';
export default {
    layout:'categories',
    components:{productpage},
    name:'producto',

    head() {
          let canonical =this.backendpath+this.$route.path;
       // console.log(canonical);
        return {
             link:[
                {rel:'canonical',href:canonical}
            ],
            titleTemplate: this.metatitle,
            meta: [
                { name: 'description', content: this.metadescription, hid:'description' }

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
