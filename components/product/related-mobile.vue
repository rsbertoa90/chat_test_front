<template>
    <div>
        <div class=" text-left">
            <div class="title p-4">

                <h4>Mas productos de Mates de Fabrica</h4>
            </div>
            <div class="pl-4">
                <div class="horizontal-swiper">
                    <div class="prod" v-for="product in products" :key="product.slug"> 
                        <nuxt-link :to="productSlug(product)">
                            <div class="img-container bordered clickable">
                                <v-lazy-image :src="imagePath(product.images[0])"></v-lazy-image>
                            </div>
                        </nuxt-link>
                        <div class="mt-3">

                            <span class="name pl-1">
                                {{product.name}}
                            </span>
                            <div class="d-flex justify-content-around mt-2">
                                <span class="price"> ${{product.price | price}} </span>
                                <div class="shop-button">
                                    <shop-button :product="product" :small="true"></shop-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import shopButton from './shop-button.vue';
export default {
    props:['products'],
    components:{shopButton}
    
}
</script>

<style lang="scss" scoped>
.shop-button{
    display: flex;
    justify-content: center;
    align-items: center;
}
.horizontal-swiper{
    display:flex;
    width:100%;
    overflow-x:scroll;
    overflow-y:hidden;

}
.name{
    display: flex;
    margin-top:10px;
}
.shop-button{
    width:81px;
}
.prod{
    margin-top:15px;
    width:219px;
    min-width: 219px;
    margin-right: 20px;
    .price{
        font-size: 37px;
        color:#000;
    }
    .name{
        font-size: 17px;
        color:#000;
        font-weight: bold;
    }
}
.prod:nth-child(even){
    margin-top:40px;
}
</style>

