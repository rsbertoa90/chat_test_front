<template>
<div>
    <piechart v-if="chartdata" :chartdata="chartdata" @clicked="clicked" class="clickable"></piechart>
    <br>
    <div class="mt-4" v-if="comms">
        <p v-for="c in comms" :key="c">
            {{c}}
        </p>
    </div>
</div>
</template>

<script>
import piechart from './piechart.vue'
export default {
    components:{piechart},
    data(){
        return{
            surveys:null,
            comms:null
        }
    },
    mounted(){
        this.$axios.get('/surveys')
            .then(r => {
                this.surveys = r.data;
             
            });
    },
    computed:{
        chartdata(){
            if(this.datas){
                return  {
                    labels: ['Bueno', 'Regular','Malo'],
                    datasets: [
                        {
                        label: "Data",
                            backgroundColor: ["#41B883", "#00D8FF", "#E46651"],
                            data: this.datas
                        },
                    
                    ]
                }
            }
        },
        datas(){

            if(this.surveys){
            
                let bueno = 0;
                let malo = 0;
                let regular = 0;
                this.surveys.forEach(s => {
                    if (s.option == 'Bueno'){
                        bueno++
                    } 
                    if (s.option == 'Regular'){
                        regular++
                    } 
                    if (s.option == 'Malo'){
                        malo++
                    } 
                })
              //  console.log(bueno,regular,malo);
                return [bueno,regular,malo]
            } 
        },
        comments(){
            if(this.surveys){
            
                let bueno = [];
                let malo = [];
                let regular = [];
                this.surveys.forEach(s => {
                    if (s.option == 'Bueno' && s.comment){
                        bueno.push(s.comment)
                    } 
                    if (s.option == 'Regular' && s.comment){
                        regular.push(s.comment)
                    } 
                    if (s.option == 'Malo' && s.comment){
                        malo.push(s.comment)
                    } 
                    
                })
              //  console.log(bueno,regular,malo);
                return [bueno,regular,malo]
            } 
        }
    },
    methods:{
        cleanSurveys(){
           
        },
        clicked(e)
        {
          this.comms = this.comments[e.index];
    
        }
    }
}
</script>

<style scoped>
    .clickable{
        cursor:pointer;
    }
</style>
