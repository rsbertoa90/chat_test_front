<template>
    <div >
        <div class="row ml-1 ml-lg-0">
            <div class="col-12 col-lg-8 p-1">
                <nuxt-link to="/cotizador" class="w-100 d-block">
                   <v-gif :images="gifImages" alt="cotizador" :speed="500" />
                </nuxt-link>
            </div>

            <div class="col-12" v-if="$mq!='lg'">
                <no-ssr>
                    <offerSlider></offerSlider>
                </no-ssr>
            </div>

            <div class="col-12 col-lg-4 row p-1 pl-lg-4">
               <div class="col-12 p-1">
                     <div class="small-banner">
                        <nuxt-link to="/regalos-empresariales" class="w-100 d-block">
                            <v-lazy-image :src="imagePath('/storage/images/app/rregalos.jpg')" alt="regalos-empresariales" />
                        </nuxt-link>
                     </div>
                </div>
                <div class="col-12 p-1">
                      <div class="small-banner ">
                        <nuxt-link to="/sucursales" class="w-100 d-block">
                            <v-lazy-image :src="imagePath('/storage/images/app/rsucursales.jpg')" alt="sucursales" />
                        </nuxt-link>
                    </div>
                </div>
                <div class="col-12 p-1">
                     
                    <div class="small-banner ">
                        <nuxt-link to="/franquicia" class="w-100 d-block">
                            <v-lazy-image :src="imagePath('/storage/images/app/rfranquicia.jpg')" alt="franquicia" />
                        </nuxt-link>
                    </div>
                </div>
            </div>
           
        </div>
    </div>
</template>

<script>
import offerSlider from './offers.vue'
import vGif from './gif.vue';
export default {
    components: {vGif,offerSlider},
    data(){
        return{
            gifImages : [
                '/storage/images/app/hgif1.jpg',
                '/storage/images/app/hgif2.jpg'
            ]
        }
    }
}
</script>

<style scoped>
    .row, a{
        display: flex;
        justify-content: center;
        align-items: center;
    }

  
        .small-banner
        {
            width: 100%;
            /* padding : 5px 15px ; */
        }

          .custom-padded{
            padding:0px 2px 0px 17px;
        }
    @media(max-width: 990px){
        .small-banner{
            padding: 0;
            margin:15px 0px;
        }

         .custom-padded{
            padding:0px ;
        }


    }
</style>