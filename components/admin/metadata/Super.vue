<template>
    
    <div class="row mt-4">
        <div class="col-12 mb-3">
            <button @click="refreshPricesList" class="btn btn-outline-info">  
                Refrescar Lista de Precios
            </button>
            
        </div>
        <div class="col-12 row" v-if="configs">
            <div class="col-12">
                compra minima local: 
                <input type="number" @change="updateconfig('minbuy')" v-model.lazy="configs.minbuy">
            </div>
            <div class="col-12">
                compra minima envios: 
                <input type="number" @change="updateconfig('minbuy_ship')" v-model.lazy="configs.minbuy_ship">
            </div>
        </div>
        

        <div class="col-12 row p-4">
            <h3 class="col-12">Metadatas</h3>
            <hr>
            <button class="col-12 col-lg-4 btn"
                    :class="{'btn-info':panel=='meta-pages',
                            'btn-outline-info':panel!='meta-pages'}"
                     @click="panel='meta-pages'">
                Paginas
            </button>
            <button class="col-12 col-lg-4 btn"
                    :class="{'btn-info':panel=='meta-categories',
                            'btn-outline-info':panel!='meta-categories'}"
                     @click="panel='meta-categories'">
                Categorias
            </button>
            <button class="col-12 col-lg-4 btn"
                    :class="{'btn-info':panel=='meta-products',
                            'btn-outline-info':panel!='meta-products'}"
                     @click="panel='meta-products'">
                Productos
            </button>
        </div>
         <div class="col-12 mt-4 p-4">
           <component :is="panel"></component>
        </div>
        
       
       
        
    </div>
</template>

<script>
import metaCategories from './categories.vue';
import metaPages from './pages.vue'
import metaProducts from './products.vue'
export default {
     metaInfo(){return{
        title: 'ADMIN'   }},
    components : {
        metaCategories,
        metaPages,
        metaProducts
    },
    data(){
        return{
            panel:'meta-pages'
        }
    },
    computed:{
        configs(){
            return this.$store.getters.getConfig;
        }
    },
    methods:{
        refreshPricesList(){
            this.$http.get('lista-de-precios')
            .then(r=>{
                swal('Procedimiento iniciado','Espera unos minutos para ver reflejados los cambios','success');
            });
        },
        updateconfig(field)
        {
            let data = {
                field : field,
                value : this.configs[field],
            };

            this.$http.put('/admin/config',data);
        },
    },
   
    

}
</script>
