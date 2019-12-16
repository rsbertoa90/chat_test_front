<template>
    <div class="row">
       
        <div class="col-12">
            <button @click="job('prices-list-job')" class="btn btn-outline-info">  
                Refrescar Lista de Precios
            </button>
        </div>

         <div class="col-12 mt-4">
             <div class="d-flex align-items-center">
                    <button @click="job('catalogo-job')" class="btn btn-outline-info">  
                        Generar Catalogo crudo
                    </button>
                <span class="fa fa-arrow-right"></span>
                    <a target="_blank" class="btn btn-outline-info" 
                        :href="backendpath+'/descargar-catalogo-grande'"> 
                        Desargar catalogo crudo
                    </a>       
                <span class="fa fa-arrow-right"></span>
            
                    <label class="btn btn-md btn-outline-info  mt-2">Subir catalogo comprimido
                        <input type="file" id="file" ref="file" class="display-none" v-on:change="bindFile()"/>
                    </label>
                
                <span class="fa fa-arrow-right" v-if="file"></span>
                    <button class="btn btn-success" v-if="file" @click="submitFile"> Guardar </button>
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
             let vm  =this;
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
       let url = this.catalogoreemplazar == 'con' ? '/replace-catalogo' : '/replace-catalogo-sin-precios'
        this.$store.commit('setLoading',true);
                formData,
            this.$axios.post( url, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(){
            vm.$store.commit('setLoading',false);
           swal('Catalogo subido','veras los cambios reflejados en unos segundos','success');
        })
        .catch(function(){
            vm.$store.commit('setLoading',false);
            swal('!!!!!','Ocurrio un error durante la subida','error');
        });
      },
        uploadcatalogo(){
            let vm=this;
            if(this.fd){
                this.$store.commit('setLoading',true);
                 this.$axios.post('/replace-catalogo', this.fd)
                    .then(res => {
                        setTimeout(() => {
                            vm.$store.commit('setLoading',false);
                        }, 200);
                    });
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
