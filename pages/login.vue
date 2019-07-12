<template>
<div class="container">
    <div class="row justify-content-center w-100">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Login</div>

                <div class="card-body">
                    <form  aria-label="login" ref="form" @submit.prevent="send">
                    

                        <div class="form-group row">
                            <label for="email" class="col-sm-4 col-form-label text-md-right">Email</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control" name="email"  required autofocus v-model="formData.email">

                               
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                            <div class="col-md-6">
                                <input v-model="formData.password" id="password" type="password" class="form-control" name="password" required>

                              
                            </div>
                        </div>

                      

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary" >
                                    Login
                                </button>

                              
                            </div>
                        </div>
                    </form>
                </div>
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
  
    layout:'default',
    name:'login',
     metaInfo(){return{
        title: 'Login'   }},
    data(){
        return{
            formData:{
                email:'',
                password:''
            }

        }
    },
   
  
    methods:{
       async send(){
           this.$store.commit('setLoading',true);
            await this.$auth.loginWith('local',{
                data:this.formData
            });

            setTimeout(() => {
                this.$store.commit('setLoading',false);
                if(this.admin){
                    this.$router.push('/');
                }
                else{
                  //  console.log(this.user);
                    swal('Error','Usuario o contraseña invalidos','error');
                }
            }, 500);
        }
    },
    
    
}
</script>
