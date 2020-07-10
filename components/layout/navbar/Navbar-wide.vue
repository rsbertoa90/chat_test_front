<template>
    <div class="w-100 pl-4 pr-4 pt-0">
        
        <div class="row d-flex justify-content-around align-items-center pl-4 pr-4 pt-0">

           

            <div class="col-2 p-4">
                <div class="">
                    <image-logo></image-logo>
                </div>
            </div>
            <div class="col-6 fcc">
                <div class="form-inline">
                    <div class="input-group w-100 relative">
                        <input type="text" class="form-control" 
                                 aria-label="Buscar productos"
                                placeholder="Que estas buscando?"
                                v-model="term" @keyup.enter="search">
                        <div class="search-bar-button ">
                            <span @click="search" class="white-bold d-flex justify-content-center" 
                                  id="basic-addon1">
                                Buscar
                            </span>
                        </div>
                    </div>  
                </div>
                <div class="d-flex mt-2" v-if="!hidePrices">
                    <transition>
                        <div class="check-circle">
                            <span class="fa fa-check"></span>
                        </div>
                    </transition>
                    <span class="webprices" >
                        PRECIOS EN LA WEB ACTUALIZADOS AL {{today|date}} 
                    </span>
                </div>
            </div>
            <div class="col-3 flex-button" v-if="!user">
               <nuxt-link to="/login" class="d-flex">
                    <div class="reg-sq">
                        <span class="fa fa-user"></span>
                    </div>
                    <div class=" ml-1 d-flex flex-column align-items-start text-fucsia">
                        <span>Registro</span>
                        <span>Mayorista</span>
                    </div>
               </nuxt-link>
            </div>
            <div class="col-3 fcc relative" v-else>
                <div @click="toggleUserMenu"  class="d-flex align-items-center cursor-pointer">
                    <div class="reg-sq">
                        <span class="fa fa-user"></span>
                    </div>
                    <div class=" d-flex flex-column  align-items-start  text-fucsia ml-2 font-weight-bold">
                        <span>Hola</span>
                        <span>{{user.name}}</span>
                    </div>
                </div>
            </div>
            <transition enter-active-class="animated slideInRight faster"
                        leave-active-class="animated slideOutRight faster">
                     <user-menu v-if="showUserMenu" v-click-outside="toggleUserMenu"
                        @close="showUserMenu=false"></user-menu>
            </transition> 
        </div>

        <div class="row bg-first nav-row relative">


            <div class="row col-12" v-if="admin">
                <ul class="navbar admin-navbar p-2">
                    <li> <nuxt-link to="/admin"> Pedidos</nuxt-link></li>
                    <li> <nuxt-link to="/admin/productos"> Administrar productos</nuxt-link></li>
                    <li> <nuxt-link to="/admin/stats" v-if="isSuper"> Stats</nuxt-link></li>
                    <li> <nuxt-link to="/admin/estadisticas"> Estadisticas </nuxt-link></li>
                    <li> <nuxt-link to="/admin/config"> Configs</nuxt-link></li>
                    <li> <nuxt-link to="/admin/metadata"> Metadata</nuxt-link></li>
                </ul>
            </div>
            <div class="col-4 white-bold p-0">
                <div class="focus-nav-item">
                    <span class="fa fa-bars white-bold mr-1"></span>
                    <span v-if="$route.fullPath.includes('/admin')">
                        Mayorista Mates Fabi
                    </span>
                    <nuxt-link v-else to="/cotizador" class="text-white">
                        Productos Mayorista Mates Fabi
                    </nuxt-link>
                </div>
            </div>
            <div class="row col-8">
                <ul class="navbar">
                    <li> <nuxt-link to="/cotizador"> Hace tu pedido</nuxt-link></li>
                    <li> <nuxt-link to="/regalos-empresariales"> Regalos Empresariales</nuxt-link></li>
                    <li> <nuxt-link to="/sucursales"> Sucursales</nuxt-link></li>
                    <li> <nuxt-link to="/contacto"> Contacto</nuxt-link></li>
                    <li> <nuxt-link to="/franquicia"> Franquicia</nuxt-link></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import userMenu from './user-menu.vue'
import imageLogo from '../images/image-logo.vue';
import overlayMenu from './overlay-menu.vue'
import {mapGetters} from 'vuex';
export default {
    directives: {
      clickOutside: vClickOutside.directive
    },
    components : {
        imageLogo,
        overlayMenu,
        userMenu
    },
    data(){
        return{
            term:'',
            showMenu : false,
            showUserMenu:false,
     }
    },
    computed :{
        ...mapGetters({
            categories : 'getCategories'
        }),
        today(){
            return new Date();
        },
    },
    methods:{
        toggleUserMenu(){
            let status = this.showUserMenu;
            setTimeout(() => {
                this.showUserMenu = !status;
            }, 100);
        },
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

<style scoped lang="scss">
 $color-first : #b2037a;

// El verde es 09cca2 
$color-second : #09cca2;

// Rosa fuerte es ff0aaf
$color-focus: #ff0aaf; 

// Rosa claro es ff97dd
$color-back: #ff97dd;
.text-fucsia
{
    color:$color-first;
}
.webprices{
    color: #B2037A;
    font-weight: bold;
    font-size: 14px;
}
.reg-sq{
    width:60px;
    display:flex;
    justify-content:center;
    align-items:center;
    height:50px;
    border-radius:15px;
    border:2px solid #09cca2;
    font-size: 25px;
    color:#09cca2;
}
.check-circle{
    margin-right:10px;
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
}

@keyframes altercolor{
    from {
        background-color: #09cca2;
     
    }
    to{
        background-color: #B2037A;
      

    }
}

.out-button{
    font-size:2rem;
    position:absolute;
    top:10px;
    right: 10px;
    width:300px;
    cursor: pointer;
    color:red;
}
.nav-row{
    width:99vw;
    margin-left:-4%;
    font-size: .9rem;
}
.search-bar-button{
    position:absolute;
    top:0;
    right:0;
    width:90px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding:5px;
    background-color: #09cca2;
    cursor: pointer;
    z-index:20;
    &:hover{
        background-color: #ff0aaf;
    }
    
}
.focus-nav-item
{
    background-color: $color-focus;
    width: 80%;
    margin-left: 10%;
    padding: 15px 6px;
}

.fa-phone-volume{
    font-size: 2rem;
}


.navbar{
    
    font-weight: bold;
    font-size: .9rem;
    display:flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    margin: 0;
    padding: 0;
    li{
        a{
            color:#fff;
            &:hover{
                color:inherit;
                text-decoration: none;
            }
                display: flex;
                 align-items:center;
                justify-content: center;
                width: 100%;
                height: 100%;
        }

        cursor:pointer;
        padding: 1;
        
        height: 100%;
        width: 20%;
        display: flex;
        align-items:center;
        justify-content: center;
        &:hover{
             background-color: #eee;
             color: darken($color-second,10%);
            border-bottom: 3px solid $color-second;
            }
        
    }

 
     
   

}

.admin-navbar{
    
    background-color: #09cca2;
    li{
        background-color: #09cca2;
        width:15% !important;
    }
    background-color: #09cca2;
}
</style>