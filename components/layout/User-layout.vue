<template>
    <div class="d-flex justify-content-center align-items-center " >
        <div id="app" class="container">
            <app-whatsapp></app-whatsapp>
            <div class="row">
                <app-navbar class="col-12"></app-navbar>
                <app-side-menu class="col-3" 
                                v-if="$mq =='lg'" 
                                style="margin-left:-6%">
                </app-side-menu>

                <div class="col-12 col-lg-9 w-100 row" style="margin-left:0.2%">
                    <main class="py-4 w-100 row">
                        
                        <div class="col-12 overflow-hidden">
                            <transition enter-active-class="animated slideInLeft " appear>
                                <keep-alive include="carrito">
                                    <router-view></router-view>
                                </keep-alive>
                            </transition>
                        </div>

                    </main>
                
                </div> 
    
            </div>
            <div class="row">
                <router-view name="contentB"></router-view>
            </div>
            <app-footer></app-footer>
        </div>
    </div>
</template>

<script>
import appNavbar from './Navbar.vue';
import appSideMenu from './Side-menu.vue';
import appWhatsapp from './Whatsapp-float.vue';
import appFooter from './footer/Footer.vue'; 
export default {
    components:{appNavbar,appSideMenu,appWhatsapp,appFooter},
    computed:{
        categories(){
            return this.$store.getters.getCategories
        },
        config(){ return this.$store.getters.getConfig},
        metadata(){ return this.$store.getters.getMeta},
        states(){ return this.$store.getters.getStates},
    },
    methods:{
        stopLoader(){
           
            if(this.categories && this.config && this.metadata && this.states)
            {
               
                this.$store.commit('setLoading',false);
                return false;
            }
        }
    },
    watch:{
        categories(){this.stopLoader()},
        config(){this.stopLoader()},
        metadata(){this.stopLoader()},
        states(){this.stopLoader()}
    }
}
</script>

<style lang="scss" scoped>
.overflow-hidden{
    overflow: hidden;
}
</style>

