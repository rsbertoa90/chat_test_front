<template>
<div class="container ">
    <div class="row justify-content-center w-100 p-3">
        <div class="title">
            <h1>Registrate gratis en Mates Fabi </h1>
        </div>
        <div class="round bg-rosa" >
            <div >
                <div >
                    <form  aria-label="login" ref="form" @submit.prevent="send">
                    

                        <div class="form-group row mt-4">
                            <label for="name" class="col-12 col-form-label ">Nombre</label>

                            <div class="col-12">
                                <input id="name" type="text" class="form-control" name="name"  required autofocus v-model="formData.name">
                            </div>
                        </div>

                     <!--    <div class="form-group row mt-4">
                            <div class="col-6 pr-1">
                                <div class="d-flex align-items-center btn btn-block bg-lblue text-white " :class="{'selectedbtn':formData.role_id==3}" @click="formData.role_id=3">
                                    <input type="checkbox" name="role"  class="form-control checkbx" v-model="formData.role_id" true-value="3">
                                    <span>
                                        Soy revendedor/a
                                    </span>
                                </div>
                            </div>
                            <div class="col-6 pl-1">
                                <div class="d-flex align-items-center btn btn-block bg-lblue text-white " :class="{'selectedbtn':formData.role_id==4}"  @click="formData.role_id=4">
                                    <input type="checkbox" name="role"  class="form-control checkbx" v-model="formData.role_id" true-value="4">
                                    <span>
                                        Tengo local
                                    </span>
                                </div>
                            </div>
                        </div> -->

                        <div class="form-group row mt-4">
                            <label for="email" class="col-12 col-form-label">Correo electronico</label>

                            <div class="col-12">
                                <input id="email" type="email" class="form-control" name="email"  required autofocus v-model="formData.email">
                            </div>
                        </div>

                        <div class="form-group row mt-4">
                            <label for="password" class="col-12 col-form-label">Contraseña</label>

                            <div class="col-12">
                                <input v-model="formData.password" id="password" type="password" class="form-control" name="password" required>

                              
                            </div>
                        </div>

                      

                        <div class="form-group row mb-0 fcc">
                            <div class="pt-4 pl-4 pr-4 pb-0">
                                 <button type="submit" class=" mt-3 btn btn-block pink-btn btn-block text-center " >
                                    REGISTRATE
                                </button>
                            </div>
                            <div class="pr-4 pb-4 pl-4 pt-0">
                                <span class="text-white small">
                                    *Al registrarte aceptas nuestros terminos y politicas de privacidad
                                </span>
                            </div>
                        </div>





                       <!--  <div class="mt-4">
                            <a :href="backendpath+'/fbredirect'" target="_blank" class="btn btn-primary">Registrate con Facebook</a>
                        </div> -->
                    </form>
                </div>
            </div>
        </div>

        <div class="form-group row mb-0 mt-2 ">
            <span class="col-6 p-0 primary fcc">Ya estas registrad@?</span> <br>
            <div class="col-6  p-0">
                    <nuxt-link to="/login"  class="  btn btn-block pink-btn text-center " >
                        Inicia sesion
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
      titleTemplate: 'Registrate',      
    }
  },
  
    layout:'clean',
    name:'registrate',
    
     metaInfo(){return{
        title: 'Registrate'   }},
    data(){
        return{
            formData:{
                email:'',
                password:'',
                name:'',
                role_id:3,

            }

        }
    },
   
  
    methods:{
       async send(){
         
            this.$store.commit('setLoading',true);
            this.$axios.post('/register',this.formData)
                .then(r=>{
                    this.$store.commit('setLoading',false);
                    if(r.data == 'exists'){
                        swal('Ups','Ya existe un usuario registrado con ese correo electronico','error');                       
                    }else{
                        this.$router.push('/confirma-tu-registro');  
                    }
                })

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

.small{
    font-size: 12px;
}
.checkbx
{
    width:20px;
    min-width: 20px;
    margin-right:8px;
}
.btn{
    cursor:pointer;
     box-shadow: 1px 1px 1px #0008;
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
   