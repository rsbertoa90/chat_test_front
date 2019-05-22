<template>
    <div>
        <modal @close="$emit('close')" v-if="product">
            <div class="mt-4 d-flex flex-column justify-content-center align-items-center">
                <div class="icon">
                    <img :src="imagePath(product.images[0])" :alt="product.name">
                </div>
                <div class="content">
                    <div class="d-flex w-100 text-center">
                        <h1>{{product.name}}</h1>
                    </div>
                    <div class="item">
                        <span class="fa fa-check-square sm-icon"></span>
                      {{product.description}}
                    </div>
                </div>

            </div>
        </modal>
    </div>
</template>


<script>
import modal from '../Modal.vue';
export default {
    props:['product'],
    components:{modal},
}
</script>

<style scoped lang="scss">
.icon{
    color:#DB1B73;
    font-size:60px;
    max-width:200px;
    display: flex;
    justify-content: center;
    margin-bottom:40px;
    img{
        width:100%;
        height: 100%;
    }
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
            justify-content:flex-start;
            
        }
    }
</style>

