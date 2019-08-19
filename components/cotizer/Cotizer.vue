<template>
    <div class="container m-auto">   
        <div class="row">
            <h1 class="col-12 col-lg-6 text-center">Hace tu pedido Online</h1>
            <div class="col-12 col-lg-6">
                <a href="/descargar-lista-de-precios" target="_blank" class=" btn btn-download" v-if="!hidePrices"> <span class="fa fa-download"></span> Lista de precios</a>
                <a href="/descargar-catalogo-digital" target="_blank" class=" btn btn-download" v-if="!hidePrices"> <span class="fa fa-download"></span> Catalogo con precios</a>
                <a href="/descargar-catalogo-sin-precios" target="_blank" class=" btn btn-download" v-if="!hidePrices"> <span class="fa fa-download"></span> Catalogo sin precios</a>
            </div>
        </div>
        <div class="row mt-2 d-flex flex-column mb-4 mt-4" v-if="configs">
           
                <span><i class="fa fa-check fucsia"></i>  Los precios publicados son sin IVA</span>
                <span><i class="fa fa-check fucsia"></i> Acercándote personalmente a las sucursales la compra mínima es de ${{configs.minbuy}}.</span>
                <span><i class="fa fa-check fucsia"></i> La Compra minima <b> ONLINE </b> es de ${{configs.minbuy_ship}}</span>
                <span><i class="fa fa-check fucsia"></i> Los despachos o retiros de las compras online se realizan de 2 a 6 días hábiles luego del informe y acreditación de pago.</span>
                <span><i class="fa fa-check fucsia"></i> <b> Envío: </b> la elección del trasporte y el costo del mismo corre a cargo del comprador. Mates Fabi lo lleva sin cargo  desde la fabrica hasta el transporte de tu elección.</span>
                <span><i class="fa fa-check fucsia"></i> <b> Formas de pago: </b> Efectivo o Deposito /Transferencia Bancaria.</span>
           
        </div>

        <no-ssr>
            <div v-if="admin" class="mt-4 mb-4">
                <codeSelector></codeSelector>
            </div>
        </no-ssr>
           
             
            
             
        <div id="accordion">
            <div v-for="category in categories" 
                  :key="'category-'+category.id" 
                  class="card flex-wrap">
                <div class="card-header" :id="'card'+category.id">
                  
                    <h5 class="mb-0">
                        <button class="btn  btn-link w-100 text-left text-big d-flex align-items-center w-100" 
                                data-toggle="collapse" 
                                :data-target="'#acordion'+category.id" 
                                aria-expanded="true" 
                                :aria-controls="category.name"
                                @click="selectedCategory=category.id">
                                   <div class="category-miniature">
                                        <v-lazy-image :src="imagePath(category.image)"></v-lazy-image>
                                    </div>
                                    <span class="white-space-normal">
                                        {{category.name | ucFirst}}
                                    </span>
                                   
                        </button>
                    </h5>
                </div>
                <div :id="'acordion'+category.id" class="collapse collapsed " aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body">
                       <table class="table table-striped table-bordered " >
                           <thead>
                               <tr>
                                    
                                    <th>Foto</th>
                                    <th v-if="admin">Cod</th>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Quiero</th>
                               </tr>
                           </thead>
                           <tbody v-if="selectedCategory==category.id">
                               <tr is="productRow" v-for="product in notPaused(category.products)" :key="product.id" :product="product">  
                               </tr>
                           </tbody>
                       </table>
                    </div>
                </div>
            </div>
        </div>
        
        
        <hr>
        
       <div v-if="!tutoseen">
            <tutorial v-if="!admin"></tutorial>
       </div>
    </div>
</template>

<script>
import productRow from './product-row.vue';

import codeSelector from './code-selector.vue';
 import { mapActions } from 'vuex';
 import { mapGetters } from 'vuex';
   
   
    import tutorial from './tutorial.vue'
   
    export default {
       
        components : {tutorial,productRow,codeSelector},
        data(){
            return {
                selectedCategory:null,              
            }
        },

       
     
        computed: {
            ...mapGetters({
                categories : 'getCategories',
               user : 'getUser',
               configs: 'getConfig',
                total:'getTotal',
                list:'getList',
                tutoseen:'getTutoSeen'
            }),
            
          
        },

      

      
    }
</script>

<style scoped>
.btn-download{
    width:250px;
    text-align: center;
    border:1px solid #333;
    background-color: #ff0aaf;
    margin:10px;
    padding:4px;
    box-shadow: 2px 2px  2px #666;
    color:#fff;
    font-size: 1.1rem;
}


.icono{
    font-size: 2.75rem;
    margin-right: 15px;
    margin-top:-15px
}


.white-space-normal{
    white-space: normal;
}
.text-big{
    font-size: 1.5rem;
}
.category-miniature{
    min-width: 100px;
    width: 100px;
    margin-right: 15px;
}
.container{
    
    margin-bottom: 100px;
  
    }

    td{
        white-space:normal;
    }
    input[type="number"]{
        width: 70px;
    }

    .sampleImage{width: 100px;}


   .btn-link {color : black;}
   
    img{width:100%}

    @media(max-width: 600px){
        .card-header{
            padding:0;
        }
        .container{
    
            margin-left: -7%;
            width: 100vw;
            padding: 15px;
            }
        .sampleImage{width: 80px;}
        td { white-space :normal;}
        table {
            font-size: 0.66rem;
            font-weight: bold;
        }
       
        .card-body,table th, table td{padding:5px;}
    }
    
    @media(min-width: 600px){
        .sampleImage{width: 150px;}
        table{ font-size: 1rem; font-weight: normal}
        td {white-space: normal;}
        .card-body,.container{padding:1.25rem}
        
    }
   
</style>
