<template>
    <div class="container">
        <div v-if="products && products.length  > 0">

            <div class="row">
                <div class="col-12">
                    <h1> Resultados de busqueda: "{{searchTerm}}" </h1>
                </div>
            </div>
            
            <!-- LINKS -->
            
        <paginator v-if="products" @setpage="setpage" 
                    :page="page" @pageup="page++" 
                    @pagedown="page--" 
                    :products="products" 
                    @setPaginatedProducts="setPaginatedProducts">
        </paginator>
            <!-- END links -->

            <div class="row">
                <div class="col-12">
                    <products-grid :products="filteredProducts"></products-grid>
                </div>
              
            </div>
            <div class="row mt-4">
                
                <paginator v-if="products" @setpage="setpage" 
                    :page="page" @pageup="page++" 
                    @pagedown="page--" 
                    :products="products" 
                    @setPaginatedProducts="setPaginatedProducts">
                </paginator>
            </div>
        </div>
        <div v-if="!products || products.length < 1">
            <h2>Lo sentimos, no hay resultados para "{{searchTerm}}"</h2>
        </div>
    </div>
</template>

<script>
import productsGrid from '@/components/category/products-grid.vue';
import productsList from '@/components/category/products-list.vue';
import paginator from '@/components/category/product/paginator.vue';
export default {
    components : {productsGrid,productsList,paginator},
    computed : {
        searchTerm(){
            return this.$store.getters.getSearchTerm;
        },
        categories()
            {
                return this.$store.getters.getCategories;
            },
            products(){
                var vm =this;
                if(this.searchTerm && this.searchTerm.trim() != ''){
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
                                   /*  console.log(term,productName,categoryName); */
                                if (    addtores 
                                      && productName.indexOf(term) < 0 
                                        && categoryName.indexOf(term) < 0  
                                        && (!cat.description || cat.description.indexOf(term)< 0)
                                       /*  && (!cat.keywords || cat.keywords.indexOf(term)< 0) */
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
        
         
        },
        
    
    data(){
        return{
            page:1,
            filteredProducts:null
        }
    },
    methods:{
        setpage(evt){
            this.page=evt;
        },
        setPaginatedProducts(evt)
        {
           // console.log('evt',evt);
            this.filteredProducts = evt;
        }
    }
    
}
</script>

<style lang="scss" scoped>
    .links{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
        background-color: #6e6c6c44;
        font-size: .75rem;
        font-weight: bold;
        div{
             display: flex;
                justify-content: center;
                align-items: center;
        }
    }
    .form-control{
        font-size: .7rem;
        padding: 0;
    }
    @media(max-width: 990px){
        .links{
            margin-left: -11%;
            margin-right: -20%;
        }
    }
</style>
