<template >
    <div  ref="modal" class="modal fade" id="image-modal" tabindex="-1" role="dialog">
   <div class="modal-dialog" role="document">
    <div  v-if="product" class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"> {{product.name}} </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close()">
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
                <span class="fa fa-chevron-left " @click="changeImage('prev')" ></span>
                <span class="fa fa-chevron-right " @click="changeImage('next')" ></span>
            </div>

                <a   @click="downloadImage(product.images[i])" class="downloadImage"> <fa-icon icon="download"></fa-icon> Descargar </a>
            
          </div>
      
       
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
                this.preloadImages();
            }
        },
        methods : {
             downloadImage(image)
            {
                if(image && image.url)
                {
                if(process.browser){
                    let path= this.backendpath+'/download-image/'+image.id;
                    var win = window.open(path, '_blank');
                    win.focus();
                }
                }
            },
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
            close(){
                this.i = 0;
                this.$emit('closeModal');
                
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
.downloadImage{
    position:absolute;
    bottom:0;
    right:0;
    border:1px solid #ccc;
    background-color: #fff;
    padding:5px;
    font-size: 1.1rem;
    color:#555;
    border-radius: 5px;
    box-shadow: 1px 1px 1px #000;
    z-index: 20;
    &:hover{
        color:#D52B1E;
    }
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
            background-color: #09cca299;
            color: #ff0aaf; 
            font-weight: bold;
            padding: 5px;
        }

    }

</style>

