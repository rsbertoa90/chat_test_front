<template>
    <div class="row" v-if="products">
        <div v-for="product in products" :key="product.id"
                 class="col-12 mt-3 row" itemscope itemtype="https://schema.org/Product">
                <hr>
                <div @click="show(product)"
                     class="card col-12 col-lg-4">
                    <v-lazy-image v-if="product.images[0]" class="card-img-top" :alt="product.name"
                    :src="imagePath(product.images[0])" 
                    :title="product.name"
                    itemprop="image" />
                    <v-lazy-image v-else :src="noImage" 
                        class="card-img-top" alt="no hay foto" />
                    <div class="card-img-overlay" v-if="product.offer">
                        <span class="badge bg-focus white-bold "> Oferta! </span>
                    </div>
                </div>
                <div class="col-12 col-lg-8 d-flex flex-column justify-content-around align-items-between" itemprop="offer">
                        <div class="h-25 p-2 d-flex flex-column justify-content-between">
                            <h5 itemprop="name" clasS="font-weight-bold">{{product.name | ucFirst}}</h5>
                            <h5 v-if="config && !config.hide_prices" itemprop="price">${{product.price}}</h5>

                        </div>
                        <div itemprop="description" class="h-50 d-flex align-items-end ml-2">
                            <p> {{product.description}} </p>
                        </div>
                        <div class="h-25">
                            <div class="col-4 d-flex align-items-base">
                                <nuxt-link itemprop="url" :to="getSlug(product)" class="btn btn-outline-focus">Ver mas</nuxt-link>
                                <shop-button :product="product"></shop-button>
                            </div>
                        </div>
                
                </div>
                <hr>
        </div>   
         <carousel v-if="carouselProduct" ref="modal" :product ="carouselProduct"></carousel>
    </div>
</template>

<script>
import shopButton from './product/shop-button.vue';
 import carousel from './product/Img-modal.vue';
export default {
    components:{carousel,shopButton},
    props:['products'],
    data(){
        return {
            carouselProduct : null
        }
    },
    methods:{
          getSlug(product){
            let cat = this.categories.find(c => {
                return product.category_id == c.id;
            } );

            let res = cat.slug + '/' + product.slug;
            res =res.replace('//','/');
            return res;
        },
             show(product){
                if (product.images[0]){
                    this.carouselProduct = product;
                    this.showCarousel = true;
    
                   setTimeout(() => {
                        
                        let element = this.$refs.modal.$el;
                      
                        $(element).modal('show');
                    }, 100);
                }
                else
                {
                    var content = document.createElement("img");
                    $(content).attr('src',this.noImage);
                    content.style.width = '100%';
                    swal({content : content});
                }
            }
    },
        computed : {
            categories(){return this.$store.getters.getCategories; },
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
   }
</style>

