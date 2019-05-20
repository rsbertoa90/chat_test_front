<template>
    <productsAdmin></productsAdmin>
</template>

<script>
import productsAdmin from '@/components/admin/products/Admin.vue';
export default {
    name:'admin',
    components:{productsAdmin},
    middleware:'checkAdmin'
}
</script>
