<template>
    <div class="overlay" v-if="category">
        <transition appear name='animation'>
            <div class="panel"  :key="category.slug">
                <div class="panel-head">
                    <h1>{{category.name |ucFirst}}</h1>
                    <nuxt-link to="/categorias" class="close-button bordered clickable mb-4">
                        <span class="fa fa-times"></span>
                    </nuxt-link>
                </div>
                <div class="products-container">
                    <div class="product-row mt-4" v-for="product in category.products" :key="product.slug">
                        <nuxt-link :to="productSlug(product)" class="ml-4 name">
                            {{product.name}}
                        </nuxt-link>
                        <div class="d-flex row w-100">
                            <div class="col-3 offset-1 p-0 bordered" @click="show(product)">
                                <v-lazy-image :src="imagePath(product.images[0])" :alt="product.name"></v-lazy-image>
                            </div>
                            <div class="col-5 text-right price">
                                ${{product.price | price}}
                            </div>
                            <div class="shop-button col-3">
                                <shopButton :product="product" :small="true"></shopButton>
                            </div>
                        </div>
                    </div>
                    <div class="bottom-space"></div>
                </div>

            </div>
        </transition>
        <div v-if="showModal">
            <imgModal :product="modalProduct" @close="showModal=false"></imgModal>
        </div>
        <div class="bottom-space"></div>
    </div>
</template>

<script>
import imgModal from '../product/img-modal.vue';
import shopButton from '../product/shop-button.vue';
export default {
    components:{shopButton,imgModal},
    props:['category'],
    data(){
        return{
            appear:false,
            showModal:false,
            modalProduct:null,
        }
    },
    mounted(){
        setTimeout(() => {
            this.appear=true;
        }, 100);
    },
    methods:{
        show(product){
            this.modalProduct = product;
            setTimeout(() => {
                this.showModal=true;
            }, 500);
        }
    }
}
</script>

<style lang="scss" scoped>
.bottom-space{
    width:100vw;
    height: 200px;
}
.close-button{
    position:absolute;
    top:10px;
    right:10px;
    width:56px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color:#fff;
    font-weight: bold;
    background-color: #F2B742;
    z-index:30;
    span{
        font-size: 45px;
    }
}

.animation-enter-active{
    animation: animation 1.5s;
    transition: all .3s;
}

@keyframes animation {
  0% {
    margin-top:100vh;
  }
  /* 50% {
    top:50vh;
    right:100px;
  } */
  100% {
    margin-top:0;

 
  }
}


h1{
    font-size: 23px;
    margin-left:10px;
    max-width: 80%;
    white-space: normal;
}
.name{
    font-size: 22px;
    
}
.img-container{
    width: 76px;
}
.price{
    font-size: 30px;
    font-weight: bold;
}
.overlay{
    background-color: #9F9F9F55;
    height: 100vh;
    width:100vw;
    position:fixed;
    top:0;
    left:0;
    z-index:10;
}

.panel{
    z-index:10;
    /* display:flex; */
    position:absolute;
    top:60px;
    left:0;
    width:100%;
    .panel-head{
        color:#fff;
        background-color: #DB1B73;
        height:60px;
        border-radius:15px 15px 0 0 ;
        position:absolute;
        top:0;
        left:0;
        font-size: 23px;
        justify-content: flex-start;
        align-items: flex-end;
        display: flex;
    }
    .products-container{
        background-color: #DCDCDC;
        position:absolute;
        left:0;
        top:51px;
        height: 80vh;
        width:100%;
        overflow-y:scroll;
        overflow-x:hidden;
        .product-row{
            display:flex;
            flex-direction: column;
        }
    }
}
</style>

