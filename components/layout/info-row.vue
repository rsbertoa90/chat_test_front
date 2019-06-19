<template>
    <div v-if="configs" class="col-12 row">
        <h4 class=" col-12 col-lg-6 text-center banner-font">
            <fa-icon icon="home" class="text-red"></fa-icon>
            Compra mínima para retirar en el local ${{configs.minbuy}}. Pago en efectivo.
        </h4>
        <h4 class="col-12 col-lg-6 text-center banner-font">
            <fa-icon icon="truck" class="text-red"></fa-icon>
            Compra mínima para envíos ${{configs.minbuy_ship}}. Pago depósito / transferencia bancaria.
        </h4>
    </div>
</template>


<script>
export default {
   
    computed:{
        configs()
        {
            return this.$store.getters.getConfig;
        }
    },
  
}
</script>

<style lang="scss" scoped>

.banner-font{
    font-size:1.25rem;
}
</style>

