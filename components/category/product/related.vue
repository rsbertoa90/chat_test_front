
<template>
<div class="container w-100" v-if="products.length > 0" >
  <hr>
  <h2 class="mb-4">Productos relacionados</h2>
      <!-- swiper -->
      <swiper :options="swiperOption" v-if="render">
        <swiper-slide  v-for="product in products" :key="product.id">
            <router-link :to="getSlug(product)" class="card" itemscope itemtype="https://schema.org/Product">
                <div>
                  <v-lazy-image v-if ="product.images[0]" class="card-img card-img-top" 
                        :src="imagePath(product.images[0])"
                        :title="product.name"
                        itemprop="image" 
                        alt="Card image cap" />
                  <v-lazy-image v-else :src="noImage" alt="no image" />
                    <div v-if="product.offer" class="card-img-overlay">
                      <span v-if="product.offer" class=" badge bg-focus white-bold"> Oferta! </span>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title" itemprop="name" style="height:60px"> {{product.name | ucFirst}}  </h5>
                    <h4 v-if="!$store.getters.getConfig.hide_prices" class="second">  
                      ${{product.price | price}} 
                      <strike style="font-size:1rem"  v-if="product.offer && !$store.getters.getConfig.hide_prices" class="text-secondary"> ${{product.price * 1.67 | price}}</strike> 
                    </h4>
                   
                    <router-link :to="getSlug(product)" style="cursor:pointer" class="btn btn-outline-second  white-bold mb-4 mt-1"> Ver mas</router-link>
                    <shop-button :product="product"></shop-button>
                    <p></p>
                </div>
            </router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
  
</div>
</template>

<script>
import shopButton from './shop-button.vue';
  export default {
    props:['category_id'],
    components:{shopButton},
    data() {
      return {
        render:false,
        swiperOption: {
          slidesPerView: null,
          centeredSlides: false,
          spaceBetween: 5,
          /* pagination: {
            el: '.swiper-pagination',
            clickable: true
          }, */
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        
      }
    },
    created(){
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
        return this.$store.getters.getCategories;
      },
        category(){
            if(this.categories)
            {
              return this.categories.find(c=>{
                return c.id == this.category_id;
              })
            }
        },
        products(){
            return this.category.products;
        }
    },
     
    methods: {
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
</style>