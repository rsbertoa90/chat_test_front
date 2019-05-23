<template>
    <div class="row">
        <div class="col-12 text-left">
            <h4>Mas productos de Mates de Fabrica</h4>
            <div class="col-12 row">
                <div class="col-3 prod" v-for="product in products" :key="product.slug"> 
                    <nuxt-link :to="productSlug(product)">
                        <div class="img-container bordered clickable">
                            <v-lazy-image :src="imagePath(product.images[0])"></v-lazy-image>
                        </div>
                    </nuxt-link>
                    <span class="name pl-1">
                        {{product.name}}
                    </span>
                    <div class="d-flex justify-content-around">
                        <span> ${{product.price | price}} </span>
                        <div class="shop-button">
                            <shop-button :product="product" :small="true"></shop-button>
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
.name{
    display: flex;
    margin-top:10px;
}
.shop-button{
    width:81px;
}
.prod{
    margin-top:15px;
}
.prod:nth-child(even){
    margin-top:40px;
}
</style>

