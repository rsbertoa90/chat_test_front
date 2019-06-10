<template>
    <orders></orders>
</template>

<script>

import checkadmin from '@/middleware/checkAdmin.js'
import orders from '@/components/admin/Orders.vue';
export default {
    head() {
    return {
      titleTemplate: 'ADMIN',      
    }
  },
    components:{orders},
    middleware:[checkadmin],
    layout:'admin',
    mounted(){
        if (!this.$store.getters.getOrders){
            this.$store.dispatch('fetchOrders');
        }
    }
}
</script>

