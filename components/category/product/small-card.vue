<template>
    <div @mouseenter="hovered=true" @mouseleave="hovered=false" class="ml-lg-2 d-flex flex-column align-items-center product-card  justify-content-between h-100" v-if="product">
        <nuxt-link :to="productUrl">
            <h2 class="text-center title">{{product.name | uc}}</h2>
        </nuxt-link>
        <div class="d-flex w-100 flex-column">
            
            <div class="image-container" @click="show">
                <v-lazy-image :src="imagePath(image.url)" :alt="product.name"></v-lazy-image>
                <div class="offer-ribbon" :class="{'hovered-ribbon':hovered}" v-if="product.offer && config && !config.maintenance">
                    <v-lazy-image :src="imagePath('/storage/images/app/oferta.png')" alt="oferta"></v-lazy-image>
                </div>
            </div>
            
            <div class="prices-container" v-if="config && !config.maintenance">
                 
                 

                <div class="price" v-if="product.price > 0 && product.price != product.pck_price">
                    <div class="price-bg">
                        ${{product.price | price}} C/U
                    </div>
                 
                    <span class="min-sign" > Menos de {{product.pck_units}} unidades </span>
                </div>
               
                <div class="pck_price" >
                    <div class="price-bg">
                        ${{product.pck_price | price}} C/U
                    </div>
                    <span class="min-sign" v-if="product.price==0 && product.pck_units > 1" > Mínimo {{product.pck_units}} unidades </span>
                    <span class="min-sign" v-if="product.pck_price < product.price && product.pck_units > 1" > Más de {{product.pck_units}} unidades </span>
                </div>

                

            </div>
        </div>
       <div class="shop-button-container" v-if="config && !config.maintenance">
         <shop-button :product="product" ></shop-button>
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
        product:Object,
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
            hovered:false,
            showModal : false,
            index:0
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

.min-sign{
    font-size: .85rem;
    padding:7px;
    text-align:center;
    white-space:normal;
    display:flex;
    justify-content: center;
    
}
a:hover{
    color:#000;
}
.price,.pck_price{
    text-align:center
}

    .shop-button-container{
        margin-top:5px;
        width:100%;
    }
    .title{
        display: flex;
        align-items:center;
        min-height: 50px;
        font-size:1.5rem;
        height: 90px;
    }

    .product-card{
        width:100%;
        padding:10px;  
        height:100%;
       /*  border:1px solid #868686; */
       
    }

    .image-container{
        width:100%;
        overflow: hidden;
        cursor:pointer;
        position:relative;
        .offer-ribbon{
            width:100px;
            position:absolute;
            top:0;
            left:0;
             display: block;
            transform: rotate(-23deg);
            transition:width 1s;
        }
        .hovered-ribbon{
            width:120px;
            transition:width 1s;
        }
      /*  padding:10px;
       border:1px solid #868686; */
        img{
            width: 100%;
        }
    }

    .prices-container{
        padding:10px;
        width:100%;
        display: flex;
        justify-content: center;
        .price-bg{
            margin:5px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            width: 100%;
            padding: 10px 3px ;
            background-color: #D52B1E;
            color: #fff;
            text-align: center;
            justify-content: center;
            font-weight: bold;
            border-radius: 5%;
            font-size: .90rem;
            
              border-left:2px solid #fff;
            border-right:2px solid #fff;
        }

        
    }

</style>
