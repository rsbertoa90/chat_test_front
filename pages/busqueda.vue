<template>
    
    <appComponent></appComponent>

</template>

<script>
import appComponent from '@/components/search/Results.vue';
import metaMixin from '@/plugins/metadataMixin.js';

export default {
    
    name:'busqueda',
    layout:'categories',
    mixins:[metaMixin],
    components:{appComponent}
}
</script>
