<template>
    
        <appComponent></appComponent>
    
</template>

<script>
import appComponent from '@/components/sorteo/fin.vue';
import metaMixin from '@/plugins/metadataMixin.js';
export default {
    name:'sorteo',
    layout:'categories',
    mixins:[metaMixin],
    components:{appComponent}
}
</script>
