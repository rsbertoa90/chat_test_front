<template>
    <div >
        <div class="col-12" v-if="!product.units || product.units < minUnits">
            <button class="btn btn-block bg-red hover-border" style="cursor:pointer" @click="addFirstUnit">
                  <fa-icon icon="shopping-cart"></fa-icon> Agregar al carrito 
            </button>
        </div>

        <div v-if="product.units >= minUnits" class="d-flex justify-content-start">
            <div style="font-size:2rem" class="mr-1 d-2 d-flex flex-column justify-content-center cart-flex">
                    <fa-icon icon="shopping-cart" class="bg-white text-red"></fa-icon>
            </div>
            <div class=" d-flex  justify-content-center units-control">
                <button @click="product.units--" class="btn-red"> <fa-icon icon="minus"></fa-icon> </button>
                <input type="text" v-model.lazy="product.units" class=" units-field">
                <button @click="product.units++" class="btn-red"> <fa-icon icon="plus"></fa-icon> </button>
            </div>
                
        </div>
    </div>
</template>


<script>
export default {
    props:['product'],
   
    watch:{
        'product.units'(){
            if(this.product.units < this.minUnits){this.product.units = 0;}
            this.$store.commit('setList',this.product);
            
        }
    },
    methods:{
        addFirstUnit(){
            this.$set(this.product,'units',this.minUnits);
            console.log(this.product.name,this.product.units);
        }
    },
    
    computed:{
        minUnits(){
            
            return (this.product.price > 0) ? 1 : this.product.pck_units ;
        }
    }, 
    mounted(){
        if(this.product && !this.product.units)
        {
            this.$set(this.product,'units',null);
        }
        if(this.product && this.product.units){
            this.units = this.product.units;
        }
    }

}
</script>


<style lang="scss" scoped>

.cart-flex{
    width:50px;
}

.hover-border:hover{
    border:2px solid #868686;
}
    .units-control{
        border:1px solid #868686;
        padding:5px;
        border-radius: 15%;    
        max-width:150px;
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
