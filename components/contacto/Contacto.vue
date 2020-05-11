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
                        Podes contactarte con el área de venta online por Whatsapp al <b> 11 3008 5414 </b> de lunes a viernes de 9 a 18hs. Locales en Once temporalmente cerrados, solo toma de pedidos online.
                    </p>
                    <p class="msgg">
                        Estamos trabajando con personal reducido en todas las áreas debido a la situación actual por lo que hay un poco de demora en la atención. Estamos trabajando para brindarles lo mejor posible dentro de las limitaciones que impone el momento que estamos pasando como sociedad. Todos van a recibir respuesta, agradecemos su paciencia y comprensión
                    </p>
                </div>
                <div v-if="!hidePrices">
                    <div v-if="$mq=='lg'" class="d-flex justify-content-around" >
                        <nuxt-link class="button btn btn-info" to="/descargar-lista-de-precios">Descargar lista de precios</nuxt-link>
                        <nuxt-link class="button btn btn-info" to="/descargar-catalogo-digital">Descargar catalogo digital</nuxt-link>
                    </div>
                    <div v-else class="fcc" >
                        <div class="fcc">
                            <nuxt-link class="button btn btn-info" to="/descargar-lista-de-precios">Descargar lista de precios</nuxt-link>
                        </div>
                        <div class="mt-3 fcc">
                            <nuxt-link class="button btn btn-info" to="/descargar-catalogo-digital">Descargar catalogo digital</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 mt-4 p-4">
            <img :src="imagePath('/storage/images/app/envio40.jpg')" alt="Como comprar">
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
