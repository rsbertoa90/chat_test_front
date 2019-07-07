<template>
        <div class="col-4 d-flex flex-column justify-content-center align-items-center">
            <h4>Cambiar precios masivo</h4>
            <h5>  
                <span class="text-info">{{selectedProducts.length}}</span>  Productos seleccionados 
            </h5>
            <div class="d-flex justify-content-center"> 
                <button class="mr-2" @click="variation-=1">-</button>
                <input style="width:45px; text-align-center" type="number" v-model="variation"> %
                <button class="ml-2" @click="variation+=1">+</button>
            </div>
            <button class="btn btn-md btn-outline-success mt-1" v-if="variation != 0 && selectedProducts.length > 0" @click="applyVariation">Aplicar</button>
        </div>
</template>


<script>
export default {
    props:['selectedProducts'],
    data(){
        return{
            variation:0
        }
    },
    methods:{
          saveChange(product,field){

                var vm=this;
                var data = {
                    product : product.id,
                    field : field,
                    value : product[field]
                }
               
               this.$axios.put('/product/update',data)
               .then(res => {
                   vm.$emit('refresh')

                   });
               
                
            },


           applyVariation()
            {
                var vm =this;
                var variation = 1+(this.variation/100);
                this.selectedProducts.forEach(prod => {
                    prod.price = prod.price * variation;
                    prod.pck_price = prod.pck_price * variation;
                    
                    vm.saveChange(prod,'price');
                    vm.saveChange(prod,'pck_price');
                });
                vm.variation = 0;
                vm.$emit('resetCheckboxes');
            }
    }
}
</script>
