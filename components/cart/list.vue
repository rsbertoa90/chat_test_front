<template>
    <div>
        <table class="table text-center">
            <thead>
                <th>PRODUCTO</th>
                <th>CANTIDAD</th>
                <th v-if="$mq=='lg'">SUBTOTAL</th>
                <th></th>
            </thead>
            <transition-group is="tbody" tag="tbody" leave-active-class="animated slideOutRight">
                <tr v-for="product in list" :key="product.id" >
                    <td class="nametd">
                        <span>{{product.name}}</span>
                        <span v-if="$mq!='lg'" class="text-right">${{product.price * product.units|price}}</span>
                    </td>
                    <td class="inputtd">
                        <input type="text" v-model.lazy="product.units" class="input-field">
                    </td>
                    <td  v-if="$mq=='lg'" >
                        
                        <span>${{product.price * product.units|price}}</span>
                    </td>
                    <td >
                        <button class="btn-del btn btn-sm btn-danger" @click="product.units = 0 ">
                            <span class="fa fa-times"></span>
                        </button>
                    </td>
                </tr>
            </transition-group>
        </table>
    


        

        <div class="row d-flex justify-content-center mt-2">
            <span class="total fucsia">TOTAL: ${{total |price}}</span>
        </div>
       
    </div>
</template>

<script>

export default {
   
}
</script>

<style lang="scss" scoped>
thead{
    border-bottom:1px solid #DB1B73
}
.inputtd{
    display:flex;
    justify-content: center;
}
.nametd{
    text-align: right;
}

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

@media(min-width:660px){
    span{
        font-size:18px;
      
    }
}
</style>
