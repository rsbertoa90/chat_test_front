<template>
<div class="contain-all">
     <div v-if="!categories || categories.length < 1 || !user || !config" class="loader">
            <dot-loader :loading="loading" size="200px"></dot-loader>
    </div>
    
    <div v-if="config && user && config.maintenance && user.role_id > 2">
        <div class="d-flex flex-column text-center w-100">
            <h1>
                Estamos Actualizando nuestros precios
            </h1>
            <h2>
                Vuelve a intentar mas adelante
            </h2>
        </div>
    </div>

    <div v-if="categories && config && !config.maintenance" class="container w-100" :class="{'bg-white' : user != null && user.role_id > 2}">   
        <div class="row w-100 d-flex justify-content-center">
           
            <div class="col-12 col-lg-12" v-if="user && user.role_id < 3">
               <hideOptbutton></hideOptbutton>
            </div>

            <div :class="{'col-12 col-lg-5 text-center':$mq=='lg',
                         'col-12 col-lg-4 text-center neg-margins':$mq!='lg'}" >
                 <app-banner></app-banner>
            </div>
        </div>

        <!-- Barra de busqueda -->
         <div class="row">
            <input type="text" v-on:input="searchTerm = $event.target.value"  @change="selectedPage=1"
                    class="form-control search-bar" placeholder="¿ QUE ESTAS BUSCANDO ?">
        </div> 
        

        <code-selector v-if="user && user.role_id < 3" :list="list"></code-selector>
    
        <hr>
        

        <categories-acordion v-if="searchTerm.trim().length < 3"></categories-acordion>
        
        
         <div class="row" v-if="searchTerm.trim().length > 2 ">
            <paginator class="col-12"
                            :selectedPage="selectedPage"   
                            :products="filteredProducts" 
                            :productsPerPage="productsPerPage"
                            @selectPage="selectedPage=$event">

            </paginator>
            
            <products-table class="col-12" :products="paginatedProducts"></products-table>
            
            <paginator class="col-12"
                            :selectedPage="selectedPage"   
                            :products="filteredProducts" 
                            :productsPerPage="productsPerPage"
                            @selectPage="selectedPage=$event">

                </paginator>
        </div>


        <total-bouncer :total="total" v-if="total"></total-bouncer>
        
        <hr>
        
        <div>
            <cotizer-form  :list="list" :total="total"></cotizer-form>    
        </div>
        
        
        <div v-if="!user || user.role_id > 2">
             <pedido  v-if="list && list.length > 0" :list=list></pedido>
        </div>
    </div>

    <whatsappBtn v-if="!user || user.role_id > 2 "></whatsappBtn>

    <cotizer-tutorial v-if="!user || user.role_id > 2 "></cotizer-tutorial>

   


</div>
</template>

<script>
import pedido from './pedido.vue';
import appBanner from './banner.vue';
import cotizerTutorial from './tutorial.vue';
import paginator from '../admin/admin/paginator.vue';
import whatsappBtn from '../layout/whatsapp.vue';
import hideOptbutton from './hide-opt-button.vue';
import codeSelector from './code-selector.vue';
import categoriesAcordion from './categories-acordion.vue';
import totalBouncer from './total-bouncer.vue';
import productsTable from './products-table.vue';
    export default {
        components:{
            paginator,
            productsTable,
            categoriesAcordion,
            totalBouncer,
            codeSelector,
            pedido,
            appBanner,
            cotizerTutorial,
            whatsappBtn,
            hideOptbutton,
            },
        data(){
            return {
                selectedPage:1,
                 productsPerPage:30,
                searchTerm:'',
                loading:true,
               
               /*  categories : [], */
                list : [],
               /*  user : null, */
               /*  config:null */
            }
        },
        watch : {
            searchTerm(){
              this.selectedPage = 1;
           },
            total() {
                   var result = [];
                   var vm = this;
                    vm.categories.forEach(function(category){
                    var prods = category.products.filter(function(el){     
                        return ( el.units != null & el.units > 0 );
                    });
                    if (prods.length > 0){
                        result.push(prods);
                        
                    }
                    
                });
                
                
                vm.list = [].concat.apply([], result);
               
            }
        },
        computed: {
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
                                
                                term = term.toLowerCase();
                                if (    addtores 
                                        && productName.indexOf(term) < 0 
                                        && categoryName.indexOf(term) < 0  
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
                return this.$store.getters.getCategories;
            },
            config(){
                return this.$store.getters.getConfig;
            },
            user(){
                return this.$store.getters.getUser;
            },

            total() {
                var vm = this;
                var tot = 0;
                vm.categories.forEach(function(category){
                    category.products.forEach(function(product){
                        if (product.units > 0)
                        {
                            if (product.units < product.pck_units){
                                tot+= product.price * product.units;
                            }
                            else {
                                tot+= product.pck_price * product.units
                            }
                        }
                    });
                });
                return tot;
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

<style scoped lang="scss">

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
    align-items: start;
    padding-top: 5%;
}

.search-bar{
    border:1px solid #ff0aaf;
    padding:3px;
    margin-top:20px;
    text-align: center;
    

    &::placeholder{
        color: #ff0aaf;
        text-align:center;
    }
}





</style>
