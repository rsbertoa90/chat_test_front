<template>
    <div class="containing p-4">
       <!--  <div class="date-selectors w-100 d-flex">
            <div class="d-flex flex-column">
                <label>Fecha desde</label>
                <v-datepicker v-model="startDate" :lang="es"></v-datepicker>
            </div>
            <div class="d-flex flex-column">
                <label>Fecha hasta</label>
                <v-datepicker v-model="endDate" :lang="es"></v-datepicker>
            </div>
            <div class="d-flex align-items-end font-weight-bold" >
                <div v-if="totalorders" class="ml-4">
                   Pedidos: {{totalorders}}
                </div>
                <div v-if="totalmoney" clasS="ml-4">
                   Total: ${{totalmoney | price}}
                </div>
            </div>
        </div> -->
        <table class="table table-striped ml-4">
            <thead>
                <th> Fecha </th>
                <th> Pedidos</th>
                <th>Total</th>
            </thead>
            <tbody>
                <tr v-for="(d, key) in sortedData" :key="key">
                    <td>
                        {{d.date.format('MM/YYYY') }}
                    </td>
                    <td>{{d.times}}</td>
                    <td>${{d.total | price}}</td>
                </tr>
                
            </tbody>
        </table>
    </div>
</template>


<script>

import Datepicker from 'vuejs-datepicker';
import { es } from 'vuejs-datepicker/dist/locale'
import datamixin from '../../datamixin.js';
export default {
    mixins:['datamixin'],
     components:{
        'v-datepicker':Datepicker
    },
    data(){
        return{
            es:es,
            history:null,
            startDate:new Date(2018,1,1),
            endDate: new Date(),
            

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
    mounted(){
        if(!this.$store.orders || this.$store.orders.length < 1){
            this.$store.dispatch('fetchOrders');
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
            
            res.forEach(o =>{
                let total = 0;
                o.order_products.forEach(op => {
                    total+=(op.price*op.units);
                });
                
                o.total=total;
            });
            return res;
            
        },
        sortedData(){
            if(this.tabledata){
            
                const Moment = require('moment')
                const array = this.tabledata;
                const sortedArray  = array.sort((a,b) => new Moment(a.rawdate).format('YYYYMMDD') - new Moment(b.rawdate).format('YYYYMMDD'))
                
               /*  console.log(sortedArray); */
                return sortedArray.reverse();
            }
        },
        tabledata(){
            if (this.orders)
            {
               /*  let startDate= moment(this.startDate)
                let endDate =moment(this.endDate); */
               /*  console.log('startdate',startDate);
                console.log('endtdate',endDate);
                 */
                let res = [];
                this.orders.forEach(order => {
                
                 /*    console.log('crudo',order.created_at); */
                  const moment = require('moment')
                    let date = moment(order.created_at);
                   /*  console.log('procesado',date); */
                   
                    /*     console.log('date in range'); */
                        let isNew = true;
                        res.forEach(o => {
                            if (date.format('YYYYMM') == o.date.format('YYYYMM'))
                            {
                         /*        console.log('not new'); */
                                isNew =false;
                                o.times++;
                                o.total=o.total+order.total;
                            }
                        });
                        if (isNew){
                          /*   console.log('new'); */
                            res.push({
                                date:date,
                                times:1,
                                total:order.total,
                                rawdate:order.created_at
                            });
                        }
                    
                });
                return _.orderBy(res,'date','desc');
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

