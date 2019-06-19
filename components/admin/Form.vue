<template>
    <div class="">
        <div v-if="loading" class="loader">
            <dot-loader :loading="loading" size="200px"></dot-loader>
        </div>

       
        <form  id="form" formtarget="_blank" class="col-12" target="_blank" action="/admin/cotizacion" method="post"  >
                <csrf></csrf>
                <input type="hidden" name="list" :value="stringList">
                <input type="hidden" name="total" :value="total">

              <div class="col-12 row form-group-row mb-3">
                  <div class="col-12 col-lg-4">
                    <input  type="radio"
                           v-model="formData.shipping" :value="false"> 
                     <span @click="formData.shipping=false"  class="text-secondary radioText" :class="{'text-success':!formData.shipping}">
                        <span class="fa fa-building"></span> Retiro en el local
                     </span>
                  </div>
              </div>
              <div class="col-12 row form-group-row mb-3">
                  <div class="col-12 col-lg-4">
                    <input  type="radio"
                           v-model="formData.shipping" :value="true"> 
                    <span  @click="formData.shipping=true" class="text-secondary radioText" :class="{'text-success':formData.shipping}">
                        <span class="fa fa-truck"></span> Envio por transporte
                    </span>
                  </div>
               </div> 

               <div class="col-12 row form-group-row">
                   <label class="col-4 col-lg-2" for="">Nombre del Vendedor</label>
                   <input  type="text" name="seller"  class="form-control col-8 col-lg-4">
                </div> 
               <div class="col-12 row form-group-row">
                   <label class="col-4 col-lg-2" for="">Nombre del cliente</label>
                   <input  required type="text" name="name"  class="form-control col-8 col-lg-4">
                </div> 

                  <!-- DATOS DE ENVIO -->
                <div v-if="formData.shipping">
                    
                    <div class="col-12 row form-group-row">
                        <label class="col-4 col-lg-2" for=""> Provincia </label>
                        <select v-if="states.length > 0" v-model="state" class="form-control col-8 col-lg-4">
                            <option v-for="opt in states" :key="opt.id" :value="opt"> 
                                {{opt.name}}
                            </option>
                        </select>
                    </div>
                    <div class="col-12 row form-group-row">
                        <label class="col-4 col-lg-2" for=""> Ciudad </label>
                        <select v-if="state" v-model="formData.city" class="form-control col-8 col-lg-4">
                            <option v-for="opt in state.cities" :key="opt.id" :value="opt.id"> 
                                {{opt.name}}
                            </option>
                        </select>
                    </div>
                    <div class="col-12 row form-group-row">
                        <label class="col-4 col-lg-2" for=""> Direccion </label>
                        <input  type="text" v-model="formData.address"  class="form-control col-8 col-lg-4">
                    </div>
                    <div class="col-12 row form-group-row">
                        <label class="col-4 col-lg-2" for=""> Transporte </label>
                        <input  type="text" v-model="formData.transport"  class="form-control col-8 col-lg-4">
                    </div>
                    <div class="col-12 row form-group-row">
                        <label class="col-4 col-lg-2" for=""> Codigo Postal </label>
                        <input  type="text" v-model="formData.cp"  class="form-control col-8 col-lg-4">
                    </div>
                </div>
                <!-- /DATOS DE ENVIO -->

                

               <div class="col-12 row form-group-row">
                   <label class="col-4 col-lg-2" for="">Email</label>
                   <input  type="email" name="email"  class="form-control col-8 col-lg-4">
                </div> 
               <div class="col-12 row form-group-row">
                   <label class="col-4 col-lg-2" for="">Telefono</label>
                   <input name="phone" type="text" class="form-control col-8 col-lg-4">
                </div> 
               <div class="col-12 row form-group-row">
                   <label class="col-4 col-lg-2" for="">Comentarios</label>
                   <textarea name="msg" class="form-control col-8 col-lg-4"></textarea>
                </div> 
                <button class="button btn-lg btn-outline-success offset-2 mt-2">Generar Presupuesto</button>

        </form>
            
    </div>
</template>

<script>
export default{
    props : {
        list : {default : []},
        total : {default : 0}
    },

    data(){return{
        loading : false,
        formData : {
            msg : '',
            phone : '',
            email : ''
        }
    }},

   
    computed : {
        stringList(){
            return JSON.stringify(this.list);
        }
    }
}

</script>

<style>
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
    align-items: start;
    padding-top: 5%;
}
</style>