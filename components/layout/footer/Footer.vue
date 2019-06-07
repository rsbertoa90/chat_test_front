<template>
    <div class="mt-4">
        <div class="row bg-first footer-row ">
            <router-link  to="/cotizador" class=" col-12 col-lg-3 offset-lg-1 white-bold d-flex 
                        justify-content-center align-items-center bg-focus p-2 ">
                <h5 class="white-bold">Cotizador Online</h5>
            </router-link>
           <!--  <div class=" col-12 col-lg-8 white-bold d-flex 
                        justify-content-around align-items-center p-2 row">
                <h5 class="col-12 col-lg-5 text-center">Recibir novedades por mail</h5>
                <form @submit.prevent="suscribe" method="post" 
                    class="form-inline col-12 col-lg-7 d-flex justify-content-center align-items-center">
                      <div class="input-group w-100">
                        <input aria-label="Tu email aqui" type="text" class="form-control" 
                                v-model="suscriptionMail" placeholder="TuMailAqui@correo.com">
                        <div class="input-group-prepend">
                            <button type="submit" class=" input-group-text d-flex justify-content-center bg-first white-bold" 
                                  id="basic-addon1">
                                Suscribirme
                            </button>
                        </div>
                    </div> 
                </form>
            </div> -->
        </div>
        <hr>
        <div class="row">
            <div class="col-12 col-lg-4 row">
                <div class="col-2 offset-1  ">
                    <div class="mt-2 btn bg-second white-bold">
                        <span class="fa fa-map-marker-alt"></span>
                    </div>
                </div>
                <div class="col-9">
                 
                        <p> Donizzetti 186, Lomas de Zamora, Bs As </p>

                 
                </div>
            </div>
            <div class="col-12 col-lg-4 row">
                <div class="col-2 offset-1  ">
                    <div class="mt-2 btn bg-second white-bold">
                        <span class="fa fa-envelope"></span>
                    </div>
                </div>
                <div class="col-9 mt-3">
                   <p> mayoristaredlimp@gmail.com  </p>
                </div>
            </div>
            <div class="col-12 col-lg-4 row">
                <div class="col-2 offset-1  ">
                    <div class="mt-2 btn bg-second white-bold">
                        <span class="fab fa-whatsapp"></span>
                    </div>
                </div>
                <div class="col-9 mt-3">
                    <p> 11 3895 1332   </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
.input-group{
    position:relative;
    input{
        padding-left:120px;
    }
    .input-group-prepend{
        position:absolute;
        top:0;
        left:0;
        height: 100%;
    }
}
   ul li{
       font-size: 0.7rem;
   }
   .fa-mobile{
       font-size: 2rem;
       margin-top: -5px;
   }
   @media(min-width: 900px){
     /*   .footer-row{
           margin: 0px -7.5%;
       } */
   }
   a:hover{
       color:white;
   }
</style>

