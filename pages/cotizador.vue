<template>
    
    <appComponent></appComponent>

</template>

<script>
import appComponent from '@/components/cotizer/Cotizer.vue';
import metaMixin from '@/plugins/metadataMixin.js';
export default {
    name:'cotizador',
    layout:'categories',
    mixins:[metaMixin],
    components:{appComponent}
}
</script>
