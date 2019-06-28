<template>
    <adminConfigs></adminConfigs>
</template>

<script>
import adminConfigs from '@/components/admin/configs/Configs.vue';
export default {
    layout:'admin',
    middleware:'checkAdmin',
    components:{adminConfigs},
     name:'adminconfig'
}
</script>
