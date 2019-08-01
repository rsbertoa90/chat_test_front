<template>
    <div class="container" v-if="category">
        <div class="row">
            <div class="col-12">
                <h1> {{category.name | ucFirst}} </h1>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-lg-6">
                <img :src="imagePath(category.image)" :alt="category.name">
            </div>
            <div class="col-12 col-lg-6 ">
                
                  <p v-html="category.description" v-if="category.description">  </p>  
            
            </div>
        </div>

        <div v-if="category && !products">
            <products-grid :products="category.products"></products-grid>
        </div>
        <!-- LINKS -->
        <paginator @setpage="setpage" 
                    :page="page" @pageup="page++" 
                    @pagedown="page--" 
                    :products="category.products" 
                    @setPaginatedProducts="setPaginatedProducts">
        </paginator>
        <!-- END links -->

        <div class="row">
            <div class="col-12" v-if="products">
                <products-grid :products="products"></products-grid>
                
            </div>
          
        </div>

         <paginator @setpage="setpage" 
                    :page="page" @pageup="page++" 
                    @pagedown="page--" 
                    :products="category.products" 
                    @setPaginatedProducts="setPaginatedProducts">
        </paginator>
       
    </div>
</template>

<script>
import paginator from './product/paginator.vue';
import productsGrid from './products-grid.vue';
import productsList from './products-list.vue';
export default {
    components : {productsGrid,productsList,paginator},
    props:['category'],
    created(){
        if(!this.category){
            this.$router.push('/');
        }
    },
    mounted(){
        if (this.category && this.category.description)
        {
            this.category.description = this.category.description.replace(/\n/g, "<br />");
        }
    },
    computed : {
        categories(){
            return this.$store.getters.getCategories;
        },
    },
    methods:{
        setpage(evt){
            this.page=evt;
        },
        setPaginatedProducts(evt)
        {
           // console.log('evt',evt);
            this.products = evt;
        },
    },
    data(){
        return{
            products:null,
            show:12,
            page:1,
        }
    },
    watch : {
        show(){
            this.page = 1 ;
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
