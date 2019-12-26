<template>
    <div class="row">
       
        <div class="col-12">
            <h2 v-if="ppl">
                Hay {{ppl.length}} personas inscriptas en el sorteo
            </h2>
        </div>

         <div class="col-12 mt-4">
             <div class="d-flex align-items-center">
                    <button @click="job('sorteo-pdf')" class="btn btn-outline-info">  
                        Generar cupones en PDF
                    </button>
                <span class="fa fa-arrow-right"></span>
                    <a target="_blank" class="btn btn-outline-info" 
                        :href="backendpath+'/descargar-cupones-sorteo'"> 
                        Descargar PDF cupones
                    </a>       
             </div>
        </div>

        <div class="col-12 mt-4">
            <div class="fcc row">
                <div class="col-3">
                    <span>Buscar por DNI</span>
                    <input type="text" class="form-control" v-model="dnis">
                </div>
                <div class="col-4" v-if="sresult">
                    <div class="fcc">
                        <div>{{sresult.name}} {{sresult.lastname}}</div>
                        <div>DNI: {{sresult.dni}}</div>
                        <div>Whatsapp: {{sresult.wha}}</div>
                    </div>
                </div>
            </div>
        </div>
       
      

       
    </div>
</template>

<script>
export default {
     metaInfo(){return{
        title: 'ADMIN'   }},
    data(){
        return {
            dnis:0,
            sresult:null,
            ppl:null,
            catalogoreemplazar:'con',
            file:null,
            catalogosubido:false,
            csrf:window.csrf,
          
            
        }
    },
    computed:{
        configs(){
            return this.$store.getters.getConfig;
        }
    },
    methods:{
        toggleMaintenance(){
            let val = this.configs.hide_prices ? 0 : 1;
            let data={
                field:'hide_prices',
                value:val
            }
            this.$axios.put('/config',data)
            .then(r => {
                this.$store.dispatch('fetchConfig');
            });
        },
        job(route){
            this.$store.commit('setLoading',true);
            //console.log('route',route);
            this.$axios.get('/'+route)
            .then(res => {
                this.$store.commit('setLoading',false);
                swal('Procedimiento puesto en cola','Los cambios seran visibles en unos minutos','success');
            });
        },
      
    },
    mounted(){
        this.$axios.get('/sorteo')
            .then(r=>{
               this.ppl = r.data;
            })
    },
    watch:{
        dnis()
        {
            let res = this.ppl.find(p => {
                return p.dni == this.dnis
            })
            if (res)
            {
                this.sresult = res;
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.btn{
    cursor:pointer;
}
.display-none{
    display: none;
}
</style>
