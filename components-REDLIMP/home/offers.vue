
<template>
<div class="row" v-if="offers && offers.length > 0" >
  <hr>
  <div class="col-12 text-center">
    <h2 class="mb-4 text-center">OFERTAS DEL MES DE REDLIMP</h2>
  </div>
  <div class="col-12 row  d-flex align-items-stretch">
    <div v-for="product in offers" :key="product.id" class="col-12 col-lg-4 mt-3">
      <div class="card h-100 text-center" style="width: 18rem;">
        <v-lazy-image  v-if="product.images[0]"  class="card-img-top" :src="imagePath(product.images[0])" :alt="product.name" />
        <v-lazy-image  v-else  class="card-img-top" :src="noImage" :alt="product.name" />
        <div class="card-body">
          <h5 class="card-title"> {{product.name}} </h5>
          <p class="card-text"> {{product.description}} </p>
          <nuxt-link :to="getSlug(product)" class="btn btn-primary mt-3"> Ver mas </nuxt-link>
          <shopButton :product="product" class="mt-3"></shopButton>
        </div>
    </div>
    </div>
  </div>
</div>
</template>

<script>
import shopButton from '@/components/category/product/shop-button.vue';
  export default {
    components:{shopButton},
    data() {
      return {
      
       
        
      }
    },
    computed:{
     
        offers(){
            return this.$store.getters['getOffers'];
        }
    },
    methods: {
      getSlug(product){
        return this.$store.getters.getProductSlug(product);
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