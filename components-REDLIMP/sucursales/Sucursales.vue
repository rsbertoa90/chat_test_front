<template>
    <div>
        <sucursales-mobile v-if="$mq != 'lg'"></sucursales-mobile>
        <sucursales-web v-else></sucursales-web>
    </div>
</template>

<script>
import sucursalesWeb from './sucursales-wide.vue';
import sucursalesMobile from './sucursales-mobile.vue';
export default {
    components : {
        sucursalesWeb,
        sucursalesMobile
    },
   
}
</script>
