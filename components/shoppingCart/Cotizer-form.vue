<template>
    <div>

        <h3>Ya terminé mi pedido</h3>
       <div class="row mt-2 d-flex flex-column mb-4 mt-4">
           
                <span><i class="fa fa-check fucsia"></i> Debajo del formulario tenes el detalle de pedido por si querés re chequear o hacer algún cambio.</span>
                <span><i class="fa fa-check fucsia"></i> Una vez completes y envíes el formulario te va a llegar una copia del pedido al mail..</span>
           
        </div>
        <form id="form" class="col-12">
        <!-- Retiro en local -->
            <!--   <div class="col-12 row form-group-row mb-3">
                  <div class="col-12 col-lg-4">
                    <input  type="radio"
                           v-model="formData.shipping" :value="false"> 
                     <span @click="formData.shipping=false"  class="text-secondary radioText" :class="{'text-success':!formData.shipping}">
                        <span class="fa fa-building"></span> Retiro en el local
                     </span>
                  </div>
              </div> -->
              <div class="col-12 row form-group-row mb-3">
                  <div class="col-12 col-lg-4">
                    <input  type="radio"
                           v-model="formData.shipping" :value="true"> 
                    <span  @click="formData.shipping=true" class="text-secondary radioText" :class="{'text-success':formData.shipping}">
                        <span class="fa fa-truck"></span> Envio por transporte
                    </span>
                  </div>
               </div> 
       <!--  -->        
        <div class="warnings mb-4 mt-4 d-flex flex-column">

            <span v-if="!formData.shipping" class="warn">*IMPORTANTE: Coordinar con la asesora de ventas antes de ir a buscar el pedido . La demora habitual en que el pedido este listo es de 2 a 10 dias hábiles luego de el informe y acreditación de pago </span>
            
                
            <span class=" warn" v-if="formData.shipping">*El despacho de la mercaderia se realiza de 2 a 10 días hábiles luego del  informe y acreditacion de pago.  </span>
            
            <span class="warn">*Los precios no incluyen IVA</span>

            <span class="warn" v-if="formData.shipping">*Los diseños de los productos se envían en base a lo disponible en la Fabrica, no se pueden elegir ya que son discontinuos.</span>
        </div>

             
            

             
                <div class="col-12 row form-group-row" v-if="!formData.shipping">
                        <label class="col-12 col-lg-4 font-weight-bold" for=""> Donde retiras ? </label>
                        <select v-model="formData.seller" class="form-control col-12 col-lg-4">
                            <option   value="pasteur"> 
                                Sucursal Pasteur 410 - CABA
                            </option>
                           <!--  <option   value="castelli"> 
                                Sucursal Castelli 203 - CABA
                            </option> -->
                        </select>
                </div>

               <div class="col-12 row form-group-row " v-if="admin || !user">
                   <label class="col-12 col-lg-4 font-weight-bold" for="">Nombre y Apellido  </label>
                   <input  required type="text" v-model="formData.client"  class="form-control col-12 col-lg-4">
                </div> 
                 
                <!-- DATOS DE ENVIO -->
                <div v-if="formData.shipping">
                    
                    <div class="col-12 row form-group-row">
                        <label class="col-12 col-lg-4 font-weight-bold" for=""> Provincia </label>
                        <select v-if="states.length > 0" v-model="state" class="form-control col-12 col-lg-4">
                            <option v-for="opt in states" :key="opt.id" :value="opt"> 
                                {{opt.name}}
                            </option>
                        </select>
                    </div>
                    <div class="col-12 row form-group-row">
                        <label class="col-12 col-lg-4 font-weight-bold" for=""> Ciudad </label>
                        <select v-if="state" v-model="formData.city_id" class="form-control col-12 col-lg-4">
                            <option v-for="opt in state.cities" :key="opt.id" :value="opt.id"> 
                                {{opt.name}}
                            </option>
                        </select>
                    </div>
                    <div class="col-12 row form-group-row">
                        <label class="col-12 col-lg-4 font-weight-bold" for=""> Direccion </label>
                        <input  type="text" v-model="formData.address"  class="form-control col-12 col-lg-4">
                    </div>
                    <div class="col-12 row form-group-row">
                        <label class="col-12 col-lg-4 font-weight-bold" for=""> Transporte </label>
                        <input  type="text" v-model="formData.transport"  class="form-control col-12 col-lg-4">
                    </div>
                    <div class="col-12 row form-group-row">
                        <label class="col-12 col-lg-4 font-weight-bold" for=""> Codigo Postal </label>
                        <input  type="text" v-model="formData.cp"  class="form-control col-12 col-lg-4">
                    </div>
                </div>
                <!-- /DATOS DE ENVIO -->
              
               <div class="col-12 row form-group-row"  v-if="admin || !user">
                   <label class="col-12 col-lg-4 font-weight-bold" for="">Email</label>
                   <input required type="email" v-model="formData.email"  class="form-control col-12 col-lg-4">
                </div> 
               <div class="col-12 row form-group-row mt-2 mb-2 align-items-center">
                   <label class="col-11 col-lg-4 offset-1 offset-lg-0 font-weight-bold" > <b> Telefono </b> </label>
                   <div class="col-12 col-lg-6 row">
                       <div class="col-12 col-lg-5 d-flex flex-column">
                           <label >Cod area</label>
                            <input v-model="phone.code" type="text" class="form-control">
                       </div>
                       <div class="col-12 col-lg-7 d-flex flex-column">
                           <label>Numero</label>
                           <input v-model="phone.number" type="text" class="form-control">
                       </div>
                       <div class="col-12 row mt-1">
                           <input type="checkbox" style="height:20px" v-model="phone.whatsapp" class="col-2 form-control">
                           <label class="col-7"> Contactarme por Whatsapp <i class="fab fa-whatsapp"></i>  </label>
                       </div>

                   </div>
                   
                </div> 
               <div class="col-12 row form-group-row">
                   <label class="col-12 col-lg-4 font-weight-bold" for="">Mensaje</label>
                   <textarea v-model="formData.message" name="message" class="form-control col-12 col-lg-4"></textarea>
                </div> 

           
               
                <button class="button btn-block bg-fucsia text-white dabtn col-12 col-lg-8 p-2 mt-2" 
                        @click.prevent.stop="confirmSend">
                        Enviar
                </button>
        </form>
        
        <survey @send="getSurveyData" v-if="showSurvey"></survey>
    </div>
