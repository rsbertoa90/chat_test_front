<template>
    <div>
        <div v-if="$mq=='lg'">
            <homeWide></homeWide>
        </div>
        <div v-else>
            <homeMobile></homeMobile>
        </div>
    </div>
</template>


<script>
import homeMobile from '@/components/home/Mobile.vue';
import homeWide from '@/components/home/Wide.vue';
import metamixin from '@/plugins/metadataMixin.js';
export default {
    components:{homeMobile,homeWide},
  mixins:[metamixin],
  name:'home',

}
</script>
