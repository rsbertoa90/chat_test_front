<template>
<div>

    
        <div id="overlay">

            <div id="menu" >
                <div class="row w-100 p-0 m-0 d-flex ">
                    <div class="col-12 d-flex">
                        <span class="fa fa-bars ml-2 mt-4" @click="close"></span>
                    </div>
                    <div class="col-12 p-4 d-flex jusfify-conten-center align-items-center">
                        <form class="form-inline w-100" action="/buscar">
                            <div class="input-group w-100">
                                <input type="text" class="form-control" 
                                        aria-label="Buscar productos"
                                        placeholder="Que estas buscando?"
                                        name="search">
                            </div>  
                        </form>
            
                    </div>
                    <hr/>
                
                        <div class="col-12 p-0" v-if="supercategories">
                            <ul> 
                                <li v-for="route in routes" :key="route.url" @click="close">
                                    <router-link :to="route.url" >
                                        <span :class="route.icon" class="mr-1"></span>
                                        {{route.name | uc}}
                                    
                                    </router-link>
                                </li>
                                <li 
                                    v-for="sup in supercategories" 
                                    :key="sup.id"
                                    @click="openSubmenu(sup)">
                                    <div class="w-100 d-flex justify-content-between">
                                        {{sup.name | uc}}
                                        <i :class="{'fa fa-chevron-right':!sup.submenu,
                                                    'fa fa-chevron-down':sup.submenu}"></i>
                                    </div>
                                    <div v-if="sup.submenu" class="row mt-2">
                                        <div class="col-6 submenucat" v-for="cat in submenuCats" :key="cat.id">
                                            <router-link :to="cat.slug">{{cat.name | uc}}</router-link>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
            
                </div>
            </div>
        </div>
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
            submenuCats:[],
            supercategory:null,
            showCats:false,
            showMenu : false,
            routes : [
            {url : '/',name : 'home', icon:'fas fa-home'},
            {url : '/cotizador',name : 'Hace tu pedido', icon:'fa fa-shopping-cart'},
            {url : '/sucursales',name : 'Ubicacion', icon:'fas fa-map-marker-alt'},
            {url : '/contacto',name : 'Contacto', icon:'fas fa-mobile-alt'},
        ]
                
            
     }
    },
    computed :{
        ...mapGetters({
            categories : 'getCategories',
            supercategories: 'getSupercategories'

        }),
    },
    methods:{
        close(){
            this.$emit('close');
        },
        openSubmenu(supercat){
            console.log('opensubmenu');
            if (!supercat.submenu){
                vue.set(supercat,'submenu',true);
                this.submenuCats = this.categories.filter(cat => {
                    return cat.supercategory_id == supercat.id;
                });
            }
            else{
                supercat.submenu=false;
            }    
            console.log(supercat.submenu);
        },
    },
    
}
</script>

<style scoped lang="scss">

 
 $color-first : #d32381;

 // El verde es 09cca2 
 $color-second : #0FE0E8;

 // Rosa fuerte es ff0aaf
 $color-focus: #009bc8;

 // Rosa claro es 24FFB8
 $color-back: #24FFB8;

 $color-other: #104DE8;

.submenucat{
    padding: 5px;
    border:1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items:center;
    text-align:center;
    cursor: pointer;
    &:hover{
          background-color: $color-first;
             color: #fff;
             border-bottom: 3px solid $color-second;
    }    

}


#overlay{
    background-color:#ccc;
    position: fixed;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    z-index:300;


}

#menu{
        width: 100vw;
        background-color: #eee;
        position: absolute;
        top: 0px;
        left: 0;
        z-index: 400;
    }

ul li {
    font-size: 1rem;
    color : #555;
    font-weight: bold;
    border-bottom: 1px solid $color-first;
    padding: 15px;

    a {
        display: block;
    }
}

hr {
  border: 0;
  clear:both;
  display:block;
  width: 96%;               
  background-color:#ccc;
  height: 1px;
}

</style>