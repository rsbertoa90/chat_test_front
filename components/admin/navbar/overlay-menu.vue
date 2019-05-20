<template>
    <div id="overlay" @click="close">
        <transition appear enter-active-class="animated slideInDown fast faster">
            <div class="menu">
              
                <nuxt-link to="/admin" class="menu-item">
                    <span class="fa fa-user-cog"></span>
                    <span>
                        Administrar productos
                    </span>
                </nuxt-link>
                <nuxt-link to="/admin/pedidos" class="menu-item">
                    <span class="fa fa-user-cog"></span>
                    <span>
                        Pedidos
                    </span>
                </nuxt-link>
                <nuxt-link to="/admin/metadata" class="menu-item">
                    <span class="fa fa-user-cog"></span>
                    <span>
                        Metadata
                    </span>
                </nuxt-link>
                <a @click.prevent="logout" class="menu-item">
                    <span class="fa fa-user-cog"></span>
                    <span>
                        Salir
                    </span>
                </a>
                

                

            </div>
        </transition>
    </div>
</template>

<script>


import {mapGetters} from 'vuex';
export default {
    components : {
      
      
    },
   
    computed :{
        ...mapGetters({
            categories : 'getCategories',

        }),
    },
    methods:{
        logout()
        {
            this.$auth.logout();
        },
        close(){
            this.$emit('close');
        }
    }
}
</script>

<style scoped lang="scss">

.menu-item{
    color:#707070;
    margin-top:20px;
    display: flex;
    
    .fa, .fas{
        margin-right:7px;
        color: #DB1B73;
    }
}


.prices-list-button{
    width:201px;
    padding:5px;
    display: flex;
    justify-content: center;
    border-radius:15px;
    color:#fff;
    font-weight: bold;
    text-shadow: 1px 1px #0007;
    background-color: #F2B742;
    font-size: 20px;
    -webkit-box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.75);
    box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.75);
}

.slideInDown {
  -webkit-animation: slideInDown .5s; /* Safari 4+ */
  -moz-animation:    slideInDown .5s; /* Fx 5+ */
  -o-animation:      slideInDown .5s; /* Opera 12+ */
  animation:         slideInDown .5s; /* IE 10+, Fx 29+ */
}




      #overlay{
        width: 100vw;
        height: 100vh;
        background-color: #aaaaaa55;
        position: fixed;
        top: 56px;
        left: 0;
        z-index: 50;
        .menu{
            padding-top:30px;
            padding-bottom:40px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding-left:27px;
            align-items:flex-start;
            position: absolute;
            right:5px;
            top:5px;
            width:246px;
            height: 274px;
            background-color: #fff;
            border-radius: 15px;
            -webkit-box-shadow: 3px 6px 11px 2px rgba(0,0,0,0.75);
            -moz-box-shadow: 3px 6px 11px 2px rgba(0,0,0,0.75);
            box-shadow: 3px 6px 11px 2px rgba(0,0,0,0.75);
        }
    }
    

</style>