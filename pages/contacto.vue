<template>
    
    <appComponent></appComponent>

</template>

<script>
import appComponent from '@/components/contacto/Contacto.vue';
import metaMixin from '@/plugins/metadataMixin.js';
export default {
    name:'contacto',
    layout:'categories',
    mixins:[metaMixin],
    components:{appComponent}
}
</script>
