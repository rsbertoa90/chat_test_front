<template>
    <div  class="row">
        <div class="col-12 col-lg-3">
            <div class="d-flex flex-column align-items-center">
                <button class="mt-2 btn btn-block btn-outline-info" @click="selected='searchs'">Busquedas</button>
                <button class="mt-2 btn btn-block btn-outline-info" @click="selected='survey'" >Encuesta</button>
                <button class="mt-2 btn btn-block btn-outline-info" @click="selected='canceleds'" >Cancelados</button>
                <button class="mt-2 btn btn-block btn-outline-info" @click="selected='nophotos'" >productos sin foto</button>
            </div>
        </div>
        <div class="col-12 col-lg-8 mt-4">
            <component :is="selected" class="m-auto"></component>
        </div>
    </div>
</template>

<script>
import canceleds from './canceleds/canceleds.vue'
import searchs from  './Search-statics.vue'
import survey from  './survey/Survey.vue'
import nophotos from  './nophotos/nophotos.vue'
export default {
    components:{
        nophotos,searchs,survey,canceleds
    },
    data(){
        return{
            selected:'searchs'
        }
    },
    mounted(){
        this.$store.dispatch('fetchCanceledOrders');
    }
 
    
}
</script>
