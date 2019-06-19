<template>
<div>
    

    <div>
        <a href="/admin/prices-list-job" class="btn btn-md btn-outline-info" > Refrescar lista de precios </a>
    </div>
    <div>
        <a href="/admin/catalogo-job" class="btn btn-md btn-outline-info" > Refrescar catalogo </a>
    </div>
    <div>
        <a href="/admin/failed-jobs" class="btn btn-md btn-outline-danger" > failed jobs </a>
    </div>

    <div class="row" v-if="configs">
        <div class="col-12">
            minimo compra en local
            <input type="number" v-model.lazy="configs.minbuy" @change="updateconfigs('minbuy')">
        </div>
        <div class="col-12">
            minimo compra envios
            <input type="number" v-model.lazy="configs.minbuy_ship" @change="updateconfigs('minbuy_ship')">
        </div>
    </div>

    <div>
        <form method="post" action="/admin/replace-catalogo" enctype="multipart/form-data">
            <input type="hidden" name="_token" :value="csrf">
            <label class="btn btn-md btn-outline-info mt-3">Subir catalogo comprimido
                <input @change="catalogosubido=true" style="display:none" type="file" name="catalogo">
            </label>
            <button type="submit" class="btn btn-outline-success" v-if="catalogosubido">Guardar</button>
        </form>
    </div>
    <div class="row">
        
        <div class="d-flex flex-column col-12 col-lg-6 ">
            <h3>Generar catalogo de una categoria:</h3>
            <select  class="form-control" v-model="selectedCategory">
                <option v-for="cat in categories" :key="cat.id" :value="cat">
                    {{cat.name}}
                </option>
            </select>
            <button v-if="selectedCategory" class="btn btn-outline-info" @click="categoryCatalog()"> Generar PDF </button>
            <a target="_blank" href="/CATEGORY-catalogo.pdf" class="mt-2 btn btn-outline-success">Descargar</a>
            <span v-if="selectedCategory"> Link:  <a :href="selectedCategory.slug"> https://mayoristamaju.com{{selectedCategory.slug}} </a> </span>
        </div>

      
    </div>

    <hr>

    <div v-if="meta" class="container m-auto">
       <!--  <a target="_blank"  href="/admin/catalogo" class="button btn btn-block btn-danger">CATALOGO</a> -->
       <br/>
        <form>
            <div class="row">
                <label class="col-12 col-lg-4" for="">Meta titulo</label>
                <textarea  @change="update('metatitle')" 
                    v-model.lazy="meta.metatitle" rows="2" 
                    class="form-control col-12 col-lg-6"></textarea>
            </div>
            <div rg="row">
                <label class="col-12 col-lg-4"> Meta descripcion </label>
                <textarea  @change="update('metadescription')" 
                    v-model.lazy="meta.metadescription" rows="5"
                    class="form-control col-12 col-lg-6"></textarea>
            </div>
        </form>
    </div>
    <hr>
    <hr>
    
    <div>
        <admin-categories></admin-categories>
    </div>
    <div>
        <admin-customtexts></admin-customtexts>
    </div>
</div>
</template>

<script>
import adminCategories from './Categories.vue';
import adminCustomtexts from './customs.vue';
export default {
     metaInfo(){return{
        title: 'ADMIN'   }},
        
    components:{adminCategories, adminCustomtexts},
    data(){
        return {
            meta:null,
            catalogosubido:false,
            csrf:window.csrf,
            categories:null,
            selectedCategory:null,
            configs:null,
        }
    },

    created(){
        var vm =this;
        this.$axios.get('/api/metadata/home')
            .then(response => {
                vm.meta = response.data;
            });

        vm.$axios.get('/api/categories')
            .then(res => {
                vm.categories = res.data;
            });
        vm.$axios.get('/config')
            .then(res => {
                vm.configs = res.data;
            });
    },
    methods:{
        updateconfigs(field){
            let data={
                field:field,
                value: this.configs[field]
            }
            this.$axios.put('/admin/config',data);
        },
        categoryCatalog(){
            this.$axios.get('/admin/category-catalogo-job/'+this.selectedCategory.id)
                .then(res => {
                    swal('Trabajo en cola','Revisa el resultado en unos minutos','success');
                });
        },
        update(field)
        {
            var data={
                field:field,
                value:this.meta[field],
                id : this.meta.id
            }
            this.$axios.put('/admin/metadata',data);
        }
    },
    
}
</script>
