<template>
    <div class="row">
        <div class="col-12 col-lg-6">
            <table class="table table-striped">
                <thead>
                    <th>
                        Mes
                    </th>
                    <th>
                        cancelados
                    </th>
                    <th>
                        $$
                    </th>
                </thead>
                <tbody>
                    <tr class="clickable" @click="selected=d" v-for="d in tdata" :key="d.month"> 
                        <td>
                            {{d.month}}
                        </td>
                        <td>
                            {{d.orders}}
                        </td>
                        <td>${{d.total |price}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="selected" class="col-12 col-lg-6">
            <dayli :data="selected"></dayli>
        </div>
    </div>
</template>


<script>
import dayli from './dayli.vue';
export default {
    components:{dayli},
    data(){
        return{
            selected:null,
            months:['enero','febrero','marzo','abril','mayo','junio','julio','agosto','setiembre','octubre','noviembre','diciembre']

        }
    },
    methods:{
        getMonth(order)
        {
            let d = new Date(order.created_at);
            let m=  d.getMonth();
            let y=  d.getFullYear();
            console.log(y,d);
            return `${this.months[m]} - ${y}`;
        }
    },
    computed:{
        corders()
        {
            return this.$store.getters.getCanceledOrders;
        },
        tdata(){
            console.log(this.corders);
            if(this.corders)
            {
                let res=[];

                this.corders.forEach(order => {
                   let exists =  res.find(r => {
                       return this.getMonth(order) == r.month
                   });

                  
                   if (exists)
                   {
                       exists.orders++;
                       exists.list.push(order);
                       exists.total+=order.total;

                   }
                   else 
                   {
                     
                       let newr = {
                           month:this.getMonth(order),
                           orders:1,
                           list:[order],
                           total:order.total
                       }
                       //console.log(newr);
                       res.push(newr);
                       // console.log(res);
                   }
                })
               // console.log('res');
               // console.table(res);
                return res.reverse();
            }
        }
    }
}
</script>
