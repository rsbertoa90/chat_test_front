<template>
   <tr v-if="product">
        <td @click="show(product)" >
            <v-lazy-image v-if="product.images.length > 0" 
                class="sampleImage" :src="imagePath(product.images[0])" 
                :alt="product.name"  /> 
            <v-lazy-image class="sampleImage" v-else :src="noImage" 
                alt="Sin foto" />
        </td>
        <td v-if="user && user.role_id < 3"> {{product.code}} </td>
        <td style="cursor:pointer" @click="show(product)">  {{product.name | ucFirst}} </td>
        <td class="text-info text-center font-weight-bold">${{product.price | price}}</td>
        
        <td v-if="!product.paused"><input type="number" min="0" class="form-control " v-model="product.units" @blur="setList">
            
            <div v-if="product.units > 0" class="text-success d-flex flex-column p-0 m-0 justify-content-center align-items-center">
                
                <span class="text-success font-weight-bold">  ${{(product.price * product.units) | price}} </span>
                
            </div>
        
        </td>
        
        
         <carousel ref="modal" :product ="product"></carousel>
        
    </tr>
</template>


<script>
 import carousel from './Img-modal.vue';
export default {
    props:['product'],
    components:{carousel},
    computed:{
        user(){
            return this.$store.getters.getUser;
        }
    },
    methods:{
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
    watch:
    {
        'product.units'(){
            this.$store.commit('setProductUnits',this.product);
        }
    }
}
</script>


<style scoped>

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

    @media(max-width: 600px){
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
