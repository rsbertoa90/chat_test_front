<template>
    <div class="container">
        <div class="row" v-for="c in categories" :key="c.slug">
            <nuxt-link :to="c.slug">
            <h2>{{c.name}}</h2>  
            </nuxt-link>
            
        </div>
    </div>
</template>


<script>
import metamixin from '@/plugins/metadataMixin.js';
export default {
  mixins:[metamixin],
  name:'home',

}
</script>
