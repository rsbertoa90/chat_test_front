<template>
    <div class="containing row w-100 p-4">
        
        <div class="col-12">

          
            <table class="table table-striped">
                <thead>
                    <th> Fecha </th>
                    <th> Pedidos</th>
                    <th>Total de la fecha</th>
                </thead>
                <tbody>
                    <tr v-for="(d, key) in sortedData" :key="key" @click="selected=d" style="cursor:pointer;">
                        <td>
                            {{d.date }}
                        </td>
                        <td>{{d.times}}</td>
                        <td>${{d.total | price}}</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
        <div class="col-12">
            <starProducts :month="month"></starProducts>
        </div>
    </div>
</template>


<script>
import starProducts from './star-products.vue';

export default {
    props:['month'],
    
  components:{starProducts},
    data(){
        return{
            selected:null,
            history:null,
          
            

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
                
                let formatted_date =  date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
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
                let res = this.orderArray(this.tabledata,'rawdate');
                res = res.reverse();
                return res;
            }
        },
        tabledata(){
            if (this.orders)
            {
                let res = [];
                this.orders.forEach(order => {
                
                 /*    console.log('crudo',order.created_at); */
                     let date = this.formatDate(order.created_at);
                   /*  console.log('procesado',date); */
                    /*     console.log('date in range'); */
                        let isNew = true;
                        res.forEach(o => {
                            if (date == o.date)
                            {
                         /*        console.log('not new'); */
                                isNew =false;
                                o.times++;
                                o.total=o.total+order.total;
                                o.detail.push(order);
                            }
                        });
                        if (isNew){
                          /*   console.log('new'); */
                            res.push({
                                date:date,
                                times:1,
                                total:order.total,
                                rawdate:order.created_at,
                                detail:[order]
                            });
                        }
                    
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

