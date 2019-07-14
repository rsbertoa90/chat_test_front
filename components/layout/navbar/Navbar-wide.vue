<template>
    <div class="w-100 pl-4 pr-4 pt-0">
        
        <div class="row d-flex justify-content-around align-items-center pl-4 pr-4 pt-0">
            <div class="col-2 p-4">
                <div class="">
                    <image-logo></image-logo>
                </div>
            </div>
            <div class="col-6">
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
            </div>
            <div class="col-3 flex-button">
                <span class="white-bold bg-second p-2 flex-button rounded" style="width:60px">
                    <i class="fas fa-phone-volume"></i>
                </span>  
                <span class=" p-3 d-big"> 11 3008 5414</span>
            </div>
        </div>

        <div class="row bg-first nav-row">
            <div class="row col-12" v-if="admin">
                <ul class="navbar admin-navbar p-2">
                    <li> <nuxt-link to="/admin"> Pedidos</nuxt-link></li>
                    <li> <nuxt-link to="/admin/productos"> Administrar productos</nuxt-link></li>
                    <li> <nuxt-link to="/admin/stats" v-if="isSuper"> Stats</nuxt-link></li>
                    <li> <nuxt-link to="/admin/busquedas"> Busquedas</nuxt-link></li>
                    <li> <nuxt-link to="/admin/config"> Configs</nuxt-link></li>
                    <li> <nuxt-link to="/admin/metadata"> Metadata</nuxt-link></li>
                </ul>
            </div>
            <div class="col-4 white-bold p-0">
                <div class="focus-nav-item">
                    <span class="fa fa-bars white-bold mr-1"></span>
                    Productos Mayorista Mates Fabi
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
        <nuxt-link to="/logout" class="out-button" v-if="admin">
            <fa-icon icon="user-cog"></fa-icon> 
            Salir
        </nuxt-link>
    </div>
</template>

<script>
import imageLogo from '../images/image-logo.vue';
import overlayMenu from './overlay-menu.vue'
import {mapGetters} from 'vuex';
export default {
    components : {
        imageLogo,
        overlayMenu
    },
    data(){
        return{
            term:'',
            showMenu : false
     }
    },
    computed :{
        ...mapGetters({
            categories : 'getCategories'
        }),
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

<style scoped lang="scss">
 $color-first : #b2037a;

// El verde es 09cca2 
$color-second : #09cca2;

// Rosa fuerte es ff0aaf
$color-focus: #ff0aaf; 

// Rosa claro es ff97dd
$color-back: #ff97dd;


.out-button{
    font-size:2rem;
    position:absolute;
    top:10px;
    right: 10px;
    width:120px;
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