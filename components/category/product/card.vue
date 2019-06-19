<template>
    <div @mouseenter="hovered=true" @mouseleave="hovered=false" class="d-flex flex-column align-items-center product-card  justify-content-between " v-if="product">
        <nuxt-link :to="productUrl">
            <h2 v-if="!hideHead" class="text-center title">{{product.name | uc}}</h2>
        </nuxt-link>
        <div class="d-flex w-100">
            
                <div class="image-container" @click="show">
                    <v-lazy-image :src="imagePath(image.url)" :alt="product.name"></v-lazy-image>
                     <div class="offer-ribbon" :class="{'hovered-ribbon':hovered}" v-if="product.offer">
                        <v-lazy-image :src="imagePath('/storage/images/app/oferta.png')" alt="oferta"></v-lazy-image>
                    </div>
                </div>
            
            <div class="prices-container" v-if="config && !config.maintenance">
                 
                 <div class="pck_price" >
                    <div class="price-bg">
                        ${{product.pck_price | price}} C/U
                    </div>
                    <span class="min-sign" v-if="product.price==0 && product.pck_units > 1" > Mínimo {{product.pck_units}} unidades </span>
                    <span class="min-sign" v-if="product.pck_price < product.price && product.pck_units > 1" > Más de {{product.pck_units}} unidades </span>
                </div>

                <div class="price" v-if="product.price > 0 && product.price != product.pck_price">
                    <div class="price-bg">
                        ${{product.price | price}} C/U
                    </div>
                 
                    <span class="min-sign" > Menos de {{product.pck_units}} unidades </span>
                </div>
               
            </div>
        </div>
       <div class="shop-button-container" v-if="config && !config.maintenance">
         <shop-button :product="product"></shop-button>
       </div>
        <image-modal  @close="closedModal" v-if="this.showModal"
                    :product="product"  ref="modal" ></image-modal>
    </div>    
</template>


<script>
import shopButton from './shop-button.vue';
import imageModal from '../../cotizer/Img-modal.vue';
export default {
   
    props:{
        product: Object,
        hideHead:{
            type:Boolean,
            default:false
        },
        i:{
            Type:Number,
            default:0
        }
        },
    components:{
        shopButton,
        imageModal
    },
    data(){
        return{
             showModal : false,
            index:0,
            hovered:false,
        }
    }, 
    methods:{
        show(){
               this.showModal = true;
             
               /* this.$refs.modal.$forceUpdate(); */
               setTimeout(() => {
                   let element = this.$refs.modal.$el;
                   $(element).modal('show');
               }, 100);
        },
        closedModal(){
                 this.modalProduct = null;
                 this.showModal = false;
                setTimeout(() => {
                    this.showModal=true;
                }, 100);
        },
    },
    computed:{
        productUrl(){
            let cats = this.$store.getters.getCategories;
            let category = cats.find(c => {
                return c.id == this.product.category_id;
            });
           
            let url = category.slug + '/' + this.product.slug;
            url = url.replace('//','/');
            return url;
        },
        
        config(){
            return this.$store.getters.getConfig;
        },
        image(){
        
            if (this.product.images && this.product.images[this.i])
            {
                return this.product.images[this.i];
            } else{
                return {url:'/storage/images/app/no-image.png'}
            }
        }
    }
}
</script>


<style lang="scss" scoped>
 a:hover{
        color:#000;
    }
.min-sign{
    font-size: 1.3rem;
}

.price,.pck_price{
    text-align:center
}

    .shop-button-container{
        display: flex;
        justify-content: flex-start;
        margin-top:15px;
        width:100%;
    }
    .title{
        display: flex;
        align-items:center;
        min-height: 50px;
    }

    .product-card{
        padding:10px;  
        height:100%;
      /*   border:1px solid #868686; */
       
    }

     img{
            width: 100%;
        }



    .image-container{
        cursor: pointer;
        width:55%;
        overflow: hidden;
        position:relative;
        .offer-ribbon{
            width:120px;
             transition:width 1s;
            position:absolute;
            top:0;
            left:0;
             display: block;
            transform: rotate(-23deg);
            
      /*  padding:10px;
       border:1px solid #868686; */
       
    }
    .hovered-ribbon{
                width:150px;
                transition:width 1s;
             }
    }
    .prices-container{
        padding:10px;
        width:45%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .price-bg{
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            width: 100%;
            padding: 15px 10px ;
            background-color: #D52B1E;
            color: #fff;
            text-align: center;
            justify-content: center;
            font-weight: bold;
            border-radius: 5%;
            font-size: 2rem;
           
        }
            
        }

        .price
        {
            .price-bg
            {
               font-size: 1.65rem;
                padding: 10px;
                margin-left:15px;
              
                
            }
        }
    

</style>
