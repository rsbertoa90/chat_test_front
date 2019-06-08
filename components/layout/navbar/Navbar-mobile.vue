<template>
    <div class="w-100" id="top">
        <div style="height:90px">

        </div>
        <transition name="fade">
        
            <div v-show="showNav">

                <div class="fixthis row d-flex justify-content-between pt-2 pb-1">
                    <button aria-label="menu" 
                    class="col-2 navbar-toggler
                            font-weight-bold" 
                            @click="shomenu" >
                        <span class="fa fa-bars"></span>
                    </button>
                    <div class="col-8 mb-4 ">
                        <div class="displayed" >
                            <image-logo></image-logo>
                        </div>
                    </div>
                    <div class="col-2">

                    </div>
                </div>
            </div>
        </transition>
        
         
            <mobile-menu v-if="showMenu" :categories='categories' 
                            @close="showMenu=false"></mobile-menu>
   

  

    


         

      
    </div>
</template>

<script>
import imageLogo from '../images/image-logo.vue';
import mobileMenu from './mobile-menu.vue'
import {mapGetters} from 'vuex';
export default {
    components : {
        imageLogo,
        mobileMenu
    },
    data(){
        return{
            showMenu : false,
            lastScrollPosition:0,
            showNav:true,
     }
    },
   
    methods:{
        shomenu(){
            if(process.browser){
                this.showMenu=true;
                window.scrollTo(0, 0);
            }
        },
        handleScroll(){
          
         const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
        if (currentScrollPosition < 0) {
            return
        }
        // Stop executing this function if the difference between
        // current scroll position and last scroll position is less than some offset
        if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
            return
        }
        this.showNav = currentScrollPosition < this.lastScrollPosition
        this.lastScrollPosition = currentScrollPosition
            
      }
      
    },
    mounted () {
        window.addEventListener('scroll', this.handleScroll);

    }
}
</script>

<style>


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-enter-active , .slide-leave-active{
    transition: all 1s;
}

.slide-leave-to , .slide-enter
{
     transform: translateY(-100%);
    /*  transition: all .9s; */
}

  

    .fixthis{
        position: fixed;
        z-index: 200;
        top:0;
        left:0;
        background-color: #f5f8fa;
    }

    .fixthis.nondisplayed{
        height: 0;
        transition:all .3s;
    }

    .displayed{
    max-width: 60%;
    margin-left:20%;
    transition: max-width 0.5s ease-in-out;
    transition: margin-left 0.5s ease-in-out;
}
.nondisplayed{
    max-width: 60%;
    margin-left: 20%;
    transition: max-width 0.5s ease-in-out;
    transition: margin-left 0.5s ease-in-out;
}

</style>