<template>
    <nuxt-link v-if="config" :to="config.info_banner_url || '/'">
        <img loading="lazy" alt="info banner" :src="imagePath(wide.url)" v-if="$mq=='lg' && wide">
        <img loading="lazy" alt="info banner" :src="imagePath(mobile.url)" v-if="$mq!='lg' && mobile">
    </nuxt-link>
</template>

<script>
export default {
    data() {
        return {
            wide:null,
            mobile:null
        }
    },
    mounted(){
        this.$axios.get('/appimage/info_banner_wide')
            .then(r=>{
                this.wide=r.data[0];
               
            })
        this.$axios.get('/appimage/info_banner_mobile')
            .then(r=>{
                this.mobile=r.data[0];
              
            })
    }
}
</script>
