<template>
    <div>
        <sucursales-mobile v-if="$mq != 'lg'"></sucursales-mobile>
        <sucursales-web v-else></sucursales-web>
    </div>
</template>

<script>
import metadataMixin from '../metadataMixin.js';
import sucursalesWeb from './sucursales-wide.vue';
import sucursalesMobile from './sucursales-mobile.vue';
export default {
    mixins:[metadataMixin],
    components : {
        sucursalesWeb,
        sucursalesMobile
    },
   
}
</script>
