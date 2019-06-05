
<template>
<div class="row" v-if="supercategory" >
     
        <nuxt-link v-for="category in supercategory.categories" :key="category.id" :to="category.slug" class="col-12 col-lg-3 p-1">
            <div class="text-center ">
                <div class="overflow-hidden relative">
                        <v-lazy-image v-if="category.image" class="img-container" :src="imagePath(category.image)" :alt="category.name" />
                        <v-lazy-image v-else class="img-container" :src="imagePath('/storage/images/app/no-photo.png')" :alt="category.name" />
                        <div class="sm-overlay">
                            <div class="h4-wrap">
                                <h4> {{category.name |uc}} </h4>
                            </div>
                        </div>
                </div>
                
                </div>
        </nuxt-link>
     
</div>
</template>

<script>
  export default {
      props:['supercategory'],
    data() {
      return {
      
       
        
      }
    },
    
  }
</script>

<style lang="scss">

.overflow-hidden{
    overflow: hidden;
}

        .img-container:hover{
            transform: scale(1.2);
              transition: all 1s;
        }
        .sm-overlay{
            .h4-wrap{
                padding: 10px;
                background-color: #33333366;
                color:#fff;
                display: flex;
                width: 80%;
                margin:auto;
                text-align: center;
                justify-content: center;
            }
             position: absolute;
            top:40%;
            right:0;
            width: 100%;    
            text-align: center;

        }


    .home-btn{
        background-color: #888;
        border-radius: 0;
        padding:10px;
        color:#fff;
        font-weight: bold;
        margin-top: 30px;
        &:hover{
            background-color: #fff;
            border:1px solid #000;
            color:#000;
        }
    }

    
 
     .overlay{
            color: #333;
            text-align: center;
            display: flex;
            flex-direction: column ;
           /*  align-items: center; */
            justify-content: center;
            margin-top: 10px;
        }

        .full{
            margin-right: -16%;
        }

    @media(min-width:900px){
        .full{
    margin-right: -10%;
    margin-left: -9.5%;
}

           .relative{
        position:relative;
    }
    
        .overlay{
            color: #333;
            text-align: right;
            align-items: right;
            position: absolute;
            top:0;
            right:8%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            height:100%;
            .big{
                font-size: 3.6rem;
      
    }
        }
    }

</style>
