<template>
    <tbody v-if="product" >
        <tr>
                    <td rowspan="2" width="10%" @click="show(product)"> 
                        
                        <!-- <v-lazy-image v-if="product.sample_image" 
                                    class="sampleImage" 
                                    :src="imagePath(product.sample_image)"
                                    :src-placeholder="loadingImage" 
                                    :alt="product.name"
                                    @intersect="intersect"
                                    @load="loaded" /> -->
                        <img v-if="product.sample_image" 
                                    class="sampleImage" 
                                    :src="imagePath(product.sample_image)"
                                    :alt="product.name" /> 

                        <img v-else :alt="product.name" 
                                    :src="noImage" /> 
                                    
                    </td>
                    <td colspan="2" style="cursor:pointer" @click="show(product)">  {{product.name | ucFirst}} </td>

                    <td rowspan="2">
                        
                         <div v-if="$mq != 'lg' && product.units > 0" class="text-success d-flex flex-column p-0 m-0 justify-content-center align-items-center">
                            
                            <span v-if="product.units < product.pck_units">  ${{(product.price * product.units) | price}} </span>
                            <span v-if="product.units >= product.pck_units">  ${{(product.pck_price * product.units) | price}} </span>
                            
                        </div>
                        
                        <input type="number" :min="getMin(product)" class="form-control" v-model="product.units">
                        
                        <div class="controls">
                            <button class="btn-sm btn-danger btn-circle" @click="removeUnit"><fa-icon icon="minus"></fa-icon></button>
                            <button class="btn-sm btn-success btn-circle" @click="addUnit"><fa-icon icon="plus"></fa-icon></button>
                        </div>

                       
                    
                    </td>
        </tr>
        <tr>
                   <!--  <td v-if="admin"> {{product.code}} </td> -->
                    <td class="text-info text-center price"> 
                        <span v-if="product.price > 0"> ${{product.price | price}} </span>
                        <span v-else> - </span> 
                        <br>
                        <div v-if="product.pck_units > 1 && product.price > 0 ">
                            <span> - de {{product.pck_units}}  </span>
                            <br>
                            <span>Unidades</span>
                        </div>
                    </td>
                    <td  class="text-center text-success font-weight-bold price"> 
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
         addUnit(){
             if (!this.product.units || this.product.units < 1)
             {
                 this.product.units = this.minUnits;
             }else{
                 this.product.units++;
             }
         },
         removeUnit(){
             this.product.units--;
             if (this.product.units < this.minUnits)
             {
                 this.product.units = null;
             }
         },
         intersect(){
           // console.log('intersecccted');
         },
         loaded(){
           //  console.log('loaded');
         },
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

.controls{
    width:100%;
    display: flex;
    justify-content: space-around;

}

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
            font-size: 0.95rem;
            font-weight: bold;
        }
        input[type="number"]{
            max-width: 70px;
        }
       
        .card-body,table th, table td{padding:5px;}
    }
    
  

    .big{
    font-size: 1.7rem;
    white-space: normal;
    padding: 0;
}


</style>
