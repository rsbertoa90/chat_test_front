<template>
<div class="container">
    <div class="row">
        <div class="col-12">
            <h1>Contactate con Mates Fabi</h1>
        </div>
        <div class="col-12 col-lg-4">
            <img :src="imagePath('/storage/images/app/contacto.png')" alt="contacto">
        </div>
        <div class="col-12 col-lg-8">
            <form ref="form" @submit.prevent="submit">
                
                <div class="row">
                    <label class="col-12 col-lg-4">
                        Nombre
                    </label>
                    <input  name="name" v-model="formdata.name" required
                            type="text" class="form-control col-12 col-lg-8">
                </div>
                <div class="row">
                    <label class="col-12 col-lg-4">
                        Telefono
                    </label>
                    <input  name="name" v-model="formdata.phone" required
                            type="text" class="form-control col-12 col-lg-8">
                </div>
                <div class="row">
                    <label class="col-12 col-lg-4">
                        Mail
                    </label>
                    <input  name="mail" v-model="formdata.email" required
                            type="email" class="form-control col-12 col-lg-8">
                </div>
               <!--  <div class="row">
                    <label class="col-12 col-lg-4">
                        Asunto
                    </label>
                    <input  name="subject" v-model="formdata.topic" required
                            type="text" class="form-control col-12 col-lg-8">
                </div> -->
                <div class="row">
                    <label class="col-12 col-lg-4">
                        Mensaje
                    </label>
                    <textarea name="msg" required v-model="formdata.message" 
                              class="form-control col-12 col-lg-8" rows="5"></textarea>
                </div>
                <div class="row mt-4">
                    <button type="submit" class="btn btn-lg bg-second offset-4 white-bold">Enviar</button>
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


    button.bg-second{
        &:hover{
            background-color: #fff;
            border: 2px solid $color-second;
            color: $color-second;
        }
    }
</style>
