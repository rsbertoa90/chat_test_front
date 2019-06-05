<template>
    <div>
        <div class="row">
            
            <div class="col-12 row mt-2">
                   <div class="col-6 col-lg-3 m-0 p-0">
                    <button @click="changestatus('pendiente')" 
                        class="btn btn-block "
                        :class="{'btn-outline-warning':status != 'pendiente',
                                'btn-warning' : status == 'pendiente'}">
                        <span class="far fa-clock"></span>
                        Pendientes
                    </button>
                </div>
                 <div class="col-6 col-lg-3 m-0 p-0">
                    <button @click="changestatus('pagado')" 
                        class="btn btn-block"
                        :class="{'btn-outline-success':status != 'pagado',
                                'btn-success' : status == 'pagado'}">
                        <span class="fa fa-dollar-sign"></span>
                        Pagadas
                    </button>
                </div>
                 <div class="col-6 col-lg-3 m-0 p-0">
                    <button @click="changestatus('enviado')" 
                        class="btn btn-block"
                        :class="{'btn-outline-info':status != 'enviado',
                                'btn-info' : status == 'enviado'}">
                        <span class="fa fa-truck"></span>
                        Enviadas
                    </button>
                </div>
                <div class="col-6 col-lg-3 m-0 p-0">
                    <button @click="changestatus('cancelado')" 
                        class="btn btn-block"
                        :class="{'btn-outline-danger':status != 'cancelado',
                                'btn-danger' : status == 'cancelado'}">
                      <span class="fa fa-times"></span>
                       Canceladas
                    </button>
                </div>
               
            </div>
        </div>
        <div class="col-12 row">
            <div class="col-12 col-lg-4">
                <table class="table table-striped table-hover"> 
                    <thead>
                        <th>Fecha</th>
                        <th>Cliente</th>
                    </thead>
                    <tbody>
                        <tr  v-for="order in filteredOrders" 
                                :key="'order'+order.id"
                                @click ="selected = order"
                                style="cursor:pointer"
                                :class="{'bg-info' : order == selected}">
                            <td>{{order.created_at | datetime}}</td>
                            <td>{{order.client}}</td>
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
import appOrder from './order.vue';
export default {
    components: {
        appOrder
    },
    data(){
        return {
            status : 'pendiente',
            filtered : [],
            selected : null,

        }
    },
    methods : {
       
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
        orders(){
            return this.$store.getters.getOrders;
        },
        filteredOrders(){
            if(this.orders){

                var vm = this;
                let res = this.orders.filter(order => {
                  
                    return (order.status == vm.status);
                });
                res = _.sortBy(res,'created_at');
                res = res.reverse();
             
                return res;
            }
        }
    },
    mounted(){
        this.$store.dispatch('fetchOrders');
    },
    
    
}
</script>

<style>
    .cursor-pointer {
        cursor: pointer;
    }
   
</style>
