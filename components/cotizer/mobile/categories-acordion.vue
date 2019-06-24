<template>
    <div id="accordion">
            <div v-for="category in filteredCategories" :key="category.id" class="card flex-wrap" >
                <div class="card-header" :id="category.id">
                    <h5 class="mb-0 w-100">
                        <button class="btn  btn-link w-100 text-left big" 
                               
                                @click="setSelected(category)">
                                
                                <div class="d-flex align-items-center">
                                    <div class="category-image-container ml-lg-2">
                                        <v-lazy-image v-if="category.image" :src="imagePath(category.image)" :src-placeholder="noImage"
                                        :alt="category.name" class="category-image">
                                        </v-lazy-image>
                                    </div>
                                    <span class="d-flex align-items-center" style="width:65%">
                                        {{category.name | uc}}
                                    </span>
                                </div>
                        </button>
                    </h5>
                </div>
                <div :id="'cat'+category.id" class="" >
                    <div class="card-body" :class="{'card-body-displayed':selectedCategory == category.id,
                                                    'card-body-nondisplayed':selectedCategory != category.id}">

                        <products-table  v-if="selectedCategory == category.id" :products="category.products"></products-table>

                    </div>
            </div>
        </div>
       
    </div>
</template>

<script>
import productsTable from './products-table.vue';

export default {
    components:{productsTable},
    data(){
        return{
            selectedCategory:null,
           
        }
    },
    methods:{
        setSelected(c){
            if(this.selectedCategory == c.id)
            {
                this.selectedCategory = null;
            }else{
                this.selectedCategory = c.id;
            }
        },
        hasNotPausedProducts(category){
            let res = category.products.filter(p => {
                return !p.paused;
            });
            return (res.length > 0);
        }
    },
    computed:{
        categories(){
            return this.$store.getters.getCategories;
        },
        filteredCategories(){
            return this.categories.filter(c => {
                return this.hasNotPausedProducts(c);
            });
        },
        user(){
            return this.$store.getters.getUser;
        },
        config(){
            return this.$store.getters.getConfig;
        }
    },
   
}
</script>

<style lang="scss" scoped>
 .category-image-container{
     display:flex;
     height: 100%;
     align-items:center;
        margin-right: 15px;
        width:90px;
    }

  

    .card-header{
        background-color: #fff;
        border:2px solid #D52B1E;
        border-radius:5%;
        padding: 5px;
        display: flex;
        align-items:center;
    }


.sampleImage{
        width: 50px;
    }

    .btn-link {color : black;}


    img{width:100%}

     @media(max-width: 600px){
        
     
        


        td { white-space : normal;}
        #accordion{
            margin: -6px ;
            width:100%;
        }
        table {
            table-layout: fixed;
            width:95vw;
            font-size: 0.66rem;
            font-weight: bold;
        }
        input[type="number"]{
            max-width: 70px;
        }
       
        .card-body,table th, table td{padding:5px;}
    }
    

    .card-body{
        overflow-y:auto;
    }

    .card-body-displayed{
        max-height: 400px;
        transition:all .3s;
    }
    .card-body-nondisplayed{
        max-height: 0px;
        transition:all .3s;
    }
    @media(min-width: 600px){
        
      
         .sampleImage{
            width: 150px;
        }
        table{ font-size: 1rem; font-weight: normal}
        td {white-space: normal;}
        .card-body,.container{padding:1.25rem}
        
    }

    .big{
    font-size: 1.7rem;
    white-space: normal;
    padding: 0;
}


</style>

