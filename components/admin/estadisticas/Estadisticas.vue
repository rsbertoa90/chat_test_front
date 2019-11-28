<template>
    <div  class="container">
        <div class="row w-100 mt-4">
            <div class="col-12 col-lg-4">
                <button class="btn btn-block btn-outline-info" @click="selected='searchs'">Busquedas</button>
            </div>
            <div class="col-12 col-lg-4">
                <button class="btn btn-block btn-outline-info" @click="selected='survey'" >Encuesta</button>
            
            </div>
            <div class="col-12 col-lg-4" v-if="isSuper">
                <button class="btn btn-block btn-outline-info" @click="selected='canceleds'" >Cancelados</button>
            </div>
        </div>
        <div class="row mt-4">
            <component :is="selected" class="m-auto"></component>
        </div>
    </div>
</template>

<script>
import canceleds from './canceleds/canceleds.vue'
import searchs from  './Search-statics.vue'
import survey from  './Survey.vue'
export default {
    components:{
        searchs,survey,canceleds
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
