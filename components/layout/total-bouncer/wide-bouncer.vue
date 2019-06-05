<template>
<transition enter-active-class="animated bounceIn">
            <div id="total" key="bouncer" v-if="total>0">
                <div  class="bg-red p-1">
                    <div class="btn-desplegar " @click="desplegar = !desplegar ">
                         <fa-icon icon="shopping-cart" class=" mt-2 mr-2"></fa-icon>
                        Mi pedido  
                       <span class="font-weight-bold ml-1"> ${{total | price}} </span>
                        <fa-icon v-if="desplegar" icon="chevron-down" class="mt-2 ml-3"></fa-icon>
                        <fa-icon v-else icon="chevron-up" class="mt-2 ml-3"></fa-icon>
                     
                    </div>
                </div>
                <div class="list bg-white"  :class="{'desplegada':desplegar}">
                    <table class="table table-striped" v-if="desplegar">
                        <tbody>
                            <tr v-for="product in list" :key="product.code">
                                <td class="nametd">{{product.name}}</td>
                                <td class="unitstd">{{product.units}}</td>
                                <td class="btn-td"> <button class="btn btn-sm btn-danger" @click="product.units=0"> <fa-icon icon="times"></fa-icon> </button> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div  class="border-red">
                    <div class="bg-white d-flex justify-content-center p-1">
                        <router-link to="/carrito" class="finish bg-white w-100 text-center" >  Terminar pedido </router-link>
                    </div>
                </div>
            </div>    
</transition>
    
</template>

<script>
export default {
    data(){return{
        desplegar:true,
    }},
   computed:{
       list(){
           return this.$store.getters.getList;
       },
       total(){
           return this.$store.getters.getTotal;
       }
   }
}
</script>

<style lang="scss" scoped>


.border-red{
    border:2px solid red;
    padding:0;
    background-color: #fff;
}
.finish{
    color:#D52B1E;
    a{
        color:#D52B1E;
        &:hover{
            color:#D52B1E;
        }
    }
}

 #total {
        position: fixed;
        /* margin-left:50vw; */
        bottom: 0;
        right:0;
        z-index: 900;
    }

    .btn-desplegar{
        background-color: #D52B1E;
        color:#fff;
        display: flex;
        justify-content: center;
        padding:5px;
        cursor:pointer;
        
    }

    .list{
        height:0;
        transition: height 1s;
    }

    .list.desplegada{
       
        height:150px;
        overflow-x:hidden;
        overflow-y:auto;
        transition: height 1s;
    }

    table{
        max-width: 250px;
       
        td{
            font-size:.8rem;
            white-space:normal;
            word-wrap: break-word;
             .btn-td{
                    max-width:29px;
                }
            .nametd{
                width:100px;
            }
            .unitstd{
               max-width:50px;
            }
        }
    }
</style>

