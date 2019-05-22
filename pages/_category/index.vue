<template>
    <div v-if="category">
        {{category.name}}
    </div>
</template>

<script>
import metamixin from '@/plugins/metadataMixin.js';
export default {
    mixins:[metamixin],
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
