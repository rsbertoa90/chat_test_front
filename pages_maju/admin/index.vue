<template>
    <orders></orders>
</template>

<script>
import checkAdmin from '@/middleware/checkAdmin.js';
import orders from '@/components/admin/Orders.vue';
export default {
    middleware:[checkAdmin],
    components:{orders},
    layout:'admin',
     name:'adminOrders'
   
}
</script>
