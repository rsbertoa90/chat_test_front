<template>
    <div class="row" v-if="products">
        <div v-for="product in products" :key="product.id"
                    
                 class="col-12 col-lg-4 mt-3" itemscope itemtype="https://schema.org/Product">
            
                <div class="card text-center p-1">
                    <div class="card-img-top" @click="show(product)" >
                        <v-lazy-image v-if="product.images[0]" :alt="product.name"
                        :src="imagePath(product.images[0].url)" 
                        
                        :title="product.name"
                        itemprop="image" />
                        <v-lazy-image v-else :src="imagePath('/storage/images/app/no-photo.png')" 
                             alt="no hay foto" />
                    </div>
                    <div class="card-img-overlay" v-if="product.offer">
                        <span class="badge bg-focus white-bold "> Oferta! </span>
                    </div>
                    <div class="card-body p-0">
                        <h5 style="height:40px" class="card-title font-weight-bold" itemprop="name" v-if="product">{{product.name | ucFirst}}</h5>
                        <h5 v-if="config && !config.hide_prices" class="card-subtitle">${{product.price |price}}</h5>
                      <!--   <p class="card-text"> {{product.description}} </p> -->
                        <nuxt-link :to="getSlug(product)" class="btn btn-outline-focus mt-2" itemprop="url">Ver mas</nuxt-link>
                        <nuxt-link to="/cotizador" class="btn btn-outline-success mt-2"> <span class="fa fa-shopping-cart"></span> Hacer un pedido</nuxt-link>
                    </div>
                </div>
        </div>   
         <carousel v-if="carouselProduct && showCarousel" ref="modal" :product="carouselProduct" @close="showCarousel=false"></carousel>
    </div>
</template>

<script>
 import carousel from '@/components/category/product/img-modal.vue';
export default {
    components:{carousel},
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
                    {
                        var content = document.createElement("img");
                        content.setAttribute('src',this.imagePath('/storage/images/app/no-photo.png'));
                        content.style.width = '100%';
                        swal({content : content});
                    }
            }
    }
    }
    ,
  
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
       margin-right: 80%;
       margin-top:2%;
       padding: 5px;
   }
</style>

