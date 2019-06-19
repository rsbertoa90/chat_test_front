<template>
    <div class="">
        <div v-if="loading" class="loader">
            <dot-loader :loading="loading" size="200px"></dot-loader>
        </div>

        <div class="d-flex flex-column mb-2">
            <h1> <b>Termine mi pedido!</b></h1>
            <div> <fa-icon icon="check-square" class="text-red check"></fa-icon> Si queres rechequear o hacer algun cambio, debajo del formulario tenes el detalle de tu compra. </div>
            <div><fa-icon icon="check-square" class="text-red check"></fa-icon> Una vez que envíes tu pedido te llegará una copia al mail que hayas puesto en el formulario. </div>
            <div><fa-icon icon="check-square" class="text-red check"></fa-icon> Nos estaremos comunicando para confirmar tu presupuesto dentro de las 24hs. </div>

        </div>
        <form class="col-12 row" id="form">
               
         
              <div class="col-12 col-lg-4 row form-group-row mb-3">
                  <div class="col-12 col-lg-8">
                    <input  type="radio"
                           v-model="formData.shipping" :value="false"> 
                     <span @click="formData.shipping=false"  class="text-secondary radioText" :class="{'text-success':!formData.shipping}">
                        <span class="fa fa-building"></span> Retiro en el local
                     </span>
                  </div>
              </div>
              <div class="col-12 col-lg-4 row form-group-row mb-3">
                  <div class="col-12 col-lg-8">
                    <input  type="radio"
                           v-model="formData.shipping" :value="true"> 
                    <span  @click="formData.shipping=true" class="text-secondary radioText" :class="{'text-success':formData.shipping}">
                        <span class="fa fa-truck"></span> Envio por transporte
                    </span>
                  </div>
               </div> 

                <div class="col-12 col-lg-6 row mt-2 ">
                    <div class="col-12 row form-group-row">
                        <label class="col-12 col-lg-4" for="">
                            Nombre y Apellido     
                        </label>
                        <input required type="text" v-model="formData.name"  class="form-control col-12 col-lg-8">
                    </div>
                    <div class="col-12 row form-group-row mt-2 ">
                        <label class="col-12 col-lg-4" for="">Email</label>
                        <input required type="email" v-model="formData.email"  class="form-control col-12 col-lg-8">
                    </div> 
                    <div class="col-12 row form-group-row mt-2 ">
                        <label class="col-12 col-lg-4" for="">Telefono</label>
                        <input v-model="formData.phone" type="text" class="form-control col-12 col-lg-8">
                    </div> 
                    <div class="col-12 row form-group-row mt-2 ">
                        <label class="col-12 col-lg-4" for="">Mensaje</label>
                        <textarea v-model="formData.message" name="msg" class="form-control col-12 col-lg-8"></textarea>
                    </div> 
                </div>


                <!-- DATOS DE ENVIO -->
                <div v-if="formData.shipping"  class="col-12 col-lg-6 row">
                    
                    <div class="col-12 row form-group-row mt-2">
                        <label class="col-12 col-lg-4" > Provincia </label>
                        <select v-if="states.length > 0" v-model="state" class="form-control col-12 col-lg-8">
                            <option v-for="opt in states" :key="opt.id" :value="opt"> 
                                {{opt.name}}
                            </option>
                        </select>
                    </div>
                    <div class="col-12 row form-group-row mt-2">
                        <label class="col-12 col-lg-4" for=""> Ciudad </label>
                        <select v-if="state" v-model="formData.city" class="form-control col-12 col-lg-8">
                            <option v-for="opt in state.cities" :key="opt.id" :value="opt.id"> 
                                {{opt.name}}
                            </option>
                        </select>
                    </div>
                    <div class="col-12 row form-group-row mt-2">
                        <label class="col-12 col-lg-4" for=""> Direccion </label>
                        <input  type="text" v-model="formData.address"  class="form-control col-12 col-lg-8">
                    </div>
                    <div class="col-12 row form-group-row mt-2">
                        <label class="col-12 col-lg-4" for=""> Transporte </label>
                        <input  type="text" v-model="formData.transport"  class="form-control col-12 col-lg-8">
                    </div>
                    <div class="col-12 row form-group-row mt-2">
                        <label class="col-12 col-lg-4" for=""> Codigo Postal </label>
                        <input  type="text" v-model="formData.cp"  class="form-control col-12 col-lg-8">
                    </div>
                </div>
                <div class="col-12 col-lg-6" v-else></div>
                <!-- /DATOS DE ENVIO -->

               <div class="col-12 mt-2 mb-2">
                   <span class="alert text-danger">* Por favor revise que sus datos de contacto sean correctos antes de enviar el formulario.</span>
               </div>
               <div class="col-12 row">

                <div type="button" class="btn btn-lg btn-outline-danger col-12 col-lg-4 mt-2" @click="send"> <fa-icon icon="envelope" class="mb-1 mr-2"></fa-icon> Enviar mi pedido </div>

                <nuxt-link to="/cotizador" class="ml-lg-4 offset-lg-1 btn btn-lg btn-outline-secondary col-12 col-lg-4 mt-2" > <fa-icon icon="arrow-left" class="mb-1 mr-2"></fa-icon> Volver al cotizador </nuxt-link>
               </div>

        </form>
            
    </div>
