<template>
<transition enter-active-class="animated bounceIn">
            <div id="total" key="bouncer" v-if="total>0">
                
                <div class="bg-white d-flex">
                   
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
        desplegar:true,
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
        width:202px;
        overflow: hidden;
        box-shadow: 3px 3px 7px  #000;
        border-radius: 15px;
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

