<template>
<div>
    <div class="row">
       <!--  <button class="btn btn-block col-6" :class="{'btn-info':display=='month','btn-outline-info':display!='month'}" @click="display='month'">
            MENSUAL
        </button>
        <button class="btn btn-block col-6" :class="{'btn-info':display=='day','btn-outline-info':display!='day'}" @click="display='day'">
            DIARIO
        </button> -->
    </div>
    <div class="row mt-4">
        <div v-if="display=='month'">
            <statsmont></statsmont>
        </div>
        <div v-else>
         <!--    <statsday></statsday> -->
        </div>
    </div>
</div>    
</template>


<script>
import statsmont from './monthly.vue';
/* import statsday from './daily.vue'; */

export default {
    components:{statsmont},
    data(){
        return{
            display:'month'
        }
    },
    computed:{
        orders(){
            return this.$store.getters.getOrders;
        }
    },
     watch:{
       orders(){
          if(this.orders && this.orders.length > 0){
               
               this.$store.commit('setLoading',false);
           }
       }
   },
    mounted(){
      
         if(!this.orders || this.orders.length < 1){
               this.$store.commit('setLoading',true);
           }
    }
}
</script>


<style scoped>

</style>
