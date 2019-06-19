<template>
   <tr>
        <td >
            <img v-if="product.images.length > 0" 
                    :src="imagePath(product.images[0])" 
                    :alt="product.name" 
                    @click="imgModal(product)">  
            <img v-else :src="imagePath('/storage/images/app/no-image.png')" 
                alt="no-image" @click="imgModal(product)"> 
        </td>
        <td>  
            <input v-model.lazy="product.code" @change="saveChange(product,'code')" type="text" class="nametd"> 
        </td>
        <td>  
            <textarea rows="2" placeholder="Nombre" v-model.lazy="product.name" @change="saveChange(product,'name')" type="text"> </textarea> 
            <textarea placeholder="Descripcion" v-model.lazy="product.description" @change="saveChange(product,'description')" rows="3"></textarea>
        </td>
        
        <td class="text-info text-center"> 
            $<input  style="width:80%" type="number" v-model.lazy="product.price" @change="saveChange(product,'price')"> 
            <button class="btn btn-block mt-3" :class="{'bg-focus white-bold':product.offer,' bg-secondary ':!product.offer}" @click="toggleOffer(product)">Oferta</button>
        </td>                
        <td class="d-flex flex-column justify-content-center align-items-center">
         
            <button @click.prevent="deleteProduct(product)" class="btn btn-sm btn-outline-danger m-1">
                <i class="fa fa-trash"></i>
            </button>
            <button @click.prevent="togglePause(product)" class="btn btn-sm m-1" :class="{'btn-info' : !product.paused, 'btn-success': product.paused}">
                <i :class="{'fa fa-pause-circle' : !product.paused , 'fa fa-play' : product.paused}"></i>
            </button>
            
        </td>
        <image-modal :product="product"   @close="showModal=false" 
                            ref="modal" @refresh="$emit('refresh')" v-if="showModal">
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
                
                if (field == 'price'){
                    product.price = product.price.replace(/,/g, '.') ;
                }

                var data = {
                    product : product.id,
                    field : field,
                    value : product[field],
                    _token:window.csrf
                }
                if (data.field == 'paused')
                {
                    data.value = data.value ? 1 : 0;
                }
                this.$axios.put('/product',data);
                
            },
            deleteProduct(product){
                var vm = this;
                this.$axios.delete('/product/'+product.id)
                    .then(response => {
                        // console.log(response);
                        vm.$emit('refresh');
                        
                    });
            },

            imgModal(product){
                this.product = product;
                this.showModal = true;

              

            },

            toggleOffer(product){
                product.offer = ! product.offer;
                var data = {
                    product : product.id,
                    field : 'offer',
                    value : product.offer ? 1 : 0
                }
                this.$axios.put('/product',data)
                
            },
            togglePause(product){
                var vm = this;
                product.paused = !product.paused;
                vm.saveChange(product,'paused');
                for (const key in vm.categories) {
                    if (vm.categories.hasOwnProperty(key)) {
                        const category = vm.categories[key];
                        for (const k in category.products) {
                            if (category.products.hasOwnProperty(k)) {
                                const prod = category.products[k];
                                if (prod.id == product.id )
                                {
                                    vm.categories[key].products[k].paused = product.paused;
                                    return;
                                }
                            }
                        }
                    }
                }

                
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
