<template>
    
    <appComponent></appComponent>

</template>

<script>
import appComponent from '@/components/sucursales/Sucursales.vue';
import metaMixin from '@/plugins/metadataMixin.js';
export default {
    name:'sucursales',
    layout:'categories',
    mixins:[metaMixin],
    components:{appComponent}
}
</script>
