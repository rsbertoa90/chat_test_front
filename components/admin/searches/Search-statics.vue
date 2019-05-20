<template>
    <div>
        <div class="date-selectors w-100 d-flex">
            <div class="d-flex flex-column">
                <label>Fecha desde</label>
                <v-datepicker v-model="startDate" :lang="es"></v-datepicker>
            </div>
            <div class="d-flex flex-column">
                <label>Fecha hasta</label>
                <v-datepicker v-model="endDate" :lang="es"></v-datepicker>
            </div>
        </div>
        <div class="table-container">
            <table class="table table-striped">
                <tbody>
                    <tr v-for="term in filteredHistory" :key="term.term">
                        <td>{{term.term}}</td>
                        <td>{{term.times}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
import Datepicker from 'vuejs-datepicker';
import { es } from 'vuejs-datepicker/dist/locale'
export default {
    components:{
        'v-datepicker':Datepicker
    },
    data(){
        return{
            es:es,
            history:null,
            startDate:new Date(2019,1,1),
            endDate: new Date()
        }
    },
    computed:{
        filteredHistory(){
            if (this.history)
            {
                let res = [];
                this.history.forEach(term => {
                
                    let created = new Date(term.created_at);

                    if (created > this.startDate && created < this.endDate)
                    {
                        let isNew = true;
                        res.forEach(t => {
                            if (t.term == term.term)
                            {
                                isNew =false;
                                t.times++;
                            }
                        });
                        if (isNew){
                            res.push({
                                term:term.term,
                                times:1
                            });
                        }
                    }
                });
                return _.orderBy(res,'times','desc');
            }
        }
    },
    created(){
        this.$http.get('/api/search-history')
            .then(r => {
                this.history =r.data;
            });
    }    
}
</script>


<style lang="scss" scoped>
    .table-container{
        max-width:400px;
        max-height: 50vh;
        overflow-y: auto;
        margin-top:20px;
    }
</style>
