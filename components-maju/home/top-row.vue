<template>
    <div class="row">
        <div class="col-3" style="margin-top:58px;" v-if="$mq=='lg'">
            <categories-pannel></categories-pannel>
        </div>
        <div class="col-12 col-lg-6">
          
            <div class="col-12 d-flex justify-content-center text-center">
                <h1>Bazar Mayorista Maju</h1>
            </div>
        
            <offer-slider v-if="config && !config.maintenance"></offer-slider>
            <div v-if="config && config.maintenance">
                <div class="text-black w-100 text-center d-flex justify-content-center align-items-center">
                    <h2>Estamos actualizando nuestros precios</h2>
                </div>

            </div>
        </div>
        <div class="col-12 col-lg-3" >
            
            <div class="google-form">
                <a href="https://forms.gle/YquHUzfQqSV2PX5r8" target="_blank" rel="noreferrer">
                    <v-lazy-image :src="imagePath('/storage/images/app/form_google.jpg')" alt="Sumate a nuestra lista de difusion"></v-lazy-image>
                </a>
            </div>
        </div>
         
        
    </div>
</template>

<script>
import offerSlider from './offer-slider.vue';
import categoriesPannel from './categories-pannel.vue';

export default {
    components:{offerSlider,categoriesPannel},
    computed:{
        config(){
            return this.$store.getters.getConfig
        }
    }
}
</script>

<style lang="scss" scoped>
    .google-form{
        margin-top:59px;
        height: 470px;
        width:100%;
        border:1px solid #868686;
        overflow:hidden;
        img{
            width:100%;
        }
    }

   
</style>


