<template>
    <div class="overlay">
        <div class="pannel" v-click-outside="close">
            <div @click="close" class="logo-container">
                   <imageLogo></imageLogo>
            </div>
            <div class="p-4">

                <div @click="close">
                    <a target="_blank" href="/descargar-lista-de-precios" class="btn-outline-aqua">
                        Lista Precios Mayorista
                    </a>
                </div>
                <div @click="close" class="mt-4">
                    <nuxt-link  to="/categorias" class="item">
                        <span class="fa fa-chevron-right mr-1"></span>
                        Categorias Productos
                    </nuxt-link>
                </div>
                <div @click="close">
                    <a  @click="close" target="_blank" href="/descargar-catalogo-digital" class="item">
                        <span class="fa fa-chevron-right mr-1"></span>
                        Catalogo Digital
                    </a>
                </div>
                <div @click="close">
                    <nuxt-link   to="/regalos-empresariales" class="item">
                        <span class="fa fa-chevron-right mr-1"></span>
                        Regalo Empresarial
                    </nuxt-link>
                </div>

                <div @click="close">
                    <nuxt-link    to="/cotizador" class="btn-outline-aqua mt-4">
                        Pedido Online Mayorista
                    </nuxt-link>
                </div>

                <div @click="close">
                    <nuxt-link  to="/contacto" class="item mt-4">
                        <span class="fa fa-chevron-right mr-1"></span>
                        Contacto
                    </nuxt-link>
                </div>

                <div @click="close">
                    <nuxt-link  @click="close" to="/sucursales" class="item">
                        <span class="fa fa-chevron-right mr-1"></span>
                        Sucursales
                    </nuxt-link>
                </div>

                <div @click="close">
                    <a target="_blank"  href="https://wa.me/541130085414" class="btn-outline-aqua mt-4">
                        Whatsapp
                    </a>
                </div>
            </div>

        </div>
    </div>
</template>


<script>
import imageLogo from '../images/mobile-logo.vue';
import vClickOutside from 'v-click-outside'
export default {
    directives: {
      clickOutside: vClickOutside.directive
    },
    components:{imageLogo},
    methods:{
        gotocategories(){
            this.$router.push('/');
            setTimeout(() => {
                let el = document.getElementById('idcategorias');
               // console.log(el);
                if(el){
                    var topPoss = el.getBoundingClientRect().top - 1300;
                   // console.log('y pos', topPoss);
                }
                window.scrollTo(0,topPoss);
            }, 500);
        },
          close(){
            this.$emit('close');
        }
    },
    
    
}
</script>


<style lang="scss" scoped>

.logo-container{
    width:10s0px;
    margin:auto;
}


.item{
    font-size: 20px;
    display: flex;
    justify-content: flex-start;
    width:220px;
    margin-top:10px;
    .fa{
        color:#B03B8A;
        font-size: 25px;
    }

}
    .overlay{
        width:100vw;
        height: 100vh;
        position:fixed;
        top:0;
        left:0;
        z-index: 999;
    }

    .pannel{
        position:absolute;
        left:0px;
        top:0px;
        width: 270px;
        //padding:15px;
        border:1px solid #B03B8A;
        background-color: #fff;
        z-index: 999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }

    .btn-outline-aqua{
        font-size: 18px;
        
        width:230px;
        font-size: 20px;
        color:#3FC1A5;
        background-color: #fff;
        border:1px solid #3FC1A5;
        border-radius:5px;
        cursor: pointer;
        padding:2px;
        display: flex;
        justify-content: center;
        
    }
</style>
