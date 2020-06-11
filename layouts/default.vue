<template>
    <div class=" app-container">
       
        <header class=" pt-0 mt-0">
            <app-nav></app-nav>
        </header>    
        <div class=" row">
            <div class="col-3" v-if="$mq=='lg'">
                <div class="d-flex flex-column">
                    <categories-pannel></categories-pannel>
                    <div class="redlimpbannercontainer">
                        <redlimpbanner></redlimpbanner>
                    </div>
                </div>
            </div>
          <!--   <div class="nav-space" :class="{'admin-nav-space':user && user.role_id<3}" v-if="$mq=='lg'"></div> -->
            <div class="col-12 col-lg-9 p-0 m-auto p-lg-4 ">
                <!-- banner solo envios -->
                <div class="mt-3 mb-3">
                  <!--   <img :src="imagePath('/storage/images/app/nopadrew.jpg')" alt="Unica sucursal abierta Pasteur 410" v-if="$mq=='lg'">
                    <img :src="imagePath('/storage/images/app/nopadrem.jpg')" alt="Unica sucursal abierta Pasteur 410" v-else>  -->
                    <infobanner></infobanner>
                </div>
                <transition enter-active-class="animated slideInLeft fast faster ">
                        <nuxt></nuxt>
                </transition>
            </div>
            <div class="bottom-space"></div>
        </div>
      

        <app-footer v-if="$mq=='lg'"></app-footer>
        <socialfooter v-if="$mq!='lg'"></socialfooter>
        <momwebfooter></momwebfooter>
         <whatsappBtn v-if="!admin"></whatsappBtn>
     
        
        <total-bouncer :total="total" v-if="$route.path != '/carrito'" ></total-bouncer>

     
            <apploading v-if="loading || firstload"></apploading>


    </div>
</template>

<script>
/* 

import totalBouncer from './layout/total-bouncer/total-bouncer.vue';*/
import infobanner from '@/components/layout/info-banner.vue';
import momwebfooter from '@/components/layout/footer/momwebfooter.vue'
import socialfooter from '@/components/layout/footer/social-footer.vue'
import redlimpbanner from '@/components/banners/redlimp.vue'
import whatsappBtn from '@/components/layout/whatsapp.vue'; 
import appFooter from '@/components/layout/footer/Footer.vue';
import appNav from '@/components/layout/Navbar.vue';
import totalBouncer from '@/components/layout/total-bouncer/total-bouncer.vue'; 
import apploading from '@/components/layout/loading.vue';
import categoriesPannel from '@/components/layout/Side-menu.vue';
export default {
    components:{infobanner,socialfooter,momwebfooter,redlimpbanner,appNav,appFooter,whatsappBtn,totalBouncer,apploading,categoriesPannel},
    computed:{
        user(){
            return this.$store.getters.getUser;
        },
        total(){
            return this.$store.getters.getTotal;
        },
        loading(){
            return this.$store.getters.getLoading;
        }
    },
     
      mounted(){
         if(this.$store.getters.getLoading || this.firstload){
         
          
              this.$store.commit('setFirstload');
         
         }
       

       

        
     }
    
}
</script>

<style lang="scss" scoped>

    .redlimpbannercontainer{
        padding-right: 20px;
        width: 70%;
        margin-top: 20px;
    }


    .app-container{
       width:98.5vw;
       /* padding:3% ; */
       padding-top:0;
       padding-bottom: 0;
       margin-bottom: 0;
       border:1px solid  #868686;
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