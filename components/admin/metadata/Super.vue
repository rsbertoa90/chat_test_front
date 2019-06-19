<template>
    
    <div class="row mt-4 p-4">
       

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
        updateconfig(field)
        {
            let data = {
                field : field,
                value : this.configs[field],
            };

            this.$axios.put('/config',data);
        },
    },
   
    

}
</script>
