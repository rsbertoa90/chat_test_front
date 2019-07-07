<template>
    <homepage></homepage>
</template>

<script>
import homepage from '@/components/home/Home.vue'
import metaMixin from '@/plugins/metadataMixin.js';
export default {
    mixins:[metaMixin],
    name:'home',
    components:{homepage},
    loading:false,
    mounted(){
        console.log(process.env.NODE_ENV);
    }
}
</script>
