<template>
   <tr>
        <td >
            <img v-if="product.images.length > 0" 
                    :src="imagePath(product.images[0].url)" 
                    :alt="product.name" 
                    @click="imgModal(product)">  
            <img v-else :src="noImage" 
                alt="no-image" @click="imgModal(product)"> 
        </td>
        <td>  
            <input ref="code" :value="product.code" @change="saveChange(product,'code')" type="text" class="nametd"> 
        </td>
        <td>  
            <textarea ref="name" rows="2" placeholder="Nombre" :value="product.name" @change="saveChange(product,'name')" type="text"> </textarea> 
            <textarea ref="description" placeholder="Descripcion" :value="product.description" @change="saveChange(product,'description')" rows="3"></textarea>
        </td>
        
        <td class="text-info text-center"> 
            $<input  style="width:80%" type="number" :value="product.price" ref="price" @change="saveChange(product,'price')"> 
            <button class="btn btn-block mt-3 bg-secondary  text-white" :class="{'bg-info':product.offer}" @click="toggleOffer(product)">Oferta</button>
        </td>                
        <td class="d-flex flex-column justify-content-center align-items-center">
         
            <button @click.prevent="deleteProduct(product)" class="btn btn-sm btn-outline-danger m-1">
                <i class="fa fa-trash"></i>
            </button>
            <button @click.prevent="togglePause(product)" class="btn btn-sm m-1" :class="{'btn-info' : !product.paused, 'btn-success': product.paused}">
                <i :class="{'fa fa-pause-circle' : !product.paused , 'fa fa-play' : product.paused}"></i>
            </button>
            
        </td>
        <image-modal :product="product"  
                            ref="modal" @refresh="$emit('refresh')" @closedModal="showModal=false" v-if="showModal">
        </image-modal>
    </tr>
</template>

<script>
import imageModal from './Img-modal.vue';
export default {
    props:['product'],
    components:{imageModal},
    data(){return{
        showModal:false
    }},
    methods:{
        saveChange(product,field){
                
            let value = this.$refs[field].value;
            this.$store.commit('updateProduct',{product:product,field:field,value:value});
                
            },
            deleteProduct(product){
                this.$store.commit('deleteProduct',product);
            },

            imgModal(product){
                this.product = product;
                this.showModal = true;

            },

            toggleOffer(product){
               
                this.$store.commit('updateProduct',{product:product,field:'offer',value:!product.offer});

              
                
            },
            togglePause(product){
                this.$store.commit('updateProduct',{product:product,field:'paused',value:!product.paused});

            },


    }
}
</script>


<style scoped>
.btn-link {color : black;}
    td img {
        width: 10vw;
    }
textarea{
    width:100%;
}
input[type="checkbox"]{
    width: 25px;
    margin: 0 10px;
}
   @media(max-width: 600px){
       table,.container,.card,.card-body {font-size: 0.66rem ; padding : 0}
       
       th,td, input{
           white-space:nowrap;
           width: 13vw;
           padding: 2px;
       }
       .form-control{width: 20vw;}
       .nametd {width: 25vw;}
   }
</style>
