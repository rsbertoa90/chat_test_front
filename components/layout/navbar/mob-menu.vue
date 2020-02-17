<template>
    <div class="overlay">
        <div class="pannel" v-click-outside="close">
            <div @click="close">
                <a target="_blank" href="/descargar-lista-de-precios" class="btn-outline-aqua">
                    Lista Precios Mayorista
                </a>
            </div>
            <div @click="close" class="mt-4">
                <nuxt-link   to="/#categorias" class="item">
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
</template>


<script>
import vClickOutside from 'v-click-outside'
export default {
    directives: {
      clickOutside: vClickOutside.directive
    },
    methods:{
          close(){
            this.$emit('close');
        }
    },
    
    
}
</script>


<style lang="scss" scoped>
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
        left:5px;
        top:120px;
        width: 270px;
        padding:15px;
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
