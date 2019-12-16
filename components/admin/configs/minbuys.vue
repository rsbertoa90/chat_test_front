<template>
    <div class="row">
         <div class="col-12 row">
            <div class="col-12 " >
                <button v-if="configs && !configs.hide_prices" class="btn btn-outline-danger" @click="toggleMaintenance">Ocultar precios</button>
                <button v-if="configs && configs.hide_prices" class="btn btn-outline-success" @click="toggleMaintenance">Mostrar precios</button>
            </div>
        </div>
        
        <div class="col-12 row mt-4" v-if="configs">
            <div class="col-12 mt-2 f20">
                compra minima local: 
                <input type="number" @change="updateconfig('minbuy')" v-model.lazy="configs.minbuy">
            </div>
            <div class="col-12 mt-2 f20">
                compra minima online: 
                <input type="number" @change="updateconfig('minbuy_ship')" v-model.lazy="configs.minbuy_ship">
            </div>
        </div>
    
       
      

      
    </div>
</template>

<script>

export default {
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
.f20{
    font-size: 20px;
}
</style>
