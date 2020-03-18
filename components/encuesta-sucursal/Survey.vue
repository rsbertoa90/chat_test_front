<template>
<div class="max-w-pannel">
    <transition enter-active-class="animated bounceIn">
         <popup v-if="showpopup" @close="showpopup=false"></popup>
    </transition>
    <div class="row">
        <div class="col-12  mb-4">
            <div class="w-100 fcc text-center">
                <h1>Tu opinion nos importa</h1>
                <h2>¿ Como fue tu experiencia de compra</h2>
                <h2>en nuestra sucursal ?</h2>
            </div>
        </div>
        <div class="col-4">
            <label class="w-100 fcc " @click="setSelected('buena')">
                <div class="face">
                    <span class="far fa-smile"></span>
                </div>
                <div class="d-flex justify-content-center align-items-center">
                    <input class="form-control radioselect " type="radio" id="selected" name="selected" value="buena" v-model="selected">
                    <span class="ml-2 mt-3 f20">Buena</span>
                </div>
               
            </label>
        </div>

        <div class="col-4">
            <label class="w-100 fcc " @click="setSelected('regular')">
                <div class="face">
                    <span class="far fa-meh"></span>
                </div>
                <div class="d-flex justify-content-center align-items-center">
                    <input class="form-control radioselect " type="radio" id="selected" name="selected" value="regular" v-model="selected">
                    <span class="ml-2 mt-3 f20">Regular</span>
                </div>
               
            </label>
        </div>

        <div class="col-4">
            <label class="w-100 fcc " @click="setSelected('mala')">
                <div class="face">
                    <span class="far fa-frown"></span>
                </div>
                <div class="d-flex justify-content-center align-items-center">
                    <input class="form-control radioselect " type="radio" id="selected" name="selected" value="mala" v-model="selected">
                    <span class="ml-2 mt-3 f20">Mala</span>
                </div>
               
            </label>
        </div>
       
      
       <div class="col-12 mt-4">
           <textarea class="form-control w-100" rows="6" v-model="comment" placeholder="Alguna sugerencia ? "></textarea>
       </div>

       <div class="col-12 d-flex justify-content-end mt-4">
           <button class="btn btn-lg btn-info" @click="send">
               Enviar
           </button>
       </div>
        
    </div>
</div>
</template>

<script>
import popup from './popup.vue';
export default {
    props:['sucursal'],
    components:{popup},
    data() {
        return {
            showpopup:false,
            selected:null,
            comment:'',
        }
    },
    methods:{
        setSelected(op)
        {
            this.selected=op;
        },
        send(){

            if(this.sucursal && this.selected){

                let data = {
                    sucursal:this.sucursal,
                    comment:this.comment,
                    opt: this.selected
                }
                console.table(data);
                this.$axios.post('/ecsurvey',data)
                    .then(r=>{
                       /*  window.location.replace(`/ecs/${this.sucursal}`); */
                       this.showpopup=true;
                       this.comment=null;
                       this.selected=null;
                    });
            }
        }
    }
}
</script>

<style lang="scss">
.f20{
    font-size: 20px;
}
.max-w-pannel{
    max-width:700px;
    margin:auto;
    display: flex;
    justify-content: center;
}
.radioselect{
    font-size: 12px;
    margin-top:15px;
    width:25px;

}

.fcc{
    display:flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;
}
    .face{
        cursor:pointer;
        width:90px;
        height: 90px;
        display: flex;
        justify-content: center;
        align-items:center;
        font-size: 60px;
        background-color: #ff0aaf;
        color:#fff;
        border-radius:50%;

    }
</style>