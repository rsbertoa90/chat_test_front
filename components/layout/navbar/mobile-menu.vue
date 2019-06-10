<template>
<div>

    
        <div id="overlay">

            <div id="menu" >

                


                <div class="row w-100 p-0 m-0 d-flex ">
                    <div class="col-12 d-flex">
                        <span class="fa fa-bars ml-2 mt-4" @click="close"></span>
                    </div>
                    <div class="col-12 p-4 d-flex jusfify-conten-center align-items-center">
                        <form class="form-inline w-100" @submit.prevent="search">
                            <div class="input-group w-100">
                                <input type="text" class="form-control" 
                                        aria-label="Buscar productos"
                                        placeholder="Que estas buscando?"
                                        v-model="term">
                            </div>  
                        </form>
            
                    </div>
                    <hr/>
                
                       
            
                </div>

                 <div class="col-12 p-0" v-if="supercategories">
                    <ul> 
                        <li 
                            v-for="sup in supercategories" 
                            :key="sup.id"
                            @click="openSubmenu(sup)">
                            <div class="w-100 d-flex justify-content-between">
                                {{sup.name | uc}}
                                <i class="fa fa-chevron-right" :class="{'chevron-down':sup.submenu}"></i>
                            </div>
                            <div v-show="sup.submenu" class="row mt-2" 
                                :class="{'submenu-displayed':sup.submenu , 'submenu-nondisplayed':!sup.submenu}">
                                <div class="col-12 submenucat" v-for="cat in submenuCats" :key="cat.id">
                                    <nuxt-link :to="cat.slug">
                                        <span class="fa fa-check"></span>    {{cat.name | uc}}
                                    </nuxt-link>
                                </div>
                            </div>
                        </li>
                        <li v-for="route in routes" :key="route.url" @click="close">
                            <nuxt-link :to="route.url" >
                                <span :class="route.icon" class="mr-1"></span>
                                {{route.name | uc}}
                            
                            </nuxt-link>
                        </li>
                      
                    </ul>
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
            term:'',
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
   
    methods:{
         search(){
            this.$store.commit('setSearchTerm',this.term);      
            this.$router.push('/resultados-de-busqueda');
            this.close();
        },
        close(){
            this.$emit('close');
        },
        openSubmenu(supercat){
            console.log('opensubmenu');
            if(supercat.submenu){
                supercat.submenu=false;
            }
            else{
                this.$set(supercat,'submenu',true);
                supercat.submenu=true ;
                this.submenuCats = this.categories.filter(cat => {
                    return cat.supercategory_id == supercat.id;
                });
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

.submenu-nondisplayed{
    height: 0;
    transition:all .4s;

}


.chevron-down{
    transform: rotate(90deg);
}
.submenu-displayed{
    max-height: 200px;
    overflow-y:scroll;
    overflow-x:hide;
    transition:all .4s;
}

.submenucat{
   
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