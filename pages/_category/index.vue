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
    head () {
        return {
        titleTemplate:  this.metatitle,
        meta:[
                {name:'description',vmid:'description',content:this.metadescription},
                /* { hid: 'description', name: 'description', content: 'Meta description' } */
            ]
        }
    },
    
   /*  mixins:[metamixin], */
   components:{categoryMobile,categoryWide},
    name:'categoria',
    computed:{
        metatitle(){
            if (this.category)
            {
               return this.category.metatitle ? this.category.metatitle : this.category.name+' '+"por mayor";
            }
        },
        metadescription(){
            if (this.category){
                if (this.category.metadescription){ return this.category.metadescription}
                else if (this.category.description){ return this.category.description}
                else {return this.metatitle}
            }

        },
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
