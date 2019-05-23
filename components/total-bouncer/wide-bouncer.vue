<template>
<transition name="enter-total">
            <div id="total" key="bouncer" v-if="total>0">
                <div class="list"  :class="{'desplegada':desplegar}">
                    <table class="table table-striped" v-show="desplegar">
                        <thead>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th></th>
                        </thead>
                        <tbody>
                            <tr v-for="product in list" :key="product.code">
                                <td class="nametd">{{product.name}}</td>
                                <td class="unitstd">{{product.units}}</td>
                                <td class="btn-td"> <button class="del-btn btn-danger" @click="product.units=0"> <span class="fas fa-times"></span> </button> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="bg-white d-flex bordered">
                    <div class="btn-desplegar" @click="desplegar = !desplegar ">
                        <span class="fa fa-chevron-up" :class="{'rotated':desplegar}"></span>
                        <span v-if="desplegar"> Cerrar detalle </span>
                        <span v-else> Ver detalle</span>
                    </div>
                    <div class="d-flex flex-column justify-content-around">
                        <div class="d-flex total pl-1 pr-1">
                            <div>
                                <span style="font-size:34px" class="fa fa-shopping-cart fucsia"></span>
                                <span class="grey" style="font-size:19px">Total</span>
                            </div>
                            <span  style="font-size:25px;"> ${{total | price}}</span>
                        </div>
                        <div class="btn ">
                            <button class="send-btn clickable">ENVIAR PEDIDO</button>
                        </div>
                    </div>
                </div>
            </div>    
</transition>
    
</template>

<script>
export default {
    data(){return{
        desplegar:false,
    }},
   computed:{
       list(){
           return this.$store.getters.getList;
       },
       total(){
           return this.$store.getters.getTotal;
       }
   },
    methods:{
       scrollDown(){
            
                setTimeout(() => {
                    console.log();
    
                    window.scrollTo(0,document.body.scrollHeight-1200);
                }, 300);
            
        }
   }
}
</script>

<style lang="scss" scoped>

.enter-total-enter-active{
    animation: entering 1.5s;
}

@keyframes entering {
  0% {
    position:fixed;
    top:0;
    right:30px;
  }
  /* 50% {
    top:50vh;
    right:100px;
  } */
  100% {
    top:80vh;
    bottom:30px;
    right:30px;
  }
}



.del-btn{
    width:35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
}

.rotated{
    transform:rotate(180deg);
    transition:all .35s;
}
.fa-chevron-up{
    transition:all .35s;
}

.total{
    height: 49px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.btn{
   
    padding: 0;
    justify-content: flex-end;
    align-items: flex-end;
    display: flex;
}
.send-btn{
    background-color: #F2B742;
    color:#fff;
    height: 40px;
    width:216px;
    border-radius:10px;
    font-size: 23px;
    
}   

 #total {
        position: fixed;
        /* margin-left:50vw; */
        bottom: 30px;
        right:30px;
        z-index: 900;
        width:332px;
        overflow: hidden;
    }

    .btn-desplegar{
        width:155px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-color: #9F9F9F;
        color:#fff;
        border-radius: 15px;
        height: 91px;
        .fa{
            color:#F2B742;
            font-size: 44px;
        }
        cursor:pointer;
        
    }

    .list{
        
        height:0px;
        transition: all .6s;
       
        border-radius:  15px 15px 0 0;
        
    }

    .list.desplegada{
         border:1px solid #9F9F9F;
        background-color: #DCDCDC;
        height:200px;
        transition: all .6s;
        overflow-x:hidden;
        overflow-y:auto;
    }

    table{
        width: 332px;
       th{
           font-size: 18px;
       }
        td{
            font-size:15px;
            white-space:normal;
            word-wrap: break-word;
             .btn-td{
                    max-width:29px;
                }
            .nametd{
                width:100px;
            }
            .unitstd{
               max-width:50px;
            }
        }
    }

    .fa-times{
        font-size:25px;
    }
</style>

