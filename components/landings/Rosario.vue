<template>
<div class="d-flex flex-column align-items-ceenter">
    <h1 class="text-center"> MAYORISTA MATES FABI: ENVÍOS A ROSARIO </h1>
    <div class="buttons row">
          <a type="button" href="/descargar-lista-de-precios" target="_blank" class="col-11 offset-1 col-lg-5 btn btn-lg btn-outline-info"> <span class="fa fa-download"></span>  LISTA DE PRECIOS</a>
        <nuxt-link type="button" to="/cotizador"  class="col-11 col-lg-5 offset-1 btn btn-lg btn-outline-info"> <span class="fa fa-shopping-cart"></span> VER PRODUCTOS</nuxt-link>
        
    </div>

    <p class="mt-3">
        <span class="fa fa-check">
        </span>
        Una vez hecho tu pedido tarda de 3 a 5 días hábiles en salir desde el local. Te lo llevamos sin cargo  hasta el transporte que hayas elegido, y desde el transporte a tu localidad tendrías que averiguar el costo con la empresa que elijas, el mismo corre a cargo del comprador.  Algunas empresas de trasporte que van a Rosario:Via Cargo, Expreso Lancioni, Rosario Cargas, Transporte San jose, Transporte Orion, Expreso Lo Bruno.
    </p>
    <p>
        <span class="fa fa-check">
        </span>
            Podes hacer tu pedido por el <nuxt-link class="links" to="/cotizador">Cotizador de la pagina web</nuxt-link>  o por 
            <a class="links" href="https://wa.me/541130085414"> WhatsApp <span class="font-weight-bold">( 11 3008 5414 )</span>  </a>, una vez que nos llega tu pedido corroboramos tener la mercadería en stock y te reenviamos el presupuesto, vos lo revisas y si esta todo bien te enviamos los datos para que puedas hacer el deposito o transferencia bancaria. Una vez hecha la transferencia necesitamos que nos mandes la foto del comprobante, y ahí despachamos tu pedido.
    </p>

</div>    
</template>

<script>
export default {
     metaInfo(){
        return{
            title: "Envios a Rosario - Mates Fabi",
        }
    },
}
</script>

<style lang="scss" scoped>
.links{
    

        color:blue;
        &:hover{
            color:lightseagreen;
        }
    
}
</style>
