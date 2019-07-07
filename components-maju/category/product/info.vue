<template>
    <div class="d-flex flex-column" v-if="config">
        <div class="d-flex align-items-center">
            <fa-icon icon="home" class="icon"></fa-icon>
            <p>Compra mínima por local ${{config.minbuy}}. Forma de pago: efectivo</p>
        </div>
        <div class="d-flex align-items-center">
            <fa-icon icon="truck" class="icon"></fa-icon>
            <p>Compra mínima para envíos ${{config.minbuy_ship}}. Forma de pago: Deposito / Transferencia bancaria</p>
        </div>
        <div class="d-flex align-items-center">
            <fa-icon icon="user-check" class="icon"></fa-icon>
            <p>Atención personalizada por Whatsapp al 11 2708-2683. De lunes a viernes de 9hs a 18hs</p>
        </div>
    </div>
</template>

<script>
export default {
    computed:{
        config(){
            return this.$store.getters.getConfig;
        }
    }
}
</script>

<style lang="scss" scoped>
    .icon{
        color:#D52B1E;
        font-size:2rem;
        margin-right: 10px;
    }
    p{
        font-size:1.2rem;
        color:#3d3c3c;
    }
</style>

