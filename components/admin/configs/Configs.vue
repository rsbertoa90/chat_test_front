<template>
    <div class="row">
         <div class="col-12 mt-4">
            <button @click="job('prices-list-job')" class="btn btn-outline-info">  
                Refrescar Lista de Precios
            </button>
          <!--   <button @click="job('catalogo-job')" class="btn btn-outline-warning">  
                Refrescar Catalogo Digital
            </button> -->
           <!--   <a class="btn btn-outline-danger" target="_blank" :href="backendpath+'/catalogo-grande'">
                    Descargar catalogo crudo
            </a> -->
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
                compra minima online: 
                <input type="number" @change="updateconfig('minbuy_ship')" v-model.lazy="configs.minbuy_ship">
            </div>
        </div>
        <hr>
        <div class="col-12 row">
            <div class="col-12 mt-4" >
                <button v-if="configs && !configs.hide_prices" class="btn btn-outline-danger" @click="toggleMaintenance">Ocultar precios</button>
                <button v-if="configs && configs.hide_prices" class="btn btn-outline-success" @click="toggleMaintenance">Mostrar precios</button>
            </div>
        </div>
        <div class="mt-4 p-2">
           
         <!--    <div>
                <input type="hidden" name="_token" :value="csrf">
                <label class="btn btn-md btn-outline-info mt-3">Subir catalogo comprimido
                   <input type="file" id="file" ref="file" v-on:change="bindFile()"/>
                </label>
              <button  class="btn btn-outline-success" @click="submitFile">Guardar</button> 
            </div>
            -->

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
        bindFile(e){
            this.file = this.$refs.file.files[0];
                       
            },
        
         submitFile(){
        /*
                Initialize the form data
            */
            let formData = new FormData();

            /*
                Add the form data we need to submit
            */
            formData.append('file', this.file);
            formData.append('pdf', this.file);
            console.log(this.file);
        /*
          Make the request to the POST /single-file URL
        */
        this.$store.commit('setLoading',true);
            this.$axios.post( '/replace-catalogo',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(){
            this.$store.commit('setLoading',false);
           swal('Catalogo subido','veras los cambios reflejados en unos segundos','success');
        })
        .catch(function(){
            this.$store.commit('setLoading',false);
            swal('!!!!!','Ocurrio un error durante la subida','error');
        });
      },
        uploadcatalogo(){
            if(this.fd){
                this.$store.commit('setLoading',true);
                 this.$axios.post('/replace-catalogo', this.fd)
                    .then(res => {
                        setTimeout(() => {
                            this.$store.commit('setLoading',false);
                        }, 200);
                    });
            }
        }
       
    }

}
</script>
