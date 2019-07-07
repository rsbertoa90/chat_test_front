<template>


    <div class="row mt-4">
      
        
        <div class="col-12 col-lg-4 row p-lg-4 justify-content-center mt-4 ">
            <nuxt-link to="/ofertas" class="white-banner row">
                <div class="col-5">
                    <div class="overlayed-image">
                        <v-lazy-image :src="imagePath('/storage/images/app/celu_ofertas.png')" alt="Ofertas en Bazar Mayorista Maju"></v-lazy-image>
                    </div>
                </div>
                <div class="col-7 p-2 d-flex flex-column justify-content-around align-items-center">
                    <h4 class="text-center">Mirá todas las ofertas!</h4>
                    <button class="btn bg-red text-white mt-4">
                       <b>Ver ofertas</b> 
                    </button>
                </div>
            </nuxt-link>
        </div>

        <div class="col-12 col-lg-4 row p-lg-4 justify-content-center mt-4">
            <nuxt-link to="/cotizador" class="red-banner row">
                <div class="col-5">
                    <div class="overlayed-image">
                        <v-lazy-image :src="imagePath('/storage/images/app/celu.png')" alt="Todos los productos de Bazar Mayorista Maju"></v-lazy-image>
                    </div>
                </div>
                <div class="col-7 p-2 d-flex flex-column justify-content-around align-items-center">
                    <h4>Mirá todos los productos!</h4>
                    <button class="btn bg-white text-red mt-4">
                        <b>Ir al cotizador</b>  
                    </button>
                </div>
            </nuxt-link>
        </div>

         <div  class="col-12 col-lg-4 row p-lg-4 justify-content-center mt-4 ">
            <a :href="backendpath+'/descargar-lista-de-precios'" target="_blank" class="white-banner row">
                <div class="col-5">
                    <div class="overlayed-image">
                        <v-lazy-image :src="imagePath('/storage/images/app/celu_precios.png')" alt="Lista de Precios"></v-lazy-image>
                    </div>
                </div>
                <div  class="col-7 p-2 d-flex flex-column justify-content-around align-items-center">
                    <h4 class="text-center">Descargá la lista de precios!</h4>
                    <button class="btn bg-red text-white mt-4">
                       <b>descargar</b> 
                    </button>
                </div>
            </a>
        </div>
        
    </div>

</template>

<script>
export default {
   
}
</script>


<style lang="scss" scoped>
.margin-top{
    margin-top:50px;
}

.white-banner:hover, .red-banner:hover{
    transform:scale(1.1);
     box-shadow: 2px 2px 5px #999;
}


.white-banner, .red-banner{
    
    width:100%;
    max-height: 152px;
        cursor:pointer;
      border:1px solid #868686;
        position:relative;
         box-shadow: 0 0 5px 3px #CCC;
         border-radius: 2%;
         .overlayed-image{
                 margin-top: -35px;
                width: 105px;
                img{
                    width:100%;
                }
         }
}
    .white-banner{
       color:#D52B1E;
        background-color: #fff;
        h4{
            font-size:1.5rem;
        }
      
    }

    .red-banner{
        background-color: #D52B1E;
        color:#fff;
         h4{
             text-align:center;
            font-size:1.5rem;
        }
        
    }

    @media(max-width:600px)
    {
        .white-banner, .red-banner{
            margin-left:20px;
            margin-top:30px;
            font-weight: bold;
           
        }

        .white-banner h4{
                font-size:1.5rem;
        }

        .red-banner h4{
            
                font-size:1.5rem;
            
        }

         .overlayed-image{
             margin-left:-10px;
         }
        
    }

</style>
