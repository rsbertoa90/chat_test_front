<template>
    <div class="row" v-if="products">
        <div v-for="product in products" :key="product.id"
                 class="col-12 col-lg-4 mt-3" itemscope itemtype="https://schema.org/Product">
            
                <div class="card text-center p-1">
                    <div class="card-img-top" @click="show(product)" >
                        <v-lazy-image v-if="product.images[0]" :alt="product.name"
                        :src="imagePath(product.images[0])" 
                        
                        :title="product.name"
                        itemprop="image" />
                        <v-lazy-image v-else :src="noImage" 
                             alt="no hay foto" />
                    </div>
                    <div @click="show(product)" class="card-img-overlay" v-if="product.offer">
                        <span class="badge bg-focus white-bold "> Oferta! </span>
                    </div>
                    <div class="card-body p-0" itemprop="offer">
                        <h5 style="height:40px" class="card-title font-weight-bold" itemprop="name">{{product.name | ucFirst}}</h5>
                        <h5 v-if="config && !config.hide_prices" class="card-subtitle" itemprop="price">${{product.price}}</h5>
                      <!--   <p class="card-text"> {{product.description}} </p> -->
                        <nuxt-link :to="getSlug(product)" class="btn btn-outline-focus mt-2" itemprop="url">Ver mas</nuxt-link>
                        <shop-button :product="product"></shop-button>
                    </div>
                </div>
        </div>   
         <carousel v-if="carouselProduct" ref="modal" :product ="carouselProduct"></carousel>
    </div>
</template>

<script>
import shopButton from './product/shop-button.vue';
 import carousel from '@/components/category/product/Img-modal.vue';
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
                    $(content).attr('src',this.imagePath('/storage/images/app/no-photo.png'));
                    content.style.width = '100%';
                    swal({content : content});
                }
            }
    }
    ,
    computed : {
            categories(){
                return this.$store.getters.getCategories;   
            },
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

    .card-img-overlay{
    max-height: 60%;
  }


</style>

