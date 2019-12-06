<template>
    <div class="mt-4">

        
        <div class="row bg-first footer-row ">
            <nuxt-link  to="/cotizador" class=" col-12 col-lg-3 offset-lg-1 white-bold d-flex 
                        justify-content-center align-items-center bg-focus p-2 ">
                <h5 class="white-bold">Cotizador Online</h5>
            </nuxt-link>
            <div class="col-12 col-lg-2 offset-lg-4 social bg-focus">
                <a rel="noopener" target="_blank"  href="https://www.facebook.com/mayoristaMatesFabi/" class="   white-bold d-flex 
                            justify-content-center align-items-center p-2 ">
                    <v-lazy-image :src="imagePath('/storage/images/app/social/fb.png')"></v-lazy-image>
                </a>
                <a  href="https://www.instagram.com/matesfabi/" rel="noopener" target="_blank" class="   white-bold d-flex 
                            justify-content-center align-items-center  p-2 ">
                    <v-lazy-image :src="imagePath('/storage/images/app/social/instagram.png')"></v-lazy-image>
                </a>
            </div>
         
        </div>


        <hr>
        <div class="row d-flex justify-content-center ml-2">
             <div class="col-12 col-lg-4 row">
                <div class="col-2 offset-1  ">
                    <div class="mt-2 btn  btn-circle bg-second white-bold">
                        <span class="fa fa-map-marker-alt"></span>
                    </div>
                </div>
                <div class="col-9">
                    <ul>
                        <li>Pasteur 410 - CABA</li>
                        <li>Sarmiento 2268, CABA   </li>
                        <li>Castelli 203, CABA </li>

                    </ul>
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
   .social{
       display: flex;
       justify-content: space-around;
   }

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

