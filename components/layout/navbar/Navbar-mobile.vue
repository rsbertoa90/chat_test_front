<template>
    <div class="w-100">
        <div class=" d-flex justify-content-center">
            <div class="logo-container">
                <image-logo></image-logo>
            </div>
        </div>
         <transition enter-active-class="animated slideInLeft faster"
                        leave-active-class="animated slideOutLeft faster">
            <overlay-menu v-if="showMenu" :categories='notPausedCategories' 
                        @close="showMenu=false"></overlay-menu>
        </transition>
        <nav class="navbar navbar-expand-lg navbar-dark bg-first row">
            <button aria-label="menu" class="navbar-toggler col-1 p-1 offset-1 bg-second d-flex justify-content-center align-items-center
                        text-white font-weight-bold" 
                    @click="showMenu = true" >
            <span class="fa fa-bars"></span>
            </button>
            <div class="form-inline col-10">
                <div class="input-group relative">
                    <input type="text" class="form-control" 
                            aria-label="Buscar productos"
                            name="search"
                            placeholder="Que estas buscando?" v-model="term" @keyup.enter="search">
                    <div class="input-group-prepend">
                        <span @click="search" class="input-group-text bg-second d-flex justify-content-center" id="search-addon">
                            <span class="fa fa-search text-white font-weight-bold">
                            </span>
                        </span>
                    </div>
                </div>  
            </div>
        </nav>

        <div class="row mt-2"  v-if="!hidePrices">
            <div class="col-12 p-0">
                  <div class="d-flex mt-2">
                    <transition>
                        <div class="check-circle">
                            <span class="fa fa-check"></span>
                        </div>
                    </transition>
                    <span class="webprices">
                        PRECIOS EN LA WEB ACTUALIZADOS AL {{today|date}} 
                    </span>
                </div>
            </div>
        </div>
    


         

      
    </div>
</template>

<script>
import imageLogo from '../images/mobile-logo.vue';
import overlayMenu from './mob-menu.vue'
import {mapGetters} from 'vuex';
export default {
    components : {
        imageLogo,
        overlayMenu
    },
    data(){
        return{
            showMenu : false,
            term:'',
     }
    },
    computed :{
        ...mapGetters({
            categories : 'getCategories',
            searchTerm:'getSearchTerm'
        }),
        today(){
            return new Date();
        }
    },
     methods:{
        search(){
            this.$store.commit('setSearchTerm',this.term);
            if(this.term.length > 2)
            {
                if (this.$route.path != '/busqueda')
                {
                    this.$router.push('/busqueda');
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.logo-container{
    width:130px;
    margin:auto;
}
.webprices{
    color: #B2037A;
    font-weight: bold;
    font-size: 11px;
    margin-top:2px;
}

.check-circle{
    margin-right:2px;
    width:20px;
    font-size: 14px;
    height: 20px;
    color:#fff;
    display:flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #09cca2;
     animation-name: altercolor;
    animation-duration: .5s;
    animation-iteration-count: infinite;
    animation-direction:alternate;
    .fa{
        font-size: 14px;
    }
}

@keyframes altercolor{
    from {
        background-color: #09cca2;
     
    }
    to{
        background-color: #B2037A;
      

    }
}


  .input-group-prepend{
        position: absolute;
    right: 13px;
    top: 0;
    width: 30px;
    height: 100%;
  }


</style>