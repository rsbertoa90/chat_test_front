<template>
<div >
        <div class="top-space" v-if="!collapsed"></div>
         <nav class="flex-nav" 
                :class="{'bg-info':user && user.role_id < 3,
                        'bg-red':!user || user.role_id > 2 }" >
                <div @click="closeNav">
                    <nuxt-link class="navbar-brand " to="/" @click="closeNav">
                        <v-lazy-image  style="width:45px" :src="imagePath('/storage/images/app/logo.png')" alt="Bazar Mayorista Maju" />
                    </nuxt-link>
                </div>
                <search-bar></search-bar>
                <button  @click="toggleCollapsed" class="navbar-toggler">
                    <fa-icon icon="bars" class="text-white" v-if="collapsed"> </fa-icon>
                    <fa-icon icon="times" class="text-white" v-else> </fa-icon>
                </button>
                <div @click="closeNav">
                    <nuxt-link to="/carrito" class="carrito" v-if="config && !config.maintenance">
                        <fa-icon icon="shopping-cart"></fa-icon>
                        <span class="nro-carrito" v-if="list">{{list.length}}</span>
                    </nuxt-link>
                </div>
          </nav>  
                <div class="collapsable-menu" :class="{'bg-info':user && user.role_id < 3,
                        'bg-red':!user || user.role_id > 2,
                        'ccollapsed':collapsed, 'nonCollapsed':!collapsed }"   id="navbarNav">
                    <ul class="navbar-nav" >

                         <li class="nav-item text-white">
                            <a class="nav-link text-white " href="#" @click="showCategories = !showCategories">
                               <fa-icon icon="list"></fa-icon> Categorias 
                                <fa-icon icon="chevron-down" v-if="!collapsed && showCategories"></fa-icon> 
                                <fa-icon icon="chevron-right" v-else></fa-icon> 
                            </a>
                            <div class="category-container" :class="{'category-displayed':showCategories}">
                                <ul v-if="categories && showCategories" class="categories-list" >
                                    <li v-for="category in categories" :key="category.name" @click="closeNav">
                                        <nuxt-link :to="category.slug" >
                                            {{category.name}}
                                        </nuxt-link>
                                    </li>
                                </ul>
                            </div>
                           
                        </li>
                         
                        <li class="nav-item text-white" @click="closeNav" v-if="config && !config.maintenance">
                            <nuxt-link class="nav-link text-white" to="/ofertas">
                            <fa-icon icon="award"></fa-icon> Ofertas <span class="sr-only">(current)</span>
                            </nuxt-link>
                        </li>
                        <li class="nav-item text-white" @click="clearSearchTerm" v-if="config && !config.maintetenance">
                            <nuxt-link class="nav-link text-white" to="/cotizador" >
                                <fa-icon icon="shopping-cart"></fa-icon> Todos los productos <span class="sr-only">(current)</span>
                            </nuxt-link>
                        </li>
                        <li class="nav-item text-white" @click="closeNav">
                            <nuxt-link class="nav-link text-white" to="/contacto">
                                <fa-icon icon="phone"></fa-icon>  Contactate
                            </nuxt-link>
                        </li>
                        <li class="nav-item text-white" @click="closeNav" v-if="config && !config.maintenance">
                             <a class="nav-link text-white" target="_blank" :href="backendpath+'/descargar-lista-de-precios'" >
                                <fa-icon icon="download"></fa-icon> Lista de precios
                            </a> 
                        </li>
                        <li class="nav-item text-white" @click="closeNav" v-if="config && !config.maintenance">
                            <a class="nav-link text-white" target="_blank" 
                                :href="backendpath+'/descargar-catalogo-digital'">
                                <fa-icon icon="download"></fa-icon> Catalogo digital
                            </a> 
                        </li>
                        <li class="nav-item text-white" @click="closeNav">
                            <a class="nav-link text-white" target="_blank" rel="noreferrer"
                                href="https://goo.gl/maps/41ThzXr52pF2">
                                <fa-icon icon="home"></fa-icon> ¿Donde estamos?
                            </a> 
                        </li>
                       
                        <!-- ADMIN -->
                      
                        <li class="nav-item " v-if="admin" @click="closeNav">
                            <nuxt-link class="nav-link text-white" to="/admin"> <fa-icon icon="user-cog"></fa-icon> Pedidos</nuxt-link>
                        </li>
                        <li class="nav-item " v-if="isSuper" @click="closeNav">
                            <nuxt-link class="nav-link text-white" to="/admin/stats"> <fa-icon icon="user-cog"></fa-icon> Stats</nuxt-link>
                        </li>
                        <li class="nav-item " v-if="admin" @click="closeNav">
                            <nuxt-link class="nav-link text-white" to="/admin/busquedas"> <fa-icon icon="user-cog"></fa-icon> Busquedas</nuxt-link>
                        </li>
                        <li class="nav-item " v-if="admin" @click="closeNav">
                            <nuxt-link class="nav-link text-white" to="/logout"> <fa-icon icon="user-cog"></fa-icon> Salir</nuxt-link>
                        </li>
                    </ul>
                </div>
        
