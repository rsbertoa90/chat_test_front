
<template>
<div class="container m-auto pr-4" v-if="offers.length > 0" >
  <hr>
  <h2 class="mb-4">Ofertas de Mates Fabi</h2>
      <!-- swiper -->
      <swiper :options="swiperOption" v-if="render">
        <swiper-slide  v-for="product in notpausedoffers" :key="product.id" 
                       class="slide-container">
            <div class="card slide" itemscope itemtype="https://schema.org/Product" >
              <div class="image-container" @click="show(product)">
                <v-lazy-image v-if="product.images[0]" class="card-img card-img-top" 
                      :src="imagePath(product.images[0])"
                      :title="product.name"
                      itemprop="image" 
                      alt="Card image cap" />
                  <v-lazy-image v-else :src="noImage" :src-placeholder="loadingImage" alt="no image" />
              </div>
                  <div class="card-img-overlay">
                    <span v-if="product.offer" class=" badge bg-focus white-bold"> Oferta! </span>
                  </div>
                <div class="card-body">
                    <h5 class="card-title" itemprop="name"> {{product.name | ucFirst}}  </h5>
                    <h4 v-if="config && !config.hide_prices" class="second">  
                      ${{product.price | price}} 
                      <strike style="font-size:1rem" v-if="product.offer && $store && !$store.getters.getConfig.hide_prices" class="text-secondary"> ${{product.price * 1.67 | price}}</strike> 
                    </h4>
                   <!--  <p style="height:45px" class="card-text crop-text" itemprop="description"> {{product.description}}</p> -->
                    <nuxt-link :to="getSlug(product)" class="btn btn-outline-second"> Ver mas</nuxt-link>
                    <shopButton class="mt-1" :product="product"></shopButton>
                </div>
            </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    <imgModal :product="carouselProduct" v-if="showCarousel && carouselProduct" @close="showCarousel=false" ref="modal"></imgModal>
</div>
</template>

<script>
import imgModal from '@/components/category/product/Img-modal.vue'
import shopButton from '../category/product/shop-button.vue';
  export default {
    components:{shopButton,imgModal},
    data() {
      return {
        carouselProduct:null,
        showCarousel:false,
        render:false,
        swiperOption: {
          slidesPerView: null,
          centeredSlides: false,
          spaceBetween: 5,
          slidesPerView: 4,

          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        
      }
    },
    mounted(){
      
        if (this.$mq == 'lg')
        {
            this.swiperOption.slidesPerView = 4;
        } else{
            this.swiperOption.slidesPerView = 1.5;
        }
        this.render=true;
    },
    computed:{
      categories(){
        return this.$store.getters['getCategories'];
      },
      config(){
        return this.$store.getters.getConfig;
      },
      offers(){
        
        return this.$store.getters.getOffers;
        },
        notpausedoffers(){
          if (this.offers)
          {
            return this.offers.filter(prod => {
              return !prod.paused;
            });
          }
        }
    },
    methods: {
      show(product){
        console.log('show');
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
        },
       getSlug(product){
            let cat = this.categories.find(c => {
                return product.category_id == c.id;
            } );

            let res = cat.slug + '/' + product.slug;
            res =res.replace('//','/');
            return res;
        },
      appendSlide() {
        this.swiperSlides.push(this.swiperSlides.length + 1)
      },
      prependSlide() {
        this.swiperSlides.unshift(this.swiperSlides[0] - 1)
      },
      popSlide() {
        this.swiperSlides.pop()
      },
      shiftSlide() {
        this.swiperSlides.shift()
      }
    }
  }
</script>

<style scoped>
.image-container{
  cursor: pointer;
}
.card-img-overlay{
  width:50%;
  height: 50px;
}
.card-body{
  text-align: center;
    justify-content: flex-end;
    align-items: center;
    display: flex;
    flex-direction: column;
}

  .badge{
    font-size: 1.2rem;
  }
  .append-buttons {
    text-align: center;
    margin-top: 20px;
  }
  .append-buttons a {
    display: inline-block;
    margin: 0 10px;
  }
  .container{
      width: 100vw;
  }
  .card-img-overlay{
    max-height: 60%;
  }
  .slide{
    /*max-width:260px;*/
    height: 501px;
  }
</style>