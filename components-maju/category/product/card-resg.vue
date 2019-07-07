<template>
    <div class="d-flex flex-column align-items-center product-card  justify-content-between h-100" v-if="product">
        <h2 class="text-center title">{{product.name | uc}}</h2>
        <nuxt-link :to="productUrl">
            <div class="image-container">
                <v-lazy-image :src="imagePath(image.url)"></v-lazy-image>
                <div class="price-badge" v-if="config && !config.hide_prices">
                    <v-lazy-image :src="imagePath('/storage/images/app/price-badge.png')"></v-lazy-image>
                    <span class="price">${{product.price|price}}</span>
                </div>
            </div>
        </nuxt-link>
         <shop-button :product="product"></shop-button>
    </div>    
</template>


<script>
import shopButton from './shop-button.vue';
export default {
    props:['product'],
    components:{
        shopButton
    },
    data(){
        return{
            index:0
        }
    },
    computed:{
        productUrl(){
            let cats = this.$store.getters.getCategories;
            let category = cats.find(c => {
                return c.id == this.product.category_id;
            });
           console.log(this.product);
            let url = category.slug + '/' + this.product.slug;
            url = url.replace('//','/');
            return url;
        },
        
        config(){
            return this.$store.getters.getConfig;
        },
        image(){
        
            if (this.product.images && this.product.images[this.index])
            {
                return this.product.images[this.index];
            } else{
                return {url:'/storage/images/app/no-image.png'}
            }
        }
    }
}
</script>


<style lang="scss" scoped>

    .title{
        display: flex;
        align-items:center;
        min-height: 90px;
    }

    .product-card{
        height: 100%;
       
    }

    .image-container{
        width:280px;
        overflow: hidden;
        position: relative;
        img{
            width: 100%;
        }
        .price-badge{
            position:absolute;
            top:0;
            right:0;
            .price{
                position:absolute;
                top:30%;
                left:25%;
                color:#fff;
            }
        }
    }

</style>
