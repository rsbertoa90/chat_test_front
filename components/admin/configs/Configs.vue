<template>
    <div class="row">
         <div class="col-12 mt-4">
            <button @click="job('prices-list-job')" class="btn btn-outline-info">  
                Refrescar Lista de Precios
            </button>
            <button @click="job('catalogo-job')" class="btn btn-outline-warning">  
                Refrescar Catalogo Digital
            </button>
          <!--   <a href="/super/failed-jobs" class="btn btn-outline-danger">  
                Failed jobs
            </a> -->
        </div>
        <div class="col-12 row" v-if="configs">
            <div class="col-12 mt-2">
                compra minima local: 
                <input type="number" @change="updateconfig('minbuy')" v-model.lazy="configs.minbuy">
            </div>
            <div class="col-12 mt-2">
                compra minima envios: 
                <input type="number" @change="updateconfig('minbuy_ship')" v-model.lazy="configs.minbuy_ship">
            </div>
        </div>
        <hr>
        <div class="col-12 row">
            <div class="col-12 mt-4" >
                <button v-if="configs && !configs.maintenance" class="btn btn-outline-danger" @click="toggleMaintenance">Ocultar precios</button>
                <button v-if="configs && configs.maintenance" class="btn btn-outline-success" @click="toggleMaintenance">Mostrar precios</button>
            </div>
        </div>
        <div class="mt-4 p-2">
            <form method="post" action="/admin/replace-catalogo" enctype="multipart/form-data">
                <input type="hidden" name="_token" :value="csrf">
                <label class="btn btn-md btn-outline-info mt-3">Subir catalogo comprimido
                    <input @change="catalogosubido=true" style="display:none" type="file" name="catalogo">
                </label>
                <button type="submit" class="btn btn-outline-success" v-if="catalogosubido">Guardar</button>
            </form>
        </div>
        <!-- <div class="col-12 row">
            <admin-slider></admin-slider>
        </div> -->
    </div>
</template>

<script>
import adminSlider from './admin-slider.vue';
export default {
     metaInfo(){return{
        title: 'ADMIN'   }},
    components:{adminSlider},
    data(){
        return {
            
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
            let val = this.configs.maintenance ? 0 : 1;
            let data={
                field:'maintenance',
                value:val
            }
            this.$axios.put('/config',data)
            .then(r => {
                this.$store.dispatch('fetchConfig');
            });
        },
        job(route){
            console.log('route',route);
            this.$axios.get('/'+route)
            .then(res => {
                swal('Procedimiento puesto en cola','Los cambios seran visibles en unos minutos','success');
            });
        },
        updateconfig(field)
        {
            let data = {
                field : field,
                value : this.configs[field],
            };

            this.$axios.put('/config',data);
        },
    }
}

</script>
