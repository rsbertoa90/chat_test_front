<template>
<myModal>
    <div class="card">
           <div  v-if="product" class="modal-content">
             <div class="modal-header">
                <h5 class="modal-title"> {{product.name}} </h5>
                <button @click="closedModal()" type="button" class="close" 
                data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                 </button>
            </div>
            <div class="modal-body"  >
                <div class="image-container">
                    <transition  leave-active-class=" animated slideOutRight faster position-absolute">
            
                        <img v-if="product.images && product.images.length > 0" 
                            :key="product.images[i].id"
                            class="w-100 " 
                            :src="imagePath(product.images[i].url)" 
                            :alt="product.name">
                    </transition>  
                     <img v-if="!product.images || ! product.images.length > 0" :src="noImage" :alt="product.name">

                    <div class="controls"  v-if="product.images && product.images.length > 1" >
                        <span class="fa fa-chevron-left text-info" @click="changeImage('prev')" ></span>
                        <span class="fa fa-chevron-right text-info" @click="changeImage('next')" ></span>
                    </div>
                    <div class="d-flex flex-column">

                        <button v-if="product.images[0]" class="btn btn-sm btn-danger close-button mt-3"
                                            @click.prevent="deleteImage(product.images[i])">X</button>

                        <div class="order-select"  v-if="product.images.length > 1">
                            <label @click="orderChange(product.images[i],index)"  v-for="index in product.images.length" :key="index"
                                    class="btn btn-sm"
                                    :class="{'btn-success' : product.images[i].order == index,
                                            'btn-outline-info' : product.images[i].order != index}"
                                    >
                                {{index}}
                            </label>
                        </div>
                    </div>

                 </div>
                <form enctype="multipart/form-data" name="uploader" >
                    <div class="d-flex flex-column">
                        <label class="text-info text-center">  
                            Subir una imagen   
                        </label>
                        <input @change="imageUploaded = true" type="file" name="file" ref="image"  accept="image/x-png,image/gif,image/jpeg" class="display-none" >
                    </div>   
                
                </form>
       
             </div>
            <div class="modal-footer">
                <button v-if="imageUploaded" type="button" class="btn btn-primary" @click.prevent="save">Guardar</button>
                <button type="button" class="btn btn-secondary" @click="closedModal">Cerrar</button>
            </div>
         </div>
    </div>
</myModal>
     
</template>

<script>
import myModal from '@/components/Modal.vue'
    export default {
        components:{myModal},
        props: ['product'],
        data: function(){
            return {
               imageUploaded :false,
               file : null,
               i:0,
               show:true
            }
        },
       
        watch:{
            product(){
                this.show=true;
                this.preloadImages();
        
            }
        },
        methods : {
               preloadImages(){
             
                if (this.product &&  this.product.images && this.product.images.length>0){

                    let images = [];
                    this.product.images.forEach(image => {
                        let img = new Image();
                        img.src = this.imagePath(image.url);
                        images.push(img);
                      
                    });
                }
            },
              deleteImage(image){
                 
                this.$store.commit('deleteProductImage',image);
            
            },
             orderChange(img,i){
                img.order = i ;
                var vm = this;
                let data = {
                    id : img.id,
                    field : 'order',
                    value : i
                }

                vm.$axios.put('/productImage',data);

            },
       
            closedModal(){
                this.i = 0;
                this.$emit('closedModal');
               
            },

            save :  function(event){
                var vm =this;
                var file = this.$refs.image.files[0];
                
                if (file == null){
                    swal('No se ha seleccionado una imagen','','error');
                } else {

                    this.file = file;
                   
                    
                    
                    var fdata =  new FormData();
                    fdata.append('image',file);
                    fdata.append('product',this.product.id);
                  
                    
    
                    this.$axios.post('/product/image',fdata)
                        .then(res => {
                            this.closedModal();
                            this.$emit('refresh');
                        });
                }

        
        },

        changeImage(where){
            if (where == 'next'){
                this.i++;
                if (! this.product.images[this.i]){
                    this.i = 0;
                }
            } else{
                this.i--;
                if (this.i < 0){
                        this.i = this.product.images.length - 1
                    }
                }
        }
            
        
    },
    
}
</script>

<style lang="scss" scoped>

    .image-container{
        position:relative;
        overflow: hidden;
        max-width:300px;
        .img{
            width:100%;
        }
    }

    .close-button{
        position:absolute;
        bottom:50px;
        left:50%;
        

    }

    .controls{
        position: absolute;
        bottom: 50%;
        left:0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        .fa{
            font-size:2rem;
            cursor: pointer;
        }

    }

    .set-first{
        position:absolute;
        top:10px;
        left:50%;
    }

</style>

