<template>
    <div class="back-grey vw100">
        <div class="vertical-scroll">
            <div class="left-bubble">
                <h2>¿TERMINASTE TU PEDIDO?</h2>
                <span>Completá los datos</span>
            </div>
            <div class="right-bubble">
                <sendForm></sendForm>
            </div>
            <div class="left-bubble">
                <h2>DETALLE DEL PEDIDO</h2>
                <span>Lista de productos elegidos</span>
            </div>
            <div class="right-bubble">
                <div v-if="total">
                    <list v-if="total"></list>
                     <div class="row mt-2 mb-3 d-flex justify-content-center">
                        <nuxt-link to="/categorias" class="btn btn-more bordered">
                            <span class="fa fa-chevron-left"></span>
                            AGREGAR MAS
                        </nuxt-link>
                    </div>
                </div>
                <div v-if="!total">
                    <h4 style="font-size:16px; font-weight:bold;">NO HAY PRODUCTOS EN EL CARRITO</h4>
                </div>
            </div>
            <div class="bottom-space"></div>
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
.bottom-space{
    width:100vw;
    height: 200px;
}
.vertical-scroll{
    width:100%;
    height: 100vh;
    overflow-x:hidden;
    overflow-y:scroll;
}
.back-grey{
       background-color: #DCDCDC;
    height: 100vh;
    width: 123vw;
    position: fixed;
    top: 0;
    left: 0;
    padding-top:50px;
}

.left-bubble{
    border:1px solid #9F9F9F;
    padding:12px;
    margin-top:30px;
    background-color: #fff;
    width:100vw;
    margin-left:-10vw;
    padding-left: 15vw;
    border-radius: 0 15px 15px 0;
    span{
        color:#000;
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
    padding:12px;
     margin-top:30px;
    background-color: #fff;
    width:90vw;
    margin-left:11vw;
  /*   padding-right: 15vw; */
    border-radius:  15px 0 0 15px ;
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
