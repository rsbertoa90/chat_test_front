<template>
    <div>
        <div class="row mt-2">
            <div class="row d-flex justify-content-end">
                 <div class="col-6 offset-lg-9 col-lg-3 m-0 p-0" v-if="!loadingOrders">
                    <button @click="changestatus('cancelado')" 
                        class="btn btn-block"
                        :class="{'btn-outline-danger':status != 'cancelado',
                                'btn-danger' : status == 'cancelado'}">
                      <fa-icon  icon="times"></fa-icon>
                       Cancelados
                    </button>
                </div>
            </div>
            <div class="col-12 row mt-2">
                <div class="col-6 col-lg-3 m-0 p-0">
                    <button @click="changestatus('nv')" 
                        class="btn btn-block "
                        :class="{'btn-outline-warning':status != 'nv',
                                'btn-warning' : status == 'nv'}">
                        <fa-icon icon="clock"></fa-icon>
                        Pendientes
                    </button>
                </div>
                <div class="col-6 col-lg-3 m-0 p-0" v-if="!loadingOrders">
                    <button @click="changestatus('pendiente')" 
                        class="btn btn-block "
                        :class="{'btn-outline-primary':status != 'pendiente',
                                'btn-primary' : status == 'pendiente'}">
                        <fa-icon icon="clock"></fa-icon>
                        Vistos
                    </button>
                </div>
                 <div class="col-6 col-lg-3 m-0 p-0" v-if="!loadingOrders">
                    <button @click="changestatus('pagado')" 
                        class="btn btn-block"
                        :class="{'btn-outline-success':status != 'pagado',
                                'btn-success' : status == 'pagado'}">
                        <fa-icon icon="dollar-sign"></fa-icon>
                        Pagados
                    </button>
                </div>
                 <div class="col-6 col-lg-3 m-0 p-0" v-if="!loadingOrders">
                    <button @click="changestatus('enviado')" 
                        class="btn btn-block"
                        :class="{'btn-outline-info':status != 'enviado',
                                'btn-info' : status == 'enviado'}">
                        <fa-icon icon="truck"></fa-icon>
                        Enviados
                    </button>
                </div>
                <div class="col-6 col-lg-3 m-0 p-0 ml-4 text-secondary" v-if="loadingOrders">
                    Cargando otros pedidos...
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
                                :class="{'selectedOrder' : order == selected,
                                        'bg-info' : order == selected,
                                        'bg-success' : order.seller=='castelli',
                                        'bg-info' : order.seller=='pasteur'}">
                            <td>{{order.created_at | datetime}}</td>
                            <td>
                                <span class="client-name-container">
                                    {{order.client}}
                                </span>
                            </td>
                            <td> 
                                <div class="d-flex flex-column aling-items-center">
                                    <input type="checkbox" v-model="order.viewed" @change="viewed(order)" class="form-control checkbox"> 
                                    <span v-if="order.viewed_at && isSuper">{{order.viewed_at | datetime}}</span>
                                </div>
                            </td>
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
            canceledLoaded:false,
            status : 'nv',
           
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
            this.$axios.put('/order',data);
        },
        
        statusChanged(event){
            this.status = event.status;
        },
        changestatus(status)
        {
            if(!this.canceledLoaded && status=='cancelado'){
                this.$store.commit('setLoading',true);
                this.$store.dispatch('fetchCanceledOrders')
                    .then( ()=>{
                        this.status = status;
                        this.selected = null;
                        this.$store.commit('setLoading',false);
                        this.canceledLoaded=true;
                    })
            }
            else if(!this.orders || !this.orders.length){
                 this.$store.commit('setLoading',true);
            }
            else{
                this.status = status;
                this.selected = null;
            }
        }
    },
    mounted(){
       
               this.$store.commit('setLoading',true);
               this.$store.dispatch('fetchOrders');
               this.$store.dispatch('fetchNVOrders');
                
           
    },
   watch:{
       nvorders(){
          if(this.nvorders && this.nvorders.length > 0){
               
               this.$store.commit('setLoading',false);
           }
       },
   },
    computed : {
        loadingOrders()
        {
            return (!this.orders || this.orders.length < 1);
        },
        orders(){
            return this.$store.getters.getOrders;
        },
        nvorders(){
            return this.$store.getters.getNVOrders;
        },
        
        filteredOrders(){
            let res=[];
            var vm=this;
            if(this.status=='nv' && this.nvorders){
                 res = this.nvorders;
                
            }
            
            else if( this.orders ){
               
                res = this.orders.filter(order => {
                    return (order.status == vm.status);
                });
            }
            if(res){
                if(res && this.searchTerm){

                    let st = this.normalizeString(this.searchTerm);
                  
                    if (st){
                        res = res.filter(order => {
                            if(order.client){
                                let clientName = this.normalizeString(order.client);
                               
                                return clientName.indexOf(st) > -1 ;
                            }
                        });
                    }
                }
    
                res = this.orderArray(res,'created_at');
                res = res.reverse();
             
                return res;
            }
        }
    },
  
    
    
}
</script>

<style>
.client-name-container
{
    display: flex;
    max-width: 170px;
    word-wrap: break-word;
    white-space: normal;
}
.selectedOrder{
    border: 1px solid #000;
    background-color: #2233ff55;

}
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
