<template>
<div v-if="product" class="d-flex justify-content-end">
    <button v-if="!product.units || product.units < 1 " type="button"  class="btn shop-button clickable bordered" @click="addProduct"> 
        <span class="fa fa-shopping-cart"></span> 
    </button>    
     <div v-if="product.units && product.units > 0" class="d-flex justify-content-center">
           
            <div class=" d-flex  justify-content-center units-control">
                <button @click="product.units--" class="btn-control"> <span class="fa fa-minus"></span> </button>
                <input type="text" v-model="product.units" class=" units-field">
                <button @click="product.units++" class="btn-control"> <span class="fa fa-plus"></span> </button>
            </div>
                
    </div>
</div>
</template>


<script>
import Vue from 'vue';
export default {
    props:['product'],
    methods:{
        addProduct()
        {
            Vue.set(this.product,'units',1);
            
          
        }
    }
}
</script>




<style lang="scss" scoped>

.shop-button{
    background-color: #F2B742;
    display: flex;
    justify-content: center;
    align-items:center;
    width:103px;
    height: 68px;
    box-shadow: 0px 1px 1px #000;
    .fa{
        font-size:40px;
        color:#fff;
    }
}

.hover-border:hover{
    border:2px solid #868686;
}
    .units-control{
        border:3px solid #F2B742;
        padding:5px;
        border-radius: 15px;  
        box-shadow: 1px 1px 1px #000; 
        .btn-control{
            background-color: transparent;
            color:#000;
            border:none;
            outline:none;
            .fa{
                color:#000;
            }
        }
    }

    
      
        .units-field{
            &:focus{
                outline:none;
            }
            width:70px;
            font-size:40px;
            border:none;
            text-align:center;
            outline:none;
            

        }
</style>

