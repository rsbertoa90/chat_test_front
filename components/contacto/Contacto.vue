<template>
<div class="container">
    <div class="row">
        <div class="col-12">
            <h1>Contactate con Mayorista Redlimp</h1>
        </div>
        <div class="col-12 col-lg-4">
            <img :src="imagePath('/storage/images/app/contacto.jpg')" alt="contacto">
        </div>
        <div class="col-12 col-lg-8">
            <form ref="form" class="form" method="post" action="/contacto">
                 <input type="hidden" name="_token" :value="csrf">
          
                <div class="row">
                    <label class="col-12 col-lg-4">
                        Nombre
                    </label>
                    <input  name="name" v-model="formdata.name" required
                            type="text" class="form-control col-12 col-lg-8">
                </div>
                <div class="row">
                    <label class="col-12 col-lg-4">
                        Mail
                    </label>
                    <input  name="mail" v-model="formdata.email" required
                            type="email" class="form-control col-12 col-lg-8">
                </div>
                <div class="row">
                    <label class="col-12 col-lg-4">
                        Asunto
                    </label>
                    <input  name="subject" v-model="formdata.topic" required
                            type="text" class="form-control col-12 col-lg-8">
                </div>
                <div class="row">
                    <label class="col-12 col-lg-4">
                        Mensaje
                    </label>
                    <textarea name="msg" required v-model="formdata.message" 
                              class="form-control col-12 col-lg-8" rows="5"></textarea>
                </div>
                <div class="row mt-4">
                    <button type="submit" @click.prevent="submit" class="btn btn-lg bg-second offset-4 white-bold">Enviar</button>
                </div>
            </form>
        </div>
    </div>

</div>
</template>

<script>
export default {
    data(){
        return{
             csrf:window.csrf,
            formdata : {
                name : '',
                email : '',
                topic : '',
                message : ''
            }
        }
    },
    methods:{
        submit(){
            var vm = this;
                swal('Mensaje enviado','Nos comuicaremos con usted a la brevedad','success')
                    .then (response => {
                       this.$axios.post('/contacto')
                       .then(r=>{
                           swal('Gracias por tu mensaje','Nos estaremos comunicando a la brevedad','success');
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


    button.bg-second{
        &:hover{
            background-color: #fff;
            border: 2px solid $color-second;
            color: $color-second;
        }
    }
</style>
