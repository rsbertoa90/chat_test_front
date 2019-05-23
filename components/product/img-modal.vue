<template>
    <div>
        <modal @close="$emit('close')">
            <div v-if="product.images && product.images.length > 1">
                <bulletSwiper :images="product.images"></bulletSwiper>
            </div>
            <div v-else>
                <v-lazy-image :src="imagePath(product.images[0])"></v-lazy-image>
            </div>
        </modal>
    </div>
</template>


<script>
import modal from '../Modal.vue';
import bulletSwiper from './bullet-swiper.vue';
export default {
    components:{modal,bulletSwiper},
    props:['product']
}
</script>


<style lang="scss" scoped>

</style>
