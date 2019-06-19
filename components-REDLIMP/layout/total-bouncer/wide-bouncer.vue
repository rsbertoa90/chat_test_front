<template>
<transition enter-active-class="animated bounceIn">
            <div id="total" key="bouncer" v-if="total>0">
                <div  class="bg-red p-1">
                    <div class="btn-desplegar " @click="desplegar = !desplegar ">
                         <span  class="fa fa-shopping-cart mt-2 mr-2"></span>
                        Mi pedido  
                       <span class="font-weight-bold ml-1"> ${{total | price}} </span>
                        <span v-if="desplegar" class="fas fa-chevron-up rotated mt-2 ml-3"></span>
                        <span v-else class="fas fa-chevron-up mt-2 ml-3"></span>
                     
                    </div>
                </div>
                <div class="list bg-white"  :class="{'desplegada':desplegar}">
                    <table class="table table-striped" v-if="desplegar">
                        <tbody>
                            <tr v-for="product in list" :key="product.code">
                                <td class="nametd">{{product.name}}</td>
                                <td class="unitstd">{{product.units}}</td>
                                <td class="btn-td"> <button class="btn btn-sm btn-danger" @click="product.units=0"> <span class="fa fa-times"></span> </button> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div  class="border-red">
                    <div class="bg-white d-flex justify-content-center p-1">
                        <nuxt-link to="/carrito" class="finish bg-white w-100 text-center" >  Terminar pedido </nuxt-link>
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
.rotated{
    transform: rotate(180deg);
}

.border-red{
    border:2px solid #009bc8;
    padding:0;
    background-color: #fff;
}
.finish{
    color:#d32381;
    a{
        color:#d32381;
        &:hover{
            color:#d32381;
        }
    }
}

 #total {
        position: fixed;
        /* margin-left:50vw; */
        bottom: 0;
        right:50%;
        margin-right:-125px;
        z-index: 900;
        width:250px;
    }

    .btn-desplegar{
        background-color: #d32381;
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