</template>

<script>
import survey from './survey.vue';
export default{
    components:{
        survey
    },
     mounted() {
         var vm=this;
         if(this.user && !this.admin)
         {
             this.formData.client = this.user.name;
             this.formData.email= this.user.email;
             this.$axios.get('/user-last-order')
                .then(r => {
                    let lastOrder = r.data;
                    if(lastOrder)
                    {  
                        this.userHasPrevOrder=true;
                        
                       // vm.formData.phone= lastOrder.phone;
                        vm.formData.shipping=lastOrder.shipping;
                        vm.formData.cp=lastOrder.cp;
                        vm.formData.address=lastOrder.address;
                        vm.formData.transport=lastOrder.transport;
                        
                        vm.states.forEach(s => {
                            let res = s.cities.find(c => {
                                return c.id ==lastOrder.city_id;
                            })
                            if (res){
                                vm.state = s;
                            }
                        })

                        vm.formData.city_id=lastOrder.city_id;
                    }
                });
         }
    if (process.browser) {
      this.$gtag('config', 'AW-873841569', {
        page_title: 'Envianos tu pedido',
        page_path: this.$route.fullPath,
      })
    }
  },
    data(){return{
        userHasPrevOrder:false,
        state:null,
        showSurvey:false,
        phone : {
            code: '',
            number: '',
            whatsapp: false
        },
        formData : {
            seller:null,
            surveyOption:null,
            surveyComment:'',
            shipping:true,
            cp:'',
            address:'',
            transport:'',
            city_id:null,
            message : '',
            phone : '',
            email : '',
            client:'',
            seller:''
        },
    
       
    }},
    computed : {
        UserHasOrders(){
            return this.user && this.user.orders && this.user.orders.length;
        },
        list(){
            return this.$store.getters.getList;
        },
        total(){
            return this.$store.getters.getTotal;
        },
        configs(){
            return this.$store.getters.getConfig;
        },
        minBuy(){
            if(this.admin){
                return 1;
            }else if(this.configs){
                return this.configs.minbuy_ship;
            }
        },
        user(){
            return this.$store.getters.getUser;
        },
        states(){
            return this.$store.getters.getStates;
        }
    },
    
    methods : {
        
            getSurveyData(e){
            this.formData.surveyComment = e.comment;
            this.formData.surveyOption = e.option;
            this.showSurvey=false;
            this.send();
        },
        validateEmail(email) {
          
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          
            return re.test(String(email).toLowerCase());
        },
        formValid()
        {
            if (this.phone.code.length < 2 || this.phone.number.length < 4 ){
                 swal('Hay algo mal con el telefono','','error');
                 return false; 
            }
            else if(!this.formData.client || this.formData.client.trim() == '')
            {
                 swal('El campo "Nombre y Apellido" es obligatorio ','','error');
                 return false; 
            }
            else if (!this.validateEmail(this.formData.email) && !this.admin)
            {
                swal('Hay algo mal con el mail','','error');
                return false;
            }else if (this.list.length <= 0) 
            {   
                swal('No hay productos seleccionados','','error');
                return false;
            } else if (this.total < this.minBuy)
            {
                swal('El minimo de compra es de $'+this.minBuy,'','error');
                return false;
            } else if(!this.formData.shipping && !this.formData.seller.length)
            {
                swal('Por favor, seleccione en que sucursal va a retirar su pedido','','error');
                return false;
            }
            
            else {
            
                return true;
            }
        },
        confirmSend(){
            var vm = this;

            /* Convierto el campo  telefono en un string para formdata */
            let wha = this.phone.whatsapp ? 'Whatsapp' : 'Llamar por telefono'
            this.formData.phone = this.phone.code + ' - ' + this.phone.number + ' - ' +wha;
            

            if (this.formValid()){
                if (this.formData.shipping){

                    swal({
                       title: "Importante!",
                       text: "La eleccion del transporte y el costo de envío corren por cuenta del cliente. Mates fabi no se hace responsable de eventuales daños que pueda ocasionar la empresa de transporte. No despachamos en Oca, Andreani o Correo Argentino por malas experiencias con esos servicios",
                       icon: "warning",
                       buttons: [
                           'Cancelar',
                           'Continuar'
                       ],
                        confirmButtonColor: '#8CD4F5',
                        cancelButtonText: 'Cancel',
                     /*   dangerMode: true, */
                       }).then(function(isConfirm) {
                       if (isConfirm) {
                        
                         if(vm.$gtag){
                            vm.$gtag('event', 'conversion', { 'send_to': 'AW-873841569/xxrPCNrbsrkBEKGH16AD' });
                        } 
                          
                          if(!vm.admin && !vm.userHasPrevOrder)
                           {
                               vm.showSurvey=true;
                           }else{
                               vm.send();
                           }
                       } 
                       });
                }
                else {
                  if(vm.$gtag)
                    {
                        vm.$gtag('event', 'conversion', { 'send_to': 'AW-873841569/xxrPCNrbsrkBEKGH16AD' });
                    } 
                      if(!vm.admin && !vm.userHasPrevOrder  ){
                          vm.showSurvey=true;
                      }else{
                          vm.send();
                      }
                }
               
            }

        },
        compactList(){
            let res = [];
            this.list.forEach(item => {
                let compactItem = {
                    id : item.id,
                    units: item.units
                };
                res.push(compactItem);
                
            });
            return res;
        },
        send(){
                
                var data = this.formData;
            
                let list = this.compactList();
                data.list = JSON.stringify(list);
                data.total = this.total;
                data['_token'] = window.csrf;
                if (data.shipping){
                    data.shipping = 1;
                    data.seller=null;
                } else {data.shipping = 0;}
                
                var vm = this;
                vm.$store.commit('setLoading',true);
                vm.$axios.post('/cotizer/send',data)
                    .then(response => {
                        if(data.shipping){
                            swal('Pedido enviado!',
                             `Aguarda a que te contacten del área de venta para la confirmación de stock. Esto lleva varios días porque estamos trabajando con personal reducido debido a la cuarentena.`,
                             'success')
                                    .then(confirm => {window.location.replace('/')});
                        }
                        else{
                            swal('Pedido enviado!',
                             `Aguarda a que te contacten del área de venta para la confirmación de stock. Esto lleva varios días porque estamos trabajando con personal reducido debido a la cuarentena.`,
                             'success')
                                    .then(confirm => {window.location.replace('/')});
                        }
                    });
        }
    }
    
}

</script>

<style scoped lang="scss">
    .dabtn{
        font-size: 25px;

    }
    .warn{
        font-size: 0.8rem;
        color: red;
        font-style: italic;
    }
</style>