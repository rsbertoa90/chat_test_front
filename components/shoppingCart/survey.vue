<template>
    <appmodal  :noclosebutton="true">
        <div>
            <h2 class="text-center">Gracias por elegir Mates Fabi</h2>
            <h3>Tu opinion nos importa</h3>
            <h4>Que te parecio el proceso de compra?</h4>
            <ul>
                <li v-for="opt in options" :key="opt.name" >
                    <label for="" class="d-flex align-items-center">
                        <input class="radio" type="radio" name="option" v-model="formData.option" :value="opt.name" id="opt" >
                        <div class="faceiconcontainer ml-4 mr-4">
                            <span class="faceicon" :class="opt.icon"></span>
                        </div>
                        {{opt.name}}
                    </label>
                    
                </li>
            </ul>
            <textarea placeholder="Alguna sugerencia?"  cols="40" rows="3" v-model="formData.comment"></textarea>
            <br>
            <transition enter-active-class="animated slideInUp" >
                <div class="d-flex w-100 justify-content-end"  v-if="formData.option">
                    <button class="btn-lg btn-info" @click="send">Enviar</button>
                </div>
            </transition>
        </div>
    </appmodal>
</template>

<script>
import appmodal from '@/components/Modal.vue'
export default {
    components:{appmodal},
    methods:{
       send(){
           this.$emit('send',this.formData);
       }
    },
    data(){
        return{
            options:[
                { name:'Bueno', icon: 'fa fa-smile-beam' },
                { name:'Regular', icon: 'fa fa-meh' },
                { name:'Malo', icon: 'fas fa-frown' },
            ],
            formData:{
                option:null,
                comment:null
            }
        }
    }
}
</script>

<style lang="scss" scoped>
h2{
    font-size: 1.35rem;
    font-weight: bold;
}
h3{
    font-size: 1.1rem;
}
h4{
    font-size: 1rem;
}

.radio{
    width:20px;
    height: 20px;
    cursor: pointer;
}
.faceiconcontainer{
    display: flex;
    justify-content: center;
    align-items:center;
    width:40px;
    height: 40px;
    font-size: 1.6rem;
    border-radius: 50%;
    color:#fff;
    background-color:#ff0aaf;

}
</style>
