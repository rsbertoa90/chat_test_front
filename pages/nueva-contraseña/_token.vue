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
                <h1>{{founduser.name}} Elegí tu nueva contraseña</h1>
                
            </div>
            <div class="round bg-rosa">
                <div >
                    <div >
                        <form  aria-label="login" ref="form" @submit.prevent="send">
                        

                      
                            <div class="form-group row mt-4">
                                <label for="password" class="col-12 col-form-label">Nueva contraseña</label>

                                <div class="col-12">
                                    <input v-model="formData.password" id="password" type="password" class="form-control" name="password" required>
                                </div>
                            </div>
                            <div class="form-group row mt-4">
                                <label for="password" class="col-12 col-form-label">Repetir nueva contraseña</label>

                                <div class="col-12">
                                    <input v-model="confirm" id="confirm" type="password" class="form-control" name="password" required>
                                </div>
                            </div>
                            <div class="form-group row mb-0 ">
                                <div class="p-4">
                                    <button type="submit" class=" mt-3 btn btn-block pink-btn btn-block text-center " >
                                        CAMBIAR CONTRASEÑA
                                    </button>                    
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

      
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
        title: 'Cambia tu contraseña'   }},
    data(){
        return{
            confirm:'',
            formData:{
                user_id:null,
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
                    this.formData.user_id = this.founduser.id;
                   
                }
            });
    },
    methods:{
       async send(){
           this.$store.commit('setLoading',true);
           
           if(this.formData.password == this.confirm)
           {
               this.formData.token =this.$route.params.token;
               this.$axios.post('/new-password',this.formData) 
                .then(r => {
                    this.$store.commit('setLoading',false);
                    if(r.data)
                    {
                        swal('Listo!','Ya podes ingresar con tu nueva contraseña','success')
                            .then(()=>{
                                this.$router.push('/login');
                            })
                    }
                    else{
                        swal('Error','Ocurrio un error inesperado','error');
                        
                    }
                })
           } else{
               swal('Error','Las contraseñas no coinciden','error');
                this.$store.commit('setLoading',false);
           }
            
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
   