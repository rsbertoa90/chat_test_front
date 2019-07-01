<template>
    <div>
        <modal @close="$emit('close')">
            <div>
                <h4 class="m-auto text-center">{{product.name}}</h4>
                <div class="relative">
                    <div class="unit-price" v-if="product.unit_price">
                        ${{product.unit_price}} C/U
                    </div>
                    <div v-if="product.images && product.images.length > 1">
                        <bulletSwiper :images="product.images"></bulletSwiper>
                    </div>

                    <div v-else class="relative">
                        <a   @click="downloadImage(product.images[0])" class="downloadImage"> <fa-icon icon="download"></fa-icon> Descargar </a>
                        <v-lazy-image :src="imagePath(product.images[0])" :src-placeholder="loadingImage" ></v-lazy-image>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>


<script>
import modal from '@/components/Modal.vue';
import bulletSwiper from './bullet-swiper.vue';
export default {
    components:{modal,bulletSwiper},
    props:['product']
}
</script>


<style lang="scss" scoped>
.downloadImage{
    position:absolute;
    bottom:0;
    right:0;
    border:1px solid #ccc;
    background-color: #fff;
    padding:5px;
    font-size: 1.1rem;
    color:#555;
    border-radius: 5px;
    box-shadow: 1px 1px 1px #000;
    z-index: 20;
    &:hover{
        color:#D52B1E;
    }
}
.relative{
    position:relative;
}
.unit-price{
    background-color: #fff;
    color:#D52B1E;
    border: 1px solid #D52B1E;
    border-radius:5px;
    width:40%;
    font-size:1rem;
    position:absolute;
    text-align: center;
    top:0;
    right:0;
        box-shadow: 2px 2px 2px #000;
        z-index: 20;
    }   
</style>
