<template>
    <div class="shopbtn">
        <div v-if="!product.units || product.units < 1">
            <button class="btn btn-block dabtn" @click="addToCart()">
                <span class="fa fa-shopping-cart"></span>
                Comprar
            </button>
        </div>
        <div v-else class="controls">
            <span class="fa fa-minus" @click="product.units--"></span>
            <input type="text" class="inputfield" v-model.lazy="product.units">
            <span class="fa fa-plus" @click="product.units++"></span>
        </div>
    </div>
</template>


<script>
export default {
    props:['product'],
    methods:{
        addToCart(){
            this.$set(this.product,'units',1);
        }
    }
}
</script>

<style lang="scss" scoped>
.dabtn{
    background-color: #d32381;
    color:#fff;
    &:hover{
        background-color: #009bc8;
    }
}
.shopbtn{
    width:100%;
    display:flex;
    justify-content: center;
    align-items:center;
}
.controls{
    border:1px solid #ccc;
    border-radius:15px;
    width:120px;
    cursor:pointer;
    display:flex;
    align-items:center;
    position:relative;
    .fa{
        font-size:1.3rem;
    }
    .inputfield{
        text-align: center;
        font-size:1.3rem;
        width:75px;
        outline:none;
        border:none;
        &:focus{
            outline:none;
            border:none;
        }
    }
}
</style>

