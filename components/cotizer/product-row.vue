<template>
   <tr v-if="product">
        <td @click="show(product)" >
            <img v-if="product.images.length > 0" 
                class="sampleImage" :src="imagePath(product.images[0])" 
                :alt="product.name"  /> 
            <img class="sampleImage" v-else :src="noImage" 
                alt="Sin foto" />
        </td>
        <td v-if="admin">{{product.code}}</td>
        <td style="cursor:pointer" @click="show(product)">  {{product.name | ucFirst}} </td>
        <td class="text-info text-center font-weight-bold"  >  <span v-if="!hidePrices"> ${{product.price | price}} </span></td>
        
        <td> 
            <div v-if="product.units > 0" class="text-success d-flex flex-column p-0 m-0 justify-content-center align-items-center">
                
                <span class="text-success font-weight-bold" v-if="!hidePrices">  ${{(product.price * product.units) | price}} </span>
               
                
            </div>
            <div class="subtotal-space" v-if="!product.units"></div>
            <qty-field :product="product" class="brd" />
            <div v-if="!hidePrices" class="controls d-flex justify-content-between p-2">
                <span  @click="susone">
                    <fa-icon icon="minus" class="control-btn bg-danger"></fa-icon>
                </span>
                <span @click="addone">
                    <fa-icon icon="plus" class="control-btn bg-success" ></fa-icon>
                </span>
            </div>
            <span v-if="showmaxwarn" class="text-danger font-weight-bold warn" > {{warn}}  </span>
        
        </td>
        
        
         <carousel ref="modal" :product ="product"></carousel>
        
    </tr>
</template>


<script>
import qtyField from '@/components/category/product/qty-field.vue';
 import carousel from '@/components/category/product/Img-modal.vue';
export default {
    props:['product'],
    components:{carousel,qtyField},
    data(){
        return{
            showmaxwarn:false
        }
    },
    computed:{
        warn(){
            if(this.product.stock_managed)
            {
                
                if(this.product.stock_units > 1)
                {
                    return `Quedan ${this.product.stock_units} unidades`
                }else{
                    return "Queda solo 1 unidad!"
                }
            }
        },
        max(){
            if(this.product.stock_managed)
            {
                return this.product.stock_units;
            }
            else{
                return 99999;
            }
        },
        user(){
            return this.$store.getters.getUser;
        }
    },
    methods:{
        addone(){
            if(!this.product.units){
                this.$set(this.product,'units',1);
            }else{
                if(this.product.units<this.max){
                    this.product.units++;
                }else{
                    this.showmaxwarn=true;
                }
            }
           // console.log(this.product.units)
            this.setList();
        },
        susone(){
            if(this.product.units >0){
                this.product.units--;
            }
            //console.log(this.product.units)
            this.setList();
        },
        setList(){
            this.$store.commit('setList',this.product);
        },
        show(product){
                if (product.images[0]){
                   
                    let element = this.$refs.modal.$el;
                  
                    $(element).modal('show');
                }
                else
                {
                    var content = document.createElement("img");
                    $(content).attr('src',this.noImage);
                    content.style.width = '100%';
                    swal({content : content});
                }
            }
    },
    
}
</script>


<style  lang="scss" scoped>
.warn{
    display: flex;
    max-width: 60px;
    text-align: center;
    font-size: .8rem;
}
.controls{
    width:70px;
    .control-btn{
        cursor: pointer;
        border-radius:50%;
        width:20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items:center;
        color:#fff;
    }    
}
.brd{
    border:1px solid #000;
}

.icono{
    font-size: 2.75rem;
    margin-right: 15px;
    margin-top:-15px
}


.white-space-normal{
    white-space: normal;
}
.text-big{
    font-size: 1.5rem;
}
.category-miniature{
    min-width: 100px;
    width: 100px;
    margin-right: 15px;
}
.container{
    
    margin-bottom: 100px;
  
    }

    td{
        white-space:normal;
    }
    input[type="number"]{
        width: 70px;
    }

    .sampleImage{width: 100px;}


   .btn-link {color : black;}
    #total {
        position: fixed;
        /* margin-left:50vw; */
        bottom: 20px;
        z-index: 100;
    }
    img{width:100%}
 
 .subtotal-space{
     display:flex;
     width:100%;
     height:24px;
 }
    @media(max-width: 600px){
        .subtotal-space{
            height: 15px;
        }
        .card-header{
            padding:0;
        }
        .container{
    
            margin-left: -7%;
            width: 100vw;
            padding: 15px;
            }
        .sampleImage{width: 80px;}
        td { white-space :normal;}
        table {
            font-size: 0.66rem;
            font-weight: bold;
        }
       
        .card-body,table th, table td{padding:5px;}
    }
    
    @media(min-width: 600px){
        .sampleImage{width: 150px;}
        table{ font-size: 1rem; font-weight: normal}
        td {white-space: normal;}
        .card-body,.container{padding:1.25rem}
        
    }
   
</style>
