<template>
    <div  class="container">
        <div class="row w-100 mt-4">
            <div class="col-12 col-lg-6">
                <button class="btn btn-block btn-outline-info" @click="selected='searchs'">Busquedas</button>
            </div>
            <div class="col-12 col-lg-6">
                <button class="btn btn-block btn-outline-info" @click="selected='survey'" >Encuesta</button>
            
            </div>
        </div>
        <div class="row mt-4">
            <component :is="selected" class="m-auto"></component>
        </div>
    </div>
</template>

<script>
import searchs from  './Search-statics.vue'
import survey from  './Survey.vue'
export default {
    components:{
        searchs,survey
    },
    data(){
        return{
            selected:'searchs'
        }
    }
}
</script>
