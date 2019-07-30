<template>
    <div class="containing row w-100">
        
        <div class="col-12">
            <h4> <span class="fa fa-star"></span> Productos mas vendidos del mes</h4>
            <div>
                <span>ordenar por</span>
                <select v-model="orderby" class="form-control">
                    <option value="presence">Presencia</option>
                    <option value="total">$$</option>
                    <option value="qty">Vendidos</option>
                </select>
            </div>
            <table class="table table-striped">
                <thead>
                    <th> producto </th>
                    <th>presencia</th>
                    <th> cantidad</th>
                    <th>$$</th>
                </thead>
                <tbody>
                    <tr v-for="(d, key) in sortedData" :key="key" @click="selected=d" style="cursor:pointer;">
                        <td>{{d.product.name}}</td>
                        <td>{{d.presence}} </td>
                        <td>{{d.qty}}</td>
                        <td>${{d.total | price}}</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
       
    </div>
</template>


<script>



export default {
    props:['month'],

     
    data(){
        return{
            selected:null,
            history:null,
            orderby:'presence'
          
            

        }
    },
    watch:{
        isSuper()
        {
            if (!this.isSuper){
                window.location.replace('/');
            }
        }
    },   
    methods:{
         formatDate(val){
               let date = new Date(val);
                
                let formatted_date =  date.getDay() + " " + date.getMonth() + " " + date.getFullYear();
           //     console.log(date.getMonth(),this.months[date.getMonth()])
                return formatted_date;
  
        },
    },
    computed:{
        totalorders(){
            let res = 0;
            if (this.tabledata){
                this.tabledata.forEach(item => {
                    res += item.times;
                });
            }
            return res;
        },
        totalmoney(){
            let res = 0;
            if (this.tabledata){
                this.tabledata.forEach(item => {
                    res += item.total;
                });
            }
            return res;
        },
        orders(){
            let res =  this.month.orders;
            if(res && res.length > 0){
                res = res.filter(o => {
                    return (o.status != 'cancelado');
                });
            }
            
            res.forEach(o =>{
                let total = 0;
                o.order_items.forEach(op => {
                    total+=(op.price*op.qty);
                });
                
                o.total=total;
            });
            return res;
            
        },
        sortedData(){
            if(this.tabledata){
                let res = this.orderArray(this.tabledata,this.orderby);
                res = res.reverse();
                return res.slice(1,10);
            }
        },
        tabledata(){
            if (this.orders)
            {
                let res = [];
                this.orders.forEach(order => {
                    order.order_items.forEach(op => {
                        let isNew = true;
                        res.forEach(o => {
                            if (op.product_id == o.product_id)
                            {
                                isNew =false;
                                o.qty+=op.qty;
                                o.total+=op.qty*op.price;
                                o.presence++;
                            }
                        });
                        if (isNew){
                          /*   console.log('new'); */
                            res.push({
                                product_id:op.product_id,
                                product:op.product,
                                presence:1,
                                qty:op.qty,
                                total:op.qty*op.price
                            });
                        }
                    });
                    
                });
                //falta orden<ar
                return res;

            }
        }
    },

    
}
</script>

<style lang="scss" scoped>
.containing{
    min-height: 100vh;
    
}
</style>

