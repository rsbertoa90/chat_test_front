<template>
    <div v-if="startDate && endDate">
        <no-ssr>

            <div class="date-selectors w-100 d-flex">
                <div class="d-flex flex-column">
                    <label>Fecha desde</label>
                    <v-datepicker v-model="startDate" lang="es" ></v-datepicker>
                </div>
                <div class="d-flex flex-column">
                    <label>Fecha hasta</label>
                    <v-datepicker v-model="endDate" lang="es" ></v-datepicker>
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
        </no-ssr>
    </div>
</template>


<script>

export default {
   
    data(){
        return{
            
            history:null,
            startDate:new Date(2019,1,1),
            endDate:new Date()
        }
    },
    computed:{
        filteredHistory(){
            if(process.browser){

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
                    res  = res.sort((a,b)=>{
                        return b.times - a.times
                    })
                    return res;
                    
                }
            }
        }
    },
    
    
    mounted(){
     
        this.$store.commit('setLoading',true);
        this.$axios.get('/search-history')
            .then(r => {
                this.history =r.data;
                this.$store.commit('setLoading',false);
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
