<template>
    <div>
        <no-ssr>

        <home-banners></home-banners>
        <home-icons></home-icons>
        </no-ssr>
        
    </div>
</template>

<script>
import metadataMixin from '../metadataMixin.js';
import homeBanners from './banners.vue';
import homeIcons from './icons.vue';
export default {
    mixins:[metadataMixin],
    components:{
        homeBanners,
        homeIcons
    },
    computed:{
        user(){
            return this.$store.getters.getUser;
        },

    },
   
}
</script>
