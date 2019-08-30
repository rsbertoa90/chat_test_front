<template>
    <div class="mt-4">

        
        <div class="row bg-first footer-row ">
            <nuxt-link  to="/cotizador" class=" col-12 col-lg-3 offset-lg-1 white-bold d-flex 
                        justify-content-center align-items-center bg-focus p-2 ">
                <h5 class="white-bold">Cotizador Online</h5>
            </nuxt-link>
         
        </div>
        <hr>
        <div class="row d-flex justify-content-center ml-2">
            <div class="col-12 col-lg-4 row">
                <div class="col-2 offset-1  ">
                    <div class="mt-2 btn  btn-circle bg-second white-bold">
                        <span class="fa fa-map-marker"></span>
                    </div>
                </div>
                 <div class="col-9 mt-3">
                   <p>Pasteur 410/412 - CABA  </p>
                </div>
            </div>
            <div class="col-12 col-lg-4 row">
                <div class="col-2 offset-1  ">
                    <div class="mt-2 btn  btn-circle bg-second white-bold">
                        <span class="fa fa-envelope"></span>
                    </div>
                </div>
                <div class="col-9 mt-3">
                   <p>Email: MatesFabi@gmail.com  </p>
                </div>
            </div>
            <div class="col-12 col-lg-4 row">
                <div class="col-2 offset-1  ">
                    <div class="mt-2 btn  btn-circle bg-second white-bold">
                        <span class="fab fa-whatsapp"></span>
                    </div>
                </div>
                <div class="col-9 mt-3">
                    <p> 11 3008 5414 </p>
                </div>
            </div>
        </div>
       
    </div>
</template>

<script>

import redlimp from '../../banners/redlimp.vue';
import mfcarteras from '../../banners/mfcarteras.vue';
export default {
    components:{
        mfcarteras,redlimp
    },
    data(){
        return{
            suscriptionMail:null
        }
    },
    methods:{
        suscribe()
        {
            if (suscriptionMail && suscriptionMail.length > 3){

            
                this.$http.post('/suscription',{'email':this.suscriptionMail})
                    .then(r => {
                        swal('Gracias por suscribirte','Recibiras todas las novedades de Mates Fabi en tu casilla de correo','success');
                    });
            }
        }
    }
}
</script> 

<style lang="scss" scoped>
   ul li{
       font-size: 0.7rem;
   }
   .fa-mobile{
       font-size: 2rem;
       margin-top: -5px;
   }
   @media(min-width: 900px){
       .footer-row{
          
          width:100vw;
          margin-left: 0;
       }
   }
   a:hover{
       color:white;
   }
   row{
       margin:0;

   }
</style>

