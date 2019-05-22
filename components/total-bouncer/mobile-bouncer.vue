<template>
<transition  enter-active-class="animated bounceIn">

         <router-link to="/cotizador" v-if="total>0" key="bouncer" id="total"  >
            <div  @click="scrollDown"> 
                <div  class="bg-first p-1">
                    <div class=" bg-white d-flex justify-content-center p-1">
                         <span  class="fa fa-shopping-cart first mt-1 mr-2"></span>
                        ${{total | price}}
                    </div>
                </div>
               
                <div  class="bg-first p-1">
                    <div class="bg-white d-flex justify-content-center p-1">
                        <div class="finish"  >  Terminar pedido </div>
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
   },
   methods:{
       scrollDown(){
            
                setTimeout(() => {
                    console.log();
    
                    window.scrollTo(0,document.body.scrollHeight-1550);
                }, 300);
            
        }
   }
}
</script>

<style lang="scss" scoped>
.finish{
    color:#b2037a;
    a{
        color:#b2037a;
        &:hover{
            color:#D52B1E;
        }
    }
}

 #total {
        position: fixed;
        /* margin-left:50vw; */
        bottom: 25px;
        right:50%;
        z-index: 900;
    }

   
</style>

