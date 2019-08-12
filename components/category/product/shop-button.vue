<template>
<div v-if="product && !hidePrices">
    <button v-if="!product.units || product.units < 1 " type="button"  class="btn btn-lg btn-outline-success" @click="addProduct"> 
        <fa-icon icon="shopping-cart"></fa-icon> 
        Comprar
    </button>    
     <div v-if="product.units && product.units > 0" class="d-flex justify-content-center">
            <div style="font-size:2rem" class="mr-1 d-2 d-flex flex-column justify-content-center">
                    <fa-icon icon="shopping-cart" ></fa-icon>
            </div>
            <div class=" d-flex  justify-content-center units-control">
                <button @click="product.units--" class="btn-info"> <span class="fa fa-minus"></span> </button>
                <input type="text" v-model="product.units" class=" units-field">
                <button @click="product.units++" class="btn-info"> <span class="fa fa-plus"></span> </button>
            </div>
                
    </div>
</div>
</template>


<script>
export default {
    props:['product'],
    methods:{
        addProduct()
        {
            this.$set(this.product,'units',1);
            this.$store.commit('setList',this.product);
        }
    },
    watch:{
        'product.units'(){
            this.$store.commit('setList',this.product);
        }
    }
}
</script>




<style lang="scss" scoped>

.hover-border:hover{
    border:2px solid #868686;
}
    .units-control{
        border:1px solid #868686;
        padding:5px;
        border-radius: 15%;    
    }

    .bg-red
        {
            background-color: #D52B1E;      
            color:#fff;  
        }

        .text-red{
            &:focus{
                outline:none;
            }
            color: #D52B1E;
        }

        .btn-red{
            &:focus{
                outline:none;
                border:none;
            }
            background-color: #fff;
            color:#D52B1E;
            cursor: pointer;
            border:none;
        }
        .units-field{
            &:focus{
                outline:none;
            }
            width:70px;
            border:none;
            text-align:center;
            outline:none;

        }
</style>

