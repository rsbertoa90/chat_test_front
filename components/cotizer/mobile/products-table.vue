<template>
<div>

    <table class="table  table-bordered" >
            <thead class="">
                <th>Foto</th>
                <th v-if="user && user.role_id < 3">Codigo</th>
             <!--    <th class="nametd">Nombre</th> -->
                <th colspan="2" class="text-center">Precio</th>
                <!-- <th  class="">Llevando mas de</th> -->
                <th class="">Quiero</th>
                <th v-if="$mq == 'lg'" class="">Subtotal</th>
            </thead>
            
                <tbody is="productRow" v-for="product in filteredProducts" :key="product.code" :product="product">

                </tbody>
            
    </table>
      
</div>
</template>

<script>
import productRow from './product-row.vue';
export default {
    components:{productRow},
    props:['products'],
   
    computed:{
        filteredProducts(){
            if(this.products){

                return this.products.filter(p=> {
                    return !p.paused;
                })
            }
        }
    },
   
    mounted(){
        if(this.products){
            this.products.forEach(p => {
                if (!p.units){
                    this.$set(p,'units',null);
                }                
            })
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
