<template>
<div class="contain-all m-auto">

     <div v-if="!categories || categories.length < 1  || !config" class="loader">
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

    <div v-if="categories && config && !config.maintenance" class=" w-100" :class="{'bg-white' : user != null && user.role_id > 2}">   
        <mobileCotizer v-if="$mq!='lg'"></mobileCotizer>
        <web-cotizer v-if="$mq=='lg'"></web-cotizer>
    </div>

   

   


</div>
</template>

<script>
import webCotizer from './web/cotizer.vue';
import mobileCotizer from './mobile/cotizer.vue'
import appBanner from './banner.vue';
import metaMixin from '@/plugins/metadataMixin.js';



    export default {
      mixins:[metaMixin],
        components:{
          webCotizer,mobileCotizer,
         
            },
        data(){
            return {
                selectedPage:1,
                 productsPerPage:30,
              
                loading:true,
             
            }
        },
     
        computed: {
          
            list(){
                return this.$store.getters.getList;
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
            },
            
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
    margin-left:-3%;
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
