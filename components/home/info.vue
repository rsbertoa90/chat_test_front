<template>
    <div class="info-row">
        <div class="info-item">
            <fa-icon icon="map-marker-alt" class="icon"></fa-icon>
            <div class="d-flex flex-column ml-2 text-center">
                <span> Pasteur 394, Once </span>
                <span>Lunes a viernes 9hs a 18hs</span>
            </div>
        </div>
        <div class="info-item">
            <fa-icon icon="truck" class="icon"></fa-icon>
            <div class="d-flex flex-column ml-2 text-center">
                <span>Envíos a todo el país</span>
            </div>
        </div>
        <div class="info-item" v-if="config">
            <fa-icon icon="shopping-cart" class="icon"></fa-icon>
            <div class="d-flex flex-column ml-2 text-center">
                <span> Compra mínima en el local ${{config.minbuy}} </span>
                <span>Compra mínima para envíos ${{config.minbuy_ship}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed:{
        config(){
            return this.$store.getters.getConfig;
        }
    }
}
</script>


<style lang="scss" scoped>
    .info-row{
        background-color: #fff;
        color:#868686;
           border-top: 2px solid #D52B1E;
        border-bottom: 2px solid #D52B1E;
       // margin: 0 -6%;
        padding: 0 6%;
        display: flex;
        justify-content: space-around;
    }
    .icon{
        font-size: 2.3rem;
        color:#868686;
        margin-right:5px;
    }
    .info-item{
        
        padding:10px;
        max-width: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        color:#D52B1E;
    }

    @media(max-width:660px)
    {
        .info-item{
            width: 100%;
            max-width: 100%;
             justify-content: start; 
             margin-top:15px;
             margin-left:15px;
               justify-content: center;
            align-items:center;
            flex-direction: column;
        }
        .info-row{
            border:none;
            align-items:flex-start;
            flex-direction: column;
            justify-content: start; 
            
          
        }
    }


</style>

