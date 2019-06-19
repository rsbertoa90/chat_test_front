<template>

    <div class="w-100" >                        
     
         <nuxt-link :to="productSlug()">
            <v-lazy-image v-if="product.images[0]"   :src="imagePath(product.images[0])" :alt="product.name"/> 
     
     
            
            <v-lazy-image v-else   :src="noImage" alt="Sin imagen" /> 
      
        
         </nuxt-link>   
        <div style="margin-top:-16px; margin-left:10px;" class="prices">      
            <br>
            <span v-if="product.price>0" style="width:73px ; height:60px; font-size: 1.2rem ; color:blue ; display:inline "> $ {{product.price.toFixed(2)}} </span>
            <span v-if="product.pck_units >1 && product.price > 0"> / </span>            
            <span v-if="product.pck_units>1" style="width:73px ; height:60px;font-size: 1.25rem ; color:green ; display:inline ;"> ${{product.pck_price.toFixed(2)}}</span>        
        </div>
        <div>
            <shop-button :product="product"></shop-button>
        </div>
    
        <span style='font-size: 1rem; font-weight:bold; display:inline; line-height:normal'>
            Cod: {{product.code}} - {{product.name}}  
        </span>  <br>
        <span v-if="product.pck_units>1" style="font-size: .85rem; display:inline; color:green;">
            Precio especial a partir de {{product.pck_units}} unidades
        </span>
    
</div>


</template>


<script>
import shopButton from './product/shop-button.vue';
export default {
    components:{shopButton},
    props:['product'],
    computed:{
        category(){
            let cats = this.$store.getters.getCategories;
            if (cats){
                return cats.find(c => {
                    return c.id == this.product.category_id;
                });
            }
        }
    },
    methods: {
         productSlug(){
           
           let res =  this.category.slug.toLowerCase().trim() + '/' + this.product.slug.toLowerCase().trim();
            res.replace('//','/');
            return res;
       }
    },

}
</script>

<style scoped>
    
    img{width:100%}
</style>