</div>
</template>
<script>
import searchBar from './search-bar.vue';
export default {
    components:{searchBar},
    data(){return{
        collapsed:true,
        showCategories:false
    }},
    computed:{
        config(){
            return this.$store.getters.getConfig;
        },
        list(){
            return this.$store.getters.getList;
        },
        total(){
            return this.$store.getters.getTotal;
        },
        user(){
            return this.$store.getters.getUser;
        },
        categories(){
            return this.$store.getters.getNotPaused;
        }
    },
    methods:{
        toggleCollapsed(){
            if (this.collapsed){
                this.collapsed = false;
                if(process.browser){
                   window.scrollTo(0,0);
                }
            }else{
                this.collapsed=true;
            }
        },
        clearSearchTerm(){
            this.$store.commit('setSearchTerm','');
            this.closeNav();
        },
        closeNav(){
            if(!this.collapsed){
              this.collapsed=true;
            }
        }
    }
}
</script>

<style lang="scss">
.collapsable-menu{
    position:fixed;
    top:40px;
    padding-top:20px;
    padding-left:15px;
    left:0;

}
.ccollapsed{
    z-index:900;
    max-height: 0px;
    overflow: hidden;
    //transition: all .3s
}
.nonCollapsed{

    max-height: 90vh;
    width:100vw;
    transition: all .3s
}
.top-space{
    width:100vw;
    height: 100vh;
}

.flex-nav{
    width: 100vw;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 900;
    /* padding: 5px; */
    padding-left: 20px;
}
.navbar-collapse{
   // background-color: #D52B1E;
    width:100vw;
    position:absolute;
    left:0;
    top:40px;
    padding-left:15px;
    z-index:900;
}
.navbar-brand{
    width:50px;
}
.admin-nav-color{
    background-color: blue;
}

    .text-white{
        color:#fff;
       
    }

    .category-container{
        height:0;
        width:100%;
       
        transition: height 1s;
    }
    .category-displayed{
        height:200px;
        overflow-y:auto;
        transition: height 1s;
    }

    .navbar{
        padding:0 .9rem 0 .9rem;
       /*  background-color: #D52B1E; */
        width:100vw;
         position:fixed;
        top:0;
        left:0;
        z-index:999;
        box-shadow: 2px 2px 5px #999;
    }

    .carrito{
        position:relative;
        color:#fff;
        a{
            color:#fff;
            
        }
        .nro-carrito{
            display: flex;
            width:15px;
            height:15px;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            border:1px solid #868686;
            color:#D52B1E;
            position:absolute;
            top:0;
            right:-5px;
            border-radius:50%;
            font-size: .64rem;
        }
    }
    
    .categories-list{
        
        color:#fff;
        a{
            color:#fff;
        }
        height:300px;
        overflow-y:auto;
        overflow-x:hidden;
        white-space: normal;
    }
</style>