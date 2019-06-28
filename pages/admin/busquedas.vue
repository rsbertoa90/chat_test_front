<template>
    <adminSearchs></adminSearchs>
</template>

<script>
import adminSearchs from '@/components/admin/search-statics/Search-statics.vue';
export default {
    layout:'admin',
    middleware:'checkAdmin',
    components:{adminSearchs},
     name:'adminsearches'
}
</script>
