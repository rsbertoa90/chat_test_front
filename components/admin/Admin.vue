<template>
    <div class="container">   
        
     
        <div>
           
             <!-- <div class="row w-100 d-flex justify-content-center">
                 <img src="/storage/images/app/logo.png" style="width : 200px ; height: 110px" alt="logo">
             </div>  --> 
                <hr>
                <h1>Administrar Productos</h1>
                <button @click="toggleHidePrices" 
                        v-if="config && !config.hide_prices" class="btn btn-lg btn-outline-danger">
                    Ocultar precios al publico
                </button>
                <button @click="toggleHidePrices" v-else class="btn btn-lg btn-outline-success">
                    Mostrar precios al publico
                </button>
                <hr>
                <div class="row w-100">
                    <div class="col-12 col-lg-8">
                        <button class="btn btn-outline-info" @click="showCreate = !showCreate">Crear Producto</button>
                        
                        <admin-create v-if="showCreate" :categories="categories" @productSaved="refresh"></admin-create>
                    </div>
                   <!--  <div class="col-4 d-flex flex-column justify-content-center align-items-center">
                        <h4>Cambiar precios masivo</h4>
                        <h5 v-if="selectedProducts"> {{selectedProducts.length}} Productos seleccionados </h5>
                        <button @click="selectAllProducts" class="btn btn-sm btn-outline-danger mb-2">Seleccionar todos</button>
                        <div class="d-flex justify-content-center"> 
                            <button class="mr-2" @click="variation-=1">-</button>
                            <input style="width:45px; text-align-center" type="number" v-model="variation"> %
                            <button class="ml-2" @click="variation+=1">+</button>
                        
                        </div>
                            <button class="btn btn-md btn-outline-success mt-1" v-if="variation != 0 && selectedProducts.length > 0" @click="applyVariation">Aplicar</button>
                    </div> -->
                </div>
                <div class="row mt-4 d-flex align-items-start ">
                    <label class="col-6 col-lg-2 label mt-1" > <h4> MOSTRAR </h4></label>
                    <select @change="searchTerm=''" v-if="categories && categories.length > 0" type="text" class="form-control col-6 col-lg-2" v-model="selectedCategory">
                       
                        <option v-for="category in categories" :key="category.name" :value="category">
                            {{category.name}}
                        </option>
                    </select>
                    <input @change="selectedCategory=null" v-model.lazy="searchTerm" type="text" class="form-control col-10 col-lg-4 offset-lg-2" placeholder="BUSCAR">
                    <button class="btn btn-outline-info col-1"> <i class="fas fa-search"></i> </button>
                </div>

                <hr>
                <div v-if="products">
                    <div   class="card flex-wrap">
                       
                       
                        <div class="card-body">
                            <table class="table table-striped table-bordered ">
                                <thead class="">
                                    <th >imagen</th>
                                    <th>Codigo</th>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                </thead>
                                <transition-group tag="tbody" leave-active-class="animated slideOutLeft">

                                    <tr is="productRow" @refresh="refresh" :product="product" v-for="product in products" :key="product.code">

                                    </tr>
                                </transition-group>
                            
                            </table>
                        </div>
                     
                    </div>
                </div>
                
        </div>

        
    </div>
</template>

<script>

import adminCreate from './Create.vue';
import productRow from './product-row.vue';
import { mapActions } from 'vuex';
    export default {
         metaInfo(){return{
        title: 'ADMIN'   }},
        components : {
          
            adminCreate : adminCreate,
            productRow
        },
          data(){
            return {
                searchTerm:'',
                selectedCategory:null,
                showCreate:false,
                variation : 0,
              
               
                product : null,
                showModal : false,
            }
        },
        watch:{
            showModal(){
                if (!this.showModal)
                {
                    console.log(this.$refs.modal);
            
                }
            }
        },
        computed : {
           
            products()
            {
                if (this.selectedCategory)
                {
                    return this.selectedCategory.products;
                }
                else if(this.searchTerm && this.searchTerm.trim().length > 1) {
                    return this.searchFilter();
                }
            }
           
            
        },
      
        methods : {
             ...mapActions({
            fetchUser : 'fetchUser',
            fetchConfig : 'fetchConfig',
            }),
            searchComparision(term,prod){
                  let prodName = prod.name.toLowerCase().trim();
                  term = term.toLowerCase().trim();
                  let categoryName = prod.category.name.toLowerCase().trim();
                  
                  let code = prod.code.toLowerCase().trim();

                  if (
                      prodName.indexOf(term) > -1
                      || categoryName.indexOf(term) > -1
                      || code.indexOf(term) > -1
                  ){return true;}
                  else{return false;}
            },
            searchFilter(){
                this.loading=true;
                let terms = this.searchTerm.split(' ');
                let res = [];
                this.categories.forEach(c => {
                    c.products.forEach(prod => {
                        let include = true;
                        terms.forEach(term => {
                            if (include && !this.searchComparision(term,prod))
                            {
                                include = false;
                            }
                        });
                        if (include){
                            res.push(prod);
                        }
                    });
                });
                this.loading=false;
                return res;

                
                
            },
            toggleHidePrices(){
                if (this.config.hide_prices)
                {
                    this.config.hide_prices =0;
                }else{
                    this.config.hide_prices =1;
                }
                var vm = this;
                this.$axios.put('/config',{field:'hide_prices',value:this.config.hide_prices})
                    .then(response => {
                       vm.fetchConfig;
                    
                    });
            },
            
           
            refresh(){
                
                var vm = this;
                this.$store.dispatch('fetchCategories');
                if (vm.selectedCategory){
                    setTimeout(() => {
                        vm.selectedCategory = vm.categories.find(c => {
                            return c.id == vm.selectedCategory.id;
                        })
                    }, 100);
                }
             
            },
            
            
            
           
        },
        created(){
            this.refresh();
        },
        filters : {
            price(value){
                return  value.toFixed(2);
            }
        }
    }
</script>

<style scoped>
.btn-link {color : black;}
    td img {
        width: 10vw;
    }
textarea{
    width:100%;
}
input[type="checkbox"]{
    width: 25px;
    margin: 0 10px;
}
   @media(max-width: 600px){
       table,.container,.card,.card-body {font-size: 0.66rem ; padding : 0}
       
       th,td, input{
           white-space:nowrap;
           width: 13vw;
           padding: 2px;
       }
       .form-control{width: 20vw;}
       .nametd {width: 25vw;}
   }
</style>
