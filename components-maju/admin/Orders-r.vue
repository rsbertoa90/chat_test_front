<template>
    <div>
        <div class="row">
            
            <div class="col-12 row mt-2">
                   <div class="col-6 col-lg-3 m-0 p-0">
                    <button @click="changestatus('pendiente')" 
                        class="btn btn-block "
                        :class="{'btn-outline-warning':status != 'pendiente',
                                'btn-warning' : status == 'pendiente'}">
                        <fa-icon icon="clock"></fa-icon>
                        Pendientes
                    </button>
                </div>
                 <div class="col-6 col-lg-3 m-0 p-0">
                    <button @click="changestatus('pagado')" 
                        class="btn btn-block"
                        :class="{'btn-outline-success':status != 'pagado',
                                'btn-success' : status == 'pagado'}">
                        <fa-icon icon="dollar-sign"></fa-icon>
                        Pagadas
                    </button>
                </div>
                 <div class="col-6 col-lg-3 m-0 p-0">
                    <button @click="changestatus('enviado')" 
                        class="btn btn-block"
                        :class="{'btn-outline-info':status != 'enviado',
                                'btn-info' : status == 'enviado'}">
                        <fa-icon icon="truck"></fa-icon>
                        Enviadas
                    </button>
                </div>
                <div class="col-6 col-lg-3 m-0 p-0">
                    <button @click="changestatus('cancelado')" 
                        class="btn btn-block"
                        :class="{'btn-outline-danger':status != 'cancelado',
                                'btn-danger' : status == 'cancelado'}">
                      <fa-icon  icon="times"></fa-icon>
                       Canceladas
                    </button>
                </div>
               
            </div>
        </div>
        <div class="col-12 row">
            <div class="col-12 col-lg-4 table-container">
                <table class="table table-striped table-hover"> 
                    <thead>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Visto</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="3">
                                <input type="text" class="form-control" v-model="searchTerm">
                            </td>
                        </tr>
                        <tr  v-for="order in filteredOrders" 
                                :key="'order'+order.id"
                                @click ="selected = order"
                                style="cursor:pointer"
                                :class="{'bg-info' : order == selected}">
                            <td>{{order.created_at | datetime}}</td>
                            <td>{{order.name}}</td>
                            <td> <input type="checkbox" v-model="order.viewed" @change="viewed(order)" class="form-control checkbox"> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-12 col-lg-8 bg-white">
                <app-order @statusChanged="statusChanged" 
                        v-if="selected" :order="selected">
                </app-order>
            </div>
        </div>


    </div>
</template>

<script>
import appOrder from './Order.vue';
export default {
     metaInfo(){return{
        title: 'ADMIN'   }},
        
    components: {
        appOrder
    },
    data(){
        return {
            searchTerm:'',
            orders : [],
            status : 'pendiente',
            source : 'online',
            filtered : [],
            selected : null,

        }
    },
    methods : {
        viewed(order){
            if (order.viewed)
            {
                order.viewed = 1;
            }else { order.viewed = 0;}
            let data = {
                order:order.id,
                id: order.id,
                field: 'viewed',
                value: order.viewed
            }
            this.$axios.put('/admin/order',data);
        },
        setSource(src){
            this.source = src;
            this.selected = null;
        },
        statusChanged(event){
            this.status = event.status;
        },
        changestatus(status)
        {
            this.status = status;
            this.selected = null;
        }
    },
   
    computed : {
        filteredOrders(){
            var vm = this;
            let res = this.orders.filter(order => {
              
                return (order.source == vm.source 
                        && order.status == vm.status);
            });

            let st = this.searchTerm.trim().toLowerCase();
            if (st){
                res = res.filter(order => {
                    return order.name.trim().toLowerCase().indexOf(st) > -1 ;
                });
            }
            if (process.browser){

                res = _.sortBy(res,'created_at');
            }
            res = res.reverse();
         
            return res;
        }
    },
    created(){
        this.$axios.get('/api/orders')
            .then(response => {this.orders = response.data });
        
    },
    filters : {
        datetime(val){
            return moment(val).format('DD/MM/YYYY H:mm')
        }
    }
    
}
</script>

<style>
.checkbox{
    width: 30px;
    height: 20px;
}
    .cursor-pointer {
        cursor: pointer;
    }

 .table-container{
       height: 85vh;
       scroll-behavior: auto;
       overflow-x: hidden;
       overflow-y: auto;
   }
   
</style>
