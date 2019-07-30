<template>
    <div class="containing p-4">
     
        <table class="table table-striped ml-4">
            <thead>
                <th> Fecha </th>
                <th> Pedidos</th>
                <th>Total</th>
            </thead>
            <tbody>
                <tr v-for="(d, key) in sortedData" :key="key">
                    <td>
                        {{d.date }}
                    </td>
                    <td>{{d.times}}</td>
                    <td>${{d.total | price}}</td>
                </tr>
                
            </tbody>
        </table>
    </div>
</template>


<script>
export default {
   
    data(){
        return{
            months:['enero','febrero','marzo','abril','mayo','junio','julio','agosto','setiembre','octubre','noviembre','diciembre'],
            history:null,
            startDate:new Date(2018,1,1),
            endDate: new Date(),
            

        }
    },
    methods:{
        formatDate(val){
               let date = new Date(val);
                
                let formatted_date =  (this.months[date.getMonth()]) + " " + date.getFullYear();
           //     console.log(date.getMonth(),this.months[date.getMonth()])
                return formatted_date;
  
        },
        removeHours(val)
        {
            return val.setHours(0,0,0,0);
        }
    },
    watch:{
        super()
        {
            if (!this.super){
                window.location.replace('/');
            }
        }
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
            let res =  this.$store.getters.getOrders;
            if(res && res.length > 0){
                res = res.filter(o => {
                    return (o.status != 'cancelado');
                });
            }
            if( res && res.length > 0){
                res.forEach(o =>{
                    let total = 0;
                    if(o.order_items){

                        o.order_items.forEach(op => {
                            total+=(op.price*op.qty);
                        });
                    }
                    
                    o.total=total;
                });
            }
            return res;
            
        },
        sortedData(){
           // console.log('why this not uploading on git');
            if(this.tabledata){
            
                
                const array = this.tabledata;
                let res = [];
                res = array.sort((a,b) => {
                    if (a.rawdate < b.rawdate) {
                        return -1;
                    }
                    if (a.rawdate > b.rawdate) {
                        return 1;
                    }
                    // a debe ser igual b
                    return 0;
                });
                
               /*  console.log(sortedArray); */
                return res.reverse();
            }
        },
        tabledata(){
            if (this.orders)
            {
              
                let res = [];
                this.orders.forEach(order => {
                
                 /*    console.log('crudo',order.created_at); */
               
                    let date = new Date(order.created_at)
                    date = this.formatDate(date);
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
                            }
                        });
                        if (isNew){
                            console.log('new',order.created_at);
                            res.push({
                                date:date,
                                times:1,
                                total:order.total,
                                rawdate:order.created_at
                            });
                        }
                    
                });
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

