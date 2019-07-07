<template>
    <div>
        <div class="container">
            <h2 clasS="">REPORTE</h2>
            <div class=" row">
                <label for="">Desde</label>
                <input class="form-control col-4" type="text" v-model="min">
            </div>
            <div class="row">
                <label for="">Hasta</label>
                <input class="form-control col-4" type="text" v-model="max">
            </div>
        </div>
        
        <table class="table table-striped">
            <thead>
                <th>Producto</th>
                <th>Vendidos</th>
                <th>Total</th>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td>{{product.name}}</td>
                    <td>{{product.units}}</td>
                    <td> ${{product.total}} </td>
                </tr>
            </tbody>
        </table>

        <hr>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            orders: [],
            
            max : moment().format('DD/MM/Y'),
            min : moment('1900/01/01').format('DD/MM/Y'),
        }
    },
    computed: {
        ordersIn(){
            let res = this.orders.filter(order => {
                return (moment(order.created_at).isAfter(this.min) &&
                        moment(order.created_at).isBefore( this.max ) )
            });
            return res;
        },
        products(){
            return this.orderArray(this.productsList,'total').reverse();
        },
        productsList(){
            var vm = this;
            var prods = [];
            // console.log(this.ordersIn);
            if (this.ordersIn != null && this.ordersIn.length > 0){
                vm.ordersIn.forEach(order => {
                   order.order_products.forEach(op => {
                       var prod = prods.find(p => {
                        //    console.log(p,op,op.product);
                           if (p && op.product){
                               return p.id == op.product.id;
                           }
                       });
                       if (prod != null)
                       {
                            // console.log('not null',prod);
                            prod.units += op.units;
                            prod.total += (op.units * op.price);
                           console.log(prod.total);
                       }
                       else 
                       {
                            // console.log('null',prod);
                           prod = op.product;
                           prod.units = op.units;
                           prod.total = (op.price * op.units);
                            console.log(prod.total);
                           prods.push(prod); 
                       }
                   });
                });
            }

            return prods;
            
        }
       
    },
    created()
    {
        var vm = this;
        this.$axios.get('/api/orders')
            .then(response => {
                vm.orders = response.data;
                
            });
    }
}
</script>
