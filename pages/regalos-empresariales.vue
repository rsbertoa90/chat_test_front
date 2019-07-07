<template>
    
    <appComponent></appComponent>

</template>

<script>
import appComponent from '@/components/regalos/Regalos.vue';
import metaMixin from '@/plugins/metadataMixin.js';
export default {
    name:'regalos',
    layout:'categories',
    mixins:[metaMixin],
    components:{appComponent}
}
</script>
