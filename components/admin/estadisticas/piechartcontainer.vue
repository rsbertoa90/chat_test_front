<template>
<div>
    <piechart v-if="chartdata" :chartdata="chartdata" @clicked="clicked" class="clickable"></piechart>
    <br>

    <div class="mt-4" v-if="comms">
        <table class="table table-striped">
            <tbody>
                <tr v-for="c in comms" :key="c">
                    <td >
                        {{c}}
                    </td>
                </tr>
            </tbody>
        </table>
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
                    labels: ['Facebook', 'Google','Locales en Once', 'Me lo recomendo un/a amigo/a','Otro'],
                    datasets: [
                        {
                        label: "Data",
                            backgroundColor: ["#3b5998", "#DB4437", "#0F9D58",'#F4B400','#ccc'],
                            data: this.datas
                        },
                    
                    ]
                }
            }
        },
        datas(){

            if(this.surveys){
            
                let f = 0;
                let g = 0;
                let l = 0;
                let r = 0;
                let o = 0;
                this.surveys.forEach(s => {
                    if (s.option == 'Facebook'){
                        f++
                    } 
                    if (s.option == 'Google'){
                        g++
                    } 
                    if (s.option == 'Locales en Once'){
                        l++
                    } 
                    if (s.option == 'Me lo recomendo un/a amigo/a'){
                        r++
                    } 
                    if (s.option == 'Otro'){
                        o++
                    } 
                })
              //  console.log(bueno,regular,malo);
                return [f,g,l,r,o];
            } 
        },
        comments(){
            if(this.surveys){
            
                let f = [];
                let g = [];
                let l = [];
                let r = [];
                let o = [];
                
                this.surveys.forEach(s => {
                    if (s.option == 'Facebook' && s.comment){
                        f.push(s.comment)
                    } 
                    if (s.option == 'Google' && s.comment){
                        g.push(s.comment)
                    } 
                    if (s.option == 'Locales en Once' && s.comment){
                        l.push(s.comment)
                    } 
                    if (s.option == 'Me lo recomendo un/a amigo/a' && s.comment){
                        r.push(s.comment)
                    } 
                    if (s.option == 'Otro' && s.comment){
                        o.push(s.comment)
                    } 
                    
                })
              //  console.log(bueno,regular,malo);
                return [f,g,l,r,o];
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
