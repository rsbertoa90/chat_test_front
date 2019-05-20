<template>
    <div class="border border-primary p-3 mt-3">
        <div>
            <div class="row">
                <div class="col-12">
                    <span class="font-weight-bold text-primary">Fecha: {{order.created_at | datetime}} </span> <br>
                </div>
                <div class="col-12">
                    <span class="font-weight-bold text-primary" v-if="order.seller">Vendedor: {{order.seller}} </span>
                </div>
                <div class="col-12">
                
                <span class="font-weight-bold text-primary mt-2"  
                        v-if="order.message" >Mensaje adjunto: " {{order.message}} " </span>
                </div>
            </div>
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
                    <td style="color : blue"> ${{total |price}} </td>
                    </tr>
            </tfoot>
        </table>
        </div>
        <div>
                <ul>
                    <li v-if="order.client">Nombre del cliente: {{order.client}} </li>
                    <li v-if="order.phone">Telefono: {{order.phone}} </li>
                    <li v-if="order.email">Email: {{order.email}} </li>
                    <li v-if="order.message">Mensaje adjunto: {{order.message}} </li>
                </ul>
        </div>
         <div v-if="order.shipping">
                    <h4>Datos de envío</h4>
                    <ul>
                        <li v-if="city">  Provincia: {{city.state.name}} </li>
                        <li v-if="city"> Ciudad: {{city.name}} </li>
                        <li> CP: {{order.cp}}  </li>
                        <li> Direccion: {{order.address}} </li>
                        <li>Transporte: {{order.transport}}  </li>
                    </ul>
         </div>
         <div v-else>
                    - Retira en local.
          </div>


        <div class="row">
            <div class="col-12 offset-lg-9 col-lg-3">
                <a  :href="`/admin/pdf/${order.id}`" target="_blank"
                    class="btn btn-block btn-outline-primary">
                    Generar PDF
                </a>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12 col-lg-4" v-if="order.status == 'pagado'">
                <button  @click="setStatus('enviado')"
                    class="btn btn-block btn-outline-info">
                    <span class="fa fa-truck"></span>
                    Marcar como enviado
                </button>
            </div>
            <div class="col-12 col-lg-4" v-if="order.status != 'pagado' && order.status != 'cancelado'">
                <button  @click="setStatus('pagado')"
                    class="btn btn-block btn-outline-success">
                     <span class="fa fa-dollar-sign"></span>
                    Marcar como pagado
                </button>
            </div>
            <div class="col-12 col-lg-4" v-if="order.status != 'cancelado'" >
                <button 
                        @click="setStatus('cancelado')"
                    class="btn btn-block btn-outline-danger">
                     <span class="fa fa-times"></span>
                    Marcar como Cancelado
                </button>
            </div>
            <div class="col-12 col-lg-4" v-if="order.status != 'pendiente' && order.status != 'enviado'">
                <button  @click="setStatus('pendiente')"
                    class="btn btn-block btn-outline-warning">
                     <span class="far fa-clock"></span>
                    Marcar como Pendiente
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
            <hr>
            <label class="label" >Comentarios</label>
            <textarea @change="saveComments" v-model.lazy="order.comments" 
                    class="form-control" rows="5"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props : ['order'],
    data(){
        return {
            city:null
        }        
    },
    methods : {
        saveComments(){
            let data = {
                order : this.order.id,
                field : 'comments',
                value : this.order.comments
            }
            this.$http.put('/admin/order',data);
        },
        setStatus(status){
            var vm = this;
            this.order.status = status;
            var data = {
                order : this.order.id,
                field : 'status',
                value : status
            }
            this.$http.put('/admin/order',data)
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
                    tot+= (op.price * op.qty);
                });
            }
        
            return tot;
        }
    },
     filters : {
        datetime(val){
            return moment(val).format('DD/MM/YYYY H:mm')
        }
    },
    created(){
        var vm = this;
        if (this.order.shipping)
        {
            this.$http.get('/api/city/'+vm.order.city_id)
                .then(res => {
                    vm.city = res.data;
                });
        }
    }
}
</script>

