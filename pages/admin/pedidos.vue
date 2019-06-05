<template>
    <orders></orders>
</template>

<script>

import checkadmin from '@/middleware/checkAdmin.js'
import orders from '@/components/admin/Orders.vue';
export default {
    components:{orders},
    middleware:[checkadmin],
      layout:'admin'
}
</script>

