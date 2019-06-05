<template>
        <supercom></supercom>
</template>

<script>
import checkadmin from '@/middleware/checkAdmin.js'
import supercom from '@/components/admin/super/Super.vue';
export default {
    components:{supercom},
    middleware:[checkadmin],
    name:"metadata",
      layout:'admin'
}
</script>

