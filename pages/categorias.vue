<template>
    <div>
          <h2 class="text-center">Categorias de Productos en Mayorista Mates Fabi  </h2>
        <home-categories-mobile v-if="$mq!='lg'"></home-categories-mobile>
    </div>
</template>

<script>
import homeCategoriesMobile from '@/components/home/categories-mobile.vue';
import metaMixin from '@/plugins/metadataMixin.js';
export default {
    components:{homeCategoriesMobile},
    name:'categorias',
    layout:'categories',
    mixins:[metaMixin],
   
}
</script>
