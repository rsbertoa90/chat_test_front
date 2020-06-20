<template>
    <div class="border border-primary p-3 mt-3">
         <div class="row">
            <div class="col-12 offset-lg-8 col-lg-4 fcc ">
                <a  :href="`${backendpath}/pedido-original/${order.id}`" target="_blank"
                    class="btn btn-block btn-outline-primary" v-if="order.edited">
                    PEDIDO ORIGINAL
                </a>
                <a  :href="`${backendpath}/pdf/${order.id}`" target="_blank"
                    class="btn btn-block btn-outline-primary">
                    PDF <span v-if="order.edited">(editado)</span>
                </a>
            </div>
        </div>
        <div class="row mt-3 mb-3">
            <div class="col-12 col-lg-4" v-if="order.status == 'pagado'">
                <button  @click="setStatus('enviado')"
                    class="btn btn-block btn-outline-info">
                    <fa-icon icon="truck"></fa-icon>
                    Marcar como enviado
                </button>
            </div>
            <div class="col-12 col-lg-4" v-if="order.status != 'pagado' && order.status != 'cancelado'">
                <button  @click="setStatus('pagado')"
                    class="btn btn-block btn-outline-success">
                     <fa-icon icon="dollar-sign"></fa-icon>
                    Marcar como pagado
                </button>
            </div>
            <div class="col-12 col-lg-4" v-if="order.status != 'cancelado'" >
                <button 
                        @click="cancelOrder"
                    class="btn btn-block btn-outline-danger">
                     <fa-icon icon="times"></fa-icon>
                    Marcar como Cancelado
                </button>
            </div>
            <div class="col-12 col-lg-4" v-if="order.status != 'pendiente' && order.status != 'enviado'">
                <button  @click="setStatus('pendiente')"
                    class="btn btn-block btn-outline-warning">
                     <fa-icon icon="clock"></fa-icon>
                    Marcar como Pendiente
                </button>
            </div>
        </div>

        <div>
        
            <div v-if="order.seller=='pasteur'">
                <h2 class="text-info">RETIRA SUCURSAL PASTEUR</h2>
            </div>
            
            <div v-if="order.seller=='castelli'">
                <h2 class="text-success">RETIRA SUCURSAL CASTELLI</h2>
            </div>



            <div v-if="order.status == 'cancelado'">
                <span class="font-weight-bold text-danger">Cancelado: {{order.cancelation}} </span> <br>
                <span v-if="order.comments"
                        class="mt-2"> -- {{order.comments}} -- </span>
            </div>
            <div class="row">
                <div class="col-6 d-flex flex-column">
                    <span class="font-weight-bold text-primary">Fecha: {{order.created_at | datetime}} </span> <br>
                    <span v-if="order.comments"
                            class="mt-2"> -- {{order.comments}} -- </span>
                </div>
                <div class=" col-6">
                    <div class="d-flex justify-content-end">
                        <button @click="editMode" class="btn btn-lg btn-info"> EDITAR PEDIDO </button>
                    </div>
                </div>
            </div>
            <div class="ord-table-container">
                
                    <table class="table table-striped table-bordered mt-3">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="op in order.order_items"
                                :key="'op'+op.product_id">
                                <td> {{op.code}} </td>
                                <td> {{op.name}} </td>
                                <td> ${{op.price | price}} </td>
                                <td> {{op.qty}} </td>
                                <td> ${{op.qty * op.price | price}} </td>
                            </tr>
                        
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td style="color : blue">TOTAL</td>
                                <td style="color : blue"> ${{total | price}} </td>
                                </tr>
                        </tfoot>
                </table>
            </div>
        </div>
        <div>
                <ul>
                    <li v-if="order.user">Pedido hecho por usuario: {{order.user.id}} - {{order.user.name}} </li>
                    <li v-if="order.client">Nombre del cliente: {{order.client}} </li>
                    <li v-if="order.phone">Telefono: {{order.phone}} </li>
                    <li v-if="order.email">Email: {{order.email}} </li>
                    <li v-if="order.message">Mensaje adjunto: {{order.message}} </li>
                </ul>
                <div v-if="order.shipping">
                    <h4>Datos de envío</h4>
                    <ul>
                        <li v-if="state">  Provincia: {{state.name}}</li>
                        <li v-if="city"> Ciudad: {{city.name}} </li>
                        <li> CP: {{order.cp}}  </li>
                        <li> Direccion: {{order.address}} </li>
                        <li>Transporte: {{order.transport}}  </li>
                    </ul>
                </div>
                <div v-else>
                    - Retira en local.
                </div>
        </div>
        <!-- Comentarios -->
          <div class="row mb-4">
            <div class="col-12">
            <hr>
            <label class="label" >Comentarios</label>
            <textarea @input="dirtyComment=true" v-model="order.comments" 
                    class="form-control" rows="5"></textarea>
            </div>
             <div class="d-flex justify-content-end overflow-hidden mb4" >
                <transition enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight">
                    <button @click="saveComments" class="btn btn-info btn-lg" v-if="dirtyComment">Guardar</button>
                </transition>
            </div>
        </div>
       <cancelOrderModal v-if="showModal" :order="order" @close="showModal=false"></cancelOrderModal>
    </div>
</template>

<script>
import cancelOrderModal from './cancelOrderModal.vue'
export default {
    components:{cancelOrderModal},
    props : ['order'],
   data(){return{
       showModal:false,
       dirtyComment:false,
   }},
    methods : {
        editMode(){ 
            this.$store.commit('editMode',this.order);
            this.$router.push('/carrito');
     
        },
        cancelOrder()
        {   
            this.showModal=true;
        },
         saveComments(){
            this.$store.commit('setLoading',true);
            
            let data = {
                order : this.order.id,
                field : 'comments',
                value : this.order.comments
            }
            this.$axios.put('/order',data)
             .then(r=>{
                    if (r.data == 1) {
                        this.dirtyComment = false;
                        this.$store.commit('setLoading',false);
                        swal('Cambio guardado con exito','',"success");
                    }
                })
            .catch(error => {
                let txt = error.response;
                console.log(error.response.data.message);
                this.$store.commit('setLoading',false);
                swal('Error', error.response.data.message,'error');
            });
        },
        setStatus(status){
            var vm = this;
            this.order.status = status;
            var data = {
                order : this.order.id,
                field : 'status',
                value : status
            }
            this.$axios.put('/order',data)
                .then((response) => {
                    vm.$emit('statusChanged',response.data);
                })
        }
    },
    computed : {
        total(){
   
            var tot = 0;
            if (this.order.order_items && this.order.order_items.length > 0){
                this.order.order_items.forEach(op => {
                    tot += (op.price * op.qty);
                });
            }
        
            return tot;
        },
        states(){
            return this.$store.getters.getStates;
        },
        city(){
            var vm=this;
            let res = null;
           if(this.states){

                this.states.forEach(s => {
                  let ct =  s.cities.find(c => {
                       return c.id == vm.order.city_id
                   });
                   if (ct){res=ct}
               });    
           }
            
            return res;
        },
        state(){
            if(this.city){
                return this.states.find(s => {
                    return this.city.state_id == s.id;
                })
            }
        }
    },
     
    

   
}
</script>

<style lang="scss" scoped>
    .ord-table-container{
        width:100%;
        overflow-x:scroll;

    }
</style>