<template>
    <div v-if="offers && offers[selected]" class="slider-container">
         <no-ssr>

            <div class="overflow-hidden">
                    <transition leave-active-class="position-absolute animated slideOutRight">
                            <offerCard v-if="$mq=='lg'" :product="offers[selected]" :key="offers[selected].name" class="bg-white"></offerCard>
                            <small-card v-else :product="offers[selected]" :key="offers[selected].name" class="bg-white"></small-card>
                    </transition>
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
     
            selected: 0,
        }
    },
    methods:{
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
            setInterval(()=>{
                this.selected++
    
            },5000);
        }
    },
    watch:{
        selected()
        {
            if(process.browser){

                if (this.selected < 0){this.selected = this.offers.length-1;}
                else if (this.selected >= this.offers.length){this.selected=0;}
            }
            
        }
    },
  
}
</script>


<style lang="scss" scoped>
img{
    width:100%;
   
}
.slideOutRight{
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
