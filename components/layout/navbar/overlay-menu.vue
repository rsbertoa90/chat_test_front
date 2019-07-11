<template>
    <div id="overlay" >
        <div class="row w-100 p-0 m-0 d-flex ">
           
                <div class="col-9 col-lg-4 p-0">
                     <ul v-if="admin" v-click-outside="close">    
                        <li v-for="route in adminroutes" :key="route.url" @click="close">
                            <nuxt-link :to="route.url" class="text-danger">
                               Admin - {{route.name | ucFirst}}
                            </nuxt-link>
                        </li>
                        
                    
                    </ul>
                    <ul v-click-outside="close">    
                        <li v-for="route in routes" :key="route.url" @click="close">
                            <nuxt-link :to="route.url">
                                {{route.name | ucFirst}}
                            </nuxt-link>
                        </li>
                        <li v-for="category in categories" :key="category.id" @click="close">
                            <nuxt-link :to="category.slug">
                                {{category.name | ucFirst}}
                            </nuxt-link>
                        </li>
                    
                    </ul>
                   
                </div>
       
        </div>
    </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import {mapGetters} from 'vuex';
export default {
    directives: {
      clickOutside: vClickOutside.directive
    },
    data(){
        return{
            showMenu : false,
            adminroutes: [
                  {url : '/admin',name : 'pedidos'},
                  {url : '/admin/busquedas',name : 'busquedas'},
                  {url : '/logout',name : 'salir'},
            ],
            routes : [
            {url : '/',name : 'home'},
            {url : '/regalos-empresariales',name : 'Regalos empresariales'},
            {url : '/cotizador',name : 'Hace tu pedido'},
            {url : '/sucursales',name : 'Sucursales'},
            {url : '/contacto',name : 'Contacto'},
            {url : '/franquicia',name : 'Franquicia'},
        ]
                
            
     }
    },
    computed :{
        ...mapGetters({
            categories : 'getCategories',

        }),
    },
    methods:{
        close(){
            this.$emit('close');
        }
    }
}
</script>

<style scoped lang="scss">

// violeta oscuro es b2037a
$color-first : #b2037a;

// El verde es 09cca2 
$color-second : #09cca2;

// Rosa fuerte es ff0aaf
$color-focus: #ff0aaf; 

// Rosa claro es ff97dd
$color-back: #ff97dd;



      #overlay{
        width: 100vw;
        height: 100vw;
        background-color: #aaaaaa55;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 50;
    }
    
  ul > li:nth-child(odd) {
  background: #fff;
}
  ul > li:nth-child(even) {
  background: darken( #fff, 10% );
}

ul li {
    font-size: 1rem;
    color : $color-first;
    font-weight: bold;
    border-bottom: 1px solid $color-first;
    padding-left: 15px;
    a {
        display: block;
    }
}

</style>