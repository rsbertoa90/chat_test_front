<template>
    <div v-if="list && list.length > 0" class="mt-5 order-table-container">
        <h5>Pedido actual:</h5>
        <table class="table table-striped">
            <thead>
                <th>Codigo</th>
                <th>Producto</th>
                <th>Unidades</th>
                <th>Subtotal</th>
                <th>-</th>
            </thead>
            <tbody>
                <tr v-for="product in list" :key="product.id">
                    <td> {{product.code}} </td>
                    <td> {{product.name}} </td>
                    <td>   <qty-field :product="product"></qty-field> </td>
                    <td > ${{ product.price * product.units | price }} </td>
                    <td> <button class="btn btn-sm btn-outline-danger" @click="del(product)"> <span class="fa fa-times"></span> </button> </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import qtyField from '@/components/category/product/qty-field.vue';
export default {
    components:{qtyField},
   computed:{
       list(){
           return this.$store.getters.getList;
       },
       total(){
           return this.$store.getters.getTotal;
       }
   },
    methods:{
        setList(p){
            this.$store.commit('setList',p);
        },
        del(p)
        {
            p.units = 0;
            this.$store.commit('setList',p);
          
        }
    }
}
</script>

<style scoped>
    .table{
        font-size:1rem;
    }

    .order-table-container{
      
        overflow-x:auto;
    }
</style>
