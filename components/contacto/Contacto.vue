<template>
<div class="container">
    <div class="row">
        <div class="col-12 text-center">
            <h1>Contactate con Mates Fabi</h1>
        </div>
       
        <div class="col-12 mt-4">
            <div class="fcc">
                <div>
                    <p class="msg">
                        Por el momento para comprar personalmente solo se encuentra abierta la sucursal de Pasteur 410 - ONCE (CABA) de lunes a viernes de 11hs a 18hs.
                    </p>
                    <p class="msgg">
                      Para envíos al Interior o retirar pedidos ya preparados en la sucursal, el procedimiento de compra y los tiempos que se manejan para su preparación son los mismos. Abajo te dejamos detallado el paso a paso.
                      </p>
                      <p>
                        Del paso 1 al paso 2 hay una demora de varios días, esperamos sepan comprender.
                        Estamos trabajando con personal reducido en todas las áreas debido a la situación actual por lo que hay un poco de demora en la atención. Estamos trabajando para brindarles lo mejor posible dentro de las limitaciones que impone el momento que estamos pasando como sociedad. Todos van a recibir respuesta, agradecemos su paciencia y comprensión
                    </p>
                </div>
                <div v-if="!hidePrices">
                  
                    <div  class="fcc" >
                        <div class="fcc p-4">
                            <nuxt-link class="button btn btn-info btn-block text-center" to="/cotizador"> VER PRODUCTOS Y PRECIOS</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-4 text-center">
                <p class="msg">Para consultas generales o dudas contactanos por nuestras redes sociales</p>
                <div class="mt-4 d-flex justify-content-center">
                    <div class="social">
                        <a href="https://m.me/mayoristaMatesFabi" target="_blank">
                           <img loading="lazy" :src="imagePath('/storage/images/app/social/fb.png')" alt="facebook">
                            
                        </a>
                    </div>
                    <div class="ml-4 social">
                        <a href="https://www.instagram.com/mayoristamatesfabi/" target="_blank">
                           <img :src="imagePath('/storage/images/app/social/instagram.png')" alt="instagram">
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row col-12">
            <div class="col-12  mt-4 p-4">
                <img :src="imagePath('/storage/images/app/envio10dias.jpg')" alt="Como comprar">
            </div>
            <div class="col-12  mt-4 p-4">
                <img :src="imagePath('/storage/images/app/faq.jpg')" alt="Como comprar">
            </div>
        </div>
    </div>

</div>
</template>

<script>

export default {
    
    data(){
        return{
           
            formdata : {
                name : '',
                email : '',
                phone:'',
                message : ''
            }
        }
    },
    methods:{
        submit(){
            var vm = this;
            this.$store.commit('setLoading',true);
            this.$axios.post('/contacto',this.formdata)
            .then(()=>{
                swal('Mensaje enviado','Nos comuicaremos con usted a la brevedad','success')
                    .then (response => {
                        this.$store.commit('setLoading',false);
                        this.$router.push('/');
            });
        });
            
        }
    }
}
</script>


<style lang="scss" scoped>
// violeta oscuro es b2037a
$color-first : #b2037a;

// El verde es 09cca2 
$color-second : #09cca2;

// Rosa fuerte es ff0aaf
$color-focus: #ff0aaf; 

// Rosa claro es ff97dd
$color-back: #ff97dd;

.social{
    width:75px;
}
.msg{
    font-size: 24px;
    text-align: center;
}
.msgg{
    font-size: 18px;
}
.fcc{
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;
}
.btn{
    font-size: 20px;
}
</style>
