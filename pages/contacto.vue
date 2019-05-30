<template>
    <div>
        <div v-if="$mq!='lg'">
            <contactoMobile></contactoMobile>
        </div>
        <div v-else>
            <contactoWide></contactoWide>
        </div>
        <div class="row mt-4" v-if="offers"> 
            <product-grid :products="offers" class="mt-4">
                <h4 class="font-weight-bold">Productos destacados de Mates de Fabrica</h4>
            </product-grid>
        </div>
    </div>
</template>


<script>
import contactoMobile from '@/components/contact/Mobile.vue';
import contactoWide from '@/components/contact/Wide.vue';
import metamixin from '@/plugins/metadataMixin.js';
import productGrid from '@/components/product/grid.vue';

export default {
    async fetch({store}){
        await store.dispatch('fetchStates');  
    },
    components:{contactoMobile,contactoWide,productGrid},
  mixins:[metamixin],
  name:'contacto',
  computed:{
      offers(){
          return this.$store.getters.getOffers;
      }
  }

}
</script>