</template>

<script>
export default{
    
    computed:{
        list(){
            return this.$store.getters.getList;
        },
        total(){
            return this.$store.getters.getTotal;
        },

        states(){
            return this.$store.getters.getStates;
        },
        configs(){
            return this.$store.getters.getConfig;
        },
       user(){
           return this.$store.getters.getUser;
       }
    },

    data(){return{
       
      
        state:null,
        cities:[],
        loading : false,
        formData : {
            name : '',
            seller:'',
            message : '',
            phone : '',
            email : '',
            shipping: true,
            city: null,
            address:'',
            transport:'',
            cp:'',

        }
    }},

    methods : {
         minBuy(){
             if(this.configs){
                 if (this.formData.shipping){
                     return this.configs.minbuy_ship;
                 }
                 else {return this.configs.minbuy;}
             }
        },
        validateEmail(email) {
      
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       
            return re.test(String(email).toLowerCase());
        },
        formValid()
        {   
            if (this.formData.shipping && !this.formData.city)
            {
                  swal('Por favor selecciones una localidad ','','error');
                 return false; 
            }
            else if(!this.formData.name || this.formData.name.trim() == '')
            {
                 swal('El campo "Nombre y Apellido" es obligatorio ','','error');
                 return false; 
            }
            else if (!this.validateEmail(this.formData.email)){
                swal('Hay algo mal con el mail','','error');
                return false;
            }
            else if (this.formData.email.length < 4  )
            {
                swal('Hay algo mal con el mail','','error');
                return false;
            }else if (this.list.length <= 0) 
            {   
                swal('No hay productos seleccionados','','error');
                return false;
            } else if (this.total < this.minBuy())
            {
                swal('El minimo de compra es de $'+this.minBuy(),'','error');
                return false;
            } else {return true;}
        },
        compressList(){
            let res = [];
            this.list.forEach(item => {
                let compresedItem = {
                    id : item.id,
                    units: item.units
                }
                res.push(compresedItem);
            });
            
            return res;

        },
        send(){
            if (this.formValid()){

                var data = this.formData;
                if (data.shipping)
                {
                    data.shipping = 1;
                } else {data.shipping = 0;}

                let list = this.compressList();


                data.list = JSON.stringify(list);
                data.total = this.total;
                
                var vm = this;
                vm.loading = true;
               
   
                    this.$axios.post('/cotizer/send',data)
                    .then(res => {
                            vm.loading = false;
                            swal('Enviamos tu presupuesto', 'Te estaremos contactando a la brevedad', 'success')
                                .then(() => {
                                    window.location.replace('/');
                                });
                        });
                   
            }
        }
    },
   
    
}

</script>

<style lang="scss" scoped>
.loader {
    position : fixed;
    height: 100%;
    width: 100%;
    z-index: 110;
    background-color: #ddddddaa;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 5%;
}

input[type="radio"] {
  -webkit-appearance: checkbox; /* Chrome, Safari, Opera */
  -moz-appearance: checkbox;    /* Firefox */
  -ms-appearance: checkbox;     /* not currently supported */
  -ms-transform: scale(2); /* IE */
  -moz-transform: scale(2); /* FF */
  -webkit-transform: scale(2); /* Safari and Chrome */
  -o-transform: scale(2); /* Opera */
  padding: 10px;
  margin-right: 15px;
}
.radioText{
    font-size:1.2rem;
}

.text-red{
    color:#D52B1E;
}

.check{
    font-size:1.5rem;
    margin-bottom:5px;
}
</style>