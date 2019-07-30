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
                            <td>{{order.client}}</td>
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
            canceledLoaded:false,
            status : 'pendiente',
          
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
                this.canceledLoaded=true;
                this.$store.dispatch('fetchCanceledOrders')
                    .then( ()=>{
                        this.status = status;
                        this.selected = null;
                        this.$store.commit('setLoading',false);
                    })
            }else{
                this.status = status;
                this.selected = null;
            }
        }
    },
    mounted(){
         if(!this.orders || this.orders.length < 1){
               this.$store.commit('setLoading',true);
           }
    },
   watch:{
       orders(){
          if(this.orders && this.orders.length > 0){
               
               this.$store.commit('setLoading',false);
           }
       }
   },
    computed : {
        orders(){
            return this.$store.getters.getOrders;
        }
        ,
        filteredOrders(){
            
            if( this.orders ){
               
                var vm = this;
               /*  console.log(this.orders); */
                let res = this.orders.filter(order => {
                    return (order.status == vm.status);
                });

                if(res && this.searchTerm){

                    let st = this.searchTerm.trim().toLowerCase();
                    if (st){
                        res = res.filter(order => {
                            if(order.client){

                                return order.client.trim().toLowerCase().indexOf(st) > -1 ;
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
