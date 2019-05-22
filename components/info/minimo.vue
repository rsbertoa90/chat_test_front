<template>
    <div>
        <modal @close="$emit('close')">
            <div class="mt-4 d-flex flex-column justify-content-center align-items-center">
                <div class="icon">
                    <span class="fa fa-shopping-cart"></span>
                </div>
                <div class="content">
                    <div class="item">
                        <span class="fa fa-check-square sm-icon"></span>
                       Mínimo de compra por local es de ${{config.minbuy}}
                    </div>
                    <div class="item">
                        <span class="fa fa-check-square sm-icon"></span>
                      Mínimo de compra para Envío es de ${{config.minbuy_ship}}
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

