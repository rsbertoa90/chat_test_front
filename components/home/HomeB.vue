<template>
    <div class="container m-auto">
        <div class="row p-5 d-flex flex-column info" v-if="config">
            <h1>Mayorista Mates Fabi</h1>
            
          <p>
                <span class="fa fa-check fucsia"></span> En Mayorista Mates Fabi tenemos precios y diseños únicos porque somos fabricantes
          </p>
          <p>
               <span class="fa fa-check fucsia"></span>
               Podes visitar nuestras sucursales ubicadas en Once de lunes a viernes de 9 a 18 hs o hacer tu pedido Online.
          </p>
          <p v-if="configs">
               <span class="fa fa-check fucsia"></span>
                La compra mínima acercándote personalmente a cualquiera de nuestras sucursales es de ${{configs.minbuy}}.
          </p>
          <p v-if="configs">
               <span class="fa fa-check fucsia"></span>
                La compra mínima Online es de ${{configs.minbuy_ship}}.
          </p>
          <p>
               <span class="fa fa-check fucsia"></span>
                La compra es entregada sin cargo al transporte de carga elegido por el cliente. ( La elección del transporte y costo del mismo es a cargo del comprador)
          </p>
          <p>
               <span class="fa fa-check fucsia"></span>
              Los despachos se realizan de 2 a 6 días hábiles a partir del informe y acreditación de pago.
          </p>
              
        </div>

        <div mt-4>
            <nuxt-link to="/cotizador" class="d-flex w-100 justify-content-center">
                <v-lazy-image v-if="$mq == 'lg'" :src="imagePath('/storage/images/app/bannerCotizador.png')" alt="presupuesto" />
                <v-lazy-image v-else :src="imagePath('/storage/images/app/banner-cotizador-mobile.png')" alt="presupuesto" />
            </nuxt-link>
        </div>

       <!--  <home-maps></home-maps> -->

        <div>
            <p class="text-center">
               <span class="fab fa-whatsapp"></span> Atencion Personalizada llamando o por whatsapp al <b> 11-3008-5414 </b>
            </p>
        </div>
     
            <home-offers></home-offers>
        <hr>
        <div class="mt-4">
            <h2>Productos de Mayorista Mates Fabi  </h2>
            <home-categories-mobile v-if="$mq!='lg'"></home-categories-mobile>
            <home-categories-wide v-else></home-categories-wide>
        </div>

    </div>
</template>

<script>
import homeMaps from './maps.vue';
import homeOffers from './offers.vue';
import homeCategoriesMobile from './categories-mobile.vue';
import homeCategoriesWide from './categories-wide.vue';
export default {
    components:{
        homeMaps,
        homeOffers,
        'home-categories-mobile' : homeCategoriesMobile,
        'home-categories-wide' : homeCategoriesWide
    },
    computed:{
        configs(){
            return this.$store.getters.getConfig;
        }
    }
}
</script>

<style lang="scss" scoped>
.info{
    h1{
        font-size:2rem;
    }
    p{
        font-size:16px;
        margin-top:15px;
    }
    .fa{
        font-size:1.5rem;
    }
}
    .fa-whatsapp{
        color:#25d366;
        font-size: 2rem;
    }
</style>

