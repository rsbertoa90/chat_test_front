<template>
    <div>
        <div v-if="hidePrices">
            <div v-if="hidePrices && hidePricesMessage" class="pricesHided">
                <p v-html="hidePricesMessage"></p>
            </div>
        </div>

        <div class="m-auto p-4" v-if="!hidePrices">
            <div v-if="onEditMode"  class="fcc">
                <span>Editando pedido del <b> {{editOrder.created_at|date}} </b> de <b> {{editOrder.client|uc}} </b></span>
                <button class="btn-lg btn-block btn-info" @click="saveOrderChanges()">GUARDAR CAMBIOS DE PEDIDO</button>
            </div>
            <div class="fcc mt-4" v-if="editWarnings">
                <div class="warnings text-danger">
                    <p v-html="editWarnings"></p>
                </div>
            </div>            
            <div v-if="!onEditMode" >
                <cotizer-form ></cotizer-form>
            </div>
            <div v-if="list && list.length > 0">
                <pedido ></pedido>
            </div>
            <div v-if="total" class="mt-3">
                <span class="total fucsia">TOTAL: ${{total |price}}</span>
            </div>
            <div v-if="onEditMode" class="mt-4">
                <nuxt-link to="/cotizador" class="btn-lg btn-block btn-info text-center" >AGREGAR MAS PRODUCTOS</nuxt-link>
            </div>
        </div>
    </div>
</template>


<script>
 import pedido from './pedido.vue';
 import cotizerForm from './Cotizer-form.vue'


 import { mapActions } from 'vuex';
 import { mapGetters } from 'vuex';
export default {
    name:'carrito',
   
    components : {pedido,cotizerForm},
    mounted(){
             this.$store.dispatch('fetchConfig');
             console.log('fetchconfig');
    
    },
    computed:{
        editWarnings(){
            return this.$store.getters.getEditWarnings;
        },
        onEditMode(){
            return this.$store.getters.getOnEditMode;
        },
        editOrder(){
            return this.$store.getters.getEditOrder;
        },
        list(){
            return this.$store.getters.getList;
        },
        total(){
            return this.$store.getters.getTotal;
        }
    },
    methods:{
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
        saveOrderChanges(){
            this.$store.commit('setLoading',true);
            let list = this.compactList();
           
            let data={
                order_id:this.editOrder.id,
                list:JSON.stringify(list)
            }
            
            
            this.$axios.put('/edit-order',data)
                .then(
                    r =>{
                        console.log('no errors');
                        this.$store.commit('setOnEditMode',false);
                        this.$store.commit('setEditOrder',null);
                        this.$store.commit('setEditWarnings','');
                        setTimeout(() => {
                            this.$store.dispatch('fetchNVOrders');
                            this.$store.dispatch('fetchOrders');
                            this.$store.commit('setLoading',false);
                            this.$router.push('/admin');
                            }, 2000);
                    },
                    error=>{
                        console.log(error);
            }) 
        }
    }
}
</script>


<style lang="scss" scoped>
    .warnings{
        margin-top:30px;
        padding:15px;
        width:600px;
        margin:auto;
        display: flex;
        border:2px solid red;
        
    }
    .total{
        font-size:35px;
    }

    .pricesHided{
        background-color: #666;
        color:#fff;
        padding:10px;
        font-size: 1.15rem;
    }


</style>
