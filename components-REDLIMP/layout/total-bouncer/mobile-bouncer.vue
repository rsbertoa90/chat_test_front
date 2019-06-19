<template>
<transition  enter-active-class="animated bounceIn">

         <nuxt-link to="/carrito" v-if="total>0" key="bouncer" id="total" >
            <div>
                <div  class="bg-first p-1">
                    <div class=" bg-white d-flex justify-content-center p-1">
                         <span  class="fa fa-shopping-cart red mt-1 mr-2"></span>
                        ${{total | price}}
                    </div>
                </div>
               
                <div  class="bg-red p-1">
                    <div class="bg-white d-flex justify-content-center p-1">
                        <div class="finish" >  Terminar pedido </div>
                    </div>
                </div>
            </div>    
         </nuxt-link>
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

.bg-first{
    background-color: #d32381;
}

 #total {
     border: 1px solid  #009bc8;
        position: fixed;
        /* margin-left:50vw; */
        bottom: 25px;
        left:15px;
        background-color: #fff;
        z-index: 900;
    }

   
</style>

