<template>
    
    <appContact></appContact>

</template>

<script>
import appContact from '@/components/contact/Contact.vue';
import metaMixin from '@/plugins/metadataMixin.js';
export default {
    name:'contacto',
    layout:'categories',
    mixins:[metaMixin],
    components:{appContact}
}
</script>
