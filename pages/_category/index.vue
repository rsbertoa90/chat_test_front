<template>
    <div v-if="category">
        <div v-if="$mq!='lg'">
            <categoryMobile :category="category"></categoryMobile>
        </div>
        <div v-else>
            <categoryWide :category="category"></categoryWide>
        </div>
    </div>
</template>

<script>
import metamixin from '@/plugins/metadataMixin.js';
import categoryMobile from '@/components/category/Mobile.vue';
import categoryWide from '@/components/category/Wide.vue';
export default {
   /*  mixins:[metamixin], */
   components:{categoryMobile,categoryWide},
    name:'categoria',
    computed:{
        category()
        {
            return this.categories.find(c =>{
                let slug = '/'+c.slug;
                slug =slug.replace('//','/');
                let param = '/' + this.$route.params.category;
                param =param.replace('//','/');
                return slug == param;
            });
        }
    }
}
</script>
