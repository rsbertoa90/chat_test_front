<template>
<div class="back-grey container">
    <div class="row">
        <div class="col-4 offset-1 mr-0 pr-0 moved-right">
            <div class="left-bubble">
                <h2>¿TERMINASTE TU PEDIDO?</h2>
                <span>Completá los datos</span>
                <div class="text">
                    <p class="d-flex">
                        <span class="fa fa-check fucsia"></span>
                        Vas a recibir una copia de tu pedido en el mail que completes
                    </p>
                    <p class="d-flex">
                         <span class="fa fa-check fucsia"></span>
                        
                        Dentro de las 24 hs hábiles te contactamos por el teléfono que dejes en el formulario para confirmarte disponibilidad de la mercadería y coordinar detalles de pago
                    </p>
                </div>
            </div>
        </div>
        <div class="col-6 ml-0 pl-0">
           
                
                <div class="right-bubble">
                    <sendForm></sendForm>
                </div>
        </div>

    </div>
    <div class="row mt-4">
        <div class="col-4 offset-1 mr-0 pr-0 moved-right">
            <div class="left-bubble">
                 <h2>DETALLE DEL PEDIDO</h2>
                 <div class="text">
                    <p class="d-flex">
                        <span class="fa fa-check fucsia"></span>
                        En la tabla de la derecha podes ver el detalle de tu compra 
                    </p>
                    <p class="d-flex">
                         <span class="fa fa-check fucsia"></span>
                        
                        Podes cambiar las cantidades o quitar productos
                    </p>
                    <p class="d-flex">
                         <span class="fa fa-check fucsia"></span>
                        
                        Para agregar nuevos productos podes apretar el siguiente boton
                    </p>
                    <div class="row mt-2 mb-3 d-flex justify-content-center">
                            <nuxt-link to="/categorias" class="btn btn-more bordered clickable">
                                <span class="fa fa-chevron-left"></span>
                                AGREGAR MAS
                            </nuxt-link>
                    </div>
                </div>
               
               
            </div>
        </div>
        <div class="col-6 ml-0 pl-0">
           
                
                <div class="right-bubble">
                     <div v-if="total">
                        <list v-if="total"></list>
                        
                    </div>
                    <div v-if="!total">
                        <h4 style="font-size:16px; font-weight:bold;">NO HAY PRODUCTOS EN EL CARRITO</h4>
                    </div>
                </div>
        </div>
    </div>
              
               
    
</div>
</template>

<script>
import sendForm from './send-form.vue';
import list from './list.vue';
export default {
    components:{sendForm,list},
    
    
}
</script>


<style lang="scss" scoped>
.text{
    width:84%;
    margin-left:15%;
    margin-top:15px;
    text-align: left;
    font-size: 15px;
}
.fucsia{
    color:#DB1B73;
    margin-right:5px;
}
.bottom-space{
    width:100vw;
    height: 200px;
}


.moved-right{
       margin-right: -3px !important;
}


.back-grey{
    background-color: #DCDCDC;
    
    width: 100vw;
   
    padding-top:50px;
}

.left-bubble{
    text-align: right;
    border:1px solid #9F9F9F;
    padding:12px;
    
    background-color: #fff;
    width:100%;
   /*  margin-left:-10vw;
    padding-left: 15vw; */
    border-radius: 15px 0 0 15px;
    margin-top:67px;
    span{
       /*  color:#000; */
        font-weight: bold;
         font-size: 20px;
         text-align: right;
         display: flex;
         justify-content: flex-end;
    }
    h2{
        font-size: 20px;
        color:#DB1B73;
        font-weight: bold;
    }
}

.right-bubble{
    border:1px solid #9F9F9F;
    padding:10% 10% 10% 10%;
     margin-top:30px;
     min-height: 500px;
    background-color: #fff;
    /* width:90vw;
    margin-left:11vw; */
  /*   padding-right: 15vw; */
    border-radius:  15px ;
}

.btn-more{
  /*   width:125px; */
    height: 50px;
    color:#ffF;
    background-color: #F2B742;
    font-size: 22px;
    display: flex;
    justify-content: center;
    align-items:center;
    .fa{
        font-size: 30px;
        margin-right:15px;
    }
}
</style>
