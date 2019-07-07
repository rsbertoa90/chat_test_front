<template>
    <appOffers></appOffers>
</template>

<script>
import metaMixin from '@/plugins/metadataMixin.js';
import appOffers from '@/components/offers/Offers.vue';
export default {
layout:'categories',
name:'ofertas',
mixins:[metaMixin],
components:{appOffers}
}
</script>
