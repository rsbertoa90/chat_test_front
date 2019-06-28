<template>
    <adminStats></adminStats>
</template>

<script>
import adminStats from '@/components/admin/stats/Stats.vue';
export default {
    layout:'admin',
    middleware:'checkAdmin',
    components:{adminStats},
    name:'adminstats'
}
</script>
