<template>
    <div v-if="list && list.length > 0" class="mt-5 p-lg-4">
        <h5>Detalle de tu pedido:</h5>
        <div class="table-container">
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
                        <td>  <input type="number" class="form-control" style="width:100px" v-model.lazy="product.units" @change="updateList(product)" > </td>
                        <td v-if="product.units < product.pck_units"> ${{ product.price * product.units | price }} </td>
                        <td v-else> ${{ product.pck_price * product.units | price }} </td>
                        <td> <button class="btn btn-sm btn-outline-danger" @click="del(product)"> <fa-icon icon="times"></fa-icon> </button> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="total" v-if="total">
           TOTAL ${{ total |price }}
        </div>
    </div>
</template>

<script>
export default {
   computed:{
       list(){
           return this.$store.getters.getList;
       },
       total(){
           return this.$store.getters.getTotal;
       }
   },
    methods:{
        getMinUnits(product){
            return (product.price == 0) ? product.pck_units : 1 ;
        },
        updateList(product)
        {
          //  console.log(product.name,product.units)
            if(product.units < this.getMinUnits(product))
            {
                swal('Cuidado:',`El mínimo de venta de ${product.name} es ${this.getMinUnits(product)} unidades`,'error');
            }
            this.$store.commit('setList',product);
        },
        del(product)
        {
            product.units = 0;
            this.$store.commit('setList',product);
          
        }
    }
}
</script>

<style scoped>
    .total{
        max-width:300px;
        padding:7px;
        border:4px solid #D52B1E;
        color:#D52B1E;
        font-size:2rem;
        display: flex;
        justify-content: center;
        align-items:center;
        border-radius:15%;
    }
    .table .td{
        font-size:1rem;
        margin-left: -2%;
    }
    .form-control{
        max-width: 80px;
    }

     .form-control{
        max-width: 80px;
    }
    .table-container{
        padding:10px;
    }
    @media(max-width:600px){
        .table-container{
            padding:0;
            overflow-x:auto;
            
        }
        .table {
            font-size:0.65rem;
        }
    }
    
</style>
