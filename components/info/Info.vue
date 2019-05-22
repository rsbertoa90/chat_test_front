<template>
    <div class="d-flex flex-column">
        <div class="d-flex justify-content-between item" @click="showPago =true">
            <span>FORMAS DE PAGO</span>
            <span class="plus"> + </span>
            
        </div>
        <div class="d-flex justify-content-between item"  @click="showMinimo =true">
             <span>MINIMO DE COMPRA</span>
            <span class="plus"> + </span>
        </div>
        <div class="d-flex justify-content-between item"  @click="showEnvio =true">
             <span>FORMA DE ENVIO</span>
            <span class="plus"> + </span>
        </div>
        <div class="d-flex justify-content-between item" v-if="product && product.description && product.description.trim() != ''"
            @click="showDescri=true">
             <span>DETALLE DE PRODUCTO</span>
            <span class="plus"> + </span>
        </div>

        <modalPago v-if="showPago" @close="showPago=false" ></modalPago>
        <modalMinimo v-if="showMinimo" @close="showMinimo=false" ></modalMinimo>
        <modalEnvio v-if="showEnvio" @close="showEnvio=false" ></modalEnvio>
        <productDescri v-if="product &&  product.description && product.description.trim() && showDescri" :product="product" @close="showDescri=false"></productDescri>
    </div>
</template>

<script>
import modalPago from './pago.vue';
import modalMinimo from './minimo';
import modalEnvio from './envio';
import productDescri from '@/components/product/descriModal.vue';
export default {
    components:{modalPago,modalEnvio,modalMinimo,productDescri},
    data(){
        return{
            showPago:false,
            showEnvio:false,
            showMinimo:false,
            showDescri:false
        }
    },
    props:['product']
}
</script>


<style lang="scss" scoped>
    .item{
        height: 20px;
        margin-top:10px;
        cursor: pointer;
        border-bottom:1px solid #DB1B73;
        font-size: 14px;
        span{
            display: flex;
            justify-content: center;
            align-items:center;
            margin-bottom:5px;
        }
        .plus{
            font-weight: bold;
            font-size: 30px;
        }
        &:hover{
            background-color: #DB1B7355;
        }
    }
</style>