<template>
    <div class="row" v-if="products">
        <div v-for="product in products" :key="product.code"
                    
                 class="col-12 col-lg-4 mt-3" itemscope itemtype="https://schema.org/Product">
            
                <div class="card text-center p-1">

                    <div class="card-img-top relative" @click="show(product)" >
                        <v-lazy-image v-if="product.images[0]" :alt="product.name"
                        :src="imagePath(product.images[0])"   
                        :title="product.name"
                        itemprop="image" />
                        <v-lazy-image v-else :src="noImage" 
                             alt="no hay foto" />
                         <span class="badge bg-focus white-bold " v-show="product.offer"> Oferta! </span>
                    </div>

                   

                    <div class="card-body p-0">
                        <h5 style="height:40px" class="card-title font-weight-bold" itemprop="name" v-if="product"> 
                            {{product.name | ucFirst}}
                        </h5>
                        <h5 v-if="config && !config.hide_prices" class="card-subtitle">${{product.price |price}}</h5>
                     
                        <nuxt-link :to="getSlug(product)" class="btn btn-outline-focus mt-2" itemprop="url">Ver mas</nuxt-link>
                        <div class="p-3">
                            <shopButton class="mt-4" :product="product"></shopButton>
                        </div>
                    </div>

                </div>
        </div>   
        
         <carousel v-if="carouselProduct && showCarousel" ref="modal" :product="carouselProduct" @close="showCarousel=false"></carousel>
    </div>
</template>

<script>
 import carousel from '@/components/category/product/img-modal.vue';
 import shopButton from '@/components/category/product/shop-button.vue';
 
export default {
    components:{carousel,shopButton},
    props:['products'],
    data(){
        return {
            carouselProduct : null,
            showCarousel:false
        }
    },
    methods:{ 
         getSlug(product){
            return this.$store.getters.getProductSlug(product);
        },
        show(product){
            if(process.browser){

                    if (product.images[0]){
                        this.carouselProduct = product;
                        this.showCarousel = true;
                    }
                    else
                    { <div class="overlayed-badge" v-if="product.offer">
                       
                    </div>
                        var content = document.createElement("img");
                        content.setAttribute('src',this.noImage);
                        content.style.width = '100%';
                        swal({content : content});
                    }
            }
    }
    }
    
  
}
</script>

<style lang="scss" scoped>
    a{
        &:hover{
            text-decoration: none;
            color: inherit;
        }
    }
    img:hover{
        cursor: pointer;
    }
   .card-title,.card-subtitle{
       text-align: center;

   }

   .badge{
       position:absolute;
       top:15px;
       left:15px;
       margin-right: 80%;
       margin-top:2%;
       padding: 5px;
       font-size: 1.5rem;
   }
</style>

