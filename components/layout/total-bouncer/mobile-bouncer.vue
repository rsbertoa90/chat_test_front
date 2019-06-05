<template>
<transition  enter-active-class="animated bounceIn">

         <router-link to="/carrito" v-if="total>0" key="bouncer" id="total" >
            <div>
                <div  class="bg-red p-1">
                    <div class=" bg-white d-flex justify-content-center p-1">
                         <fa-icon icon="shopping-cart" class="red mt-1 mr-2"></fa-icon>
                        ${{total | price}}
                    </div>
                </div>
               
                <div  class="bg-red p-1">
                    <div class="bg-white d-flex justify-content-center p-1">
                        <div class="finish" >  Terminar pedido </div>
                    </div>
                </div>
            </div>    
         </router-link>
</transition>
</template>

<script>
export default {
   computed:{
       total(){
           return this.$store.getters.getTotal;
       }
   }
}
</script>

<style lang="scss" scoped>
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
        bottom: 25px;
        right:10px;
        z-index: 900;
    }

   
</style>

