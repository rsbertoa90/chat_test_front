<template>
    <div class=" app-container">
       
        <header>
            <app-nav></app-nav>
        </header>    
        <div class="py-4 row">
            <div class="nav-space" :class="{'admin-nav-space':user && user.role_id<3}" v-if="$mq=='lg'"></div>
            <div class="col-12 p-4">
                <transition enter-active-class="animated fadeIn fast faster ">
                    <keep-alive include="carrito">
                                <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
            <div class="bottom-space"></div>
        </div>
        <app-footer v-if="$mq=='lg'"></app-footer>
         <whatsappBtn v-if="!user || user.role_id > 2 "></whatsappBtn>
     
         <total-bouncer :total="total" v-if="$route.path != '/carrito'" ></total-bouncer>

        <dotLoading></dotLoading>
    </div>
</template>

<script>

import totalBouncer from './layout/total-bouncer/total-bouncer.vue';
import whatsappBtn from './layout/whatsapp.vue';
import appFooter from './layout/footer/Footer.vue';
import appNav from './layout/navbar.vue';
import dotLoading from './layout/loading.vue';
export default {
    components:{appNav,whatsappBtn,totalBouncer,appFooter,dotLoading},
    computed:{
        user(){
            return this.$store.getters.getUser;
        },
        total(){
            return this.$store.getters.getTotal;
        }
    },
    mounted(){
      
    }
}
</script>

<style lang="scss" scoped>
    .app-container{
       width:98.5vw;
       padding:0 ;
       padding-bottom: 0;
       margin-bottom: 0;
       border:1px solid  #D52B1E;
       overflow: hidden;

    }
    .back-arrow{
        color:blue;
        margin-left:10%;
        cursor: pointer;
        font-size: 2rem;

    }

    .nav-space{
        width:100vw;
        height:41px;
    }

    .admin-nav-space{
        height: 80px;
    }

    .bottom-space{
        width:100vw;
        height:100px;
    }
</style>