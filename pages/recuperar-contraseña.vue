<template>
<div class="container mtc">
   

    <div class="row justify-content-center w-100 p-3">
        <div class="title">
            <h1>Cambiar contraseña</h1>
            <br>
            <h4>Ingresa tu mail y te enviaremos un correo para que puedas cambiar tu contraseña</h4>
        </div>
        <div class="mt-3 text-secondary">

        </div>
        <div class="round bg-rosa">
            <div>
                <div>
                    <form  aria-label="login" ref="form" @submit.prevent="send">
                    

                        <div class="form-group row mt-4">
                            <label for="email" class="col-12 col-form-label">Correo electronico</label>

                            <div class="col-12">
                                <input id="email" type="email" class="form-control" name="email"  required autofocus v-model="formData.email">
                            </div>
                        </div>

                        <div class="form-group row mb-0 ">
                            <div class="p-4 fcc">
                                 <button type="submit" class=" mt-3 btn btn-block pink-btn btn-block text-center " >
                                    Enviar
                                </button>   
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

         <div class="form-group row mb-0 mt-2 ">
            <span class="col-6 p-0 primary fcc">No estas registrad@?</span> <br>
            <div class="col-6  p-0">
                    <nuxt-link to="/registrate"  class="  btn btn-block pink-btn text-center " >
                        Registrate
                    </nuxt-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    head() {
    return {
      titleTemplate: 'ADMIN',      
    }
  },
  
    layout:'clean',
    name:'login',
     
    
     metaInfo(){return{
        title: 'Login'   }},
    data(){
        return{
            formData:{
                email:'',
              
            }

        }
    },
   
  
    methods:{
       async send(){
           if(this.formData.email){
                 this.$store.commit('setLoading',true);
                 this.$axios.post('/restorePass',this.formData)
                   .then(r => {
                        this.$store.commit('setLoading',false);
                       if(r.data == 'error')
                       {
                           swal('Error','No tenemos registrado ese correo electronico','error')
                       }
                       else {
                           swal('Listo','Accede desde el enlace que te enviamos por correo para cambiar tu contraseña','success')
                            .then(()=>{
                                this.$router.push('/recuperar-pass');
                            })
                       }
                   });   
           }
        }
    },
    mounted(){
        
    }
    
    
}
</script>


<style lang="scss" scoped>

.pink-btn{
    border: 1px solid #333;
    background-color: #ff0aaf;
    margin: 10px;
    padding: 4px;
    box-shadow: 2px 2px 2px #666;
    color:#fff;
    font-weight: bold;
}

.round{
    border-radius:40px;
}
    .container{
        max-width:450px;
        margin:auto;
    }

    .title{
        h1{
            font-size: 38px;
            color:#E72874;
            font-weight: bold;
        }
    }
    .card-header{
        color:#888;;
        font-weight: bold;
        font-size: 22px;
    }
    .mtc{
        margin-top:30px;
    }


    @media(max-width:660px)
    {
        .title{
            h1{
                font-size:25px; 

            }
            }
        .container{
            max-width:350px;
        }

        .primary{
            font-size: 15px;
        }
    }
</style>
   