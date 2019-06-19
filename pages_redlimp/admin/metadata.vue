<template>
        <supercom></supercom>
</template>

<script>
import checkadmin from '@/middleware/checkAdmin.js'
import supercom from '@/components/admin/super/Super.vue';
export default {
        head() {
    return {
      titleTemplate: 'ADMIN',      
    }
  },
    components:{supercom},
    middleware:[checkadmin],
    name:"metadata",
      layout:'admin'
}
</script>

