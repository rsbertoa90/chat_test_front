<template>
    <adminprods></adminprods>
</template>

<script>
import checkadmin from '@/middleware/checkAdmin.js'
import adminprods from '@/components/admin/Admin.vue' 
export default {
    middleware:[checkadmin],
    components:{adminprods},
    name:'adminproducts',
    layout:'admin'
}
</script>
