<template>
<div class="container">

        <div class="row mt-4">
            <div class="col-12 mb-4" v-if="$mq!='lg'">
                <v-lazy-image v-if="$mq!='lg'" :src="imagePath('/storage/images/app/msorteo.jpg')" alt="Particioa del sorteo">
                </v-lazy-image>
            </div>
            <div class="col-12 col-lg-6">
                <div class="d-flex flex-column">
                    <h1 class="heading ">
                        Participa del sorteo por una orden de compra de $15.000 en Mayorista Mates Fabi Completa el siguiente formulario
                    </h1>
                    <div class="form mt-4">
                        <div class="form-row row">
                            <label for="" class="col-4">
                                Nombre
                            </label>
                            <input v-model="formdata.name" type="text" class="col-8 form-control">
                        </div>
                        <div class="form-row row">
                            <label for="" class="col-4">
                                Apellido
                            </label>
                            <input v-model="formdata.lastname" type="text" class="col-8 form-control">
                        </div>
                        <div class="form-row row">
                            <label for="" class="col-4">
                                DNI
                            </label>
                            <input v-model="formdata.dni"  type="number" step='1' class="col-8 form-control">
                        </div>
                        <div class="form-row row">
                            <label for="" class="col-4">
                                Whatsapp/ teléfono
                            </label>
                            <input v-model="formdata.wha" type="text" class="col-8 form-control">
                        </div>
                        <div class="row">
                            <button @click="send" class="offset-8 col-4 btn send-btn clickable">
                                Participar
                            </button>
                        </div>
                    </div>
                    <div class="fcc mt-4">
                        <!-- bases y condiciones -->
                        <h2>¿Cuando se sortea?</h2>
                    
                        <p>
                            El lunes 30 de Diciembre a las 14 hs. Lo vamos a trasmitir en Vivo por <a href="https://www.instagram.com/matesfabi/" rel="noopener" target="_blank">Instagram</a>  y 
                            <a  rel="noopener" target="_blank" href="https://www.facebook.com/mayoristaMatesFabi/"> Facebook </a> .
                        </p>
                        <p>
                            Tenes tiempo de participar hasta el domingo 29 de diciembre a las 22hs
                        </p>
                        <p>
                            Te recomendamos que nos sigas en nuestras redes para saber si sos el Ganador
                        </p>
                        
                        
                    </div>
                    <div class="mt-4 fcc">
                       <h2>Bases y condiciones</h2>
                       <p>
                           <span class="fa fa-check fucsia"></span>
                           Para participar se requiere ser mayor de 18 años y vivir en Argentina. 
                       </p>
                       <p>
                           <span class="fa fa-check fucsia"></span>
                           Cada persona solo podrá participar una vez, por eso se pide el numero de DNI.
                       </p>
                       <p>
                           <span class="fa fa-check fucsia"></span>
                           El ganador deberá acreditar su identidad ni bien nos comuniquemos para obtener su premio ( Coincidir los datos del cupón ganador con el DNI que presente la persona). En caso de no poder actreditar identidad suceda se volverá a sortear.
                       </p>
                       <p>
                           <span class="fa fa-check fucsia"></span>
                           Si el ganador vive en Capital Federal o Gran Bs As deberá acercarse a la Sucursal de Mates Fabi que se le indique a obtener su premio.
                       </p>
                       <p>
                           <span class="fa fa-check fucsia"></span>
                           Si el ganador vive en el Interior, Mayorista Mates Fabi se hace cargo del Envío del premio.
                       </p>
                       <p>
                           <span class="fa fa-check fucsia"></span>
                           En caso de no poder comunicarnos con el WhatsApp/teléfono del cupón ganador entre el lunes 30 de diciembre 2019 - lunes 6 de Enero de 2020, el sorteo se volverá a realizar el martes 7 de enero de 2020.
                       </p>
                    </div>
                </div>
            </div>
            <div class=" col-lg-6" v-if="$mq=='lg'">
                <div class="p-1">
                    <v-lazy-image v-if="$mq=='lg'" :src="imagePath('/storage/images/app/wsorteo.jpg')" alt="Particioa del sorteo">

                    </v-lazy-image>
                </div>
            </div>
        </div>
        <sendedmodal @close="close" v-if="showmodal"></sendedmodal>
</div>
</template>


<script>
import sendedmodal from './sendedmodal.vue'
export default {
    components:{sendedmodal},
    data(){
        return{
            showmodal:false,
            participants:null,
            formdata:{
                name:null,
                dni:null,
                lastname:null,
                wha:null 
            }
        }
    },
    mounted(){
        this.$axios.get('/sorteo').then(r=>{
            this.participants = r.data;
        });
    },
    methods:{
        close(){
            this.$router.push('/');
        },
        checkDup(){
            let exists = this.participants.find(p => {
                return p.dni == this.formdata.dni
            });

            if (exists){
                //console.log(exists);
                return true
            }
            else{return false}
        },
        valid()
        {
            
            
             if (!this.formdata.name || !this.formdata.lastname || !this.formdata.dni || !this.formdata.wha)
            {
                swal('Cuidado','Por favor,completa todos los campos','error');
                return false;
            }
           
            
            else if (this.formdata.wha.length < 6){
                swal('Cuidado','Hay algo mal con el telefono','error');
                return false;
            }else if(this.formdata.dni.length<5 || this.formdata.dni.length>8){
                swal('Cuidado','Hay algo mal con el dni','error');
                return false;
            } else if(this.checkDup()){
                swal('El DNI ya está participando!','Solo se puede participar una vez','error');
                return false;
            }
            
            else{
                return true;
            }
        },
        send()
        {
            if(this.valid())
            {
                this.$axios.post('/sorteo',this.formdata)
                    .then(()=>{
                      this.showmodal=true;
                    });
            }
        }
    },
    watch:{
        'formdata.dni'(){
            //console.log(this.formdata.dni);
            if(this.formdata.dni.includes('.')){
                let arr = this.formdata.dni.split('.').join("");
                this.formdata.dni = arr;
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.send-btn{
    border: 1px solid red;
    background-color:blue;
    color:#fff;
    margin-top:20px;
    cursor:pointer;
}

.swal-text {
    text-align: center !important;
}

.heading{
    font-size: 30px;
    color:#707070;
}
.form-row{
    margin-top:15px;
    font-size: 20px;
    color:#707070;
}
</style>
