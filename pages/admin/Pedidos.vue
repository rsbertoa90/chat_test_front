<template>
    <Orders></Orders>
</template>

<script>
import Orders from '@/components/admin/Orders/Orders.vue';
export default {
    name:'pedidos',
    middleware:'checkAdmin',
    components:{Orders},
    layout:'admin'
}
</script>
