<template>
    <div class="row" v-if="products">
        <div v-for="product in products" :key="product.id"
            v-if="!product.paused"
                 class="col-12 mt-3 row" itemscope itemtype="https://schema.org/Product">
                <hr>
                <div @click="show(product)"
                     class="card relative col-12 col-lg-4">
                    <v-lazy-image v-if="product.images[0]" class="card-img-top" :alt="product.name"
                    :src="imagePath(product.images[0])" 
                    :title="product.name"
                    itemprop="image" />
                    <v-lazy-image v-else :src="noImage" 
                        class="card-img-top" alt="no hay foto" />
                    
                    <span v-if="product.offer" class="badge bg-focus white-bold "> Oferta! </span>
                    
                </div>
                <div class="col-12 col-lg-8 d-flex flex-column justify-content-around align-items-between">
                        <div class="h-25 p-2 d-flex flex-column justify-content-between">
                            <h5 v-if="product.name" itemprop="name" clasS="font-weight-bold">{{product.name | ucFirst}}</h5>
                            <h5 v-if="config && !config.hide_prices">${{product.price}}</h5>

                        </div>
                        <div itemprop="description" class="h-50 d-flex align-items-end ml-2">
                            <p> {{product.description}} </p>
                        </div>
                        <div class="h-25">
                            <div class="col-12 row d-flex align-items-base">
                                <nuxt-link itemprop="url" :to="getSlug(product)" class=" col-3 btn btn-outline-focus">Ver mas</nuxt-link>
                                <shopButton :product="product" class="col-3"></shopButton>
                            </div>
                        </div>
                
                </div>
                <hr>
        </div>   
         <carousel v-if="carouselProduct && showCarousel" ref="modal" :product ="carouselProduct" @close="showCarousel=false"></carousel>
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
            showCarousel:false,
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
                    content.setAttribute('src',this.noImage);
                    content.style.width = '100%';
                    swal({content : content});
                }
            }
        }
    },
        computed : {
            config(){
                return this.$store.getters.getConfig;
            }
        },
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
       position:absolute;
       top:15px;
       left:15px;
       font-size: 1.3rem;
   }
</style>

