<template>
    <div v-if="product">
        <div class="row bordered m-0 p-4 mb-4">
            <div class="col-3 p-0 d-flex flex-column justify-content-between align-items-end text-right">
                <div class="title">
                    <h1>
                        {{product.name |ucFirst}}
                    </h1>
                </div>
                <div class="info">
                    <info :product="product"></info>
                </div>
                <div class="d-flex flex-column justify-content-around align-items-end text-right">
                    <div class="price ">
                        ${{product.price}}
                    </div>
                    <div class="shop-button mt-4">
                        <shop-button :product="product"></shop-button>
                    </div>
                </div>
            </div>
            <div class="col-7 p-30">
                <div class="image-container"  v-if="frontImage">
                    <transition enter-active-class="animated fadeIn">
                        <v-lazy-image :src="imagePath(frontImage)" :alt="product.name" :key="frontImage.id"></v-lazy-image>
                    </transition>
                </div>
                <div class="image-container"  v-else>
                        <v-lazy-image :src="noImage" :alt="product.name" ></v-lazy-image>
                </div>
            </div>
            <div class="col-2 row">
                <div class=" miniature d-flex flex-column justify-content flex-start" v-if="sideImages && sideImages.length > 0">
                    <div class=" mt-2" v-for="img in sideImages" :key="img.url" @click="changeFrontImage(img)">
                        <v-lazy-image :src="imagePath(img)" :alt="product.name"></v-lazy-image>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-4 pt-4" v-if="related">
            <relatedProducts  :products="related"></relatedProducts>
        </div>
    </div>
</template>

<script>
import info from '@/components/info/Info.vue';
import shopButton from '@/components/product/shop-button.vue';

import relatedProducts from '@/components/product/related.vue';
export default {
    
    components:{shopButton,info,relatedProducts},
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
