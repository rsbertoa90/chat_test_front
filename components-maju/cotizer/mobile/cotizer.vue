<template>
    <div>
        <div class="row w-100 d-flex justify-content-center">
           
            <!-- <div class="col-12 col-lg-12" v-if="user && user.role_id < 3">
               <hideOptbutton></hideOptbutton>
            </div> -->

            

            <div :class="{'col-12 col-lg-5 text-center':$mq=='lg',
                         'col-12 col-lg-4 text-center neg-margins':$mq!='lg'}" >
                 <app-banner></app-banner>
            </div>
        </div>

        <!-- Barra de busqueda -->
         <div class="row search-bar-container">
            <input type="text" v-on:input="localTerm = $event.target.value"  @change="selectedPage=1"
                    class="col-12 form-control search-bar" placeholder="¿ QUE ESTAS BUSCANDO ?">
        </div> 
        

       <!--  <code-selector v-if="user && user.role_id < 3" :list="list"></code-selector>
     -->
        <hr>
        

        <categories-acordion v-if="searchTerm.trim().length < 3"></categories-acordion>
        
        
         <div class="row" v-if="searchTerm.trim().length > 2 && paginatedProducts ">
            <paginator class="col-12"
                            :selectedPage="selectedPage"   
                            :products="filteredProducts" 
                            :productsPerPage="productsPerPage"
                            @selectPage="selectedPage=$event">

            </paginator>
            <div class="p-2 mr-1">
                <products-table class="col-12 ml-neg" :products="paginatedProducts"></products-table>
            </div>
            
            <paginator class="col-12"
                            :selectedPage="selectedPage"   
                            :products="filteredProducts" 
                            :productsPerPage="productsPerPage"
                            @selectPage="selectedPage=$event">

                </paginator>
        </div>


        <div class="d-flex w-100 justify-content-center text-center" v-if="searchTerm.trim().length > 2 && (!paginatedProducts || paginatedProducts.length < 1)">
                <h2>
                    No se encontraron productos que coincidan con "{{searchTerm}}"
                </h2>
        </div>

    <cotizerTutorial v-if="!admin && !tutoSeen"></cotizerTutorial>

    </div>
</template>


<script>
import productsTable from './products-table.vue';
import categoriesAcordion from './categories-acordion.vue';
import codeSelector from '../code-selector.vue';
import appBanner from '../banner.vue';
import hideOptbutton from '../hide-opt-button.vue';
import cotizerTutorial from './tutorial.vue';
import paginator from '../../admin/admin/paginator.vue';
 export default {
        components:{
              cotizerTutorial,
            productsTable,
            categoriesAcordion,
            codeSelector,
            appBanner,
           paginator,
            hideOptbutton,
            },
        data(){
            return {
                selectedPage:1,
                 productsPerPage:30,
               localTerm:'',
                loading:true,
             
            }
        },
        watch : {
            localTerm(){
                this.$store.commit('setSearchTerm',this.localTerm);
            },
            searchTerm(){
              this.selectedPage = 1;
              this.localTerm=this.searchTerm;
           },
        },
        mounted(){
            
            this.localTerm =this.searchTerm;
        },
      
        computed: {
              searchTerm(){
                    return this.$store.getters.getSearchTerm;
                },
            tutoSeen(){
                return this.$store.getters.getTutoSeen;
            },
            list(){
                return this.$store.getters.getList;
            },
            paginatedProducts(){
                if (this.filteredProducts)
                {
                   return this.paginate(this.filteredProducts, this.selectedPage);
                }
            },
            filteredProducts(){
                var vm =this;
                if(this.searchTerm.trim() != ''){
                    let terms = vm.searchTerm.split(' ');
                    let res = [];
                    
                  
                    this.categories.forEach(cat => {
                        let categoryName = cat.name.toString().toLowerCase().trim(); 
                        cat.products.forEach(prod => {
                            let productName = prod.name.toString().toLowerCase().trim();
                            let addtores = true;
                            
                            terms.forEach(term => {
                                
                                term = term.toLowerCase().trim();
                                let lastChar = term[term.length -1];
                                if (lastChar == 's')
                                {
                                    term = term.substring(0, term.length-1);
                                 
                                }
                                lastChar = term[term.length -1];
                                if (lastChar == 'e')
                                {
                                    term = term.substring(0, term.length-1);
                                 
                                }

                                if (    addtores 
                                      && productName.indexOf(term) < 0 
                                        && categoryName.indexOf(term) < 0  
                                        && (!cat.description || cat.description.indexOf(term)< 0)
                                        && (!cat.keywords || cat.keywords.indexOf(term)< 0)
                                        && (!prod.description || prod.description.indexOf(term) < 0)
                                        
                                    ){
                                        addtores = false;   
                                    } 

                            });
                            if (addtores){
                                res.push(prod);
                            }
                        });
                    });  
                    return res;  
                }
            },
            categories(){
                return this.$store.getters.getNotPaused;
            },
            config(){
                return this.$store.getters.getConfig;
            },
            user(){
                return this.$store.getters.getUser;
            },

            total() {
               return this.$store.getters.getTotal;
            }
        },
      
       
        methods:
        {
            paginate(array,page){
                if(array && array.length>0){
                    page--; 
                   return array.slice(page * this.productsPerPage, (page + 1) * this.productsPerPage);
                }
            },
         
        },
        filters : {
            price(value){
                return  value.toFixed(2);
            }
        }
    }
</script>


<style lang="scss" scoped>

.ml-neg{
    margin-left: -30px;
}

.contain-all{
    width: 100vw;
    padding:5px;
    overflow: hidden;
}

   
 


    .lglogo{
        width : 200px ; 
        height: 100px;
    }
    .smlogo{
        width : 100px ; 
        height: 50px;
        margin-bottom: 15px;
        margin-top: 10px;
    
    }

    

   
   
   
   
    img{width:100%}

   

    .loader {
    position : fixed;
    height: 100%;
    width: 100%;
    z-index: 110;
    background-color: #ddddddaa;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 5%;
}

.search-bar-container{
    padding: 5px 5%;
}

.search-bar{
    border:1px solid #D52B1E;
    padding:3px;
    margin-top:20px;
    text-align: center;
    width:98%;

    &::placeholder{
        color: #D52B1E;
        text-align:center;
    }
}




</style>
