<template>
<div>
      <transition name="slide">

            <nav class="nav" :class="{'admin-nav':admin}" v-if="showNav" key="nav">
                <div class="logo">
                    <nuxt-link to="/">
                        LOGO
                    </nuxt-link>
                </div>
                <div class="search-container">
                     <searchbar></searchbar>
                </div>
                <router-link to="/carrito" class="cart">
                    <span class="fa fa-shopping-cart"></span>
                </router-link>
                <div class="bars">
                    <span v-if="!showMenu" class="fa fa-bars" @click="showMenu=true"></span>
                    <span v-else class="fa fa-times" @click="showMenu=false"></span>
                </div>
                <div class="bars" v-if="admin">
                    <span v-if="!showAdminMenu" class="fa fa-user-cog" @click="showAdminMenu=true"></span>
                    <span v-else class="fa fa-user-cog" @click="showAdminMenu=false"></span>
                </div>
                <div v-if="showMenu">
                    <overlayMenu @close="showMenu=false"> </overlayMenu>
                </div>
                <div v-if="showAdminMenu && admin">
                    <admin-overlay-menu @close="showAdminMenu=false"> </admin-overlay-menu>
                </div>
               
                
            </nav>
            <!-- ADMIN -->
            
      </transition>
      <div class="nav-space"></div>
</div>
  
</template>

<script>
import searchbar from './mobile-searchbar.vue';

import overlayMenu from './overlay-menu.vue'
import adminOverlayMenu from '../admin/navbar/overlay-menu.vue'
import {mapGetters} from 'vuex';
export default {
    components : {
        searchbar,
       adminOverlayMenu,
        overlayMenu
    },
    data(){
        return{
            showNav : true,
            showMenu : false,
            showAdminMenu:false,
            term:'',
            lastScrollPosition: 0
     }
    },
    computed :{
        ...mapGetters({
            categories : 'getCategories',
            searchTerm:'getSearchTerm'
        }),
    },
    mounted () {
     window.addEventListener('scroll', this.onScroll)
    },
    beforeDestroy () {
     window.removeEventListener('scroll', this.onScroll)
    },
    methods: {
  onScroll () {
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
}
  
}
</script>

<style scoped lang="scss">
.logo{
    width:27vw;
    display: flex;
    justify-content: center;
    align-items: center;
    color:#fff;
}
.bars , .cart{
    width:30px;
     color:#fff;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items:center;
    margin-left:15px;
    
    .fa{
        font-size:2rem;
    }
}


.nav-space{
    width:100vw;
    height: 55px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}



.slide-enter-active , .slide-leave-active{
    transition: all .3s;
}

.slide-leave-to , .slide-enter
{
     transform: translateY(-100%);
    /*  transition: all .9s; */
}

  .nav{
      overflow: hidden;
      width:99vw;
      display: flex;
      background-color: #DB1B73;
      height: 51px;
      position:fixed;
      margin:0;
      top:0 ; 
      left:0;
      padding:0;
      z-index:900;
    .search-container{
     
        width:44vw;
    }
  }


 



</style>