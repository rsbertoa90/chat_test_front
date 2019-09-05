<template>
    <adminSearchs></adminSearchs>
</template>

<script>
import adminSearchs from '@/components/admin/estadisticas/Estadisticas.vue';
export default {
    layout:'admin',
    middleware:'checkAdmin',
    components:{adminSearchs},
     name:'adminsearches'
}
</script>
