<template>
    <div class="container">   
        <div class="row">
            <h1 class="col-12 col-lg-6 text-center" v-if="user && user.role_id > 2">Hace tu pedido</h1>
            <h1 class="col-12 col-lg-6 text-center" v-else>Tomar pedido</h1>
            <a href="/descargar-lista-de-precios" target="_blank" class="col-12 col-lg-6 btn btn-lg btn-outline-info"> <span class="fa fa-download"></span> Descargar lista de precios</a>
        </div>
        <div class="row mt-2">
            <div class="col-12 d-flex justify-content-center align-items-center">
                <span class="fa fa-truck text-focus icono"></span> 
                <p> La compra es entregada sin cargo al transporte de carga elegido por el cliente. Los despachos se realizan de 1 a 5 días hábiles a partir del informe y acreditación del pago.</p>
            </div>
            <div v-if="config" class="col-12 d-flex justify-content-center align-items-center">
                 <span class="fas fa-hand-holding-usd text-focus icono"></span> 
                    <p>Compra mínima por local ${{config.minbuy}}, para envíos ${{config.minbuy_ship}}. (Los precios publicados son sin IVA) Formas de pago: Efectivo o Deposito/Transferencia Bancaria</p>
            </div>
        </div>

        
           
             
            
             
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
                                        {{category.name|ucFirst}}
                                    </span>
                                   
                        </button>
                    </h5>
                </div>
                <div :id="'acordion'+category.id" class="collapse collapsed " aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body">
                        <no-ssr>
                            <table class="table table-striped table-bordered " >
                                <thead class="">
                                    <th>Foto</th>
                                        <th v-if="user && user.role_id < 3">Codigo</th>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Quiero</th>
                                    
                                </thead>
                                <tbody v-if="selectedCategory==category.id">
                                    <tr is="productRow" v-for="product in notPaused(category)" :key="product.id" :product="product">  
                                    </tr>
                                </tbody>
                            </table>
                        </no-ssr>
                    </div>
                </div>
            </div>
        </div>
        
        
       
  <!--       <tutorial v-if="!user || user.role_id > 2"></tutorial> -->
    </div>
</template>

<script>
import productRow from './product-row.vue';

 import { mapActions } from 'vuex';
 import { mapGetters } from 'vuex';
   
    import pedido from './pedido.vue';
    import tutorial from './tutorial.vue'
    import cotizerForm from './Cotizer-form.vue'
    export default {
       
        components : {productRow},
        data(){
            return {
                selectedCategory:null,              
            }
        },

       
     

      
    }
</script>

<style scoped>

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
