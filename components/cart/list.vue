<template>
    <div>
        <div class="row pink-bottom">
            <div class="col-6 d-flex justify-content-center">
                PRODUCTO
            </div>
            <div class="col-4 d-flex justify-content-center">
                CANTIDAD
            </div>

        </div>
        <transition-group leave-active-class="animated slideOutRight">
            <div v-for="product in list" :key="product.id" class="d-flex row mt-4">
                <div class="col-6 d-flex flex-column text-right">
                    <span>{{product.name}}</span>
                    <span>${{product.price|price}}</span>
                </div>
                <div class="col-4 d-flex justify-content-center">
                    <input type="text" v-model.lazy="product.units" class="input-field">
                </div>
                <div class="col-2">
                    <button class="btn-del btn btn-sm btn-danger" @click="product.units = 0 ">
                        <span class="fa fa-times"></span>
                    </button>
                </div>
            </div>
        </transition-group>

        <div class="row d-flex justify-content-center mt-2">
            <span class="total fucsia">TOTAL: ${{total |price}}</span>
        </div>
        <div class="row mt-2 mb-3 d-flex justify-content-center">
            <nuxt-link to="/categorias" class="btn btn-more bordered">
                <span class="fa fa-chevron-left"></span>
                AGREGAR MAS
            </nuxt-link>
        </div>
    </div>
</template>

<script>

export default {
   
}
</script>

<style lang="scss" scoped>
.btn-more{
    width:219px;
    height: 50px;
    color:#ffF;
    background-color: #F2B742;
    font-size: 22px;
    display: flex;
    justify-content: center;
    align-items:center;
    .fa{
        font-size: 30px;
        margin-right:15px;
    }
}
.total{
    font-size: 23px;
}
.btn-del{
    border-radius: 50%;
    width:35px;
    height: 35px;
}
.input-field{
    border:1px solid #DB1B73;
    border-radius: 10px;
    width: 50px;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 15px;
    height: 36px;
}
.pink-bottom{
    border-bottom:1px solid #DB1B73;
    font-weight: bold;
    width:90%;
    margin-left:5%;
    
}
    span{
        font-size:16px;
    }
</style>
