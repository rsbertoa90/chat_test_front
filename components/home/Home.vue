<template>
    <div>
       
        <home-top-row></home-top-row>
        <homeInfo class="mt-4 mb-4"></homeInfo>
        <homeBanners class="mt-4 ml-lg-4" v-if="config && !config.maintenance"></homeBanners>
        <homeTexts></homeTexts>
        <homeOffers v-if="config && !config.maintenance"></homeOffers>
        <fbComments></fbComments>
    </div>
</template>

<script>
import categoriesPannel from './categories-pannel.vue';
import homeTopRow from './top-row.vue';
import homeInfo from './info.vue';
import  homeOffers from './offers.vue';
import homeBanners from'./banners.vue';
import homeTexts from './texts.vue';
import fbComments from './fbcomments.vue';
import metaMixin from '../metadataMixin';
export default {
    mixins:[metaMixin],
    components:{fbComments,homeTexts,homeOffers,homeTopRow,homeInfo,categoriesPannel,homeBanners},
    }
</script>
