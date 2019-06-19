<template>
<div>
    <div class="row">
        <button class="btn btn-block col-6" :class="{'btn-info':display=='month','btn-outline-info':display!='month'}" @click="display='month'">
            MENSUAL
        </button>
        <button class="btn btn-block col-6" :class="{'btn-info':display=='day','btn-outline-info':display!='day'}" @click="display='day'">
            DIARIO
        </button>
    </div>
    <div class="row mt-4">
        <div v-if="display=='month'">
            <statsmont></statsmont>
        </div>
        <div v-else>
            <statsday></statsday>
        </div>
    </div>
</div>    
</template>


<script>
import statsmont from './monthly.vue';
import statsday from './daily.vue';

export default {
    components:{statsmont,statsday},
    data(){
        return{
            display:'month'
        }
    },
    mounted(){
        window.moment = require('moment');
    }
}
</script>


<style scoped>

</style>
