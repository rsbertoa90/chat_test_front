<template>
    <cotizer></cotizer>
</template>


<script>
import cotizer from '@/components/cotizer/Cotizer.vue'
import metaMixin from '@/plugins/metadataMixin.js';
export default {
    mixins:[metaMixin],
    components:{cotizer},
    name:'cotizador'
    
}
</script>


