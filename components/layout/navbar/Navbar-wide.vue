<template>
    <div class="w-100">
        
        <div v-if="!admin" class="row d-flex justify-content-around align-items-center ml-1">
            
            <div class="col-3 offset-1">
                <form class="form-inline" @submit.prevent="search">
                    <div class="input-group w-100">
                        <input type="text" class="form-control pl-input" 
                                 aria-label="Buscar productos"
                                placeholder="Que estas buscando?"
                                v-model="term">
                        <div class="input-group-prepend">
                            <span class="white-bold input-group-text bg-second d-flex justify-content-center" 
                                  id="basic-addon1">
                            <i class="fa fa-search"></i>
                                
                            </span>
                        </div>
                    </div>  
                </form>
            </div>
            
            <div class="col-4 p-4">
                <div class="p-4">
                    <image-logo></image-logo>
                </div>
            </div>

            <div class="col-4 flex-button">
                <span class="white-bold bg-second p-2 flex-button rounded" style="width:60px">
                    <span class="fa fa-phone"></span>
                </span>  
                <span class=" p-3 d-big"> 11 3895 1332  </span>
            </div>
        </div>

        <div class="row nav-row" v-if="admin">
            <div class="row col-12">
                <ul class="navbar mb-4">
                    <li class="nav-text">
                        <nuxt-link to="/admin/pedidos"><i class="fas fa-user-cog"></i>  Mis pedidos</nuxt-link>
                    </li>
                    <li class="nav-text">
                        <nuxt-link to="/admin"><i class="fas fa-user-cog"></i>  Administrar productos</nuxt-link>
                    </li>

                    <li class="nav-text">
                        <nuxt-link to="/admin/metadata"><i class="fas fa-user-cog"></i>  Metadata</nuxt-link>
                    </li>
                    
                    
                    <li class="nav-text">
                        <a @click.prevent="logout"><i class=" fas fa-user-cog"></i> Salir</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row nav-row">
            <div class="row col-12">
                <ul class="navbar">
                     <li> <nuxt-link to="/cotizador"> <span class="fa fa-shopping-cart mr-2 text-focus"></span> HACE TU PEDIDO</nuxt-link></li>
                     <li> <nuxt-link to="/sucursales"> <span class="fas fa-map-marker-alt mr-2 text-focus"></span> UBICACION</nuxt-link></li>
                    <li> <nuxt-link to="/contacto">  <span class="fas fa-mobile-alt mr-2 text-focus"></span> CONTACTO</nuxt-link></li>
                </ul>
            </div>
        </div>
        <hr>
        <div class="row nav-row">
            <div class="row col-12">
                <ul class="navbar">
                    <li v-for="supercategory in supercategories" 
                        :key="supercategory.id"
                        :class="{'hovered':supercat_id == supercategory.id && (overMenu || overNav)}" @mouseleave="overNav=false"  
                        @mouseover="setsupercat(supercategory.id)"> 
                        <nuxt-link :to="supercategory.slug">  
                            {{supercategory.name}} 
                           <span class="fas fa-chevron-up rotated-chevron"></span>
                        </nuxt-link>
                    </li>
                    
                   
                </ul>
            </div>
        </div>
          <transition enter-active-class="animated fadeIn fastest"
                            leave-active-class="animated fadeOut fastest">
                    <div v-show="overMenu || overNav" 
                        @mouseover="overMenu=true"
                        @mouseleave="overMenu=false" 
                        class="nav-row row bg-first d-flex justify-content-center" >
                        <nuxt-link v-for="category in menucats" :key="category.id"
                            :to="category.slug" 
                             class="subcat col-2 align-items-center d-flex justify-content-center">

                            {{category.name | uc}}
                        
                        </nuxt-link>
                    </div> 
            </transition>
    </div>
</template>

<script>
import imageLogo from '../images/image-logo.vue';

import {mapGetters} from 'vuex';
export default {
    components : {
        imageLogo,
     
    },
    data(){
        return{
            supercat_id :1,
            overMenu : false,
            overNav : false,
            term:'',
     }
    },
    
    computed:{
        menucats(){
            return this.categories.filter(cat => {
                return cat.supercategory_id == this.supercat_id
            });
        },
    },
    methods:{
        search(){
            this.$store.commit('setSearchTerm',this.term);
            this.$router.push('/resultados-de-busqueda');
        },
        logout(){
            this.$axios.post('/logout')
                .then(r=>{
                    if(process.browser){
                        setTimeout(() => {
                            window.location.replace('/');
                        }, 200);
                    }
                });
        },
        setsupercat(id){
            this.supercat_id = id;
            this.overNav = true;
        },
        mouseleaved(){
            setTimeout(()=>{
               if (!this.showMenu){
                   this.supercat_id = null;
               }
            },1000);
        }
    }
}
</script>

<style lang="scss"  >
.rotated-chevron{
    transform:rotate(180deg);
    margin-left:5px;
    color:#fff;
    font-size:15px;
}

 $color-first : #d32381;


// El verde es 09cca2 
$color-second : #24FFB8;

// Rosa fuerte es ff0aaf
$color-focus: #1EAAFF; 

// Rosa claro es ff97dd
$color-back: #0FE0E8;

$color-other: #104DE8;


.input-group{
    position:relative;
    .pl-input{
        padding-left:50px;
        &:focus{
            z-index:1;
        }
    }
}
.input-group-prepend{
    position:absolute;
    top:0;
    left:0;
    height:100%;
    width:20px;
    z-index:100;

}

.fa-chevron-down {
    margin-left: 5px;
    font-weight: normal;
}

.subcat
{
    text-align: center;
    padding: 10px;
    margin-bottom: 5px;
   //border:1px solid #fff;
    cursor: pointer;
     color: #fff;
     font-weight: bold;
    &:hover{
       background-color: #eee;
        color: $color-first;
        border-bottom: 3px solid $color-second;
    }
}

.focus-nav-item
{
    background-color: $color-focus;
    width: 80%;
    margin-left: 10%;
    padding: 15px 6px;
}

.fa-phone{
    font-size: 2rem;
}

  
.navbar{
    /* font-weight: bold; */
    color:#000;
    display:flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    margin: 0;
    padding: 0;
    li{
        a{
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
             background-color: $color-first;
             color: #fff;
             border-bottom: 3px solid $color-second;
            }
        
    }

    .hovered{
           background-color: $color-first;
            color: #fff;
            border-bottom: 3px solid $color-second;
    }
 
     
   

}
</style>