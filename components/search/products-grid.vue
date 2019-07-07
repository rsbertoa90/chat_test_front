<template>
    <div class="row" v-if="products">
        <div v-for="product in products" :key="product.id"
                 class="col-12 col-lg-4 mt-3" itemscope itemtype="https://schema.org/Product">
            
                <div class="card text-center p-1">
                    <v-lazy-image v-if="product.images[0]" class="card-img-top" :alt="product.name"
                    :src="product.images[0].url" 
                    @click="show(product)"
                    :title="product.name"
                    itemprop="image" />
                    <v-lazy-image v-else src="/storage/images/app/no-image.png" 
                        class="card-img-top" alt="no hay foto" />
                    <div class="card-img-overlay" v-if="product.offer">
                        <span class="badge bg-focus white-bold "> Oferta! </span>
                    </div>
                    <div class="card-body p-0">
                        <h5 style="height:40px" class="card-title font-weight-bold" itemprop="name">{{product.name | ucFirst}}</h5>
                        <h5 v-if="config && !config.hide_prices" class="card-subtitle">${{product.price}}</h5>
                      <!--   <p class="card-text"> {{product.description}} </p> -->
                        <nuxt-link :to="getUrl(product)" class="btn btn-outline-focus mt-2" itemprop="url">Ver mas</nuxt-link>
                        <shopButton :product="product"></shopButton>
                    </div>
                </div>
        </div>   
         <carousel v-if="carouselProduct" ref="modal" :product ="carouselProduct"></carousel>
    </div>
</template>

<script>
import shopButton from '../category/product/shop-button.vue';
import carousel from '../cotizer/Img-modal.vue';
export default {
    components:{carousel,shopButton},
    props:['products'],
    data(){
        return {
            carouselProduct : null
        }
    },
    methods:{
        getUrl(product){
            if(this.categories){
                let cat = this.categories.find(c=>{
                    return c.id == product.category_id;
                })
            let slug =  '/'+cat.slug+'/'+product.slug;
            slug = slug.replace('//','/');
            slug = slug.replace('//','/');
            return slug;
            }
        },
         show(product){
                this.carouselProduct = product;
                this.showCarousel = true;

               setTimeout(() => {
                        
                        let element = this.$refs.modal.$el;
                      
                        $(element).modal('show');
                    }, 100);
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

