<template>
    <div class="menu">
        <span class="title text-center"> Hola {{user.name}}, que te gustaria hacer? </span>
        <div class="pl-4 mt-2">
            <ul>
                <li v-if="!admin">
                    <nuxt-link to="/pedidos" >
                        <span class="fa fa-chevron-right"></span>
                        Ver mis pedidos
                    </nuxt-link>
                </li>
                <li v-if="!admin">
                    <nuxt-link to="/chat" >
                        <span class="fa fa-chevron-right"></span>
                        Chatear con Mates Fabi
                    </nuxt-link>
                </li>
                <li v-if="admin">
                    <nuxt-link to="/chat" >
                        <span class="fa fa-chevron-right"></span>
                        Chat
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/logout">
                        <span class="fa fa-chevron-right"></span>
                        Salir
                    </nuxt-link>
                </li>
            </ul>
            <div class="p-4">
                <nuxt-link to="/cotizador" class="btn btn-block btn-outline-second">
                    PEDIDO ONLINE MAYORISTA
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

    .menu{
        font-size: 20px;
        h2{
            font-size: 20px;
        }
        ul li{
            margin-top:10px;
            font-size: 20px;
        }
    }
    .fa{
        color:#B03B8A;
        font-size: 25px;
    }
    
    .menu
    {
        z-index:99;
        position:absolute;
        top:40px;
        right:0;
        width:100%;
        background-color: #fff;
        max-width: 400px;
        border:2px solid #B03B8A;
        padding:15px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    @media(min-width:660px)
    {
        .menu{
            top:135px;
            right: 40px;
        }
    }
</style>
