<template>
    <ccontacto></ccontacto>
</template>


<script>
import ccontacto from '@/components/contacto/Contacto';
import metaMixin from '@/plugins/metadataMixin.js';
export default {
    mixins:[metaMixin],
    components:{ccontacto},
    name:'contacto'
}
</script>
