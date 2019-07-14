<template>
    <adminProducts></adminProducts>
</template>

<script>
import adminProducts from '@/components/admin/Admin.vue';
export default {
    layout:'admin',
    middleware:'checkAdmin',
    components:{adminProducts},
    name:'adminProductos',
    beforeDestroy()
    {
        this.$store.dispatch('fetchCategories');
    }
}
</script>
