<template>
    <div>
        <no-ssr>

        <home-banners></home-banners>
        <home-icons></home-icons>
        </no-ssr>
        
    </div>
</template>

<script>

import homeBanners from './banners.vue';
import homeIcons from './icons.vue';
export default {
   
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
