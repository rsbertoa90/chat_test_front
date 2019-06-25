<template>
    <div>
        <modal @close="$emit('close')">
            <div>
                <h4 class="m-auto text-center">{{product.name}}</h4>
                
                <div v-if="product.images && product.images.length > 1">
                    <bulletSwiper :images="product.images"></bulletSwiper>
                </div>

                <div v-else>
                    <v-lazy-image :src="imagePath(product.images[0])" :src-placeholder="noImage"></v-lazy-image>
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

</style>
