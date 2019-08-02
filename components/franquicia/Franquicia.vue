<template>
<div class="container">
    <div class="row">
        <div class="col-12">
            <h1>Tene tu propio Mates Fabi</h1>
        </div>
        <div class="col-12">
            <p>
                 Una oportunidad de negocio para generar ingresos. 
            </p>
            <p>
                Para recibir la información detallada completar el siguiente formulario.
            </p> 
        </div>
        <div class="col-12 col-lg-4">
            <img :src="imagePath('/storage/images/app/page-franquicia.png')" alt="contacto">
        </div>
        <div class="col-12 col-lg-8">
            <form ref="form" class="form" method="post" action="/franquicia">
                <input type="hidden" name="_token" :value="csrf">
                <div class="row">
                    <label class="col-12 col-lg-4">
                        Nombre
                    </label>
                    <input required name="name" v-model="formdata.name" 
                            type="text" class="form-control col-12 col-lg-8">
                </div>
                <div class="row">
                    <label class="col-12 col-lg-4">
                        Mail
                    </label>
                    <input required name="mail" v-model="formdata.email" 
                            type="email" class="form-control col-12 col-lg-8">
                </div>
                <div class="row">
                    <label class="col-12 col-lg-4">
                        Telefono
                    </label>
                    <input  required name="phone" v-model="formdata.phone" 
                            type="text" class="form-control col-12 col-lg-8">
                </div>
                <div class="row">
                    <label class="col-12 col-lg-4">
                        ¿En que horarios te podemos llamar?
                    </label>
                    <textarea required name="msg"  v-model="formdata.message" 
                              class="form-control col-12 col-lg-8" rows="5"></textarea>
                </div>
                <div class="row mt-4">
                    <button @click.prevent="submit" class="btn btn-lg bg-second offset-4 white-bold">Enviar</button>
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
                phone : '',
                message : ''
            }
        }
    },
    methods:{
        submit(){
            if (this.formValid()){

                var vm = this;
                swal('Mensaje enviado','Nos comuicaremos con usted a la brevedad','success')
                    .then (response => {
                        $(vm.$refs.form).submit();
                    });
            
            }
        },
        formValid(){
            if (!this.formdata.name || !this.formdata.email || !this.formdata.message || !this.formdata.phone){
                swal('Ups!','Parece que te falta completar el formulario','error');
                return false;
            }

            return true;

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
