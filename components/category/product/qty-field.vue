<template>
    <div  v-if="!hidePrices">
        <input ref="inputfield"  @blur="setList" class="units-field" type="number" min="0" :max="max" step="1" v-model="product.units">
       
    </div>    
</template>

<script>
export default {
    props:['product'],
   
    methods:{
       
        setList(){
            if (this.product.units < 0)
            {
                this.product.units=0;
            }
            else if(this.product.units>this.max){
                this.product.units=this.max;
            }
           // console.log(this.product.units);
            this.$store.commit('setList',this.product);
        },
    },
    computed:{
        max(){
            if(this.product.stock_managed)
            {
                return this.product.stock_units;
            }
            else{
                return 99999;
            }
        },
      

    }
}
</script>

<style lang="scss" scoped>
.warn{
    color:red;
    font-size: .8rem;
}
 .units-field{
            &:focus{
                outline:none;
            }
            font-size: 1.2rem;
            width:70px;
            border:none;
            text-align:center;
            outline:none;

        }
</style>
