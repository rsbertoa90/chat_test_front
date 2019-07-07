<template>
    
    <appComponent></appComponent>

</template>

<script>
import appComponent from '@/components/franquicia/Franquicia.vue';
import metaMixin from '@/plugins/metadataMixin.js';
export default {
    name:'franquicia',
    layout:'categories',
    mixins:[metaMixin],
    components:{appComponent}
}
</script>
