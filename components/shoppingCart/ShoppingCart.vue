<template>
    <div class="d-flex flex-column">
        <div class="p-3">
             <cotizer-form></cotizer-form>
        </div>
    
        <list></list>
        <div class="col-12" style="height:100px"></div>
    </div> 
</template>

<script>
import cotizerForm from './form.vue';
import list from './list.vue';
import metaMixin from '@/plugins/metadataMixin.js';
export default {
    mixins:[metaMixin],
    name:'carrito',
    components:{
        cotizerForm,list
    },
   
   
}
</script>
