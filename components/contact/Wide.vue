<template>
<div class="back-grey container">
    <div class="relatived">
        
            <div class="left-bubble first-left">
                <h2 class="moved-left">¿TENES ALGUNA PREGUNTA?</h2>
                <span>Aquí información general</span>
            </div>

            <div class="right-bubble">
                <info></info>
            </div>
    </div>
    <div class="relatived tall">
        
            <div class="left-bubble first-left">
                <h2 class="moved-left">FORMULARIO DE CONTACTO</h2>
                <span>Completá los datos</span>
            </div>

            <div class="right-bubble">
                <contact-form></contact-form>
            </div>
    </div>
   
              
               
    
</div>
</template>

<script>
import contactForm from './contact-form.vue';
import info from '../info/Info.vue'

export default {
    components:{contactForm,info},
    
    
}
</script>


<style lang="scss" scoped>
.moved-left{
    margin-right: 20%;
}
.relatived{
    position:relative;
    height: 300px;
}
.relatived.tall{
    height: 1000px;
}

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




.back-grey{
    background-color: #DCDCDC;
    width: 100%;
}

.left-bubble{
    position:absolute;
    top:10px;
    left:1px;
    text-align: right;
    border:1px solid #9F9F9F;
    padding:5px;
    padding-right: 20px;
    z-index:30;
    background-color: #fff;
    width:60%;
   /*  margin-left:-10vw;
    padding-left: 15vw; */
    border-radius: 15px;
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
    padding:5% 20% 5% 4%;
     position:absolute;
    top:120px;
    right:1px;
    width:70%;
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
