<template>
    <div>
        <transition enter-active-class="animated bounceIn" leave-active-class="animated fadeOutDown">
            <div v-if="total > 0" id="total" key="total"  class="col-12 row d-flex flex-column justify-content-center align-items-center w-100">
                <div  class="bg-success p-1 col-6 col-lg-2">
                    <div class="col-12 bg-white d-flex justify-content-center">
                    TOTAL : ${{total | price}}
                    </div>
                </div>
                <div  class="bg-success p-1 col-6 col-lg-2">
                    <div class="col-12 bg-white d-flex justify-content-center" @click="scrollDown">
                        <nuxt-link to="/cotizador#form">Terminar pedido</nuxt-link>
                    </div>
                </div>    
            </div>    
        </transition>
    </div>
</template>

<script>
export default {
    methods:{
        scrollDown(){
            
                setTimeout(() => {
                    console.log();
    
                    window.scrollTo(0,document.body.scrollHeight-1000);
                }, 300);
            
        }
    },
    computed:{
        total()
        {
            return this.$store.getters.getTotal;
        }
    }
}
</script>

<style scoped>
     #total {
        position: fixed;
        /* margin-left:50vw; */
        bottom: 20px;
        z-index: 100;
    }
</style>
