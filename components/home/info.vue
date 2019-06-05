<template>
    <div class="row mt-4">
        <div class="col-12 text-center">
            <h2>
                SOMOS UN MAYORISTA DE PRODUCTOS DE LIMPIEZA Y BAZAR
            </h2>
        </div>
        <div class="col-12 row d-flex mt-3">
           
            <div class="col-10 offset-2 offset-lg-0 col-lg-4 icon-container">
                    <span class="icon fa fa-truck mr-2"></span>
                    <span class="text-center">Realizamos envíos a toda Argentina</span>
            </div>
        
            <div class="col-10 offset-2 offset-lg-0 col-lg-4 icon-container">
                    <i class="icon fa fa-shopping-basket"></i>
                    <span class="text-center">La compra mínima por local es de $1500, para envío de $3000</span>
            </div>
        
            <div class="col-10 offset-2 offset-lg-0 col-lg-4 icon-container">
                    <i class="icon fa fa-comment"></i>
                    <span class="text-center">Preguntas? contactanos al <br> 11 6234 4492</span>
            </div>
    

        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
 $color-first : #d32381;

      .fa,.far,.fas{
        font-size: 40px;
        margin-right: 10px;
    }

    .icon-container{
        display: flex;
        padding: 15px;
        align-items:center;
    
    }


   .icon{
        padding: 10px;
        background-color: $color-first;
        display:flex;
        align-items:center;
        justify-content: center;
        color:#fff;
    }
</style>