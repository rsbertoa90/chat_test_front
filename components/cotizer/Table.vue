<template>
    <div>
        <hr>
        <div id="accordion">
            <div v-for="category in poblatedCategories" :key="category.id" class="card flex-wrap">
                <div class="card-header" :id="category.id">
                    <h5 class="mb-0">
                        <button class="btn  btn-link w-100 text-left" 
                                data-toggle="collapse" 
                                :data-target="'#'+category.name" 
                                aria-expanded="true" 
                                :aria-controls="category.name">
                                
                                  
                                   {{category.name.ucfirst()}}
                                 
                                
                        </button>
                    </h5>
                </div>
                <div :id="category.name" class="collapse collapsed " aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body">
                       <table class="table table-striped table-bordered ">
                           <thead class="">
                               <th v-if="$mq != 'sm'">Foto</th>
                               <th class="nametd">Nombre</th>
                               <th class="">Precio</th>
                               <th  class="">Llevando mas de</th>
                               <th v-if="$mq != 'sm'"  class="">Precio x mayor</th>
                               <th class="">Quiero</th>
                               <th v-if="$mq != 'sm'" class="">Subtotal</th>
                           </thead>
                           <tbody>
                               <tr v-for="product in activeProducts(category)" :key="product.id" >
                                   <td v-if="$mq != 'sm'" > <img style="width : 150px" :src="product.image" :alt="product.name" @click="show(product.image)"> </td>
                                   <td style="cursor:pointer" @click="show(product.image)">  {{product.name.trim()}} </td>
                                   <td class="text-info text-center">${{product.price | price}} <span class="text-danger" v-if="$mq == 'sm'"> / ${{product.pck_price | price}}</span></td>
                                   <td class="text-center">{{product.pck_units}}</td>
                                   <td v-if="$mq != 'sm'" class="text-center text-success font-weight-bold">${{product.pck_price | price}}</td>

                                   <td v-if="!product.paused"><input type="number" min="0" class="form-control " v-model="product.units">
                                        
                                        <div v-if="$mq == 'sm' && product.units > 0" class="text-success d-flex flex-column p-0 m-0 justify-content-center align-items-center">
                                            
                                            <span v-if="product.units < product.pck_units">  ${{(product.price * product.units) | price}} </span>
                                            <span v-if="product.units >= product.pck_units">  ${{(product.pck_price * product.units) | price}} </span>
                                            
                                        </div>
                                   
                                   </td>
                                   <td v-else>
                                       <span class="text-danger">Sin Stock</span>
                                   </td>
                                   
                                   <td v-if="! product.units && $mq != 'sm'"> 0 </td>
                                   <td v-else-if="product.units < product.pck_units & $mq != 'sm'">$ {{ (product.units * product.price).toFixed(2) }}  </td>
                                   <td v-else-if="$mq != 'sm'"> ${{ (product.units * product.pck_price).toFixed(2) }} </td>
                               </tr>
                           </tbody>
                       </table>
                    </div>
                </div>
            </div>
        </div>
        
        <transition enter-active-class="animated bounceIn" leave-active-class="animated fadeOutDown">
            <div v-if="total > 0" id="total"  class="col-12 row d-flex justify-content-center w-100">
                <div  class="bg-success p-1 col-6 col-lg-2">
                    <div class="col-12 bg-white d-flex justify-content-center">
                    TOTAL : ${{total | price}}
                    </div>
                </div>
            </div>    
        </transition>
        <hr>
    </div>
</template>


<script>
    export default {
        data(){
            return {
                categories : [],
                list : []
            }
        },
        watch : {
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
                // console.log([].concat.apply([], result));
                
                vm.list = [].concat.apply([], result);
                // console.log(vm.list);
            }
        },
        computed: {
            poblatedCategories(){
                var vm = this;
                var c = this.categories.filter(el => {
                    return (vm.activeProducts(el).length > 0);
                });
                return c;

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
        created(){
            var vm = this;
            $.ajax({
                url : 'api/categories',
                success(response){
                    vm.categories = response;
                }
            });
        },
        methods:
        {
   
            activeProducts(category)
            {
                var active = category.products.filter(pr => {
                    return (! pr.paused)
                });
                return active;
            },
            show(url){
                var content = document.createElement("img");
                $(content).attr('src',url);
                content.style.width = '100%';
                swal({content : content});
            }
        },
   
    }
</script>

<style scoped>
   .btn-link {color : black;}
    #total {
        position: fixed;
        /* margin-left:50vw; */
        bottom: 20px;
        z-index: 100;
    }
    img{width:100%}

    @media(max-width: 600px){

        td { white-space :nowrap;}
        table {
            font-size: 0.66rem;
            font-weight: bold;
        }
       
        .card-body,table th, table td{padding:5px;}
    }
    
    @media(min-width: 600px){
        table{ font-size: 1rem; font-weight: normal}
        td {white-space: normal;}
        .card-body,.container{padding:1.25rem}
        
    }
   
</style>

