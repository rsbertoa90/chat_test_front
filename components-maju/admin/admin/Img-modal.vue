<template>
    <div class="modal fade" id="image-modal" tabindex="-1" role="dialog">
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
            
                <img v-if="product.images && product.images.length > 0 && product.images[i]" 
                        :key="product.images[i].id"
                        class="w-100 " 
                        :src="imagePath(product.images[i])" 
                        :alt="product.name">
            </transition>  
                <img v-if="!product.images || ! product.images.length > 0" :src="noImage" :alt="product.name">

            <div class="controls"  v-if="product.images && product.images.length > 1" >
                <span class="chevron-button" v-on:click.prevent="changeImage('prev')" >
                    <fa-icon icon="chevron-left" class="text-info"></fa-icon>
                
                </span>
                <span class="chevron-button text-info" v-on:click.prevent="changeImage('next')" >
                    <fa-icon icon="chevron-right"></fa-icon>
                </span>
            </div>

           
            <button v-if="product.images && product.images.length > 0" type="submit" class="close-button btn btn-danger btn-sm" @click="destroyImage()">X</button>
            

            <button v-if="product.images && product.images.length > 0"   
                    @click="setFirst()" class="btn btn-info set-first">Definir primera imagen</button>

          </div>
          <form enctype="multipart/form-data" name="uploader" >
          
            <div class="d-flex flex-column">
                <label class="text-info text-center">  
                    Subir una imagen   
                </label>
                 <input type="file" ref="daFile" name="file"  accept="image/x-png,image/gif,image/jpeg" class="display-none" >
            </div>   
           
          </form>
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="save">Guardar</button>
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
               file : null,
               i:0,
               
               show:true
            }
        },
       
        watch:{
            product(){
                this.show=true;

            }
        },
        methods : {
            destroyImage(){
                var vm = this;
                let data = {
                    id : vm.product.images[vm.i].id
                }
                this.$axios.post('/product/deleteImage',data)
                    .then(res => {
                        console.log('deleted');
                        vm.product.images.splice(vm.i,1);
                        vm.i = 0 ;
                    });
            },
           setFirst(){
               var vm = this;
               this.product.images.forEach(image => {
                   image.first = 0;
               });

               this.product.images[this.i].first = 1;
               
               let data = {
                   product : this.product.id,
                   first : this.product.images[this.i].id
               }
               this.$axios.put('/product/setFirstImage',data).then(res => {
                   $('#image-modal').modal('hide');
                        vm.$emit('closedModal');
                        vm.$emit('refresh');
               })

               ;
           },
            closedModal(){
                this.i = 0;
                this.$emit('closedModal');
               
            },

            save :  function(event){
                var vm =this;
                 
                var file = vm.$refs.daFile.files[0];
                 
                
                
                var fdata =  new FormData();
              
                fdata.append('image',file);
                fdata.append('product',this.product.id)
                
                this.$axios.post('/product/image',fdata, {  emulateHTTP: true, emulateJSON: true, headers: { 'X-File-Name': 'image',  'Content-Type': 'multipart/form-data', 'Content-Type': 'application/x-www-form-urlencoded' } } )
                .then(res => {
                   
                      $('#image-modal').modal('hide');
                        vm.$emit('refresh'); 
                         vm.$emit('closedModal');
                });

              

        
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

    .modal-content{
        height: 90vh;
        overflow-y:auto;
    }

    .chevron-button{
        
        font-size: 1.5rem;
        padding: 3px;
        cursor: pointer;
        z-index: 300;
        background-color: #0000;

    }

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

