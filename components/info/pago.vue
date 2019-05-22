<template>
    <div>
        <modal @close="$emit('close')">
            <div class="mt-4 d-flex flex-column justify-content-center align-items-center">
                <div class="icon">
                    <span class="fa fa-hand-holding-usd"></span>
                </div>
                <div class="content">
                    <div class="item">
                        <span class="fa fa-check-square sm-icon"></span>
                        La forma de pago en los locales es en Efectivo
                    </div>
                    <div class="item">
                        <span class="fa fa-check-square sm-icon"></span>
                       Las forma de pago en caso de Envío son Deposito / Transferencia Bancaria
                    </div>
                </div>

            </div>
        </modal>
    </div>
</template>


<script>
import modal from '../Modal.vue';
export default {
    components:{modal},
}
</script>

<style scoped lang="scss">
.icon{
    color:#DB1B73;
    font-size:60px;
    display: flex;
    justify-content: center;
    margin-bottom:40px;
}
.sm-icon{
    color:#DB1B73;
    font-size:30px;
    display: flex;
    justify-content: center;
    margin-bottom:40px;
    margin-right: 20px;
}
    .content{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .item{
            font-size:20px;
            text-align: left;
            display:flex;
            justify-content:space-between;
            
        }
    }
</style>

