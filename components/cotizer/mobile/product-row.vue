<template>
    <tr v-if="product" >
                    <td width="10%" @click="show(product)"> 
                        <v-lazy-image v-if="product.images && product.images.length > 0" 
                                    class="sampleImage" 
                                    :src="imagePath(product.images[0])" 
                                    :alt="product.name" />
                        <v-lazy-image v-else :alt="product.name" 
                                    :src="noImage" /> 
                                    
                    </td>
                    <td v-if="user && user.role_id < 3"> {{product.code}} </td>
                    <td style="cursor:pointer" @click="show(product)">  {{product.name | ucFirst}} </td>
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
                <!--     <td class="text-center">
                        <span v-if="product.pck_units > 1"> {{product.pck_units}} </span>
                        <span v-else> Venta x unidad </span>
                    </td> -->
                    <td  class="text-center text-success font-weight-bold"> 
                        <span v-if="product.pck_units > 1"> ${{product.pck_price | price}} </span>
                        <span v-else> - </span> <br>
                        <div v-if="product.pck_units > 1">
                            <span> + de {{product.pck_units}}  </span>
                            <br>
                            <span>Unidades</span>
                        </div>
                    </td>

                    <td><input type="number" :min="getMin(product)" class="form-control" v-model.lazy="units">
                        
                        <div v-if="$mq != 'lg' && product.units > 0" class="text-success d-flex flex-column p-0 m-0 justify-content-center align-items-center">
                            
                            <span v-if="product.units < product.pck_units">  ${{(product.price * product.units) | price}} </span>
                            <span v-if="product.units >= product.pck_units">  ${{(product.pck_price * product.units) | price}} </span>
                            
                        </div>
                    
                    </td>
                    
                    <image-modal @close="closedModal" v-if="this.showModal"
                    :product="modalProduct"  ref="modal" ></image-modal>
    </tr>
</template>

<script>

import imageModal from '../Img-modal.vue';
export default {
    components:{imageModal},
    props:['product'],
     data(){
        return{
            showModal : true,
            modalProduct:null,
            units:null
        }
    },
    watch:{
        units(){
            this.product.units = this.units;
            this.$store.commit('setList',this.product);
        }
    },
     methods:{
        getMin(product){
            return product.price == 0 ? product.pck_units : 1;
        },
       
         
        show(product){
               this.showModal = true;
               this.modalProduct = product;
               /* this.$refs.modal.$forceUpdate(); */
               
               let element = this.$refs.modal.$el;
               $(element).modal('show');
        },
        closedModal(){
                 this.modalProduct = null;
                 this.showModal = false;
                setTimeout(() => {
                    this.showModal=true;
                }, 100);
        },
    
    },
    mounted(){
       if(this.product && !this.product.units)
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
 
  

    .card-header{
        padding: 5px;
        display: flex;
        align-items:center;
    }


.sampleImage{
        width: 50px;
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
