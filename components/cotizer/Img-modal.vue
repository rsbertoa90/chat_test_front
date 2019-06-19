<template >
    <div  ref="modal" class="modal fade" id="image-modal" tabindex="-1" role="dialog">
   <div class="modal-dialog" role="document">
    <div  v-if="product" class="modal-content">
      <div class="modal-header text-center">
        <h5 class="modal-title w-100 text-center "> {{product.name}} </h5>
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

            <div class="controls"  v-if="product.images && product.images[1]" >
                <span  @click="changeImage('prev')" class="ctr"> <fa-icon icon="chevron-left"></fa-icon> </span>
                <span  @click="changeImage('next')" class="ctr"> <fa-icon icon="chevron-right"></fa-icon> </span>
            </div>

       

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
            preloadImages(){
                /* console.log('preload'); */
                let images = [];
                this.product.images.forEach(image => {
                    let img = new Image();
                    img.src = this.imagePath(image.url);
                    images.push(img);
                   /*  console.log(img); */
                });
            },
            close(){
                this.i = 0;
                this.$emit('close');
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


   .modal-dialog{
            max-width: 400px;
        }
    .image-container{
        position:relative;
        overflow: hidden;
       
        img{
            width:100%;
        }
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
        .ctr{
            font-size:2rem;
            cursor: pointer;
            background-color:#D52B1Edd;
            color:#fff;
            display:flex;
            width:50px;
            height: 50px;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
           &:hover{
               background-color: #0000ffdd;
           }
        }

    }

    @media(max-width:600){
        .modal-dialog{
            max-width: 300px;
        }
    }

</style>

