<template>
<div>
    <piechart v-if="chartdata" :chartdata="chartdata" class="clickable"></piechart>
    
</div>
</template>

<script>
import piechart from './piechart.vue'
export default {
    props:['month'],
    components:{piechart},
    data(){
        return{
           
            comms:null,
              labels: [  'No poder elegir modelos y colores',
                                'No poder pagar con tarjeta',
                                'Por demora en confirmar el stock',
                                'Por demora en armado y envio de pedido',
                                'Es un pedido de prueba',
                                'Otro'],
        }
    },
    computed:{
        chartdata(){
            if(this.datas){
                return  {
        
                    labels: this.labels,
                    datasets: [
                        {
                            label: "Data",
                            backgroundColor: ["#41B883", "#00D8FF", "#E46651",'#990000','#009900','#000099'],
                            data: this.datasetdata
                        },
                    
                    ]
                }
            }
        },
        datasetdata(){
             let res = [0,0,0,0,0,0];
          this.month.list.forEach(order => {
              console.log(order.cancelation);
              let i = this.labels.indexOf(order.cancelation);
              if(i<0){
                  i=5;
              }
              res[i]++;
          })
          console.log(res);
         return res;
        }
        
    },
 
       
    
   
}
</script>

<style scoped>
    .clickable{
        cursor:pointer;
    }
</style>
