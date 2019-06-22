<template>
    <div class="row">
        <div class="col-3 floating-categories">
            <floating-categories @selectedCategory="setSelectedCategory"></floating-categories>
        </div>
        <div class="col-9">

            <div class="col-12 row d-flex justify-content-center">
            
               <!--  <div class="col-12 " v-if="user && user.role_id < 3">
                    <hideOptbutton></hideOptbutton>
                </div> -->

                <div class=" col-12 text-center"  >
                    <app-banner></app-banner>
                </div>
            </div>

            <!-- Barra de busqueda -->
           <!--  <div class="row">
                <input type="text" v-on:input="searchTerm = $event.target.value"  @change="selectedPage=1"
                        class="form-control search-bar" placeholder="¿ QUE ESTAS BUSCANDO ?">
            </div>  -->
            <!-- 

            <code-selector v-if="user && user.role_id < 3" :list="list"></code-selector>
         -->
            <hr>
            
            <div class="row" v-if="paginatedProducts && paginatedProducts.length > 0">
                <paginator class="col-12"
                                :selectedPage="selectedPage"   
                                :products="filteredProducts" 
                                :productsPerPage="productsPerPage"
                                @selectPage="selectedPage=$event">

                </paginator>
                <h2 v-if="selectedCategory">{{selectedCategory.name}}</h2>
                <transition enter-active-class="animated slideInUp">
                    <products-grid class="col-12" :products="paginatedProducts" :key="paginatedProducts[0].slug"></products-grid>
                </transition>
                
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
            
        </div>
    </div>
</template>


<script>
import productsGrid from './products-grid.vue';

import codeSelector from '../code-selector.vue';
import appBanner from '../banner.vue';
import hideOptbutton from '../hide-opt-button.vue';
import floatingCategories from './floating-categories.vue';
import paginator from '../../admin/admin/paginator.vue';
 export default {
        components:{
            paginator,
            productsGrid,  floatingCategories,
          
            codeSelector,
            appBanner,
             
            hideOptbutton,
            },
        data(){
            return {
                selectedPage:1,
                productsPerPage:30,
                loading:true,
                selectedCategory:null
            }
        },
        watch : {
            searchTerm(){
                if(this.searchTerm.trim().length>1){
                    this.selectedPage = 1;
                    this.selectedCategory = null;
                     window.scrollTo(0,0);
                }
           },
           selectedCategory(){
               if(this.selectedCategory){
                   window.scrollTo(0,0);
               }
              /* Quitar search term */
           }
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
                if(this.searchTerm.trim() != '' && this.searchTerm.trim().length > 1){
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
                else if (this.selectedCategory) {
                    return this.selectedCategory.products.filter(p => {
                        return !p.paused;
                    });
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
            setSelectedCategory(e){
               
                this.selectedCategory = this.categories.find(c => {
                    return c.id == e;
                })

                this.$store.commit('setSearchTerm','');
            },
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
        },
        mounted(){
            if(!this.searchTerm && !this.selectedCategory && this.categories)
            {
                    this.selectedCategory = this.categories[0];
            }
            
        }
    }
</script>


<style lang="scss" scoped>

   
 


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

.search-bar{
    border:1px solid #D52B1E;
    padding:3px;
    margin-top:20px;
    text-align: center;
    

    &::placeholder{
        color: #D52B1E;
        text-align:center;
    }
}




</style>
