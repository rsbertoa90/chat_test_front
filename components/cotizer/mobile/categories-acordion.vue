<template>
    <div id="accordion">
            <div v-for="category in categories" :key="category.id" class="card flex-wrap" >
                <div class="card-header" :id="category.id">
                    <h5 class="mb-0 w-100">
                        <button class="btn  btn-link w-100 text-left big" 
                                data-toggle="collapse" 
                                :data-target="'#cat'+category.id" 
                                aria-expanded="true" 
                                :aria-controls="category.id"
                                @click="selectedCategory=category.id">
                                
                                <div class="d-flex">
                                    <div class="category-image-container ml-lg-2">
                                        <v-lazy-image v-if="category.image" :src="imagePath(category.image)" 
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
                <div :id="'cat'+category.id" class="collapse collapsed " aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body">

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
    computed:{
        categories(){
            return this.$store.getters.getCategories;
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
        margin-right: 15px;
        height:100%;
    
        min-width:70px;
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
        max-height:400px;
        overflow-y:auto;
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

