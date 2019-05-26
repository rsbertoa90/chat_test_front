<template>
    <div v-if="category">
        <div class="row w-100">
            <div class="col-12 category-heading row">
                <div class="col-3">
                    <info></info>
                </div>
                <div class="col-9 d-flex justify-content-center align-items-center">
                    <h1>{{category.name}}</h1>
                </div>

            </div>
        </div>
        <div class="row w-100 mt-4">
            <div class="col-12">
                <productsGrid :products="category.products">
                </productsGrid>
            </div>
        </div>
    </div>
</template>

<script>
import productsGrid from '@/components/product/grid.vue';
import info from '../info/Info.vue';
export default {
    components:{productsGrid,info},
    props:['category'],
}
</script>


<style scoped lang="scss">
    .category-heading{
        border:1px solid #9F9F9F;
        border-radius:15px;
        padding:15px;
    }
</style>