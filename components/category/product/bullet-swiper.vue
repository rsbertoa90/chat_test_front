<template>
  
    <div v-if="images &&  images.length>0" class="relative">
      <!-- swiper -->
       <div class="counter" v-if="slides>1"> {{current}}/{{slides}} </div>
      <swiper ref="swiper"  :options="swiperOption" class="d-flex justify-content-center text-center">
       
        <swiper-slide v-for="image in images" :key="image.url">
            <v-lazy-image :src="imagePath(image)" :alt="alt"></v-lazy-image>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

</template>

<script>
  export default {
    
      props:['images','alt'],
      methods:{
        setCurrent(){
           if(this.$refs && this.$refs.swiper){
           
              this.current= this.$refs.swiper.$el.swiper.activeIndex+1;

          }
        }
      },
      computed:{
        slides(){
          return this.images.length;
        },
      },
    data() {
      return {
          touch:0,
        current:1,
        swiperOption: {
          
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
          }
        }
      }
    },
    mounted(){
      var vm=this;
      setTimeout(() => {
        this.$refs.swiper.$el.swiper.on('slideChange', function () {
         vm.setCurrent();
        });
      }, 300);
    }
  }
</script>

<style scoped lang="scss">
.initial{
    position:initial;
}
.relative{
  position:relative;
}
    .counter{
     display: flex;
     justify-content: center;
      background-color: #fff;
      border:1px solid #DB1B73;
      border-radius:10px;
      position:absolute;
      top:20px;
      right:0px;
      font-size:15px;
      color:#707070;
      z-index: 20;
      width:40px;

    }
</style>