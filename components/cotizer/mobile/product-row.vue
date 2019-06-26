<template>
    <tbody v-if="product" >
        <tr>
                    <td rowspan="2" width="10%" @click="show(product)"> 
                        <v-lazy-image v-if="product.images && product.images.length > 0" 
                                    class="sampleImage" 
                                    :src="imagePath(product.images[0])"
                                    :src-placeholder="loadingImage" 
                                    :alt="product.name" />
                        <v-lazy-image v-else :alt="product.name" 
                                    :src="noImage" /> 
                                    
                    </td>
                    <td colspan="2" style="cursor:pointer" @click="show(product)">  {{product.name | ucFirst}} </td>

                    <td rowspan="2"><input type="number" :min="getMin(product)" class="form-control" v-model.lazy="product.units">
                        
                        <div v-if="$mq != 'lg' && product.units > 0" class="text-success d-flex flex-column p-0 m-0 justify-content-center align-items-center">
                            
                            <span v-if="product.units < product.pck_units">  ${{(product.price * product.units) | price}} </span>
                            <span v-if="product.units >= product.pck_units">  ${{(product.pck_price * product.units) | price}} </span>
                            
                        </div>
                    
                    </td>
        </tr>
        <tr>
                    <td v-if="admin"> {{product.code}} </td>
                    <td class="text-info text-center"> 
                        <span v-if="product.price > 0"> ${{product.price | price}} </span>
                        <span v-else> - </span> 
                        <br>
                        <div v-if="product.pck_units > 1 && product.price > 0 ">
                            <span> - de {{product.pck_units}}  </span>
                            <br>
                            <span>Unidades</span>
                        </div>
                    </td>
                    <td  class="text-center text-success font-weight-bold"> 
                        <span v-if="product.pck_units > 1"> ${{product.pck_price | price}} </span>
                        <span v-else> - </span> <br>
                        <div v-if="product.pck_units > 1">
                            <span> + de {{product.pck_units}}  </span>
                            <br>
                            <span>Unidades</span>
                        </div>
                    </td>

                 
                    
        </tr>
                
                    <image-modal @close="showModal=false" v-if="showModal"
                    :product="product"  ref="modal" ></image-modal>
    </tbody>
</template>

<script>

import imageModal from '@/components/category/product/img-modal.vue';
export default {
    components:{imageModal},
    props:['product'],
     data(){
        return{
            showModal : false,
            modalProduct:null,
           
        }
    },
    watch:{
        'product.units'(){
            if(this.product.units < this.minUnits)
            {
                this.product.units = null;
            }
            this.$store.commit('setList',this.product);
        }
    },
    computed:{
         minUnits(){
            
            return (this.product.price > 0) ? 1 : this.product.pck_units ;
        }
    },
     methods:{
        getMin(product){
            return product.price == 0 ? product.pck_units : 1;
        },
       
         
        show(product){
               this.showModal = true;
              
               
               
        },
       
    
    },
    mounted(){
       if(this.product && (!this.product.units || this.product.units == 0))
        {
            this.$set(this.product,'units',null);
        }
        if(this.product.units && this.product.units > 0){
            this.units = this.product.units;
        }
    }
}
</script>



<style lang="scss" scoped>
 td{

   vertical-align: middle;
    text-align: center;
 }

    .card-header{
        padding: 5px;
        display: flex;
        align-items:center;
    }


.sampleImage{
        width: 100%;
    }

    .btn-link {color : black;}


    img{width:100%}

     @media(max-width: 600px){
        
     
        


        td { white-space : normal;}
        #accordion{
            margin: -6px;
        }
        table {
            table-layout: fixed;
            width:95vw;
            font-size: 0.66rem;
            font-weight: bold;
        }
        input[type="number"]{
            max-width: 70px;
        }
       
        .card-body,table th, table td{padding:5px;}
    }
    
    @media(min-width: 600px){
        
      
         .sampleImage{
            width: 150px;
        }
        table{ font-size: 1rem; font-weight: normal}
        td {white-space: normal;}
        .card-body,.container{padding:1.25rem}
        
    }

    .big{
    font-size: 1.7rem;
    white-space: normal;
    padding: 0;
}


</style>
