<template>
    <div class="modal fade" id="image-modal" tabindex="-1" role="dialog" ref="modal" v-if="product">
        <div class="modal-dialog" role="document">
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
                            :src="imagePath(product.images[i])" 
                            :alt="product.name">
                    </transition>  
                     <img v-if="!product.images || ! product.images.length > 0" :src="noImage" :alt="product.name">

                    <div class="controls"  v-if="product.images && product.images.length > 1" >
                        <span class="fa fa-chevron-left text-info" @click="changeImage('prev')" ></span>
                        <span class="fa fa-chevron-right text-info" @click="changeImage('next')" ></span>
                    </div>

                    <button v-if="product.images[0]" class="btn btn-sm btn-danger close-button"
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
                <form enctype="multipart/form-data" name="uploader" >
                <input type="hidden" name="_token" >
                    <div class="d-flex flex-column">
                        <label class="text-info text-center">  
                            Subir una imagen   
                        </label>
                        <input @change="imageUploaded = true" type="file" name="file"  accept="image/x-png,image/gif,image/jpeg" class="display-none" >
                    </div>   
                
                </form>
       
             </div>
            <div class="modal-footer">
                <button v-if="imageUploaded" type="button" class="btn btn-primary" @click.prevent="save">Guardar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
         </div>
       </div>
    </div>
</template>

<script>
    export default {
        
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
                /* console.log('preload'); */
                if (this.product &&  this.product.images && this.product.images.length>0){

                    let images = [];
                    this.product.images.forEach(image => {
                        let img = new Image();
                        img.src = this.imagePath(image.url);
                        images.push(img);
                       /*  console.log(img); */
                    });
                }
            },
              deleteImage(image){
                this.$axios.delete('/product/image/'+image.id)
                    .then(()=>{
                        this.product.images.splice(this.i,1);
                         this.$emit('refresh');
                         this.i=0;
                        });
            },
             orderChange(img,i){
                img.order = i ;
                var vm = this;
                let data = {
                    id : img.id,
                    field : 'order',
                    value : i
                }

                vm.$axios.put('/product/image',data);

            },
       
            closedModal(){
                this.i = 0;
                this.$emit('closedModal');
            
                
                $('#image-modal').modal('hide');
               
               
            },

            save :  function(event){
                var vm =this;
                var file = $('input[type="file"]')[0].files[0];
                if (file == null){
                    swal('No se ha seleccionado una imagen','','error');
                } else {

                    this.file = file;
                    // console.log(file);
                    
                    
                    var fdata =  new FormData();
                    fdata.append('image',file);
                    fdata.append('product',this.product.id)
              
                    // console.log(fdata);
                    this.$axios.post('/product/image',fdata)
                    .then(r => {
                            vm.$emit('refresh');
                           vm.closedModal();
                           vm.i=0;
                    })
    
                   
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
    }

    .close-button{
        position:absolute;
        bottom:10px;
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

