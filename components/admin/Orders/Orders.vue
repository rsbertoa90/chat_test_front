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
                                <input type="text" class="form-control" placeholder="BUSCAR" v-model="searchTerm">
                            </td>
                        </tr>
                        <tr  v-for="order in filteredOrders" 
                                :key="'order'+order.id"
                                @click ="selected = order"
                                style="cursor:pointer"
                                :class="{'bg-info' : order == selected}">
                            <td>{{order.created_at | datetime}}</td>
                            <td>{{order.client}}</td>
                            <td>  <input type="checkbox" 
                                       v-model="order.viewed"
                                       @change="update(order)" > </td>
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
     metaInfo(){return{
        title: 'ADMIN'   }},
    components: {
        appOrder
    },
    data(){
        return {
            searchTerm:'',
           
            status : 'pendiente',
            filtered : [],
            selected : null,

        }
    },
    methods : {
       update(order){
           if (order.viewed){
               order.viewed = 1;
           }else {order.viewed=0;}
            let data = {
                order : order.id,
                field : 'viewed',
                value : order.viewed
            }
            this.$http.put('/admin/order',data);
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
        orders(){
            return this.$store.getters.getOrders;
        },
        filteredOrders(){
            if(this.orders){

            
            var vm = this;
            let res = this.orders.filter(order => {
              
                return (order.status == vm.status);
            });
            
            if ( vm.searchTerm.trim().length > 2 )
            {
                res = res.filter(order => {
                    let searchTerm = vm.searchTerm.trim().toLowerCase();
                    
                    let client = '';
                    if (order.client){
                         client = order.client.trim().toLowerCase();
                    }
                    
                    let email='';
                    if(order.email){
                          email = order.email.trim().toLowerCase();
                    }
                    
                    return (client.indexOf(searchTerm) > -1
                            || email.indexOf(searchTerm) > -1);
                });
            }

            res = _.sortBy(res,'created_at');
            res = res.reverse();
         
            return res;
            }
        }
    },
    
    filters : {
        datetime(val){
            return moment(val).format('DD/MM/YYYY H:mm')
        }
    }
    
}
</script>

<style scoped lang="scss">
    input[type="checkbox"]{
        height: 20px;
        width: 20px;
    }
    .cursor-pointer {
        cursor: pointer;
    }
   
   .table-container{
       height: 85vh;
       max-width: 350px;
       white-space: normal;
       word-wrap: break-word;
       scroll-behavior: auto;
       overflow-x: hidden;
       overflow-y: auto;
       td,th{
           max-width: 130px;
       }
   }
</style>
