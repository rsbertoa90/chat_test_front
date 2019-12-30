<template>
<div>
    <piechart v-if="chartdata" :chartdata="chartdata" @clicked="clicked" class="clickable"></piechart>
    <br>
    <div class="row mt-4">
         <table class="table table-striped">
            <tbody>
                <tr v-for="c in percents" :key="c">
                    <td >
                        {{c.option}}
                    </td>
                    <td >
                        {{c.percent|price}}%
                    </td>
                    <td>{{c.n}}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>TOTAL</td>
                    <td v-if="surveys">{{surveys.length}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="mt-4" v-if="comments">
        <table class="table table-striped">
            <tbody>
                <tbody v-for="(r,i) in comments" :key="'asd'+i">
                    <tr v-for="c in r" :key="c">
                        <td >
                            {{options[i]}}
                        </td>
                        <td >
                            {{c}}
                        </td>
                    </tr>
                </tbody>
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
            options:  ['Facebook', 'Google','Locales en Once', 'Me lo recomendo un/a amigo/a','Otro'],
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
                    labels: this.options,
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
        percents(){
            if(this.datas)
            {
             let   totalsurveys = this.surveys.length;
                let res = [];
                let i=0;
                this.options.forEach(o => {
                    let percent =( this.datas[i] / totalsurveys)*100;
                   
                   let topush = {
                        option:this.options[i],
                        n:this.datas[i],
                        percent: percent
                    }
                   res.push(topush);
                    i++;
                });
                return res;

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
