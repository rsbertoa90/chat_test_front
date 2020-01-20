<template>
    <dir class="row">
        <div class="col-3">
            <div class="d-flex flex-column">
                <button class="btn" @click="selected='all'" :class="{
                    'btn-success':selected=='all','btn-info':selected!='all'}">
                    Todo
                </button>
                <button @click="selected=month"  v-for="month in monthsSelect" :key="month.id" class="btn mt-2" :class="{
                    ' btn-success':selected==month,'btn-info':selected!=month }">
                    {{month.date}}
                </button>
            </div>
        </div>
        <div class="col-9">
            <div v-if="selected=='all'" id="piechartAll" key="piechartAll">
                <piechartcontainer :surveys="surveys"></piechartcontainer>
            </div>
            <div v-else :id="`piechart-${selected.id}`"  :key="`piechart-${selected.id}`">
                <piechartcontainer :surveys="selected.surveys"></piechartcontainer>
            </div>
        </div>
    </dir>
</template>

<script>
import piechartcontainer from './piechartcontainer.vue'
export default {
    components:{piechartcontainer},
    data(){
        return{
            selected:'all',
            surveys:null,
            months:['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
        }
    },
    computed:{
     
        monthsSelect(){
            if(this.surveys)
            {
                let res=[];
                console.log(this.months);

                this.surveys.forEach(s => {
                    let date = new Date(s.created_at);
                   
                    let month = this.months[date.getMonth()];
                    let year = date.getFullYear();
                    let entrydate = `${month} ${year}`
                    console.log('entrydate',entrydate);
                    let exists = res.find(r => {
                        console.log('reg date',r.date);
                        return r.date == entrydate
                    });
                    if(exists){
                        exists.surveys.push(s);
                    }
                    if (!exists)
                    {
                        let entry = {
                            date:entrydate,
                            surveys:[s],
                            id:`${month}${year}`
                        }
                        res.push(entry);
                    }
                });
               // console.log(res);
                return res;
            }
        }
    },
    mounted(){
        this.$axios.get('/surveys')
            .then(r => {
                this.surveys = r.data;
               // console.log(this.surveys);
            });
    },
    


}
</script>
