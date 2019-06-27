<template>
    <div v-if="offers && offers[selected]" class="slider-container">
         <no-ssr>

            <div class="overflow-hidden relative" v-touch:tap="touchListener" v-touch:swipe.left="swipeL" v-touch:swipe.right="swipeR">
                    <transition :leave-active-class="`position-absolute animated ${direction}`">
                            <offerCard v-if="$mq=='lg'" :product="offers[selected]" :key="offers[selected].name" class="bg-white"></offerCard>
                            <small-card v-else :product="offers[selected]" :key="offers[selected].name" class="bg-white"></small-card>
                    </transition>
                    <div class="controls" v-if="offers && offers.length > 1 && touched">
                        <span class="arrow-control" @click="swipeL"><fa-icon icon="chevron-left"></fa-icon></span>
                        <span class="arrow-control" @click="swipeR"><fa-icon icon="chevron-right"></fa-icon></span>
                    </div>
            </div>
         </no-ssr>
    </div>
</template>

<script>
import offerCard from '../category/product/card.vue';
import smallCard from '../category/product/small-card.vue';

export default {
    components:{offerCard,smallCard},
    data(){
        return{
            interval:null,
            selected: 0,
            touched:false,
            direction:'slideOutRight'
        }
    },
    methods:{
        swipeL(){
           // console.log('swipel')
            this.direction='slideOutLeft';
            if (!this.touched)
            {
                this.touchListener();
            }
                this.selected--;
        },
        swipeR(){
            this.direction='slideOutRight';
            //console.log('swiper')
              if (!this.touched)
            {
                this.touchListener();
            }
                this.selected++;
        },
        touchListener(){
           // console.log('touch')
            if(!this.touched){
                this.touched=true;
               clearInterval(this.interval);
               this.interval=null;
            }

        },
        getSlug(product)
        {
            return this.$store.getters.getProductSlug(product);
        }
    },
    computed:{
        offers(){
            return this.$store.getters.getOffers;
        }
    },
    mounted(){
        if(process.browser){
            this.interval = setInterval(()=>{
                this.selected++
    
            },5000);
        }
    },
    watch:{
        selected()
        {
            if(process.browser){
            console.log(this.selected);

                if (this.selected < 0){this.selected = this.offers.length-1;}
                else if (this.selected >= this.offers.length){this.selected=0;}
            }
            
        }
    },
  
}
</script>


<style lang="scss" scoped>
.relative{
    position:relative;
}

.controls{
    position:absolute;
    display: flex;
    justify-content: space-between;
    width:100%;
    top:37%;
    left:0;
    .arrow-control{
        color:#fff;
        cursor: pointer;
        font-size: 2rem;
        width:40px;
        height: 40px;
        display:flex;
        justify-content: center;
        align-items: center;
        border-radius:50%;
        background-color: #666e;
    }
}
img{
    width:100%;
   
}
.slideOutRight, .slideOutLeft{
    z-index: 900;
    margin-top:-10px;
    }

.slider-container{
    background-color: #fff;
    border:1px solid #868686;
    padding:5px;
    position:relative;
   /*  height:470px; */
    overflow: hidden;
}

.overflow-hidden{
    overflow: hidden;
}


a{
  color:#000;
  
}
a:hover {
  text-decoration: none;
  color: #000;
}
</style>
