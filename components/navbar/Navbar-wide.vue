<template>
<div>
      <transition name="slide">

            <nav class="nav row" :class="{'admin-nav':admin}" v-if="showNav" key="nav">
             
                <div class="col-1 offset-1">
                    <nuxt-link to="/" class="menu-item">
                        LOGO
                    </nuxt-link>
                </div>  
                <div class="search-container col-2 d-flex align-items-center">
                    <searchbar></searchbar>
                </div>
               
                <div class="col-1 offset-1">
                    <nuxt-link to="/cotizador" class="menu-item">
                        <span class="fa fa-list"></span>
                        <span>
                            Todos los productos
                        </span>
                    </nuxt-link>
                </div>
                <div class="col-1 ">
                    <nuxt-link to="/contacto" class="menu-item">
                        <span class="fa fa-envelope"></span>
                        <span>
                            Contacto
                        </span>
                    </nuxt-link>
                </div>
                <div class="col-1 ">
                    <nuxt-link to="/sucursales" class="menu-item">
                        <span class="fa fa-map-marker-alt"></span>
                        <span>
                            Sucursales
                        </span>
                    </nuxt-link>
                </div>
                <div class="col-1 ">
                    <nuxt-link to="/carrito" class="menu-item">
                        <span class="fa fa-shopping-cart"></span>
                        <span>
                          Mi compra
                        </span>
                    </nuxt-link>
                </div>
                <div class="col-2 menu-item">
                    <a href="/lista-de-precios" class="prices-list-button clickable">
                        LISTA DE PRECIOS
                    </a>
                </div>
                <div class="col-1" v-if="admin">
                    <a @click.prevent="showAdminMenu=!showAdminMenu" class="menu-item">
                        <span class="fa fa-user-cog"></span>
                        <span class="text-white text-center">
                            Admin
                        </span>
                    </a>
                </div>
                   
            </nav>
            <!-- ADMIN -->
            
      </transition>
      <div v-if="showAdminMenu && admin">
                    <admin-overlay-menu @close="showAdminMenu=false"> </admin-overlay-menu>
        </div>
      <div class="nav-space"></div>
</div>
  
</template>

<script>
import searchbar from './wide-searchbar.vue';

import adminOverlayMenu from '../admin/navbar/overlay-menu.vue'
import {mapGetters} from 'vuex';
export default {
    components : {
        searchbar,
       adminOverlayMenu,
        
    },
    data(){
        return{
            showNav : true,
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

.menu-item{
    color:#fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    white-space: nowrap;
    font-size: 15px;
    cursor: pointer;
    &:hover{text-decoration: none;}
    .fa, .fas{
        font-size: 35px;
        margin-right:7px;
        color: #fff;
    }
}


.prices-list-button{
    height: 50px;
    align-items: center;
    width:100%;
    padding:5px;
    display: flex;
    justify-content: center;
    border-radius:15px;
    color:#fff;
    font-weight: bold;
    text-shadow: 1px 1px #0007;
    background-color: #F2B742;
    font-size: 17px;
    -webkit-box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.75);
    box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.75);
}


.bars , .cart{
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
    height: 80px;
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
      height: 80px;
      position:fixed;
      margin:0;
      top:0 ; 
      left:0;
      padding:0;
      z-index:900;
    
  }


 



</style>