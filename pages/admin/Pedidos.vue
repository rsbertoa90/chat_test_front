<template>
    <Orders></Orders>
</template>

<script>
import Orders from '@/components/admin/Orders/Orders.vue';
export default {
    async fetch({store}){
        await store.dispatch('fetchStates');  
    },
    name:'pedidos',
    middleware:'checkAdmin',
    components:{Orders},
    layout:'admin'
} 
</script>
