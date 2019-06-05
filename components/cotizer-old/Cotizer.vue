<template>
    <div class="container">   
        <div class="row">
            <h1 class="col-12 col-lg-6 text-center" v-if="user && user.role_id > 2">Hace tu pedido</h1>
            <h1 class="col-12 col-lg-6 text-center" v-else>Tomar pedido</h1>
            <a href="/lista-de-precios" class="col-12 col-lg-6 btn btn-lg btn-outline-info"> <span class="fa fa-download"></span> Descargar lista de precios</a>
        </div>
             
             <hr v-if="user && user.role_id < 3">
             <div v-if="user && user.role_id < 3" class="row">
                <form   @submit.prevent="addSelectorProduct"
                        class="form form-inline w-100 d-flex  " 
                        :class="{'flex-column align-items-start justify-items-between':$mq != 'lg'}">
                    <div class=" d-flex ml-3 mt-2 " >
                        <label for="">Codigo</label>
                        <input type="text" v-model="selector.code" class="form-control ml-2">
                    </div>
                    <div class=" d-flex ml-3 mt-2 " >
                        <label for="">Producto</label>
                        <label class="text-info ml-4"> {{selector.name}} </label>
                    </div>
                    <div class=" d-flex ml-3 mt-2 " >
                        <label class="mr-2" for="">Unidades</label>
                        <input type="number" min="0"  class="form-control" v-model="selector.units">
                    </div>
                    <button type="submit" class="btn btn-md btn-secondary ml-2" :class="{'btn-outline-success':selector.product && selector.units > 0}"> <span class="fa fa-plus"></span> </button>
                </form>
                <div class="w-100">
                   <pedido @change="listChange" v-if="list && list.length > 0" :list="list"></pedido>
                </div>
             </div>
             
             <hr>
             
        <div id="accordion">
            <div v-for="category in categories" 
                  :key="'category-'+category.id" 
                  class="card flex-wrap">
                <div class="card-header" :id="'card'+category.id">
                    <h5 class="mb-0">
                        <button class="btn  btn-link w-100 text-left" 
                                data-toggle="collapse" 
                                :data-target="'#acordion'+category.id" 
                                aria-expanded="true" 
                                :aria-controls="category.name"
                                @click="selectedCategory=category.id">
                                 
                                   {{category.name|ucFirst}}
                                   
                        </button>
                    </h5>
                </div>
                <div :id="'acordion'+category.id" class="collapse collapsed " aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body">
                       <table  v-if="selectedCategory==category.id" class="table table-striped table-bordered ">
                           <thead class="">
                               <th>Foto</th>
                                <th v-if="user && user.role_id < 3">Codigo</th>
                               <th>Producto</th>
                               <th>Precio</th>
                               <th>Quiero</th>
                               
                           </thead>
                           <tbody>
                               <tr v-for="product in notPaused(category)" :key="product.id">
                                   <td @click="show(product)" >
                                        <v-lazy-image v-if="product.images.length > 0" 
                                            class="sampleImage" :src="imagePath(product.images[0])" 
                                            :alt="product.name"  /> 
                                        <v-lazy-image class="sampleImage" v-else :src="imagePath('/storage/images/app/no-photo.png')" 
                                            alt="Sin foto" />
                                    </td>
                                    <td v-if="user && user.role_id < 3"> {{product.code}} </td>
                                   <td style="cursor:pointer" @click="show(product)">  {{product.name | ucFirst}} </td>
                                   <td class="text-info text-center font-weight-bold">${{product.price | price}}</td>
                                   
                                   <td><input type="number" min="0" class="form-control " v-model="product.units">
                                        
                                        <div v-if="product.units > 0" class="text-success d-flex flex-column p-0 m-0 justify-content-center align-items-center">
                                            
                                            <span class="text-success font-weight-bold">  ${{(product.price * product.units) | price}} </span>
                                            
                                        </div>
                                   
                                   </td>
                                  
                                   
                                  
                                  
                               </tr>
                           </tbody>
                       </table>
                    </div>
                </div>
            </div>
        </div>
        
        
        <hr>
        <div>
            <cotizer-form></cotizer-form>
        </div>
        <div v-if="list.length > 0">
            <pedido :list="list"></pedido>
        </div>
        <carousel :product="carouselProduct" v-if="showCarousel" @close="showCarousel=false"></carousel>
    </div>
</template>

<script>
import cotizerForm from './Cotizer-form.vue';
 import { mapActions } from 'vuex';
 import { mapGetters } from 'vuex';
    import carousel from '@/components/category/product/img-modal.vue';
    import pedido from './pedido.vue';
    export default {
        components : {carousel,pedido,cotizerForm},
        data(){
            return {
                selectedCategory:null,
                selector:{
                    code:'',
                    name:'',
                    product:null,
                    units:0
                },

                
                showCarousel : false,
                carouselProduct : null
            }
        },

        watch : {
            'selector.code'(){
                var  vm = this;
                var res =false;
                this.categories.forEach(cat => {
                    cat.products.forEach(prod => {
                        if (vm.selector.code == prod.code){
                            vm.selector.product = prod;
                            vm.selector.name = prod.name;
                            res = true;
                        }
                    });
                });
                if (!res){
                    vm.selector.product = null;
                    vm.selector.name='';
                }
            },
           
        },
      

        methods:
        {
             listChange(event){
                let product = this.list.find(prod => {
                    return prod.id == event.id;
                });
                product.units = event.units;

            },
             addSelectorProduct(){
                var vm = this;
                if (vm.selector.units > 0 && vm.selector.product != null ){
                    let prod = this.selector.product;
                    if (prod.units == undefined)
                    {
                        Vue.set(prod,'units',0);
                    }
                   prod.units = this.selector.units;
                   vm.selector.product = null;
                   vm.selector.code = '';
                   vm.selector.units = 0;
                   vm.selector.name ='';
                   
                }
            },
            show(product){
                if (product.images[0]){
                    this.carouselProduct = product;
                    this.showCarousel = true;
    
                }
                else
                {
                    var content = document.createElement("img");
                    content.setAttribute('src',this.imagePath('/storage/images/app/no-photo.png'));
                    content.style.width = '100%';
                    swal({content : content});
                }
            }
        },     
    }
</script>

<style scoped>
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
    #total {
        position: fixed;
        /* margin-left:50vw; */
        bottom: 20px;
        z-index: 100;
    }
    img{width:100%}

    @media(max-width: 600px){
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
