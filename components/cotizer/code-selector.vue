<template>
    <div class="row d-flex align-items-center">
        <div class="col-12 col-lg-2">
            COD <input type="text" v-model="code" class="form-control">
        </div>
        <div class="col-12 col-lg-4" v-if="product">
            {{product.name}} - ${{product.price}}
        </div>
        <div class="col-12 col-lg-2  relative d-flex justify-content-center" v-if="product">
            <input type="number" class="form-control" step="1" min="0" v-model="qty">
            <div class="controls">
                <span class="fa fa-minus" @click="qty--"></span>
                <span class="fa fa-plus" @click="qty++"></span>
            </div>
          
            <span class="subtotal">${{product.price * qty |price}}</span>
        </div>
        <div class="col-12 col-lg-1"  v-if="product && qty > 0">
            <button class="btn btn-success" @click="save">Guardar</button>
        </div>
    </div>
</template>


<script>

export default {
    data(){
        return {
            code:null,
            qty:0
        }
    },
    watch:{
        qty(){
            if(this.qty < 1)
            {
                this.qty = 0;
            }
        }
    },
    methods:{
        save(){
            this.product.units = this.qty;
            this.$store.commit('setList',this.product);
            this.code=null;
            this.qty=0;
        }
    },
    computed:{
        categories(){
            return this.$store.getters.getCategories;
        },
        product()
        {
            if(this.categories && this.code){
                let res = null;
              // console.log(this.code);
                this.categories.forEach(c => {
                    c.products.forEach(p=>{
                        if(p.code == this.code)
                        {
                            res = p;
                          //  console.log(p.name);
                        }
                    })
                })
            return res;
            }
        }
    }    
}
</script>

<style scoped lang="scss">
.subtotal{
    position:absolute;
    bottom:-25px;
    margin:auto;
}
.relative{
    position:relative;
}
.form-control{
    max-width: 80px;
}
    .controls{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        display: flex;
        justify-content: space-between;

        span{
            color:blue;
            font-size: 2rem;
            cursor: pointer;
        }
    }

</style>