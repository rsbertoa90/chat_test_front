<template>
    <cotizer></cotizer>
</template>

<script>
import metamixin from '@/plugins/metadataMixin.js'
import cotizer from '@/components/cotizer/Cotizer.vue';
export default {
    name:'cotizador',
    mixins:[metamixin],
    components:{cotizer}
}
</script>
