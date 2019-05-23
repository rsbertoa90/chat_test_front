<template>
    <div v-if="product">
        <div class="row vw100">
            <div class="col-12 initial">
                <div v-if="product.images && product.images.length > 1">
                    <no-ssr>
                        <bulletSwipper :images="product.images" :alt="product.name"></bulletSwipper>
                    </no-ssr>
                </div>
                <div v-else>
                    <v-lazy-image :src="imagePath(product.images[0])" :alt="product.name"></v-lazy-image>
                </div>
            </div>
        </div>
        <div class="row vw100 p-2 mt-4">
            <div class="col-7 mt-2 d-flex flex-column">
                <h1>{{product.name}}</h1>
                <div class="mt-4">
                    <info></info>
                </div>
            </div>
            <div class="col-5 text-right d-flex flex-column">
                <span class="price">
                    ${{product.price|price}} 
                </span>
                <div class="mt-4 pl-2">
                    <shop-button :product="product" ></shop-button>
                </div> 
            </div>
        </div>
        <div class="row vw100 mt-4">
            <relatedProducts :products="related"></relatedProducts>
        </div>
          
    </div>
</template>

<script>
import info from '@/components/info/Info.vue';
import shopButton from '@/components/product/shop-button.vue';
import metamixin from '@/plugins/metadataMixin.js';
import relatedProducts from '@/components/product/related-mobile.vue';
import bulletSwipper from './bullet-swiper.vue';
export default {
    mixins:[metamixin],
    components:{shopButton,info,relatedProducts,bulletSwipper},
    name:'categoria',
     props:['product'],
    data(){
        return{
            i:0,
            frontImage:null
        }
    },
    mounted(){
        this.frontImage = this.product.images[0];
    },
    methods:{
        changeFrontImage(img)
        {
            setTimeout(() => {
                
                this.frontImage = img;
            }, 100);
        }
    },
    computed:{
        
        sideImages(){
            if(this.product){
                if(this.product.images[1] && this.frontImage){
                    return this.product.images.filter(i => {
                        return this.frontImage.id != i.id;
                    });
                }
            }
        },
      
        related()
        {
            let cat = this.categories.find(c => {
                return c.id == this.product.category_id;
            });
            
            return cat.products.filter(p => {
                return p.id != this.product.id;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.initial{
    position:initial;
}
.shop-button{
    width:100%;
}
.p-30{
    padding:30px;
  
}

.price{
    font-size: 30px;
    font-weight: bold;
}

h1{
    font-size:25px;
    font-weight: bold;
}
.miniature{
    width:100%;
    max-width:104px;
    cursor: pointer;     
    position: initial;               
}
    .image-container{
        position: initial;
        padding:38px 20px 28px 20px;
    }

    .col-7,.col-2{
        position:initial;
    }
</style>
