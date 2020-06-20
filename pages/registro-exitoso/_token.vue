<template>
<no-ssr>
    <div class="container mtc">
        <div v-if="!founduser && !loading">
            <div class="title">
                <h1>
                    Error. No se encontro un usuario
                </h1>
            </div>
        </div>

        <div class="row justify-content-center w-100 p-3" v-if="founduser">
            <div class="title">
                <h1>Ya estas registrad@! Bienvenido a Mates Fabi</h1>
                
            </div>
            <div class="mt-3 text-secondary">
                Inicia Sesión para ver la web con los precios, hacer tus cotizaciones y pedidos online al instante
            </div>
            <div class="round bg-rosa">
                <div >
                    <div >
                        <form  aria-label="login" ref="form" @submit.prevent="send">
                        

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
                            <div class="form-group row mb-0 ">
                                <div class="p-4">
                                    <button type="submit" class=" mt-3 btn btn-block pink-btn btn-block text-center " >
                                        INICIA SESION
                                    </button>                    
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        <!--   <div class="form-group row mb-0 mt-2 ">
                <span class="col-6 p-0 primary fcc">No estas registrad@?</span> <br>
                <div class="col-6  p-0">
                        <nuxt-link to="/login"  class="  btn btn-block pink-btn text-center " >
                            Registrate
                        </nuxt-link>
                </div>
            </div> -->
        </div>
    </div>
</no-ssr>
</template>

<script>
export default {
    head() {
    return {
      titleTemplate: 'Registro exitoso',      
    }
  },
  
    layout:'clean',
    name:'registro-exitoso',
     metaInfo(){return{
        title: 'registro exitoso'   }},
    data(){
        return{
            formData:{
                email:'',
                password:''
            },
            founduser:null,
        }
    },
    computed:{
        loading(){
            return this.$store.getters.getLoading;
        }
    },
    mounted(){
        this.$store.commit('setLoading',true);
        let token = this.$route.params.token;
        let data={
            token:token
        }
        this.$axios.post('/reg-confirm',data)
            .then(r => {
                this.$store.commit('setLoading',false);
                if (r.data)
                {
                    this.founduser=r.data;
                    this.formData.email=this.founduser.email;
                }
            });
    },
    methods:{
       async send(){
           this.$store.commit('setLoading',true);
            await this.$auth.loginWith('local',{
                data:this.formData
            });

            setTimeout(() => {
                this.$store.commit('setLoading',false);
                if(this.user){
                    this.$router.push('/');
                }
                else{
                    swal('Hay un error con sus datos','Verifique que su mail y contraseña sean correctos','error');
                }
            }, 500);
        }
    },
    
    
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
           // color:#E72874;
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
   